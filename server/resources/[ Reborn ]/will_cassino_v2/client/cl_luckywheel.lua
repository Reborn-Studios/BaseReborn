local _wheel = nil
local _lambo = nil
local _isShowCar = false
local _wheelPos = vector3(950.14,43.0,71.64)
local _baseWheelPos = vector3(949.98,45.61,71.04)

local casinoprops = {}

local Keys = {
    ["ESC"] = 322, ["BACKSPACE"] = 177, ["E"] = 38, ["ENTER"] = 18, ["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173
}

local _isRolling = false

Citizen.CreateThread(function()
    local model = GetHashKey('vw_prop_vw_luckywheel_02a')
    Citizen.CreateThread(function()
        RequestModel(model)

        while not HasModelLoaded(model) do
            Citizen.Wait(0)
        end
        _wheel = CreateObject(model, 949.64,45.01,70.96, false, false, true)
        SetEntityHeading(_wheel, 328.34)
        SetModelAsNoLongerNeeded(model)
        table.insert(casinoprops, _wheel)
    end)
end)

Citizen.CreateThread(function()
    while true do
        local castle = 500
        if _lambo ~= nil then
            castle = 5
            local _heading = GetEntityHeading(_lambo)
            local _z = _heading - 0.3
            SetEntityHeading(_lambo, _z)
        end
        Citizen.Wait(castle)
    end
end)

RegisterNetEvent("luckywheel:doRoll")
AddEventHandler("luckywheel:doRoll", function(_priceIndex)
    _isRolling = true
    if _wheel and DoesEntityExist(_wheel) then
        SetEntityHeading(_wheel, 328.34)
        SendNUIMessage({ action = "playAudio", transactionFile = "roleta" })
        Citizen.CreateThread(function()
            local speedIntCnt = 1
            local rollspeed = 1.0
            local _winAngle =  math.random(1,100)
            local _rollAngle = _winAngle + (360 * 8)
            local _midLength = (_rollAngle / 2)
            local intCnt = 0
            while speedIntCnt > 0 do
                local retval = GetEntityRotation(_wheel, 1)
                if _rollAngle > _midLength then
                    speedIntCnt = speedIntCnt + 1
                else
                    speedIntCnt = speedIntCnt - 1
                    if speedIntCnt < 0 then
                        speedIntCnt = 0
                        
                    end
                end
                intCnt = intCnt + 1
                rollspeed = speedIntCnt / 10
                local _y = retval.y - rollspeed
                _rollAngle = _rollAngle - rollspeed
                if _rollAngle < 5.0 then
                    if _y > _winAngle then
                        _y = _winAngle
                    end
                end
                SetEntityRotation(_wheel, 0.0, _y, 328.34, 2, true)
                Citizen.Wait(0)
            end
            local rotation = (tonumber(_priceIndex) * 10) / 10
            SetEntityRotation(_wheel, 0.0, rotation, 328.34, 2, true)
        end)
    end
end)

--[[ RegisterCommand("setwheel",function(source,args)
    if args[1] then
    SetEntityHeading(_wheel, 328.34)
    local rotation = (tonumber(args[1]) * 10) / 10
        SetEntityRotation(_wheel, 0.0, rotation, 328.34, 2, true)
    end
end) ]]

RegisterNetEvent("luckywheel:rollFinished")
AddEventHandler("luckywheel:rollFinished", function()
    _isRolling = false
end)

function doRoll()
    if not _isRolling then
        _isRolling = true
        local playerPed = PlayerPedId()
        local _lib = 'anim_casino_a@amb@casino@games@lucky7wheel@female'
        if IsPedMale(playerPed) then
            _lib = 'anim_casino_a@amb@casino@games@lucky7wheel@male'
        end
        local lib, anim = _lib, 'enter_right_to_baseidle'
        RequestAnimDict(lib)
        local _movePos = vector3(949.0,44.76,71.64)
        TaskGoStraightToCoord(playerPed, _movePos.x, _movePos.y, _movePos.z, 1.0, -1, 34.52, 0.0)
        local _isMoved = false
        while not _isMoved do
            local coords = GetEntityCoords(PlayerPedId())
            if coords.x >= (_movePos.x - 0.01) and coords.x <= (_movePos.x + 0.01) and coords.y >= (_movePos.y - 0.01) and coords.y <= (_movePos.y + 0.01) then
                _isMoved = true
            end
            Citizen.Wait(0)
        end
        TaskPlayAnim(playerPed, lib, anim, 8.0, -8.0, -1, 0, 0, false, false, false)
        while IsEntityPlayingAnim(playerPed, lib, anim, 3) do
            Citizen.Wait(0)
            DisableAllControlActions(0)
        end
        TaskPlayAnim(playerPed, lib, 'enter_to_armraisedidle', 8.0, -8.0, -1, 0, 0, false, false, false)
        while IsEntityPlayingAnim(playerPed, lib, 'enter_to_armraisedidle', 3) do
            Citizen.Wait(0)
            DisableAllControlActions(0)
        end
        TriggerServerEvent("luckywheel:getLucky")
        TaskPlayAnim(playerPed, lib, 'armraisedidle_to_spinningidle_high', 8.0, -8.0, -1, 0, 0, false, false, false)
    end
end

-- Menu Controls
Citizen.CreateThread(function()
    while true do
        local castle = 500
        local coords = GetEntityCoords(PlayerPedId())
        if (GetDistanceBetweenCoords(coords, _wheelPos.x, _wheelPos.y, _wheelPos.z, true) < 1.5) and not _isRolling then
            castle = 4
            DrawText3D(_wheelPos[1], _wheelPos[2], _wheelPos[3],"~g~E~w~ PARA RODAR A ROLETA")
            if IsControlJustReleased(0, Keys['E']) then
                doRoll()
            end
        end
        Citizen.Wait(castle)
    end
end)

AddEventHandler('onResourceStop', function(resource)
	if resource == GetCurrentResourceName() then
		for _,wheel in pairs(casinoprops) do
            DeleteEntity(_wheel)
            DeleteEntity(_basewheel)
            DeleteEntity(_lambo)
        end
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- DRAWTEXT3D
-----------------------------------------------------------------------------------------------------------------------------------------
function DrawText3D(x,y,z,text)
	local onScreen,_x,_y = World3dToScreen2d(x,y,z)
	SetTextFont(4)
	SetTextScale(0.3,0.3)
	SetTextColour(255,255,255,100)
	SetTextEntry("STRING")
	SetTextCentre(1)
	AddTextComponentString(text)
	DrawText(_x,_y)
	local factor = (string.len(text)) / 450
	DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,100)
end