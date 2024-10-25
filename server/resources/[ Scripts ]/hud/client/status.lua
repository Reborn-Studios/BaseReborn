local lastHealth = nil
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1250)
        local playerPed = playerPed
        local health = GetEntityHealth(playerPed)
        if lastHealth ~= health then
            updateHealthStatus()
            lastHealth = health
        end
        SetRadarZoom(1100)
        SetBigmapActive(false, false)
    end
end)

RegisterNUICallback('ResetHudPositions', function()
    TriggerServerEvent('hud:UpdateData', "positionsData", {})
end)

RegisterNUICallback('hudselected', function(data)
    local hudtype = data.type
    local defaultAspectRatio = 1920/1080 -- Don't change this.
    local resolutionX, resolutionY = GetActiveScreenResolution()
    local aspectRatio = resolutionX/resolutionY
    local minimapOffset = 0
    if aspectRatio > defaultAspectRatio then
        minimapOffset = ((defaultAspectRatio-aspectRatio)/3.6)-0.008
    end
    TriggerServerEvent('hud:UpdateData', data.settingstype, data.val)
    if data.settingstype == "hud" then

        if data.val == "radial" then
            local playerPed = playerPed
            local armour = GetPedArmour(playerPed)
            SendNUIMessage({
                type = "armour_update",
                armour = armour,
            })   
            updateHealthStatus()
            SendNUIMessage({
                type = "set_status",
                statustype = "health",
                value = val,
            })
        end
    end
end)