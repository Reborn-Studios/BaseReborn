-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vSERVER = Tunnel.getInterface("cashmachine")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local objectBomb = nil
local machineTimer = 0
local machinePosX = 0.0
local machinePosY = 0.0
local machinePosZ = 0.0
local registerCoords = {}
local machineStart = false
local machines = { "prop_atm_02", "prop_atm_03", "prop_fleeca_atm" }

CreateThread(function ()
	Wait(1000)
	exports['ox_target']:addModel(machines,{
		{
			canInteract = function()
				return not LocalPlayer.state.Police
			end,
			event = 'vrp_cashmachine:machineRobbery',
			icon = 'fa-solid fa-cash-register',
			label = "Roubar",
			tunnel = "client"
		}
	})

	exports['ox_target']:addModel({ GetHashKey("prop_till_01") },{
		{
			canInteract = function()
				return not LocalPlayer.state.Police
			end,
			icon = "fa-solid fa-cash-register",
			event = "cashRegister:robberyMachine",
			label = "Roubar",
			tunnel = "client"
		}
	})
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MACHINETIMER
-----------------------------------------------------------------------------------------------------------------------------------------
local function startthreadmachinestart()
	CreateThread(function()
		while machineStart do
			if machineTimer > 0 then
				machineTimer = machineTimer - 1
				if machineTimer <= 0 then
					machineStart = false
					if objectBomb and DoesEntityExist(objectBomb) then
						TriggerServerEvent("tryDeleteEntity",ObjToNet(objectBomb))
					end
					vSERVER.stopMachine(machinePosX,machinePosY,machinePosZ)
					AddExplosion(machinePosX,machinePosY,machinePosZ,2,100.0,true,false,1.0)
				end
			end
			Wait(1000)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADMACHINES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_cashmachine:machineRobbery")
AddEventHandler("vrp_cashmachine:machineRobbery",function()
	local ped = PlayerPedId()
	if not machineStart then
		if not IsPedInAnyVehicle(ped,false) then
			local coords = GetEntityCoords(ped)
			for k,v in pairs(machines) do
				local object = GetClosestObjectOfType(coords.x,coords.y,coords.z,1.5,GetHashKey(v),false,false,false)
				if object and DoesEntityExist(object) then
					if vSERVER.startMachine(coords.x,coords.y,coords.z) then
						local bombCds = GetEntityCoords(object)
						machineStart = true
						machinePosX,machinePosY,machinePosZ = bombCds.x,bombCds.y,bombCds.z

						-- Plant bomb
						SetEntityHeading(ped,GetEntityHeading(object))
						TriggerEvent("cancelando",true)
						SetEntityCoords(ped,machinePosX,machinePosY,machinePosZ,false,false,false,false)
						vRP._playAnim(false,{"anim@amb@clubhouse@tutorial@bkr_tut_ig3@","machinic_loop_mechandplayer"},true)
						Wait(5000)
						startthreadmachinestart()
						vRP.removeObjects()
						TriggerEvent("cancelando",false)

						machineTimer = Config.cashMachine['atm']['timeToExplode']
						vSERVER.callPolice(machinePosX,machinePosY,machinePosZ,"ATM")

						-- Create Bomb
						local mHash = GetHashKey("prop_c4_final_green")
						LoadModel(mHash)
						local bombCoords = GetOffsetFromEntityInWorldCoords(object,0.0,-0.2,0.7)
						objectBomb = CreateObjectNoOffset(mHash,bombCoords.x,bombCoords.y,bombCoords.z,true,false,false)
						SetEntityAsMissionEntity(objectBomb,true,true)
						FreezeEntityPosition(objectBomb,true)
						SetEntityHeading(objectBomb,GetEntityHeading(object))
						SetModelAsNoLongerNeeded(mHash)
					end
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CASHREGISTER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("cashRegister:robberyMachine")
AddEventHandler("cashRegister:robberyMachine",function()
	local ped = PlayerPedId()
	local coordsPed = GetEntityCoords(ped)
	for k,v in pairs(registerCoords) do
		local distance = #(coordsPed - vector3(v[1],v[2],v[3]))
		if distance <= 2.0 then
			return
		end
	end
	if vSERVER.cashRegister(coordsPed.x,coordsPed.y,coordsPed.z) then
		SetPedComponentVariation(ped,5,45,0,2)
	end
end)

RegisterNetEvent("cashRegister:updateRegister")
AddEventHandler("cashRegister:updateRegister",function(status)
	registerCoords = status
end)
