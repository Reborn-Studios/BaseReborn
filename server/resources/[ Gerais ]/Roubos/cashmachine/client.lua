-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
cmVRP = {}
Tunnel.bindInterface("cashmachine",cmVRP)
vSERVER = Tunnel.getInterface("cashmachine")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local machineStart = false
local machineTimer = 0
local machinePosX = 0.0
local machinePosY = 0.0
local machinePosZ = 0.0
local objectBomb = nil
local machines = Config.cashMachine['locs']

-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADMACHINES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_cashmachine:machineRobbery")
AddEventHandler("vrp_cashmachine:machineRobbery",function()
	local ped = PlayerPedId()
	if not machineStart then
		if not IsPedInAnyVehicle(ped) then
			local coords = GetEntityCoords(ped)
			for k,v in pairs(machines) do
				local distance = #(coords - vector3(v[1],v[2],v[3]))
				if distance <= 0.6 then
					if vSERVER.startMachine() then
						machinePosX = v[1]
						machinePosY = v[2]
						machinePosZ = v[3]
						SetEntityHeading(ped,v[4])
						TriggerEvent("cancelando",true)
						SetEntityCoords(ped,v[1],v[2],v[3]-1)
						vRP._playAnim(false,{"anim@amb@clubhouse@tutorial@bkr_tut_ig3@","machinic_loop_mechandplayer"},true)

						Citizen.Wait(10000)
						startthreadmachinestart()
						machineStart = true
						vRP.removeObjects()
						TriggerEvent("cancelando",false)
						machineTimer = math.random(30,40)
						vSERVER.callPolice(machinePosX,machinePosY,machinePosZ)

						local mHash = GetHashKey("prop_c4_final_green")

						RequestModel(mHash)
						while not HasModelLoaded(mHash) do
							RequestModel(mHash)
							Citizen.Wait(10)
						end

						local coords = GetOffsetFromEntityInWorldCoords(ped,0.0,0.23,0.0)
						objectBomb = CreateObjectNoOffset(mHash,coords.x,coords.y,coords.z-0.23,true,false,false)
						SetEntityAsMissionEntity(objectBomb,true,true)
						FreezeEntityPosition(objectBomb,true)
						SetEntityHeading(objectBomb,v[4])
						SetModelAsNoLongerNeeded(mHash)
						break
					end
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MACHINETIMER
-----------------------------------------------------------------------------------------------------------------------------------------
function startthreadmachinestart()
	Citizen.CreateThread(function()
		while true do
			if machineStart and machineTimer > 0 then
				machineTimer = machineTimer - 1
				if machineTimer <= 0 then
					machineStart = false
					TriggerServerEvent("tryDeleteEntity",ObjToNet(objectBomb))
					vSERVER.stopMachine(machinePosX,machinePosY,machinePosZ)
					AddExplosion(machinePosX,machinePosY,machinePosZ,2,100.0,true,false,true)
				end
			end
			Citizen.Wait(1000)
		end
	end)
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CASHREGISTER
-----------------------------------------------------------------------------------------------------------------------------------------
local registerCoords = {}
local robberyStatus = false

RegisterNetEvent("cashRegister:robberyMachine")
AddEventHandler("cashRegister:robberyMachine",function(status)
	if robberyStatus then return end
	local ped = PlayerPedId()
	local coordsPed = GetEntityCoords(ped)
	for k,v in pairs(registerCoords) do
		local distance = #(coordsPed - vector3(v[1],v[2],v[3]))
		if distance <= 2.0 then
			TriggerEvent("Notify","negado","Caixinha vazio",5000)
			return
		end
	end
	local object = GetClosestObjectOfType(coordsPed,0.4,GetHashKey("prop_till_01"),0,0,0)
	local coords = GetEntityCoords(object)
	if vSERVER.cashRegister(coords.x,coords.y,coords.z) then
		robberyStatus = true
		SetPedComponentVariation(ped,5,45,0,2)
		vSERVER.startRegister(coordsPed.x,coordsPed.y,coordsPed.z)
		robberyStatus = false
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEREGISTER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("cashRegister:updateRegister")
AddEventHandler("cashRegister:updateRegister",function(status)
	registerCoords = status
end)
