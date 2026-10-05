-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA ITENS
-----------------------------------------------------------------------------------------------------------------------------------------
local itemCache = nil
local itemIndex = {}

local function vrpItemList()
	local ok, list = pcall(function() return module("vrp", "config/Itemlist") end)
	if ok and type(list) == "table" then return list end

	local okReborn, rebornList = pcall(function() return Reborn.itemList() end)
	if okReborn and type(rebornList) == "table" then return rebornList end

	return {}
end

function TA.itemImage(name)
	if not name or name == "" then return "unknown.png" end
	name = tostring(name)

	local entry = itemIndex[string.lower(name)]
	if entry and entry.image and entry.image ~= "" then return entry.image end

	if string.lower(name):sub(1, 7) == "weapon_" then
		return string.upper(name) .. ".png"
	end

	return name .. ".png"
end

function TA.itemCount()
	if not itemCache then return 0 end
	return #itemCache
end

function TA.itemLabel(name)
	if not name then return "Desconhecido" end
	local entry = itemIndex[string.lower(tostring(name))]
	if entry and entry.label then return entry.label end
	return tostring(name)
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSTRUCAO DO CATALOGO DE ITENS
-----------------------------------------------------------------------------------------------------------------------------------------
local function buildItems()
	local list = {}
	local vrpItems = vrpItemList()
	itemIndex = {}

	local function register(name, label, image, weight, itemType)
		local key = string.lower(tostring(name))
		if itemIndex[key] then return end

		local entry = {
			["name"] = tostring(name),
			["label"] = tostring(label or name),
			["image"] = image,
			["weight"] = weight or 0,
			["type"] = itemType or "item"
		}

		itemIndex[key] = entry
		list[#list + 1] = entry
	end

	if GetResourceState("ox_inventory") == "started" then
		local ok, items = pcall(function() return exports.ox_inventory:Items() end)
		if ok and type(items) == "table" then
			for name, data in pairs(items) do
				if type(data) == "table" then
					local image = nil
					local vrpItem = vrpItems[name]

					if vrpItem and vrpItem.index then
						image = tostring(vrpItem.index) .. ".png"
					elseif data.client and data.client.image then
						image = tostring(data.client.image)
					elseif string.lower(name):sub(1, 7) == "weapon_" then
						image = string.upper(name) .. ".png"
					else
						image = name .. ".png"
					end

					register(name, (vrpItem and vrpItem.name) or data.label or name, image, data.weight or 0, data.weapon and "weapon" or "item")
				end
			end
		end
	end

	for name, data in pairs(vrpItems) do
		if type(data) == "table" then
			local image = data.index and (tostring(data.index) .. ".png") or (name .. ".png")
			register(name, data.name or name, image, data.weight or 0, data.type or "item")
		end
	end

	table.sort(list, function(a, b) return string.lower(a.label) < string.lower(b.label) end)
	itemCache = list

	print("^2[triade_admin]^7 catalogo de itens carregado: ^2" .. #list .. "^7 item(ns).")
end

CreateThread(function()
	local waited = 0
	while GetResourceState("ox_inventory") == "starting" and waited < 60000 do
		Wait(500)
		waited = waited + 500
	end

	Wait(2000)

	for attempt = 1, 6 do
		pcall(buildItems)
		if TA.itemCount() > 0 then return end
		if attempt < 6 then Wait(5000) end
	end

	print("^3[triade_admin]^7 catalogo de itens vazio depois de 6 tentativas. Use ^3triadeadmin_itens^7 na consola quando o servidor estabilizar.")
end)

RegisterNetEvent("Reborn:reloadInfos", function()
	pcall(buildItems)
end)

RegisterCommand("triadeadmin_itens", function(source)
	if source ~= 0 then return end
	pcall(buildItems)
end, true)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTA
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("items", "tab.itens", function(source)
	if not itemCache then pcall(buildItems) end
	return { ["items"] = itemCache or {} }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("item.spawn", "item.spawn", function(source, payload)
	local item = TA.str(payload.item, 64)
	local amount = TA.int(payload.amount)
	if amount <= 0 then amount = 1 end
	if item == "" then return { ok = false, message = "Informe o item." } end

	local passport = TA.int(payload.passport)
	if passport <= 0 then
		passport = vRP.getUserId(source)
	end

	if not passport then return { ok = false, message = "Passaporte invalido." } end

	local target = vRP.getUserSource(passport)
	if not target then return { ok = false, message = "O jogador precisa estar online." } end

	pcall(function() vRP.giveInventoryItem(passport, item, amount, true) end)

	TA.log(source, "spawn-item", item .. " x" .. amount .. " => passaporte " .. passport)
	return { ok = true, message = amount .. "x " .. TA.itemLabel(item) .. " entregue(s)." }
end)
