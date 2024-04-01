local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")


local globalConfig = {
    language = 'en',

    props = { 
      {['x'] = 187.35, ['y'] = -993.49, ['z'] = 28.31, model = 'prop_arm_wrestle_01'}, -- PRACA
      {['x'] = 191.54, ['y'] = -991.9, ['z'] = 28.31, model = 'prop_arm_wrestle_01'}, -- PRACA
      {['x'] = 195.14, ['y'] = -989.94, ['z'] = 28.31, model = 'prop_arm_wrestle_01'}, -- PRACA
      {['x'] = 977.9, ['y'] = -95.17, ['z'] = 74.87, model = 'prop_arm_wrestle_01'}, -- MC
      {['x'] = -1823.73, ['y'] = -1181.51, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'}, -- RECOVERY PUB PIER
      {['x'] = -1820.16, ['y'] = -1183.45, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'}, -- RECOVERY PUB PIER
      {['x'] = -1816.31, ['y'] = -1185.56, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'}, -- RECOVERY PUB PIER
    },
    showBlipOnMap = true,

    blip = {
        title="Arm wrestle",  
        colour=0, -- 
        id=1 
    }
}

--[[ Citizen.CreateThread(function()
    if globalConfig.showBlipOnMap then
        for _, info in pairs(globalConfig.props) do
            info.blip = AddBlipForCoord(info.x, info.y, info.z)
            SetBlipSprite(info.blip, globalConfig.blip.id)
            SetBlipDisplay(info.blip, 4)
            SetBlipScale(info.blip, 1.0)
            SetBlipColour(info.blip, globalConfig.blip.colour)
            SetBlipAsShortRange(info.blip, true)
            BeginTextCommandSetBlipName("STRING")
            AddTextComponentString(globalConfig.blip.title)
            EndTextCommandSetBlipName(info.blip)
        end
    end
end) ]]

local place = 0
local started = false
local grade = 0.5
local disabledControl = 0
local esperando = false

Citizen.CreateThread(function()
    while true do
        Wait(5000)
        for i, modelConfig in pairs(globalConfig.props) do
            if Vdist(GetEntityCoords(PlayerPedId()), modelConfig.x, modelConfig.y, modelConfig.z) < 50 then
                thisTable = GetClosestObjectOfType(modelConfig.x, modelConfig.y, modelConfig.z, 1.5, GetHashKey(modelConfig.model), 0, 0, 0)
                if DoesEntityExist(thisTable) then
                    SetEntityHeading(thisTable)
                    PlaceObjectOnGroundProperly(thisTable)
                else
                    thisTable = CreateObject(GetHashKey(modelConfig.model), modelConfig.x, modelConfig.y, modelConfig.z, false, false, false)
                    SetEntityHeading(thisTable)
                    PlaceObjectOnGroundProperly(thisTable)
                end
            elseif Vdist(GetEntityCoords(PlayerPedId()), modelConfig.x, modelConfig.y, modelConfig.z) >= 50 then
                thisTable = GetClosestObjectOfType(modelConfig.x, modelConfig.y, modelConfig.z, 1.5, GetHashKey(modelConfig.model), 0, 0, 0)
                if DoesEntityExist(thisTable) then
                    DeleteEntity(thisTable)
                end
            end
        end		
    end
end)

local sessions = {
    {model = 'prop_arm_wrestle_01',place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 187.35, ['y'] = -993.49, ['z'] = 30.1, model = 'prop_arm_wrestle_01'}, -- PRACA
    {model = 'prop_arm_wrestle_01',place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 191.54, ['y'] = -991.9, ['z'] = 30.11, model = 'prop_arm_wrestle_01'}, -- PRACA
    {model = 'prop_arm_wrestle_01',place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 195.14, ['y'] = -989.94, ['z'] = 30.1, model = 'prop_arm_wrestle_01'}, -- PRACA
    {model = 'prop_arm_wrestle_01',place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = 977.9, ['y'] = -95.17, ['z'] = 74.87, model = 'prop_arm_wrestle_01'}, -- MC
    {model = 'prop_arm_wrestle_01',place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = -1823.73, ['y'] = -1181.51, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'}, -- RECOVERY PUB PIER
    {model = 'prop_arm_wrestle_01',place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = -1820.16, ['y'] = -1183.45, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'}, -- RECOVERY PUB PIER
    {model = 'prop_arm_wrestle_01',place1 = 0, place2 = 0, started = false, grade = 0.5,['x'] = -1816.31, ['y'] = -1185.56, ['z'] = 14.31, model = 'bkr_Prop_Clubhouse_Arm_wrestle_02a'}, -- RECOVERY PUB PIER
}

Citizen.CreateThread(function()
    while true do
        local sleep = 700
        local ped = PlayerPedId()
        local coord = GetEntityCoords(ped)
        for k,v in pairs(sessions) do
            if GetDistanceBetweenCoords(coord,v.x,v.y,v.z) <= 1.5 then
                sleep = 1 
                if not esperando then
                    DrawArmText3Ds(v.x,v.y,v.z,"PRESSIONE ~b~E~w~ PARA DUELAR")
                end
                if IsControlJustPressed(0, 38) and place == 0 then
                    checkFunction()
                end
            end
        end
        
        if disabledControl == 1 then
            sleep = 1
            DisableControlAction(2, 71, true)
            DisableControlAction(2, 72, true)
            DisableControlAction(2, 63, true)
            DisableControlAction(2, 64, true)
            DisableControlAction(2, 75, true)
            DisableControlAction(2, 32, true)
            DisableControlAction(2, 33, true)
            DisableControlAction(2, 34, true)
            DisableControlAction(2, 35, true)
            DisableControlAction(2, 37, true)
            DisableControlAction(2, 23, true)
            DisableControlAction(2, 246, true)
        elseif disabledControl == 2 then
            sleep = 1
            DisableControlAction(2, 71, true)
            DisableControlAction(2, 72, true)
            DisableControlAction(2, 63, true)
            DisableControlAction(2, 64, true)
            DisableControlAction(2, 75, true)
            DisableControlAction(2, 73, true)
            DisableControlAction(2, 32, true)
            DisableControlAction(2, 33, true)
            DisableControlAction(2, 34, true)
            DisableControlAction(2, 35, true)
            DisableControlAction(2, 37, true)
            DisableControlAction(2, 23, true)
            DisableControlAction(2, 38, true)
            DisableControlAction(2, 246, true)
        end
        Citizen.Wait(sleep)
    end
end)

function timer()
    PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", 0)
    local T = GetGameTimer()
    while GetGameTimer() - T < 1000 do
        Wait(0)
        Draw2DText(0.5, 0.4, ("~s~3"), 3.0)
    end
    PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", 0)
    local T = GetGameTimer()
    while GetGameTimer() - T < 1000 do
        Wait(0)
        Draw2DText(0.5, 0.4, ("~s~2"), 3.0)
    end
    PlaySoundFrontend(-1, "Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds", 0)
    local T = GetGameTimer()
    while GetGameTimer() - T < 1000 do
        Wait(0)
        Draw2DText(0.5, 0.4, ("~s~1"), 3.0)
    end
    PlaySoundFrontend(-1, "CHECKPOINT_PERFECT", "HUD_MINI_GAME_SOUNDSET", 0)
    local T = GetGameTimer()
    while GetGameTimer() - T < 1000 do
        Wait(0)
        Draw2DText(0.4, 0.4, ("~s~GO ~w~!"), 3.0)
    end
end

function checkFunction()
    for i, modelConfig in pairs(globalConfig.props) do
        local table = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 1.5, GetHashKey(modelConfig.model), 0, 0, 0)
        if DoesEntityExist(table) then
            local position = GetEntityCoords(PlayerPedId())
            TriggerServerEvent('evy_arm:check_sv', position)
            break
        end
    end
end

RegisterNetEvent('evy_arm:updategrade_cl')
AddEventHandler('evy_arm:updategrade_cl', function(gradeUpValue)
    grade = gradeUpValue
end)

RegisterNetEvent('evy_arm:start_cl')
AddEventHandler('evy_arm:start_cl', function()
    started = true
    if place == 1 then

        disabledControl = 2
        timer()

        PlayAnim(PlayerPedId(), "mini@arm_wrestling", "sweep_a", 1)
        SetEntityAnimSpeed(PlayerPedId(), "mini@arm_wrestling", "sweep_a", 0.0)
        SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_a", grade)
        PlayFacialAnim(PlayerPedId(), "electrocuted_1", "facials@gen_male@base")
        disabledControl = 1

        TriggerEvent("Notify","importante","Para vencer, aperte rapidamente a tecla 'E'",8000)
        while grade >= 0.10 and grade <= 0.90 do
            Wait(0)
            PlayFacialAnim(PlayerPedId(), "electrocuted_1", "facials@gen_male@base")
            
            SetEntityAnimSpeed(PlayerPedId(), "mini@arm_wrestling", "sweep_a", 0.0)
            SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_a", grade)
            if IsControlPressed(0, 38) then
                TriggerServerEvent('evy_arm:updategrade_sv', 0.015) 
                SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_a", grade)
                while IsControlPressed(0, 38) do
                Wait(0)
                
                SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_a", grade)
                end
            end
        end

        if grade >= 0.90 then
            PlayAnim(PlayerPedId(), "mini@arm_wrestling", "win_a_ped_a", 2)
            TriggerEvent("Notify","sucesso","Você venceu!",8000)
        elseif grade <= 0.10 then
            PlayAnim(PlayerPedId(), "mini@arm_wrestling", "win_a_ped_b", 2)
            TriggerEvent("Notify","negado","Você perdeu!",8000)
        end
        Wait(4000)
        TriggerServerEvent('evy_arm:disband_sv', GetEntityCoords(PlayerPedId()))
        return

    elseif place == 2 then

        disabledControl = 2
        timer()

        PlayAnim(PlayerPedId(), "mini@arm_wrestling", "sweep_b", 1)
        SetEntityAnimSpeed(PlayerPedId(), "mini@arm_wrestling", "sweep_b", 0.0)
        SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_b", grade)
        PlayFacialAnim(PlayerPedId(), "electrocuted_1", "facials@gen_male@base")
        disabledControl = 1

        TriggerEvent("Notify","importante","Para vencer, aperte rapidamente a tecla 'E'",8000)
        while grade >= 0.10 and grade <= 0.90 do
            Wait(0)
            PlayFacialAnim(PlayerPedId(), "electrocuted_1", "facials@gen_male@base")
            
            SetEntityAnimSpeed(PlayerPedId(), "mini@arm_wrestling", "sweep_b", 0.0)
            SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_b", grade)
            if IsControlPressed(0, 38) then
                TriggerServerEvent('evy_arm:updategrade_sv', -0.015) 
                SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_b", grade)
                while IsControlPressed(0, 38) do
                    Wait(0)
                    SetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "sweep_b", grade)
                end
            end
        end
        if grade <= 0.10 then
            PlayAnim(PlayerPedId(), "mini@arm_wrestling", "win_a_ped_a", 2)
            TriggerEvent("Notify","sucesso","Você venceu!",8000)
        elseif grade >= 0.90 then
            PlayAnim(PlayerPedId(), "mini@arm_wrestling", "win_a_ped_b", 2)
            TriggerEvent("Notify","negado","Você perdeu!",8000)
        end
        Wait(4000)
        TriggerServerEvent('evy_arm:disband_sv', GetEntityCoords(PlayerPedId()))
        return
    end
end)

RegisterNetEvent('evy_arm:check_cl')
AddEventHandler('evy_arm:check_cl', function(args)
    local table = 0
    esperando = true
    TriggerEvent("Notify","aviso","Esperando um oponente...",8000)
    if args == 'place1' then
        place = 1

        for i, modelConfig in pairs(globalConfig.props) do
            table = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 1.5, GetHashKey(modelConfig.model), 0, 0, 0)
            if DoesEntityExist(table) then
                break
            end
        end
        disabledControl = 2

        SetEntityNoCollisionEntity(PlayerPedId(), table, false)
        --SetEntityHeading(table, 0.0)
        SetEntityHeading(PlayerPedId(), GetEntityHeading(table))
        Wait(100)
        SetEntityCoords(PlayerPedId(), GetOffsetFromEntityInWorldCoords(table, -0.20, 0.0, 0.0).x, GetOffsetFromEntityInWorldCoords(table, 0.0, -0.65, 0.0).y, GetEntityCoords(PlayerPedId()).z-1)
        FreezeEntityPosition(PlayerPedId(), true)
        PlayAnim(PlayerPedId(), "mini@arm_wrestling","aw_ig_intro_alt1_a", 2)
        while ( GetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "aw_ig_intro_alt1_a") < 0.95 ) do
            Wait(0)
        end
        PlayAnim(PlayerPedId(), "mini@arm_wrestling", "nuetral_idle_a", 1)
        disabledControl = 1

        
        while not started do
            Wait(0)
            if IsControlPressed(2, 73) or IsPedRagdoll(PlayerPedId()) or IsControlPressed(2, 200) or IsControlPressed(2, 214) then
                SetEntityNoCollisionEntity(PlayerPedId(), table, true)
                TriggerServerEvent('evy_arm:disband_sv', GetEntityCoords(PlayerPedId()))
                return
            end
        end
    elseif args == 'place2' then
        place = 2
        for i, modelConfig in pairs(globalConfig.props) do
            table = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 1.5, GetHashKey(modelConfig.model), 0, 0, 0)
            if DoesEntityExist(table) then
                break
            end
        end
        disabledControl = 2
        SetEntityNoCollisionEntity(PlayerPedId(), table, false)
        --SetEntityHeading(table, 0.0)
        SetEntityHeading(PlayerPedId(), GetEntityHeading(table)-180)
        Wait(100)
        SetEntityCoords(PlayerPedId(), GetOffsetFromEntityInWorldCoords(table, 0.0, 0.0, 0.0).x, GetOffsetFromEntityInWorldCoords(table, 0.0, 0.50, 0.0).y, GetEntityCoords(PlayerPedId()).z-1)
        FreezeEntityPosition(PlayerPedId(), true)
        PlayAnim(PlayerPedId(), "mini@arm_wrestling","aw_ig_intro_alt1_b", 2)
        while ( GetEntityAnimCurrentTime(PlayerPedId(), "mini@arm_wrestling", "aw_ig_intro_alt1_b") < 0.95 ) do
            Wait(0)
        end
        PlayAnim(PlayerPedId(), "mini@arm_wrestling", "nuetral_idle_b", 1)
        disabledControl = 1
        while not started do
            Wait(0)
            if IsControlPressed(2, 73) or IsPedRagdoll(PlayerPedId()) or IsControlPressed(2, 200) or IsControlPressed(2, 214) then
                SetEntityNoCollisionEntity(PlayerPedId(), table, true)
                TriggerServerEvent('evy_arm:disband_sv', GetEntityCoords(PlayerPedId()))
                return
            end
        end
    elseif args == 'noplace' then
        TriggerEvent("Notify","negado","A mesa esta cheia")
    end
end)

RegisterNetEvent('evy_arm:reset_cl')
AddEventHandler('evy_arm:reset_cl', function()
    esperando = false
    for i, modelConfig in pairs(globalConfig.props) do
        local tableId = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 1.5, GetHashKey(modelConfig.model), 0, 0, 0)
        if DoesEntityExist(tableId) then
            SetEntityNoCollisionEntity(PlayerPedId(), tableId, true)
            break
        end
    end
    ClearPedTasks(PlayerPedId())
    place = 0
    started = false
    grade = 0.5
    disabledControl = 0
    FreezeEntityPosition(PlayerPedId(), false)
end)

Citizen.CreateThread(function()
    while true do
        local sleep = 1000
        if place ~= 0 then
            sleep = 5
            if IsControlJustPressed(0, 167) then
                FreezeEntityPosition(PlayerPedId(), false)
                TriggerServerEvent('evy_arm:disband_sv', GetEntityCoords(PlayerPedId()))
            end
        end
        Citizen.Wait(sleep)
    end
end)

function PlayAnim(ped, dict, name, flag)
    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Citizen.Wait(0)
    end
    TaskPlayAnim(ped, dict, name, 1.5, 1.5, -1, flag, 0.0, false, false, false)
end

function Draw2DText(x, y, text, scale)
    SetTextFont(4)
    SetTextProportional(7)
    SetTextScale(scale, scale)
    SetTextColour( 198, 25, 66, 255)
    SetTextDropShadow(0, 0, 0, 0,255)
    SetTextDropShadow()
    SetTextEdge(4, 0, 0, 0, 255)
    SetTextOutline()
    SetTextEntry("STRING")
    AddTextComponentString(text)
    DrawText(x, y)
end

function DrawArmText3Ds(x,y,z,text)
    local onScreen,_x,_y = World3dToScreen2d(x,y,z)
    SetTextFont(4)
    SetTextScale(0.35,0.35)
    SetTextColour(255,255,255,150)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(text)
    DrawText(_x,_y)
    local factor = (string.len(text))/370
    DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,80)
end
