-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local point = false
local celular = false
local cancelando = false

LocalPlayer["state"]:set("Handcuff",false,true)
LocalPlayer["state"]:set("Commands",false,true)
LocalPlayer["state"]:set("Premium",false,false)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CANCELANDO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("cancelando")
AddEventHandler("cancelando",function(status)
	cancelando = status
	LocalPlayer["state"]:set("Commands",status,true)
	if status then
		InitCommandsThread()
	end
end)

function tvRP.isHandcuffed()
	return LocalPlayer.state.Handcuff
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STATUS:CELULAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("status:celular")
AddEventHandler("status:celular",function(status)
	celular = status
	if status then
		InitCelularThread()
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADCELULAR
-----------------------------------------------------------------------------------------------------------------------------------------
function InitCelularThread()
	CreateThread(function()
		while celular do
			DisableControlAction(1,288,true)
			DisableControlAction(1,289,true)
			DisableControlAction(1,170,true)
			DisableControlAction(1,187,true)
			DisableControlAction(1,189,true)
			DisableControlAction(1,190,true)
			DisableControlAction(1,188,true)
			DisableControlAction(1,73,true)
			DisableControlAction(1,167,true)
			DisableControlAction(1,29,true)
			DisableControlAction(1,182,true)
			DisableControlAction(1,16,true)
			DisableControlAction(1,17,true)
			DisableControlAction(1,24,true)
			DisableControlAction(1,25,true)
			DisableControlAction(1,245,true)
			DisableControlAction(1,68,true)
			DisableControlAction(1,70,true)
			DisableControlAction(1,91,true)
			DisablePlayerFiring(cache.ped,true)
			Wait(4)
		end
	end)
end

function InitCommandsThread()
	while cancelando or LocalPlayer["state"]["Commands"] do
		DisableControlAction(1,73,true)
		DisableControlAction(1,29,true)
		DisableControlAction(1,47,true)
		DisableControlAction(1,187,true)
		DisableControlAction(1,189,true)
		DisableControlAction(1,190,true)
		DisableControlAction(1,188,true)
		DisableControlAction(1,257,true)
		DisableControlAction(1,167,true)
		DisableControlAction(1,140,true)
		DisableControlAction(1,141,true)
		DisableControlAction(1,142,true)
		DisableControlAction(1,137,true)
		--DisableControlAction(1,37,true)
		DisableControlAction(1,38,true)
		DisablePlayerFiring(PlayerPedId(),true)
		Wait(4)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REQUEST
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.request(id,text,time)
	time = time or 30
	SendNUIMessage({ act = "request", id = id, text = tostring(text), time = time })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- NUIPROMPT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("prompt",function(data,cb)
	if data.act == "close" then
		SetNuiFocus(false,false)
		vRPserver._promptResult(data.result)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PROMPT
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.prompt(title,default_text)
	if lib then
		local input = lib.inputDialog(title, {
			{ type = 'textarea', label = title, default = default_text, icon = "fa-regular fa-keyboard" }
		})
		if not input then return end
		vRPserver._promptResult(input[1])
	else
		SendNUIMessage({ act = "prompt", title = title, text = tostring(default_text) })
		SetNuiFocus(true,false)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REQUEST
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("request",function(data,cb)
	if data.act == "response" then
		vRPserver._requestResult(data.id,data.ok)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETDIV
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.setDiv(name,css,content)
	SendNUIMessage({ act = "set_div", name = name, css = css, content = content })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETDIVCONTENT
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.setDivContent(name,content)
	SendNUIMessage({ act = "set_div_content", name = name, content = content })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEDIV
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.removeDiv(name)
	SendNUIMessage({ act = "remove_div", name = name })
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LOADANIMSET
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.loadAnimSet(dict)
	LoadAnim(dict)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- APONTAR COM DEDO
-----------------------------------------------------------------------------------------------------------------------------------------
function InitPointThread()
	CreateThread(function()
		while point do
			local timeDistance = 4
			local ped = PlayerPedId()
			local camPitch = GetGameplayCamRelativePitch()

			if camPitch < -70.0 then
				camPitch = -70.0
			elseif camPitch > 42.0 then
				camPitch = 42.0
			end
			camPitch = (camPitch + 70.0) / 112.0

			local camHeading = GetGameplayCamRelativeHeading()
			local cosCamHeading = Cos(camHeading)
			local sinCamHeading = Sin(camHeading)
			if camHeading < -180.0 then
				camHeading = -180.0
			elseif camHeading > 180.0 then
				camHeading = 180.0
			end
			camHeading = (camHeading + 180.0) / 360.0

			local coords = GetOffsetFromEntityInWorldCoords(ped,(cosCamHeading*-0.2)-(sinCamHeading*(0.4*camHeading+0.3)),(sinCamHeading*-0.2)+(cosCamHeading*(0.4*camHeading+0.3)),0.6)
			local ray = Cast_3dRayPointToPoint(coords.x,coords.y,coords.z-0.2,coords.x,coords.y,coords.z+0.2,0.4,95,ped,7);
			local nn,blocked = GetRaycastResult(ray)
			Citizen.InvokeNative(0xD5BB4025AE449A4E,ped,"Pitch",camPitch)
			Citizen.InvokeNative(0xD5BB4025AE449A4E,ped,"Heading",camHeading*-1.0+1.0)
			Citizen.InvokeNative(0xB0A6CFD2C69C1088,ped,"isBlocked",blocked)
			Citizen.InvokeNative(0xB0A6CFD2C69C1088,ped,"isFirstPerson",Citizen.InvokeNative(0xEE778F8C7E1142E2,Citizen.InvokeNative(0x19CAFA3C87F7C2FF))==4)
			Wait(timeDistance)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYNCDELETEENTITY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("syncDeleteEntity")
AddEventHandler("syncDeleteEntity",function(index)
	if NetworkDoesNetworkIdExist(index) then
		local v = NetToEnt(index)
		if DoesEntityExist(v) then
			SetEntityAsMissionEntity(v,false,false)
			DeleteEntity(v)
			Citizen.InvokeNative(0xAE3CBE5BF394C9C9 , Citizen.PointerValueIntInitialized(v))
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYNCCLEANENTITY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("syncclean")
RegisterNetEvent("syncCleanEntity")

local function clearEntity(NetId)
	if NetworkDoesNetworkIdExist(NetId) then
		local Entity = NetToEnt(NetId)
		if DoesEntityExist(Entity) then
			SetVehicleDirtLevel(Entity,0.0)
			SetVehicleUndriveable(Entity,false)
		end
	end
end

AddEventHandler("syncCleanEntity",clearEntity)
AddEventHandler("syncclean", clearEntity)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CANCELF6
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindCancel",function(source,args)
	if not IsPauseMenuActive() then
		local ped = PlayerPedId()
		if GetEntityHealth(ped) > 101 and not celular and not cancelando then
			tvRP.removeObjects()
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- HANDSUP
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindHandsupp",function(source,args)
	if not IsPauseMenuActive() then
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped) and not celular and GetEntityHealth(ped) > 101 then
			if IsEntityPlayingAnim(ped,"random@mugging3","handsup_standing_base",3) then
				StopAnimTask(ped,"random@mugging3","handsup_standing_base",2.0)
				tvRP.stopActived()
			else
				tvRP.playAnim(true,{"random@mugging3","handsup_standing_base"},true)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- POINT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindPoint",function(source,args)
	if not IsPauseMenuActive() then
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped) and not celular and GetEntityHealth(ped) > 101 then
			tvRP.loadAnimSet("anim@mp_point")

			if not point then
				tvRP.stopActived()
				SetPedCurrentWeaponVisible(ped,false,true,true,true)
				SetPedConfigFlag(ped,36,true)
				TaskMoveNetwork(ped,"task_mp_pointing",0.5,false,"anim@mp_point",24)
				point = true
				InitPointThread()
			else
				Citizen.InvokeNative(0xD01015C7316AE176,ped,"Stop")
				if not IsPedInjured(ped) then
					ClearPedSecondaryTask(ped)
				end
				if not IsPedInAnyVehicle(ped) then
					SetPedCurrentWeaponVisible(ped,true,true,true,true)
				end
				SetPedConfigFlag(ped,36,false)
				ClearPedSecondaryTask(ped)
				point = false
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- LIGARVEH
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindEngine",function(source,args)
	if not IsPauseMenuActive() then
		local ped = PlayerPedId()
		if not celular and GetEntityHealth(ped) > 101 then
			if IsPedInAnyVehicle(ped) then
				local vehicle = GetVehiclePedIsUsing(ped)
				if GetPedInVehicleSeat(vehicle,-1) == ped then
					tvRP.removeObjects("two")
					local running = GetIsVehicleEngineRunning(vehicle)
					SetVehicleEngineOn(vehicle,not running,true,true)
					if running then
						SetVehicleUndriveable(vehicle,true)
					else
						SetVehicleUndriveable(vehicle,false)
					end
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BIND
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindAnim",function(source,args)
	if not IsPauseMenuActive() then
		local ped = PlayerPedId()
		if not celular and GetEntityHealth(ped) > 101 then
			if args[1] == "f1" and not IsPedInAnyVehicle(ped) then
				if IsEntityPlayingAnim(ped,"anim@heists@heist_corona@single_team","single_team_loop_boss",3) then
					StopAnimTask(ped,"anim@heists@heist_corona@single_team","single_team_loop_boss",2.0)
					tvRP.stopActived()
				else
					tvRP.playAnim(true,{"anim@heists@heist_corona@single_team","single_team_loop_boss"},true)
				end
			elseif args[1] == "f2" and not IsPedInAnyVehicle(ped) then
				if IsEntityPlayingAnim(ped,"mini@strip_club@idles@bouncer@base","base",3) then
					StopAnimTask(ped,"mini@strip_club@idles@bouncer@base","base",2.0)
					tvRP.stopActived()
				else
					tvRP.playAnim(true,{"mini@strip_club@idles@bouncer@base","base"},true)
				end
			elseif args[1] == "6" and not IsPedInAnyVehicle(ped) then
				if IsEntityPlayingAnim(ped,"anim@mp_player_intupperfinger","idle_a_fp",3) then
					StopAnimTask(ped,"anim@mp_player_intupperfinger","idle_a_fp",2.0)
					tvRP.stopActived()
				else
					tvRP.playAnim(true,{"anim@mp_player_intupperfinger","idle_a_fp"},true)
				end
			elseif args[1] == "7" and not IsPedInAnyVehicle(ped) then
				if IsEntityPlayingAnim(ped,"anim@heists@prison_heiststation@cop_reactions","cop_a_idle",3) then
					StopAnimTask(ped,"anim@heists@prison_heiststation@cop_reactions","cop_a_idle",2.0)
					tvRP.stopActived()
				else
					tvRP.playAnim(true,{"anim@heists@prison_heiststation@cop_reactions","cop_a_idle"},true)
				end
			elseif args[1] == "8" and not IsPedInAnyVehicle(ped) then
				if IsEntityPlayingAnim(ped,"amb@world_human_cop_idles@female@base","base",3) then
					StopAnimTask(ped,"amb@world_human_cop_idles@female@base","base",2.0)
					tvRP.stopActived()
				else
					tvRP.playAnim(true,{"amb@world_human_cop_idles@female@base","base"},true)
				end
			elseif args[1] == "9" and not IsPedInAnyVehicle(ped) then
				if IsEntityPlayingAnim(ped,"random@arrests@busted","idle_a",3) then
					StopAnimTask(ped,"random@arrests@busted","idle_a",2.0)
					tvRP.stopActived()
				else
					tvRP.playAnim(true,{"random@arrests@busted","idle_a"},true)
				end
			elseif args[1] == "left" and not IsPedInAnyVehicle(ped) then
				if not IsPedInAnyVehicle(ped) then
					tvRP.playAnim(true,{"anim@mp_player_intupperthumbs_up","enter"},false)
				end
			elseif args[1] == "right" and not IsPedInAnyVehicle(ped) then
				if not IsPedInAnyVehicle(ped) then
					tvRP.playAnim(true,{"anim@mp_player_intcelebrationmale@face_palm","face_palm"},false)
				end
			elseif args[1] == "up" and not IsPedInAnyVehicle(ped) then
				if not IsPedInAnyVehicle(ped) then
					tvRP.playAnim(true,{"anim@mp_player_intcelebrationmale@salute","salute"},false)
				end
			elseif args[1] == "down" and not IsPedInAnyVehicle(ped) then
				if not IsPedInAnyVehicle(ped) then
					tvRP.playAnim(true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ACCEPT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindAccept",function(source,args)
	if not celular and not cancelando then
		SendNUIMessage({ act = "event", event = "Y" })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REJECT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindReject",function(source,args)
	if not celular and not cancelando then
		SendNUIMessage({ act = "event", event = "U" })
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CROUCH
-----------------------------------------------------------------------------------------------------------------------------------------
local Crouch = false
local Button = GetGameTimer()

RegisterCommand("keybindCrouch",function()
	DisableControlAction(0,36,true)
	local Ped = PlayerPedId()
	if GetGameTimer() >= Button and not IsPauseMenuActive() and not LocalPlayer["state"]["Buttons"] and not LocalPlayer["state"]["Commands"] and not LocalPlayer["state"]["Handcuff"] and not IsPedInAnyVehicle(Ped) and GetEntityHealth(Ped) > 100 and not LocalPlayer["state"]["Cancel"] and not IsPedReloading(Ped) then
		Button = GetGameTimer() + 1000
		Crouch = not Crouch
		if Crouch then
			ResetPedStrafeClipset(Ped)
			ResetPedMovementClipset(Ped,0.25)
		else
			if LoadMovement("move_ped_crouched") and LoadMovement("move_ped_crouched_strafing") then
				SetPedStrafeClipset(Ped,"move_ped_crouched_strafing")
				SetPedMovementClipset(Ped,"move_ped_crouched",0.25)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- KEYMAPPING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterKeyMapping("keybindCancel","Cancelar animações","keyboard","f6")
RegisterKeyMapping("keybindHandsupp","Levantar as mãos","keyboard","x")
RegisterKeyMapping("keybindPoint","Apontar os dedos","keyboard","b")
RegisterKeyMapping("keybindCrouch","Agachar","keyboard","LCONTROL")
RegisterKeyMapping("keybindEngine","Ligar veículo","keyboard","z")
RegisterKeyMapping("keybindAnim f1","Animation Bind f1","keyboard","f1")
RegisterKeyMapping("keybindAnim f2","Animation Bind f2","keyboard","f2")
RegisterKeyMapping("keybindAnim 6","Animation Bind 6","keyboard","6")
RegisterKeyMapping("keybindAnim 7","Animation Bind 7","keyboard","7")
RegisterKeyMapping("keybindAnim 8","Animation Bind 8","keyboard","8")
RegisterKeyMapping("keybindAnim 9","Animation Bind 9","keyboard","9")
RegisterKeyMapping("keybindAnim left","Bind Left","keyboard","left")
RegisterKeyMapping("keybindAnim right","Bind Right","keyboard","right")
RegisterKeyMapping("keybindAnim up","Bind Up","keyboard","up")
RegisterKeyMapping("keybindAnim down","Bind Down","keyboard","down")
RegisterKeyMapping("keybindAccept","Aceitar chamado","keyboard","y")
RegisterKeyMapping("keybindReject","Rejeitar chamado","keyboard","u")

RegisterNUICallback("init",function(data,cb)
	SendNUIMessage({ act = "cfg", cfg = {} })
	TriggerEvent("vRP:NUIready")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MENU
-----------------------------------------------------------------------------------------------------------------------------------------
local menu_state = {}

function tvRP.openMenuData(menudata)
	SendNUIMessage({ act = "open_menu", menudata = menudata })
end

function tvRP.closeMenu()
	SendNUIMessage({ act = "close_menu" })
end

function tvRP.getMenuState()
	return menu_state
end

RegisterNUICallback("menu",function(data,cb)
	if data.act == "close" then
		vRPserver._closeMenu(data.id)
	elseif data.act == "valid" then
		vRPserver._validMenuChoice(data.id,data.choice,data.mod)
	end
end)

RegisterNUICallback("menu_state",function(data,cb)
	menu_state = data
end)
