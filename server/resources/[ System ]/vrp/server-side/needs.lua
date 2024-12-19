-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEHEALTH
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.updateHealth(health)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local data = vRP.getUserDataTable(user_id)
		if data then
			data.health = health
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEARMOUR
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.updateArmour(armour)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local data = vRP.getUserDataTable(user_id)
		if data then
			data.armour = armour
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDAGRADETHIRST
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.upgradeThirst(user_id,amount)
	local source = vRP.getUserSource(user_id)
	local data = vRP.getUserDataTable(user_id)
	if data then
		if data.thirst == nil then
			data.thirst = 100
		else
			data.thirst = data.thirst + amount
			if data.thirst >= 100 then
				data.thirst = 100
			end
		end

		TriggerClientEvent("statusThirst",source,data.thirst)
		TriggerClientEvent("esx_status:onTick",source,{
			{ name = "hunger", percent = data.hunger },
			{ name = "thirst", percent = data.thirst },
			{ name = "stress", percent = data.stress },
		})
		TriggerClientEvent("esx_status:add",source,"thirst",amount)
		local Player = QBCore.Functions.GetPlayer(source)
		if Player then
			Player.PlayerData.metadata["thirst"] = data.thirst
			Player.Functions.UpdatePlayerData()
		end
	end
end

function vRP.clientUpgradeThirst(amount)
	local source = source
	local user_id = vRP.getUserId(source)
	vRP.upgradeThirst(user_id,amount)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPGRADEHUNGER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.upgradeHunger(user_id,amount)
	local source = vRP.getUserSource(user_id)
	local data = vRP.getUserDataTable(user_id)
	if data then
		if data.hunger == nil then
			data.hunger = 100
		else
			data.hunger = data.hunger + amount
			if data.hunger >= 100 then
				data.hunger = 100
			end
		end

		TriggerClientEvent("statusHunger",source,data.hunger)
		TriggerClientEvent("esx_status:onTick",source,{
			{ name = "hunger", percent = data.hunger },
			{ name = "thirst", percent = data.thirst },
			{ name = "stress", percent = data.stress },
		})
		TriggerClientEvent("esx_status:add",source,"hunger",amount)
		local Player = QBCore.Functions.GetPlayer(source)
		if Player then
			Player.PlayerData.metadata["hunger"] = data.hunger
			Player.Functions.UpdatePlayerData()
		end
	end
end

function vRP.clientUpgradeHunger(amount)
	local source = source
	local user_id = vRP.getUserId(source)
	vRP.upgradeHunger(user_id,amount)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DOWNGRADETHIRST
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.downgradeThirst(user_id,amount)
	local source = vRP.getUserSource(user_id)
	local data = vRP.getUserDataTable(user_id)
	if data then
		if data.thirst == nil then
			data.thirst = 100
		else
			data.thirst = data.thirst - amount
			if data.thirst <= 0 then
				data.thirst = 0
			end
		end

		TriggerClientEvent("statusThirst",source,data.thirst)
		TriggerClientEvent("esx_status:onTick",source,{
			{ name = "hunger", percent = data.hunger },
			{ name = "thirst", percent = data.thirst },
			{ name = "stress", percent = data.stress },
		})
		TriggerClientEvent("esx_status:remove",source,"thirst",amount)
		local Player = QBCore.Functions.GetPlayer(source)
		if Player then
			Player.PlayerData.metadata["thirst"] = data.thirst
			Player.Functions.UpdatePlayerData()
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DOWNGRADEHUNGER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.downgradeHunger(user_id,amount)
	local source = vRP.getUserSource(user_id)
	local data = vRP.getUserDataTable(user_id)
	if data then
		if data.hunger == nil then
			data.hunger = 100
		else
			data.hunger = data.hunger - amount
			if data.hunger <= 0 then
				data.hunger = 0
			end
		end

		TriggerClientEvent("statusHunger",source,data.hunger)
		TriggerClientEvent("esx_status:onTick",source,{
			{ name = "hunger", percent = data.hunger },
			{ name = "thirst", percent = data.thirst },
			{ name = "stress", percent = data.stress },
		})
		TriggerClientEvent("esx_status:remove",source,"hunger",amount)
		local Player = QBCore.Functions.GetPlayer(source)
		if Player then
			Player.PlayerData.metadata["hunger"] = data.hunger
			Player.Functions.UpdatePlayerData()
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPGRADESTRESS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.upgradeStress(user_id,amount)
	local source = vRP.getUserSource(user_id)
	local data = vRP.getUserDataTable(user_id)
	if data then
		if data.stress == nil then
			data.stress = amount
		else
			data.stress = data.stress + amount
			if data.stress >= 100 then
				data.stress = 100
			end
		end

		TriggerClientEvent("statusStress",source,data.stress)
		TriggerClientEvent("esx_status:onTick",source,{
			{ name = "hunger", percent = data.hunger },
			{ name = "thirst", percent = data.thirst },
			{ name = "stress", percent = data.stress },
		})
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DOWNGRADESTRESS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.downgradeStress(user_id,amount)
	local source = vRP.getUserSource(user_id)
	local data = vRP.getUserDataTable(user_id)
	if data then
		if data.stress == nil then
			data.stress = amount
		else
			data.stress = data.stress - amount
			if data.stress <= 0 then
				data.stress = 0
			end
		end

		TriggerClientEvent("statusStress",source,data.stress)
		TriggerClientEvent("esx_status:onTick",source,{
			{ name = "hunger", percent = data.hunger },
			{ name = "thirst", percent = data.thirst },
			{ name = "stress", percent = data.stress },
		})
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HUNGER / THIRST
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	local needs = Reborn.needs()
	while true do
		Wait(needs['Tempo']*1000)
		local users = vRP.getUsers()
		for k,v in pairs(users) do
			vRP.downgradeThirst(k, needs['Sede'])
			vRP.downgradeHunger(k, needs['Fome'])
		end
	end
end)
