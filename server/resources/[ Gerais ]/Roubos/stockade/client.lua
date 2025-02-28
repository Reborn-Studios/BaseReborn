Stockade = Tunnel.getInterface("Rstockade")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIÁVEIS
-----------------------------------------------------------------------------------------------------------------------------------------
local blockStockades = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSTOCKADE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	Wait(1000)
	exports['ox_target']:addModel({ GetHashKey("stockade") },{
		{
			canInteract = function(entity)
				local plate = GetVehicleNumberPlateText(entity)
				return blockStockades[plate] == nil and not LocalPlayer.state.Police
			end,
			distance = 1.5,
			bones = {"door_pside_r","door_dside_r"},
			name = "stockade",
			icon = "fa-solid fa-sack-dollar",
			event = "robbery:startStockade",
			label = "Roubar Carro Forte",
			tunnel = "client"
		}
	})
end)

RegisterNetEvent("robbery:startStockade")
AddEventHandler("robbery:startStockade",function()
	local vehicle = vRP.getNearVehicle(11)
	if DoesEntityExist(vehicle) and GetEntityModel(vehicle) == GetHashKey("stockade") then
		local plate = GetVehicleNumberPlateText(vehicle)
		if Stockade.checkPolice(plate) then
			SetEntityHeading(ped,GetEntityHeading(vehicle))
			Stockade.withdrawMoney(plate,VehToNet(vehicle))
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP_STOCKADE:DESTROY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_stockade:Destroy")
AddEventHandler("vrp_stockade:Destroy",function(vehNet)
	if NetworkDoesNetworkIdExist(vehNet) then
		local v = NetToEnt(vehNet)
		if DoesEntityExist(v) then
			SetVehicleEngineHealth(v,100.0)
			SetVehicleBodyHealth(v,100.0)
			SetVehicleDoorOpen(v,2,true,true)
			SetVehicleDoorOpen(v,3,true,true)
			SetVehicleDoorOpen(v,5,true,true)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP_STOCKADE:CLIENT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_stockade:Client")
AddEventHandler("vrp_stockade:Client",function(status)
	blockStockades = status
end)
