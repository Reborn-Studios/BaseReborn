RobberyStart = GlobalState["RobberyStart"]

AddStateBagChangeHandler("RobberyStart","",function (_,_,value)
    RobberyStart = value
end)
-------------------------------------------------------------
--- ARTS
-------------------------------------------------------------
CreateThread(function()
    local localConfig = Config.robberys['Arts']
    if not localConfig['enabled'] then return end

    for k, v in pairs(localConfig['startHeist']['peds']) do
        loadModel(v['ped'])
        ArtHeist['sellPeds'][k] = CreatePed(4, GetHashKey(v['ped']), v['pos']['x'], v['pos']['y'], v['pos']['z'] - 0.95, v['heading'], false, true)
        FreezeEntityPosition(ArtHeist['sellPeds'][k], true)
        SetEntityInvincible(ArtHeist['sellPeds'][k], true)
        SetBlockingOfNonTemporaryEvents(ArtHeist['sellPeds'][k], true)
    end

    for k, v in pairs(localConfig['sellPainting']['peds']) do
        loadModel(v['ped'])
        ArtHeist['startPeds'][k] = CreatePed(4, GetHashKey(v['ped']), v['pos']['x'], v['pos']['y'], v['pos']['z'] - 0.95, v['heading'], false, true)
        FreezeEntityPosition(ArtHeist['startPeds'][k], true)
        SetEntityInvincible(ArtHeist['startPeds'][k], true)
        SetBlockingOfNonTemporaryEvents(ArtHeist['startPeds'][k], true)
    end

    if Config.target then
        AddBoxZone("ArtsRobberyStart",localConfig['startHeist']['pos'],1.5,1.5,
        {
            name = "ArtsRobberyStart",
            heading = 20.0,
            minZ = localConfig['startHeist']['pos'].z - 1.0,
            maxZ = localConfig['startHeist']['pos'].z + 0.3,
        },
        {
            options = {
                {
                    event = "artheist:startHeist",
                    icon = "fa-solid fa-mask",
                    label = "Iniciar roubo",
                },
            },
            distance = 1.5
        })

        AddBoxZone("ArtsRobberyFinish",localConfig['sellPainting']['pos'],1.5,1.5,
        {
            name = "ArtsRobberyStart",
            heading = 20.0,
            minZ = localConfig['sellPainting']['pos'].z - 1.0,
            maxZ = localConfig['sellPainting']['pos'].z + 0.3,
        },
        {
            options = {
                {
                    event = "artheist:sellPainting",
                    icon = "fa-solid fa-mask",
                    label = "Vender pinturas",
                },
            },
            distance = 1.5
        })

        for k, v in pairs(localConfig['painting']) do
            AddBoxZone("ArtsRobberyPainting"..k,v['objectPos'],1.5,1.5,
            {
                name = "ArtsRobberyPainting"..k,
                heading = 20.0,
                minZ = v['objectPos'].z - 1.0,
                maxZ = v['objectPos'].z + 0.3,
            },
            {
                options = {
                    {
                        event = "artheist:stealPainting",
                        icon = "fa-solid fa-mask",
                        label = "Roubar pintura",
                        data = k,
                        canInteract = function ()
                            return not localConfig['painting'][k]['taken']
                        end
                    },
                },
                distance = 1.5
            })
        end
    else
        while true do
            local sleep = 1000
            local ped = PlayerPedId()
            local pedCo = GetEntityCoords(ped)
            local heistDist = #(pedCo - localConfig['startHeist']['pos'])
            local sellDist = #(pedCo - localConfig['sellPainting']['pos'])
            if heistDist <= 3.0 then
                sleep = 1
                DrawText3D(localConfig['startHeist']['pos'].x,localConfig['startHeist']['pos'].y,localConfig['startHeist']['pos'].z,"~g~[E]~w~ Para começar roubo")
                if IsControlJustPressed(0, 38) and not ArtsProgress then
                    ArtsProgress = true
                    StartArtHeist()
                    ArtsProgress = false
                end
            elseif sellDist <= 3.0 then
                sleep = 1
                DrawText3D(localConfig['sellPainting']['pos'].x,localConfig['sellPainting']['pos'].y,localConfig['sellPainting']['pos'].z,"~g~[E]~w~ Para vender pinturas")
                if IsControlJustPressed(0, 38) and not ArtsProgress then
                    ArtsProgress = true
                    FinishArtHeist()
                    ArtsProgress = false
                end
            end
            if RobberyStart["Arts"] then
                for k, v in pairs(localConfig['painting']) do
                    local dist = #(pedCo - v['scenePos'])
                    if dist <= 1.5 then
                        sleep = 1
                        if not v['taken'] then
                            DrawText3D(v['objectPos'].x,v['objectPos'].y,v['objectPos'].z, "~g~[E]~w~ Para roubar")
                            if IsControlJustPressed(0, 38) and not ArtsProgress then
                                ArtsProgress = true
                                local weapon = GetSelectedPedWeapon(ped)
                                if weapon == GetHashKey('WEAPON_SWITCHBLADE') then
                                    if not ArtHeist['cuting'] then
                                        HeistAnimation(k)
                                    else
                                        Notify("Pintura já foi retirada")
                                    end
                                else
                                    Notify('Você não possui um canivete')
                                end
                                ArtsProgress = false
                            end
                        end
                    end
                end
            end
            Wait(sleep)
        end
    end
end)
-------------------------------------------------------------
--- ATM
-------------------------------------------------------------
CreateThread(function ()
    local localConfig = Config.robberys['ATM']
    if not localConfig['enabled'] then return end

    if Config.target then
        for _, model in ipairs(localConfig.AtmModels) do
            if Config.target == 'ox-target' then
                local options = {}
                if localConfig.EnableHacking then
                    table.insert(options, {
                        event = 'atmrobbery_hack',
                        label = "Hacker ATM",
                        icon = 'fas fa-laptop-code',
                        model = model,
                        distance = 1,
                        items = localConfig.HackingItem,
                    })
                end
                if localConfig.EnableDrilling then
                    table.insert(options, {
                        event = 'atmrobbery_drill',
                        label = "Furar ATM",
                        icon = 'fas fa-tools',
                        model = model,
                        distance = 1,
                        items = localConfig.DrillItem,
                    })
                end
                exports.ox_target:addModel(model, options)
            elseif Config.target == 'qb-target' then
                local options = {}
                if localConfig.EnableHacking then
                    table.insert(options, {
                        type = "client",
                        event = 'atmrobbery_hack',
                        icon = 'fas fa-laptop-code',
                        label = "Hacker ATM",
                        model = model,
                        item = localConfig.HackingItem,
                    })
                end
                if localConfig.EnableDrilling then
                    table.insert(options, {
                        type = "client",
                        event = 'atmrobbery_drill',
                        icon = 'fas fa-tools',
                        label = "Furar ATM",
                        model = model,
                        item = localConfig.DrillItem,
                    })
                end
                exports['qb-target']:AddTargetModel(model, {
                    options = options,
                    distance = 1.0
                })
            elseif Config.target == "target" then
                local options = {}
                if localConfig.EnableHacking then
                    table.insert(options, {
                        tunnel = "client",
                        event = 'atmrobbery_hack',
                        icon = 'fas fa-laptop-code',
                        label = "Hacker ATM",
                    })
                end
                if localConfig.EnableDrilling then
                    table.insert(options, {
                        tunnel = "client",
                        event = 'atmrobbery_drill',
                        icon = 'fas fa-tools',
                        label = "Furar ATM",
                    })
                end
                exports['target']:AddTargetModel(model, {
                    options = options,
                    distance = 1.0
                })
            end
        end
    else
        while true do
            local sleep = 1000
            local ped = PlayerPedId()
            local pedCo = GetEntityCoords(ped)
            for _, model in ipairs(localConfig.AtmModels) do
                local obj = GetClosestObjectOfType(pedCo, 1.0, GetHashKey(model), 0, 0, 0)
                if obj ~= 0 then
                    local objCoords = GetEntityCoords(obj)
                    dist = #(pedCo - objCoords)
                    if dist < 1.5 then
                        sleep = 1
                        if localConfig.EnableDrilling then
                            DrawText3D(objCoords.x,objCoords.y,objCoords.z + 0.7,"~g~[E]~w~ Para Hacker ATM")
                            if IsControlJustPressed(0,38) then
                                TriggerEvent("atmrobbery_hack",{ entity = obj })
                            end
                        end
                        if localConfig.EnableHacking then
                            DrawText3D(objCoords.x,objCoords.y,objCoords.z + 0.5,"~g~[G]~w~ Para Furar ATM")
                            if IsControlJustPressed(0,58) then
                                TriggerEvent("atmrobbery_drill",{ entity = obj })
                            end
                        end
                    end
                    break
                end
            end
            Wait(sleep)
        end
    end
end)
-------------------------------------------------------------
--- BETTA
-------------------------------------------------------------
CreateThread(function ()
    local localConfig = Config.robberys['Betta']
    if not localConfig['enabled'] then return end

    if Config.target then
        AddBoxZone("BettaHeist", localConfig['startHeist']['pos'], 1.1, 2.35,
        {
            name = "BettaHeist",
            heading = 20.0,
            minZ = localConfig['startHeist']['pos'].z - 1.0,
            maxZ = localConfig['startHeist']['pos'].z + 0.3,
        },
        {
            options = {
                {
                    event = "bettaheist:client:startHeist",
                    icon = "fa-solid fa-mask",
                    label = Config.notifications['start_heist'],
                },
            },
            distance = 1.5
        })
    else
        while true do
            local sleep = 1000
            local ped = PlayerPedId()
            local pedCo = GetEntityCoords(ped)
            local heistDist = #(pedCo - localConfig['startHeist']['pos'])
            if heistDist <= 3.0 and not RobberyStart["Betta"] then
                sleep = 1
                DrawText3D(localConfig['startHeist']['pos'].x,localConfig['startHeist']['pos'].y,localConfig['startHeist']['pos'].z,"~g~[E]~w~ Para começar roubo")
                if IsControlJustPressed(0, 38) then
                    TriggerEvent("bettaheist:client:startHeist")
                end
            end
            Wait(sleep)
        end
    end
end)
-------------------------------------------------------------
--- HELICOPTER
-------------------------------------------------------------
CreateThread(function ()
    local localConfig = Config.robberys['Helicopter']
    if not localConfig['enabled'] then return end

    local x,y,z = localConfig.ManagerPed.location.x,localConfig.ManagerPed.location.y,localConfig.ManagerPed.location.z
    loadModel(localConfig.ManagerPed.model)
    local managerPed = CreatePed(4, GetHashKey(localConfig.ManagerPed.model), x,y,z, localConfig.ManagerPed.heading, false, true)
    FreezeEntityPosition(managerPed, true)
    SetEntityInvincible(managerPed, true)
    SetBlockingOfNonTemporaryEvents(managerPed, true)

    if localConfig.ManagerBlip.enable then
        local managerBlip = AddBlipForCoord(x,y,z)
        SetBlipSprite(managerBlip, localConfig.ManagerBlip.sprite)
        SetBlipScale(managerBlip, localConfig.ManagerBlip.scale)
        SetBlipColour(managerBlip, localConfig.ManagerBlip.color)
        BeginTextCommandSetBlipName("STRING")
        AddTextComponentString(localConfig.ManagerBlip.label)
        EndTextCommandSetBlipName(managerBlip)
    end
    if Config.target == "ox_target" then
        exports.ox_target:addLocalEntity(managerPed, {
            {
                name = "xstart",
                icon = "fas fa-helicopter",
                label = "Iniciar roubo do Helicoptero",
                onSelect = function()
                    if not HeliAtived then
                        StartHelicopterHeist()
                    end
                end,
            },
        })
    elseif Config.target == "qb-target" then
        exports['qb-target']:AddTargetEntity(managerPed, {
            options = {
                {
                    type = "client",
                    icon = "fas fa-helicopter",
                    label = "Iniciar roubo do Helicoptero",
                    action = function()
                        if not HeliAtived then
                            StartHelicopterHeist()
                        end
                    end,
                },
            },
            distance = 2.5
        })
    elseif Config.target == "target" then
        exports['target']:AddTargetModel({GetHashKey(localConfig.ManagerPed.model)}, {
            options = {
                {
                    tunnel = "client",
                    event = "helicopter:startHeist",
                    icon = "fas fa-helicopter",
                    label = "Iniciar roubo do Helicoptero",
                },
            },
            distance = 2.5
        })
    else
        while true do
            local timeDistance = 500
            local ped = PlayerPedId()
            local coords = GetEntityCoords(ped)
            local dist = #(coords - vec3(x,y,z))
            if dist <= 3.0 then
                timeDistance = 1
                DrawText3D(x,y,z,"~g~[E]~w~ Iniciar roubo do Helicoptero")
                if IsControlJustPressed(0, 38) then
                    if not HeliAtived then
                        StartHelicopterHeist()
                    end
                end
            end
            Wait(timeDistance)
        end
    end
end)
-------------------------------------------------------------
--- JEWELRY
-------------------------------------------------------------
CreateThread(function ()
    local localConfig = Config.robberys['Jewelry']
    if not localConfig['enabled'] then return end
    Wait(1000)
    ServerVitrines = callback.await('jewellery_heist:server:getVitrinesArray', false)
    for index, data in ipairs(ServerVitrines) do
        local vitrine = Vitrine:new(index, data.coords, data.props)
        table.insert(Vitrines, vitrine)
    end
    if Config.target then
        AddBoxZone(
            "Vitrine-Thermite",
            vec3(localConfig.Locations.thermite.coords.x, localConfig.Locations.thermite.coords.y, localConfig.Locations.thermite.coords.z),
            1.0, 0.5,
            {
                name = "Vitrine-Thermite",
                heading = 20.0,
                minZ = localConfig.Locations.thermite.coords.z - 1.0,
                maxZ = localConfig.Locations.thermite.coords.z + 0.3,
            },
            {
                options = {
                    {
                        label = Config.notifications['blow_fuse_box'],
                        icon = 'fas fa-bug',
                        items = localConfig.Thermite.item,
                        event = 'jewellery_heist:client:startThermite'
                    }
                },
                distance = 1.5
            }
        )
        for k,vitrine in pairs(Vitrines) do
            AddBoxZone(
                "Vitrine-"..k,
                ApplyOffset(vitrine.coords, vector3(0.0, 0.5, 0.0), vitrine.coords.w),
                1.0,
                0.5,
                {
                    name = "Vitrine-"..k,
                    heading = 20.0,
                    minZ = vitrine.coords.z - 0.5,
                    maxZ = vitrine.coords.z + 0.3,
                },
                {
                    options = {
                        {
                            label = Config.notifications['smash_vitrine'],
                            icon = 'fa fa-hand',
                            canInteract = function()
                                return not vitrine.isOpen and not vitrine.isBusy
                            end,
                            event = 'jewellery_heist:client:smashVitrine',
                            vitrine = { id = vitrine.id, coords = vitrine.coords }
                        }
                    },
                    distance = 1.5
                }
            )
        end
    else
        while true do
            local sleep = 1000
            local ped = PlayerPedId()
            local pedCo = GetEntityCoords(ped)
            for k,vitrine in pairs(Vitrines) do
                local dist = #(pedCo - vitrine.coords.xyz)
                if dist <= 1.0 and not vitrine.isOpen and not vitrine.isBusy then
                    sleep = 1
                    DrawText3D(vitrine.coords.x,vitrine.coords.y,vitrine.coords.z,"~g~[E]~w~ "..Config.notifications['smash_vitrine'])
                    if IsControlJustPressed(0, 38) then
                        SmashVitrine({ vitrine = { id = vitrine.id, coords = vitrine.coords } })
                    end
                end
            end
            local dist = #(pedCo - localConfig.Locations.thermite.coords.xyz)
            if dist <= 2.0 then
                sleep = 1
                DrawText3D(localConfig.Locations.thermite.coords.x,localConfig.Locations.thermite.coords.y,localConfig.Locations.thermite.coords.z,"~g~[E]~w~ "..Config.notifications['blow_fuse_box'])
                if IsControlJustPressed(0, 38) then
                    TriggerEvent('jewellery_heist:client:startThermite')
                end
            end
            Wait(sleep)
        end
    end
end)
-------------------------------------------------------------
--- KIDNAPPING
-------------------------------------------------------------
CreateThread(function()
    local localConfig = Config.robberys['Kidnapping']
    if not localConfig['enabled'] then return end

    local pedConfig = localConfig['start']['ped']
    loadModel(pedConfig['model'])
    KidNapping['bossPed'] = CreatePed(4, GetHashKey(pedConfig['model']), pedConfig['pos']['x'], pedConfig['pos']['y'], pedConfig['pos']['z'] - 0.95, pedConfig['heading'], false, true)
    FreezeEntityPosition(KidNapping['bossPed'], true)
    SetEntityInvincible(KidNapping['bossPed'], true)
    SetBlockingOfNonTemporaryEvents(KidNapping['bossPed'], true)
    TaskStartScenarioInPlace(KidNapping['bossPed'], 'WORLD_HUMAN_SMOKING', 0, true)
    if Config.target then
        AddBoxZone(
            "KidnappingStart",
            localConfig['start']['ped']['pos'],
            1.0, 0.5,
            {
                name = "KidnappingStart",
                heading = 20.0,
                minZ = localConfig['start']['ped']['pos'].z - 1.0,
                maxZ = localConfig['start']['ped']['pos'].z + 0.3,
            },
            {
                options = {
                    {
                        label = Config.notifications['get_job'],
                        icon = 'fas fa-bug',
                        canInteract = function ()
                            return not KidNapping['kidnapped']
                        end,
                        event = 'kidnapping:startContract'
                    }
                },
                distance = 1.5
            }
        )
        AddBoxZone(
            "KidnappingFinish",
            localConfig['start']['ped']['pos'],
            1.0, 0.5,
            {
                name = "KidnappingFinish",
                heading = 20.0,
                minZ = localConfig['start']['ped']['pos'].z - 1.0,
                maxZ = localConfig['start']['ped']['pos'].z + 0.3,
            },
            {
                options = {
                    {
                        label = Config.notifications['get_job'],
                        icon = 'fas fa-bug',
                        canInteract = function ()
                            return KidNapping['kidnapped']
                        end,
                        event = 'kidnapping:startContract'
                    }
                },
                distance = 1.5
            }
        )
        AddBoxZone(
            "KidnappingPed",
            localConfig['query']['cameraPos'],
            1.0, 0.5,
            {
                name = "KidnappingPed",
                heading = 20.0,
                minZ = localConfig['query']['cameraPos'].z - 0.5,
                maxZ = localConfig['query']['cameraPos'].z + 0.3,
            },
            {
                options = {
                    {
                        label = Config.notifications['get_videorecord'],
                        canInteract = function ()
                            return KidNapping['sceneFinish']
                        end,
                        icon = 'fas fa-bug',
                        event = "kidnapping:getVideo"
                    }
                },
                distance = 1.5
            }
        )
        AddBoxZone(
            "KidnappingVideo",
            localConfig['query']['laptopScenePos'],
            1.0, 0.5,
            {
                name = "KidnappingVideo",
                heading = 20.0,
                minZ = localConfig['query']['laptopScenePos'].z - 0.5,
                maxZ = localConfig['query']['laptopScenePos'].z + 0.3,
            },
            {
                options = {
                    {
                        label = Config.notifications['check_videorecord'],
                        canInteract = function ()
                            return KidNapping['checkVideo']
                        end,
                        icon = 'fas fa-bug',
                        event = "kidnapping:checkVideo"
                    }
                },
                distance = 1.5
            }
        )
    else
        while true do
            local ped = PlayerPedId()
            local pedCo = GetEntityCoords(ped)
            local sleep = 1000
            local dist = #(pedCo - localConfig['start']['ped']['pos'])
            local x,y,z = localConfig['start']['ped']['pos'].x,localConfig['start']['ped']['pos'].y,localConfig['start']['ped']['pos'].z
            if dist <= 3.0 then
                sleep = 1
                if not KidNapping['kidnapped'] then
                    DrawText3D(x,y,z,"~g~[E]~w~ "..Config.notifications['get_job'])
                    if IsControlJustPressed(0, 38) then
                        KidnappingStart()
                    end
                else
                    DrawText3D(x,y,z,"~g~[E]~w~ "..Config.notifications['finish_job'])
                    if IsControlJustPressed(0, 38) then
                        KidnappingFinish()
                    end
                end
            end
            if KidNapping['sceneFinish'] then
                local cameraDist = #(pedCo - localConfig['query']['cameraPos'])
                if cameraDist <= 3.0 then
                    sleep = 1
                    DrawText3D(localConfig['query']['cameraPos'].x,localConfig['query']['cameraPos'].y,localConfig['query']['cameraPos'].z,"~g~[E]~w~ "..Config.notifications['get_videorecord'])
                    if IsControlJustPressed(0, 38) then
                        KidNapping['sceneFinish'] = false
                        KidNapping['checkVideo'] = true
                        Notify(Config.notifications['go_laptop'])
                    end
                end
            end
            if KidNapping['checkVideo'] then
                local laptopDist = #(pedCo - localConfig['query']['laptopScenePos'])
                if laptopDist <= 3.0 then
                    sleep = 1
                    DrawText3D(localConfig['query']['laptopScenePos'].x,localConfig['query']['laptopScenePos'].y,localConfig['query']['laptopScenePos'].z,"~g~[E]~w~ "..Config.notifications['check_videorecord'])
                    if IsControlJustPressed(0, 38) then
                        KidNapping['checkVideo'] = false
                        LaptopAnimation()
                    end
                end
            end
            Wait(sleep)
        end
    end
end)
-------------------------------------------------------------
--- TRAIN
-------------------------------------------------------------
CreateThread(function()
    local localConfig = Config.robberys['Train']
    if not localConfig['enabled'] then return end

    addBlip(localConfig['startHeist']['pos'], 205, 4, "Chefe Trem")
    for k, v in pairs(localConfig['startHeist']['peds']) do
        loadModel(v['ped'])
        TrainHeist['startPeds'][k] = CreatePed(4, GetHashKey(v['ped']), v['pos']['x'], v['pos']['y'], v['pos']['z'] - 0.95, v['heading'], false, true)
        FreezeEntityPosition(TrainHeist['startPeds'][k], true)
        SetEntityInvincible(TrainHeist['startPeds'][k], true)
        SetBlockingOfNonTemporaryEvents(TrainHeist['startPeds'][k], true)
    end

    if Config.target then
        AddBoxZone(
            "TrainHeist",
            localConfig['startHeist']['pos'],
            1.0, 0.5,
            {
                name = "TrainHeist",
                heading = 20.0,
                minZ = localConfig['startHeist']['pos'].z - 0.5,
                maxZ = localConfig['startHeist']['pos'].z + 0.3,
            },
            {
                options = {
                    {
                        label = Config.notifications['start_heist'],
                        icon = "fa-solid fa-mask",
                        event = "trainheist:client:startTrainHeist"
                    }
                },
                distance = 1.5
            }
        )
    else
        while true do
            local ped = PlayerPedId()
            local pedCo = GetEntityCoords(ped)
            local dist = #(pedCo - localConfig['startHeist']['pos'])
            local sleep = 1000
            if dist <= 3.0 then
                sleep = 1
                DrawText3D(localConfig['startHeist']['pos'].x,localConfig['startHeist']['pos'].y,localConfig['startHeist']['pos'].z,"~g~[E]~w~ "..Config.notifications['start_heist'])
                if IsControlJustPressed(0, 38) then
                    StartTrainHeist()
                end
            end
            Wait(sleep)
        end
    end
end)
-------------------------------------------------------------
--- YACHT
-------------------------------------------------------------
CreateThread(function()
    local localConfig = Config.robberys['Yacht']
    if not localConfig['enabled'] then return end

    if localConfig.Blips.HeistBlip.Use then
        blip = AddBlipForCoord(localConfig.Coords.Start.x, localConfig.Coords.Start.y, localConfig.Coords.Start.z)
        SetBlipSprite(blip, localConfig.Blips.HeistBlip.sprite)
        SetBlipScale(blip, localConfig.Blips.HeistBlip.size)
        SetBlipColour(blip, localConfig.Blips.HeistBlip.color)
        BeginTextCommandSetBlipName('STRING')
        AddTextComponentSubstringPlayerName(localConfig.Blips.HeistBlip.label)
        EndTextCommandSetBlipName(blip)
        SetBlipAsShortRange(blip, true)
    end

    if Config.target then
        AddBoxZone("YachtHeist", localConfig['Coords']['Start'], 1.1, 2.35,
        {
            name = "YachtHeist",
            heading = 20.0,
            minZ = localConfig['Coords']['Start'].z - 1.0,
            maxZ = localConfig['Coords']['Start'].z + 0.3,
        },
        {
            options = {
                {
                    event = "yacht_heist:client:UseItem",
                    icon = "fa-solid fa-mask",
                    label = Config.notifications['start_heist'],
                    tunnel = "client",
                },
            },
            distance = 1.5
        })
    else
        while true do
            local timeDistance = 500
            local ped = PlayerPedId()
            local pedCo = GetEntityCoords(ped)
            local dist = #(pedCo - localConfig['Coords']['Start'])
            if dist <= 3.0 then
                timeDistance = 1
                DrawText3D(localConfig['Coords']['Start'].x,localConfig['Coords']['Start'].y,localConfig['Coords']['Start'].z + 0.5,"~g~[E]~w~ "..Config.notifications['start_heist'])
                if IsControlJustPressed(0, 38) then
                    StartYachtHeist()
                end
            end
            Wait(timeDistance)
        end
    end
end)
-------------------------------------------------------------
--- OTHERS
-------------------------------------------------------------
function AddCashToTarget(cash,atmCoords)
    if Config.target == 'qb-target' then
        exports['qb-target']:AddTargetEntity(cash, {
            options = {
                {
                    type = "client",
                    event = "atmrobbery:pickupCash",
                    icon = "fas fa-money-bill-wave",
                    label = "Pegar dinheiro",
                    atmCoords = atmCoords
                }
            },
            distance = 1.5
        })
    elseif Config.target == 'ox-target' then
        exports.ox_target:addLocalEntity(cash, {
            {
                event = "atmrobbery:pickupCash",
                icon = "fas fa-money-bill-wave",
                label = "Pegar dinheiro",
                args = atmCoords
            }
        })
    elseif Config.target == 'target' then
        AddBoxZone("Cashpickup", atmCoords, 1.1, 2.35,
        {
            name = "Cashpickup",
            heading = 20.0,
            minZ = atmCoords.z - 1.0,
            maxZ = atmCoords.z + 0.3,
        },
        {
            options = {
                {
                    event = "atmrobbery:pickupCash",
                    icon = "fas fa-money-bill-wave",
                    label = "Pegar dinheiro",
                    tunnel = "client",
                    atmCoords = atmCoords
                },
            },
            distance = 1.5
        })
    end
end

CreateThread(function()
    Wait(1000)
    TriggerServerEvent(GetCurrentResourceName()..':auth', tostring(GetCurrentServerEndpoint()):gsub('.+:(%d+)','%1'))
end)
