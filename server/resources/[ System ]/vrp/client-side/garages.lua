local vehList = module('vrp',"config/Vehicles") or {}
RegisterNetEvent("Reborn:reloadInfos",function()
	vehList = module('vrp',"config/Vehicles") or {}
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETNEARVEHICLES
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getNearVehicles(radius)
	local r = {}
	local vehs = {}
	local coords = GetEntityCoords(PlayerPedId())

	local it,veh = FindFirstVehicle()
	if veh then
		table.insert(vehs,veh)
	end
	local ok
	repeat
		ok,veh = FindNextVehicle(it)
		if ok and veh then
			table.insert(vehs,veh)
		end
	until not ok
	EndFindVehicle(it)

	for _,nveh in pairs(vehs) do
		local coordsVeh = GetEntityCoords(nveh)
		local distance = #(coords - coordsVeh)
		if distance <= radius then
			r[nveh] = distance
		end
	end
	return r
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETNEARVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getNearVehicle(radius)
	local veh
	local vehs = tvRP.getNearVehicles(radius)
	local min = radius + 0.0001
	for _veh,dist in pairs(vehs) do
		if dist < min then
			min = dist
			veh = _veh
		end
	end
	if DoesEntityExist(veh) then
		return veh, VehToNet(veh)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.inVehicle()
	return IsPedSittingInAnyVehicle(PlayerPedId())
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHLIST
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.vehList(radius)
	if GetResourceState("will_garages_v2") == "started" then
		return exports['will_garages_v2']:vehList(radius)
	end
	local veh = tvRP.getNearVehicle(radius)
	local vehname = tvRP.getModelName(veh)
	if vehname then
		return veh,VehToNet(veh),GetVehicleNumberPlateText(veh),vehname,GetVehicleDoorLockStatus(veh),false,GetVehicleBodyHealth(veh),GetEntityModel(veh),GetVehicleClass(veh)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHPLATE
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.vehiclePlate()
	local ped = PlayerPedId()
	local veh = GetVehiclePedIsUsing(ped)
	if IsEntityAVehicle(veh) then
		return GetVehicleNumberPlateText(veh)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- MODELNAME
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getModelName(veh)
	if IsEntityAVehicle(veh) then
		local modelName = nil
		for k,v in pairs(vehList) do
			if GetHashKey(k) == GetEntityModel(veh) then
				modelName = k
			end
		end
		return modelName
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BANNED
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.isVehicleBanned(veh)
	if IsEntityAVehicle(veh) then
		if vehList[GetEntityModel(veh)] then
			return vehList[GetEntityModel(veh)].banned
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REGISTRATION NUMBER
-----------------------------------------------------------------------------------------------------------------------------------------
local registration_number = "00AAA000"

function tvRP.setRegistrationNumber(registration)
	registration_number = registration
end

function tvRP.getRegistrationNumber()
	return registration_number
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHSITTING
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.vehSitting()
	local ped = PlayerPedId()
	if IsPedInAnyVehicle(ped) then
		local nveh = GetVehiclePedIsUsing(ped)
		local vehModel = GetEntityModel(nveh)
		local vehPlate = GetVehicleNumberPlateText(nveh)
		local vehNet = VehToNet(nveh)
		return nveh,vehNet,vehPlate,tvRP.getModelName(nveh)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLENAME
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.vehicleName()
	local ped = PlayerPedId()
	if IsPedInAnyVehicle(ped) then
		local nveh = GetVehiclePedIsUsing(ped)
		local vehModel = GetEntityModel(nveh)
		return vehList[vehModel] and vehList[vehModel].name
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TYRE STATUS
-----------------------------------------------------------------------------------------------------------------------------------------
local tyreOptions = {}
local tyreList = {
	["wheel_lf"] = 0,
	["wheel_rf"] = 1,
	["wheel_lm"] = 2,
	["wheel_rm"] = 3,
	["wheel_lr"] = 4,
	["wheel_rr"] = 5
}

function tvRP.tyreStatus()
	local Ped = PlayerPedId()
	if not IsPedInAnyVehicle(Ped) then
		local Vehicle = vRP.ClosestVehicle(7)
		if IsEntityAVehicle(Vehicle) then
			local Coords = GetEntityCoords(Ped)

			for Index,Tyre in pairs(tyreList) do
				local Selected = GetEntityBoneIndexByName(Vehicle,Index)
				if Selected ~= -1 then
					local CoordsWheel = GetWorldPositionOfEntityBone(Vehicle,Selected)
					local Distance = #(Coords - CoordsWheel)
					if Distance <= 1.0 then
						return true,Tyre,VehToNet(Vehicle),GetVehicleNumberPlateText(Vehicle),GetTyreHealth(Vehicle,Tyre)
					end
				end
			end
		end
	end
	return false
end

RegisterNetEvent("inventory:repairTyre")
AddEventHandler("inventory:repairTyre",function(Network,Tyres,Plate)
	if NetworkDoesNetworkIdExist(Network) then
		local Vehicle = NetToEnt(Network)
		if DoesEntityExist(Vehicle) then
			if GetVehicleNumberPlateText(Vehicle) == Plate then
				for i = 0,7 do
					if GetTyreHealth(Vehicle,i) ~= 1000.0 then
						SetVehicleTyreBurst(Vehicle,i,true,1000.0)
					end
				end
				SetVehicleTyreFixed(Vehicle,Tyres)
			end
		end
	end
end)

RegisterNetEvent("inventory:explodeTyres")
AddEventHandler("inventory:explodeTyres",function(Network,Plate,Tyre)
	if NetworkDoesNetworkIdExist(Network) then
		local Vehicle = NetToEnt(Network)
		if DoesEntityExist(Vehicle) then
			if GetVehicleNumberPlateText(Vehicle) == Plate then
				SetVehicleTyreBurst(Vehicle,Tyre,true,1000.0)
			end
		end
	end
end)

CreateThread(function()
	while GetResourceState("ox_target") ~= "started" do
		Wait(100)
	end
	for k,Tyre in pairs(tyreList) do
		table.insert(tyreOptions,
			{
				canInteract = function (entity, distance, coords, name, bone)
					local Coords = GetEntityCoords(PlayerPedId())
					local Wheel = GetEntityBoneIndexByName(entity,k)
					if Wheel ~= -1 then
						local cWheel = GetWorldPositionOfEntityBone(entity,Wheel)
						local Distance = #(Coords - cWheel)
						if Distance <= 1.0 and GetTyreHealth(entity,Tyre) == 1000.0 then
							return true
						end
					end
				end,
				items = "WEAPON_WRENCH",
				icon = "fa-solid fa-circle-xmark",
				onSelect = function (data)
					TriggerServerEvent("inventory:RemoveTyres",VehToNet(data.entity),Tyre,GetVehicleNumberPlateText(data.entity))
				end,
				label = "Retirar Pneu",
			}
		)
	end
	exports.ox_target:addGlobalVehicle(tyreOptions)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHICLEMODEL
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.vehicleModel(vehModel)
	return vehList[vehModel] and vehList[vehModel].name
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LASTVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.lastVehicle(vehName)
	local vehHash = GetHashKey(vehName)
	local nveh = GetLastDrivenVehicle()
	if IsVehicleModel(nveh,vehHash) then
		return true
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ENGINE
-----------------------------------------------------------------------------------------------------------------------------------------
local Engine = {
	["Delta"] = 0.0,
	["Scale"] = 0.0,
	["New"] = 1000.0,
	["Last"] = 1000.0,
	["Current"] = 1000.0
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- BODY
-----------------------------------------------------------------------------------------------------------------------------------------
local Body = {
	["Delta"] = 0.0,
	["Scale"] = 0.0,
	["New"] = 1000.0,
	["Last"] = 1000.0,
	["Current"] = 1000.0
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- HEALTH
-----------------------------------------------------------------------------------------------------------------------------------------
local Health = {
	["Delta"] = 0,
	["Scale"] = 0,
	["New"] = 1000,
	["Last"] = 1000,
	["Current"] = 1000
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Last = nil
local Same = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLASS
-----------------------------------------------------------------------------------------------------------------------------------------
local Class = {
	[0] = 1.5,
	[1] = 1.5,
	[2] = 1.5,
	[3] = 1.5,
	[4] = 1.5,
	[5] = 1.5,
	[6] = 1.5,
	[7] = 1.5,
	[8] = 1.5,
	[9] = 1.5,
	[10] = 1.5,
	[11] = 1.5,
	[12] = 1.5,
	[13] = 1.5,
	[14] = 0.0,
	[15] = 0.5,
	[16] = 0.5,
	[17] = 1.5,
	[18] = 1.5,
	[19] = 1.5,
	[20] = 1.5,
	[21] = 1.5,
	[22] = 1.5
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADHEALTHVEH
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local TimeDistance = 999
		local Ped = PlayerPedId()
		if IsPedInAnyVehicle(Ped) then
			local Vehicle = GetVehiclePedIsUsing(Ped)
			local Classes = GetVehicleClass(Vehicle)
			if Classes ~= 13 and Classes ~= 14 then
				TimeDistance = 1

				if Same then
					local Torque = 1.0
					if Engine["New"] < 900 then
						Torque = (Engine["New"] + 200.0) / 1100
					end
					SetVehicleEngineTorqueMultiplier(Vehicle,Torque)
				end

				if GetPedInVehicleSeat(Vehicle,-1) == Ped then
					local Roll = GetEntityRoll(Vehicle)
					if Roll > 75.0 or Roll < -75.0 then
						DisableControlAction(1,59,true)
						DisableControlAction(1,60,true)
					end
				end

				Engine["Current"] = GetVehicleEngineHealth(Vehicle)
				if Engine["Current"] >= 1000 then
					Engine["Last"] = 1000.0
				end

				Engine["New"] = Engine["Current"]
				Engine["Delta"] = Engine["Last"] - Engine["Current"]
				Engine["Scale"] = Engine["Delta"] * 0.6 * Class[Classes + 1]

				Body["Current"] = GetVehicleBodyHealth(Vehicle)
				if Body["Current"] >= 1000 then
					Body["Last"] = 1000.0
				end

				Body["New"] = Body["Current"]
				Body["Delta"] = Body["Last"] - Body["Current"]
				Body["Scale"] = Body["Delta"] * 0.6 * Class[Classes + 1]

				Health["Current"] = GetEntityHealth(Vehicle)
				if Health["Current"] >= 1000 then
					Health["Last"] = 1000
				end

				Health["New"] = Health["Current"]
				Health["Delta"] = Health["Last"] - Health["Current"]
				Health["Scale"] = Health["Delta"] * 0.6 * Class[Classes + 1]

				if Vehicle ~= Last then
					Same = false
				end

				if Same then
					if Engine["Current"] ~= 1000.0 or Body["Current"] ~= 1000.0 then
						local Combine = math.max(Engine["Scale"],Body["Scale"])
						if Combine > (Engine["Current"] - 100.0) then
							Combine = Combine * 0.7
						end

						if Combine > Engine["Current"] then
							Combine = Engine["Current"] - (210.0 / 5)
						end

						Engine["New"] = Engine["Last"] - Combine

						if Engine["New"] > 210.0 and Engine["New"] < 350.0 then
							Engine["New"] = Engine["New"] - (0.038 * 7.4)
						end

						if Engine["New"] < 210.0 then
							Engine["New"] = Engine["New"] - (0.1 * 1.5)
						end

						if Body["New"] < 0 then
							Body["New"] = 0.0
						end

						if Engine["New"] < 0 then
							Engine["New"] = 0.0
						end
					end
				else
					Same = true
				end

				if Health["Current"] < 100 then
					Health["New"] = 100
				end

				if Body["Current"] < 100.0 then
					Body["New"] = 100.0
				end

				if Engine["Current"] < 100.0 then
					Engine["New"] = 100.0
				end

				if Engine["New"] ~= Engine["Current"] then
					SetVehicleEngineHealth(Vehicle,Engine["New"])
				end

				if Body["New"] ~= Body["Current"] then
					SetVehicleBodyHealth(Vehicle,Body["New"])
				end

				if Health["New"] ~= Health["Current"] then
					SetEntityHealth(Vehicle,Health["New"])
					SetVehiclePetrolTankHealth(Vehicle,Health["New"] + 0.0)
				end

				Last = Vehicle
				Body["Last"] = Body["New"]
				Health["Last"] = Health["New"]
				Engine["Last"] = Engine["New"]
			end
		else
			if Same then
				Same = false
			end
		end

		Wait(TimeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TYREEXPLOSION
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local Ped = PlayerPedId()
		if IsPedInAnyVehicle(Ped) then
			local Vehicle = GetVehiclePedIsUsing(Ped)
			if GetPedInVehicleSeat(Vehicle,-1) == Ped then
				local Roll = GetEntityRoll(Vehicle)
				if Roll > 75.0 or Roll < -75.0 then
					if math.random(100) <= 50 and GetVehicleClass(Vehicle) ~= 8 and GetVehicleClass(Vehicle) ~= 13 and GetVehicleClass(Vehicle) ~= 14 and GetVehicleClass(Vehicle) ~= 15 and GetVehicleClass(Vehicle) ~= 16 then
						local Tyre = math.random(4)

						if Tyre == 1 then
							if GetTyreHealth(Vehicle,0) == 1000.0 then
								SetVehicleTyreBurst(Vehicle,0,true,1000.0)
							end
						elseif Tyre == 2 then
							if GetTyreHealth(Vehicle,1) == 1000.0 then
								SetVehicleTyreBurst(Vehicle,1,true,1000.0)
							end
						elseif Tyre == 3 then
							if GetTyreHealth(Vehicle,4) == 1000.0 then
								SetVehicleTyreBurst(Vehicle,4,true,1000.0)
							end
						elseif Tyre == 4 then
							if GetTyreHealth(Vehicle,5) == 1000.0 then
								SetVehicleTyreBurst(Vehicle,5,true,1000.0)
							end
						end
					end
				end
			end
		end
		Wait(1000)
	end
end)
