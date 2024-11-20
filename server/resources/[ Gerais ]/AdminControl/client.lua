Client = {}
Tunnel.bindInterface("AdminControl",Client)
ServerControl = Tunnel.getInterface("AdminControl")

function Client.openMainMenu()
    lib.registerMenu({
        id = 'admin_menu_control',
        title = 'Controle de configurações',
        position = 'top-right',
        options = {
            {label = 'Elevadores', description = 'Criar elevador'},
            {label = 'Garagens', description = 'Criar garagem'},
            {label = 'NPCS', description = 'Criar Npcs'},
            {label = 'Safezones', description = 'Criar Safezones'},
            {label = 'Baus', description = 'Criar Baus'},
        }
    }, function(selected, scrollIndex, args)
        if selected == 1 then
            ExecuteCommand(Config.Commands["elevators"]['command'])
        elseif selected == 2 then
            ExecuteCommand(Config.Commands["garages"]['command'])
        elseif selected == 3 then
            ExecuteCommand(Config.Commands["peds"]['command'])
        elseif selected == 4 then
            ExecuteCommand(Config.Commands["safezones"]['command'])
        elseif selected == 5 then
            ExecuteCommand(Config.Commands["stashes"]['command'])
        end
    end)
    lib.showMenu('admin_menu_control')
end

local function getCoordsFromCam(distance,coords)
	local rotation = GetGameplayCamRot()
	local adjustedRotation = vector3((math.pi / 180) * rotation["x"],(math.pi / 180) * rotation["y"],(math.pi / 180) * rotation["z"])
	local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.sin(adjustedRotation[1]))
	return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end

function GetCamCoords()
    local cam = GetGameplayCamCoord()
    local camCds = getCoordsFromCam(20.0,cam)
    local handle = StartExpensiveSynchronousShapeTestLosProbe(cam.x,cam.y,cam.z,camCds.x,camCds.y,camCds.z,-1,PlayerPedId(),4)
    local _,hit,coords = GetShapeTestResult(handle)
    return hit,coords
end

function GetBlipCoords()
    local isAdding = true
    repeat
        DisablePlayerFiring(PlayerId(), true)
        DisableControlAction(0, 25, true)
        DrawLocalText("~g~MOUSE LEFT~w~  COLOCAR",0.015,0.56)
        DrawLocalText("~r~MOUSE RIGHT~w~  CANCELAR",0.015,0.59)
        local hit,coords = GetCamCoords()
        if hit then
            DrawMarker(27, coords.x, coords.y, coords.z + 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.7, 0.7, 0.7, 25, 42, 255, 100, false, false, 0, true)
            if IsDisabledControlJustPressed(0, 24) then
                isAdding = false
			    local retval,cdz = GetGroundZFor_3dCoord(coords.x, coords.y, coords.z)
                if retval then
                    return vector3(coords.x,coords.y,cdz + 1.0)
                else
                    return vector3(coords.x,coords.y,coords.z + 1.0)
                end
            end
        end
        if IsDisabledControlJustPressed(0, 25) then
            isAdding = false
        end
        Wait(0)
    until not isAdding
end

function DrawLocalText(text,x,y)
	SetTextFont(4)
	SetTextScale(0.38,0.38)
	SetTextColour(255,255,255,255)
	SetTextOutline()
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end
