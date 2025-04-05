-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
PlvRP = {}
Tunnel.bindInterface("Player",PlvRP)
PlayerServer = Tunnel.getInterface("Player")
-----------------------------------------------------------------------------------------------------------------------------------------
-- RECEIVESALARY
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		Wait(Config.Geral['salaryTime']*60*1000)
		TriggerServerEvent("vrp_player:salary")
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DIVING
-----------------------------------------------------------------------------------------------------------------------------------------
function PlvRP.setDiving()
	local ped = PlayerPedId()
	if IsPedSwimming(ped) then
		if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") then
			SetPedComponentVariation(ped,8,123,0,2)
			SetPedPropIndex(ped,1,26,0,true)
		elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") then
			SetPedComponentVariation(ped,8,153,0,2)
			SetPedPropIndex(ped,1,28,0,true)
		end
	end
end

function PlvRP.playerDriving()
	local ped = PlayerPedId()
	if GetPedInVehicleSeat(GetVehiclePedIsUsing(ped),-1) == ped or GetVehiclePedIsTryingToEnter(ped) > 0 then
		return true
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SEATSHUFFLE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		if IsPedInAnyVehicle(ped,false) and not IsPedOnAnyBike(ped) then
			local veh = GetVehiclePedIsUsing(ped)
			if GetPedInVehicleSeat(veh,0) == ped then
				timeDistance = 4
				if not GetIsTaskActive(ped,164) and GetIsTaskActive(ped,165) then
					SetPedIntoVehicle(ped,veh,0)
				end
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETENERGETIC
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("setEnergetic")
AddEventHandler("setEnergetic",function(timers,number)
	if not timers or type(timers) ~= "number" then return end
	local energetic = timers
	SetRunSprintMultiplierForPlayer(PlayerId(),number)
	while energetic > 0 do
		energetic = energetic - 1
		if energetic <= 0 or GetEntityHealth(PlayerPedId()) <= 101 then
			energetic = 0
			SetRunSprintMultiplierForPlayer(PlayerId(),1.0)
		end
		RestorePlayerStamina(PlayerId(),1.0)
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETECSTASY
-----------------------------------------------------------------------------------------------------------------------------------------
local ecstasy = 0
RegisterNetEvent("setEcstasy")
AddEventHandler("setEcstasy",function()
	ecstasy = ecstasy + 10
	if not GetScreenEffectIsActive("MinigameTransitionIn") then
		StartScreenEffect("MinigameTransitionIn",0,true)
	end
	while ecstasy > 0 do
		ecstasy = ecstasy - 1
		ShakeGameplayCam("LARGE_EXPLOSION_SHAKE",0.05)
		if ecstasy <= 0 or GetEntityHealth(PlayerPedId()) <= 101 then
			ecstasy = 0
			if GetScreenEffectIsActive("MinigameTransitionIn") then
				StopScreenEffect("MinigameTransitionIn")
			end
		end
		Wait(3000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETMETH
-----------------------------------------------------------------------------------------------------------------------------------------
local meth = 0
RegisterNetEvent("setMeth")
AddEventHandler("setMeth",function()
	meth = meth + 20
	if not GetScreenEffectIsActive("DMT_flight") then
		StartScreenEffect("DMT_flight",0,true)
	end
	while meth > 0 do
		meth = meth - 1
		if meth <= 0 or GetEntityHealth(PlayerPedId()) <= 101 then
			meth = 0
			if GetScreenEffectIsActive("DMT_flight") then
				StopScreenEffect("DMT_flight")
			end
		end
		Wait(3000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETDRUNK
-----------------------------------------------------------------------------------------------------------------------------------------
local gsrTime = 0
local drunkTime = 0

RegisterNetEvent("setDrunkTime")
AddEventHandler("setDrunkTime",function(timers)
	drunkTime = timers
	RequestAnimSet("move_m@drunk@verydrunk")
	while not HasAnimSetLoaded("move_m@drunk@verydrunk") do
		Wait(10)
	end
	SetPedMovementClipset(PlayerPedId(),"move_m@drunk@verydrunk",0.25)
end)

CreateThread(function()
	while true do
		if drunkTime > 0 then
			drunkTime = drunkTime - 1
			if drunkTime <= 0 or GetEntityHealth(PlayerPedId()) <= 101 then
				ResetPedMovementClipset(PlayerPedId(),0.25)
			end
		end
		if gsrTime > 0 then
			gsrTime = gsrTime - 1
		end
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSHOTSFIRED
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		if IsPedArmed(ped,4) and not LocalPlayer.state.inLateGame and not LocalPlayer.state.inPvp then
			timeDistance = 10
			if IsPedShooting(ped) then
				PlayerServer.shotsFired()
				gsrTime = 60
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GSRCHECK
-----------------------------------------------------------------------------------------------------------------------------------------
function PlvRP.gsrCheck()
	return gsrTime
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLEANEFFECTDRUGS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("cleanEffectDrugs")
AddEventHandler("cleanEffectDrugs",function()
	if GetScreenEffectIsActive("MinigameTransitionIn") then
		StopScreenEffect("MinigameTransitionIn")
	end
	if GetScreenEffectIsActive("DMT_flight") then
		StopScreenEffect("DMT_flight")
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYNCHOOD
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_player:syncHood")
AddEventHandler("vrp_player:syncHood",function(index)
	if NetworkDoesNetworkIdExist(index) then
		local v = NetToEnt(index)
		if DoesEntityExist(v) then
			if GetVehicleDoorAngleRatio(v,4) == 0 then
				SetVehicleDoorOpen(v,4,false,true)
			else
				SetVehicleDoorShut(v,4,true)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYNCWINS
-----------------------------------------------------------------------------------------------------------------------------------------
local vidros = false

RegisterNetEvent("vrp_player:syncWins")
AddEventHandler("vrp_player:syncWins",function(index)
	if NetworkDoesNetworkIdExist(index) then
		local v = NetToVeh(index)
		if DoesEntityExist(v) then
			if vidros then
				vidros = false
				RollUpWindow(v,0)
				RollUpWindow(v,1)
				RollUpWindow(v,2)
				RollUpWindow(v,3)
			else
				vidros = true
				RollDownWindow(v,0)
				RollDownWindow(v,1)
				RollDownWindow(v,2)
				RollDownWindow(v,3)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYNCDOORS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_player:syncDoors")
AddEventHandler("vrp_player:syncDoors",function(index,door)
	local v = index
	if DoesEntityExist(v) then
		if door == "1" then
			if GetVehicleDoorAngleRatio(v,0) == 0 then
				SetVehicleDoorOpen(v,0,false,false)
			else
				SetVehicleDoorShut(v,0,false)
			end
		elseif door == "2" then
			if GetVehicleDoorAngleRatio(v,1) == 0 then
				SetVehicleDoorOpen(v,1,false,false)
			else
				SetVehicleDoorShut(v,1,false)
			end
		elseif door == "3" then
			if GetVehicleDoorAngleRatio(v,2) == 0 then
				SetVehicleDoorOpen(v,2,false,false)
			else
				SetVehicleDoorShut(v,2,false)
			end
		elseif door == "4" then
			if GetVehicleDoorAngleRatio(v,3) == 0 then
				SetVehicleDoorOpen(v,3,false,false)
			else
				SetVehicleDoorShut(v,3,false)
			end
		elseif door == "5" then
			if GetVehicleDoorAngleRatio(v,5) == 0 then
				SetVehicleDoorOpen(v,5,false,true)
			else
				SetVehicleDoorShut(v,5,true)
			end
		elseif door == nil then
			if GetVehicleDoorAngleRatio(v,0) == 0 and GetVehicleDoorAngleRatio(v,1) == 0 then
				SetVehicleDoorOpen(v,0,false,false)
				SetVehicleDoorOpen(v,1,false,false)
				SetVehicleDoorOpen(v,2,false,false)
				SetVehicleDoorOpen(v,3,false,false)
			else
				SetVehicleDoorShut(v,0,false)
				SetVehicleDoorShut(v,1,false)
				SetVehicleDoorShut(v,2,false)
				SetVehicleDoorShut(v,3,false)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CUFF
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindcuff",function(source,args)
	PlayerServer.cuffToggle()
end)
RegisterKeyMapping("keybindcuff","Algemar o Cidadao","keyboard","g")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CARRY
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("keybindcarry",function(source,args)
	PlayerServer.carryToggle()
end)
RegisterKeyMapping("keybindcarry","Carregar o Cidadao","keyboard","h")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VTUNING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("vtuning",function(source,args)
	local ped = PlayerPedId()
	local Vehicle = GetVehiclePedIsUsing(ped)
	if IsEntityAVehicle(Vehicle) then
		local Engine = GetVehicleMod(Vehicle,11)
		if Engine ~= -1 then
			exports["dynamic"]:AddButton("Motor","Modelo instalado: <yellow>"..Engine.."</yellow>","","",false,false)
		end

		local Brake = GetVehicleMod(Vehicle,12)
		if Brake ~= -1 then
			exports["dynamic"]:AddButton("Freio","Modelo instalado: <yellow>"..Brake.."</yellow>","","",false,false)
		end

		local Transmission = GetVehicleMod(Vehicle,13)
		if Transmission ~= -1 then
			exports["dynamic"]:AddButton("Transmissão","Modelo instalado: <yellow>"..Transmission.."</yellow>","","",false,false)
		end

		local Suspension = GetVehicleMod(Vehicle,15)
		if Suspension ~= -1 then
			exports["dynamic"]:AddButton("Suspensão","Modelo instalado: <yellow>"..Suspension.."</yellow>","","",false,false)
		end

		local Shielding = GetVehicleMod(Vehicle,16)
		if Shielding ~= -1 then
			exports["dynamic"]:AddButton("Blindagem","Modelo instalado: <yellow>"..Shielding.."</yellow>","","",false,false)
		end

		local Force = GetVehicleEngineHealth(Vehicle) / 10
		exports["dynamic"]:AddButton("Potência","Potência do motor se encontra em <yellow>"..parseInt(Force).."%</yellow>.","","",false,false)

		local Body = GetVehicleBodyHealth(Vehicle) / 10
		exports["dynamic"]:AddButton("Lataria","Qualidade da lataria se encontra em <yellow>"..parseInt(Body).."%</yellow>.","","",false,false)

		local Health = GetEntityHealth(Vehicle) / 10
		exports["dynamic"]:AddButton("Chassi","Rigidez do chassi se encontra em <yellow>"..parseInt(Health).."%</yellow>.","","",false,false)

		exports["dynamic"]:openMenu()
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SEAT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_player:SeatPlayer")
AddEventHandler("vrp_player:SeatPlayer",function(Index)
	local Ped = PlayerPedId()
	local Vehicle = GetVehiclePedIsUsing(Ped)
	if Vehicle and DoesEntityExist(Vehicle) and IsPedInAnyVehicle(Ped,false) then
		if Index == "0" then
			if IsVehicleSeatFree(Vehicle,-1) then
				SetPedIntoVehicle(Ped,Vehicle,-1)
			end
		elseif Index == "1" then
			if IsVehicleSeatFree(Vehicle,0) then
				SetPedIntoVehicle(Ped,Vehicle,0)
			end
		else
			for Seat = 1,10 do
				if IsVehicleSeatFree(Vehicle,Seat) then
					SetPedIntoVehicle(Ped,Vehicle,Seat)
					break
				end
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOGGLEHANDCUFF
-----------------------------------------------------------------------------------------------------------------------------------------
local handcuff = false

function PlvRP.toggleHandcuff()
	local ped = PlayerPedId()
	if not handcuff then
		handcuff = true
		TriggerEvent("gcPhone:handcuff")
		TriggerEvent("radio:outServers")
		TriggerEvent("status:celular",true)
		if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") then
			SetPedComponentVariation(ped,7,41,0,2)
		elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") then
			SetPedComponentVariation(ped,7,25,0,2)
		end
	else
		handcuff = false
		TriggerEvent("status:celular",false)
		SetPedComponentVariation(ped,7,0,0,2)
	end
	LocalPlayer["state"]:set("Handcuff",handcuff,true)
end

RegisterNetEvent("police:client:GetCuffed",PlvRP.toggleHandcuff)

function PlvRP.getHandcuff() return handcuff end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PORTA-MALAS
-----------------------------------------------------------------------------------------------------------------------------------------
local mala = false
function PlvRP.toggleMalas()
	mala = not mala
	local ped = PlayerPedId()
	local vehicle = vRP.getNearestVehicle(7)
	if IsEntityAVehicle(vehicle) then
		if mala then
			AttachEntityToEntity(ped,vehicle,GetEntityBoneIndexByName(vehicle,"bumper_r"),0.6,-0.4,-0.1,60.0,-90.0,180.0,false,false,false,true,2,true)
			SetEntityVisible(ped,false,false)
			SetEntityInvincible(ped,false) --mqcu
		else
			DetachEntity(ped,true,true)
			SetEntityVisible(ped,true,false)
			SetEntityInvincible(ped,false)
			SetPedToRagdoll(ped,2000,2000,0,false,false,false)
		end
	end
end

function PlvRP.setMalas(flag)
	if mala ~= flag then
		PlvRP.toggleMalas()
	end
end

function PlvRP.isMalas()
	return mala
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- RESETDIAGNOSTIC
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("resetHandcuff")
AddEventHandler("resetHandcuff",function()
	local ped = PlayerPedId()
	if handcuff then
		handcuff = false
		vRP.stopAnim(false)
		TriggerEvent("status:celular",false)
		SetPedComponentVariation(ped,7,0,0,2)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MOVEMENTCLIP
-----------------------------------------------------------------------------------------------------------------------------------------
function PlvRP.movementClip(dict)
	RequestAnimSet(dict)
	while not HasAnimSetLoaded(dict) do
		Wait(10)
	end
	SetPedMovementClipset(PlayerPedId(),dict,0.25)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADHANDCUFF
-----------------------------------------------------------------------------------------------------------------------------------------
AddStateBagChangeHandler("Handcuff", "", function(bagName, key, value)
    local player = GetPlayerFromStateBagName(bagName)
    if player == 0 or player ~= PlayerId() or not value then return end
	local ped = PlayerPedId()
	CreateThread(function()
		while LocalPlayer.state.Handcuff do
			if GetEntityHealth(ped) > 101 then
				vRP.playAnim(true,{"mp_arresting","idle"},true)
			end
			Wait(5000)
		end
	end)
    while LocalPlayer.state.Handcuff do
		DisableControlAction(1,21,true)
		DisableControlAction(1,23,true)
		DisableControlAction(1,24,true)
		DisableControlAction(1,25,true)
		DisableControlAction(1,37,true)
		DisableControlAction(0,37,true)
		DisableControlAction(1,75,true)
		DisableControlAction(1,22,true)
		--DisableControlAction(1,73,true)
		DisableControlAction(1,167,true)
		DisableControlAction(1,311,true)
		DisableControlAction(1,29,true)
		DisableControlAction(1,182,true)
		DisableControlAction(1,187,true)
		DisableControlAction(1,189,true)
		DisableControlAction(1,190,true)
		DisableControlAction(1,188,true)
		DisableControlAction(1,245,true)
		DisableControlAction(1,243,true)
		DisableControlAction(1,105,true)
		DisableControlAction(0,21,true)
		DisableControlAction(0,22,true)
		DisableControlAction(0,24,true)
		DisableControlAction(0,25,true)
		DisableControlAction(0,29,true)
		DisableControlAction(0,32,true)
		DisableControlAction(0,33,true)
		DisableControlAction(0,34,true)
		DisableControlAction(0,35,true)
		DisableControlAction(0,56,true)
		DisableControlAction(0,58,true)
		--DisableControlAction(0,73,true)
		DisableControlAction(0,75,true)
		DisableControlAction(0,140,true)
		DisableControlAction(0,141,true)
		DisableControlAction(0,142,true)
		DisableControlAction(0,143,true)
		DisableControlAction(0,159,true)
		DisableControlAction(0,166,true)
		DisableControlAction(0,167,true)
		DisableControlAction(1,167,true)
		DisableControlAction(2,167,true)
		DisableControlAction(0,170,true)
		DisableControlAction(0,177,true)
		DisableControlAction(0,182,true)
		DisableControlAction(0,187,true)
		DisableControlAction(0,188,true)
		DisableControlAction(0,189,true)
		DisableControlAction(0,190,true)
		DisableControlAction(0,243,true)
		DisableControlAction(0,245,true)
		DisableControlAction(0,246,true)
		DisableControlAction(0,257,true)
		DisableControlAction(0,263,true)
		DisableControlAction(0,264,true)
		DisableControlAction(0,268,true)
		DisableControlAction(0,269,true)
		DisableControlAction(0,270,true)
		DisableControlAction(0,271,true)
		DisableControlAction(0,288,true)
		DisableControlAction(0,289,true)
		DisableControlAction(0,303,true)
		DisableControlAction(0,311,true)
		DisableControlAction(0,344,true)
		DisablePlayerFiring(ped,true)
		Wait(4)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOGGLECARRY
-----------------------------------------------------------------------------------------------------------------------------------------
local uCarry = nil
local iCarry = false
local sCarry = false
function PlvRP.toggleCarry(source)
	uCarry = source
	iCarry = not iCarry
	local ped = PlayerPedId()
	if iCarry and uCarry then
		Citizen.InvokeNative(0x6B9BBD38AB0796DF,PlayerPedId(),GetPlayerPed(GetPlayerFromServerId(uCarry)),4103,11816,0.5,0.0,0.0,0.0,0.0,0.0,false,false,false,false,2,true)
		sCarry = true
	else
		if sCarry then
			DetachEntity(ped,false,false)
			sCarry = false
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REMOVEVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
function PlvRP.removeVehicle()
	local ped = PlayerPedId()
	if IsPedSittingInAnyVehicle(ped) then
		iCarry = false
		if uCarry then
			DetachEntity(GetPlayerPed(GetPlayerFromServerId(uCarry)),false,false)
		end
		TaskLeaveVehicle(ped,GetVehiclePedIsUsing(ped),4160)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PUTVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
function PlvRP.putVehicle()
	local veh = vRP.getNearVehicle(11)
	if IsEntityAVehicle(veh) then
		local vehSeats = 10
		local Ped = PlayerPedId()
		repeat
			vehSeats = vehSeats - 1
			if IsVehicleSeatFree(veh,vehSeats) then
				ClearPedTasks(Ped)
				ClearPedSecondaryTask(Ped)
				SetPedIntoVehicle(Ped,veh,vehSeats)
				vehSeats = 0
			end
		until vehSeats == 0
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HOLSTER - ANIMAÇÃO ARMA EQUIPADA
-----------------------------------------------------------------------------------------------------------------------------------------
local weapons = {
	"WEAPON_KNIFE",
	"WEAPON_HATCHET",
	"WEAPON_PISTOL",
	"WEAPON_PISTOL_MK2",
	"WEAPON_PISTOL50",
	"WEAPON_REVOLVER",
	"WEAPON_COMBATPISTOL",
	"WEAPON_FLASHLIGHT",
	"WEAPON_NIGHTSTICK",
	"WEAPON_STUNGUN",
	"WEAPON_COMPACTRIFLE",
	"WEAPON_APPISTOL",
	"WEAPON_HEAVYPISTOL",
	"WEAPON_MACHINEPISTOL",
	"WEAPON_MICROSMG",
	"WEAPON_COMBATPDW",
	"WEAPON_MINISMG",
	"WEAPON_SNSPISTOL",
	"WEAPON_SNSPISTOL_MK2",
	"WEAPON_VINTAGEPISTOL",
	"WEAPON_CARBINERIFLE",
	"WEAPON_SNIPERRIFLE",
	"WEAPON_SPECIALCARBINE",
	"WEAPON_SMG",
	"WEAPON_PUMPSHOTGUN",
	"WEAPON_SAWNOFFSHOTGUN",
	"WEAPON_ASSAULTRIFLE",
	"WEAPON_ASSAULTRIFLE_MK2",
	"WEAPON_ASSAULTSMG",
	"WEAPON_GUSENBERG"
}

CreateThread(function()
	if GlobalState['Inventory'] ~= "ox_inventory" then
		local holster = false
		while true do
			local timeDistance = 500
			local ped = PlayerPedId()
			if DoesEntityExist(ped) and GetEntityHealth(ped) > 101 and not IsPedInAnyVehicle(ped,false) then
				if not holster and CheckWeapon(ped) then
					timeDistance = 4
					if not IsEntityPlayingAnim(ped,"amb@world_human_sunbathe@female@back@idle_a","idle_a",3) then
						LoadAnim("rcmjosh4")
						TaskPlayAnim(ped,"rcmjosh4","josh_leadout_cop2",3.0,2.0,-1,48,10,false,false,false)
						Wait(450)
						ClearPedTasks(ped)
					end
					holster = true
				elseif holster and not CheckWeapon(ped) then
					timeDistance = 4
					if not IsEntityPlayingAnim(ped,"amb@world_human_sunbathe@female@back@idle_a","idle_a",3) then
						LoadAnim("weapons@pistol@")
						TaskPlayAnim(ped,"weapons@pistol@","aim_2_holster",3.0,2.0,-1,48,10,false,false,false)
						Wait(450)
						ClearPedTasks(ped)
					end
					holster = false
				end
			end
			if GetEntityHealth(ped) <= 101 and holster then
				holster = false
				SetCurrentPedWeapon(ped,GetHashKey("WEAPON_UNARMED"),true)
			end
			Wait(timeDistance)
		end
	end
end)

function CheckWeapon(ped)
	for i = 1,#weapons do
		if GetHashKey(weapons[i]) == GetSelectedPedWeapon(ped) then
			return true
		end
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- HIDETRUNK
-----------------------------------------------------------------------------------------------------------------------------------------
local inTrunk = false
RegisterNetEvent("vrp_player:EnterTrunk")
AddEventHandler("vrp_player:EnterTrunk",function()
	local ped = PlayerPedId()
	if not inTrunk then
		local vehicle = vRP.getNearVehicle(11)
		if DoesEntityExist(vehicle) then
			local trunk = GetEntityBoneIndexByName(vehicle,"boot")
			if trunk ~= -1 then
				local coords = GetEntityCoords(ped)
				local coordsEnt = GetWorldPositionOfEntityBone(vehicle,trunk)
				local distance = #(coords - coordsEnt)
				if distance <= 3.0 and not IsPedInAnyVehicle(ped,false) then
					if GetVehicleDoorAngleRatio(vehicle,5) < 0.9 and GetVehicleDoorsLockedForPlayer(vehicle,PlayerId()) ~= 1 then
						SetCarBootOpen(vehicle)
						SetEntityVisible(ped,false,false)
						Wait(750)
						AttachEntityToEntity(ped,vehicle,-1,0.0,-2.2,0.5,0.0,0.0,0.0,false,false,false,false,20,true)
						inTrunk = true
						StartTrunkThread()
						Wait(500)
						SetVehicleDoorShut(vehicle,5,false)
					end
				end
			end
		end
	else
		local vehicle = vRP.getNearVehicle(11)
		local trunk = GetEntityBoneIndexByName(vehicle,"boot")
		if trunk ~= -1 then
			local coords = GetEntityCoords(ped)
			local coordsEnt = GetWorldPositionOfEntityBone(vehicle,trunk)
			local distance = #(coords - coordsEnt)
			if distance <= 3.0 then
				if DoesEntityExist(vehicle) then
					SetCarBootOpen(vehicle)
					Wait(750)
					inTrunk = false
					DetachEntity(ped,false,false)
					SetEntityVisible(ped,true,false)
					local VehTrunk = GetOffsetFromEntityInWorldCoords(ped,0.0,-1.5,-0.75)
					SetEntityCoords(ped,VehTrunk.x,VehTrunk.y,VehTrunk.z,false,false,false,false)
					Wait(500)
					SetVehicleDoorShut(vehicle,5,false)
				end
			end
		end
	end
end)

RegisterNetEvent("vrp_player:CheckTrunk")
AddEventHandler("vrp_player:CheckTrunk",function()
	local ped = PlayerPedId()
	if inTrunk then
		local vehicle = GetEntityAttachedTo(ped)
		if DoesEntityExist(vehicle) then
			SetCarBootOpen(vehicle)
			Wait(750)
			inTrunk = false
			DetachEntity(ped,false,false)
			SetEntityVisible(ped,true,false)
			local VehTrunk = GetOffsetFromEntityInWorldCoords(ped,0.0,-1.5,-0.75)
			SetEntityCoords(ped,VehTrunk.x,VehTrunk.y,VehTrunk.z,false,false,false,false)
			Wait(500)
			SetVehicleDoorShut(vehicle,5,false)
		end
	end
end)

function StartTrunkThread()
	CreateThread(function()
		while inTrunk do
			local timeDistance = 1000
			local ped = PlayerPedId()
			local vehicle = GetEntityAttachedTo(ped)
			local pedOffset = GetOffsetFromEntityInWorldCoords(ped,0.0,-1.5,-0.75)
			if DoesEntityExist(vehicle) then
				timeDistance = 4
				DisableControlAction(1,73,true)
				DisableControlAction(1,29,true)
				DisableControlAction(1,47,true)
				DisableControlAction(1,187,true)
				DisableControlAction(1,189,true)
				DisableControlAction(1,190,true)
				DisableControlAction(1,188,true)
				DisableControlAction(1,311,true)
				DisableControlAction(1,245,true)
				DisableControlAction(1,257,true)
				DisableControlAction(1,167,true)
				DisableControlAction(1,140,true)
				DisableControlAction(1,141,true)
				DisableControlAction(1,142,true)
				DisableControlAction(1,137,true)
				--DisableControlAction(1,37,true)
				DisablePlayerFiring(ped,true)

				if IsEntityVisible(ped) then
					SetEntityVisible(ped,false,false)
				end

				if IsControlJustPressed(1,38) then
					SetCarBootOpen(vehicle)
					Wait(750)
					inTrunk = false
					DetachEntity(ped,false,false)
					SetEntityVisible(ped,true,false)
					SetEntityCoords(ped,pedOffset.x,pedOffset.y,pedOffset.z,false,false,false,false)
					Wait(500)
					SetVehicleDoorShut(vehicle,5,false)
				end
			else
				inTrunk = false
				DetachEntity(ped,false,false)
				SetEntityVisible(ped,true,false)
				SetEntityCoords(ped,pedOffset.x,pedOffset.y,pedOffset.z,false,false,false,false)
			end
			Wait(timeDistance)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SEQUESTRO DE NPC
-----------------------------------------------------------------------------------------------------------------------------------------
local sequestrado = nil

function PlvRP.getVehicleClass(vehicle)
	return GetVehicleClass(vehicle) == 0 or GetVehicleClass(vehicle) == 1 or GetVehicleClass(vehicle) == 2 or GetVehicleClass(vehicle) == 3 or GetVehicleClass(vehicle) == 4 or GetVehicleClass(vehicle) == 5 or GetVehicleClass(vehicle) == 6 or GetVehicleClass(vehicle) == 7 or GetVehicleClass(vehicle) == 9 or GetVehicleClass(vehicle) == 12
end

RegisterCommand("sequestro2",function(source,args)
	local complet = false
	local ped = PlayerPedId()
	local random,npc = FindFirstPed()
	repeat
		local distancia = #(GetEntityCoords(ped) - GetEntityCoords(npc))
		if not IsPedAPlayer(npc) and distancia <= 3 and not IsPedInAnyVehicle(npc,false) then
			local vehicle = vRP.getNearestVehicle(7)
			if IsEntityAVehicle(vehicle) then
				if PlvRP.getVehicleClass(vehicle) then
					if sequestrado then
						AttachEntityToEntity(sequestrado,vehicle,GetEntityBoneIndexByName(vehicle,"bumper_r"),0.6,-1.2,-0.6,60.0,-90.0,180.0,false,false,false,true,2,true)
						DetachEntity(sequestrado,true,true)
						SetEntityVisible(sequestrado,true,false)
						SetEntityInvincible(sequestrado,false)
						Citizen.InvokeNative(0xAD738C3085FE7E11,sequestrado,true,true)
						ClearPedTasksImmediately(sequestrado)
						sequestrado = nil
					elseif not sequestrado then
						Citizen.InvokeNative(0xAD738C3085FE7E11,npc,true,true)
						AttachEntityToEntity(npc,vehicle,GetEntityBoneIndexByName(vehicle,"bumper_r"),0.6,-0.4,-0.1,60.0,-90.0,180.0,false,false,false,true,2,true)
						SetEntityVisible(npc,false,false)
						SetEntityInvincible(npc,true)
						sequestrado = npc
						complet = true
					end
				end
			end
		end
		complet,npc = FindNextPed(random)
	until not complet
	EndFindPed(random)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- EMPURRAR
-----------------------------------------------------------------------------------------------------------------------------------------
local First = vector3(0.0,0.0,0.0)
local Second = vector3(5.0,5.0,5.0)
local Vehicle = { Coords = nil, Vehicle = nil, Dimension = nil, IsInFront = false, Distance = nil }

local function getClosestVeh(coords)
	local vehicles = GetGamePool("CVehicle")
	local closestDistance = -1
	local closestVehicle = -1
	if coords == nil then
		local ped = PlayerPedId()
		coords = GetEntityCoords(ped)
	end
	for i=1,#vehicles,1 do
		local vehicleCoords = GetEntityCoords(vehicles[i])
		local distance = GetDistanceBetweenCoords(vehicleCoords.x,vehicleCoords.y,vehicleCoords.z,coords.x,coords.y,coords.z,true)
		if closestDistance == -1 or closestDistance > distance then
			closestVehicle  = vehicles[i]
			closestDistance = distance
		end
	end
	return closestVehicle,closestDistance
end

CreateThread(function()
	while true do
		local ped = PlayerPedId()
		local closestVehicle,Distance = getClosestVeh()
		if Distance < 6.1 and not IsPedInAnyVehicle(ped,false) then
			Vehicle.Coords = GetEntityCoords(closestVehicle)
			Vehicle.Dimensions = GetModelDimensions(GetEntityModel(closestVehicle))
			Vehicle.Vehicle = closestVehicle
			Vehicle.Distance = Distance
			local pedCoords = GetEntityCoords(ped)
			if #(Vehicle.Coords + GetEntityForwardVector(closestVehicle) - pedCoords) > #(Vehicle.Coords + GetEntityForwardVector(closestVehicle) * -1 - pedCoords) then
				Vehicle.IsInFront = false
			else
				Vehicle.IsInFront = true
			end
		else
			Vehicle = { Coords = nil, Vehicle = nil, Dimensions = nil, IsInFront = false, Distance = nil }
		end
		Wait(1200)
	end
end)

CreateThread(function()
	while true do
		Wait(1000)
		if Vehicle.Vehicle ~= nil then
			local ped = PlayerPedId()
			if IsControlPressed(0,244) and GetEntityHealth(ped) > 100 and IsVehicleSeatFree(Vehicle.Vehicle,-1) and not IsEntityInAir(ped) and not IsPedBeingStunned(ped,0) and not IsEntityAttachedToEntity(ped,Vehicle.Vehicle) and not (GetEntityRoll(Vehicle.Vehicle) > 75.0 or GetEntityRoll(Vehicle.Vehicle) < -75.0) then
				RequestAnimDict('missfinale_c2ig_11')
				TaskPlayAnim(ped,'missfinale_c2ig_11','pushcar_offcliff_m',2.0,-8.0,-1,35,0,false,false,false)
				NetworkRequestControlOfEntity(Vehicle.Vehicle)
				local vehBone = GetPedBoneIndex(6286,0)
				if Vehicle.IsInFront then
					AttachEntityToEntity(ped,Vehicle.Vehicle,vehBone,0.0,Vehicle.Dimensions.y*-1+0.1,Vehicle.Dimensions.z+1.0,0.0,0.0,180.0,false,false,false,true,0,true)
				else
					AttachEntityToEntity(ped,Vehicle.Vehicle,vehBone,0.0,Vehicle.Dimensions.y-0.3,Vehicle.Dimensions.z+1.0,0.0,0.0,0.0,false,false,false,true,0,true)
				end
				while true do
					Wait(5)
					if IsDisabledControlPressed(0,34) then
						TaskVehicleTempAction(ped,Vehicle.Vehicle,11,100)
					end
					if IsDisabledControlPressed(0,9) then
						TaskVehicleTempAction(ped,Vehicle.Vehicle,10,100)
					end
					if Vehicle.IsInFront then
						SetVehicleForwardSpeed(Vehicle.Vehicle,-1.0)
					else
						SetVehicleForwardSpeed(Vehicle.Vehicle,1.0)
					end
					if not IsDisabledControlPressed(0,244) then
						DetachEntity(ped,false,false)
						StopAnimTask(ped,'missfinale_c2ig_11','pushcar_offcliff_m',2.0)
						break
					end
				end
			end
		end
	end
end)
-------------------------------------------------------------------------------------------------------------------------------
-- LOGS
-------------------------------------------------------------------------------------------------------------------------------
local alreadyDead = false

local function getWeaponHashName(hash)
	if hash ~= nil then
		if hash == "2725352035" then return "WEAPON_UNARMED"
		elseif hash == "4194021054" then return "WEAPON_ANIMAL"
		elseif hash == "148160082" then return "WEAPON_COUGAR"
		elseif hash == "1317494643" then return "WEAPON_HAMMER"
		elseif hash == "2508868239" then return "WEAPON_BAT"
		elseif hash == "2227010557" then return "WEAPON_CROWBAR"
		elseif hash == "453432689" then return "WEAPON_PISTOL"
		elseif hash == "2578778090" then return "WEAPON_KNIFE"
		elseif hash == "1593441988" then return "WEAPON_COMBATPISTOL"
		elseif hash == "1737195953" then return "WEAPON_NIGHTSTICK"
		elseif hash == "1141786504" then return "WEAPON_GOLFCLUB"
		elseif hash == "584646201" then return "WEAPON_APPISTOL"
		elseif hash == "2578377531" then return "WEAPON_PISTOL50"
		elseif hash == "2939590305" then return "WEAPON_RAYGUN"
		elseif hash == "171789620" then return "WEAPON_COMBATPDW"
		elseif hash == "324215364" then return "WEAPON_MICROSMG"
		elseif hash == "736523883" then return "WEAPON_SMG"
		elseif hash == "4024951519" then return "WEAPON_ASSAULTSMG"
		elseif hash == "2210333304" then return "WEAPON_CARBINERIFLE"
		elseif hash == "-1074790547" then return "WEAPON_ASSAULTRIFLE"
		elseif hash == "2634544996" then return "WEAPON_MG"
		elseif hash == "487013001" then return "WEAPON_PUMPSHOTGUN"
		elseif hash == "2017895192" then return "WEAPON_SAWNOFFSHOTGUN"
		elseif hash == "3800352039" then return "WEAPON_ASSAULTSHOTGUN"
		elseif hash == "2640438543" then return "WEAPON_BULLPUPSHOTGUN"
		elseif hash == "911657153" then return "WEAPON_STUNGUN"
		elseif hash == "100416529" then return "WEAPON_SNIPERRIFLE"
		elseif hash == "205991906" then return "WEAPON_HEAVYSNIPER"
		elseif hash == "856002082" then return "WEAPON_REMOTESNIPER"
		elseif hash == "2726580491" then return "WEAPON_GRENADELAUNCHER"
		elseif hash == "1305664598" then return "WEAPON_GRENADELAUNCHER_SMOKE"
		elseif hash == "2982836145" then return "WEAPON_RPG"
		elseif hash == "375527679" then return "WEAPON_PASSENGER_ROCKET"
		elseif hash == "2937143193" then return "WEAPON_ADVANCEDRIFLE"
		elseif hash == "2144741730" then return "WEAPON_COMBATMG"
		elseif hash == "324506233" then return "WEAPON_AIRSTRIKE_ROCKET"
		elseif hash == "1752584910" then return "WEAPON_STINGER"
		elseif hash == "1119849093" then return "WEAPON_MINIGUN"
		elseif hash == "2481070269" then return "WEAPON_GRENADE"
		elseif hash == "741814745" then return "WEAPON_STICKYBOMB"
		elseif hash == "4256991824" then return "WEAPON_SMOKEGRENADE"
		elseif hash == "2694266206" then return "WEAPON_BZGAS"
		elseif hash == "615608432" then return "WEAPON_MOLOTOV"
		elseif hash == "101631238" then return "WEAPON_FIREEXTINGUISHER"
		elseif hash == "883325847" then return "WEAPON_PETROLCAN"
		elseif hash == "4256881901" then return "WEAPON_DIGISCANNER"
		elseif hash == "2294779575" then return "WEAPON_BRIEFCASE"
		elseif hash == "28811031" then return "WEAPON_BRIEFCASE_02"
		elseif hash == "600439132" then return "WEAPON_BALL"
		elseif hash == "1233104067" then return "WEAPON_FLARE"
		elseif hash == "3204302209" then return "WEAPON_VEHICLE_ROCKET"
		elseif hash == "1223143800" then return "WEAPON_BARBED_WIRE"
		elseif hash == "4284007675" then return "WEAPON_DROWNING"
		elseif hash == "1936677264" then return "WEAPON_DROWNING_IN_VEHICLE"
		elseif hash == "539292904" then return "WEAPON_EXPLOSION"
		elseif hash == "3452007600" then return "WEAPON_FALL"
		elseif hash == "910830060" then return "WEAPON_EXHAUSTION"
		elseif hash == "3425972830" then return "WEAPON_HIT_BY_WATER_CANNON"
		elseif hash == "133987706" then return "WEAPON_RAMMED_BY_CAR"
		elseif hash == "2339582971" then return "WEAPON_BLEEDING"
		elseif hash == "2741846334" then return "WEAPON_RUN_OVER_BY_CAR"
		elseif hash == "341774354" then return "WEAPON_HELI_CRASH"
		elseif hash == "3750660587" then return "WEAPON_FIRE"
		elseif hash == "2461879995" then return "WEAPON_ELECTRIC_FENCE"
		elseif hash == "3218215474" then return "WEAPON_SNSPISTOL"
		elseif hash == "4192643659" then return "WEAPON_BOTTLE"
		elseif hash == "1627465347" then return "WEAPON_GUSENBERG"
		elseif hash == "3231910285" then return "WEAPON_SPECIALCARBINE"
		elseif hash == "3523564046" then return "WEAPON_HEAVYPISTOL"
		elseif hash == "2132975508" then return "WEAPON_BULLPUPRIFLE"
		elseif hash == "2460120199" then return "WEAPON_DAGGER"
		elseif hash == "137902532" then return "WEAPON_VINTAGEPISTOL"
		elseif hash == "2138347493" then return "WEAPON_FIREWORK"
		elseif hash == "2828843422" then return "WEAPON_MUSKET"
		elseif hash == "984333226" then return "WEAPON_HEAVYSHOTGUN"
		elseif hash == "3342088282" then return "WEAPON_MARKSMANRIFLE"
		elseif hash == "1672152130" then return "WEAPON_HOMINGLAUNCHER"
		elseif hash == "2874559379" then return "WEAPON_PROXMINE"
		elseif hash == "126349499" then return "WEAPON_SNOWBALL"
		elseif hash == "1198879012" then return "WEAPON_FLAREGUN"
		elseif hash == "3794977420" then return "WEAPON_GARBAGEBAG"
		elseif hash == "3494679629" then return "WEAPON_HANDCUFFS"
		elseif hash == "171789620" then return "WEAPON_COMBATPDW"
		elseif hash == "3696079510" then return "WEAPON_MARKSMANPISTOL"
		elseif hash == "3638508604" then return "WEAPON_KNUCKLE"
		elseif hash == "4191993645" then return "WEAPON_HATCHET"
		elseif hash == "1834241177" then return "WEAPON_RAILGUN"
		elseif hash == "3713923289" then return "WEAPON_MACHETE"
		elseif hash == "3675956304" then return "WEAPON_MACHINEPISTOL"
		elseif hash == "738733437" then return "WEAPON_AIR_DEFENCE_GUN"
		elseif hash == "3756226112" then return "WEAPON_SWITCHBLADE"
		elseif hash == "3249783761" then return "WEAPON_REVOLVER"
		elseif hash == "4019527611" then return "WEAPON_DBSHOTGUN"
		elseif hash == "1649403952" then return "WEAPON_COMPACTRIFLE"
		elseif hash == "317205821" then return "WEAPON_AUTOSHOTGUN"
		elseif hash == "3441901897" then return "WEAPON_BATTLEAXE"
		elseif hash == "125959754" then return "WEAPON_COMPACTLAUNCHER"
		elseif hash == "3173288789" then return "WEAPON_MINISMG"
		elseif hash == "3125143736" then return "WEAPON_PIPEBOMB"
		elseif hash == "2484171525" then return "WEAPON_POOLCUE"
		elseif hash == "419712736" then return "WEAPON_WRENCH"
		else return "<ARMA DESCONHECIDA - "..hash..">" end
	elseif hash then
		return "<ARMA DESCONHECIDA - "..hash..">"
	else
		return "SUICIDIO"
	end
end

AddEventHandler("gameEventTriggered",function(event,args)
    if event == "CEventNetworkEntityDamage" then
        local data = { victim = args[1], attacker = args[2], weapon = args[7] }
        if IsEntityAPed(data.victim) then
            local ped = PlayerPedId()
            if data.victim == ped then
                local killerSource = -1
                if GetEntityHealth(ped) <= 101 and not alreadyDead then
					if DoesEntityExist(data.attacker) and IsPedAPlayer(data.attacker) and data.attacker ~= data.victim then
						killerSource = GetPlayerServerId(NetworkGetPlayerIndexFromPed(data.attacker))
					end
                    alreadyDead = true
					TriggerServerEvent("logplayerDied",killerSource,getWeaponHashName(tostring(data.weapon)))
					CreateThread(function()
						while alreadyDead do
							if GetEntityHealth(ped) > 102 then
								alreadyDead = false
							end
							Wait(4)
						end
					end)
                end
            end
        end
    end
end)
------------------------------------------------------------------------------------------------------------------------
-- FPS ON & OFF 
------------------------------------------------------------------------------------------------------------------------
RegisterCommand("fps",function(source,args)
    if args[1] == "on" then
        SetTimecycleModifier("cinema")
        TriggerEvent("Notify","sucesso","Boost de fps ligado!",2000)
    elseif args[1] == "off" then
        SetTimecycleModifier("default")
        TriggerEvent("Notify","sucesso","Boost de fps desligado!",2000)
    end
end)
------------------------------------------------------------------------------------------------------------------------
-- CRUISER
------------------------------------------------------------------------------------------------------------------------
RegisterCommand("cruiser",function(source,args)
	local ped = PlayerPedId()
	local veh = GetVehiclePedIsUsing(ped)
	local maxspeed = GetVehicleMaxSpeed(GetEntityModel(veh))
	local vehspeed = GetEntitySpeed(veh) * 2.236936
	if GetPedInVehicleSeat(veh,-1) == ped and math.ceil(vehspeed) >= 5 and not IsEntityInAir(veh) then
		if args[1] == nil then
			SetEntityMaxSpeed(veh,maxspeed)
			TriggerEvent("Notify","sucesso","Controle de cruzeiro desativado.",3000)
		else
			SetEntityMaxSpeed(veh,0.45*args[1]-0.45)
			TriggerEvent("Notify","sucesso","Controle de cruzeiro ativado.",3000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TELEPORT
-----------------------------------------------------------------------------------------------------------------------------------------
local teleport = {
	{ 338.65,-583.87,74.17,330.34,-601.22,43.29,"DESCER" },  ----hospital parte do heli
	{ 330.34,-601.22,43.29,338.65,-583.87,74.17,"SUBIR" },

	{ 332.26,-595.6,43.29,359.55,-584.95,28.82,"DESCER" },  ---- hospital subir da rua pro hp
	{ 359.55,-584.95,28.82,332.26,-595.6,43.29,"SUBIR" },

	{ 253.96,225.2,101.88,252.3,220.23,101.69,"ENTRAR" },
	{ 252.3,220.23,101.69,253.96,225.2,101.88,"SAIR" },

	{ 4.58,-705.95,45.98,-139.85,-627.0,168.83,"ENTRAR" },
	{ -139.85,-627.0,168.83,4.58,-705.95,45.98,"SAIR" },

	{ -117.29,-604.52,36.29,-74.48,-820.8,243.39,"ENTRAR" },
	{ -74.48,-820.8,243.39,-117.29,-604.52,36.29,"SAIR" },

	{ -826.9,-699.89,28.06,-1575.14,-569.15,108.53,"ENTRAR" },
	{ -1575.14,-569.15,108.53,-826.9,-699.89,28.06,"SAIR" },

	{ -935.68,-378.77,38.97,-1386.84,-478.56,72.05,"ENTRAR" },
	{ -1386.84,-478.56,72.05,-935.68,-378.77,38.97,"SAIR" },

	{ -741.07,5593.13,41.66,446.19,5568.79,781.19,"SUBIR" },
	{ 446.19,5568.79,781.19,-741.07,5593.13,41.66,"DESCER" },

	{ -740.78,5597.04,41.66,446.37,5575.02,781.19,"SUBIR" },
	{ 446.37,5575.02,781.19,-740.78,5597.04,41.66,"DESCER" },

	{ 40.69,3715.73,39.68,28.1,3711.62,13.6,"ENTRAR" }, -- META
	{ 28.1,3711.62,13.6,40.69,3715.73,39.68,"SAIR" },

	{ 241.14,-1378.93,33.75,275.8,-1361.48,24.54,"ENTRAR" },
	{ 275.8,-1361.48,24.54,241.14,-1378.93,33.75,"SAIR" },

	{ 232.89,-411.39,48.12,224.63,-360.7,-98.78,"ENTRAR" },
	{ 224.63,-360.7,-98.78,232.89,-411.39,48.12,"SAIR" },

	{ -71.0,-801.07,44.23,-72.09,-808.11,324.02,"ENTRAR" }, -- Mazebank
	{ -72.09,-808.11,324.02,-71.0,-801.07,44.23,"SAIR" },

	{ 97.48,-1293.61,29.33,1138.82,-3198.88,-39.66,"ENTRAR" },  ----- lavagem
	{ 1138.82,-3198.88,-39.66,97.48,-1293.61,29.33,"SAIR" },

	{ 967.4,7.49,81.16,964.98,58.48,112.56,"ENTRAR" },  ------CASSINO
	{ 964.98,58.48,112.56,967.4,7.49,81.16,"SAIR"},

	{ 850.93,1823.49,148.31,852.43,1821.4,148.52,"ENTRAR" },  ------CASSINO
	{ 852.43,1821.4,148.52,850.43,1823.4,148.52,"SAIR"},

	{ 234.33,-387.57,-98.78,244.34,-429.14,-98.78,"ENTRAR" },
	{ 244.34,-429.14,-98.78,234.33,-387.57,-98.78,"SAIR" },

	{ -419.0,-344.73,24.24,-436.09,-359.74,34.95,"ENTRAR" },
	{ -436.09,-359.74,34.95,-419.0,-344.73,24.24,"SAIR" },
}

CreateThread(function()
	while true do
		local timeDistance = 999
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped,false) then
			local coords = GetEntityCoords(ped)
			for k,v in pairs(teleport) do
				local distance = #(coords - vector3(v[1],v[2],v[3]))
				if distance <= 1.5 then
					timeDistance = 1
					DrawBase3D(v[1],v[2],v[3],"elevator")
					if IsControlJustPressed(1,38) then
						DoScreenFadeOut(1000)
						Wait(1200)
						SetEntityCoords(ped,v[4],v[5],v[6],false,false,false,false)
						Wait(1200)
						DoScreenFadeIn(1000)
					end
				end
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ILHA
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
    while true do
        local timeDistance = 500
        if IsPauseMenuActive() then
            timeDistance = 1
            SetRadarAsExteriorThisFrame()
            SetRadarAsInteriorThisFrame("h4_fake_islandx",4700.0,-5145.0,0,0)
        end
        Wait(timeDistance)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DRIFT
-----------------------------------------------------------------------------------------------------------------------------------------
local blockedVehs = Config.Geral['driftBlocked']

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(PlayerPedId(),false)
        local timeDistance = 1000
        if IsPedInAnyVehicle(ped,false) then
            local speed = GetEntitySpeed(vehicle)*2.236936
            if GetPedInVehicleSeat(vehicle,-1) == ped and not blockedVehs[GetEntityModel(vehicle)] then
                if speed <= 100.0 then
                    timeDistance = 50
                    if IsControlPressed(1,21) then
                        SetVehicleReduceGrip(vehicle,true)
                    else
                        SetVehicleReduceGrip(vehicle,false)
                    end
                end
            end
        end
        Wait(timeDistance)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TOWPLAYER
-----------------------------------------------------------------------------------------------------------------------------------------
local tow = nil
local towed = nil

function PlvRP.towPlayer()
	local vehicle = GetPlayersLastVehicle()
	if IsVehicleModel(vehicle,GetHashKey("flatbed")) and not IsPedInAnyVehicle(PlayerPedId(),false) then
		towed = vRP.getNearVehicle(11)
		if DoesEntityExist(vehicle) and DoesEntityExist(towed) then
			if tow then
				PlayerServer.tryTow(VehToNet(vehicle),VehToNet(tow),"out")
				towed = nil
				tow = nil
			else
				if vehicle ~= towed then

					PlayerServer.tryTow(VehToNet(vehicle),VehToNet(towed),"in")
					tow = towed
				end
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYNCTOW
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_towdriver:syncTow")
AddEventHandler("vrp_towdriver:syncTow",function(vehid01,vehid02,mod)
	if NetworkDoesNetworkIdExist(vehid01) and NetworkDoesNetworkIdExist(vehid02) then
		local vehicle = NetToEnt(vehid01)
		towed = NetToEnt(vehid02)
		if DoesEntityExist(vehicle) and DoesEntityExist(towed) then
			if mod == "in" then
				local min,max = GetModelDimensions(GetEntityModel(towed))
				AttachEntityToEntity(towed,vehicle,GetEntityBoneIndexByName(vehicle,"bodyshell"),0,-2.2,0.4-min.z,0,0,0,true,true,false,true,0,true)
			elseif mod == "out" then
				AttachEntityToEntity(towed,vehicle,20,-0.5,-10.0,-0.2,0.0,0.0,0.0,false,false,true,false,20,true)
				DetachEntity(towed,false,false)
				SetVehicleOnGroundProperly(towed)
			end
		end
	end
end)

RegisterNetEvent("towdriver:invokeTow")
AddEventHandler("towdriver:invokeTow",function()
	ExecuteCommand("tow")
end)