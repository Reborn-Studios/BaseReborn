-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
local CodeServer = Tunnel.getInterface("tencode")
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADBUTTON
-----------------------------------------------------------------------------------------------------------------------------------------
local policeRadar = false
local policeFreeze = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLOSESYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("closeSystem",function()
	SetNuiFocus(false,false)
	SetCursorLocation(0.5,0.5)
	SendNUIMessage({ tencode = false })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SENDCODE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("sendCode",function(data)
	SetNuiFocus(false,false)
	SetCursorLocation(0.5,0.5)
	CodeServer.sendCode(data["code"])
	SendNUIMessage({ tencode = false })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADRADAR
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	SetNuiFocus(false,false)
	while true do
		local timeDistance = 999
		local ped = PlayerPedId()
		if IsPedInAnyPoliceVehicle(ped) then
			if policeRadar then
				if not policeFreeze then
					timeDistance = 100
					local vehicle = GetVehiclePedIsUsing(ped)
					local vehicleDimension = GetOffsetFromEntityInWorldCoords(vehicle,0.0,1.0,1.0)
					local vehicleFront = GetOffsetFromEntityInWorldCoords(vehicle,0.0,105.0,0.0)
					local vehicleFrontShape = StartShapeTestCapsule(vehicleDimension.x,vehicleDimension.y,vehicleDimension.z,vehicleFront.x,vehicleFront.y,vehicleFront.z,3.0,10,vehicle,7)
					local _,_,_,_,vehFront = GetShapeTestResult(vehicleFrontShape)

					if IsEntityAVehicle(vehFront) then
						local vehModel = GetEntityModel(vehFront)
						local vehName = vRP.vehicleModel(vehModel)
						local vehPlate = GetVehicleNumberPlateText(vehFront)
						local vehSpeed = GetEntitySpeed(vehFront) * 2.236936
						SendNUIMessage({ radar = "top", plate = vehPlate, model = vehName, speed = vehSpeed })
					end

					local vehicleBack = GetOffsetFromEntityInWorldCoords(vehicle,0.0,-105.0,0.0)
					local vehicleBackShape = StartShapeTestCapsule(vehicleDimension.x,vehicleDimension.y,vehicleDimension.z,vehicleBack.x,vehicleBack.y,vehicleBack.z,3.0,10,vehicle,7)
					local _,_,_,_,vehBack = GetShapeTestResult(vehicleBackShape)

					if IsEntityAVehicle(vehBack) then
						local vehModel = GetEntityModel(vehBack)
						local vehName = vRP.vehicleModel(vehModel)
						local vehPlate = GetVehicleNumberPlateText(vehBack)
						local vehSpeed = GetEntitySpeed(vehBack) * 2.236936
						SendNUIMessage({ radar = "bot", plate = vehPlate, model = vehName, speed = vehSpeed })
					end
				end
			end
		end
		if not IsPedInAnyVehicle(ped,false) and policeRadar then
			policeRadar = false
			SendNUIMessage({ radar = false })
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOGGLERADAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("toggleRadar",function(source,args,rawCommand)
	local ped = PlayerPedId()
	if IsPedInAnyPoliceVehicle(ped) then
		if policeRadar then
			policeRadar = false
			SendNUIMessage({ radar = false })
		else
			policeRadar = true
			SendNUIMessage({ radar = true })
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOGGLEFREEZE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("toggleFreeze",function(source,args,rawCommand)
	local ped = PlayerPedId()
	if IsPedInAnyPoliceVehicle(ped) then
		policeFreeze = not policeFreeze
		SendNUIMessage({ freeze = policeFreeze })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TENCODE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("enterTencodes",function(source,args,rawCommand)
	if LocalPlayer["state"]["Police"] then
		SetNuiFocus(true,true)
		SetCursorLocation(0.5,0.9)
		SendNUIMessage({ tencode = true })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- KEYMAPPING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterKeyMapping("enterTencodes","Manusear o código policial.","keyboard","F5")
RegisterKeyMapping("toggleRadar","Ativar/Desativar radar das viaturas.","keyboard","N")
RegisterKeyMapping("toggleFreeze","Travar/Destravar radar das viaturas.","keyboard","M")