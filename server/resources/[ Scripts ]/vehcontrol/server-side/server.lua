-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
---------------------------------------------------------------------
RegisterNetEvent("vehcontrol:Doors")
AddEventHandler("vehcontrol:Doors", function(door)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRPclient.getHealth(source) > 101 then
			local vehicle,vehNet = vRPclient.getNearVehicle(source,7)
			if vehicle then
				if door == "6" then
					TriggerClientEvent("vrp_player:syncHood",-1,vehNet)
				else
					TriggerClientEvent("vrp_player:syncDoors",-1,vehicle,door)
				end
			end
		end
	end
end)
