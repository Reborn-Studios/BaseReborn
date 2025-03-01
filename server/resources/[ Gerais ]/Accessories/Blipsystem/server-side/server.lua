-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local userList = {}
local userBlips = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		for k,v in pairs(userList) do
			local ped = GetPlayerPed(k)
			if DoesEntityExist(ped) then
				local coords = GetEntityCoords(ped)
				userBlips[k] = { coords.x,coords.y,coords.z,v[1],v[2] }
			else
				userList[k] = nil
				userBlips[k] = nil
			end
		end
		for k,v in pairs(userList) do
			if v[1] ~= "Corredor" then
				async(function()
					TriggerClientEvent("vrp_blipsystem:updateBlips",k,userBlips)
				end)
			end
		end
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP_BLIPSYSTEM:SERVICEENTER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("vrp_blipsystem:serviceEnter")
AddEventHandler("vrp_blipsystem:serviceEnter",function(source,service,color)
	if userList[source] == nil then
		userList[source] = { tostring(service),parseInt(color) }
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP_BLIPSYSTEM:SERVICEEXIT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("vrp_blipsystem:serviceExit")
AddEventHandler("vrp_blipsystem:serviceExit",function(source)
	ServiceExit(source)
	TriggerClientEvent("vrp_blipsystem:cleanBlips",source)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERDROPPED
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("playerDropped",function()
	ServiceExit(source)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP_BLIPSYSTEM:SERVICEEXIT
-----------------------------------------------------------------------------------------------------------------------------------------
function ServiceExit(source)
	if userList[source] then
		userList[source] = nil
		userBlips[source] = nil

		for k,v in pairs(userList) do
			async(function()
				TriggerClientEvent("vrp_blipsystem:removeBlips",k,source)
			end)
		end
	end
end