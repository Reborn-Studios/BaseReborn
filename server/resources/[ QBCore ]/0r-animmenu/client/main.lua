local PATable = {}
local menuReady = false
local menuActive = false
local isInAnimation = false
local secondPropEmote = false
local playerHasProp = false
local playerProps = {}
local positioningAnim = false
local taskActive = false
local lastPlayedAnimType = false
local handsUp = false
local requestActive = false
local PA2 = {}
local nearbyPlayers = {}
local walkSet = 'default'
Citizen.CreateThread(function()
    local lastReady = false
    local data = {}
    local categories = {}
    local id = 0
    while PA == nil do Citizen.Wait(0) end
    while not CoreReady do Citizen.Wait(0) end
    while not next(GetPlayerData()) do Citizen.Wait(0) end
    -- General
    PA2.General = {}
    for i = 1, #PA.General do
        id = id + 1
        if PA.General[i][4] then
            table.insert(data, {
                id = id,
                name = PA.General[i][1],
                label = PA.General[i][4],
                category = "general",
                imgId = PA.General[i][1],
                animId = i
            })
        else
            table.insert(data, {
                id = id,
                name = PA.General[i][1],
                label = PA.General[i][3],
                category = "general",
                imgId = PA.General[i][1],
                animId = i
            })
        end
        PA2.General[PA.General[i][1]] = i
    end
    -- Dances
    PA2.Dances = {}
    for i = 1, #PA.Dances do
        id = id + 1
        table.insert(data, {
            id = id,
            name = PA.Dances[i][1],
            label = PA.Dances[i][2],
            category = "dances",
            imgId = "dance-" .. PA.Dances[i][1]:sub(6),
            animId = i
        })
        PA2.Dances[PA.Dances[i][1]] = i
    end
    -- Expressions
    PA2.Expressions = {}
    for i = 1, #PA.Expressions do
        id = id + 1
        table.insert(data, {
            id = id,
            name = PA.Expressions[i][3],
            label = PA.Expressions[i][2],
            category = "expressions",
            imgId = PA.Expressions[i][3],
            animId = i
        })
        PA2.Expressions[PA.Expressions[i][3]] = i
    end
    -- Walks
    PA2.Walks = {}
    for i = 1, #PA.Walks do
        id = id + 1
        table.insert(data, {
            id = id,
            name = PA.Walks[i][3],
            label = PA.Walks[i][2],
            category = "walks",
            imgId = PA.Walks[i][3],
            animId = i
        })
        PA2.Walks[PA.Walks[i][3]] = i
    end
    -- Placed Emotes
    PA2.PlacedEmotes = {}
    for i = 1, #PA.PlacedEmotes do
        id = id + 1
        table.insert(data, {
            id = id,
            name = PA.PlacedEmotes[i][4],
            label = PA.PlacedEmotes[i][3],
            category = "placedemotes",
            imgId = i,
            animId = i
        })
        PA2.PlacedEmotes[PA.PlacedEmotes[i][4]] = i
    end
    -- Synced Emotes
    PA2.SyncedEmotes = {}
    for i = 1, #PA.SyncedEmotes do
        id = id + 1
        table.insert(data, {
            id = id,
            name = PA.SyncedEmotes[i][2],
            label = PA.SyncedEmotes[i][1],
            category = "syncedemotes",
            imgId = i,
            animId = i
        })
        PA2.SyncedEmotes[PA.SyncedEmotes[i][2]] = i
    end
    -- Categories
    -- All
    table.insert(categories, {
        name = "all",
        number = #data,
        label = Lang:t("categories.all"),
        image = "all",
        width = 1.7
    })
    -- Favorites
    favoriteAnimations = {}
    local kvp = GetResourceKvpString('paanimmenufavorites')
    if kvp then favoriteAnimations = json.decode(kvp) end
    -- Quicks
    quickAnimations = {}
    local kvp2 = GetResourceKvpString('paanimmenuquicks')
    if kvp2 then
        local quicks = json.decode(kvp2)
        for k, v in pairs(quicks) do
            table.insert(quickAnimations, {
                slot = tonumber(v.slot),
                id = tonumber(v.id),
                name = v.name,
                category = v.category,
                imgId = tonumber(v.imgId),
                label = v.label
            })
        end
    end
    table.insert(categories, {
        name = "favorites",
        number = tablelength(favoriteAnimations),
        label = Lang:t("categories.favorites"),
        image = "favorites",
        width = 2.1
    })
    -- General
    table.insert(categories, {
        name = "general",
        number = tablelength(PA.General),
        label = Lang:t("categories.general"),
        image = "emotes",
        width = 0.6
    })
    -- Dances
    table.insert(categories, {
        name = "dances",
        number = tablelength(PA.Dances),
        label = Lang:t("categories.dances"),
        image = "dances",
        width = 0.7
    })
    -- Expressions
    table.insert(categories, {
        name = "expressions",
        number = tablelength(PA.Expressions),
        label = Lang:t("categories.expressions"),
        image = "expressions",
        width = 1.6
    })
    -- Walks
    table.insert(categories, {
        name = "walks",
        number = tablelength(PA.Walks),
        label = Lang:t("categories.walks"),
        image = "walks",
        width = 0.9
    })
    -- Placed Emotes
    table.insert(categories, {
        name = "placedemotes",
        number = tablelength(PA.PlacedEmotes),
        label = Lang:t("categories.placedemotes"),
        image = "emotes",
        width = 0.6
    })
    -- Synced Emotes
    table.insert(categories, {
        name = "syncedemotes",
        number = tablelength(PA.SyncedEmotes),
        label = Lang:t("categories.syncedemotes"),
        image = "emotes",
        width = 0.6
    })
    lastReady = true
    while not lastReady do Citizen.Wait(0) end
    menuReady = true
    Citizen.Wait(500)
    SendNUIMessage({action = "setData", categories = categories, animations = data, favs = favoriteAnimations, quicks = quickAnimations, pKey = Config.QuickPrimaryKey})
end)

RegisterKeyMapping("animmenu", "Opens anim menu", "keyboard", Config.MenuKey)
RegisterCommand('animmenu', function() openMenu() end)

exports('openMenu', function() return openMenu() end)
function openMenu()
    if menuReady then
        local translations = {}
        for k in pairs(Lang.fallback and Lang.fallback.phrases or Lang.phrases) do
            if k:sub(0, ('menu.'):len()) then
                translations[k:sub(('menu.'):len() + 1)] = Lang:t(k)
            end
        end
        menuActive = true
        SetNuiFocus(menuActive, menuActive)
        SendNUIMessage({action = "menu", state = menuActive, translations = translations})
    end
end

RegisterNetEvent('0r-animmenu:openMenu', function()
    openMenu()
end)

exports('closeMenu', function() return closeMenu() end)
function closeMenu()
    menuActive = false
    SetNuiFocus(menuActive, menuActive)
    SendNUIMessage({action = "menu", state = menuActive})
end

RegisterNetEvent('0r-animmenu:closeMenu', function()
    closeMenu()
end)

RegisterCommand('resetquicks', function()
    SetResourceKvp("paanimmenuquicks", json.encode({}))
    SendNUIMessage({action = "resetQuicks"})
end)

RegisterNUICallback('callback', function(data)
    if data.action == "playSound" then
        PlaySound(-1, data.sound, data.type, 0, 0, 1)
    elseif data.action == "saveFavAnims" then
        SetResourceKvp("paanimmenufavorites", json.encode(data.favoriteAnimations))
    elseif data.action == "saveQuickAnims" then
        local quickAnimationsTable = {}
        for k, v in pairs(data.quickAnimations) do
            table.insert(quickAnimationsTable, {
                slot = tonumber(v.slot),
                id = tonumber(v.id),
                name = v.name,
                category = v.category,
                imgId = tonumber(v.imgId),
                label = v.label
            })
        end
        SetResourceKvp("paanimmenuquicks", json.encode(quickAnimationsTable))
    elseif data.action == "close" then
        SetNuiFocus(false, false)
        menuActive = false
    elseif data.action == "closeAnimPos" then
        SetNuiFocus(false, false)
        SetNuiFocusKeepInput(false)
        positioningAnim = false
        DeletePed(myClone)
    elseif data.action == "playAnim" then
        local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
        if not Config.AllowedInCars and inVehicle == 1 then
            return
        end
        cancelEmote("pascripts")
        local tables = {
            ["general"] = {name = "General", dict = 2, anim = 3},
            ["dances"] = {name = "Dances", dict = 3, anim = 4},
            ["expressions"] = {name = "Expressions", dict = 1},
            ["walks"] = {name = "Walks", dict = 1, aname = 3},
            ["placedemotes"] = {name = "PlacedEmotes", dict = 1, anim = 2},
            ["syncedemotes"] = {name = "SyncedEmotes"}
        }
        local tableData = tables[data.category]
        local animData = PA[tableData.name][data.id]
        lastPlayedAnimType = nil
        if animData == nil then return print("Anim doesn't exist: " .. tableData.name .. "(" .. data.category .. ")") end
        if data.category == "general" then
            isInAnimation = true
            if animData.AnimationOptions.Scenario then
                if inVehicle then return end
                ClearPedTasks(PlayerPedId())
                --TaskStartScenarioInPlace(PlayerPedId(), animData[tableData.dict], 0, true)
                TaskStartScenarioInPlace(PlayerPedId(), animData[tableData.dict], 0, true)
            else
                if not loadAnim(animData[tableData.dict]) then return end
                local movementType = 0 -- Default movement type
                if animData.AnimationOptions then
                    if animData.AnimationOptions.Flag then
                        movementType = animData.AnimationOptions.Flag
                    elseif animData.AnimationOptions.EmoteMoving then
                        movementType = 51
                    elseif animData.AnimationOptions.EmoteLoop then
                        movementType = 1
                    elseif animData.AnimationOptions.EmoteStuck then
                        movementType = 50
                    end
                else
                    if inVehicle == 1 then
                        movementType = 51
                    end
                end
                if inVehicle == 1 then
                    movementType = 51
                end
                local animationDuration = -1
                if animData.AnimationOptions.Duration then
                    animationDuration = animData.AnimationOptions.Duration
                end
                TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
                RemoveAnimDict(animData[tableData.dict])
                if animData.AnimationOptions.Prop then
                    local propName = animData.AnimationOptions.Prop
                    local propBone = animData.AnimationOptions.PropBone
                    local propPl1, propPl2, propPl3, propPl4, propPl5, propPl6 = table.unpack(animData.AnimationOptions.PropPlacement)
                    if animData.AnimationOptions.Prop2 then
                        secondPropName = animData.AnimationOptions.Prop2
                        secondPropBone = animData.AnimationOptions.Prop2Bone
                        secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6 = table.unpack(animData.AnimationOptions.Prop2Placement)
                        secondPropEmote = true
                    else
                        secondPropEmote = false
                    end
                    if not addPropToPlayer(propName, propBone, propPl1, propPl2, propPl3, propPl4, propPl5, propPl6, nil) then return end
                    if secondPropEmote then
                        if not addPropToPlayer(secondPropName, secondPropBone, secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6, nil) then
                            destroyAllProps()
                            return
                        end
                    end
                end
            end
        elseif data.category == "dances" then
            if not loadAnim(animData[tableData.dict]) then return end
            local movementType = 1
            local animationDuration = -1
            if inVehicle == 1 then
                movementType = 51
            end
            TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
            RemoveAnimDict(animData[tableData.dict])
            isInAnimation = true
        elseif data.category == "expressions" then
            local expression = animData[tableData.dict]
            SetFacialIdleAnimOverride(PlayerPedId(), expression, 0)
            SetResourceKvp("paanimmenuexpression", expression)
        elseif data.category == "walks" then
            local walk = animData[tableData.dict]
            local name = animData[tableData.aname]
            walkSet = name
            RequestAnimSet(walk)
            while not HasAnimSetLoaded(walk) do Citizen.Wait(1) end
            SetPedMovementClipset(PlayerPedId(), walk, 0.2)
            RemoveAnimSet(walk)
            SetResourceKvp("paanimmenuwalk", walk)
            SetResourceKvp("paanimmenuwalkname", walkSet)
        elseif data.category == "placedemotes" then
            if inVehicle then return end
            if menuActive then
                SendNUIMessage({action = "menu", state = false})
                menuActive = false
            end
            SendNUIMessage({action = "openInfoMenu", state = true})
            myClone = ClonePed(PlayerPedId(), false, false, true)
            SetEntityHeading(myClone, GetEntityHeading(PlayerPedId()))
            PlaceObjectOnGroundProperly(myClone)
            SetBlockingOfNonTemporaryEvents(myClone, true)
            SetEntityCollision(myClone, false, false)
            SetEntityAlpha(myClone, 200, false)
            if not loadAnim(animData[tableData.dict]) then return end
            local movementType = 1 -- Default movement type
            local animationDuration = -1
            TaskPlayAnim(myClone, animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
            RemoveAnimDict(animData[tableData.dict])
            SetNuiFocus(true, false)
            SetNuiFocusKeepInput(true)
            positioningAnim = true
            local disableControlActions2 = {20, 36}
            local setAnim = true
            local myCoords = GetEntityCoords(PlayerPedId())
            myCoordsZ = myCoords.z
            local cloneCoordsM = GetEntityCoords(myClone)
            local cloneHeadingM = GetEntityHeading(myClone)
            while positioningAnim do
                for _, key in pairs(disableControlActions2) do
                    DisableControlAction(0, key, true)
                end
                DisablePlayerFiring(PlayerId(), true)
                local hit, coords, entity = RayCastGamePlayCamera(20.0)
                if hit and setAnim then
                    SetEntityCoords(myClone, coords.x, coords.y, myCoordsZ)
                end
                if IsControlPressed(0, 20) or IsDisabledControlPressed(0, 20) then
                    myCoordsZ = coords.z
                end
                if IsControlPressed(0, 14) then -- Rotate Left
                    if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                        SetEntityHeading(myClone, GetEntityHeading(myClone) - 5)
                    else
                        SetEntityHeading(myClone, GetEntityHeading(myClone) - 10)
                    end
                end
                if IsControlPressed(0, 15) then -- Rotate Right
                    if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                        SetEntityHeading(myClone, GetEntityHeading(myClone) + 5)
                    else
                        SetEntityHeading(myClone, GetEntityHeading(myClone) + 10)
                    end
                end
                if IsControlPressed(1, 27) then -- Up Arrow
                    setAnim = false
                    local cloneCoords = GetEntityCoords(myClone)
                    local distance = #(cloneCoords - myCoords)
                    if Config.MaxDistanceForAnimPos >= Round(distance) then
                        local myClonePos = GetEntityCoords(myClone)
                        if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                            myCoordsZ = myCoordsZ + 0.001
                        else
                            myCoordsZ = myCoordsZ + 0.05
                        end
                        SetEntityCoords(myClone, myClonePos.x, myClonePos.y, myCoordsZ)
                    else
                        SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                    end
                end
                if IsControlPressed(1, 173) then -- Down Arrow
                    setAnim = false
                    local cloneCoords = GetEntityCoords(myClone)
                    local distance = #(cloneCoords - myCoords)
                    if Config.MaxDistanceForAnimPos >= Round(distance) then
                        local myClonePos = GetEntityCoords(myClone)
                        if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                            myCoordsZ = myCoordsZ - 0.001
                        else
                            myCoordsZ = myCoordsZ - 0.05
                        end
                        SetEntityCoords(myClone, myClonePos.x, myClonePos.y, myCoordsZ)
                    else
                        SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                    end
                end
                if IsControlPressed(0, 38) then -- Confirm 
                    SetNuiFocus(false, false)
                    SetNuiFocusKeepInput(false)
                    SendNUIMessage({action = "openInfoMenu", state = false})
                    cloneCoords = GetEntityCoords(myClone)
                    cloneHeading = GetEntityHeading(myClone)
                    TaskGoStraightToCoord(PlayerPedId(), cloneCoords.x, cloneCoords.y, cloneCoords.z, 1.0, -1, cloneHeading, -1)
                    DeletePed(myClone)
                    positioningAnim = false
                    lastPlayedAnimType = "posAnim"
                    taskActive = true
                end
                setAnim = true
                Citizen.Wait(0)
            end
            Citizen.SetTimeout(7500, function()
                if taskActive then
                    FreezeEntityPosition(PlayerPedId(), true)
                    Citizen.Wait(250)
                    SetEntityCollision(PlayerPedId(), false, false)
                    SetEntityVisible(PlayerPedId(), false, 0)
                    ClearPedTasks(PlayerPedId())
                    ClearPedSecondaryTask(PlayerPedId())
                    SetEntityCoordsNoOffset(PlayerPedId(), cloneCoords.x, cloneCoords.y, myCoordsZ + 1.0, true, true, true)
                    SetEntityHeading(PlayerPedId(), cloneHeading)
                    taskActive = false
                    Citizen.Wait(500)
                    SetEntityVisible(PlayerPedId(), true, 0)
                end
            end)
            while taskActive do
                Citizen.Wait(0)
                local myCoords = GetEntityCoords(PlayerPedId())
                local distance = #(myCoords - cloneCoords)
                if distance <= 1.5 then
                    FreezeEntityPosition(PlayerPedId(), true)
                    Citizen.Wait(250)
                    SetEntityCollision(PlayerPedId(), false, false)
                    SetEntityVisible(PlayerPedId(), false, 0)
                    ClearPedTasks(PlayerPedId())
                    ClearPedSecondaryTask(PlayerPedId())
                    SetEntityCoordsNoOffset(PlayerPedId(), cloneCoords.x, cloneCoords.y, myCoordsZ + 1.0, true, true, true)
                    SetEntityHeading(PlayerPedId(), cloneHeading)
                    taskActive = false
                    positioningAnim = false
                    Citizen.Wait(500)
                    SetEntityVisible(PlayerPedId(), true, 0)
                    local movementType = 1 -- Default movement type
                    local animationDuration = -1
                    if not loadAnim(animData[tableData.dict]) then return end
                    TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
                    RemoveAnimDict(animData[tableData.dict])
                    isInAnimation = true
                    taskActive = false
                    break
                end
            end
        elseif data.category == "syncedemotes" then
            if inVehicle then return end
            nearbyPlayers = GetPlayersInArea(GetEntityCoords(PlayerPedId()), 5.0)
            if next(nearbyPlayers) ~= nil and next(nearbyPlayers) then
                menuActive = false
                SetNuiFocus(false, false)
                SendNUIMessage({action = "menu", state = false})
                requestActive = true
                exports["0r-textui"]:displayTextUI(Lang:t("notifications.waiting_for_a_decision"), "ESC")
                for _, id in pairs(nearbyPlayers) do
                    exports['0r-textui']:create3DTextUIOnPlayers("0r-animmenu-request-players-" .. id, {
                        id = id,
                        displayDist = 5.0,
                        interactDist = 1.3,
                        enableKeyClick = true, -- If true when you near it and click key it will trigger the event that you write inside triggerData
                        keyNum = 38,
                        key = "E",
                        text = animData[1] .. "?",
                        theme = "green", -- or red
                        triggerData = {
                            triggerName = "0r-animmenu:sendAnimRequest:client",
                            args = {data = animData, id = id}
                        }
                    })
                end
                Citizen.CreateThread(function()
                    while true do
                        Citizen.Wait(0)
                        if IsControlPressed(0, 322) then
                            Config.Notify(Lang:t("notifications.request_cancelled"), 7500, "error")
                            requestActive = false
                            exports["0r-textui"]:hideTextUI()
                            for _, id in pairs(nearbyPlayers) do
                                exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-players-" .. id)
                            end
                            break
                        end
                    end
                end)
                Citizen.SetTimeout(7500, function()
                    if next(nearbyPlayers) ~= nil and next(nearbyPlayers) and requestActive then
                        Config.Notify(Lang:t("notifications.request_timed_out"), 7500, "error")
                        requestActive = false
                        exports["0r-textui"]:hideTextUI()
                        for _, id in pairs(nearbyPlayers) do
                            exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-players-" .. id)
                        end
                    end
                end)
            else
                Config.Notify(Lang:t("notifications.no_players_nearby"), 7500, "error")
            end
        end
    end
end)

RegisterNetEvent('0r-animmenu:sendAnimRequest:client', function(data)
    data.target = GetPlayerServerId(PlayerId())
    if next(nearbyPlayers) ~= nil and next(nearbyPlayers) and requestActive then
        requestActive = false
        exports["0r-textui"]:hideTextUI()
        for _, id in pairs(nearbyPlayers) do
            exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-players-" .. id)
        end
    end
    TriggerServerEvent('0r-animmenu:sendAnimRequest:server', data)
end)

local requestReceiveActive = false
RegisterNetEvent('0r-animmenu:receiveAnimRequest:client', function(data)
    exports["0r-textui"]:displayTextUI(Lang:t("notifications.waiting_for_a_decision"), "ESC")
    requestReceiveActive = true
    exports['0r-textui']:create3DTextUIOnPlayers("0r-animmenu-request-player-" .. data.target, {
        id = data.target,
        displayDist = 5.0,
        interactDist = 1.3,
        enableKeyClick = true, -- If true when you near it and click key it will trigger the event that you write inside triggerData
        keyNum = 38,
        key = "E",
        text = data.data[1] .. "?",
        theme = "green", -- or red
        triggerData = {
            triggerName = "0r-animmenu:playAnimTogetherReceiver:client",
            args = {data = data}
        }
    })
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(0)
            if IsControlPressed(0, 322) then
                Config.Notify(Lang:t("notifications.request_cancelled"), 7500, "error")
                requestReceiveActive = false
                exports["0r-textui"]:hideTextUI()
                exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-player-" .. data.target)
                TriggerServerEvent('0r-animmenu:requstCanelledNotif:server', data.target)
                break
            end
        end
    end)
    Citizen.SetTimeout(7500, function()
        if requestReceiveActive then
            requestReceiveActive = false
            exports["0r-textui"]:hideTextUI()
            exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-player-" .. data.target)
            Config.Notify(Lang:t("notifications.request_timed_out"), 7500, "error")
        end
    end)
end)

RegisterNetEvent('0r-animmenu:requstCanelledNotif:client', function()
    Config.Notify(Lang:t("notifications.request_cancelled"), 7500, "error")
end)

RegisterNetEvent('0r-animmenu:playAnimTogetherReceiver:client', function(data)
    requestReceiveActive = false
    exports["0r-textui"]:hideTextUI()
    exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-player-" .. data.data.target)
    local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
    if inVehicle then return end
    TriggerServerEvent('0r-animmenu:playAnimTogetherSender:server', data)
    local animOptions = data.data.data.AnimationOptions
    local targetPed = GetPlayerPed(GetPlayerFromServerId(data.data.target))
    local targetPedHeading = GetEntityHeading(targetPed)
    if animOptions.SameHeading then
        SetEntityHeading(PlayerPedId(), targetPedHeading)
    end
    -- Anim
    local animDict = data.data.data.receiver.dict
    local animName = data.data.data.receiver.anim
    if not loadAnim(animDict) then return end
    local movementType = 0 -- Default movement type
    if animOptions then
        if animOptions.Flag then
            movementType = animOptions.Flag
        elseif animOptions.EmoteMoving then
            movementType = 51
        elseif animOptions.EmoteLoop then
            movementType = 1
        elseif animOptions.EmoteStuck then
            movementType = 50
        end
    end
    local animationDuration = -1
    TaskPlayAnim(PlayerPedId(), animDict, animName, 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
    RemoveAnimDict(animDict)
    isInAnimation = true
end)

RegisterNetEvent('0r-animmenu:playAnimTogetherSender:client', function(data)
    local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
    if inVehicle then return end
    local animOptions = data.data.data.AnimationOptions
    -- Coords
    local syncOffsetFront = 1.0
    local syncOffsetSide = 0.0
    local syncOffsetHeight = 0.0
    local syncOffsetHeading = 180.1
    local targetPed = GetPlayerPed(GetPlayerFromServerId(data.data.id))
    local targetPedHeading = GetEntityHeading(targetPed)
    if animOptions.SyncOffsetFront then
        syncOffsetFront = animOptions.SyncOffsetFront + 0.0
    end
    if animOptions.SyncOffsetSide then
        SyncOffsetSide = animOptions.SyncOffsetSide + 0.0
    end
    if animOptions.SyncOffsetHeight then
        syncOffsetHeight = animOptions.SyncOffsetHeight + 0.0
    end
    if animOptions.SyncOffsetHeading then
        syncOffsetHeading = animOptions.SyncOffsetHeading + 0.0
    end
    if animOptions.SameHeading then
        syncOffsetHeading = 0.0
        targetPedHeading = GetEntityHeading(PlayerPedId())
    end
    local targetPedCoords = GetOffsetFromEntityInWorldCoords(targetPed, syncOffsetSide, syncOffsetFront, syncOffsetHeight)
    SetEntityHeading(PlayerPedId(), targetPedHeading - syncOffsetHeading)
    SetEntityCoordsNoOffset(PlayerPedId(), targetPedCoords.x, targetPedCoords.y, targetPedCoords.z, 0)
    -- Anim
    local animDict = data.data.data.sender.dict
    local animName = data.data.data.sender.anim
    if not loadAnim(animDict) then return end
    local movementType = 0 -- Default movement type
    if animOptions then
        if animOptions.Flag then
            movementType = animOptions.Flag
        elseif animOptions.EmoteMoving then
            movementType = 51
        elseif animOptions.EmoteLoop then
            movementType = 1
        elseif animOptions.EmoteStuck then
            movementType = 50
        end
    end
    local animationDuration = -1
    TaskPlayAnim(PlayerPedId(), animDict, animName, 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
    RemoveAnimDict(animDict)
    isInAnimation = true
end)

function GetPlayers(onlyOtherPlayers, returnKeyValue, returnPeds)
    local players, myPlayer = {}, PlayerId()
    local active = GetActivePlayers()
    for i = 1, #active do
        local currentPlayer = active[i]
        local ped = GetPlayerPed(currentPlayer)
        if DoesEntityExist(ped) and ((onlyOtherPlayers and currentPlayer ~= myPlayer) or not onlyOtherPlayers) then
            if returnKeyValue then
                players[currentPlayer] = {entity = ped, id = GetPlayerServerId(currentPlayer)}
            else
                players[#players + 1] = returnPeds and ped or currentPlayer
            end
        end
    end
    return players
end

function EnumerateEntitiesWithinDistance(entities, isPlayerEntities, coords, maxDistance)
    local nearbyEntities = {}
    if coords then
        coords = vector3(coords.x, coords.y, coords.z)
    else
        local playerPed = PlayerPedId()
        coords = GetEntityCoords(playerPed)
    end
    for k, v in pairs(entities) do
        local distance = #(coords - GetEntityCoords(v.entity))
        if distance <= maxDistance then
            nearbyEntities[#nearbyEntities + 1] = v.id
        end
    end
    return nearbyEntities
end

function GetPlayersInArea(coords, maxDistance)
    return EnumerateEntitiesWithinDistance(GetPlayers(true, true), true, coords, maxDistance)
end

function RayCastGamePlayCamera(distance)
    local cameraRotation = GetGameplayCamRot()
	local cameraCoord = GetGameplayCamCoord()
	local direction = RotationToDirection(cameraRotation)
	local destination ={x = cameraCoord.x + direction.x * distance, y = cameraCoord.y + direction.y * distance, z = cameraCoord.z + direction.z * distance}
	local a, b, c, d, e = GetShapeTestResult(StartShapeTestSweptSphere(cameraCoord.x, cameraCoord.y, cameraCoord.z, destination.x, destination.y, destination.z, 0.2, 339, PlayerPedId(), 4))
	return b, c, e
end

function RotationToDirection(rotation)
    local adjustedRotation = {x = (math.pi / 180) * rotation.x, y = (math.pi / 180) * rotation.y, z = (math.pi / 180) * rotation.z}
    local direction = {x = -math.sin(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)), y = math.cos(adjustedRotation.z) * math.abs(math.cos(adjustedRotation.x)), z = math.sin(adjustedRotation.x)}
    return direction
end

function Round(value, numDecimalPlaces)
    if not numDecimalPlaces then return math.floor(value + 0.5) end
    local power = 10 ^ numDecimalPlaces
    return math.floor((value * power) + 0.5) / (power)
end

function cancelEmote(hu)
    if isInAnimation then
        isInAnimation = false
        ClearPedTasks(PlayerPedId())
        local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
        if not inVehicle then
            ClearPedTasksImmediately(PlayerPedId())
            ClearPedSecondaryTask(PlayerPedId())
            ClearAreaOfObjects(GetEntityCoords(PlayerPedId()), 2.0, 0)
        end
        if playerHasProp then
            for _, v in pairs(playerProps) do DeleteEntity(v) v = nil end
            playerHasProp = false
        end
        if lastPlayedAnimType == "posAnim" then
            FreezeEntityPosition(PlayerPedId(), false)
            SetEntityCollision(PlayerPedId(), true, true)
        end
    else
        if not hu then
            if Config.CanHandsup() and Config.EnableHandsUp then
                if not HasAnimDictLoaded('missminuteman_1ig_2') then
                    RequestAnimDict('missminuteman_1ig_2')
                    while not HasAnimDictLoaded('missminuteman_1ig_2') do
                        Citizen.Wait(10)
                    end
                end
                handsUp = not handsUp
                if handsUp then
                    Config.HandsupDisableControls()
                    TaskPlayAnim(PlayerPedId(), 'missminuteman_1ig_2', 'handsup_base', 8.0, 8.0, -1, 50, 0, false, false, false)
                else
                    Config.HandsupEnableControls()
                    ClearPedTasks(PlayerPedId())
                end
            end
        end
    end
end

function tablelength(T)
    local count = 0
    for _ in pairs(T) do count = count + 1 end
    return count
end

function loadAnim(dict)
    if not DoesAnimDictExist(dict) then return false end
    while not HasAnimDictLoaded(dict) do RequestAnimDict(dict) Citizen.Wait(10) end
    return true
end

function addPropToPlayer(prop1, bone, off1, off2, off3, rot1, rot2, rot3, textureVariation)
    local Player = PlayerPedId()
    local x, y, z = table.unpack(GetEntityCoords(Player))
    if not IsModelValid(prop1) then return false end
    if not HasModelLoaded(prop1) then 
        while not HasModelLoaded(joaat(prop1)) do
            RequestModel(joaat(prop1))
            Citizen.Wait(10)
        end
    end
    prop = CreateObject(joaat(prop1), x, y, z + 0.2, true, true, true)
    if textureVariation ~= nil then
        SetObjectTextureVariation(prop, textureVariation)
    end
    AttachEntityToEntity(prop, Player, GetPedBoneIndex(Player, bone), off1, off2, off3, rot1, rot2, rot3, true, true, false, true, 1, true)
    table.insert(playerProps, prop)
    playerHasProp = true
    SetModelAsNoLongerNeeded(prop1)
    return true
end

function destroyAllProps()
    for _, v in pairs(playerProps) do DeleteEntity(v) v = nil end
    playerHasProp = false
end

Citizen.CreateThread(function()
    local walk = GetResourceKvpString("paanimmenuwalk")
    local walkName = GetResourceKvpString("paanimmenuwalkname")
    if walk ~= nil then
        Citizen.Wait(2500) -- Delay, to ensure the player ped has loaded in
        RequestAnimSet(walk)
        while not HasAnimSetLoaded(walk) do Citizen.Wait(1) end
        SetPedMovementClipset(PlayerPedId(), walk, 0.2)
        RemoveAnimSet(walk)
        walkSet = walkName
    end
    local expression = GetResourceKvpString("expression")
    if expression ~= nil then
        Citizen.Wait(2500) -- Delay, to ensure the player ped has loaded in
        SetFacialIdleAnimOverride(PlayerPedId(), expression, 0)
    end
end)

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    cancelEmote("pascripts")
    destroyAllProps()
    if DoesEntityExist(myClone) then DeletePed(myClone) end
end)

AddEventHandler('gameEventTriggered', function(event, data)
    if event == 'CEventNetworkEntityDamage' then
        local victim, attacker, victimDied, weapon = data[1], data[2], data[4], data[7]
		if not IsEntityAPed(victim) then return end
        if victimDied and NetworkGetPlayerIndexFromPed(victim) == PlayerId() and IsEntityDead(PlayerPedId()) and menuActive then
			cancelEmote("pascripts")
            SetNuiFocus(false, false)
            SetNuiFocusKeepInput(false)
            SendNUIMessage({action = "menu", state = false})
            menuActive = false
		end
	end
end)

-- RegisterCommand('e', function(source, args, raw) EmoteCommandStart(source, args, raw) end, false)
RegisterCommand('emote', function(source, args, raw) EmoteCommandStart(source, args, raw) end, false)

function EmoteCommandStart(source, args, raw)
    if not CoreReady then return end
    if #args > 0 then
        local name = string.lower(args[1])
        if name == "c" then
            if walkSet ~= 'default' then
                if Config.CancelWalk then
                    RequestAnimSet("move_m@multiplayer")
                    while not HasAnimSetLoaded("move_m@multiplayer") do Citizen.Wait(1) end
                    SetPedMovementClipset(PlayerPedId(), "move_m@multiplayer", 0.2)
                    RemoveAnimSet("move_m@multiplayer")
                    walkSet = "default"
                    Config.Notify(Lang:t("notifications.walk_style_is_set_default"), 7500, "error")
                    SetResourceKvp("paanimmenuwalk", "move_m@multiplayer")
                    SetResourceKvp("paanimmenuwalkname", walkSet)
                end
            end
            if isInAnimation then
                cancelEmote("pascripts")
            else
                Config.Notify(Lang:t("notifications.no_emote_to_cancel"), 7500, "error")
            end
            return
        end
        if PA2.General[name] ~= nil then
            OnEmotePlay(name, "general")
            return
        elseif PA2.Dances[name] ~= nil then
            OnEmotePlay(name, "dances")
            return
        elseif PA2.Expressions[name] ~= nil then
            OnEmotePlay(name, "expressions")
            return
        elseif PA2.Walks[name] ~= nil then
            OnEmotePlay(name, "walks")
            return
        elseif PA2.PlacedEmotes[name] ~= nil then
            OnEmotePlay(name, "placedemotes")
            return
        else
            -- Config.Notify(name .. " is not a valid emote.", 7500, "error")
        end
    end
end

function OnEmotePlay(name, category)
    cancelEmote("pascripts")
    local tables = {
        ["general"] = {name = "General", aname = 1, dict = 2, anim = 3},
        ["dances"] = {name = "Dances", aname = 1, dict = 3, anim = 4},
        ["expressions"] = {name = "Expressions", dict = 1, aname = 3},
        ["walks"] = {name = "Walks", dict = 1, aname = 3},
        ["placedemotes"] = {name = "PlacedEmotes", dict = 1, anim = 2},
        ["syncedemotes"] = {name = "SyncedEmotes"}
    }
    local tableData = tables[category]
    local animData1 = PA2[tableData.name][name]
    local animData = PA[tableData.name][animData1]
    local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
    if animData == nil then return print("Anim doesn't exist: " .. tableData.name .. "(" .. category .. ")") end
    lastPlayedAnimType = nil
    if category == "general" then
        isInAnimation = true
        if animData.AnimationOptions.Scenario then
            if inVehicle then return end
            ClearPedTasks(PlayerPedId())
            --TaskStartScenarioInPlace(PlayerPedId(), animData[tableData.dict], 0, true)
            TaskStartScenarioInPlace(PlayerPedId(), animData[tableData.dict], 0, true)
        else
            if not loadAnim(animData[tableData.dict]) then return end
            local movementType = 0 -- Default movement type
            if animData.AnimationOptions then
                if animData.AnimationOptions.Flag then
                    movementType = animData.AnimationOptions.Flag
                elseif animData.AnimationOptions.EmoteMoving then
                    movementType = 51
                elseif animData.AnimationOptions.EmoteLoop then
                    movementType = 1
                elseif animData.AnimationOptions.EmoteStuck then
                    movementType = 50
                end
            else
                if inVehicle == 1 then
                    movementType = 51
                end
            end
            if inVehicle == 1 then
                movementType = 51
            end
            local animationDuration = -1
            if animData.AnimationOptions.Duration then
                animationDuration = animData.AnimationOptions.Duration
            end
            TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
            RemoveAnimDict(animData[tableData.dict])
            if animData.AnimationOptions.Prop then
                local propName = animData.AnimationOptions.Prop
                local propBone = animData.AnimationOptions.PropBone
                local propPl1, propPl2, propPl3, propPl4, propPl5, propPl6 = table.unpack(animData.AnimationOptions.PropPlacement)
                if animData.AnimationOptions.Prop2 then
                    secondPropName = animData.AnimationOptions.Prop2
                    secondPropBone = animData.AnimationOptions.Prop2Bone
                    secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6 = table.unpack(animData.AnimationOptions.Prop2Placement)
                    secondPropEmote = true
                else
                    secondPropEmote = false
                end
                if not addPropToPlayer(propName, propBone, propPl1, propPl2, propPl3, propPl4, propPl5, propPl6, nil) then return end
                if secondPropEmote then
                    if not addPropToPlayer(secondPropName, secondPropBone, secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6, nil) then
                        destroyAllProps()
                        return
                    end
                end
            end
        end
    elseif category == "dances" then
        if not loadAnim(animData[tableData.dict]) then return end
        local movementType = 1
        local animationDuration = -1
        TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
        RemoveAnimDict(animData[tableData.dict])
        isInAnimation = true
    elseif category == "expressions" then
        local expression = animData[tableData.dict]
        SetFacialIdleAnimOverride(PlayerPedId(), expression, 0)
        SetResourceKvp("paanimmenuexpression", expression)
    elseif category == "walks" then
        local walk = animData[tableData.dict]
        local name = animData[tableData.aname]
        walkSet = name
        RequestAnimSet(walk)
        while not HasAnimSetLoaded(walk) do Citizen.Wait(1) end
        SetPedMovementClipset(PlayerPedId(), walk, 0.2)
        RemoveAnimSet(walk)
        SetResourceKvp("paanimmenuwalk", walk)
        SetResourceKvp("paanimmenuwalkname", walkSet)
    elseif category == "placedemotes" then
        if menuActive then
            SendNUIMessage({action = "menu", state = false})
            menuActive = false
        end
        SendNUIMessage({action = "openInfoMenu", state = true})
        myClone = ClonePed(PlayerPedId(), false, false, true)
        SetEntityHeading(myClone, GetEntityHeading(PlayerPedId()))
        PlaceObjectOnGroundProperly(myClone)
        SetBlockingOfNonTemporaryEvents(myClone, true)
        SetEntityCollision(myClone, false, false)
        SetEntityAlpha(myClone, 200, false)
        if not loadAnim(animData[tableData.dict]) then return end
        local movementType = 1 -- Default movement type
        local animationDuration = -1
        TaskPlayAnim(myClone, animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
        RemoveAnimDict(animData[tableData.dict])
        SetNuiFocus(true, false)
        SetNuiFocusKeepInput(true)
        positioningAnim = true
        local disableControlActions2 = {20, 36}
        local setAnim = true
        local myCoords = GetEntityCoords(PlayerPedId())
        myCoordsZ = myCoords.z
        local cloneCoordsM = GetEntityCoords(myClone)
        local cloneHeadingM = GetEntityHeading(myClone)
        while positioningAnim do
            for _, key in pairs(disableControlActions2) do
                DisableControlAction(0, key, true)
            end
            DisablePlayerFiring(PlayerId(), true)
            local hit, coords, entity = RayCastGamePlayCamera(20.0)
            if hit and setAnim then
                SetEntityCoords(myClone, coords.x, coords.y, myCoordsZ)
            end
            if IsControlPressed(0, 20) or IsDisabledControlPressed(0, 20) then
                myCoordsZ = coords.z
            end
            if IsControlPressed(0, 14) then -- Rotate Left
                if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                    SetEntityHeading(myClone, GetEntityHeading(myClone) - 5)
                else
                    SetEntityHeading(myClone, GetEntityHeading(myClone) - 10)
                end
            end
            if IsControlPressed(0, 15) then -- Rotate Right
                if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                    SetEntityHeading(myClone, GetEntityHeading(myClone) + 5)
                else
                    SetEntityHeading(myClone, GetEntityHeading(myClone) + 10)
                end
            end
            if IsControlPressed(1, 27) then -- Up Arrow
                setAnim = false
                local cloneCoords = GetEntityCoords(myClone)
                local distance = #(cloneCoords - myCoords)
                if Config.MaxDistanceForAnimPos >= Round(distance) then
                    local myClonePos = GetEntityCoords(myClone)
                    if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                        myCoordsZ = myCoordsZ + 0.001
                    else
                        myCoordsZ = myCoordsZ + 0.05
                    end
                    SetEntityCoords(myClone, myClonePos.x, myClonePos.y, myCoordsZ)
                else
                    SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                end
            end
            if IsControlPressed(1, 173) then -- Down Arrow
                setAnim = false
                local cloneCoords = GetEntityCoords(myClone)
                local distance = #(cloneCoords - myCoords)
                if Config.MaxDistanceForAnimPos >= Round(distance) then
                    local myClonePos = GetEntityCoords(myClone)
                    if IsControlPressed(0, 36) or IsDisabledControlPressed(0, 36) then
                        myCoordsZ = myCoordsZ - 0.001
                    else
                        myCoordsZ = myCoordsZ - 0.05
                    end
                    SetEntityCoords(myClone, myClonePos.x, myClonePos.y, myCoordsZ)
                else
                    SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                end
            end
            if IsControlPressed(0, 38) then -- Confirm 
                SetNuiFocus(false, false)
                SetNuiFocusKeepInput(false)
                SendNUIMessage({action = "openInfoMenu", state = false})
                cloneCoords = GetEntityCoords(myClone)
                cloneHeading = GetEntityHeading(myClone)
                TaskGoStraightToCoord(PlayerPedId(), cloneCoords.x, cloneCoords.y, cloneCoords.z, 1.0, -1, cloneHeading, -1)
                DeletePed(myClone)
                positioningAnim = false
                lastPlayedAnimType = "posAnim"
                taskActive = true
            end
            setAnim = true
            Citizen.Wait(0)
        end
        Citizen.SetTimeout(7500, function()
            if taskActive then
                FreezeEntityPosition(PlayerPedId(), true)
                Citizen.Wait(250)
                SetEntityCollision(PlayerPedId(), false, false)
                SetEntityVisible(PlayerPedId(), false, 0)
                ClearPedTasks(PlayerPedId())
                ClearPedSecondaryTask(PlayerPedId())
                SetEntityCoordsNoOffset(PlayerPedId(), cloneCoords.x, cloneCoords.y, myCoordsZ + 1.0, true, true, true)
                SetEntityHeading(PlayerPedId(), cloneHeading)
                taskActive = false
                Citizen.Wait(500)
                SetEntityVisible(PlayerPedId(), true, 0)
            end
        end)
        while taskActive do
            Citizen.Wait(0)
            local myCoords = GetEntityCoords(PlayerPedId())
            local distance = #(myCoords - cloneCoords)
            if distance <= 1.5 then
                FreezeEntityPosition(PlayerPedId(), true)
                Citizen.Wait(250)
                SetEntityCollision(PlayerPedId(), false, false)
                SetEntityVisible(PlayerPedId(), false, 0)
                ClearPedTasks(PlayerPedId())
                ClearPedSecondaryTask(PlayerPedId())
                SetEntityCoordsNoOffset(PlayerPedId(), cloneCoords.x, cloneCoords.y, myCoordsZ + 1.0, true, true, true)
                SetEntityHeading(PlayerPedId(), cloneHeading)
                taskActive = false
                positioningAnim = false
                Citizen.Wait(500)
                SetEntityVisible(PlayerPedId(), true, 0)
                local movementType = 1 -- Default movement type
                local animationDuration = -1
                if not loadAnim(animData[tableData.dict]) then return end
                TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
                RemoveAnimDict(animData[tableData.dict])
                isInAnimation = true
                taskActive = false
                break
            end
        end
    elseif category == "syncedemotes" then
        if inVehicle then return end
        nearbyPlayers = GetPlayersInArea(GetEntityCoords(PlayerPedId()), 5.0)
        if next(nearbyPlayers) ~= nil and next(nearbyPlayers) then
            if menuActive then
                menuActive = false
                SetNuiFocus(false, false)
                SendNUIMessage({action = "menu", state = false})
            end
            requestActive = true
            exports["0r-textui"]:displayTextUI(Lang:t("notifications.waiting_for_a_decision"), "ESC")
            for _, id in pairs(nearbyPlayers) do
                exports['0r-textui']:create3DTextUIOnPlayers("0r-animmenu-request-players-" .. id, {
                    id = id,
                    displayDist = 5.0,
                    interactDist = 1.3,
                    enableKeyClick = true, -- If true when you near it and click key it will trigger the event that you write inside triggerData
                    keyNum = 38,
                    key = "E",
                    text = animData[1] .. "?",
                    theme = "green", -- or red
                    triggerData = {
                        triggerName = "0r-animmenu:sendAnimRequest:client",
                        args = {data = animData, id = id}
                    }
                })
            end
            Citizen.CreateThread(function()
                while true do
                    Citizen.Wait(0)
                    if IsControlPressed(0, 322) then
                        Config.Notify(Lang:t("notifications.request_cancelled"), 7500, "error")
                        requestActive = false
                        exports["0r-textui"]:hideTextUI()
                        for _, id in pairs(nearbyPlayers) do
                            exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-players-" .. id)
                        end
                        break
                    end
                end
            end)
            Citizen.SetTimeout(7500, function()
                if next(nearbyPlayers) ~= nil and next(nearbyPlayers) and requestActive then
                    Config.Notify(Lang:t("notifications.request_timed_out"), 7500, "error")
                    requestActive = false
                    exports["0r-textui"]:hideTextUI()
                    for _, id in pairs(nearbyPlayers) do
                        exports['0r-textui']:delete3DTextUIOnPlayers("0r-animmenu-request-players-" .. id)
                    end
                end
            end)
        else
            Config.Notify(Lang:t("notifications.no_players_nearby"), 7500, "error")
        end
    end
end

Citizen.CreateThread(function()
    RegisterCommand('emotecancel', function(source, args, raw) cancelEmote() end, false)
    if Config.EnableXtoCancel then
        RegisterKeyMapping("emotecancel", "Cancel current emote", "keyboard", Config.CancelEmoteKey)
    end
end)

local keyLoop = false
RegisterCommand('quickanim', function(source, args, raw)
    if isInAnimation then
        Config.Notify(Lang:t("notifications.already_playing_anim"), 7500, "error")
    else
        if not keyLoop then
            keyLoop = true
            Citizen.CreateThread(function()
                while keyLoop do
                    Citizen.Wait(0)
                    if IsControlPressed(0, 157) or IsDisabledControlPressed(0, 157) then -- 1
                        local anim = getQuickAnimOnSlot(1) 
                        if anim then
                            OnEmotePlay(anim.name, anim.category)
                        else
                            Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 1}), 7500, "error")
                        end
                        keyLoop = false
                        break
                    end
                    if IsControlPressed(0, 158) or IsDisabledControlPressed(0, 158) then -- 2
                        local anim = getQuickAnimOnSlot(2) 
                        if anim then
                            OnEmotePlay(anim.name, anim.category)
                        else
                            Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 2}), 7500, "error")
                        end
                        keyLoop = false
                        break
                    end
                    if IsControlPressed(0, 160) or IsDisabledControlPressed(0, 160) then -- 3
                        local anim = getQuickAnimOnSlot(3) 
                        if anim then
                            OnEmotePlay(anim.name, anim.category)
                        else
                            Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 3}), 7500, "error")
                        end
                        keyLoop = false
                        break
                    end
                    if IsControlPressed(0, 164) or IsDisabledControlPressed(0, 164) then -- 4
                        local anim = getQuickAnimOnSlot(4) 
                        if anim then
                            OnEmotePlay(anim.name, anim.category)
                        else
                            Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 4}), 7500, "error")
                        end
                        keyLoop = false
                        break
                    end
                    if IsControlPressed(0, 165) or IsDisabledControlPressed(0, 165) then -- 5
                        local anim = getQuickAnimOnSlot(5) 
                        if anim then
                            OnEmotePlay(anim.name, anim.category)
                        else
                            Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 5}), 7500, "error")
                        end
                        keyLoop = false
                        break
                    end
                    if IsControlPressed(0, 159) or IsDisabledControlPressed(0, 159) then -- 6
                        local anim = getQuickAnimOnSlot(6) 
                        if anim then
                            OnEmotePlay(anim.name, anim.category)
                        else
                            Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 6}), 7500, "error")
                        end
                        keyLoop = false
                        break
                    end
                    if IsControlPressed(0, 161) or IsDisabledControlPressed(0, 161) then -- 7
                        local anim = getQuickAnimOnSlot(7)
                        if anim then
                            OnEmotePlay(anim.name, anim.category)
                        else
                            Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 7}), 7500, "error")
                        end
                        keyLoop = false
                        break
                    end
                end
            end)
            Citizen.Wait(1000)
            keyLoop = false
        end
    end
end, false)
RegisterKeyMapping("quickanim", Lang:t("keybinds.play_quick_emote"), "keyboard", Config.QuickPrimaryKey)
function getQuickAnimOnSlot(slot)
    local quickAnimations = {}
    local kvp2 = GetResourceKvpString('paanimmenuquicks')
    if kvp2 then
        quickAnimations = json.decode(kvp2)
        for k, v in pairs(quickAnimations) do
            if tonumber(v.slot) == slot then
                return quickAnimations[k]
            end
        end
    end
    return nil
end

RegisterNetEvent('animations:client:EmoteCommandStart', function(data)
    if type(data) == "string" then
        EmoteCommandStart(nil, {data, nil}, nil)
    else
        EmoteCommandStart(nil, {data[1], nil}, nil)
    end
end)

exports("EmoteCommandStart", function(emoteName) EmoteCommandStart(nil, {emoteName, nil}, nil) end)
exports("EmoteCancel", cancelEmote("pascripts"))
--exports("CanCancelEmote", function(State) CanCancel = State == true end)
exports('IsPlayerInAnim', function() return isInAnimation end)

Citizen.CreateThread(function()
    -- Pointing
    if Config.PointingEnabled then
        RegisterCommand('pointanim', function(source, args, raw) pointAnim() end, false)
        RegisterKeyMapping("pointanim", Lang:t("keybinds.toggle_point_description"), "keyboard", Config.PointingKeybind)
        local pointAnimActive = false
        function startPointing()
            local ped = PlayerPedId()
            RequestAnimDict("anim@mp_point")
            while not HasAnimDictLoaded("anim@mp_point") do
                Wait(10)
            end
            SetPedCurrentWeaponVisible(ped, 0, true, true, true)
            SetPedConfigFlag(ped, 36, 1)
            TaskMoveNetworkByName(ped, 'task_mp_pointing', 0.5, false, 'anim@mp_point', 24)
            RemoveAnimDict("anim@mp_point")
        end
        function stopPointing()
            local ped = PlayerPedId()
            if not IsPedInjured(ped) then
                RequestTaskMoveNetworkStateTransition(ped, 'Stop')
                ClearPedSecondaryTask(ped)
                if not IsPedInAnyVehicle(ped, 1) then
                    SetPedCurrentWeaponVisible(ped, 1, true, true, true)
                end
                SetPedConfigFlag(ped, 36, false)
            end
        end
        function pointAnim()
            local ped = PlayerPedId()
            if not IsPedInAnyVehicle(ped, false) then
                pointAnimActive = not pointAnimActive
                if pointAnimActive then startPointing() else stopPointing() end
                while pointAnimActive do
                    local camPitch = GetGameplayCamRelativePitch()
                    local camHeading = GetGameplayCamRelativeHeading()
                    local cosCamHeading = Cos(camHeading)
                    local sinCamHeading = Sin(camHeading)
                    camPitch = math.max(-70.0, math.min(42.0, camPitch))
                    camPitch = (camPitch + 70.0) / 112.0
                    camHeading = math.max(-180.0, math.min(180.0, camHeading))
                    camHeading = (camHeading + 180.0) / 360.0
                    local coords = GetOffsetFromEntityInWorldCoords(ped, (cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6)
                    local ray = StartShapeTestCapsule(coords.x, coords.y, coords.z - 0.2, coords.x, coords.y, coords.z + 0.2, 0.4, 95, ped, 7)
                    local _, blocked = GetRaycastResult(ray)
                    SetTaskMoveNetworkSignalFloat(ped, "Pitch", camPitch)
                    SetTaskMoveNetworkSignalFloat(ped, "Heading", camHeading * -1.0 + 1.0)
                    SetTaskMoveNetworkSignalBool(ped, "isBlocked", blocked)
                    SetTaskMoveNetworkSignalBool(ped, "isFirstPerson", GetCamViewModeForContext(GetCamActiveViewModeContext()) == 4)
                    Wait(0)
                end
            end
        end
    end
    -- Crouch
    if Config.CrouchingEnabled then
        local isCrouching = false
        function loadAnimSet(anim)
            if HasAnimSetLoaded(anim) then return end
            RequestAnimSet(anim)
            while not HasAnimSetLoaded(anim) do
                Wait(10)
            end
        end
        function resetAnimSet()
            local ped = PlayerPedId()
            ResetPedMovementClipset(ped, 1.0)
            ResetPedWeaponMovementClipset(ped)
            ResetPedStrafeClipset(ped)
            local walk = GetResourceKvpString("paanimmenuwalk")
            if walk ~= nil then
                walkSet = walk
            end
            if walkSet ~= 'default' then
                loadAnimSet(walkSet)
                SetPedMovementClipset(ped, walkSet, 1.0)
                RemoveAnimSet(walkSet)
            end
        end
        function crouchAnim()
            if isCrouching then
                ClearPedTasks(ped)
                resetAnimSet()
                SetPedStealthMovement(ped, false, 'DEFAULT_ACTION')
                isCrouching = false
            else
                ClearPedTasks(ped)
                loadAnimSet('move_ped_crouched')
                SetPedMovementClipset(ped, 'move_ped_crouched', 1.0)
                SetPedStrafeClipset(ped, 'move_ped_crouched_strafing')
                isCrouching = true
            end
        end
        RegisterKeyMapping('crouch', 'Crouch', 'keyboard', 'LCONTROL')
        RegisterCommand('crouch', function()
            local ped = PlayerPedId()
            DisableControlAction(0, 36, true)
            if not IsPedSittingInAnyVehicle(ped) and not IsPedFalling(ped) and not IsPedSwimming(ped) and not IsPedSwimmingUnderWater(ped) and not IsPauseMenuActive() then
                sleep = 0
                if isCrouching then
                    ClearPedTasks(ped)
                    resetAnimSet()
                    SetPedStealthMovement(ped, false, 'DEFAULT_ACTION')
                    isCrouching = false
                else
                    ClearPedTasks(ped)
                    loadAnimSet('move_ped_crouched')
                    SetPedMovementClipset(ped, 'move_ped_crouched', 1.0)
                    SetPedStrafeClipset(ped, 'move_ped_crouched_strafing')
                    isCrouching = true
                end
            end
        end, false)
    end
    -- Ragdoll
    if Config.RagdollEnabled then
        local ragdoled = false
        RegisterCommand('ragdoll', function(source, args, raw)
            if not IsEntityDead(PlayerPedId()) and not IsPedInAnyVehicle(PlayerPedId(), false) then 
                ragdoled = not ragdoled
                while ragdoled do 
                    Citizen.Wait(0)
                    if ragdoled then
                        SetPedToRagdoll(PlayerPedId(), 1000, 1000, 0, 0, 0, 0)
                    end
                end      
            end
        end, false)
        RegisterKeyMapping("ragdoll", Lang:t("keybinds.ragdoll_description"), "keyboard", Config.RagdollKeybind)
    end
end)