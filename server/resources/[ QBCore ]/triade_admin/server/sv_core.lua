-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - NUCLEO DO SERVIDOR
-----------------------------------------------------------------------------------------------------------------------------------------
Tunnel = module("vrp", "lib/Tunnel") or {}
Proxy = module("vrp", "lib/Proxy") or {}

vRP = Proxy.getInterface("vRP")
Reborn = Proxy.getInterface("Reborn")
vRPclient = Tunnel.getInterface("vRP")

TA = {}
TA.Actions = {}
TA.Fetchers = {}
TA.PermissionOverrides = {}

-----------------------------------------------------------------------------------------------------------------------------------------
-- HELPERS
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.int(value)
	local n = tonumber(value)
	if not n then return 0 end
	return math.floor(n)
end

function TA.num(value, fallback)
	local n = tonumber(value)
	if not n then return fallback or 0.0 end
	return n + 0.0
end

function TA.str(value, maxLength)
	if value == nil then return "" end
	local text = tostring(value)
	text = text:gsub("[%z\1-\8\11\12\14-\31]", "")
	if maxLength and #text > maxLength then
		text = text:sub(1, maxLength)
	end
	return text
end

function TA.money(value)
	local ok, formatted = pcall(function() return vRP.format(TA.int(value)) end)
	if ok and formatted then return formatted end
	return tostring(TA.int(value))
end

function TA.notify(source, kind, message, time)
	if not source then return end
	TriggerClientEvent("Notify", source, kind or "aviso", message or "", time or 5000)
end

function TA.now()
	return os.date("%Y-%m-%d %H:%M:%S")
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- IDENTIDADE / NOMES
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.identity(passport)
	passport = TA.int(passport)
	if passport <= 0 then return nil end
	local ok, identity = pcall(function() return vRP.getUserIdentity(passport) end)
	if ok and identity and identity.name then return identity end

	local rows = MySQL.query.await("SELECT * FROM characters WHERE id = ?", { passport })
	if rows and rows[1] then return rows[1] end
	return nil
end

function TA.fullName(passport)
	local identity = TA.identity(passport)
	if not identity then return "Desconhecido" end
	return TA.str(identity.name or "Individuo") .. " " .. TA.str(identity.name2 or "Indigente")
end

function TA.initials(name)
	local parts = {}
	for word in tostring(name or ""):gmatch("%S+") do parts[#parts + 1] = word end
	if #parts == 0 then return "??" end
	if #parts == 1 then return string.upper(parts[1]:sub(1, 2)) end
	return string.upper(parts[1]:sub(1, 1) .. parts[2]:sub(1, 1))
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CARGOS DO PAINEL
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.hasAny(passport, perms)
	if not perms then return false end
	for _, perm in pairs(perms) do
		local ok, result = pcall(function() return vRP.hasPermission(passport, perm) end)
		if ok and result then return true end
	end
	return false
end

function TA.role(source)
	local passport = vRP.getUserId(source)
	if not passport then return nil, nil end
	for _, role in ipairs(TriadeAdmin.Roles) do
		if TA.hasAny(passport, role.perms) then
			return role.id, passport
		end
	end
	return nil, passport
end

function TA.allowedForRole(roleId, key)
	if not roleId then return false end
	if not key then return true end

	local override = TA.PermissionOverrides[key]
	if override ~= nil and override[roleId] ~= nil then
		return override[roleId] == true
	end

	local definition = TriadeAdmin.Permissions[key]
	if not definition then return true end
	return definition.access[roleId] == true
end

function TA.allowed(source, key)
	return TA.allowedForRole(TA.role(source), key)
end

function TA.permissionTable(source)
	local roleId = TA.role(source)
	local result = {}
	if not roleId then return result end
	for key in pairs(TriadeAdmin.Permissions) do
		result[key] = TA.allowedForRole(roleId, key)
	end
	return result
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- HIERARQUIA (impede que um staff mexa em alguem de cargo igual ou superior)
-----------------------------------------------------------------------------------------------------------------------------------------
local roleWeight = {}
for index, role in ipairs(TriadeAdmin.Roles) do
	roleWeight[role.id] = #TriadeAdmin.Roles - index + 1
end

function TA.roleOfPassport(passport)
	for _, role in ipairs(TriadeAdmin.Roles) do
		if TA.hasAny(passport, role.perms) then return role.id end
	end
	return nil
end

function TA.canTarget(source, targetPassport)
	local sourceRole, sourcePassport = TA.role(source)
	if not sourceRole then return false end
	if TA.int(sourcePassport) == TA.int(targetPassport) then return true end

	local targetRole = TA.roleOfPassport(TA.int(targetPassport))
	if not targetRole then return true end

	local mine = roleWeight[sourceRole] or 0
	local theirs = roleWeight[targetRole] or 0
	return mine > theirs
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- LOGS
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.log(source, action, details)
	local passport = vRP.getUserId(source) or 0
	local name = passport > 0 and TA.fullName(passport) or "Console"

	MySQL.insert("INSERT INTO triade_admin_logs (staff_id, staff_name, action, details, created_at) VALUES (?, ?, ?, ?, ?)", {
		passport, name, TA.str(action, 64), TA.str(details, 512), TA.now()
	})

	local ok, webhooks = pcall(function() return module("vrp", "config/webhooks") end)
	if ok and webhooks and type(webhooks.webhookadmin) == "string" and webhooks.webhookadmin ~= "" then
		pcall(function()
			vRP.createWeebHook(webhooks.webhookadmin, "```prolog\n[STAFF]: " .. name .. " #" .. passport .. "\n[ACAO]: " .. TA.str(action, 64) .. "\n[DETALHES]: " .. TA.str(details, 400) .. os.date("\n[DATA]: %d/%m/%Y [HORA]: %H:%M:%S") .. "\r```")
		end)
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- REGISTRO DE ACOES E CONSULTAS
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.action(key, permission, handler)
	TA.Actions[key] = { ["permission"] = permission, ["handler"] = handler }
end

function TA.fetch(key, permission, handler)
	TA.Fetchers[key] = { ["permission"] = permission, ["handler"] = handler }
end

lib.callback.register("triade_admin:action", function(source, key, payload)
	local entry = TA.Actions[key]
	if not entry then
		return { ok = false, message = "Acao desconhecida." }
	end

	if not TA.allowed(source, entry.permission) then
		TA.notify(source, "negado", "Voce nao tem permissao para executar esta acao.", 5000)
		return { ok = false, message = "Sem permissao." }
	end

	local ok, result = pcall(entry.handler, source, payload or {})
	if not ok then
		print("^1[triade_admin]^7 erro na acao '" .. tostring(key) .. "': " .. tostring(result))
		return { ok = false, message = "Erro interno ao executar a acao." }
	end

	return result or { ok = true }
end)

lib.callback.register("triade_admin:fetch", function(source, key, payload)
	local entry = TA.Fetchers[key]
	if not entry then return nil end

	if not TA.allowed(source, entry.permission) then
		return nil
	end

	local ok, result = pcall(entry.handler, source, payload or {})
	if not ok then
		print("^1[triade_admin]^7 erro na consulta '" .. tostring(key) .. "': " .. tostring(result))
		return nil
	end

	return result
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ABERTURA DO PAINEL
-----------------------------------------------------------------------------------------------------------------------------------------
lib.callback.register("triade_admin:open", function(source)
	-- Silencioso de proposito: qualquer jogador pode carregar na tecla sem receber aviso.
	local roleId, passport = TA.role(source)
	if not roleId then return nil end

	local roleLabel = "Staff"
	for _, role in ipairs(TriadeAdmin.Roles) do
		if role.id == roleId then roleLabel = role.label end
	end

	local name = TA.fullName(passport)

	return {
		["brand"] = TriadeAdmin.Brand,
		["tabs"] = TriadeAdmin.Tabs,
		["role"] = { ["id"] = roleId, ["label"] = roleLabel },
		["staff"] = {
			["passport"] = passport,
			["name"] = name,
			["initials"] = TA.initials(name)
		},
		["permissions"] = TA.permissionTable(source),
		["images"] = TriadeAdmin.Images.RemoteURL,
		["map"] = TriadeAdmin.Map,
		["weather"] = TriadeAdmin.Weather.Types,
		["warnReasons"] = TriadeAdmin.Warn.Reasons,
		["warnTimes"] = TriadeAdmin.Warn.Times,
		["online"] = TA.onlineCount()
	}
end)

function TA.onlineCount()
	local total = 0
	for _ in pairs(vRP.getUsers()) do total = total + 1 end
	return total
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- EXPORTS UTEIS PARA OUTROS RECURSOS
-----------------------------------------------------------------------------------------------------------------------------------------
exports("hasPanelAccess", function(source)
	local roleId = TA.role(source)
	return roleId ~= nil
end)

exports("panelRole", function(source)
	local roleId = TA.role(source)
	return roleId
end)
