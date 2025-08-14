-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEPOSITIONS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.updatePositions(x,y,z)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local data = vRP.getUserDataTable(user_id)
		if data then
			data.position = { x = tvRP.mathLegth(x), y = tvRP.mathLegth(y), z = tvRP.mathLegth(z) }
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEWEAPONS
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.updateWeapons(weapons)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local data = vRP.getUserDataTable(user_id)
		if data then
			data.weaps = weapons
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATECUSTOMIZATION
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.updateCustomization(customization)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local data = vRP.getUserDataTable(user_id)
		if data then
			data.customization = customization
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MATHLEGTH
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.mathLegth(n)
	return math.ceil(n*100)/100
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRYDELETEENTITY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("tryDeleteEntity")
AddEventHandler("tryDeleteEntity",function(index)
	TriggerClientEvent("syncDeleteEntity",-1,index)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRYCLEANENTITY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("tryCleanEntity")
AddEventHandler("tryCleanEntity",function(index)
	TriggerClientEvent("syncCleanEntity",-1,index)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRYDELETEPEDADMIN
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("tryDeletePedAdmin")
AddEventHandler("tryDeletePedAdmin",function(entIndex)
	local idNetwork = NetworkGetEntityFromNetworkId(entIndex[1])
	if DoesEntityExist(idNetwork) and not IsPedAPlayer(idNetwork) and GetEntityType(idNetwork) == 1 then
		DeleteEntity(idNetwork)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRYDELETEOBJECT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("tryDeleteObject")
AddEventHandler("tryDeleteObject",function(entIndex)
	local idNetwork = NetworkGetEntityFromNetworkId(entIndex)
	if DoesEntityExist(idNetwork) and not IsPedAPlayer(idNetwork) and GetEntityType(idNetwork) == 3 then
		DeleteEntity(idNetwork)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRYDELETEPED
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("tryDeletePed")
AddEventHandler("tryDeletePed",function(entIndex)
	local idNetwork = NetworkGetEntityFromNetworkId(entIndex)
	if DoesEntityExist(idNetwork) and not IsPedAPlayer(idNetwork) and GetEntityType(idNetwork) == 1 then
		DeleteEntity(idNetwork)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GRIDCHUNK
-----------------------------------------------------------------------------------------------------------------------------------------
function GridChunk(x)
	return math.floor((x + 8192) / 128)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOCHANNEL
-----------------------------------------------------------------------------------------------------------------------------------------
function ToChannel(v)
	return (v.x << 8) | v.y
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETGRIDZONE
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getGridzone(x,y)
	local gridChunk = vector2(GridChunk(x),GridChunk(y))
	return ToChannel(gridChunk)
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- MODELPLAYER
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.modelPlayer(source)
	local ped = GetPlayerPed(source)
	if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") then
		return "mp_m_freemode_01"
	elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") then
		return "mp_f_freemode_01"
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATEPED
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.CreatePed(model,x,y,z,heading,typ)
	local spawnPeds = 0
	local mHash = GetHashKey(model)
	local Ped = CreatePed(typ,mHash,x,y,z,heading,true,false)

	while not DoesEntityExist(Ped) and spawnPeds <= 1000 do
		spawnPeds = spawnPeds + 1
		Citizen.Wait(1)
	end

	if DoesEntityExist(Ped) then
		return true,NetworkGetNetworkIdFromEntity(Ped)
	end

	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYER SPAWN
-----------------------------------------------------------------------------------------------------------------------------------------
local vipWeights = {
	["Diamante"] = 100,
	["Platina"] = 50,
	["Ouro"] = 30,
	["Prata"] = 20,
	["Bronze"] = 10
}

AddEventHandler("vRP:playerSpawn",function(user_id,source)
    local source = source
	local data = vRP.getUserDataTable(user_id)
	if data then
		if data.hunger == nil then
			data.hunger = 100
			data.thirst = 100
		end
		if data.health then
			vRPclient.setHealth(source,data.health)
			local colete = data.armour
			vRPclient.setArmour(source,colete)
			SetTimeout(5000,function()
				vRPclient.setHealth(source,data.health)
				if colete then
					source = vRP.getUserSource(user_id)
					if source then
						vRPclient.setArmour(source,colete)
					end
				end
			end)
		end
		if data.weaps then
			vRPclient.giveWeapons(source,data.weaps,true)
		end
		if data.customization then
			vRPclient.setCustomization(source,data.customization)
		end
		TriggerClientEvent("statusHunger",source,data.hunger)
		TriggerClientEvent("statusThirst",source,data.thirst)
	end
end)

AddEventHandler("vRP:playerJoinGroup",function (user_id,group,gtype)
	Wait(1000)
	local nplayer = vRP.getUserSource(user_id)
	if nplayer and vipWeights[group] and vRP.hasPermission(user_id, "vip.permissao") then
		if gtype and gtype == "vip" then
			if GetResourceState("ox_inventory") == "started" then
				local inventory = exports.ox_inventory:GetInventory(nplayer)
				local backpack = inventory.maxWeight / 1000
				if backpack then
					backpack = backpack + vipWeights[group]
					exports.ox_inventory:SetMaxWeight(nplayer, backpack * 1000)
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BUCKET SERVER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("vRP:BucketServer")
AddEventHandler("vRP:BucketServer", function(source, value, bucket)
    if value == "Enter" then
        SetPlayerRoutingBucket(source, bucket)
    else
        SetPlayerRoutingBucket(source, 0)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- Hosting Session
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("hostingSession")
RegisterServerEvent("hostedSession")

local currentHosting
local hostReleaseCallbacks = {}

AddEventHandler("hostingSession",function()
	if currentHosting then
		TriggerClientEvent("sessionHostResult", source,"wait")
		table.insert(hostReleaseCallbacks,function()
            TriggerClientEvent("sessionHostResult", source,"free")
		end)

		return
	end

	if GetHostId() then
		if GetPlayerLastMsg(GetHostId()) < 1000 then
			TriggerClientEvent("sessionHostResult",source,"conflict")
			return
		end
	end

	hostReleaseCallbacks = {}

	currentHosting = source

	TriggerClientEvent("sessionHostResult",source,"go")

	SetTimeout(5000,function()
		if not currentHosting then
			return
		end

		currentHosting = nil

		for _,cb in ipairs(hostReleaseCallbacks) do
			cb()
		end
	end)
end)

AddEventHandler("hostedSession",function()
	if currentHosting ~= source then
		return
	end

	for _,cb in ipairs(hostReleaseCallbacks) do
		cb()
	end

	currentHosting = nil
end)

EnableEnhancedHostSupport(true)
