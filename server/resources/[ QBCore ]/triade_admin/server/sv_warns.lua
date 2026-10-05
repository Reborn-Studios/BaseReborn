-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA ADVERTENCIAS / CASTIGO
-----------------------------------------------------------------------------------------------------------------------------------------
local active = {}

-- O tempo restante vem sempre do timestamp numerico (expires_ts), nunca do DATETIME,
-- para nao depender de como o driver devolve datas nem do fuso horario da base de dados.
local function secondsLeft(expiresTs)
	local target = TA.int(expiresTs)
	if target <= 0 then return 0 end
	return math.max(0, target - os.time())
end

local function release(passport, silent)
	passport = TA.int(passport)
	active[passport] = nil

	MySQL.update("UPDATE triade_admin_warns SET active = 0 WHERE passport = ? AND active = 1", { passport })

	local target = vRP.getUserSource(passport)
	if target then
		SetPlayerRoutingBucket(target, 0)
		TriggerClientEvent("triade_admin:punish", target, false)
		TriggerClientEvent("triade_admin:teleport", target, TriadeAdmin.Warn.ReturnCoords[1], TriadeAdmin.Warn.ReturnCoords[2], TriadeAdmin.Warn.ReturnCoords[3])
		if not silent then
			TA.notify(target, "sucesso", "O seu castigo terminou. Bom roleplay!", 8000)
		end
	end
end

local function applyPunishment(passport, seconds, reason)
	passport = TA.int(passport)
	active[passport] = { ["expires"] = os.time() + seconds, ["reason"] = reason }

	local target = vRP.getUserSource(passport)
	if not target then return end

	SetPlayerRoutingBucket(target, TriadeAdmin.Warn.Bucket)
	TriggerClientEvent("triade_admin:teleport", target, TriadeAdmin.Warn.Coords[1], TriadeAdmin.Warn.Coords[2], TriadeAdmin.Warn.Coords[3])
	TriggerClientEvent("triade_admin:punish", target, true, seconds, reason)
end

exports("applyPunishment",applyPunishment)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREAD DE LIBERTACAO
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		Wait(10000)
		local now = os.time()
		for passport, data in pairs(active) do
			if data.expires <= now then
				release(passport)
			end
		end
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- RECONECTAR JOGADOR EM CASTIGO
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("vRP:playerSpawn", function(passport, source)
	CreateThread(function()
		Wait(4000)
		local row = MySQL.single.await("SELECT reason, expires_ts FROM triade_admin_warns WHERE passport = ? AND active = 1 ORDER BY id DESC LIMIT 1", { TA.int(passport) })
		if not row then return end

		local remaining = secondsLeft(row.expires_ts)
		if remaining <= 0 then
			release(passport, true)
			return
		end

		applyPunishment(passport, remaining, row.reason)
		TA.notify(source, "negado", "Voce ainda esta em castigo por " .. math.ceil(remaining / 60) .. " minuto(s).", 10000)
	end)
end)

CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(7000)

	local rows = MySQL.query.await("SELECT passport, reason, expires_ts FROM triade_admin_warns WHERE active = 1") or {}
	for _, row in ipairs(rows) do
		local remaining = secondsLeft(row.expires_ts)
		if remaining > 0 then
			active[TA.int(row.passport)] = { ["expires"] = os.time() + remaining, ["reason"] = row.reason }
		else
			MySQL.update("UPDATE triade_admin_warns SET active = 0 WHERE passport = ? AND active = 1", { TA.int(row.passport) })
		end
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTAS
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("warns", "warn.view", function(source, payload)
	local search = TA.str(payload.search, 64)
	local rows

	if search ~= "" then
		local like = "%" .. search .. "%"
		rows = MySQL.query.await("SELECT * FROM triade_admin_warns WHERE passport = ? OR name LIKE ? OR name2 LIKE ? OR reason LIKE ? OR staff_name LIKE ? ORDER BY id DESC LIMIT 300", {
			TA.int(search), like, like, like, like
		}) or {}
	else
		rows = MySQL.query.await("SELECT * FROM triade_admin_warns ORDER BY id DESC LIMIT 300") or {}
	end

	for _, row in ipairs(rows) do
		row.remaining = (TA.int(row.active) == 1) and secondsLeft(row.expires_ts) or 0
	end

	local total = TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM triade_admin_warns") or 0)
	local activeTotal = TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM triade_admin_warns WHERE active = 1") or 0)
	local players = TA.int(MySQL.scalar.await("SELECT COUNT(DISTINCT passport) FROM triade_admin_warns") or 0)

	local ranking = MySQL.query.await("SELECT passport, name, name2, COUNT(*) AS total FROM triade_admin_warns GROUP BY passport, name, name2 ORDER BY total DESC LIMIT 50") or {}

	return {
		["records"] = rows,
		["ranking"] = ranking,
		["totals"] = { ["all"] = total, ["active"] = activeTotal, ["players"] = players }
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
local function warnHandler(source, payload)
	local passport = TA.int(payload.passport)
	local reason = TA.str(payload.reason, 200)
	local minutes = TA.int(payload.minutes)

	if passport <= 0 then return { ok = false, message = "Informe um passaporte valido." } end
	if reason == "" then return { ok = false, message = "Informe o motivo da advertencia." } end
	if minutes < 0 then minutes = 0 end

	local identity = TA.identity(passport)
	if not identity then return { ok = false, message = "Passaporte nao encontrado." } end
	if not TA.canTarget(source, passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end

	local staffPassport = vRP.getUserId(source) or 0
	local expires, expiresTs = nil, 0
	if minutes > 0 then
		expiresTs = os.time() + minutes * 60
		expires = os.date("%Y-%m-%d %H:%M:%S", expiresTs)
	end

	MySQL.insert.await("INSERT INTO triade_admin_warns (passport, name, name2, reason, minutes, staff_id, staff_name, created_at, expires_at, expires_ts, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", {
		passport, TA.str(identity.name), TA.str(identity.name2), reason, minutes,
		staffPassport, TA.fullName(staffPassport), TA.now(), expires, expiresTs, minutes > 0 and 1 or 0
	})

	local target = vRP.getUserSource(passport)
	if target then
		TA.notify(target, "negado", "<b>ADVERTENCIA</b><br>Motivo: " .. reason .. (minutes > 0 and ("<br>Castigo: " .. minutes .. " minuto(s)") or ""), 15000)
	end

	if minutes > 0 then
		applyPunishment(passport, minutes * 60, reason)
	end

	TA.log(source, "advertencia", "Passaporte " .. passport .. " | " .. minutes .. "min | " .. reason)
	return { ok = true, message = "Advertencia aplicada ao passaporte " .. passport .. "." }
end

TA.action("player.warn", "player.warn", warnHandler)
TA.action("server.warn", "server.warn", warnHandler)

TA.action("warn.delete", "warn.delete", function(source, payload)
	local id = TA.int(payload.id)
	local row = MySQL.single.await("SELECT passport, active, reason FROM triade_admin_warns WHERE id = ?", { id })
	if not row then return { ok = false, message = "Advertencia nao encontrada." } end

	MySQL.query.await("DELETE FROM triade_admin_warns WHERE id = ?", { id })

	if TA.int(row.active) == 1 then
		release(TA.int(row.passport))
	end

	TA.log(source, "advertencia-apagar", "ID " .. id .. " | passaporte " .. TA.int(row.passport))
	return { ok = true, message = "Advertencia removida." }
end)

TA.action("warn.release", "warn.delete", function(source, payload)
	local passport = TA.int(payload.passport)
	if passport <= 0 then return { ok = false, message = "Passaporte invalido." } end

	release(passport)
	TA.log(source, "castigo-liberar", "Passaporte " .. passport)
	return { ok = true, message = "Castigo encerrado." }
end)
