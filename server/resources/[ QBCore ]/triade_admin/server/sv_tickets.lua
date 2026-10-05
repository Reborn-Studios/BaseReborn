-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA CHAMADOS
-----------------------------------------------------------------------------------------------------------------------------------------
local cooldown = {}
local pendingRating = {}

local function typeConfig(id)
	for _, entry in ipairs(TriadeAdmin.Tickets.Types) do
		if entry.id == id then return entry end
	end
	return nil
end

local function staffFor(typeId)
	local config = typeConfig(typeId)
	if not config then return {} end

	local list = {}
	for passport, source in pairs(vRP.getUsers()) do
		if TA.hasAny(passport, config.perms) then
			list[#list + 1] = source
		end
	end
	return list
end

local function ticketPayload(row)
	return {
		["id"] = TA.int(row.id),
		["type"] = row.type,
		["typeLabel"] = (typeConfig(row.type) or {}).label or row.type,
		["icon"] = (typeConfig(row.type) or {}).icon or "headset",
		["passport"] = TA.int(row.passport),
		["name"] = row.name,
		["message"] = row.message,
		["status"] = row.status,
		["staff_id"] = TA.int(row.staff_id),
		["staff_name"] = row.staff_name,
		["created_at"] = row.created_at,
		["accepted_at"] = row.accepted_at,
		["closed_at"] = row.closed_at,
		["rating"] = row.rating and TA.int(row.rating) or nil,
		["comment"] = row.comment,
		["key"] = TriadeAdmin.Open.TicketKey,
		["x"] = row.x, ["y"] = row.y, ["z"] = row.z
	}
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- JOGADOR: ABRIR MENU E CRIAR CHAMADO
-----------------------------------------------------------------------------------------------------------------------------------------
lib.callback.register("triade_admin:ticketMenu", function(source)
	local passport = vRP.getUserId(source)
	if not passport then return nil end

	local types = {}
	for _, entry in ipairs(TriadeAdmin.Tickets.Types) do
		types[#types + 1] = { ["id"] = entry.id, ["label"] = entry.label, ["icon"] = entry.icon }
	end

	return { ["types"] = types, ["key"] = TriadeAdmin.Open.TicketKey }
end)

lib.callback.register("triade_admin:ticketCreate", function(source, typeId, message)
	local passport = vRP.getUserId(source)
	if not passport then return { ok = false, message = "Jogador invalido." } end

	local config = typeConfig(typeId)
	if not config then return { ok = false, message = "Tipo de chamado invalido." } end

	message = TA.str(message, 300)
	if message == "" then return { ok = false, message = "Explique a sua situacao." } end

	local last = cooldown[passport] or 0
	if os.time() - last < TriadeAdmin.Tickets.Cooldown then
		return { ok = false, message = "Aguarde antes de abrir outro chamado." }
	end

	local open = MySQL.scalar.await("SELECT id FROM triade_admin_tickets WHERE passport = ? AND type = ? AND status IN ('aberto','atendimento')", { passport, typeId })
	if open then return { ok = false, message = "Voce ja possui um chamado em aberto." } end

	cooldown[passport] = os.time()

	local coords = TA.coords(source) or { x = 0.0, y = 0.0, z = 0.0 }
	local name = TA.fullName(passport)

	local id = MySQL.insert.await("INSERT INTO triade_admin_tickets (type, passport, name, message, status, x, y, z, created_at) VALUES (?, ?, ?, ?, 'aberto', ?, ?, ?, ?)", {
		typeId, passport, name, message, coords.x, coords.y, coords.z, TA.now()
	})

	local row = MySQL.single.await("SELECT * FROM triade_admin_tickets WHERE id = ?", { id })
	local payload = ticketPayload(row)

	for _, staffSource in ipairs(staffFor(typeId)) do
		TriggerClientEvent("triade_admin:ticketPopup", staffSource, payload)
		TriggerClientEvent("Notify", staffSource, "aviso", "Ha um novo <b>" .. config.label .. "</b> disponivel no painel!", 8000)
	end

	TA.notify(source, "sucesso", config.label .. " enviado com sucesso.", 6000)
	return { ok = true, message = "Chamado enviado.", id = id }
end)

lib.callback.register("triade_admin:ticketRate", function(source, ticketId, rating, comment)
	local passport = vRP.getUserId(source)
	if not passport then return false end

	ticketId = TA.int(ticketId)
	rating = math.max(1, math.min(5, TA.int(rating)))
	comment = TA.str(comment, 200)

	local row = MySQL.single.await("SELECT passport, rating FROM triade_admin_tickets WHERE id = ?", { ticketId })
	if not row or TA.int(row.passport) ~= TA.int(passport) or row.rating ~= nil then return false end

	MySQL.update.await("UPDATE triade_admin_tickets SET rating = ?, comment = ? WHERE id = ?", { rating, comment, ticketId })
	pendingRating[passport] = nil

	TA.notify(source, "sucesso", "Obrigado pela sua avaliacao!", 5000)
	return true
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTAS DO PAINEL
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("tickets", "tab.chamados", function(source)
	local rows = MySQL.query.await("SELECT * FROM triade_admin_tickets WHERE status IN ('aberto','atendimento') ORDER BY id ASC") or {}
	local tickets = {}
	for _, row in ipairs(rows) do tickets[#tickets + 1] = ticketPayload(row) end

	return { ["tickets"] = tickets, ["types"] = TriadeAdmin.Tickets.Types }
end)

TA.fetch("ticketHistory", "ticket.history", function(source, payload)
	local search = TA.str(payload.search, 64)
	local rows

	if search ~= "" then
		local like = "%" .. search .. "%"
		rows = MySQL.query.await("SELECT * FROM triade_admin_tickets WHERE status = 'finalizado' AND (passport = ? OR name LIKE ? OR staff_name LIKE ? OR message LIKE ?) ORDER BY id DESC LIMIT 200", {
			TA.int(search), like, like, like
		}) or {}
	else
		rows = MySQL.query.await("SELECT * FROM triade_admin_tickets WHERE status = 'finalizado' ORDER BY id DESC LIMIT 200") or {}
	end

	local tickets = {}
	for _, row in ipairs(rows) do tickets[#tickets + 1] = ticketPayload(row) end
	return { ["tickets"] = tickets }
end)

TA.fetch("ticketRanking", "ticket.history", function(source)
	local rows = MySQL.query.await([[
		SELECT staff_id, staff_name,
			COUNT(*) AS total,
			SUM(CASE WHEN rating IS NOT NULL THEN 1 ELSE 0 END) AS rated,
			AVG(rating) AS average
		FROM triade_admin_tickets
		WHERE status = 'finalizado' AND staff_id IS NOT NULL
		GROUP BY staff_id, staff_name
		ORDER BY total DESC
		LIMIT 50
	]]) or {}

	local ranking = {}
	for position, row in ipairs(rows) do
		ranking[#ranking + 1] = {
			["position"] = position,
			["staff_id"] = TA.int(row.staff_id),
			["staff_name"] = row.staff_name or "Desconhecido",
			["total"] = TA.int(row.total),
			["rated"] = TA.int(row.rated),
			["average"] = row.average and (math.floor(tonumber(row.average) * 10) / 10) or 0
		}
	end

	return { ["ranking"] = ranking }
end)

TA.fetch("ticketRatings", "ticket.history", function(source)
	local rows = MySQL.query.await("SELECT * FROM triade_admin_tickets WHERE rating IS NOT NULL ORDER BY id DESC LIMIT 200") or {}
	local ratings = {}

	for _, row in ipairs(rows) do
		ratings[#ratings + 1] = {
			["id"] = TA.int(row.id),
			["name"] = row.name,
			["passport"] = TA.int(row.passport),
			["staff_name"] = row.staff_name or "Desconhecido",
			["staff_id"] = TA.int(row.staff_id),
			["rating"] = TA.int(row.rating),
			["comment"] = row.comment or "",
			["closed_at"] = row.closed_at or row.created_at
		}
	end

	return { ["ratings"] = ratings }
end)

TA.fetch("ticketNotes", "ticket.history", function(source)
	local rows = MySQL.query.await([[
		SELECT staff_id, staff_name,
			COUNT(*) AS total,
			SUM(CASE WHEN rating IS NOT NULL THEN 1 ELSE 0 END) AS rated,
			AVG(rating) AS average,
			MIN(rating) AS worst,
			MAX(rating) AS best
		FROM triade_admin_tickets
		WHERE status = 'finalizado' AND staff_id IS NOT NULL
		GROUP BY staff_id, staff_name
		ORDER BY average DESC
		LIMIT 50
	]]) or {}

	local notes = {}
	for _, row in ipairs(rows) do
		notes[#notes + 1] = {
			["staff_id"] = TA.int(row.staff_id),
			["staff_name"] = row.staff_name or "Desconhecido",
			["total"] = TA.int(row.total),
			["rated"] = TA.int(row.rated),
			["average"] = row.average and (math.floor(tonumber(row.average) * 10) / 10) or 0,
			["worst"] = TA.int(row.worst),
			["best"] = TA.int(row.best)
		}
	end

	return { ["notes"] = notes }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES DO PAINEL
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("ticket.accept", "ticket.accept", function(source, payload)
	local id = TA.int(payload.id)
	local row = MySQL.single.await("SELECT * FROM triade_admin_tickets WHERE id = ?", { id })
	if not row then return { ok = false, message = "Chamado nao encontrado." } end
	if row.status ~= "aberto" then return { ok = false, message = "Este chamado ja foi aceite por " .. tostring(row.staff_name or "outra pessoa") .. "." } end

	local staffPassport = vRP.getUserId(source)
	local staffName = TA.fullName(staffPassport)

	MySQL.update.await("UPDATE triade_admin_tickets SET status = 'atendimento', staff_id = ?, staff_name = ?, accepted_at = ? WHERE id = ?", {
		staffPassport, staffName, TA.now(), id
	})

	local target = vRP.getUserSource(TA.int(row.passport))
	if target then
		TA.notify(target, "sucesso", "O seu chamado <b>#" .. id .. "</b> foi aceite por <b>" .. staffName .. "</b>.", 10000)
	end

	for _, staffSource in ipairs(staffFor(row.type)) do
		TriggerClientEvent("triade_admin:ticketClosePopup", staffSource, id)
	end

	TA.log(source, "chamado-aceitar", "#" .. id)
	return { ok = true, message = "Chamado #" .. id .. " aceite." }
end)

TA.action("ticket.close", "ticket.close", function(source, payload)
	local id = TA.int(payload.id)
	local row = MySQL.single.await("SELECT * FROM triade_admin_tickets WHERE id = ?", { id })
	if not row then return { ok = false, message = "Chamado nao encontrado." } end
	if row.status == "finalizado" then return { ok = false, message = "Este chamado ja foi finalizado." } end

	local staffPassport = vRP.getUserId(source)
	local staffName = TA.fullName(staffPassport)

	MySQL.update.await("UPDATE triade_admin_tickets SET status = 'finalizado', closed_at = ?, staff_id = COALESCE(staff_id, ?), staff_name = COALESCE(staff_name, ?) WHERE id = ?", {
		TA.now(), staffPassport, staffName, id
	})

	for _, staffSource in ipairs(staffFor(row.type)) do
		TriggerClientEvent("triade_admin:ticketClosePopup", staffSource, id)
	end

	local target = vRP.getUserSource(TA.int(row.passport))
	if target then
		pendingRating[TA.int(row.passport)] = id
		TriggerClientEvent("triade_admin:ticketRating", target, {
			["id"] = id,
			["staff"] = row.staff_name or staffName,
			["type"] = (typeConfig(row.type) or {}).label or row.type
		})
	end

	TA.log(source, "chamado-finalizar", "#" .. id)
	return { ok = true, message = "Chamado #" .. id .. " finalizado." }
end)

TA.action("ticket.goto", "ticket.accept", function(source, payload)
	local id = TA.int(payload.id)
	local row = MySQL.single.await("SELECT passport, x, y, z FROM triade_admin_tickets WHERE id = ?", { id })
	if not row then return { ok = false, message = "Chamado nao encontrado." } end

	local target = vRP.getUserSource(TA.int(row.passport))
	if target then
		SetPlayerRoutingBucket(source, GetPlayerRoutingBucket(target) or 0)
		local coords = TA.coords(target)
		if coords then
			TriggerClientEvent("triade_admin:teleport", source, coords.x, coords.y, coords.z)
			return { ok = true, message = "Teleportado ate o jogador." }
		end
	end

	if row.x and row.y and row.z then
		TriggerClientEvent("triade_admin:teleport", source, row.x, row.y, row.z)
		return { ok = true, message = "Teleportado para o local do chamado." }
	end

	return { ok = false, message = "Nao foi possivel localizar o jogador." }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- REENVIA CHAMADOS ABERTOS PARA STAFF QUE ENTRA
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("vRP:playerSpawn", function(passport, source)
	CreateThread(function()
		Wait(8000)
		local rows = MySQL.query.await("SELECT * FROM triade_admin_tickets WHERE status = 'aberto'") or {}
		for _, row in ipairs(rows) do
			local config = typeConfig(row.type)
			if config and TA.hasAny(passport, config.perms) then
				TriggerClientEvent("triade_admin:ticketPopup", source, ticketPayload(row))
			end
		end
	end)
end)
