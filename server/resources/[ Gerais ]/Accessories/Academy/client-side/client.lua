
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

local malhando = false

local barraFixa = {
    {-1200.0500488281,-1571.0577392578,4.6096024513245,h=211.15209960938},
    {-1204.7548828125,-1564.3947753906,4.6095118522644,h=31.65938949585},
    {1773.181640625,2596.7548828125,45.7978515625,h=273.0752563476563 },
    {1773.1364746094,2594.98828125,45.797859191895,h=273.0752563476563 },
    {1643.3723144531,2527.8002929688,45.56485748291,h=52.09461212 },
    {1649.1096191406,2529.6103515625,45.56485748291,h=52.09461212 },
    {-1104.0754394531,-838.32049560547,26.827457427979,h=127.5403 },
    {-1105.1391601563,-836.93286132813,26.827451705933,h=127.5403 },
}

local pegarBarra = {
    {-1198.6065673828,-1563.1163330078,4.6217041015625},
    {-1196.6557617188,-1565.8605957031,4.6217637062073},
    {1770.9482421875,2590.0270996094,45.797847747803},
    {1646.7991943359,2535.8410644531,45.56485748291},
    {1645.2543945313,2537.3581542969,45.56485748291},
    {1642.7316894531,2524.201171875,45.56485748291},
    {1644.6632080078,2522.5671386719,45.56485748291},
}

local fazerAbdominal = {
    {-1207.09,-1560.8,5.02,h = 10},
    {1768.3933105469,2599.1567382813,46.313953399658,h = 174.97924},
    {1773.1146240234,2599.08203125,46.313949584961,h = 174.97924},
    {1635.44140625,2527.0500488281,45.953498840332,h = 229.28854370117188},
    {1637.8908691406,2530.0415039063,45.956489562988,h = 229.28854370117188},
    {1640.5880126953,2532.9172363281,45.948513031006,h = 229.28854370117188},
    {1642.7828369141,2535.5988769531,45.95329284668,h = 229.28854370117188},
    {1640.0554199219,2522.6821289063,45.948654174805,h = 229.28854370117188},
    {-3139.9763183594,-2009.8782958984,15.415057182312,h = 228.84},
    {-1096.3380126953,-842.7275390625,27.343584060669,h = 127.06},
    {-1098.4610595703,-839.92706298828,27.343587875366,h = 127.06},
    {-1104.0706787109,-832.76068115234,27.236524581909,h = 127.6790},
    {-1101.5124511719,-835.86694335938,27.236526489258,h = 127.6790},
}

local fazerFlexao = {
    {-1205.62,-1567.84,4.61,h = 308.15},
    {1766.9295654297,2598.7375488281,45.797798156738,h = 178.40202},
    {1648.4486083984,2534.2878417969,45.56485748291,h=140.8329620},
    {1637.3734130859,2524.2614746094,45.56485748291,h=321.43734741},
    {-3140.4362792969,-2012.9219970703,15.041701316833,h=316.938},
    {-3139.3178710938,-2013.9251708984,15.041561126709,h=316.938},
    {-3141.5964355469,-2012.0222167969,15.036888122559,h=316.938},
    {-1110.6954345703,-837.15167236328,26.847421646118,h=216.167},
    {-1109.0836181641,-836.06817626953,26.847431182861,h=216.167},
}

local fazerCorridinha = {
    {-1207.32,-1565.84,4.61,h = 308.15},
}

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(barraFixa) do
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
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(pegarBarra) do
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
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(fazerAbdominal) do
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
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(fazerFlexao) do
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
                end
            end
        end
        Wait(idle)
    end
end)

CreateThread(function()
    while true do
        local idle = 1000
        for _,mark in pairs(fazerCorridinha) do
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
                end
            end
        end
        Wait(idle)
    end
end)
