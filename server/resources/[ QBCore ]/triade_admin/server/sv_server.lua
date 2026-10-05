-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA SERVIDOR
-----------------------------------------------------------------------------------------------------------------------------------------
local function identifierOf(passport)
	local column = TA.Schema.charactersIdentifier or "identifier"
	local row = MySQL.single.await("SELECT `" .. column .. "` AS ident FROM characters WHERE id = ?", { TA.int(passport) })
	if row and row.ident and row.ident ~= "" then return row.ident end

	local ok, identity = pcall(function() return vRP.getUserIdentity(TA.int(passport)) end)
	if ok and identity then return identity.identifier or identity.license or identity.steam end
	return nil
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- BANIMENTOS
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.banPassport(source, passport, reason)
	passport = TA.int(passport)
	if passport <= 0 then return { ok = false, message = "Informe um passaporte valido." } end

	local identifier = identifierOf(passport)
	if not identifier then return { ok = false, message = "Passaporte nao encontrado." } end

	reason = TA.str(reason, 200)
	if reason == "" then reason = "Sem motivo informado." end

	MySQL.update.await("UPDATE accounts SET banned = 1 WHERE " .. (TA.Schema.accountsIdentifier or "identifier") .. " = ?", { identifier })
	pcall(function() vRP.execute("vRP/set_banned", { identifier = tostring(identifier), banned = 1 }) end)

	local staffPassport = vRP.getUserId(source) or 0
	MySQL.insert("INSERT INTO triade_admin_bans (passport, name, identifier, action, reason, staff_id, staff_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", {
		passport, TA.fullName(passport), tostring(identifier), "ban", reason, staffPassport, TA.fullName(staffPassport), TA.now()
	})

	local target = vRP.getUserSource(passport)
	if target then
		pcall(function() vRP.kick(passport, "Voce foi banido. Motivo: " .. reason) end)
	end

	TA.log(source, "banir", "Passaporte " .. passport .. " | " .. reason)
	return { ok = true, message = "Passaporte " .. passport .. " banido." }
end

function TA.unbanPassport(source, passport, reason)
	passport = TA.int(passport)
	local identifier = identifierOf(passport)
	if not identifier then return { ok = false, message = "Passaporte nao encontrado." } end

	reason = TA.str(reason, 200)
	if reason == "" then return { ok = false, message = "O motivo do desbanimento e obrigatorio." } end

	MySQL.update.await("UPDATE accounts SET banned = 0 WHERE " .. (TA.Schema.accountsIdentifier or "identifier") .. " = ?", { identifier })
	pcall(function() vRP.execute("vRP/set_banned", { identifier = tostring(identifier), banned = 0 }) end)

	local staffPassport = vRP.getUserId(source) or 0
	MySQL.insert("INSERT INTO triade_admin_bans (passport, name, identifier, action, reason, staff_id, staff_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", {
		passport, TA.fullName(passport), tostring(identifier), "unban", reason, staffPassport, TA.fullName(staffPassport), TA.now()
	})

	TA.log(source, "desbanir", "Passaporte " .. passport .. " | " .. reason)
	return { ok = true, message = "Passaporte " .. passport .. " desbanido." }
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTAS
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("server", "tab.servidor", function(source)
	local bans = TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM triade_admin_bans WHERE action = 'ban'") or 0)
	return {
		["online"] = TA.onlineCount(),
		["bans"] = bans,
		["uptime"] = math.floor(GetGameTimer() / 1000)
	}
end)

TA.fetch("banhistory", "server.banhistory", function(source, payload)
	local search = TA.str(payload.search, 64)
	local rows

	if search ~= "" then
		local like = "%" .. search .. "%"
		rows = MySQL.query.await("SELECT * FROM triade_admin_bans WHERE passport = ? OR name LIKE ? OR staff_name LIKE ? OR reason LIKE ? ORDER BY id DESC LIMIT 200", {
			TA.int(search), like, like, like
		})
	else
		rows = MySQL.query.await("SELECT * FROM triade_admin_bans ORDER BY id DESC LIMIT 200")
	end

	return { ["records"] = rows or {} }
end)

TA.fetch("permissions", "server.permissions", function(source)
	local groups = {}
	local order = {}

	for key, definition in pairs(TriadeAdmin.Permissions) do
		local groupName = definition.group or "Geral"
		if not groups[groupName] then
			groups[groupName] = {}
			order[#order + 1] = groupName
		end

		local access = {}
		for _, role in ipairs(TriadeAdmin.Roles) do
			local override = TA.PermissionOverrides[key]
			if override and override[role.id] ~= nil then
				access[role.id] = override[role.id]
			else
				access[role.id] = definition.access[role.id] == true
			end
		end

		table.insert(groups[groupName], { ["key"] = key, ["label"] = definition.label, ["access"] = access })
	end

	table.sort(order)
	local result = {}
	for _, groupName in ipairs(order) do
		table.sort(groups[groupName], function(a, b) return a.label < b.label end)
		result[#result + 1] = { ["group"] = groupName, ["items"] = groups[groupName] }
	end

	return { ["roles"] = TriadeAdmin.Roles, ["groups"] = result }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("server.permissions.set", "server.permissions", function(source, payload)
	local key = TA.str(payload.key, 64)
	local role = TA.str(payload.role, 32)
	local allowed = payload.allowed == true

	if not TriadeAdmin.Permissions[key] then return { ok = false, message = "Permissao invalida." } end

	local validRole = false
	for _, item in ipairs(TriadeAdmin.Roles) do
		if item.id == role then validRole = true end
	end
	if not validRole then return { ok = false, message = "Cargo invalido." } end

	MySQL.query.await("REPLACE INTO triade_admin_permissions (perm_key, role, allowed) VALUES (?, ?, ?)", { key, role, allowed and 1 or 0 })
	TA.loadPermissions()

	TA.log(source, "permissao", key .. " | " .. role .. " = " .. tostring(allowed))
	return { ok = true, message = "Permissao atualizada." }
end)

TA.action("server.permissions.reset", "server.permissions", function(source)
	MySQL.query.await("DELETE FROM triade_admin_permissions")
	TA.loadPermissions()
	TA.log(source, "permissao-reset", "Permissoes restauradas para o padrao")
	return { ok = true, message = "Permissoes restauradas para o padrao." }
end)

TA.action("server.whitelist", "server.whitelist", function(source, payload)
	local passport = TA.int(payload.passport)
	local identifier = identifierOf(passport)
	if not identifier then return { ok = false, message = "Passaporte nao encontrado." } end

	MySQL.update.await("UPDATE accounts SET whitelist = 1 WHERE " .. (TA.Schema.accountsIdentifier or "identifier") .. " = ?", { identifier })
	pcall(function() vRP.execute("vRP/set_whitelist", { identifier = tostring(identifier), whitelist = 1 }) end)

	TA.log(source, "whitelist", "Liberou o passaporte " .. passport)
	return { ok = true, message = "Whitelist liberada para o passaporte " .. passport .. "." }
end)

TA.action("server.unwhitelist", "server.unwhitelist", function(source, payload)
	local passport = TA.int(payload.passport)
	local identifier = identifierOf(passport)
	if not identifier then return { ok = false, message = "Passaporte nao encontrado." } end

	MySQL.update.await("UPDATE accounts SET whitelist = 0 WHERE " .. (TA.Schema.accountsIdentifier or "identifier") .. " = ?", { identifier })
	pcall(function() vRP.execute("vRP/set_whitelist", { identifier = tostring(identifier), whitelist = 0 }) end)

	TA.log(source, "unwhitelist", "Removeu a whitelist do passaporte " .. passport)
	return { ok = true, message = "Whitelist removida do passaporte " .. passport .. "." }
end)

TA.action("server.ban", "server.ban", function(source, payload)
	if not TA.canTarget(source, payload.passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end
	return TA.banPassport(source, payload.passport, payload.reason)
end)

TA.action("server.unban", "server.unban", function(source, payload)
	return TA.unbanPassport(source, payload.passport, payload.reason)
end)

TA.action("server.rg", "server.rg", function(source, payload)
	local passport = TA.int(payload.passport)
	local identity = TA.identity(passport)
	if not identity then return { ok = false, message = "Passaporte nao encontrado." } end

	local groups = {}
	for _, entry in ipairs(TA.groupsOf(passport)) do
		groups[#groups + 1] = entry.group
	end

	return {
		ok = true,
		message = "Consulta realizada.",
		data = {
			["passport"] = passport,
			["name"] = TA.str(identity.name) .. " " .. TA.str(identity.name2),
			["registration"] = TA.str(identity.registration),
			["phone"] = TA.str(identity.phone),
			["wallet"] = TA.wallet(passport),
			["bank"] = TA.bank(passport),
			["fines"] = TA.fines(passport),
			["groups"] = groups,
			["online"] = vRP.getUserSource(passport) ~= nil
		}
	}
end)

TA.action("server.announce", "server.announce", function(source, payload)
	local message = TA.str(payload.message, 300)
	if message == "" then return { ok = false, message = "Escreva a mensagem do aviso." } end

	TriggerClientEvent("Notify", -1, "importante", "<b>ADMINISTRACAO</b><br>" .. message, 15000)
	TriggerClientEvent("chatMessage", -1, "ADMINISTRACAO", { 41, 128, 255 }, message)

	TA.log(source, "aviso-geral", message)
	return { ok = true, message = "Aviso enviado para todos os jogadores." }
end)

TA.action("server.addmoney", "server.addmoney", function(source, payload)
	return TA.Actions["player.addmoney"].handler(source, payload)
end)

TA.action("server.remmoney", "server.remmoney", function(source, payload)
	return TA.Actions["player.remmoney"].handler(source, payload)
end)

TA.action("server.dm", "server.dm", function(source, payload)
	return TA.Actions["player.message"].handler(source, payload)
end)

TA.action("server.waypoint", "server.waypoint", function(source)
	TriggerClientEvent("triade_admin:teleportWaypoint", source)
	return { ok = true, message = "Teleportando para o waypoint." }
end)

TA.action("server.tpcoords", "server.tpcoords", function(source, payload)
	local raw = TA.str(payload.coords, 120)
	local numbers = {}
	for value in raw:gmatch("%-?%d+%.?%d*") do
		numbers[#numbers + 1] = tonumber(value)
	end

	if #numbers < 3 then return { ok = false, message = "Use o formato X, Y, Z." } end

	TriggerClientEvent("triade_admin:teleport", source, numbers[1], numbers[2], numbers[3])
	TA.log(source, "tp-coords", raw)
	return { ok = true, message = "Teleportado." }
end)

TA.action("server.hash", "server.hash", function(source)
	local result = lib.callback.await("triade_admin:nearVehicle", source)
	if not result or not result.model then return { ok = false, message = "Nenhum veiculo por perto." } end

	return {
		ok = true,
		message = "Veiculo: " .. result.model .. " | Hash: " .. result.hash,
		data = result
	}
end)

TA.action("server.repair", "server.repair", function(source)
	TriggerClientEvent("triade_admin:repairVehicle", source)
	return { ok = true, message = "Veiculo reparado." }
end)

TA.action("server.reviveall", "server.reviveall", function(source)
	for passport, target in pairs(vRP.getUsers()) do
		pcall(function() vRP.Revive(target, 200, false) end)
		TriggerClientEvent("triade_admin:revive", target)
	end

	TriggerClientEvent("Notify", -1, "sucesso", "A administracao restaurou a vida de todos os jogadores.", 8000)
	TA.log(source, "reviver-todos", "Todos os jogadores online")
	return { ok = true, message = "Todos os jogadores foram revividos." }
end)

TA.action("server.clearvehicles", "server.clearvehicles", function(source)
	TriggerClientEvent("Notify", -1, "aviso", "Limpeza de veiculos em 10 segundos. Guarde o seu veiculo!", 10000)

	SetTimeout(10000, function()
		TriggerClientEvent("triade_admin:clearVehicles", -1)
	end)

	TA.log(source, "limpar-veiculos", "Limpeza global de veiculos vazios")
	return { ok = true, message = "Limpeza de veiculos iniciada." }
end)

TA.action("server.clearprops", "server.clearprops", function(source, payload)
	local radius = TA.int(payload.radius)
	if radius <= 0 then radius = 100 end

	TriggerClientEvent("triade_admin:clearProps", source, radius)
	TA.log(source, "limpar-props", "Raio " .. radius)
	return { ok = true, message = "Props removidos num raio de " .. radius .. " metros." }
end)

TA.action("server.delvehicle", "server.delvehicle", function(source)
	TriggerClientEvent("triade_admin:deleteVehicle", source)
	TA.log(source, "deletar-veiculo", "Veiculo atual/proximo")
	return { ok = true, message = "Veiculo deletado." }
end)

TA.action("server.wipeid", "server.wipeid", function(source, payload)
	local passport = TA.int(payload.passport)
	if passport <= 0 then return { ok = false, message = "Informe um passaporte valido." } end

	if vRP.getUserSource(passport) then
		return { ok = false, message = "O jogador precisa estar offline para limpar os dados." }
	end

	if not TA.canTarget(source, passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end

	local name = TA.fullName(passport)

	local total, detail, errors = TA.wipeCharacterData(passport, false)

	if #errors > 0 then
		print("^1[triade_admin]^7 wipe do passaporte " .. passport .. " com " .. #errors .. " erro(s):")
		for _, message in ipairs(errors) do print("   ^1- " .. message .. "^7") end
	end

	MySQL.query.await("DELETE FROM characters WHERE id = ?", { passport })

	local tabelas = {}
	for _, row in ipairs(detail) do tabelas[#tabelas + 1] = row["table"] .. "(" .. row.rows .. ")" end

	TA.log(source, "wipe-id", "Passaporte " .. passport .. " (" .. name .. ") | " .. total .. " linhas em " .. #detail .. " tabelas | " .. table.concat(tabelas, " "))

	local message = "Passaporte " .. passport .. " apagado: " .. total .. " linha(s) em " .. #detail .. " tabela(s), mais a ficha do personagem."
	if #errors > 0 then
		message = message .. " " .. #errors .. " tabela(s) deram erro -- veja a consola."
	end

	return { ok = true, message = message }
end)
