local groupFarms = {
	['rifleammo'] = "Milicia",
	['smgammo'] = "Milicia",
	['shotgunammo'] = "Milicia",
	['pistolammo'] = "Milicia",
	["capsule"] = "Milicia",
	["gunpowder"] = "Milicia",
}

config.canCarry = function(user_id, item, qtd)
	local canCarry = vRP.inventoryWeight(user_id)+vRP.itemWeightList(item)*qtd <= vRP.getBackpack(user_id)
	if GetResourceState("ld_factions") == "started" and canCarry and groupFarms[item] and vRP.hasPermission(user_id,groupFarms[item]) then
		exports["ld_factions"]:UpdateMetas(user_id, groupFarms[item], item, parseInt(qtd))
	end
	return canCarry
end

config.getPoliceNumber = function()
	return vRP.getUsersByPermission("policia.permissao")
end

config.getItemAmount = function(user_id, item)
	return vRP.getInventoryItemAmount(user_id, item)
end

config.hasPermission = function(user_id, perm)
	return vRP.hasPermission(user_id, perm)
end

config.callPolice = function(source, user_id, x,y,z, titulo, mensagem, cor)
	local identity = vRP.getUserIdentity(user_id)
	if user_id then
		local soldado = vRP.getUsersByPermission("policia.permissao")
		for l,w in pairs(soldado) do
			local player = vRP.getUserSource(parseInt(w))
			if player then
				async(function()
					TriggerClientEvent("NotifyPush",player,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = mensagem, code = 5, title = titulo, x = x, y = y, z = z, rgba = {170,80,25} })
				end)
			end
		end
	end
end

config.getPlayerName = function(user_id)
	local identity = vRP.getUserIdentity(tonumber(user_id))
	return identity.name.." "..identity.name2
end

config.getInventoryWeight = function(user_id)
	return vRP.inventoryWeight(user_id)
end

config.getItemWeight = function(item)
	return vRP.itemWeightList(item)
end

config.getInventoryMaxWeight = function(user_id)
	return vRP.getBackpack(user_id)
end

config.getInventoryItemAmount = function(user_id, item)
	return vRP.getInventoryItemAmount(user_id,item)
end

config.itemNameList = function(item)
	return vRP.itemNameList(item)
end