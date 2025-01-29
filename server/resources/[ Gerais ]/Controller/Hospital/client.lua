-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
HPClient = {}
Tunnel.bindInterface("Hospital",HPClient)
HPServer = Tunnel.getInterface("Hospital")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local damaged = {}
local bleeding = 0
local maxHealth = GlobalState['Basics']['MaxHealth'] or 400
-----------------------------------------------------------------------------------------------------------------------------------------
-- PRESSEDDIAGNOSTIC
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("gameEventTriggered",function(event,args)
	if event == "CEventNetworkEntityDamage" then
		local data = { victim = args[1], attacker = args[2], weapon = args[7] }
		if IsEntityAPed(data.victim) then
			local ped = PlayerPedId()
			if data.victim == ped then
				if GetEntityHealth(ped) > 110 and not IsPedInAnyVehicle(ped,false) then
					if not damaged.vehicle and HasEntityBeenDamagedByAnyVehicle(ped) then
						ClearEntityLastDamageEntity(ped)
						damaged.vehicle = true
						bleeding = bleeding + 2
					end

					if HasEntityBeenDamagedByWeapon(ped,0,2) then
						ClearEntityLastDamageEntity(ped)
						damaged.bullet = true
						bleeding = bleeding + 1
					end

					if not damaged.taser and IsPedBeingStunned(ped,0) then
						ClearEntityLastDamageEntity(ped)
						damaged.taser = true
					end
				end

				local hit,bone = GetPedLastDamageBone(ped)
				if hit and not damaged[bone] and bone ~= 0 then
					damaged[bone] = true
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PRESSEDBLEEDING
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while Config.Hospital['bleeding'] do
		local ped = PlayerPedId()
		if GetEntityHealth(ped) > 101 then
			if bleeding == 4 then
				SetEntityHealth(ped,GetEntityHealth(ped)-2)
			elseif bleeding == 5 then
				SetEntityHealth(ped,GetEntityHealth(ped)-3)
			elseif bleeding == 6 then
				SetEntityHealth(ped,GetEntityHealth(ped)-4)
			elseif bleeding >= 7 then
				SetEntityHealth(ped,GetEntityHealth(ped)-5)
			end
			if bleeding >= 4 then
				TriggerEvent("Notify","negado","Você está sangrando.",3000)
			end
		end
		Wait(10000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- RESETDIAGNOSTIC
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("resetDiagnostic")
AddEventHandler("resetDiagnostic",function()
	local ped = PlayerPedId()
	ClearPedBloodDamage(ped)
	damaged = {}
	bleeding = 0
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- RESETDIAGNOSTIC
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("resetBleeding")
AddEventHandler("resetBleeding",function()
	bleeding = 0
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DRAWINJURIES
-----------------------------------------------------------------------------------------------------------------------------------------
local exit = true
RegisterNetEvent("drawInjuries")
AddEventHandler("drawInjuries",function(ped,injuries)
	CreateThread(function()
		local counter = 0
		exit = not exit
		while true do
			if counter > 4000 or exit then
				exit = true
				break
			end
			for k,v in pairs(injuries) do
				local x,y,z = table.unpack(GetPedBoneCoords(GetPlayerPed(GetPlayerFromServerId(ped)),k,0.0,0.0,0.0))
				DrawBase3D(x,y,z,"~w~"..string.upper(v))
			end
			counter = counter + 1
			Wait(0)
		end
	end)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETDIAGNOSTIC
-----------------------------------------------------------------------------------------------------------------------------------------
function HPClient.getDiagnostic()
	return damaged,bleeding
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETBLEEDING
-----------------------------------------------------------------------------------------------------------------------------------------
function HPClient.getBleeding()
	return bleeding
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADCHECKIN
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 1000
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped,false) then
			local coords = GetEntityCoords(ped)
			for k,v in pairs(Config.Hospital['services']) do
				local distance = #(coords - vector3(v.init[1],v.init[2],v.init[3]))
				if distance <= 3 then
					timeDistance = 4
					DrawBase3D(v.init[1],v.init[2],v.init[3], "treatment")
					if distance <= 1.5 and IsControlJustPressed(1,38) and HPServer.checkServices() then
						if GetEntityHealth(ped) < maxHealth then
							local checkBusy = 0
							for _,bed in pairs(v.beds) do
								checkBusy = checkBusy + 1
								local checkPos = NearestPlayer(bed[1],bed[2],bed[3])
								if checkPos == nil then
									if HPServer.paymentCheckin() then
										SetCurrentPedWeapon(ped,GetHashKey("WEAPON_UNARMED"),true)
										if GetEntityHealth(ped) <= 101 then
											TriggerEvent("vrp_survival:CheckIn")
										end
										DoScreenFadeOut(1000)
										Wait(1000)
										SetEntityCoords(ped,bed[1],bed[2],bed[3],false,false,false,false)
										Wait(500)
										SvClient.SetPedInBed()
										async(function()
											SvClient.startCure()
										end)
										Wait(2000)
										DoScreenFadeIn(1000)
									end
									break
								end
							end
							if checkBusy >= #v.beds then
								TriggerEvent("Notify","importante","Todas as macas estão ocupadas, aguarde.",5000)
							end
						else
							TriggerEvent("Notify","negado","Você está bem de saude.",5000)
						end
					end
				end
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MACAS DO HOSPITAL
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	local macas = Config.Hospital['beds']
	for k,v in pairs(macas) do
		local cod = macas[k]
		exports["target"]:AddCircleZone("treatment:"..k,vector3(cod.x,cod.y,cod.z),1.0,{
			name = "treatment:"..k,
			heading = 3374176
		},{
			distance = 1.5,
			options = {
				{
					event = "tratamento",
					label = "Tratamento",
					tunnel = "shop"
				}
			}
		})
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TRATAMENTO 
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent('tratamento-macas')
AddEventHandler('tratamento-macas',function()
	TriggerEvent("cancelando",true)
	repeat
		SetEntityHealth(PlayerPedId(),GetEntityHealth(PlayerPedId())+3)
		Wait(1500)
	until GetEntityHealth(PlayerPedId()) >= maxHealth or GetEntityHealth(PlayerPedId()) <= 101
	TriggerEvent("Notify","importante","Tratamento concluido.")
	TriggerEvent("cancelando",false)
	TriggerEvent("vrp_survival:desbugar")
end)

local tratamento = false
RegisterNetEvent("tratamento")
AddEventHandler("tratamento",function()
    local ped = PlayerPedId()
    local health = GetEntityHealth(ped)
	TriggerEvent("emotes","checkin")
    SetEntityHealth(ped,health)
	if tratamento then
		return
	end

	tratamento = true
	TriggerEvent("Notify","sucesso","Tratamento iniciado, aguarde a liberação do <b>profissional médico.</b>.",8000)

	if tratamento then
		repeat
			Wait(600)
			if GetEntityHealth(ped) > 101 then
				SetEntityHealth(ped,GetEntityHealth(ped)+3)
			end
		until GetEntityHealth(ped) >= maxHealth or GetEntityHealth(ped) <= 101
			TriggerEvent("Notify","sucesso","Tratamento concluido.",8000)
			tratamento = false
			TriggerEvent("vrp_survival:desbugar")
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- NEARESTPLAYERS
-----------------------------------------------------------------------------------------------------------------------------------------
local function nearestPlayers(x2,y2,z2)
	local r = {}
	local players = vRP.activePlayers()
	for k,v in pairs(players) do
		local player = GetPlayerFromServerId(v)
		if player ~= PlayerId() and NetworkIsPlayerConnected(player) then
			local oped = GetPlayerPed(player)
			local coords = GetEntityCoords(oped)
			local distance = #(coords - vector3(x2,y2,z2))
			if distance <= 2 then
				r[GetPlayerServerId(player)] = distance
			end
		end
	end
	return r
end

function NearestPlayer(x,y,z)
	local p = nil
	local players = nearestPlayers(x,y,z)
	local min = 2.0001
	for k,v in pairs(players) do
		if v < min then
			min = v
			p = k
		end
	end
	return p
end
