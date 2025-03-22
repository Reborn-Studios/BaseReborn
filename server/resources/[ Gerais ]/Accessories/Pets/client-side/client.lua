local Tunnel = module("vrp","lib/Tunnel") or {}
vRPS = Tunnel.getInterface("vRP")
PetServer = Tunnel.getInterface("pets")

local animalHash = nil
local spawnAnimal = false
local animalFollow = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:ANIMALSPAWN
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dynamic:animalSpawn")
AddEventHandler("dynamic:animalSpawn",function(model)
	if animalHash == nil then
		if not spawnAnimal then
			spawnAnimal = true
			local ped = PlayerPedId()
			local heading = GetEntityHeading(ped)
			local coords = GetOffsetFromEntityInWorldCoords(ped,0.0,1.0,0.0)
			local myObject,objNet = vRPS.CreatePed(model,coords["x"],coords["y"],coords["z"],heading,28)
			if myObject and objNet then
				local spawnAnimal = 0
				animalHash = NetworkGetEntityFromNetworkId(objNet)

				while not DoesEntityExist(animalHash) and spawnAnimal <= 1000 do
					animalHash = NetworkGetEntityFromNetworkId(objNet)
					spawnAnimal = spawnAnimal + 1
					Wait(1)
				end

				spawnAnimal = 0
				local pedControl = NetworkRequestControlOfEntity(animalHash)
				while not pedControl and spawnAnimal <= 1000 do
					pedControl = NetworkRequestControlOfEntity(animalHash)
					spawnAnimal = spawnAnimal + 1
					Wait(1)
				end

				SetPedCanRagdoll(animalHash,false)
				SetEntityInvincible(animalHash,true)
				SetPedFleeAttributes(animalHash,0,false)
				SetEntityAsMissionEntity(animalHash,true,false)
				SetBlockingOfNonTemporaryEvents(animalHash,true)
				SetPedRelationshipGroupHash(animalHash,GetHashKey("k9"))
				GiveWeaponToPed(animalHash,GetHashKey("WEAPON_ANIMAL"),200,true,true)
				SetEntityAsNoLongerNeeded(animalHash)
				TriggerEvent("dynamic:animalFunctions","seguir")
				PetServer.animalRegister(objNet)
			end
			spawnAnimal = false
		end
	else
		PetServer.animalCleaner()
		animalFollow = false
		animalHash = nil
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:ANIMALFUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dynamic:animalFunctions")
AddEventHandler("dynamic:animalFunctions",function(functions)
	if animalHash ~= nil then
		local ped = PlayerPedId()
		if functions == "seguir" then
			if not animalFollow then
				TaskFollowToOffsetOfEntity(animalHash,ped,1.0,1.0,0.0,5.0,-1,2.5,true)
				SetPedKeepTask(animalHash,true)
				animalFollow = true
			else
				SetPedKeepTask(animalHash,false)
				ClearPedTasks(animalHash)
				animalFollow = false
			end
		elseif functions == "colocar" then
			if IsPedInAnyVehicle(ped,false) and not IsPedOnAnyBike(ped) then
				local vehicle = GetVehiclePedIsUsing(ped)
				if IsVehicleSeatFree(vehicle,0) then
					TaskEnterVehicle(animalHash,vehicle,-1,0,2.0,16,0)
				end
			end
		elseif functions == "remover" then
			if IsPedInAnyVehicle(ped,false) and not IsPedOnAnyBike(ped) then
				TaskLeaveVehicle(animalHash,GetVehiclePedIsUsing(ped),256)
				TriggerEvent("dynamic:animalFunctions","seguir")
			end
		elseif functions == "deletar" then
			PetServer.animalCleaner()
			animalFollow = false
			animalHash = nil
		end
	end
end)

exports("MyPet",function()
    return animalHash
end)
