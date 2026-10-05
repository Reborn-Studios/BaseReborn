-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA JOGADORES
-----------------------------------------------------------------------------------------------------------------------------------------
local MONEY_ITEM = "dollars"

-----------------------------------------------------------------------------------------------------------------------------------------
-- HELPERS
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.wallet(passport)
	local ok, result = pcall(function() return vRP.InventoryItemAmount(passport, MONEY_ITEM) end)
	if ok and type(result) == "table" then return TA.int(result[1]) end
	return 0
end

function TA.bank(passport)
	passport = TA.int(passport)

	if vRP.getUserSource(passport) then
		local ok, result = pcall(function() return vRP.getBank(passport) end)
		if ok and result ~= nil then return TA.int(result) end
	end

	return TA.int(MySQL.scalar.await("SELECT bank FROM characters WHERE id = ?", { passport }) or 0)
end

function TA.fines(passport)
	local ok, result = pcall(function() return vRP.getFines(passport) end)
	if ok then return TA.int(result) end
	return 0
end

function TA.coords(source)
	local ped = GetPlayerPed(source)
	if not ped or ped == 0 then return nil end
	local coords = GetEntityCoords(ped)
	return { ["x"] = coords.x, ["y"] = coords.y, ["z"] = coords.z, ["h"] = GetEntityHeading(ped) }
end

function TA.groupsOf(passport)
	local list = {}
	local ok, groups = pcall(function() return vRP.getUserGroups(passport) end)
	if not ok or type(groups) ~= "table" then return list end

	for group, level in pairs(groups) do
		local title = group
		local okTitle, result = pcall(function() return vRP.getGroupTitle(group, TA.int(level)) end)
		if okTitle and result then title = result end

		list[#list + 1] = {
			["group"] = group,
			["level"] = TA.int(level),
			["title"] = title
		}
	end

	table.sort(list, function(a, b) return string.lower(a.group) < string.lower(b.group) end)
	return list
end

function TA.warnCount(passport)
	return TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM triade_admin_warns WHERE passport = ?", { TA.int(passport) }) or 0)
end

function TA.onlineList()
	local players = {}
	for passport, source in pairs(vRP.getUsers()) do
		local name = TA.fullName(passport)
		players[#players + 1] = {
			["passport"] = TA.int(passport),
			["source"] = source,
			["name"] = name,
			["initials"] = TA.initials(name),
			["ping"] = GetPlayerPing(source) or 0,
			["bucket"] = GetPlayerRoutingBucket(source) or 0
		}
	end

	table.sort(players, function(a, b) return a.passport < b.passport end)
	return players
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTAS
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("players", "tab.jogadores", function(source)
	local players = TA.onlineList()

	local counters = {}
	for _, counter in ipairs(TriadeAdmin.Counters) do
		counters[#counters + 1] = { ["id"] = counter.id, ["label"] = counter.label, ["icon"] = counter.icon, ["value"] = 0 }
	end

	for _, player in ipairs(players) do
		for index, counter in ipairs(TriadeAdmin.Counters) do
			if TA.hasAny(player.passport, counter.perms) then
				counters[index].value = counters[index].value + 1
			end
		end
	end

	table.insert(counters, 1, { ["id"] = "total", ["label"] = "Jogadores Online", ["icon"] = "users", ["value"] = #players })

	return { ["players"] = players, ["counters"] = counters }
end)

TA.fetch("player", "tab.jogadores", function(source, payload)
	local passport = TA.int(payload.passport)
	if passport <= 0 then return nil end

	local identity = TA.identity(passport)
	if not identity then return nil end

	local target = vRP.getUserSource(passport)
	local name = TA.str(identity.name or "Individuo") .. " " .. TA.str(identity.name2 or "Indigente")

	return {
		["passport"] = passport,
		["name"] = name,
		["initials"] = TA.initials(name),
		["online"] = target ~= nil,
		["source"] = target or 0,
		["bucket"] = target and (GetPlayerRoutingBucket(target) or 0) or 0,
		["ping"] = target and (GetPlayerPing(target) or 0) or 0,
		["registration"] = TA.str(identity.registration or "-"),
		["phone"] = TA.str(identity.phone or "-"),
		["wallet"] = TA.wallet(passport),
		["bank"] = TA.bank(passport),
		["fines"] = TA.fines(passport),
		["warns"] = TA.warnCount(passport),
		["groups"] = TA.groupsOf(passport)
	}
end)

TA.fetch("inventory", "player.inventory", function(source, payload)
	local passport = TA.int(payload.passport)
	local target = vRP.getUserSource(passport)
	if not target then return { ["items"] = {}, ["online"] = false } end

	local items = {}
	if GetResourceState("ox_inventory") == "started" then
		local ok, list = pcall(function() return exports.ox_inventory:GetInventoryItems(target) end)
		if ok and type(list) == "table" then
			for _, item in pairs(list) do
				if item and item.name then
					items[#items + 1] = {
						["slot"] = TA.int(item.slot),
						["name"] = item.name,
						["label"] = item.label or item.name,
						["count"] = TA.int(item.count),
						["image"] = TA.itemImage(item.name)
					}
				end
			end
		end
	else
		local ok, list = pcall(function() return vRP.getInventory(passport) end)
		if ok and type(list) == "table" then
			for slot, item in pairs(list) do
				items[#items + 1] = {
					["slot"] = TA.int(slot),
					["name"] = item.item,
					["label"] = TA.itemLabel(item.item),
					["count"] = TA.int(item.amount),
					["image"] = TA.itemImage(item.item)
				}
			end
		end
	end

	table.sort(items, function(a, b) return a.slot < b.slot end)
	return { ["items"] = items, ["online"] = true }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
local function requireOnline(source, passport)
	local target = vRP.getUserSource(TA.int(passport))
	if not target then
		return nil, { ok = false, message = "Jogador nao esta online." }
	end
	if not TA.canTarget(source, passport) then
		return nil, { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end
	return target, nil
end

TA.action("player.goto", "player.goto", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	local targetBucket = GetPlayerRoutingBucket(target) or 0
	SetPlayerRoutingBucket(source, targetBucket)

	local coords = TA.coords(target)
	if not coords then return { ok = false, message = "Nao foi possivel localizar o jogador." } end

	TriggerClientEvent("triade_admin:teleport", source, coords.x, coords.y, coords.z)
	TA.log(source, "ir-ate", "Passaporte " .. TA.int(payload.passport))
	return { ok = true, message = "Voce foi teleportado ate o jogador." }
end)

TA.action("player.bring", "player.bring", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	local coords = TA.coords(source)
	if not coords then return { ok = false, message = "Nao foi possivel obter a sua posicao." } end

	SetPlayerRoutingBucket(target, GetPlayerRoutingBucket(source) or 0)
	TriggerClientEvent("triade_admin:teleport", target, coords.x, coords.y, coords.z)
	TA.notify(target, "importante", "Voce foi puxado por um membro da administracao.", 5000)
	TA.log(source, "puxar", "Passaporte " .. TA.int(payload.passport))
	return { ok = true, message = "Jogador puxado com sucesso." }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- VER TELA (PREVISUALIZACAO AO VIVO)
-----------------------------------------------------------------------------------------------------------------------------------------
local previewViewers = {} -- previewViewers[target] = { [admin] = true }
local previewAdmins = {}   -- previewAdmins[admin] = target

local function previewHasViewers(target)
	return previewViewers[target] and next(previewViewers[target]) ~= nil
end

local function previewAdd(target, admin)
	previewViewers[target] = previewViewers[target] or {}
	local first = not previewHasViewers(target)
	previewViewers[target][admin] = true
	if first then
		TriggerClientEvent("triade_admin:previewStart", target)
	end
end

local function previewRemove(target, admin)
	if not previewViewers[target] then return end
	previewViewers[target][admin] = nil
	if not previewHasViewers(target) then
		previewViewers[target] = nil
		if DoesPlayerExist(target) then
			TriggerClientEvent("triade_admin:previewStop", target)
		end
	end
end

-- Aviso unico por sessao com o tamanho real do primeiro frame: e a prova de que o resize odo
-- screenshot-basic esta (ou nao) ativo na VPS. ~10-20 KB = patch ok; 100 KB+ = ecra inteiro.
local previewFrameLogged = {}

local function logFirstFrame(target, size)
	if previewFrameLogged[target] then return end
	previewFrameLogged[target] = true
	local kb = math.floor((size or 0) / 1024)
	print("^5[triade_admin]^7 frame do alvo: ^1" .. kb .. " KB^7 (resize ativo = ~10-20 KB; ecra inteiro = 100 KB+).")
end

local function previewSettle(admin)
	local target = previewAdmins[admin]
	if not target then return end
	previewAdmins[admin] = nil
	previewRemove(target, admin)
	if DoesPlayerExist(admin) then
		TriggerClientEvent("triade_admin:previewStop", admin)
	end
end

TA.action("player.spectate", "player.spectate", function(source, payload)
	if previewAdmins[source] then
		previewSettle(source)
		TA.log(source, "ver-tela", "Fechou a previsualizacao.")
		return { ok = true, message = "Previsualizacao fechada." }
	end

	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	if GetResourceState("screenshot-basic") ~= "started" then
		return { ok = false, message = "O recurso screenshot-basic nao esta a correr." }
	end

	previewAdmins[source] = target
	previewAdd(target, source)
	TriggerClientEvent("triade_admin:previewActive", source)
	TA.log(source, "ver-tela", "Passaporte " .. TA.int(payload.passport) .. " (" .. TA.fullName(payload.passport) .. ")")
	return { ok = true, message = "Previsualizacao aberta. Use ESC para fechar." }
end)

RegisterNetEvent("triade_admin:previewFrame", function(frame)
	local target = source
	if not previewHasViewers(target) then return end

	logFirstFrame(target, #frame)

	for admin in pairs(previewViewers[target]) do
		if DoesPlayerExist(admin) then
			TriggerClientEvent("triade_admin:previewFrame", admin, frame)
		else
			previewViewers[target][admin] = nil
		end
	end
end)

RegisterNetEvent("triade_admin:previewStopSession", function()
	previewSettle(source)
end)

AddEventHandler("playerDropped", function()
	previewSettle(source)

	local viewers = previewViewers[source]
	if viewers then
		for admin in pairs(viewers) do
			if admin ~= source then
				previewSettle(admin)
			end
		end
		previewViewers[source] = nil
	end
end)

TA.action("player.revive", "player.revive", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	pcall(function() vRP.Revive(target, 200, false) end)
	TriggerClientEvent("triade_admin:revive", target)
	TA.notify(target, "sucesso", "Voce foi revivido pela administracao.", 5000)
	TA.log(source, "reviver", "Passaporte " .. TA.int(payload.passport))
	return { ok = true, message = "Jogador revivido." }
end)

TA.action("player.freeze", "player.freeze", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	local state = payload.state == true
	TriggerClientEvent("triade_admin:freeze", target, state)
	TA.notify(target, state and "negado" or "sucesso", state and "Voce foi congelado pela administracao." or "Voce foi descongelado.", 5000)
	TA.log(source, state and "congelar" or "descongelar", "Passaporte " .. TA.int(payload.passport))
	return { ok = true, message = state and "Jogador congelado." or "Jogador descongelado." }
end)

TA.action("player.message", "player.message", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	local message = TA.str(payload.message, 240)
	if message == "" then return { ok = false, message = "Escreva uma mensagem." } end

	TriggerClientEvent("Notify", target, "importante", "<b>Administracao:</b><br>" .. message, 15000)
	TriggerClientEvent("chatMessage", target, "ADMINISTRACAO", { 41, 128, 255 }, message)
	TA.log(source, "mensagem", "Passaporte " .. TA.int(payload.passport) .. " | " .. message)
	return { ok = true, message = "Mensagem enviada." }
end)

TA.action("player.rg", "player.rg", function(source, payload)
	local passport = TA.int(payload.passport)
	local identity = TA.identity(passport)
	if not identity then return { ok = false, message = "Passaporte nao encontrado." } end

	local text = "<b>Passaporte:</b> " .. passport ..
		"<br><b>Nome:</b> " .. TA.str(identity.name) .. " " .. TA.str(identity.name2) ..
		"<br><b>RG:</b> " .. TA.str(identity.registration) ..
		"<br><b>Telefone:</b> " .. TA.str(identity.phone) ..
		"<br><b>Carteira:</b> R$ " .. TA.money(TA.wallet(passport)) ..
		"<br><b>Banco:</b> R$ " .. TA.money(TA.bank(passport)) ..
		"<br><b>Multas:</b> R$ " .. TA.money(TA.fines(passport))

	TA.notify(source, "importante", text, 20000)
	return { ok = true, message = "Consulta enviada na tela." }
end)

TA.action("player.addmoney", "player.money", function(source, payload)
	local passport = TA.int(payload.passport)
	local amount = TA.int(payload.amount)
	if amount <= 0 then return { ok = false, message = "Informe um valor valido." } end

	if payload.account == "bank" then
		pcall(function() vRP.addBank(passport, amount, "Painel administrativo") end)
	else
		local target = vRP.getUserSource(passport)
		if not target then return { ok = false, message = "O jogador precisa estar online para receber dinheiro na carteira." } end
		pcall(function() vRP.giveInventoryItem(passport, MONEY_ITEM, amount, true) end)
	end

	TA.log(source, "add-dinheiro", "Passaporte " .. passport .. " | " .. amount .. " | " .. tostring(payload.account))
	return { ok = true, message = "Dinheiro adicionado com sucesso." }
end)

TA.action("player.remmoney", "player.money", function(source, payload)
	local passport = TA.int(payload.passport)
	local amount = TA.int(payload.amount)
	if amount <= 0 then return { ok = false, message = "Informe um valor valido." } end

	if payload.account == "bank" then
		pcall(function() vRP.delBank(passport, amount, "Painel administrativo") end)
	else
		local removed = false
		pcall(function() removed = vRP.tryGetInventoryItem(passport, MONEY_ITEM, amount) end)
		if not removed then return { ok = false, message = "O jogador nao possui esse valor na carteira." } end
	end

	TA.log(source, "rem-dinheiro", "Passaporte " .. passport .. " | " .. amount .. " | " .. tostring(payload.account))
	return { ok = true, message = "Dinheiro removido com sucesso." }
end)

TA.action("player.clearweapons", "player.clearweapons", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	TriggerClientEvent("triade_admin:clearWeapons", target)

	if GetResourceState("ox_inventory") == "started" then
		local ok, list = pcall(function() return exports.ox_inventory:GetInventoryItems(target) end)
		if ok and type(list) == "table" then
			for _, item in pairs(list) do
				if item and item.name and string.lower(item.name):sub(1, 7) == "weapon_" then
					pcall(function() exports.ox_inventory:RemoveItem(target, item.name, item.count, nil, item.slot) end)
				end
			end
		end
	end

	TA.log(source, "limpar-armas", "Passaporte " .. TA.int(payload.passport))
	return { ok = true, message = "Armas removidas." }
end)

TA.action("player.kick", "player.kick", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	local reason = TA.str(payload.reason, 120)
	if reason == "" then reason = "Voce foi expulso da cidade." end

	pcall(function() vRP.kick(TA.int(payload.passport), reason) end)
	TA.log(source, "kick", "Passaporte " .. TA.int(payload.passport) .. " | " .. reason)
	return { ok = true, message = "Jogador expulso." }
end)

TA.action("player.ban", "player.ban", function(source, payload)
	local passport = TA.int(payload.passport)
	if not TA.canTarget(source, passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end
	return TA.banPassport(source, passport, TA.str(payload.reason, 200))
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- INVENTARIO
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("inventory.add", "player.inventory.edit", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	local item = TA.str(payload.item, 64)
	local amount = TA.int(payload.amount)
	if item == "" or amount <= 0 then return { ok = false, message = "Informe o item e a quantidade." } end

	pcall(function() vRP.giveInventoryItem(TA.int(payload.passport), item, amount, true) end)
	TA.log(source, "inv-add", "Passaporte " .. TA.int(payload.passport) .. " | " .. item .. " x" .. amount)
	return { ok = true, message = "Item adicionado ao inventario." }
end)

TA.action("inventory.remove", "player.inventory.edit", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	local item = TA.str(payload.item, 64)
	local amount = TA.int(payload.amount)
	if item == "" or amount <= 0 then return { ok = false, message = "Informe o item e a quantidade." } end

	if GetResourceState("ox_inventory") == "started" and payload.slot then
		pcall(function() exports.ox_inventory:RemoveItem(target, item, amount, nil, TA.int(payload.slot)) end)
	else
		pcall(function() vRP.tryGetInventoryItem(TA.int(payload.passport), item, amount) end)
	end

	TA.log(source, "inv-rem", "Passaporte " .. TA.int(payload.passport) .. " | " .. item .. " x" .. amount)
	return { ok = true, message = "Item removido do inventario." }
end)

TA.action("inventory.clear", "player.inventory.edit", function(source, payload)
	local target, failure = requireOnline(source, payload.passport)
	if failure then return failure end

	if GetResourceState("ox_inventory") == "started" then
		pcall(function() exports.ox_inventory:ClearInventory(target) end)
	else
		pcall(function() vRP.clearInventory(TA.int(payload.passport)) end)
	end

	TA.log(source, "inv-limpar", "Passaporte " .. TA.int(payload.passport))
	return { ok = true, message = "Inventario limpo." }
end)
