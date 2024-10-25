local isInSafezone = false
local notified = false
local debugPoly = false      -- Mostrar a area marcada

-- Locais de safezone
local fields = {
    ['Concessionaria'] = {
        minZ = 25.8,
        maxZ = 35.36,
        fieldZone = {
            vector2(-18.84, -1120.58),
            vector2(-72.41, -1122.31),
            vector2(-54.08, -1069.88),
            vector2(-1.57, -1081.62),
        }
    },
    ['Praca'] = {
        minZ = 25.8,
        maxZ = 38.36,
        fieldZone = {
            vector2(122.28, -997.09),
            vector2(182.49, -837.05),
            vector2(266.04,-867.96),
            vector2(211.14, -1027.44),
        }
    },
    ['Hospital'] = {
        minZ = 32.32,
        maxZ = 81.36,
        fieldZone = {
            vector2(-520.22,-353.74),
            vector2(-536.72,-302.99),
            vector2(-449.88,-265.95),
            vector2(-426.91,-289.63),
            vector2(-434.38,-366.44),
        }
    },
}

CreateThread(function()
    Wait(500)
    local safeZones = {}
    for k,v in pairs(fields) do
        safeZones[k] = PolyZone:Create(v.fieldZone, {
            name = "safe_zone_"..k,
            minZ = v.minZ,
            maxZ = v.maxZ,
            debugPoly = debugPoly,
        })
    end
    while true do
        local inSafe = false
        for k,data in pairs(safeZones) do
            inSafe = data:isPointInside(GetEntityCoords(PlayerPedId()))
            if inSafe then
                break
            end
        end
        isInSafezone = inSafe
        LocalPlayer.state.canUseWeapons = not inSafe
        Wait(1000)
    end
end)

CreateThread(function()
    while true do
        local ped = PlayerPedId()
        local timing = 1000
        if isInSafezone then
            timing = 4
            if not notified then
                notified = true
                TriggerEvent("Notify","aviso","Você entrou na SafeZone",3000)
            end
            DisableControlAction(1, 37, true)
            DisableControlAction(0, 37, true)
            DisableControlAction(2, 37, true)
            DisableControlAction(1, 45, true)
            DisableControlAction(2, 80, true)
            DisableControlAction(2, 140, true)
            DisableControlAction(2, 250, true)
            DisableControlAction(2, 263, true)
            DisableControlAction(2, 310, true)
            DisableControlAction(1, 140, true)
            DisableControlAction(1, 141, true)
            DisableControlAction(1, 142, true)
            DisableControlAction(1, 143, true)
            DisableControlAction(0, 24, true)
            DisableControlAction(0, 25, true)
            DisableControlAction(0, 106, true)
            SetCurrentPedWeapon(ped,GetHashKey("WEAPON_UNARMED"),true)
            DisablePlayerFiring(ped,true)
            if not IsPedInAnyVehicle(ped) then
                DisableControlAction(0, 58, true)
                DisableControlAction(0, 47, true)
            end
        elseif notified then
            notified = false
            TriggerEvent("Notify","aviso","Você saiu da SafeZone",3000)
        end
        Wait(timing)
    end
end)
