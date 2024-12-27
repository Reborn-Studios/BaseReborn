local Tunnel = module("vrp","lib/Tunnel")
Server = Tunnel.getInterface("protect")

RegisterNUICallback("loadNuis", function(data, cb)
	Server.pegaTrouxa()
end)

--------------------------- ANTI CL ----------------------------------
Config = {}
Config.DrawingTime = 60*1000                        -- 1 MINUTO
Config.TextColor = { r = 255, g = 255, b = 255 }    -- BRANCO
Config.AlertTextColor = { r = 255, g = 0, b = 0 }   -- VERMELHO

local show3DText = false

RegisterNetEvent("pixel_antiCL:show")
AddEventHandler("pixel_antiCL:show", function()
    if show3DText then
        show3DText = false
    else
        show3DText = true
    end
end)

RegisterNetEvent("pixel_anticl")
AddEventHandler("pixel_anticl", function(id, crds, identifier, reason)
    Display(id, crds, identifier, reason)
end)

function Display(id, crds, identifier, reason)
    local displaying = true

    CreateThread(function()
        Wait(Config.DrawingTime)
        displaying = false
    end)

    CreateThread(function()
        while displaying do
            Wait(5)
            local pcoords = GetEntityCoords(PlayerPedId())
            if GetDistanceBetweenCoords(crds.x, crds.y, crds.z, pcoords.x, pcoords.y, pcoords.z, true) < 15.0 and show3DText then
                DrawText3DSecond(crds.x, crds.y, crds.z+0.15, "Player saiu do jogo")
                DrawText3D(crds.x, crds.y, crds.z, "ID: "..identifier.." \nMotivo: "..reason)
            else
                Wait(2000)
            end
        end
    end)
end

function DrawText3DSecond(x,y,z, text)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    SetTextScale(0.45, 0.45)
    SetTextFont(4)
    SetTextProportional(true)
    SetTextColour(Config.AlertTextColor.r, Config.AlertTextColor.g, Config.AlertTextColor.b, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    DrawText(_x,_y)
end

function DrawText3D(x,y,z, text)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    SetTextScale(0.45, 0.45)
    SetTextFont(4)
    SetTextProportional(true)
    SetTextColour(Config.TextColor.r, Config.TextColor.g, Config.TextColor.b, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    DrawText(_x,_y)
end
