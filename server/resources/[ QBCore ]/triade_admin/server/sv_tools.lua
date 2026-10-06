-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - FERRAMENTAS
-----------------------------------------------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAT DA STAFF - TABELA
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(2000)

	pcall(function()
		MySQL.query.await([[
			CREATE TABLE IF NOT EXISTS `triade_admin_chat` (
				`id` INT(11) NOT NULL AUTO_INCREMENT,
				`staff_id` INT(11) NOT NULL DEFAULT 0,
				`staff_name` VARCHAR(100) NULL DEFAULT NULL,
				`staff_role` VARCHAR(32) NULL DEFAULT NULL,
				`message` VARCHAR(400) NOT NULL,
				`created_at` DATETIME NULL DEFAULT NULL,
				PRIMARY KEY (`id`)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
		]])
	end)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- RESOURCES
-----------------------------------------------------------------------------------------------------------------------------------------
local protectedIndex = {}
for _, name in ipairs(TriadeAdmin.ProtectedResources or {}) do
	protectedIndex[string.lower(name)] = true
end

local function isProtected(name)
	return protectedIndex[string.lower(tostring(name))] == true
end

TA.fetch("resources", "resource.view", function(source)
	local list = {}

	for index = 0, GetNumResources() - 1 do
		local name = GetResourceByFindIndex(index)
		-- `_cfx_internal` e o resource interno do FXServer; listar so confunde.
		if name and name ~= "_cfx_internal" then
			list[#list + 1] = {
				["name"] = name,
				["state"] = GetResourceState(name),
				["version"] = GetResourceMetadata(name, "version", 0) or "",
				["author"] = GetResourceMetadata(name, "author", 0) or "",
				["protected"] = isProtected(name)
			}
		end
	end

	table.sort(list, function(a, b) return string.lower(a.name) < string.lower(b.name) end)

	local counts = { ["started"] = 0, ["stopped"] = 0, ["other"] = 0 }
	for _, entry in ipairs(list) do
		if entry.state == "started" then counts.started = counts.started + 1
		elseif entry.state == "stopped" then counts.stopped = counts.stopped + 1
		else counts.other = counts.other + 1 end
	end

	return { ["resources"] = list, ["counts"] = counts, ["total"] = #list }
end)

TA.action("resource.control", "resource.control", function(source, payload)
	local name = TA.str(payload.name, 128)
	local mode = TA.str(payload.mode, 16)

	if name == "" then return { ok = false, message = "Informe o resource." } end
	if mode ~= "start" and mode ~= "stop" and mode ~= "restart" then
		return { ok = false, message = "Acao invalida." }
	end

	if GetResourceState(name) == "missing" then
		return { ok = false, message = "O resource '" .. name .. "' nao existe." }
	end

	-- Parar o painel a partir do painel deixa a NUI presa com o rato capturado; parar a vRP ou
	-- o oxmysql derruba o servidor. Recusamos antes de executar.
	if isProtected(name) and mode ~= "start" then
		return { ok = false, message = "'" .. name .. "' esta protegido: use a consola do servidor para o parar ou reiniciar." }
	end

	local ok = pcall(function()
		if mode == "start" then StartResource(name)
		elseif mode == "stop" then StopResource(name)
		else
			StopResource(name)
			Wait(400)
			StartResource(name)
		end
	end)

	if not ok then return { ok = false, message = "Falha ao executar a acao em '" .. name .. "'." } end

	Wait(300)
	TA.log(source, "resource-" .. mode, name)

	return {
		ok = true,
		message = "'" .. name .. "' -> " .. mode .. ". Estado agora: " .. GetResourceState(name) .. ".",
		data = { ["name"] = name, ["state"] = GetResourceState(name) }
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- METRICAS E RANKINGS
-----------------------------------------------------------------------------------------------------------------------------------------
local function scalar(query, params)
	local ok, value = pcall(function() return MySQL.scalar.await(query, params) end)
	if ok then return TA.int(value) end
	return 0
end

TA.fetch("metrics", "metrics.view", function(source)
	local totals = {
		{ ["id"] = "characters",	["label"] = "Personagens",		["icon"] = "users",		["value"] = scalar("SELECT COUNT(*) FROM characters") },
		{ ["id"] = "accounts",		["label"] = "Contas",			["icon"] = "idcard",	["value"] = scalar("SELECT COUNT(*) FROM accounts") },
		{ ["id"] = "whitelisted",	["label"] = "Com whitelist",	["icon"] = "check",		["value"] = scalar("SELECT COUNT(*) FROM accounts WHERE whitelist = 1") },
		{ ["id"] = "banned",		["label"] = "Contas banidas",	["icon"] = "ban",		["value"] = scalar("SELECT COUNT(*) FROM accounts WHERE banned = 1") },
		{ ["id"] = "vehicles",		["label"] = "Veiculos",			["icon"] = "car",		["value"] = scalar("SELECT COUNT(*) FROM owned_vehicles") },
		{ ["id"] = "houses",		["label"] = "Casas com dono",	["icon"] = "folder",	["value"] = scalar("SELECT COUNT(*) FROM player_houses") },
		{ ["id"] = "warns",			["label"] = "Advertencias",		["icon"] = "alert",		["value"] = scalar("SELECT COUNT(*) FROM triade_admin_warns") },
		{ ["id"] = "tickets",		["label"] = "Chamados",			["icon"] = "headset",	["value"] = scalar("SELECT COUNT(*) FROM triade_admin_tickets") }
	}

	local money = {
		{ ["id"] = "bank",	["label"] = "Total no banco",	["value"] = scalar("SELECT COALESCE(SUM(bank), 0) FROM characters") },
		{ ["id"] = "taxes",	["label"] = "Total em multas",	["value"] = scalar("SELECT COALESCE(SUM(Price), 0) FROM taxes") }
	}

	local function ranking(query)
		local rows = MySQL.query.await(query) or {}
		local list = {}
		for position, row in ipairs(rows) do
			list[#list + 1] = {
				["position"] = position,
				["passport"] = TA.int(row.id or row.passport),
				["name"] = TA.str(row.name or "") .. " " .. TA.str(row.name2 or ""),
				["value"] = TA.int(row.value)
			}
		end
		return list
	end

	return {
		["totals"] = totals,
		["money"] = money,
		["online"] = TA.onlineCount(),
		["uptime"] = math.floor(GetGameTimer() / 1000),
		["rankings"] = {
			{
				["id"] = "bank", ["label"] = "Maiores saldos no banco", ["icon"] = "moneyin", ["suffix"] = "money",
				["rows"] = ranking("SELECT id, name, name2, bank AS value FROM characters ORDER BY bank DESC LIMIT 25")
			},
			{
				["id"] = "vehicles", ["label"] = "Mais veiculos na garagem", ["icon"] = "car", ["suffix"] = "veiculo(s)",
				["rows"] = ranking([[
					SELECT c.id, c.name, c.name2, COUNT(o.plate) AS value
					FROM characters c INNER JOIN owned_vehicles o ON o.owner = CAST(c.id AS CHAR)
					GROUP BY c.id, c.name, c.name2 ORDER BY value DESC LIMIT 25
				]])
			},
			{
				["id"] = "taxes", ["label"] = "Maiores dividas em multas", ["icon"] = "moneyout", ["suffix"] = "money",
				["rows"] = ranking([[
					SELECT c.id, c.name, c.name2, COALESCE(SUM(t.Price), 0) AS value
					FROM characters c INNER JOIN taxes t ON t.Passport = c.id
					GROUP BY c.id, c.name, c.name2 ORDER BY value DESC LIMIT 25
				]])
			},
			{
				["id"] = "warns", ["label"] = "Mais advertencias", ["icon"] = "alert", ["suffix"] = "advertencia(s)",
				["rows"] = ranking([[
					SELECT c.id, c.name, c.name2, COUNT(w.id) AS value
					FROM characters c INNER JOIN triade_admin_warns w ON w.passport = c.id
					GROUP BY c.id, c.name, c.name2 ORDER BY value DESC LIMIT 25
				]])
			}
		}
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- PERSONAGENS (inclui os offline)
-----------------------------------------------------------------------------------------------------------------------------------------
local CHARACTER_PAGE_MAX = 100

TA.fetch("characters", "character.view", function(source, payload)
	local search = TA.str(payload.search, 64)
	local page = math.max(1, TA.int(payload.page))
	local size = TA.int(payload.size)
	if size <= 0 or size > CHARACTER_PAGE_MAX then size = 48 end

	local where, params = "", {}

	if search ~= "" then
		local like = "%" .. search .. "%"
		where = [[ WHERE c.id = ? OR c.name LIKE ? OR c.name2 LIKE ? OR c.phone LIKE ? OR c.registration LIKE ? ]]
		params = { TA.int(search), like, like, like, like }
	end

	local total = TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM characters c" .. where, params) or 0)

	local offset = (page - 1) * size
	local rows = MySQL.query.await([[
		SELECT c.id, c.name, c.name2, c.phone, c.registration, c.bank, c.identifier,
			(SELECT COUNT(*) FROM owned_vehicles o WHERE o.owner = CAST(c.id AS CHAR)) AS vehicles,
			(SELECT COUNT(*) FROM triade_admin_warns w WHERE w.passport = c.id) AS warns,
			(SELECT COALESCE(SUM(t.Price), 0) FROM taxes t WHERE t.Passport = c.id) AS fines,
			a.banned AS banned, a.whitelist AS whitelist
		FROM characters c
		LEFT JOIN accounts a ON a.identifier = c.identifier
	]] .. where .. [[
		ORDER BY c.id ASC LIMIT ]] .. size .. [[ OFFSET ]] .. offset, params) or {}

	local characters = {}
	for _, row in ipairs(rows) do
		local passport = TA.int(row.id)
		local name = TA.str(row.name) .. " " .. TA.str(row.name2)

		characters[#characters + 1] = {
			["passport"] = passport,
			["name"] = name,
			["initials"] = TA.initials(name),
			["age"] = TA.int(row.age),
			["phone"] = TA.str(row.phone or "-"),
			["registration"] = TA.str(row.registration or "-"),
			["bank"] = TA.int(row.bank),
			["vehicles"] = TA.int(row.vehicles),
			["warns"] = TA.int(row.warns),
			["fines"] = TA.int(row.fines),
			["banned"] = TA.int(row.banned) == 1,
			["whitelist"] = TA.int(row.whitelist) == 1 or row.whitelist == true,
			["online"] = vRP.getUserSource(passport) ~= nil
		}
	end

	return {
		["characters"] = characters,
		["total"] = total,
		["page"] = page,
		["size"] = size
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- REGISTO DE ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
local LOG_PAGE_MAX = 200

TA.fetch("logs", "log.view", function(source, payload)
	local search = TA.str(payload.search, 64)
	local page = math.max(1, TA.int(payload.page))
	local size = TA.int(payload.size)
	if size <= 0 or size > LOG_PAGE_MAX then size = 48 end

	local where, params = "", {}
	if search ~= "" then
		local like = "%" .. search .. "%"
		where = " WHERE staff_id = ? OR staff_name LIKE ? OR action LIKE ? OR details LIKE ?"
		params = { TA.int(search), like, like, like }
	end

	local total = TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM triade_admin_logs" .. where, params) or 0)

	local offset = (page - 1) * size
	local rows = MySQL.query.await(
		"SELECT * FROM triade_admin_logs" .. where .. " ORDER BY id DESC LIMIT " .. size .. " OFFSET " .. offset,
		params
	) or {}

	-- As acoes mais usadas, para dar um atalho de filtro na interface.
	local actions = MySQL.query.await("SELECT action, COUNT(*) AS total FROM triade_admin_logs GROUP BY action ORDER BY total DESC LIMIT 20") or {}

	return { ["logs"] = rows, ["total"] = total, ["page"] = page, ["size"] = size, ["actions"] = actions }
end)

TA.action("log.clear", "log.clear", function(source, payload)
	local days = TA.int(payload.days)

	local removed
	if days > 0 then
		removed = MySQL.update.await("DELETE FROM triade_admin_logs WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)", { days })
	else
		removed = MySQL.update.await("DELETE FROM triade_admin_logs")
	end

	-- Registamos a limpeza DEPOIS de apagar, para a linha nova nao ser apagada por ela propria.
	TA.log(source, "log-limpar", days > 0 and ("mais antigos que " .. days .. " dia(s): " .. TA.int(removed) .. " linha(s)") or ("tudo: " .. TA.int(removed) .. " linha(s)"))

	return { ok = true, message = TA.int(removed) .. " linha(s) removida(s) do registo." }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAT DA STAFF
-----------------------------------------------------------------------------------------------------------------------------------------
local function staffSources()
	local list = {}
	for passport, target in pairs(vRP.getUsers()) do
		local roleId = TA.roleOfPassport(passport)
		if roleId and TA.allowedForRole(roleId, "chat.read") then
			list[#list + 1] = target
		end
	end
	return list
end

TA.fetch("chat", "chat.read", function(source, payload)
	local rows = MySQL.query.await("SELECT * FROM triade_admin_chat ORDER BY id DESC LIMIT 100") or {}

	-- A consulta vem ao contrario (para o LIMIT apanhar as mais recentes) e a interface quer as
	-- mais antigas em cima, como qualquer chat.
	local messages = {}
	for index = #rows, 1, -1 do
		local row = rows[index]
		messages[#messages + 1] = {
			["id"] = TA.int(row.id),
			["staff_id"] = TA.int(row.staff_id),
			["staff_name"] = row.staff_name or "Desconhecido",
			["staff_role"] = row.staff_role or "",
			["message"] = row.message or "",
			["created_at"] = row.created_at
		}
	end

	return { ["messages"] = messages, ["me"] = vRP.getUserId(source) or 0 }
end)

TA.action("chat.send", "chat.send", function(source, payload)
	local message = TA.str(payload.message, 400)
	if message == "" then return { ok = false, message = "Escreva alguma coisa." } end

	local roleId, passport = TA.role(source)
	local roleLabel = roleId or ""
	for _, role in ipairs(TriadeAdmin.Roles) do
		if role.id == roleId then roleLabel = role.label end
	end

	local name = TA.fullName(passport)
	local now = TA.now()

	local id = MySQL.insert.await("INSERT INTO triade_admin_chat (staff_id, staff_name, staff_role, message, created_at) VALUES (?, ?, ?, ?, ?)", {
		passport, name, roleLabel, message, now
	})

	local payloadOut = {
		["id"] = TA.int(id),
		["staff_id"] = TA.int(passport),
		["staff_name"] = name,
		["staff_role"] = roleLabel,
		["message"] = message,
		["created_at"] = now
	}

	-- Empurramos para toda a staff online, e nao so para quem tem o painel aberto: quem o abrir
	-- a seguir carrega o historico pela consulta e ve o mesmo.
	for _, target in ipairs(staffSources()) do
		TriggerClientEvent("triade_admin:chat", target, payloadOut)
	end

	return { ok = true, message = "", data = payloadOut }
end)

TA.action("chat.clear", "chat.clear", function(source)
	local removed = MySQL.update.await("DELETE FROM triade_admin_chat")

	for _, target in ipairs(staffSources()) do
		TriggerClientEvent("triade_admin:chatCleared", target)
	end

	TA.log(source, "chat-limpar", TA.int(removed) .. " mensagem(ns)")
	return { ok = true, message = TA.int(removed) .. " mensagem(ns) apagada(s)." }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- PRINT DA TELA DO JOGADOR
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("player.screenshot", "player.screenshot", function(source, payload)
	local passport = TA.int(payload.passport)
	local target = vRP.getUserSource(passport)

	if not target then return { ok = false, message = "O jogador precisa estar online." } end
	if not TA.canTarget(source, passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end

	if GetResourceState("screenshot-basic") ~= "started" then
		return { ok = false, message = "O recurso screenshot-basic nao esta a correr." }
	end

	local name = TA.fullName(passport)
	TA.log(source, "print-tela", "Passaporte " .. passport .. " (" .. name .. ")")

	exports["screenshot-basic"]:requestClientScreenshot(target, {
		["encoding"] = "jpg",
		["quality"] = 0.75
	}, function(err, data)
		if err or not data then
			TA.notify(source, "negado", "Nao foi possivel capturar a tela do passaporte " .. passport .. ".", 6000)
			return
		end

		TriggerClientEvent("triade_admin:screenshot", source, {
			["passport"] = passport,
			["name"] = name,
			["image"] = data,
			["at"] = TA.now()
		})
	end)

	return { ok = true, message = "Print pedido ao passaporte " .. passport .. ". Abre sozinho quando chegar." }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONVENIENCIAS
-----------------------------------------------------------------------------------------------------------------------------------------
local function selfToggle(key, permission, event)
	TA.action(key, permission, function(source, payload)
		local state = payload.state == true
		TriggerClientEvent(event, source, state)
		return { ok = true, message = "" }
	end)
end

selfToggle("self.godmode", "self.godmode", "triade_admin:godmode")
selfToggle("self.invisible", "self.invisible", "triade_admin:invisible")

TA.action("dev.toggle", "dev.tools", function(source, payload)
	local key = TA.str(payload.key, 32)
	local state = payload.state == true

	local allowed = { ["vehicles"] = true, ["peds"] = true, ["objects"] = true, ["coords"] = true }
	if not allowed[key] then return { ok = false, message = "Opcao desconhecida." } end

	TriggerClientEvent("triade_admin:devToggle", source, key, state)
	return { ok = true, message = "" }
end)

TA.action("dev.viewdistance", "dev.tools", function(source, payload)
	local value = TA.num(payload.value, 1.0)
	if value < 0.5 then value = 0.5 end
	if value > 10.0 then value = 10.0 end

	TriggerClientEvent("triade_admin:viewDistance", source, value)
	return { ok = true, message = "Distancia de visao em " .. string.format("%.1f", value) .. "x." }
end)

TA.action("dev.entityinfo", "dev.tools", function(source)
	local result = lib.callback.await("triade_admin:entityInfo", source)
	if not result then return { ok = false, message = "Nenhuma entidade na mira." } end

	TA.log(source, "info-entidade", tostring(result.model) .. " em " .. tostring(result.coords))
	return { ok = true, message = "Entidade identificada.", data = result }
end)

TA.action("dev.deleteclosest", "dev.delete", function(source, payload)
	local kind = TA.str(payload.kind, 16)
	if kind ~= "ped" and kind ~= "object" and kind ~= "vehicle" then
		return { ok = false, message = "Tipo invalido." }
	end

	local result = lib.callback.await("triade_admin:deleteClosest", source, kind)
	if not result or not result.ok then
		return { ok = false, message = "Nenhum " .. kind .. " por perto." }
	end

	TA.log(source, "apagar-" .. kind, tostring(result.model))
	return { ok = true, message = (result.label or kind) .. " removido." }
end)

TA.action("vehicle.quality", "vehicle.quality", function(source, payload)
	local key = TA.str(payload.key, 16)

	local allowed = { ["wash"] = true, ["lock"] = true, ["unlock"] = true, ["fuel"] = true }
	if not allowed[key] then return { ok = false, message = "Acao desconhecida." } end

	local result = lib.callback.await("triade_admin:vehicleQuality", source, key)
	if not result or not result.ok then
		return { ok = false, message = result and result.message or "Nenhum veiculo por perto." }
	end

	return { ok = true, message = result.message or "Feito." }
end)
