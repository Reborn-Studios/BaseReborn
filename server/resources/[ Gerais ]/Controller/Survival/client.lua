-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
SvClient = {}
Tunnel.bindInterface("Survival",SvClient)
SvServer = Tunnel.getInterface("Survival")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local deathtimer = 0
local Death = false
local finalizado = false
local blockControls = false
local Cooldown = GetGameTimer()
local CallCooldown = 0
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADHEALTH
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	Wait(500)
	SetPedMaxHealth(PlayerPedId(),GlobalState['Basics']['MaxHealth'] or 400)
	while true do
		local timeDistance = 999
		local ped = PlayerPedId()
		SetPlayerHealthRechargeMultiplier(PlayerId(),0)
		if GetEntityHealth(ped) <= 101 and not LocalPlayer.state.inPvp then
			if not Death then
				Death = true
				local coords = GetEntityCoords(ped)
				NetworkResurrectLocalPlayer(coords.x,coords.y,coords.z,0.0,0,false)

				SetFacialIdleAnimOverride(ped,"mood_sleeping_1","")
				LocalPlayer["state"]:set("Invincible",true,false)
				deathtimer = Config.Survival['deathTimer']

				SetEntityInvincible(ped,true)
				SetEntityHealth(ped,101)

				SendNUIMessage({ name = "DeathScreen", payload = true })
				vRP.playAnim(false,{"dead","dead_a"},true)
				TriggerEvent("radio:outServers")
				TriggerServerEvent("pma-voice:toggleMute",true)
			elseif deathtimer > 0 then
				timeDistance = 1
				SetEntityHealth(ped,101)

				if GetGameTimer() >= Cooldown then
					Cooldown = GetGameTimer() + 1000
					if deathtimer > 0 then
						deathtimer = deathtimer - 1
						SendNUIMessage({ name = "UpdateDeathScreen", payload = deathtimer })
					end
				end

				if not IsEntityPlayingAnim(ped,"dead","dead_a",3) and not IsPedInAnyVehicle(ped,false) then
					TaskPlayAnim(ped,"dead","dead_a",8.0,8.0,-1,1,1,false,false,false)
				end

				if IsPedInAnyVehicle(ped,false) then
					local Vehicle = GetVehiclePedIsUsing(ped)
					if GetPedInVehicleSeat(Vehicle,-1) == ped then
						SetVehicleEngineOn(Vehicle,false,true,true)
					end
				end
			else
				SetEntityHealth(ped,101)
				if not IsEntityPlayingAnim(ped,"dead","dead_a",3) and not IsPedInAnyVehicle(ped,false) then
					TaskPlayAnim(ped,"dead","dead_a",8.0,8.0,-1,1,1,false,false,false)
				end
			end
			if IsControlJustPressed(0,38) then
				if CallCooldown <= 0 then
					CallCooldown = 30
					SvServer.callMedics()
					CreateThread(function ()
						while CallCooldown > 0 do
							CallCooldown = CallCooldown - 1
							Wait(1000)
						end
					end)
				else
					TriggerEvent("Notify","negado","Aguarde "..CallCooldown.." segundos para fazer o chamado novamente",5000)
				end
			end
		elseif GetEntityHealth(ped) > 101 and Death then
			exports["Controller"]:Revive(GetEntityHealth(ped))
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REVIVE
-----------------------------------------------------------------------------------------------------------------------------------------
exports("Revive",function(Health)
	local Ped = PlayerPedId()
	SetEntityHealth(Ped,Health)
	SetEntityInvincible(Ped,false)
	LocalPlayer["state"]:set("Invincible",false,false)
	if Death then
		Death = false
		deathtimer = 0
		ClearPedTasks(Ped)
		ClearFacialIdleAnimOverride(Ped)
		NetworkSetFriendlyFireOption(true)
		SendNUIMessage({ name = "DeathScreen", payload = false })
		TriggerServerEvent("pma-voice:toggleMute",false)
		ClearPedBloodDamage(ped)
		SetEntityHealth(ped,Health)
		SetEntityInvincible(ped,false)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GG
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("gg",function(source,args,rawCommand)
	if deathtimer <= 0 then
		SvServer.ResetPedToHospital()
	else
		TriggerEvent("Notify","aviso","AGUARDE: <b>"..deathtimer.." segundos</b> OU CHAME OS <b>PARAMÉDICOS</b>.",5000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FINISHDEATH
-----------------------------------------------------------------------------------------------------------------------------------------
function SvClient.finishDeath()
	local maxHealth = GlobalState['Basics']['MaxHealth'] or 400
	exports["Controller"]:Revive(maxHealth)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- Death
-----------------------------------------------------------------------------------------------------------------------------------------
function SvClient.Death()
	return Death
end

function SvClient.deadPlayer()
	return Death
end

function SvClient.finalizado()
	return finalizado
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REVIVEPLAYER
-----------------------------------------------------------------------------------------------------------------------------------------
function SvClient.revivePlayer(health)
	exports["Controller"]:Revive(health)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKIN
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_survival:CheckIn")
AddEventHandler("vrp_survival:CheckIn",function()
	SetEntityHealth(PlayerPedId(),102)
	SetEntityInvincible(PlayerPedId(),false)

	Wait(500)
	TriggerServerEvent("pma-voice:toggleMute",false)
	Death = false
	blockControls = true
end)

RegisterNetEvent("vrp_survival:finalizado")
AddEventHandler("vrp_survival:finalizado",function()
	Death = true
	deathtimer = Config.Survival['deathTimer'] / 2
	finalizado = true
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- STARTCURE
-----------------------------------------------------------------------------------------------------------------------------------------
local cure = false
function SvClient.startCure()
	local ped = PlayerPedId()
	if cure then
		return
	end
	cure = true
	TriggerEvent("Notify","sucesso","O tratamento começou, espere o paramédico libera-lo.",3000)
	if cure then
		local maxHealth = GlobalState['Basics']['MaxHealth'] or 400
		repeat
			Wait(1000)
			if GetEntityHealth(ped) > 101 then
				SetEntityHealth(ped,GetEntityHealth(ped) + 1)
			end
		until GetEntityHealth(ped) >= maxHealth or GetEntityHealth(ped) <= 101
			TriggerEvent("Notify","sucesso","Tratamento concluído.",3000)
			Death = false
			cure = false
			blockControls = false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- BEDS
-----------------------------------------------------------------------------------------------------------------------------------------
local beds = {
	{ GetHashKey("v_med_bed1"),0.0,0.0 },
	{ GetHashKey("v_med_bed2"),0.0,0.0 },
	{ -1498379115,1.0,90.0 },
	{ -1519439119,1.0,0.0 },
	{ -289946279,1.0,0.0 }
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETPEDINBED
-----------------------------------------------------------------------------------------------------------------------------------------
function SvClient.SetPedInBed()
	local ped = PlayerPedId()
	local x,y,z = table.unpack(GetEntityCoords(ped))
	for k,v in pairs(beds) do
		local object = GetClosestObjectOfType(x,y,z,0.9,v[1],false,false,false)
		if DoesEntityExist(object) then
			local x2,y2,z2 = table.unpack(GetEntityCoords(object))
			SetEntityCoords(ped,x2,y2,z2+v[2],false,false,false,false)
			SetEntityHeading(ped,GetEntityHeading(object)+v[3]-180.0)
			vRP.playAnim(false,{"dead","dead_a"},true)
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SCREENFADEINOUT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_survival:FadeOutIn")
AddEventHandler("vrp_survival:FadeOutIn",function()
	DoScreenFadeOut(1000)
	Wait(5000)
	DoScreenFadeIn(1000)
end)

RegisterNetEvent("vrp_survival:desbugar")
AddEventHandler("vrp_survival:desbugar",function()
	blockControls = false
	Death = false
	if GetScreenEffectIsActive("DeathFailOut") then
		StopScreenEffect("DeathFailOut")
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLOCKCONTROLS
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 999
		local ped = PlayerPedId()
		if (blockControls or Death) and not LocalPlayer.state.inPvp then
			timeDistance = 1
			DisablePlayerFiring(ped,true)
			DisableControlAction(1,22,true) -- SPACEBAR
			DisableControlAction(1,29,true) -- B
			DisableControlAction(1,47,true) -- G
			DisableControlAction(1,73,true) -- X
			DisableControlAction(1,75,true) -- F
			DisableControlAction(1,105,true) -- X
			DisableControlAction(1,167,true) -- F6
			DisableControlAction(1,182,true) -- L
			DisableControlAction(1,187,true) -- ARROW DOWN
			DisableControlAction(1,188,true) -- ARROW UP
			DisableControlAction(1,189,true) -- ARROW LEFT
			DisableControlAction(1,190,true) -- ARROW RIGHT
			DisableControlAction(1,257,true) -- LEFT MOUSE
			DisableControlAction(1,288,true) -- F1
			DisableControlAction(1,311,true) -- K
		end
		Wait(timeDistance)
	end
end)
