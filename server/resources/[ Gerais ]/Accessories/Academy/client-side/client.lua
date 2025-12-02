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
                    TriggerEvent("cancelando",true)
                    FreezeEntityPosition(PlayerPedId(),true)
                    SetEntityHeading(PlayerPedId(),mark.h)
                    SetEntityCoords(PlayerPedId(),x,y,z-1,false,false,false,false)
                    vRP._playAnim(false,{"amb@prop_human_muscle_chin_ups@male@base","base"},true)
                    TriggerEvent("progress",20000,"Malhando...")
                    malhando = true
                    Wait(20000)
                    malhando = false
                    vRP._stopAnim(false)
                    TriggerEvent("cancelando",false)
                    FreezeEntityPosition(PlayerPedId(),false)
                    TriggerServerEvent("Academy:upgradeWeight")
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
                    FreezeEntityPosition(PlayerPedId(),true)
                    vRP._CarregarObjeto("amb@world_human_muscle_free_weights@male@barbell@base","base","prop_curl_bar_01",50,28422)
                    TriggerEvent("progress",20000,"Malhando...")
                    malhando = true
                    Wait(20000)
                    vRP._DeletarObjeto()
                    malhando = false
                    TriggerEvent("cancelando",false)
                    FreezeEntityPosition(PlayerPedId(),false)
                    TriggerServerEvent("Academy:upgradeWeight")
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
                    FreezeEntityPosition(PlayerPedId(),true)
                    TriggerEvent("cancelando",true)
                    SetEntityHeading(PlayerPedId(),mark.h)
                    SetEntityCoords(PlayerPedId(),x,y,z-1,false,false,false,false)
                    vRP._playAnim(false,{"amb@world_human_sit_ups@male@base","base"},true)
                    TriggerEvent("progress",20000,"Malhando...")
                    malhando = true
                    Wait(20000)
                    vRP._stopAnim(false)
                    malhando = false
                    TriggerEvent("cancelando",false)
                    FreezeEntityPosition(PlayerPedId(),false)
                    TriggerServerEvent("Academy:upgradeWeight")
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
                    FreezeEntityPosition(PlayerPedId(),true)
                    TriggerEvent("cancelando",true)
                    SetEntityHeading(PlayerPedId(),mark.h)
                    SetEntityCoords(PlayerPedId(),x,y,z-1,false,false,false,false)
                    vRP._playAnim(false,{"amb@world_human_push_ups@male@base","base"},true)
                    TriggerEvent("progress",20000,"Malhando...")
                    malhando = true
                    Wait(20000)
                    vRP._stopAnim(false)
                    malhando = false
                    TriggerEvent("cancelando",false)
                    FreezeEntityPosition(PlayerPedId(),false)
                    TriggerServerEvent("Academy:upgradeWeight")
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
                    FreezeEntityPosition(PlayerPedId(),true)
                    TriggerEvent("cancelando",true)
                    SetEntityHeading(PlayerPedId(),306.57)
                    SetEntityCoords(PlayerPedId(),-1207.32,-1565.84,4.61-1,false,false,false,false)
                    vRP._playAnim(false,{"amb@world_human_jog_standing@male@fitidle_a","idle_a"},true)
                    TriggerEvent("progress",20000,"Malhando...")
                    malhando = true
                    Wait(20000)
                    vRP._stopAnim(false)
                    malhando = false
                    TriggerEvent("cancelando",false)
                    FreezeEntityPosition(PlayerPedId(),false)
                    TriggerServerEvent("Academy:upgradeWeight")
                end
            end
        end
        Wait(idle)
    end
end)
