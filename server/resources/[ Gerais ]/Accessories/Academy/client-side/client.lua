Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")
vRP = Proxy.getInterface("vRP")
vRPS = Tunnel.getInterface("vRP")

local malhando = false

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(AcademyConfig.barraFixa) do
            local x,y,z = table.unpack(mark)
            local pedCoords = GetEntityCoords(PlayerPedId())
            local aparelhos = GetDistanceBetweenCoords(pedCoords.x,pedCoords.y,pedCoords.z,x,y,z,true)
            if not malhando and aparelhos < 1.0 then
                idle = 5
                DrawBase3D(x,y,z,"APERTE ~y~[E] ~w~ PARA FAZER BARRA")
                if IsControlJustPressed(0, 46) then
                    SetEntityHeading(PlayerPedId(),mark.h)
                    SetEntityCoords(PlayerPedId(),x,y,z-1,false,false,false,false)
                    malhando = true
                    if lib.progressBar({
                        duration = 20000,
                        label = 'Malhando...',
                        useWhileDead = false,
                        canCancel = true,
                        anim = {
                            dict = 'amb@prop_human_muscle_chin_ups@male@base',
                            clip = 'base',
                            flag = 1
                        }
                    }) then
                        TriggerServerEvent("Academy:upgradeWeight")
                    end
                    malhando = false
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(AcademyConfig.pegarBarra) do
            local x,y,z = table.unpack(mark)
            local pedCoords = GetEntityCoords(PlayerPedId())
            local aparelhos = GetDistanceBetweenCoords(pedCoords.x,pedCoords.y,pedCoords.z,x,y,z,true)
            if not malhando and aparelhos < 1.0 then
                idle = 5
                DrawBase3D(x,y,z,"APERTE ~y~[E] ~w~ PARA PEGAR BARRA")
                if IsControlJustPressed(0, 46) then
                    malhando = true
                    if lib.progressBar({
                        duration = 20000,
                        label = 'Malhando...',
                        useWhileDead = false,
                        canCancel = true,
                        disable = {
                            car = true,
                            move = true,
                            combat = true,
                            sprint = true
                        },
                        prop = {
                            model = `prop_curl_bar_01`,
                            bone = 28422,
                            pos = vec3(0.0, 0.0, 0.0),
                            rot = vector3(0,0,0)
                        },
                        anim = {
                            dict = 'amb@world_human_muscle_free_weights@male@barbell@base',
                            clip = 'base',
                        }
                    }) then
                        TriggerServerEvent("Academy:upgradeWeight")
                    end
                    malhando = false
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(AcademyConfig.fazerAbdominal) do
            local x,y,z = table.unpack(mark)
            local pedCoords = GetEntityCoords(PlayerPedId())
            local aparelhos = GetDistanceBetweenCoords(pedCoords.x,pedCoords.y,pedCoords.z,x,y,z,true)
            if not malhando and aparelhos < 1.0 then
                idle = 5
                DrawBase3D(x,y,z,"APERTE ~y~[E] ~w~ PARA FAZER ABDOMINAL")
                if IsControlJustPressed(0, 46) then
                    SetEntityHeading(PlayerPedId(),mark.h)
                    SetEntityCoords(PlayerPedId(),x,y,z-1,false,false,false,false)
                    malhando = true
                    if lib.progressBar({
                        duration = 20000,
                        label = 'Malhando...',
                        useWhileDead = false,
                        canCancel = true,
                        disable = {
                            car = true,
                            move = true,
                            combat = true,
                            sprint = true
                        },
                        anim = {
                            dict = 'amb@world_human_sit_ups@male@base',
                            clip = 'base'
                        }
                    }) then
                        TriggerServerEvent("Academy:upgradeWeight")
                    end
                    malhando = false
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(AcademyConfig.fazerFlexao) do
            local x,y,z = table.unpack(mark)
            local pedCoords = GetEntityCoords(PlayerPedId())
            local aparelhos = GetDistanceBetweenCoords(pedCoords.x,pedCoords.y,pedCoords.z,x,y,z,true)
            if not malhando and aparelhos < 1.0 then
                idle = 5
                DrawBase3D(x,y,z,"APERTE ~y~[E] ~w~ PARA FAZER FLEXÃO")
                if IsControlJustPressed(0, 46) then
                    SetEntityHeading(PlayerPedId(),mark.h)
                    SetEntityCoords(PlayerPedId(),x,y,z-1,false,false,false,false)
                    malhando = true
                    if lib.progressBar({
                        duration = 20000,
                        label = 'Malhando...',
                        useWhileDead = false,
                        canCancel = true,
                        disable = {
                            move = true,
                        },
                        anim = {
                            dict = 'amb@world_human_push_ups@male@base',
                            clip = 'base',
                            flag = 1
                        }
                    }) then
                        TriggerServerEvent("Academy:upgradeWeight")
                    end
                    malhando = false
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(AcademyConfig.fazerCorridinha) do
            local x,y,z = table.unpack(mark)
            local pedCoords = GetEntityCoords(PlayerPedId())
            local aparelhos = GetDistanceBetweenCoords(pedCoords.x,pedCoords.y,pedCoords.z,x,y,z,true)
            if not malhando and aparelhos < 1.0 then
                idle = 5
                DrawBase3D(x,y,z,"APERTE ~y~[E] ~w~ PARA FAZER CORRIDINHA")
                if IsControlJustPressed(0, 46) then
                    malhando = true
                    if lib.progressBar({
                        duration = 20000,
                        label = 'Malhando...',
                        useWhileDead = false,
                        canCancel = true,
                        disable = {
                            car = true,
                            move = true,
                            combat = true,
                            sprint = true
                        },
                        anim = {
                            dict = 'amb@world_human_jog_standing@male@fitidle_a',
                            clip = 'idle_a'
                        }
                    }) then
                        TriggerServerEvent("Academy:upgradeWeight")
                    end
                    malhando = false
                end
            end
        end
        Wait(idle)
    end
end)
