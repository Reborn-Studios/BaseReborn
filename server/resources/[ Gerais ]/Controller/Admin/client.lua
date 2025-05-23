-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
Tunnel = module("vrp","lib/Tunnel") or {}
Proxy = module("vrp","lib/Proxy") or {}
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
AdminClient = {}
Tunnel.bindInterface("Admin",AdminClient)
AdmSERVER = Tunnel.getInterface("Admin")
-----------------------------------------------------------------------------------------------------------------------------------------
-- TELEPORTWAY
-----------------------------------------------------------------------------------------------------------------------------------------
function AdminClient.teleportWay()
	local ped = PlayerPedId()
	local veh = GetVehiclePedIsUsing(ped)
	if IsPedInAnyVehicle(ped,false) then
		ped = veh
    end

	local waypointBlip = GetFirstBlipInfoId(8)
	local x,y,z = table.unpack(GetBlipInfoIdCoord(waypointBlip,Citizen.ResultAsVector()))

	local ground
	local groundFound = false
	local groundCheckHeights = { 0.0,50.0,100.0,150.0,200.0,250.0,300.0,350.0,400.0,450.0,500.0,550.0,600.0,650.0,700.0,750.0,800.0,850.0,900.0,950.0,1000.0,1050.0,1100.0 }

	for i,height in ipairs(groundCheckHeights) do
		SetEntityCoordsNoOffset(ped,x,y,height,false,false,true)
		RequestCollisionAtCoord(x,y,z)
		while not HasCollisionLoadedAroundEntity(ped) do
			Wait(10)
		end
		Wait(20)
		ground,z = GetGroundZFor_3dCoord(x,y,height,false)
		if ground then
			z = z + 1.0
			groundFound = true
			break
		end
	end

	if not groundFound then
		z = 1200
		GiveDelayedWeaponToPed(ped,0xFBAB5776,1,false)
	end

	RequestCollisionAtCoord(x,y,z)
	while not HasCollisionLoadedAroundEntity(ped) do
		Wait(10)
	end
	SetEntityCoordsNoOffset(ped,x,y,z,false,false,true)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- LIMBO
-----------------------------------------------------------------------------------------------------------------------------------------
function AdminClient.teleportLimbo()
	local ped = PlayerPedId()
	local x,y,z = table.unpack(GetEntityCoords(ped))
	local _,vector = GetNthClosestVehicleNode(x,y,z,math.random(5,10),0,0,0)
	local x2,y2,z2 = table.unpack(vector)
	SetEntityCoordsNoOffset(ped,x2,y2,z2+5,false,false,true)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DELETENPCS
-----------------------------------------------------------------------------------------------------------------------------------------
function AdminClient.deleteNpcs(nDist)
	local handle,ped = FindFirstPed()
	local finished = false
	repeat
		local coords = GetEntityCoords(ped)
		local coordsPed = GetEntityCoords(PlayerPedId())
		local distance = #(coords - coordsPed)
        local pDist = nDist or 10.0
		if IsPedDeadOrDying(ped,false) and not IsPedAPlayer(ped) and distance < pDist then
			TriggerServerEvent("tryDeleteEntity",PedToNet(ped))
			finished = true
		end
		finished,ped = FindNextPed(handle)
	until not finished
	EndFindPed(handle)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SPECMODE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("SpecMode")
AddEventHandler("SpecMode", function(nsource)
    local nped = GetPlayerPed(GetPlayerFromServerId(nsource))
    if not NetworkIsInSpectatorMode() and nsource then
        NetworkSetInSpectatorModeExtended(true,nped,true)
        TriggerEvent("Notify", "sucesso", "Você entrou no modo espectador.",4000)
    else
        TriggerEvent("rsh:ExcecaoSpec", false)
        NetworkSetInSpectatorModeExtended(false,nped,true)
        TriggerEvent("Notify", "negado", "Você saiu do modo espectador.",4000)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- NOCLIP
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("nc",function(source,args,rawCommand)
	AdmSERVER.enablaNoclip()
end)
RegisterKeyMapping("nc","Admin: Noclip","keyboard","o")
-----------------------------------------------------------------------------------------------------------------------------------------
-- TUNING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vehtuning")
AddEventHandler("vehtuning",function()
	local ped = PlayerPedId()
	local vehicle = GetVehiclePedIsIn(ped,false)
	if IsEntityAVehicle(vehicle) then
		SetVehicleModKit(vehicle,0)
		SetVehicleMod(vehicle,0,GetNumVehicleMods(vehicle,0)-1,false)
		SetVehicleMod(vehicle,1,GetNumVehicleMods(vehicle,1)-1,false)
		SetVehicleMod(vehicle,2,GetNumVehicleMods(vehicle,2)-1,false)
		SetVehicleMod(vehicle,3,GetNumVehicleMods(vehicle,3)-1,false)
		SetVehicleMod(vehicle,4,GetNumVehicleMods(vehicle,4)-1,false)
		SetVehicleMod(vehicle,5,GetNumVehicleMods(vehicle,5)-1,false)
		SetVehicleMod(vehicle,6,GetNumVehicleMods(vehicle,6)-1,false)
		SetVehicleMod(vehicle,7,GetNumVehicleMods(vehicle,7)-1,false)
		SetVehicleMod(vehicle,8,GetNumVehicleMods(vehicle,8)-1,false)
		SetVehicleMod(vehicle,9,GetNumVehicleMods(vehicle,9)-1,false)
		SetVehicleMod(vehicle,10,GetNumVehicleMods(vehicle,10)-1,false)
		SetVehicleMod(vehicle,11,GetNumVehicleMods(vehicle,11)-1,false)
		SetVehicleMod(vehicle,12,GetNumVehicleMods(vehicle,12)-1,false)
		SetVehicleMod(vehicle,13,GetNumVehicleMods(vehicle,13)-1,false)
		SetVehicleMod(vehicle,14,16,false)
		SetVehicleMod(vehicle,15,GetNumVehicleMods(vehicle,15)-2,false)
		SetVehicleMod(vehicle,16,GetNumVehicleMods(vehicle,16)-1,false)
		ToggleVehicleMod(vehicle,17,true)
		ToggleVehicleMod(vehicle,18,true)
		ToggleVehicleMod(vehicle,19,true)
		ToggleVehicleMod(vehicle,20,true)
		ToggleVehicleMod(vehicle,21,true)
		ToggleVehicleMod(vehicle,22,true)
		SetVehicleMod(vehicle,24,1,false)
		SetVehicleMod(vehicle,25,GetNumVehicleMods(vehicle,25)-1,false)
		SetVehicleMod(vehicle,27,GetNumVehicleMods(vehicle,27)-1,false)
		SetVehicleMod(vehicle,28,GetNumVehicleMods(vehicle,28)-1,false)
		SetVehicleMod(vehicle,30,GetNumVehicleMods(vehicle,30)-1,false)
		SetVehicleMod(vehicle,34,GetNumVehicleMods(vehicle,34)-1,false)
		SetVehicleMod(vehicle,35,GetNumVehicleMods(vehicle,35)-1,false)
		SetVehicleMod(vehicle,38,GetNumVehicleMods(vehicle,38)-1,true)
        SetVehicleWindowTint(vehicle,1)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEBUG
-----------------------------------------------------------------------------------------------------------------------------------------
local dickheaddebug = false

RegisterNetEvent("ToggleDebug")
AddEventHandler("ToggleDebug",function()
	dickheaddebug = not dickheaddebug
    if dickheaddebug then
        TriggerEvent('chatMessage',"DEBUG",{255,70,50},"ON")
        DebugOn()
    else
        TriggerEvent('chatMessage',"DEBUG",{255,70,50},"OFF")
    end
end)

local function canPedBeUsed(ped)
    if ped == nil then return false end
    if ped == GetPlayerPed(-1) then return false end
    if not DoesEntityExist(ped) then return false end
    return true
end

local function getVehicle()
    local playerped = GetPlayerPed(-1)
    local playerCoords = GetEntityCoords(playerped)
    local handle, ped = FindFirstVehicle()
    local success
    local rped = nil
    local distanceFrom
    repeat
        local pos = GetEntityCoords(ped)
        local distance = GetDistanceBetweenCoords(playerCoords.x,playerCoords.y,playerCoords.z,pos.x,pos.y,pos.z,true)
        if canPedBeUsed(ped) and distance < 30.0 and (distanceFrom == nil or distance < distanceFrom) then
            distanceFrom = distance
            rped = ped
	    	if IsEntityTouchingEntity(GetPlayerPed(-1), ped) then
	    		DrawText3Ds(pos["x"],pos["y"],pos["z"]+1, "Veh: " .. ped .. " Model: " .. GetEntityModel(ped) .. " IN CONTACT" )
	    	else
	    		DrawText3Ds(pos["x"],pos["y"],pos["z"]+1, "Veh: " .. ped .. " Model: " .. GetEntityModel(ped) .. "" )
	    	end
        end
        success, ped = FindNextVehicle(handle)
    until not success
    EndFindVehicle(handle)
    return rped
end

local function getObject()
    local playerped = GetPlayerPed(-1)
    local playerCoords = GetEntityCoords(playerped)
    local handle, ped = FindFirstObject()
    local success
    local rped = nil
    repeat
        local pos = GetEntityCoords(ped)
        local distance = GetDistanceBetweenCoords(playerCoords.x,playerCoords.y,playerCoords.z,pos.x,pos.y,pos.z,true)
        if distance < 10.0 then
            rped = ped
	    	if IsEntityTouchingEntity(GetPlayerPed(-1), ped) then
	    		DrawText3Ds(pos["x"],pos["y"],pos["z"]+1, "Obj: " .. ped .. " Model: " .. GetEntityModel(ped) .. " IN CONTACT" )
	    	else
	    		DrawText3Ds(pos["x"],pos["y"],pos["z"]+1, "Obj: " .. ped .. " Model: " .. GetEntityModel(ped) .. "" )
	    	end
        end
        success, ped = FindNextObject(handle)
    until not success
    EndFindObject(handle)
    return rped
end

local function getNPC()
    local playerped = GetPlayerPed(-1)
    local playerCoords = GetEntityCoords(playerped)
    local handle, ped = FindFirstPed()
    local success
    local rped = nil
    local distanceFrom
    repeat
        local pos = GetEntityCoords(ped)
        local distance = GetDistanceBetweenCoords(playerCoords.x,playerCoords.y,playerCoords.z,pos.x,pos.y,pos.z,true)
        if canPedBeUsed(ped) and distance < 30.0 and (distanceFrom == nil or distance < distanceFrom) then
            distanceFrom = distance
            rped = ped
	    	if IsEntityTouchingEntity(GetPlayerPed(-1), ped) then
	    		DrawText3Ds(pos["x"],pos["y"],pos["z"], "Ped: " .. ped .. " Model: " .. GetEntityModel(ped) .. " Relationship HASH: " .. GetPedRelationshipGroupHash(ped) .. " IN CONTACT" )
	    	else
	    		DrawText3Ds(pos["x"],pos["y"],pos["z"], "Ped: " .. ped .. " Model: " .. GetEntityModel(ped) .. " Relationship HASH: " .. GetPedRelationshipGroupHash(ped) )
	    	end
        end
        success, ped = FindNextPed(handle)
    until not success
    EndFindPed(handle)
    return rped
end

local function drawTxtS(x,y ,width,height,scale, text, r,g,b,a)
    SetTextFont(0)
    SetTextProportional(false)
    SetTextScale(0.25, 0.25)
    SetTextColour(r, g, b, a)
    SetTextDropShadow()
    SetTextEdge(1, 0, 0, 0, 255)
    SetTextDropShadow()
    SetTextOutline()
    SetTextEntry("STRING")
    AddTextComponentString(text)
    DrawText(x - width/2, y - height/2 + 0.005)
end

function DebugOn()
    CreateThread(function()
        while dickheaddebug do
            Wait(4)
            local pos = GetEntityCoords(GetPlayerPed(-1))
            local forPos = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0, 1.0, 0.0)
            local backPos = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0, -1.0, 0.0)
            local LPos = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 1.0, 0.0, 0.0)
            local RPos = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), -1.0, 0.0, 0.0)
            local forPos2 = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0, 2.0, 0.0)
            local backPos2 = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0, -2.0, 0.0)
            local LPos2 = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 2.0, 0.0, 0.0)
            local RPos2 = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), -2.0, 0.0, 0.0)
            local x, y, z = table.unpack(GetEntityCoords(GetPlayerPed(-1), true))
            local currentStreetHash = GetStreetNameAtCoord(x, y, z)
            local currentStreetName = GetStreetNameFromHashKey(currentStreetHash)

            drawTxtS(0.8, 0.50, 0.4,0.4,0.30, "Heading: " .. GetEntityHeading(GetPlayerPed(-1)), 55, 155, 55, 255)
            drawTxtS(0.8, 0.52, 0.4,0.4,0.30, "Coords: " .. pos, 55, 155, 55, 255)
            drawTxtS(0.8, 0.54, 0.4,0.4,0.30, "Attached Ent: " .. GetEntityAttachedTo(GetPlayerPed(-1)), 55, 155, 55, 255)
            drawTxtS(0.8, 0.56, 0.4,0.4,0.30, "Health: " .. GetEntityHealth(GetPlayerPed(-1)), 55, 155, 55, 255)
            drawTxtS(0.8, 0.58, 0.4,0.4,0.30, "H a G: " .. GetEntityHeightAboveGround(GetPlayerPed(-1)), 55, 155, 55, 255)
            drawTxtS(0.8, 0.60, 0.4,0.4,0.30, "Model: " .. GetEntityModel(GetPlayerPed(-1)), 55, 155, 55, 255)
            drawTxtS(0.8, 0.62, 0.4,0.4,0.30, "Speed: " .. GetEntitySpeed(GetPlayerPed(-1)), 55, 155, 55, 255)
            drawTxtS(0.8, 0.64, 0.4,0.4,0.30, "Frame Time: " .. GetFrameTime(), 55, 155, 55, 255)
            drawTxtS(0.8, 0.66, 0.4,0.4,0.30, "Street: " .. currentStreetName, 55, 155, 55, 255)
            drawTxtS(0.8, 0.68, 0.4,0.4,0.30, "Rotation: " .. GetEntityRotation(GetPlayerPed(-1)), 55, 155, 55, 255)

            DrawLine(pos.x,pos.y,pos.z,forPos.x,forPos.y,forPos.z,255,0,0,115)
            DrawLine(pos.x,pos.y,pos.z,backPos.x,backPos.y,backPos.z,255,0,0,115)
            DrawLine(pos.x,pos.y,pos.z,LPos.x,LPos.y,LPos.z,255,255,0,115)
            DrawLine(pos.x,pos.y,pos.z,RPos.x,RPos.y,RPos.z,255,255,0,115)
            DrawLine(forPos.x,forPos.y,forPos.z,forPos2.x,forPos2.y,forPos2.z,255,0,255,115)
            DrawLine(backPos.x,backPos.y,backPos.z,backPos2.x,backPos2.y,backPos2.z, 255,0,255,115)
            DrawLine(LPos.x,LPos.y,LPos.z,LPos2.x,LPos2.y,LPos2.z, 255,255,255,115)
            DrawLine(RPos.x,RPos.y,RPos.z,RPos2.x,RPos2.y,RPos2.z, 255,255,255,115)

            getNPC()
            getVehicle()
            getObject()
        end
    end)
end

function DrawText3Ds(x,y,z, text)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(true)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    DrawText(_x,_y)
    local factor = (string.len(text)) / 370
    DrawRect(_x,_y+0.0125, 0.015+ factor, 0.03, 41, 11, 41, 68)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONGELAR
-----------------------------------------------------------------------------------------------------------------------------------------
local congelar = false

RegisterNetEvent('Congelar')
AddEventHandler('Congelar',function()
    local ped = PlayerPedId()
    if not congelar then
        congelar = true
        while congelar do
            FreezeEntityPosition(ped, true);
            ShakeGameplayCam("LARGE_EXPLOSION_SHAKE",0.80)
            SetPedToRagdoll(ped,5000,5000,0,false,false,false)
            SetFlash(0,0,500,1000,500)
            TriggerEvent("vrp_hud:toggleHood",ped)
            Citizen.Wait(1000)
        end
    else
        congelar = false
        FreezeEntityPosition(ped, false);
        SetPedComponentVariation(ped,1,0,0,2)
    end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SYNCAREA
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("syncarea")
AddEventHandler("syncarea",function(x,y,z,range)
    ClearAreaOfVehicles(x,y,z,2000.0,false,false,false,false,false)
    ClearAreaOfEverything(x,y,z,2000.0,false,false,false,false)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETCOORDSFROMCAM
-----------------------------------------------------------------------------------------------------------------------------------------
function GetCoordsFromCam(distance,coords)
	local rotation = GetGameplayCamRot(0)
	local adjustedRotation = vector3((math.pi / 180) * rotation["x"],(math.pi / 180) * rotation["y"],(math.pi / 180) * rotation["z"])
	local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.sin(adjustedRotation[1]))

	return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- POSTIT:INITPOSTIT
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("postit:initPostit")
AddEventHandler("postit:initPostit",function()
	if not Active then
		Active = true

		CreateThread(function()
			while true do
				local Ped = PlayerPedId()
				local Camera = GetGameplayCamCoord()
				local CamCoords = GetCoordsFromCam(25.0,Camera)
				local Handler = StartExpensiveSynchronousShapeTestLosProbe(Camera.x,Camera.y,Camera.z,CamCoords.x,CamCoords.y,CamCoords.z,-1,Ped,4)
				local _,_,Coords = GetShapeTestResult(Handler)

				---@diagnostic disable-next-line: missing-parameter
				DrawMarker(28,Coords["x"],Coords["y"],Coords["z"],0.0,0.0,0.0,0.0,0.0,0.0,0.05,0.05,0.05,88,101,242,175,false,false,0,false)

				if IsControlJustPressed(1,38) then
                    vRP.prompt("Cordenadas",mathLegth(Coords["x"])..","..mathLegth(Coords["y"])..","..mathLegth(Coords["z"]))
					Active = false

					break
				end

				Wait(1)
			end
		end)
	end
end)