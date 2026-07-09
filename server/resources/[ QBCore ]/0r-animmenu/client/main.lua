function tablelength(T)
    local count = 0
    for _ in pairs(T) do count = count + 1 end
    return count
end

local menuReady = false
local menuActive = false
local nuiReady = false
local RES2 = {}
local data = {}
local categories = {}
local setDataState = false
local currentAnimData = {}
local playerProps = {}
local playerHasProp = false
local isInAnimation = false
local lastPlayedAnimType = nil
local positioningAnim = false
local handsUp = false
local PtfxNotif = false
local PtfxPrompt = false
local PtfxWait = 500
local PtfxCanHold = false
local PtfxNoProp = false
local AnimationThreadStatus = false
local animPosUsed = false
local animPosOldCoords = nil
local myClone = nil
local syncedTarget = 0
local PlayerParticles = {}
Citizen.CreateThread(function()
    local lastReady = false
    local id = 0
    while RES == nil do Citizen.Wait(0) end
    local startTime = GetGameTimer()
    while not nuiReady do
        Citizen.Wait(0) 
        if GetGameTimer() - startTime > 5000 then
            break
        end
    end
    while not CoreReady do 
        Citizen.Wait(100)
        if GetGameTimer() - startTime > 5000 then
            break
        end
    end
    while not next(GetPlayerData()) do 
        Citizen.Wait(100)
        if GetGameTimer() - startTime > 5000 then
            break
        end
    end
    print("Table is ready.")
    -- General
    RES2.General = {}
    if Config.Categories.General then
        for k, v in pairs(RES.General) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "general",
                imageId = v.imageId or string.lower(k):gsub(" ", "")
            })
            RES2.General[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Extra
    RES2.Extra = {}
    if Config.Categories.Extra then
        for k, v in pairs(RES.Extra) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "extra",
                imageId = v.imageId or string.lower(k):gsub(" ", "")
            })
            RES2.Extra[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Expressions
    RES2.Expressions = {}
    if Config.Categories.Expressions then
        for k, v in pairs(RES.Expressions) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[2],
                category = "expressions",
                imageId = v.imageId or string.lower(k):gsub(" ", "")
            })
            RES2.Expressions[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Dances
    RES2.Dances = {}
    if Config.Categories.Dances then
        for k, v in pairs(RES.Dances) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "dances",
                imageId = v.imageId or string.lower(k):gsub(" ", "")
            })
            RES2.Dances[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Walks
    RES2.Walks = {}
    if Config.Categories.Walks then
        for k, v in pairs(RES.Walks) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[2],
                category = "walks",
                imageId = v.imageId or string.lower(k):gsub(" ", "")
            })
            RES2.Walks[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Placed Emotes
    RES2.PlacedEmotes = {}
    if Config.Categories.PlacedEmotes then
        for k, v in pairs(RES.PlacedEmotes) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "placedemotes"
            })
            RES2.PlacedEmotes[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Synced Emotes
    RES2.Shared = {}
    if Config.Categories.Shared then
        for k, v in pairs(RES.Shared) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "shared"
            })
            RES2.Shared[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Prop Emotes
    RES2.PropEmotes = {}
    if Config.Categories.PropEmotes then
        for k, v in pairs(RES.PropEmotes) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "propemotes",
                imageId = v.imageId or string.lower(k):gsub(" ", "")
            })
            RES2.PropEmotes[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- ERP Emotes
    -- RES2.ERP = {}
    -- if Config.EnableERPAnims then
    --     for k, v in pairs(RES.ERP) do
    --         id = id + 1
    --         table.insert(data, {
    --             id = id,
    --             name = string.lower(k):gsub(" ", ""),
    --             label = v[3],
    --             category = "erpemotes"
    --         })
    --         RES2.ERP[string.lower(k):gsub(" ", "")] = v
    --     end
    -- end
    -- Animal Emotes
    RES2.AnimalEmotes = {}
    if Config.Categories.AnimalEmotes then
        for k, v in pairs(RES.AnimalEmotes) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "animalemotes"
            })
            RES2.AnimalEmotes[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Gang
    RES2.Gang = {}
    if Config.Categories.Gang then
        for k, v in pairs(RES.Gang) do
            id = id + 1
            table.insert(data, {
                id = id,
                name = string.lower(k):gsub(" ", ""),
                label = v[3],
                category = "gang",
                imageId = v.imageId or string.lower(k):gsub(" ", "")
            })
            RES2.Gang[string.lower(k):gsub(" ", "")] = v
        end
    end
    -- Categories
    -- All
    table.insert(categories, {
        name = "all",
        label = Lang:t("categories.all"),
        icon = "mdi_human-male",
        number = #data,
    })
    -- Favorites
    favoriteAnimations = {}
    local kvp = GetResourceKvpString('0ranimmenufavoritesv2')
    if kvp then favoriteAnimations = json.decode(kvp) end
    table.insert(categories, {
        name = "favorites",
        label = Lang:t("categories.favorites"),
        icon = "handball",
        number = tablelength(favoriteAnimations)
    })
    -- General
    if Config.Categories.General then
        table.insert(categories, {
            name = "general",
            label = Lang:t("categories.general"),
            icon = "map_unisex",
            number = tablelength(RES2.General)
        })
    end
    -- Extra
    if Config.Categories.Extra then
        table.insert(categories, {
            name = "extra",
            label = Lang:t("categories.extra"),
            icon = "map_unisex",
            number = tablelength(RES2.Extra)
        })
    end
    -- Dances
    if Config.Categories.Dances then
        table.insert(categories, {
            name = "dances",
            label = Lang:t("categories.dances"),
            icon = "mdi_human-female-dance",
            number = tablelength(RES2.Dances)
        })
    end
    -- Expressions
    if Config.Categories.Expressions then
        table.insert(categories, {
            name = "expressions",
            label = Lang:t("categories.expressions"),
            icon = "ri_emotion-sad-line",
            number = tablelength(RES2.Expressions)
        })
    end
    -- Walks
    if Config.Categories.Walks then
        table.insert(categories, {
            name = "walks",
            label = Lang:t("categories.walks"),
            icon = "mdi_walk",
            number = tablelength(RES2.Walks)
        })
    end
    -- Placed Emotes
    if Config.Categories.PlacedEmotes then
        table.insert(categories, {
            name = "placedemotes",
            label = Lang:t("categories.placedemotes"),
            icon = "meditation",
            number = tablelength(RES2.PlacedEmotes)
        })
    end
    -- Synced Emotes
    if Config.Categories.Shared then
        table.insert(categories, {
            name = "shared",
            label = Lang:t("categories.syncedemotes"),
            icon = "mdi_human-edit",
            number = tablelength(RES2.Shared)
        })
    end
    -- Prop Emotes
    if Config.Categories.PropEmotes then
        table.insert(categories, {
            name = "propemotes",
            label = Lang:t("categories.propemotes"),
            icon = "mdi_gymnastics",
            number = tablelength(RES2.PropEmotes)
        })
    end
    -- ERP Emotes
    -- if Config.EnableERPAnims then
    --     table.insert(categories, {
    --         name = "erpemotes",
    --         label = Lang:t("categories.erpemotes"),
    --         icon = "fas fa-kiss-wink-heart",
    --         number = tablelength(favoriteAnimations)
    --     })
    -- end
    -- Animal Emotes
    if Config.Categories.AnimalEmotes then
        table.insert(categories, {
            name = "animalemotes",
            label = Lang:t("categories.animalemotes"),
            icon = "horse-human",
            number = tablelength(RES2.AnimalEmotes)
        })
    end
    -- Gang
    if Config.Categories.Gang then
        table.insert(categories, {
            name = "gang",
            label = Lang:t("categories.gang"),
            icon = "map_unisex",
            number = tablelength(RES2.Gang)
        })
    end
    quickAnimations = {}
    local kvp2 = GetResourceKvpString('0ranimmenuquicksv2_new')
    if kvp2 then
        local quicks = json.decode(kvp2)
        for k, v in pairs(quicks) do
            table.insert(quickAnimations, {
                slot = tonumber(v.slot),
                name = v.name,
                category = v.category,
                label = v.label,
                key = v.key
            })
        end
    end
    lastReady = true
    -- table.sort(data, function(a,b) return a.label < b.label end)
    local order = {
        general = 1,
        propemotes = 2
    }
    table.sort(data, function(a, b)
        local aOrder = order[a.category] or 99
        local bOrder = order[b.category] or 99

        if aOrder == bOrder then
            return a.category < b.category
        else
            return aOrder < bOrder
        end
    end)
    while not lastReady do Citizen.Wait(0) end
    print("Menu ready.")
    menuReady = true
    Citizen.Wait(500)
    local translations = {}
    for k in pairs(Lang.fallback and Lang.fallback.phrases or Lang.phrases) do
        if k:sub(0, ('menu.'):len()) then
            translations[k:sub(('menu.'):len() + 1)] = Lang:t(k)
        end
    end
    setQuickKeys()
    SendNUIMessage({action = "setData", quickPrimaryKey = Config.QuickPrimaryKey, quickAnimationsState = Config.QuickAnimationsState, categories = categories, animations = data, favs = favoriteAnimations, quicks = quickAnimations, translations = translations, gangEmoteProps = Config.GangEmoteProps})
end)

RegisterNUICallback('nuiReady', function()
    nuiReady = true
end)

RegisterCommand(Config.MenuKey.Command, function() openMenu() end)
exports('openMenu', function() return openMenu() end)
function openMenu()
    if menuReady then
        if not Config.CanOpenMenu() then return end
        if not setDataState then
            local translations = {}
            for k in pairs(Lang.fallback and Lang.fallback.phrases or Lang.phrases) do
                if k:sub(0, ('menu.'):len()) then
                    translations[k:sub(('menu.'):len() + 1)] = Lang:t(k)
                end
            end
            local kvp = GetResourceKvpString('0ranimmenufavoritesv2')
            if kvp then favoriteAnimations = json.decode(kvp) end
            quickAnimations = {}
            local kvp2 = GetResourceKvpString('0ranimmenuquicksv2_new')
            if kvp2 then
                local quicks = json.decode(kvp2)
                for k, v in pairs(quicks) do
                    table.insert(quickAnimations, {
                        slot = tonumber(v.slot),
                        name = v.name,
                        category = v.category,
                        label = v.label,
                        key = v.key
                    })
                end
            end
            SendNUIMessage({action = "setData", sender = "0RES", defaultQuickKeys = Config.DefaultQuickKeys, categories = categories, animations = data, favs = favoriteAnimations, quicks = quickAnimations, translations = translations, quickKeys = Config.QuickKeys})
            while not setDataState do Citizen.Wait(1000) end
        end
        if requestActive then return end
        if DoesEntityExist(myClone) then return end
        menuActive = true
        SetNuiFocus(menuActive, menuActive)
        if Config.AllowMovement then
            SetNuiFocusKeepInput(menuActive)
            Citizen.CreateThread(function()
                while menuActive do
                    Citizen.Wait(1)
                    DisableControlAction(0, 24, true)
                    DisableControlAction(0, 25, true)
                    DisableControlAction(0, 1, true)
                    DisableControlAction(0, 2, true)
                    DisableControlAction(0, 200, true)
                    HideHudComponentThisFrame(2) -- HUD_WEAPON_ICON
                    HideHudComponentThisFrame(7) -- HUD_CASH
                    HideHudComponentThisFrame(9) -- HUD_WEAPON_WHEEL
                    HideHudComponentThisFrame(20) -- HUD_WEAPON_STAT
                    HideHudComponentThisFrame(22) -- HUD_WEAPON_WHEEL_STATS
                    DisableControlAction(0, 37, true)  -- INPUT_SELECT_WEAPON (TAB tuşu)
                    DisableControlAction(0, 14, true)  -- SCROLL DOWN
                    DisableControlAction(0, 15, true)  -- SCROLL UP
                    DisablePlayerFiring(PlayerPedId(), true)
                end
            end)
        else
            Citizen.CreateThread(function()
                while menuActive do
                    Citizen.Wait(1)
                    -- DisableControlAction(0, 24, true)
                    -- DisableControlAction(0, 25, true)
                    -- DisableControlAction(0, 1, true)
                    -- DisableControlAction(0, 2, true)
                    -- DisableControlAction(0, 200, true)
                    HideHudComponentThisFrame(2) -- HUD_WEAPON_ICON
                    HideHudComponentThisFrame(7) -- HUD_CASH
                    HideHudComponentThisFrame(9) -- HUD_WEAPON_WHEEL
                    HideHudComponentThisFrame(20) -- HUD_WEAPON_STAT
                    HideHudComponentThisFrame(22) -- HUD_WEAPON_WHEEL_STATS
                    DisableControlAction(0, 37, true)  -- INPUT_SELECT_WEAPON (TAB tuşu)
                    DisableControlAction(0, 14, true)  -- SCROLL DOWN
                    DisableControlAction(0, 15, true)  -- SCROLL UP
                    -- DisablePlayerFiring(PlayerPedId(), true)
                end
            end)
        end
        SendNUIMessage({action = "menu", state = menuActive})
    end
end
RegisterNetEvent('0r-animmenu:openMenu:client', openMenu)

RegisterNUICallback('callback', function(data)
    if data.action == "playSound" then
        PlaySound(-1, data.sound, data.type, 0, 0, 1)
    elseif data.action == "enableGangPropMenu" then
        if menuActive then
            SendNUIMessage({action = "menu", state = false})
            menuActive = false
        end
        SetNuiFocus(false, false)
        SetNuiFocusKeepInput(false)
        if Config.GangEmotePropMenu == "ox_lib" and GetResourceState("ox_lib") == "started" then
            gangPropsMenu()
        elseif Config.GangEmotePropMenu == "qb-menu" and GetResourceState("qb-menu") == "started" then
            gangPropsMenu()
        else
            SetNuiFocus(true, true)
            SendNUIMessage({action = "enableGangPropMenu"})
            SetNuiFocusKeepInput(true)
        end
    elseif data.action == "addGangProp" then
        attachPropToHand(
            data.objName,
            data.hand,
            data.pos,
            data.rot,
            data.bone
        )
    elseif data.action == "removeGangProp" then
        removePropFromHand(data.hand)
    elseif data.action == "resetState" then
        setDataState = false
        openMenu()
    elseif data.action == "close" then
        SetNuiFocus(false, false)
        SetNuiFocusKeepInput(false)
        menuActive = false
    elseif data.action == "disableMovement" then
        if Config.AllowMovement then
            SetNuiFocusKeepInput(false)
        end
    elseif data.action == "enableMovement" then
        if Config.AllowMovement then
            SetNuiFocusKeepInput(true)
        end
    elseif data.action == "dataReady" then
        setDataState = true
    elseif data.action == "saveFavAnims" then
        SetResourceKvp("0ranimmenufavoritesv2", json.encode(data.favoriteAnimations))
    elseif data.action == "saveQuickAnims" then
        local quickAnimationsTable = {}
        for k, v in pairs(data.quickAnimations) do
            table.insert(quickAnimationsTable, {
                slot = tonumber(v.slot),
                name = v.name,
                category = v.category,
                label = v.label,
                key = v.key
            })
        end
        SetResourceKvp("0ranimmenuquicksv2_new", json.encode(quickAnimationsTable))
        Citizen.Wait(250)
        setQuickKeys()
    elseif data.action == "keybindSaved" then
        local kvp2 = GetResourceKvpString('0ranimmenuquicksv2_new')
        if kvp2 then
            keybindAnimations = json.decode(kvp2)
        end
        for k, v in pairs(keybindAnimations) do
            if v.key == data.key then
                return Notify(Lang:t("notifications.same_keybind"), 7500, "error")
            end
            if v.slot == data.slot then
                v.key = data.key
            end
        end
        SetResourceKvp("0ranimmenuquicksv2_new", json.encode(keybindAnimations))
        Citizen.Wait(250)
        setQuickKeys()
    elseif data.action == "playAnim" then
        removeAllPropsGang()
        local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
        if not Config.AllowedInCars and inVehicle == 1 then
            return
        end
        if IsEntityInAir(PlayerPedId()) then
            return
        end
        if not Config.CanOpenMenu() then return end
        if data.category == "propemotes" then
            if propEmoteTimeout then return end
            propEmoteTimeout = true
            SendNUIMessage({action = "propTimeout", state = true})
            Citizen.SetTimeout(Config.PropTimeout, function()
                propEmoteTimeout = false
                SendNUIMessage({action = "propTimeout", state = false})
            end)
        end
        if currentAnimData and next(currentAnimData) then
            for k, v in pairs(currentAnimData) do
                if v.id == data.id then
                    return cancelEmote("0resmon")
                end
            end
        end
        local tables = {
            ["general"] = {name = "General", dict = 1, anim = 2},
            ["extra"] = {name = "Extra", dict = 1, anim = 2},
            ["propemotes"] = {name = "PropEmotes", dict = 1, anim = 2},
            ["dances"] = {name = "Dances", dict = 1, anim = 2},
            ["expressions"] = {name = "Expressions", dict = 1},
            ["walks"] = {name = "Walks", dict = 1},
            ["placedemotes"] = {name = "PlacedEmotes", dict = 1, anim = 2},
            ["shared"] = {name = "Shared", targetName = 4, dict = 1, anim = 2},
            ["erpemotes"] = {name = "ERP", targetName = 4, dict = 1, anim = 2},
            ["animalemotes"] = {name = "AnimalEmotes", dict = 1, anim = 2},
            ["gang"] = {name = "Gang", dict = 1, anim = 2}
        }
        local tableData = tables[data.category]
        local animData = RES2[tableData.name][data.id]
        lastPlayedAnimType = nil
        if animData == nil then return print("Anim doesn't exist: " .. tableData.name .. "(" .. data.category .. ")") end
        local cAnimData = {animData = animData, category = data.category, id = data.id}
        if data.category == "animalemotes" then
            local isPedAnimal = false
            local myPed = GetEntityModel(PlayerPedId())
            for k, v in pairs(Config.AnimalPeds) do
                if myPed == GetHashKey(v) then
                    isPedAnimal = true
                end
            end
            Citizen.Wait(500)
            if not isPedAnimal then
                return Notify(Lang:t("notifications.just_animals"), 7500, "error")
            end
        end
        if data.category == "general" or data.category == "propemotes" or data.category == "animalemotes" or data.category == "extra" or data.category == "gang" then
            lastPlayedAnimType = data.category
            isInAnimation = true
            local heading = GetEntityHeading(PlayerPedId())
            if animData.AnimationOptions and animData.AnimationOptions.Scenario or animData[1] == "Scenario" then
                if inVehicle then return end
                ClearPedTasks(PlayerPedId())
                TaskStartScenarioInPlace(PlayerPedId(), animData[2], 0, true)
                cleanScenarioObjects(false)
                table.insert(currentAnimData, cAnimData)
            else
                if not loadAnim(animData[tableData.dict]) then return end
                table.insert(currentAnimData, cAnimData)
                local movementType = 1 -- Default movement type
                if animData.AnimationOptions then
                    if animData.AnimationOptions.onFootFlag then
                        movementType = animData.AnimationOptions.onFootFlag
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
                if animData.AnimationOptions and animData.AnimationOptions.Duration then
                    animationDuration = animData.AnimationOptions.Duration
                end
                if animData.AnimationOptions and animData.AnimationOptions.PtfxAsset then
                    PtfxAsset = animData.AnimationOptions.PtfxAsset
                    PtfxName = animData.AnimationOptions.PtfxName
                    if animData.AnimationOptions.PtfxNoProp then
                        PtfxNoProp = animData.AnimationOptions.PtfxNoProp
                    else
                        PtfxNoProp = false
                    end
                    Ptfx1, Ptfx2, Ptfx3, Ptfx4, Ptfx5, Ptfx6, PtfxScale = table.unpack(animData.AnimationOptions.PtfxPlacement)
                    PtfxBone = animData.AnimationOptions.PtfxBone
                    PtfxColor = animData.AnimationOptions.PtfxColor
                    PtfxInfo = animData.AnimationOptions.PtfxInfo
                    PtfxWait = animData.AnimationOptions.PtfxWait
                    PtfxCanHold = animData.AnimationOptions.PtfxCanHold
                    PtfxNotif = false
                    PtfxPrompt = true
                    RunAnimationThread()
                    TriggerServerEvent("0resmon-animmenu:ptfxSync:server", PtfxAsset, PtfxName, vector3(Ptfx1, Ptfx2, Ptfx3), vector3(Ptfx4, Ptfx5, Ptfx6), PtfxBone, PtfxScale, PtfxColor)
                else
                    PtfxPrompt = false
                end
                TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
                RemoveAnimDict(animData[tableData.dict])
                if animData.AnimationOptions and animData.AnimationOptions.Prop then
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
                    if animData.AnimationOptions.SecondProp then
                        secondPropName = animData.AnimationOptions.SecondProp
                        secondPropBone = animData.AnimationOptions.SecondPropBone
                        secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6 = table.unpack(animData.AnimationOptions.SecondPropPlacement)
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
                    if animData.AnimationOptions.PtfxAsset and not PtfxNoProp then
                        TriggerServerEvent("0resmon-animmenu:ptfxSyncProp:server", ObjToNet(prop))
                    end
                end
                if data.category == "gang" and animData.AnimationOptions and animData.AnimationOptions.fixHeading then
                    while not IsEntityPlayingAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], movementType) do Citizen.Wait(0) end
                    SetEntityHeading(PlayerPedId(), heading + 180.0)
                    SendNUIMessage({action = "openGangInfoMenu", state = true})
                elseif data.category == "gang" then
                    SendNUIMessage({action = "openGangInfoMenu", state = true})
                end
            end
        elseif data.category == "dances" then
            if not loadAnim(animData[tableData.dict]) then return end
            table.insert(currentAnimData, cAnimData)
            local movementType = 1
            local animationDuration = -1
            if inVehicle == 1 then
                movementType = 51
            end
            TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
            RemoveAnimDict(animData[tableData.dict])
            isInAnimation = true
            if animData.AnimationOptions and animData.AnimationOptions.Prop then
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
                if animData.AnimationOptions.SecondProp then
                    secondPropName = animData.AnimationOptions.SecondProp
                    secondPropBone = animData.AnimationOptions.SecondPropBone
                    secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6 = table.unpack(animData.AnimationOptions.SecondPropPlacement)
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
                if animData.AnimationOptions.PtfxAsset and not PtfxNoProp then
                    TriggerServerEvent("0resmon-animmenu:ptfxSyncProp:server", ObjToNet(prop))
                end
            end
        elseif data.category == "expressions" then
            local expression = animData[tableData.dict]
            ClearFacialIdleAnimOverride(PlayerPedId())
            SetFacialIdleAnimOverride(PlayerPedId(), expression, 0)
            SetResourceKvp("0ranimmenuv2expression", expression)
        elseif data.category == "walks" then
            local walk = animData[tableData.dict]
            local name = data.id
            walkSet = name
            ResetPedMovementClipset(PlayerPedId(), 1.0)
            ResetPedWeaponMovementClipset(PlayerPedId())
            ResetPedStrafeClipset(PlayerPedId())
            RequestAnimSet(walk)
            while not HasAnimSetLoaded(walk) do Citizen.Wait(1) end
            SetPedMovementClipset(PlayerPedId(), walk, 0.2)
            RemoveAnimSet(walk)
            SetResourceKvp("0ranimmenuv2walk", walk)
            SetResourceKvp("0ranimmenuv2walkname", walkSet)
        elseif data.category == "placedemotes" then
            if Config.UseOldVersionPlacing then
                if DoesEntityExist(myClone) then return end
                if inVehicle then return end
                local hit, coords, entity = RayCastGamePlayCamera(Config.MaxDistanceForAnimPos)
                if hit and (IsEntityAVehicle(entity) or IsThisModelAHeli(entityModel) or IsThisModelAPlane(entityModel)) then
                    return
                end
                if menuActive then
                    SendNUIMessage({action = "menu", state = false})
                    menuActive = false
                end
                SendNUIMessage({action = "openInfoMenu", state = true})
                myClone = ClonePed(PlayerPedId(), false, false, true)
                FreezeEntityPosition(myClone, true)
                SetEntityHeading(myClone, GetEntityHeading(PlayerPedId()))
                PlaceObjectOnGroundProperly(myClone)
                SetBlockingOfNonTemporaryEvents(myClone, true)
                SetEntityCollision(myClone, false, false)
                SetEntityAlpha(myClone, 200, false)
                animPosOldCoords = GetEntityCoords(PlayerPedId())
                if not loadAnim(animData[tableData.dict]) then return end
                local movementType = 1 -- Default movement type
                local animationDuration = -1
                TaskPlayAnim(myClone, animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
                if Config.PlayPlacedAnimOnPlayerPed then
                    TaskPlayAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
                end
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
                    cloneCoords = GetEntityCoords(myClone)
                    local hit, coords, entity = RayCastGamePlayCamera(Config.MaxDistanceForAnimPos)
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
                    if IsControlPressed(0, 322) then -- ESC
                        setAnim = false
                        SetNuiFocus(false, false)
                        SetNuiFocusKeepInput(false)
                        SendNUIMessage({action = "openInfoMenu", state = false})
                        DeletePed(myClone)
                        positioningAnim = false
                        taskActive = false
                    end
                    setAnim = true
                    Citizen.Wait(0)
                end
                Citizen.SetTimeout(7500, function()
                    if taskActive then
                        FreezeEntityPosition(PlayerPedId(), true)
                        Citizen.Wait(250)
                        --SetEntityCollision(PlayerPedId(), false, false)
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
                        --SetEntityCollision(PlayerPedId(), false, false)
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
            else
                table.insert(currentAnimData, cAnimData)
                if not Config.AnimPos.Enable then
                    if currentAnimData and currentAnimData[#currentAnimData] and currentAnimData[#currentAnimData].category and currentAnimData[#currentAnimData].id then
                        ExecuteCommand('e ' .. currentAnimData[#currentAnimData].id)
                    end
                    return
                end
                if isCamActive then return end
                if DoesEntityExist(myClone) then return end
                if inVehicle then return end
                if menuActive then
                    SendNUIMessage({action = "menu", state = false})
                    menuActive = false
                end
                SendNUIMessage({action = "openInfoMenu", state = true})
                myClone = ClonePed(PlayerPedId(), false, false, true)
                FreezeEntityPosition(myClone, true)
                SetEntityHeading(myClone, GetEntityHeading(PlayerPedId()))
                PlaceObjectOnGroundProperly(myClone)
                SetBlockingOfNonTemporaryEvents(myClone, true)
                SetEntityAlpha(myClone, 200, false)
                SetEntityAsMissionEntity(myClone, true, true)
                SetNuiFocus(true, false)
                SetNuiFocusKeepInput(true)
                positioningAnim = true
                local disableControlActions2 = {20, 21}
                local setAnim = true
                myCoords = GetEntityCoords(PlayerPedId())
                myCoordsZ = myCoords.z
                myCoordsZ2 = myCoords.z
                local cloneCoordsM = GetEntityCoords(myClone)
                cloneHeadingM = GetEntityHeading(myClone)
                TriggerServerEvent('0resmon-animmenu:setPedAlpha:server', GetPlayerServerId(PlayerId()), 200)
                local newCoords = GetEntityCoords(PlayerPedId())
                animPosOldCoords = GetEntityCoords(PlayerPedId())
                -- Command
                local tables = {
                    ["general"] = {name = "General", dict = 1, anim = 2},
                    ["extra"] = {name = "Extra", dict = 1, anim = 2},
                    ["propemotes"] = {name = "PropEmotes", dict = 1, anim = 2},
                    ["dances"] = {name = "Dances", dict = 1, anim = 2},
                    ["expressions"] = {name = "Expressions", dict = 2},
                    ["walks"] = {name = "Walks", dict = 1},
                    ["placedemotes"] = {name = "PlacedEmotes", dict = 1, anim = 2},
                    ["shared"] = {name = "Shared", targetName = 4, dict = 1, anim = 2},
                    ["erpemotes"] = {name = "ERP", targetName = 4, dict = 1, anim = 2},
                    ["animalemotes"] = {name = "AnimalEmotes", dict = 1, anim = 2}
                }
                local groundZ = 0.0
                local success, foundZ = GetGroundZFor_3dCoord(newCoords.x, newCoords.y, newCoords.z, groundZ, false)
                local myAnim = currentAnimData[#currentAnimData]
                if myAnim and myAnim.category and myAnim.id then
                    ExecuteCommand('eclone ' .. myAnim.id)
                    if Config.PlayPlacedAnimOnPlayerPed then
                        ExecuteCommand('e ' .. myAnim.id)
                    end
                end
                animPosUsed = false
                while positioningAnim do
                    SetGameplayCamFollowPedThisUpdate(myClone)
                    newCoords = GetEntityCoords(myClone)
                    --SetEntityCoords(PlayerPedId(), newCoords.x, newCoords.y, newCoords.z - 1.0)
                    for _, key in pairs(disableControlActions2) do
                        DisableControlAction(0, key, true)
                    end
                    DisablePlayerFiring(PlayerId(), true)
                    if IsControlPressed(0, 20) or IsDisabledControlPressed(0, 20) then
                        myCoordsZ = myCoords.z
                        -- SendNUIMessage({action = "usingKey", key = "z"})
                    end
                    if IsControlPressed(0, 14) then -- Rotate Left
                        if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                            -- SendNUIMessage({action = "usingKey", key = "shift"})
                            SetEntityHeading(myClone, GetEntityHeading(myClone) - 2.5)
                        else
                            SetEntityHeading(myClone, GetEntityHeading(myClone) - 5.0)
                        end
                        -- SendNUIMessage({action = "usingKey", key = "mouse"})
                    end
                    if IsControlPressed(0, 15) then -- Rotate Right
                        if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                            -- SendNUIMessage({action = "usingKey", key = "shift"})
                            SetEntityHeading(myClone, GetEntityHeading(myClone) + 2.5)
                        else
                            SetEntityHeading(myClone, GetEntityHeading(myClone) + 5.0)
                        end
                        -- SendNUIMessage({action = "usingKey", key = "mouse"})
                    end
                    if IsControlPressed(0, 32) then -- W
                        -- SendNUIMessage({action = "usingKey", key = "w"})
                        local distance = #(newCoords - myCoords)
                        if Config.AnimPos.MaxDistance >= Round(distance) then
                            if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                                -- SendNUIMessage({action = "usingKey", key = "shift"})
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, 0.0, 0.025, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            else
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, 0.0, 0.05, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            end
                        else
                            SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                        end
                    end
                    if IsControlPressed(0, 34) then -- A
                        -- SendNUIMessage({action = "usingKey", key = "a"})
                        local distance = #(newCoords - myCoords)
                        if Config.AnimPos.MaxDistance >= Round(distance) then
                            if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                                -- SendNUIMessage({action = "usingKey", key = "shift"})
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, -0.025, 0.0, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            else
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, -0.05, 0.0, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            end
                        else
                            SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                        end
                    end
                    if IsControlPressed(0, 33) then -- S
                        -- SendNUIMessage({action = "usingKey", key = "s"})
                        local distance = #(newCoords - myCoords)
                        if Config.AnimPos.MaxDistance >= Round(distance) then
                            if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                                -- SendNUIMessage({action = "usingKey", key = "shift"})
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, 0.0, -0.025, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            else
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, 0.0, -0.05, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            end
                        else
                            SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                        end
                    end
                    if IsControlPressed(0, 30) then -- D
                        -- SendNUIMessage({action = "usingKey", key = "d"})
                        local distance = #(newCoords - myCoords)
                        if Config.AnimPos.MaxDistance >= Round(distance) then
                            if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                                -- SendNUIMessage({action = "usingKey", key = "shift"})
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, 0.025, 0.0, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            else
                                local offset = GetOffsetFromEntityInWorldCoords(myClone, 0.05, 0.0, 0.0)
                                SetEntityCoords(myClone, offset.x, offset.y, myCoordsZ)
                            end
                        else
                            SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ)
                        end
                    end
                    if IsControlPressed(0, 27) then -- Arrow Up
                        -- SendNUIMessage({action = "usingKey", key = "arrowup"})
                        local distance = #(newCoords - myCoords)
                        if Config.AnimPos.MaxHeightDistance >= Round(distance) then
                            if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                                -- SendNUIMessage({action = "usingKey", key = "shift"})
                                myCoordsZ = myCoordsZ + 0.001
                            else
                                myCoordsZ = myCoordsZ + 0.025
                            end
                            SetEntityCoords(myClone, newCoords.x, newCoords.y, myCoordsZ)
                        else
                            myCoordsZ = myCoordsZ2
                            SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ2)
                        end
                    end
                    if IsControlPressed(0, 173) then -- Arrow Down
                        -- SendNUIMessage({action = "usingKey", key = "arrowdown"})
                        local distance = #(newCoords - myCoords)
                        if Config.AnimPos.MaxDistance >= Round(distance) and myCoordsZ >= foundZ then
                            if IsControlPressed(0, 21) or IsDisabledControlPressed(0, 21) then
                                -- SendNUIMessage({action = "usingKey", key = "shift"})
                                myCoordsZ = myCoordsZ - 0.001
                            else
                                myCoordsZ = myCoordsZ - 0.025
                            end
                            SetEntityCoords(myClone, newCoords.x, newCoords.y, myCoordsZ)
                        else
                            myCoordsZ = myCoordsZ2
                            SetEntityCoords(myClone, myCoords.x, myCoords.y, myCoordsZ2)
                        end
                    end
                    --PlaceObjectOnGroundProperly(myClone)
                    if IsControlPressed(0, 38) then -- Confirm E
                        SetNuiFocus(false, false)
                        SetNuiFocusKeepInput(false)
                        SendNUIMessage({action = "openInfoMenu", state = false})
                        ExecuteCommand('e ' .. myAnim.id)
                        Citizen.Wait(500)
                        FreezeEntityPosition(PlayerPedId(), true)
                        SetEntityCollision(PlayerPedId(), false, false)
                        SetEntityVisible(PlayerPedId(), false, 0)
                        ClearPedTasks(PlayerPedId())
                        ClearPedSecondaryTask(PlayerPedId())
                        cloneCoords = GetEntityCoords(myClone)
                        SetEntityCoordsNoOffset(PlayerPedId(), cloneCoords.x, cloneCoords.y, cloneCoords.z, true, true, true)
                        SetEntityHeading(PlayerPedId(), GetEntityHeading(myClone))
                        Citizen.Wait(250)
                        SetNuiFocus(false, false)
                        SetNuiFocusKeepInput(false)
                        SendNUIMessage({action = "openInfoMenu", state = false})
                        Citizen.Wait(250)
                        DeletePed(myClone)
                        positioningAnim = false
                        SetEntityVisible(PlayerPedId(), true, 0)
                        animPosUsed = true
                    end
                    if IsControlPressed(0, 322) then -- ESC
                        setAnim = false
                        SetNuiFocus(false, false)
                        SetNuiFocusKeepInput(false)
                        SendNUIMessage({action = "openInfoMenu", state = false})
                        DeletePed(myClone)
                        positioningAnim = false
                        SetEntityCoords(PlayerPedId(), myCoords.x, myCoords.y, myCoords.z - 1.0)
                        SetEntityHeading(PlayerPedId(), cloneHeadingM)
                    end
                    setAnim = true
                    SetEntityLocallyInvisible(PlayerPedId())
                    Citizen.Wait(0)
                end
                SetEntityLocallyVisible(PlayerPedId())
                TriggerServerEvent('0resmon-animmenu:setPedAlpha:server', GetPlayerServerId(PlayerId()), 255)
            end
        elseif data.category == "shared" or data.category == "erpemotes" then
            if requestActive then return end
            if inVehicle then return end
            nearbyPlayers = GetPlayersInArea(GetEntityCoords(PlayerPedId()), 5.0)
            if next(nearbyPlayers) ~= nil and next(nearbyPlayers) then
                menuActive = false
                SetNuiFocusKeepInput(false)
                SetNuiFocus(false, false)
                SendNUIMessage({action = "menu", state = false})
                requestActive = true
                ShowTextUI(Lang:t("notifications.waiting_for_a_decision"), "ESC")
                animData.type = data.category
                animData.animNumber = data.id
                animData.targetAnimName = animData[4] or nil
                for _, id in pairs(nearbyPlayers) do
                    Create3DTextUIOnPlayer("0resmon-animmenu-request-players-" .. id, {
                        id = id,
                        displayDist = 5.0,
                        interactDist = 1.3,
                        enableKeyClick = true, -- If true when you near it and click key it will trigger the event that you write inside triggerData
                        keyNum = 38,
                        key = "E",
                        text = animData[3] .. "?",
                        theme = "green", -- or red
                        triggerData = {
                            triggerName = "0resmon-animmenu:sendAnimRequest:client",
                            args = {data = animData, id = id}
                        }
                    })
                end
                Citizen.CreateThread(function()
                    while requestActive do
                        Citizen.Wait(0)
                        if IsControlPressed(0, 322) then
                            Notify(Lang:t("notifications.request_cancelled"), 7500, "error")
                            requestActive = false
                            currentAnimData = {}
                            HideTextUI()
                            for _, id in pairs(nearbyPlayers) do
                                Delete3DTextUIOnPlayer("0resmon-animmenu-request-players-" .. id)
                            end
                            break
                        end
                    end
                end)
                Citizen.SetTimeout(7500, function()
                    if next(nearbyPlayers) ~= nil and next(nearbyPlayers) and requestActive then
                        Notify(Lang:t("notifications.request_timed_out"), 7500, "error")
                        requestActive = false
                        currentAnimData = {}
                        HideTextUI()
                        for _, id in pairs(nearbyPlayers) do
                            Delete3DTextUIOnPlayer("0resmon-animmenu-request-players-" .. id)
                        end
                    end
                end)
            else
                Notify(Lang:t("notifications.no_players_nearby"), 7500, "error")
            end
        end
    end
end)

local props = {right = nil, left = nil}
local propsByHand = {right = nil, left = nil}
function attachPropToHand(propModel, hand, pos, rot, pbone)
    local ped = PlayerPedId()
    local bone = pbone or (hand == "right") and 57005 or 18905
    RequestModel(propModel)
    while not HasModelLoaded(propModel) do
        Wait(0)
    end
    if props[hand] and DoesEntityExist(props[hand]) then
        DeleteEntity(props[hand])
        props[hand] = nil
    end
    local obj = CreateObject(propModel, 0.0, 0.0, 0.0, true, true, false)
    AttachEntityToEntity(
        obj,
        ped,
        GetPedBoneIndex(ped, bone),
        pos[1] + 0.0, pos[2] + 0.0, pos[3] + 0.0,
        rot[1] + 0.0, rot[2] + 0.0, rot[3] + 0.0,
        true, true, false, true, 1, true
    )
    SetModelAsNoLongerNeeded(propModel)
    props[hand] = obj
    propsByHand[hand] = propModel
    SendNUIMessage({
        action = "updatePropCheckbox",
        hand = hand,
        objName = propModel
    })
end

function removePropFromHand(hand)
    if props[hand] and DoesEntityExist(props[hand]) then
        DeleteEntity(props[hand])
        props[hand] = nil
        propsByHand[hand] = nil
    end
end

function removeAllPropsGang()
    for hand, obj in pairs(props) do
        if obj and DoesEntityExist(obj) then
            DeleteEntity(obj)
            props[hand] = nil
            propsByHand[hand] = nil
        end
    end
    SendNUIMessage({action = "resetGangProps"})
    if Config.GangEmotePropMenu == "ox_lib" and GetResourceState("ox_lib") == "started" then
        exports["ox_lib"]:hideContext('prop_menu')
    elseif Config.GangEmotePropMenu == "qb-menu" and GetResourceState("qb-menu") == "started" then
        exports['qb-menu']:closeMenu()
    else
        SendNUIMessage({action = "closeGangPropMenu"})
    end
end

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    cancelEmote("0resmon")
    destroyAllProps()
    Config.HandsupEnableControls()
    DetachEntity(PlayerPedId(), false, false)
    FreezeEntityPosition(PlayerPedId(), false)
    if DoesEntityExist(myClone) then DeletePed(myClone) end
    SetEntityCollision(PlayerPedId(), true, true)
    removeAllPropsGang()
end)

AddEventHandler('gameEventTriggered', function(event, data)
    if event == 'CEventNetworkEntityDamage' then
        local victim, attacker, victimDied, weapon = data[1], data[2], data[4], data[7]
		if not IsEntityAPed(victim) then return end
        if victimDied and NetworkGetPlayerIndexFromPed(victim) == PlayerId() and IsEntityDead(PlayerPedId()) then
            handsUp = false
            Config.HandsupEnableControls()
            ClearPedTasks(PlayerPedId())
            if menuActive then
                cancelEmote("0resmon")
                SetNuiFocus(false, false)
                SetNuiFocusKeepInput(false)
                SendNUIMessage({action = "menu", state = false})
                menuActive = false
            else
                cancelEmote("0res")
                if DoesEntityExist(myClone) then DeletePed(myClone) end
                SetNuiFocus(false, false)
                SetNuiFocusKeepInput(false)
                SendNUIMessage({action = "openInfoMenu", state = false})
                DeletePed(myClone)
                positioningAnim = false
                TriggerServerEvent('0resmon-animmenu:setPedAlpha:server', GetPlayerServerId(PlayerId()), 255)
                SetEntityLocallyVisible(PlayerPedId())
            end
		end
	end
end)

Citizen.CreateThread(function()
    -- Pointing
        if Config.Pointing.Enable then
        if Config.Pointing.KeyMapping.Enable then
            RegisterCommand('pointanim', function(source, args, raw) pointAnim() end, false)
            RegisterKeyMapping("pointanim", Lang:t("keybinds.toggle_point_description"), "keyboard", Config.Pointing.KeyMapping.Key)
        else
            Citizen.CreateThread(function() while true do Citizen.Wait(0) if IsControlJustReleased(0, Config.Pointing.NormalKey.Key) then pointAnim() end end end)
        end
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
            local walk = GetResourceKvpString("0ranimmenuv2walk")
            if walk ~= nil then
                walkSet = walk
            end
            if walkSet ~= 'default' then
                loadAnimSet(walkSet)
                SetPedMovementClipset(ped, walkSet, 1.0)
                RemoveAnimSet(walkSet)
            end
        end
        Citizen.CreateThread(function()
            local sleep
            while true do
                sleep = 1000
                local ped = PlayerPedId()
                DisableControlAction(0, 36, true)
                if not IsPedSittingInAnyVehicle(ped) and not IsPedFalling(ped) and not IsPedSwimming(ped) and not IsPedSwimmingUnderWater(ped) and not IsPauseMenuActive() then
                    sleep = 0
                    if IsDisabledControlJustReleased(2, 36) then
                        if isCrouching then
                            ClearPedTasks(ped)
                            resetAnimSet()
                            SetPedStealthMovement(ped, false, 'DEFAULT_ACTION')
                            isCrouching = false
                        else
                            --resetAnimSet()
                            --ClearPedTasks(ped)
                            loadAnimSet('move_ped_crouched')
                            SetPedMovementClipset(ped, 'move_ped_crouched', 1.0)
                            SetPedStrafeClipset(ped, 'move_ped_crouched_strafing')
                            isCrouching = true
                        end
                    end
                end
                Citizen.Wait(0)
            end
        end)
    end
    -- Ragdoll
    if Config.Ragdoll.Enable then
        local ragdoled = false
        if Config.Ragdoll.KeyMapping.Enable then
            RegisterCommand('ragdoll', function(source, args, raw)
                if checkCanPedRagdoll() then
                    if not IsEntityDead(PlayerPedId()) and not IsPedInAnyVehicle(PlayerPedId(), false) then 
                        ragdoled = not ragdoled
                        while ragdoled do 
                            Citizen.Wait(0)
                            if ragdoled then
                                SetPedToRagdoll(PlayerPedId(), 1000, 1000, 0, 0, 0, 0)
                            end
                        end
                    end
                else
                    Notify('Ragdoll is disabled.', 7500, "error")
                end
            end, false)
            RegisterKeyMapping("ragdoll", Lang:t("keybinds.ragdoll_description"), "keyboard", Config.Ragdoll.KeyMapping.Key)
        else
            Citizen.CreateThread(function() 
                while true do 
                    Citizen.Wait(0) 
                    if checkCanPedRagdoll() then
                        ragdoled = not ragdoled
                        if ragdoled then
                            SetPedToRagdoll(PlayerPedId(), 1000, 1000, 0, 0, 0, 0)
                        end
                    else
                        Notify('Ragdoll is disabled.', 7500, "error")
                    end
                end 
            end)
        end
    end
end)

function checkCanPedRagdoll()
    if Config.Ragdoll.ByPassCanRagdoll then SetPedCanRagdoll(PlayerPedId(), true) return true end
    return CanPedRagdoll(PlayerPedId())
end

function loadAnim(dict)
    if not DoesAnimDictExist(dict) then print("Anim dict doesn't exist.") return false end
    local timeout = 2000
    while not HasAnimDictLoaded(dict) and timeout > 0 do
        RequestAnimDict(dict)
        Wait(5)
        timeout = timeout - 5
    end
    if timeout == 0 then
        print("Loading anim dict " .. dict .. " timed out")
        return false
    else
        return true
    end
end

function RunAnimationThread()
    local playerId = PlayerPedId()
    if AnimationThreadStatus then return end
    AnimationThreadStatus = true
    CreateThread(function()
        local sleep
        while AnimationThreadStatus and (isInAnimation or PtfxPrompt) do
            sleep = 500
            if isInAnimation then
                sleep = 0
                if IsPlayerAiming(playerId) then
                    cancelEmote("0res")
                end
                DisableControlAction(2, 140, true)
                DisableControlAction(2, 141, true)
                DisableControlAction(2, 142, true)
            end
            if PtfxPrompt then
                sleep = 0
                if not PtfxNotif then
                    SimpleNotify(PtfxInfo)
                    PtfxNotif = true
                end
                if IsControlPressed(0, 47) then
                    PtfxStart()
                    Citizen.Wait(PtfxWait)
                    if PtfxCanHold then
                        while IsControlPressed(0, 47) and isInAnimation and AnimationThreadStatus do
                            Citizen.Wait(5)
                        end
                    end
                    PtfxStop()
                end
            end
            Citizen.Wait(sleep)
        end
    end)
end

function SimpleNotify(message)
    BeginTextCommandThefeedPost("STRING")
    AddTextComponentSubstringPlayerName(message)
    EndTextCommandThefeedPostTicker(true, true)
end

function IsPlayerAiming(player)
    return (IsPlayerFreeAiming(player) or IsAimCamActive() or IsAimCamThirdPersonActive()) and tonumber(GetSelectedPedWeapon(player)) ~= tonumber(GetHashKey("WEAPON_UNARMED"))
end

function PtfxThis(asset)
    while not HasNamedPtfxAssetLoaded(asset) do
        RequestNamedPtfxAsset(asset)
        Wait(10)
    end
    UseParticleFxAsset(asset)
end

function PtfxStart()
    LocalPlayer.state:set('ptfx', true, true)
end

function PtfxStop()
    LocalPlayer.state:set('ptfx', false, true)
end

AddStateBagChangeHandler('ptfx', nil, function(bagName, key, value, _unused, replicated)
    local plyId = tonumber(bagName:gsub('player:', ''), 10)
    if (PlayerParticles[plyId] and value) or (not PlayerParticles[plyId] and not value) then return end
    local ply = GetPlayerFromServerId(plyId)
    if ply == 0 then return end
    local plyPed = GetPlayerPed(ply)
    if not DoesEntityExist(plyPed) then return end
    local stateBag = Player(plyId).state
    if value then
        local asset = stateBag.ptfxAsset
        local name = stateBag.ptfxName
        local offset = stateBag.ptfxOffset
        local rot = stateBag.ptfxRot
        local boneIndex = stateBag.ptfxBone and GetPedBoneIndex(plyPed, stateBag.ptfxBone) or GetEntityBoneIndexByName(name, "VFX")
        local scale = stateBag.ptfxScale or 1
        local color = stateBag.ptfxColor
        local propNet = stateBag.ptfxPropNet
        local entityTarget = plyPed
        if propNet then
            local propObj = NetToObj(propNet)
            if DoesEntityExist(propObj) then
                entityTarget = propObj
            end
        end
        PtfxThis(asset)
        PlayerParticles[plyId] = StartNetworkedParticleFxLoopedOnEntityBone(name, entityTarget, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z, boneIndex, scale + 0.0, false, false, false)
        if color then
            if color[1] and type(color[1]) == 'table' then
                local randomIndex = math.random(1, #color)
                color = color[randomIndex]
            end
            SetParticleFxLoopedAlpha(PlayerParticles[plyId], color.A)
            SetParticleFxLoopedColour(PlayerParticles[plyId], color.R / 255, color.G / 255, color.B / 255, false)
        end
    else
        StopParticleFxLooped(PlayerParticles[plyId], false)
        RemoveNamedPtfxAsset(stateBag.ptfxAsset)
        PlayerParticles[plyId] = nil
    end
end)

function addPropToPlayer(prop1, bone, off1, off2, off3, rot1, rot2, rot3, textureVariation, ped)
    if not ped then ped = PlayerPedId() end
    local Player = ped
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
    if Config.UseSameKeyForCancelAndHandsUp then
        RegisterCommand(Config.HandsUp.Command, function(source, args, raw) cancelEmote() end, false)
        if Config.HandsUp.Enable then
            if Config.HandsUp.KeyMapping.Enable then
                RegisterKeyMapping(Config.HandsUp.Command, "Cancel current emote and hands up", "keyboard", Config.HandsUp.KeyMapping.Key)
            else
                Citizen.CreateThread(function() while true do Citizen.Wait(0) if IsControlJustReleased(0, Config.HandsUp.NormalKey.Key) then cancelEmote() end end end)
            end
        end
    else
        -- Cancel Emote
        RegisterCommand(Config.CancelEmote.Command, function(source, args, raw) cancelEmote("0resmon") end, false)
        if Config.CancelEmote.Enable then
            if Config.CancelEmote.KeyMapping.Enable then
                RegisterKeyMapping(Config.CancelEmote.Command, "Cancel current emote", "keyboard", Config.CancelEmote.KeyMapping.Key)
            else
                Citizen.CreateThread(function() while true do Citizen.Wait(0) if IsControlJustReleased(0, Config.CancelEmote.NormalKey.Key) then cancelEmote("0resmon") end end end)
            end
        end
        -- Hands Up
        RegisterCommand(Config.HandsUp.Command, function(source, args, raw) cancelEmote() end, false)
        if Config.HandsUp.Enable then
            if Config.HandsUp.KeyMapping.Enable then
                RegisterKeyMapping(Config.HandsUp.Command, "Cancel current emote and hands up", "keyboard", Config.HandsUp.KeyMapping.Key)
            else
                Citizen.CreateThread(function() while true do Citizen.Wait(0) if IsControlJustReleased(0, Config.HandsUp.NormalKey.Key) then cancelEmote() end end end)
            end
        end
    end
end)

function cancelEmote(hu)
    if isInAnimation then
        currentAnimData = {}
        isInAnimation = false
        ClearPedTasks(PlayerPedId())
        cleanScenarioObjects(false)
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
        if lastPlayedAnimType == "posAnim" or animPosUsed then
            FreezeEntityPosition(PlayerPedId(), false)
            SetEntityCollision(PlayerPedId(), true, true)
            animPosUsed = false
            if animPosOldCoords and Config.TeleportBackAfterPlacedCancelled then
                SetEntityCoords(PlayerPedId(), animPosOldCoords.x, animPosOldCoords.y, animPosOldCoords.z)
            end
        end
        if lastPlayedAnimType == "synced" then
            if IsEntityPositionFrozen(PlayerPedId()) then
                FreezeEntityPosition(PlayerPedId(), false)
            end
            if GetEntityCollisionDisabled(PlayerPedId()) then
                SetEntityCollision(PlayerPedId(), true, true)
            end
            local targetPed
            if syncedTarget then
                targetPed = GetPlayerPed(GetPlayerFromServerId(syncedTarget))
                TriggerServerEvent('0resmon-animmenu:cancelEmote:server', syncedTarget)
            end
            if IsEntityAttachedToAnyPed(PlayerPedId()) or (targetPed and IsEntityAttachedToEntity(PlayerPedId(), targetPed)) then
                DetachEntity(PlayerPedId(), false, false)
            end
        end
        if lastPlayedAnimType == "gang" then
            removeAllPropsGang()
            SendNUIMessage({action = "openGangInfoMenu", state = false})
        end
        lastPlayedAnimType = nil
        AnimationThreadStatus = false
        PtfxNotif = false
        PtfxPrompt = false
    else
        if not hu then
            if Config.CanHandsup() and Config.HandsUp.Enable then
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

local scenarioObjects = {
    `p_amb_coffeecup_01`,
    `p_amb_joint_01`,
    `p_cs_ciggy_01`,
    `p_cs_ciggy_01b_s`,
    `p_cs_clipboard`,
    `prop_curl_bar_01`,
    `p_cs_joint_01`,
    `p_cs_joint_02`,
    `prop_acc_guitar_01`,
    `prop_amb_ciggy_01`,
    `prop_amb_phone`,
    `prop_beggers_sign_01`,
    `prop_beggers_sign_02`,
    `prop_beggers_sign_03`,
    `prop_beggers_sign_04`,
    `prop_bongos_01`,
    `prop_cigar_01`,
    `prop_cigar_02`,
    `prop_cigar_03`,
    `prop_cs_beer_bot_40oz_02`,
    `prop_cs_paper_cup`,
    `prop_cs_trowel`,
    `prop_fib_clipboard`,
    `prop_fish_slice_01`,
    `prop_fishing_rod_01`,
    `prop_fishing_rod_02`,
    `prop_notepad_02`,
    `prop_parking_wand_01`,
    `prop_rag_01`,
    `prop_scn_police_torch`,
    `prop_sh_cigar_01`,
    `prop_sh_joint_01`,
    `prop_tool_broom`,
    `prop_tool_hammer`,
    `prop_tool_jackham`,
    `prop_tennis_rack_01`,
    `prop_weld_torch`,
    `w_me_gclub`,
    `p_amb_clipboard_01`
}

function cleanScenarioObjects(isClone)
    local ped = isClone and ClonedPed or PlayerPedId()
    local playerCoords = GetEntityCoords(ped)
    for i = 1, #scenarioObjects do
        local deleteScenarioObject = GetClosestObjectOfType(playerCoords.x, playerCoords.y, playerCoords.z, 1.0, scenarioObjects[i], false, true, true)
        if DoesEntityExist(deleteScenarioObject) then
            SetEntityAsMissionEntity(deleteScenarioObject, false, false)
            DeleteObject(deleteScenarioObject)
        end
    end
end

Citizen.CreateThread(function()
    applyWalkAndExpression()
end)

Citizen.CreateThread(function()
    while not CoreReady do Citizen.Wait(1000) end
    if CoreName == "es_extended" then
        RegisterNetEvent('esx:playerLoaded', function(player, xPlayer, isNew)
            applyWalkAndExpression()
        end)
    elseif CoreName == "qb-core" or CoreName == "qbx_core" then
        while not next(GetPlayerData()) do Citizen.Wait(0) end
        RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
            applyWalkAndExpression()
        end)
    end
end)

function applyWalkAndExpression()
    local walk = GetResourceKvpString("0ranimmenuv2walk")
    local walkName = GetResourceKvpString("0ranimmenuv2walkname")
    if walk ~= nil then
        Citizen.Wait(2500) -- Delay, to ensure the player ped has loaded in
        RequestAnimSet(walk)
        while not HasAnimSetLoaded(walk) do Citizen.Wait(1) end
        SetPedMovementClipset(PlayerPedId(), walk, 0.2)
        -- RemoveAnimSet(walk)
        walkSet = walkName
    end
    local expression = GetResourceKvpString("0ranimmenuv2expression")
    if expression ~= nil then
        Citizen.Wait(2500) -- Delay, to ensure the player ped has loaded in
        SetFacialIdleAnimOverride(PlayerPedId(), expression, 0)
    end
end

RegisterCommand('eclone', function(source, args, raw) EmoteCommandStart(source, args, raw, "clone") end, false) -- Don't delete, edit, use
RegisterCommand('e', function(source, args, raw) EmoteCommandStart(source, args, raw) end, false)
RegisterCommand('emote', function(source, args, raw) EmoteCommandStart(source, args, raw) end, false)

function EmoteCommandStart(source, args, raw, type)
    if #args > 0 then
        if isInAnimation and type ~= "clone" then
            cancelEmote("0res")
        end
        local name = string.lower(args[1])
        if name == "c" then
            if isInAnimation then
                cancelEmote("0res")
            else
                Notify(Lang:t("notifications.no_emote_to_cancel"), 7500, "error")
            end
            return
        end
        Citizen.Wait(500)
        if RES2.General[name] ~= nil then
            OnEmotePlay(name, "general", type)
            return
        elseif RES2.Dances[name] ~= nil then
            OnEmotePlay(name, "dances", type)
            return
        elseif RES2.Expressions[name] ~= nil then
            OnEmotePlay(name, "expressions", type)
            return
        elseif RES2.Walks[name] ~= nil then
            OnEmotePlay(name, "walks", type)
            return
        elseif RES2.PlacedEmotes[name] ~= nil then
            OnEmotePlay(name, "placedemotes", type)
            return
        elseif RES2.PropEmotes[name] ~= nil then
            OnEmotePlay(name, "propemotes", type)
            return
        elseif RES2.Shared[name] ~= nil then
            OnEmotePlay(name, "shared", type)
            return
        else
            -- Notify(name .. " is not a valid emote.", 7500, "error")
        end
    end
end

function OnEmotePlay(name, category, type)
    removeAllPropsGang()
    local ped = PlayerPedId()
    if type == "clone" then ped = myClone end
    if not Config.CanOpenMenu() then return end
    if IsEntityInAir(ped) then
        return
    end
    if category == "propemotes" then
        if propEmoteTimeout then return end
        propEmoteTimeout = true
        SendNUIMessage({action = "propTimeout", state = true})
        Citizen.SetTimeout(Config.PropTimeout, function()
            propEmoteTimeout = false
            SendNUIMessage({action = "propTimeout", state = false})
        end)
    end
    if type ~= "clone" then
        cancelEmote("0res")
    end
    if currentAnimData and next(currentAnimData) then
        for k, v in pairs(currentAnimData) do
            if v.id == name then
                cancelEmote("0res")
            end
        end
    end
    local tables = {
        ["general"] = {name = "General", dict = 1, anim = 2},
        ["extra"] = {name = "Extra", dict = 1, anim = 2},
        ["propemotes"] = {name = "PropEmotes", dict = 1, anim = 2},
        ["dances"] = {name = "Dances", dict = 1, anim = 2},
        ["expressions"] = {name = "Expressions", dict = 2},
        ["walks"] = {name = "Walks", dict = 1},
        ["placedemotes"] = {name = "PlacedEmotes", dict = 1, anim = 2},
        ["shared"] = {name = "Shared", targetName = 4, dict = 1, anim = 2},
        ["erpemotes"] = {name = "ERP", targetName = 4, dict = 1, anim = 2},
        ["animalemotes"] = {name = "AnimalEmotes", dict = 1, anim = 2},
        ["gang"] = {name = "Gang", dict = 1, anim = 2},
    }
    local tableData = tables[category]
    local animData = RES2[tableData.name][name]
    local inVehicle = IsPedInAnyVehicle(ped, true)
    lastPlayedAnimType = nil
    if animData == nil then return print("Anim doesn't exist: " .. tableData.name .. "(" .. category .. ")") end
    local cAnimData = {animData = animData, category = category, id = name}
    -- if type ~= "clone" then
    --     table.insert(currentAnimData, cAnimData)
    -- end
    if category == "animalemotes" then
        local isPedAnimal = false
        local myPed = GetEntityModel(ped)
        for k, v in pairs(Config.AnimalPeds) do
            if myPed == GetHashKey(v) then
                isPedAnimal = true
            end
        end
        Citizen.Wait(500)
        if not isPedAnimal then
            return Notify(Lang:t("notifications.just_animals"), 7500, "error")
        end
    end
    if category == "general" or category == "propemotes" or category == "animalemotes" or category == "extra" or category == "gang" then
        lastPlayedAnimType = category
        local heading = GetEntityHeading(PlayerPedId())
        isInAnimation = true
        if animData.AnimationOptions and animData.AnimationOptions.Scenario or animData[1] == "Scenario" then
            if inVehicle then return end
            ClearPedTasks(ped)
            TaskStartScenarioInPlace(ped, animData[2], 0, true)
            cleanScenarioObjects(false)
            table.insert(currentAnimData, cAnimData)
        else
            if not loadAnim(animData[tableData.dict]) then return end
            table.insert(currentAnimData, cAnimData)
            local movementType = 1 -- Default movement type
            if animData.AnimationOptions then
                if animData.AnimationOptions.onFootFlag then
                    movementType = animData.AnimationOptions.onFootFlag
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
            if animData.AnimationOptions and animData.AnimationOptions.Duration then
                animationDuration = animData.AnimationOptions.Duration
            end
            if animData.AnimationOptions and animData.AnimationOptions.PtfxAsset then
                PtfxAsset = animData.AnimationOptions.PtfxAsset
                PtfxName = animData.AnimationOptions.PtfxName
                if animData.AnimationOptions.PtfxNoProp then
                    PtfxNoProp = animData.AnimationOptions.PtfxNoProp
                else
                    PtfxNoProp = false
                end
                Ptfx1, Ptfx2, Ptfx3, Ptfx4, Ptfx5, Ptfx6, PtfxScale = table.unpack(animData.AnimationOptions.PtfxPlacement)
                PtfxBone = animData.AnimationOptions.PtfxBone
                PtfxColor = animData.AnimationOptions.PtfxColor
                PtfxInfo = animData.AnimationOptions.PtfxInfo
                PtfxWait = animData.AnimationOptions.PtfxWait
                PtfxCanHold = animData.AnimationOptions.PtfxCanHold
                PtfxNotif = false
                PtfxPrompt = true
                RunAnimationThread()
                TriggerServerEvent("0resmon-animmenu:ptfxSync:server", PtfxAsset, PtfxName, vector3(Ptfx1, Ptfx2, Ptfx3), vector3(Ptfx4, Ptfx5, Ptfx6), PtfxBone, PtfxScale, PtfxColor)
            else
                PtfxPrompt = false
            end
            TaskPlayAnim(ped, animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
            RemoveAnimDict(animData[tableData.dict])
            if animData.AnimationOptions and animData.AnimationOptions.Prop then
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
                if animData.AnimationOptions.SecondProp then
                    secondPropName = animData.AnimationOptions.SecondProp
                    secondPropBone = animData.AnimationOptions.SecondPropBone
                    secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6 = table.unpack(animData.AnimationOptions.SecondPropPlacement)
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
                if animData.AnimationOptions.PtfxAsset and not PtfxNoProp then
                    TriggerServerEvent("0resmon-animmenu:ptfxSyncProp:server", ObjToNet(prop))
                end
            end
            if category == "gang" and animData.AnimationOptions and animData.AnimationOptions.fixHeading then
                while not IsEntityPlayingAnim(PlayerPedId(), animData[tableData.dict], animData[tableData.anim], movementType) do Citizen.Wait(0) end
                SetEntityHeading(PlayerPedId(), heading + 180.0)
                SendNUIMessage({action = "openGangInfoMenu", state = true})
            elseif category == "gang" then
                SendNUIMessage({action = "openGangInfoMenu", state = true})
            end
        end
    elseif category == "dances" then
        if not loadAnim(animData[tableData.dict]) then return end
        table.insert(currentAnimData, cAnimData)
        local movementType = 1
        local animationDuration = -1
        TaskPlayAnim(ped, animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
        RemoveAnimDict(animData[tableData.dict])
        isInAnimation = true
        if animData.AnimationOptions and animData.AnimationOptions.Prop then
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
            if animData.AnimationOptions.SecondProp then
                secondPropName = animData.AnimationOptions.SecondProp
                secondPropBone = animData.AnimationOptions.SecondPropBone
                secondPropPl1, secondPropPl2, secondPropPl3, secondPropPl4, secondPropPl5, secondPropPl6 = table.unpack(animData.AnimationOptions.SecondPropPlacement)
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
            if animData.AnimationOptions.PtfxAsset and not PtfxNoProp then
                TriggerServerEvent("0resmon-animmenu:ptfxSyncProp:server", ObjToNet(prop))
            end
        end
    elseif category == "expressions" then
        local expression = animData[tableData.dict]
        ClearFacialIdleAnimOverride(PlayerPedId())
        SetFacialIdleAnimOverride(PlayerPedId(), expression, 0)
        SetResourceKvp("0ranimmenuv2expression", expression)
    elseif category == "walks" then
        local walk = animData[tableData.dict]
        local name = animData[tableData.aname]
        walkSet = name
        ResetPedMovementClipset(ped, 1.0)
        ResetPedWeaponMovementClipset(ped)
        ResetPedStrafeClipset(ped)
        RequestAnimSet(walk)
        while not HasAnimSetLoaded(walk) do Citizen.Wait(1) end
        SetPedMovementClipset(ped, walk, 0.2)
        RemoveAnimSet(walk)
        SetResourceKvp("0ranimmenuv2walk", walk)
        SetResourceKvp("0ranimmenuv2walkname", walkSet)
    elseif category == "placedemotes" then
        lastPlayedAnimType = "posAnim"
        isInAnimation = true
        if inVehicle then return end
        if not loadAnim(animData[tableData.dict]) then return end
        table.insert(currentAnimData, cAnimData)
        local movementType = 1 -- Default movement type
        local animationDuration = -1
        TaskPlayAnim(ped, animData[tableData.dict], animData[tableData.anim], 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
        RemoveAnimDict(animData[tableData.dict])
    elseif category == "shared" or category == "erpemotes" then
        if requestActive then return end
        if inVehicle then return end
        nearbyPlayers = GetPlayersInArea(GetEntityCoords(PlayerPedId()), 5.0)
        if next(nearbyPlayers) ~= nil and next(nearbyPlayers) then
            menuActive = false
            SetNuiFocusKeepInput(false)
            SetNuiFocus(false, false)
            SendNUIMessage({action = "menu", state = false})
            requestActive = true
            ShowTextUI(Lang:t("notifications.waiting_for_a_decision"), "ESC")
            animData.type = category
            animData.animNumber = name
            animData.targetAnimName = animData[4] or nil
            for _, id in pairs(nearbyPlayers) do
                Create3DTextUIOnPlayer("0resmon-animmenu-request-players-" .. id, {
                    id = id,
                    displayDist = 5.0,
                    interactDist = 1.3,
                    enableKeyClick = true, -- If true when you near it and click key it will trigger the event that you write inside triggerData
                    keyNum = 38,
                    key = "E",
                    text = animData[3] .. "?",
                    theme = "green", -- or red
                    triggerData = {
                        triggerName = "0resmon-animmenu:sendAnimRequest:client",
                        args = {data = animData, id = id}
                    }
                })
            end
            Citizen.CreateThread(function()
                while requestActive do
                    Citizen.Wait(0)
                    if IsControlPressed(0, 322) then
                        Notify(Lang:t("notifications.request_cancelled"), 7500, "error")
                        requestActive = false
                        currentAnimData = {}
                        HideTextUI()
                        for _, id in pairs(nearbyPlayers) do
                            Delete3DTextUIOnPlayer("0resmon-animmenu-request-players-" .. id)
                        end
                        break
                    end
                end
            end)
            Citizen.SetTimeout(7500, function()
                if next(nearbyPlayers) ~= nil and next(nearbyPlayers) and requestActive then
                    Notify(Lang:t("notifications.request_timed_out"), 7500, "error")
                    requestActive = false
                    currentAnimData = {}
                    HideTextUI()
                    for _, id in pairs(nearbyPlayers) do
                        Delete3DTextUIOnPlayer("0resmon-animmenu-request-players-" .. id)
                    end
                end
            end)
        else
            Notify(Lang:t("notifications.no_players_nearby"), 7500, "error")
        end
    end
end

RegisterNetEvent('0r-animmenu:EmoteCommandStart:client', function(data)
    if type(data) == "string" then
        EmoteCommandStart(nil, {data, nil}, nil)
    else
        EmoteCommandStart(nil, {data[1], nil}, nil)
    end
end)

RegisterNetEvent('animations:client:EmoteCommandStart', function(data)
    if type(data) == "string" then
        EmoteCommandStart(nil, {data, nil}, nil)
    else
        EmoteCommandStart(nil, {data[1], nil}, nil)
    end
end)

exports("EmoteCommandStart", function(emoteName) EmoteCommandStart(nil, {emoteName, nil}, nil) end)
exports("EmoteCancel", cancelEmote("0res"))
exports('IsPlayerInAnim', function() return isInAnimation end)

RegisterCommand('resetquicks', function()
    SetResourceKvp("0ranimmenuquicksv2_new", json.encode({}))
    SendNUIMessage({action = "resetQuicks"})
end)

function setQuickKeys()
    for i = 1, 7 do
        local kvp2 = GetResourceKvpString('0ranimmenuquicksv2_new')
        if kvp2 then
            quickAnimations = json.decode(kvp2)
            for k, v in pairs(quickAnimations) do
                if tonumber(v.slot) == i then
                    if string.match(v.key, "NUM") then
                        local keyLoop = false
                        RegisterCommand('quickanim', function(source, args, raw)
                            if not keyLoop then
                                keyLoop = true
                                Citizen.CreateThread(function()
                                    while keyLoop do
                                        Citizen.Wait(0)
                                        if IsControlPressed(0, Config.NumKeys[1].Key) or IsDisabledControlPressed(0, Config.NumKeys[1].Key) then -- 1
                                            local anim = getQuickAnimOnSlot(1) 
                                            if anim then
                                                OnEmotePlay(anim.name, anim.category)
                                            else
                                                Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 1}), 7500, "error")
                                            end
                                            keyLoop = false
                                            break
                                        end
                                        if IsControlPressed(0, Config.NumKeys[2].Key) or IsDisabledControlPressed(0, Config.NumKeys[2].Key) then -- 2
                                            local anim = getQuickAnimOnSlot(2) 
                                            if anim then
                                                OnEmotePlay(anim.name, anim.category)
                                            else
                                                Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 2}), 7500, "error")
                                            end
                                            keyLoop = false
                                            break
                                        end
                                        if IsControlPressed(0, Config.NumKeys[3].Key) or IsDisabledControlPressed(0, Config.NumKeys[3].Key) then -- 3
                                            local anim = getQuickAnimOnSlot(3) 
                                            if anim then
                                                OnEmotePlay(anim.name, anim.category)
                                            else
                                                Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 3}), 7500, "error")
                                            end
                                            keyLoop = false
                                            break
                                        end
                                        if IsControlPressed(0, Config.NumKeys[4].Key) or IsDisabledControlPressed(0, Config.NumKeys[4].Key) then -- 4
                                            local anim = getQuickAnimOnSlot(4) 
                                            if anim then
                                                OnEmotePlay(anim.name, anim.category)
                                            else
                                                Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 4}), 7500, "error")
                                            end
                                            keyLoop = false
                                            break
                                        end
                                        if IsControlPressed(0, Config.NumKeys[5].Key) or IsDisabledControlPressed(0, Config.NumKeys[5].Key) then -- 5
                                            local anim = getQuickAnimOnSlot(5) 
                                            if anim then
                                                OnEmotePlay(anim.name, anim.category)
                                            else
                                                Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 5}), 7500, "error")
                                            end
                                            keyLoop = false
                                            break
                                        end
                                        if IsControlPressed(0, Config.NumKeys[6].Key) or IsDisabledControlPressed(0, Config.NumKeys[6].Key) then -- 6
                                            local anim = getQuickAnimOnSlot(6) 
                                            if anim then
                                                OnEmotePlay(anim.name, anim.category)
                                            else
                                                Config.Notify(Lang:t("notifications.quick_slot_empty", {slot = 6}), 7500, "error")
                                            end
                                            keyLoop = false
                                            break
                                        end
                                        if IsControlPressed(0, Config.NumKeys[7].Key) or IsDisabledControlPressed(0, Config.NumKeys[7].Key) then -- 7
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
                        end, false)
                        RegisterKeyMapping("quickanim", 'Play quick emote', "keyboard", Config.QuickPrimaryKey)
                    else
                        RegisterKeyMapping('animquickslot-' .. i .. '-' .. v.key, "Plays quick emote.", "keyboard", '')
                        RegisterKeyMapping('animquickslot-' .. i .. '-' .. v.key, "Plays quick emote.", "keyboard", v.key)
                        RegisterCommand('animquickslot-' .. i .. '-' .. v.key, function()
                            local anim = getQuickAnimOnSlot(i) 
                            if anim then
                                OnEmotePlay(anim.name, anim.category)
                            end
                        end)
                    end
                end
            end
            SendNUIMessage({action = "updateQuicks", quicks = quickAnimations})
        end
    end
end

function getQuickAnimOnSlot(slot)
    local quickAnimations = {}
    local kvp2 = GetResourceKvpString('0ranimmenuquicksv2_new')
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

RegisterNetEvent('0resmon-animmenu:setPedAlpha:server', function(id, alpha)
    local targetPlayer = GetPlayerFromServerId(id)
    if targetPlayer == -1 then return end
    local ped = GetPlayerPed(targetPlayer)
    if DoesEntityExist(ped) then
        SetEntityAlpha(ped, alpha, false)
    end
end)

RegisterNetEvent('0resmon-animmenu:sendAnimRequest:client', function(data)
    data.target = GetPlayerServerId(PlayerId())
    if next(nearbyPlayers) ~= nil and next(nearbyPlayers) and requestActive then
        requestActive = false
        HideTextUI()
        for _, id in pairs(nearbyPlayers) do
            Delete3DTextUIOnPlayer("0resmon-animmenu-request-players-" .. id)
        end
    end
    TriggerServerEvent('0resmon-animmenu:sendAnimRequest:server', data)
end)

local requestReceiveActive = false
RegisterNetEvent('0resmon-animmenu:receiveAnimRequest:client', function(data)
    requestReceiveActive = true
    ShowTextUI(Lang:t("notifications.waiting_for_a_decision"), "ESC")
    Create3DTextUIOnPlayer("0resmon-animmenu-request-player-" .. data.target, {
        id = data.target,
        displayDist = 5.0,
        interactDist = 1.3,
        enableKeyClick = true, -- If true when you near it and click key it will trigger the event that you write inside triggerData
        keyNum = 38,
        key = "E",
        text = data.data[3] .. "?",
        theme = "green", -- or red
        triggerData = {
            triggerName = "0resmon-animmenu:playAnimTogetherReceiver:client",
            args = {data = data}
        }
    })
    Citizen.CreateThread(function()
        while requestReceiveActive do
            Citizen.Wait(0)
            if IsControlPressed(0, 322) then
                Notify(Lang:t("notifications.request_cancelled"), 7500, "error")
                requestReceiveActive = false
                HideTextUI()
                Delete3DTextUIOnPlayer("0resmon-animmenu-request-player-" .. data.target)
                TriggerServerEvent('0resmon-animmenu:requstCanelledNotif:server', data.target)
                break
            end
        end
    end)
    Citizen.SetTimeout(7500, function()
        if requestReceiveActive then
            requestReceiveActive = false
            HideTextUI()
            Delete3DTextUIOnPlayer("0resmon-animmenu-request-player-" .. data.target)
            Notify(Lang:t("notifications.request_timed_out"), 7500, "error")
        end
    end)
end)

local syncedAnimDictLoaded = false
RegisterNetEvent('0resmon-animmenu:animDictLoaded:client', function()
    syncedAnimDictLoaded = true
end)

RegisterNetEvent('0resmon-animmenu:playAnimTogetherReceiver:client', function(data)
    requestReceiveActive = false
    requestActive = false
    lastPlayedAnimType = "synced"
    syncedTarget = data.data.target
    if data.target then
        syncedTarget = data.target
    end
    HideTextUI()
    Delete3DTextUIOnPlayer("0resmon-animmenu-request-player-" .. data.data.target)
    local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
    if inVehicle then return end
    TriggerServerEvent('0resmon-animmenu:playAnimTogetherSender:server', data)
    Citizen.Wait(300)
    -- Anim Opt.
    local targetPed = GetPlayerPed(GetPlayerFromServerId(syncedTarget))
    local animData = {}
    if data.data.data then 
        animData = data.data.data
    elseif data.data then
        animData = data.data
    end
    local animOptions = animData.AnimationOptions
    -- Anim
    local receiver = {}
    if data.data.data then 
        receiver = RES2["Shared"][data.data.data.targetAnimName]
    elseif data.data then
        receiver = RES2["Shared"][data.data.targetAnimName]
    end
    local animDict = receiver[1]
    local animName = receiver[2]
    if not loadAnim(animDict) then return end
    -- Target
    local sender = {}
    if data.data.data then 
        sender = RES2["Shared"][data.data.data.animNumber]
    elseif data.data then
        sender = RES2["Shared"][data.data.animNumber]
    end
    local targetAnimDict = sender[1]
    local targetAnimName = sender[2]
    if not loadAnim(targetAnimDict) then return end
    TriggerServerEvent('0resmon-animmenu:animDictLoaded:server', syncedTarget)
    local startTime = GetGameTimer()
    -- while not IsEntityPlayingAnim(targetPed, targetAnimDict, targetAnimName, 1) do
    --     Citizen.Wait(0)
    --     if GetGameTimer() - startTime > 5000 then
    --         break
    --     end
    -- end
    local targetAnimData = {}
    if data.data.data then 
        targetAnimData = RES2["Shared"][data.data.data.animNumber]
    elseif data.data then
        targetAnimData = RES2["Shared"][data.data.animNumber]
    end
    local movementType = 1
    if animOptions then
        if animOptions.onFootFlag then
            movementType = animOptions.onFootFlag
        elseif animOptions.EmoteMoving then
            movementType = 51
        elseif animOptions.EmoteLoop then
            movementType = 1
        elseif animOptions.EmoteStuck then
            movementType = 50
        end
        -- if movementType ~= Config.AnimFlag.MOVING then
        --     FreezeEntityPosition(PlayerPedId(), true)
        -- end
    end
    -- if receiver then
    --     if receiver.AnimationOptions then
    --         if receiver.AnimationOptions.Attachto then
    --             AttachEntityToEntity(
    --                 PlayerPedId(),
    --                 targetPed,
    --                 GetPedBoneIndex(targetPed, receiver.AnimationOptions.bone or -1),
    --                 receiver.AnimationOptions.xPos or 0.0,
    --                 receiver.AnimationOptions.yPos or 0.0,
    --                 receiver.AnimationOptions.zPos or 0.0,
    --                 receiver.AnimationOptions.xRot or 0.0,
    --                 receiver.AnimationOptions.yRot or 0.0,
    --                 receiver.AnimationOptions.zRot or 0.0,
    --                 false,
    --                 false,
    --                 false,
    --                 true,
    --                 1,
    --                 true
    --             )
    --             -- SetEntityCollision(PlayerPedId(), false, false)
    --         end
    --     end
    -- end
    local animationDuration = -1
    TaskPlayAnim(PlayerPedId(), animDict, animName, 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
    RemoveAnimDict(animDict)
    isInAnimation = true
    syncedAnimDictLoaded = false
    if animOptions and (animOptions.Duration or animOptions.EmoteDuration) then
        local duration = animOptions.Duration or animOptions.EmoteDuration
        Citizen.Wait(duration)
        if IsEntityPositionFrozen(PlayerPedId()) then
            FreezeEntityPosition(PlayerPedId(), false)
        end
        if GetEntityCollisionDisabled(PlayerPedId()) then
            SetEntityCollision(PlayerPedId(), true, true)
        end
        TriggerServerEvent('0resmon-animmenu:cancelEmote:server', syncedTarget)
        if IsEntityAttachedToAnyPed(PlayerPedId()) or IsEntityAttachedToEntity(PlayerPedId(), targetPed) then
            DetachEntity(PlayerPedId(), false, false)
        end
    end
end)

RegisterNetEvent('0resmon-animmenu:playAnimTogetherSender:client', function(data)
    requestReceiveActive = false
    requestActive = false
    lastPlayedAnimType = "synced"
    syncedTarget = data.data.id
    if data.id then
        syncedTarget = data.id
    end
    local inVehicle = IsPedInAnyVehicle(PlayerPedId(), true)
    if inVehicle then return end
    local targetPed = GetPlayerPed(GetPlayerFromServerId(syncedTarget))
    local sender = {}
    if data.data.data then 
        sender = RES2["Shared"][data.data.data.animNumber]
    elseif data.data then
        sender = RES2["Shared"][data.data.animNumber]
    end
    local animDict = sender[1]
    local animName = sender[2]
    local animOptions = sender.AnimationOptions
    if not loadAnim(animDict) then return end
    -- Target
    local receiver = {}
    if data.data.data then 
        receiver = RES2["Shared"][data.data.data.targetAnimName]
    elseif data.data then
        receiver = RES2["Shared"][data.data.targetAnimName]
    end
    local targetAnimDict = receiver[1]
    local targetAnimName = receiver[2]
    if not loadAnim(targetAnimDict) then return end
    TriggerServerEvent('0resmon-animmenu:animDictLoaded:server', syncedTarget)
    local startTime = GetGameTimer()
    while not IsEntityPlayingAnim(targetPed, targetAnimDict, targetAnimName, 1) do
        Citizen.Wait(500)
        if GetGameTimer() - startTime > 5000 then
            break
        end
    end
    local targetAnimData = {}
    if data.data.data then 
        targetAnimData = RES2["Shared"][data.data.data.targetAnimName].AnimationOptions
    elseif data.data then
        targetAnimData = RES2["Shared"][data.data.targetAnimName].AnimationOptions
    end
    local movementType = 1
    if animOptions then
        if animOptions.onFootFlag then
            movementType = animOptions.onFootFlag
        elseif animOptions.EmoteMoving then
            movementType = 51
        elseif animOptions.EmoteLoop then
            movementType = 1
        elseif animOptions.EmoteStuck then
            movementType = 50
        end
        if animOptions.Attachto then
            AttachEntityToEntity(
                PlayerPedId(),
                targetPed,
                GetPedBoneIndex(targetPed, animOptions.bone or -1),
                animOptions.xPos or 0.0,
                animOptions.yPos or 0.0,
                animOptions.zPos or 0.0,
                animOptions.xRot or 0.0,
                animOptions.yRot or 0.0,
                animOptions.zRot or 0.0,
                false,
                false,
                false,
                true,
                1,
                true
            )
        else
            if targetAnimData then
                if targetAnimData.Attachto then
                    TriggerServerEvent('0r-animmenu:attachPeds:server', syncedTarget, GetPlayerServerId(PlayerId()), targetAnimData)
                    -- AttachEntityToEntity(
                    --     PlayerPedId(),
                    --     targetPed,
                    --     GetPedBoneIndex(targetPed, targetAnimData.bone or -1),
                    --     targetAnimData.xPos or 0.0,
                    --     targetAnimData.yPos or 0.0,
                    --     targetAnimData.zPos or 0.0,
                    --     targetAnimData.xRot or 0.0,
                    --     targetAnimData.yRot or 0.0,
                    --     targetAnimData.zRot or 0.0,
                    --     false,
                    --     false,
                    --     false,
                    --     true,
                    --     1,
                    --     true
                    -- )
                end
            end
        end
    else
        if targetAnimData then
            if targetAnimData.Attachto then
                TriggerServerEvent('0r-animmenu:attachPeds:server', syncedTarget, GetPlayerServerId(PlayerId()), targetAnimData)
                -- AttachEntityToEntity(
                --     PlayerPedId(),
                --     targetPed,
                --     GetPedBoneIndex(targetPed, targetAnimData.bone or -1),
                --     targetAnimData.xPos or 0.0,
                --     targetAnimData.yPos or 0.0,
                --     targetAnimData.zPos or 0.0,
                --     targetAnimData.xRot or 0.0,
                --     targetAnimData.yRot or 0.0,
                --     targetAnimData.zRot or 0.0,
                --     false,
                --     false,
                --     false,
                --     true,
                --     1,
                --     true
                -- )
            end
        end
    end
    local heading = GetEntityHeading(targetPed)
    local syncOffsetSide = (animOptions?.SyncOffsetSide or targetAnimData?.SyncOffsetSide or 0) + 0.0
    local syncOffsetFront = (animOptions?.SyncOffsetFront or targetAnimData?.SyncOffsetFront or 0) + 0.0
    local syncOffsetHeight = (animOptions?.SyncOffsetHeight or targetAnimData?.SyncOffsetHeight or 0) + 0.0
    local syncOffsetHeading = (animOptions?.SyncOffsetHeading or targetAnimData?.SyncOffsetHeading or 180) + 0.0
    local coords = GetOffsetFromEntityInWorldCoords(targetPed, syncOffsetSide, syncOffsetFront, syncOffsetHeight)
    SetEntityHeading(PlayerPedId(), heading - syncOffsetHeading)
    SetEntityCoordsNoOffset(PlayerPedId(), coords.x, coords.y, coords.z)
    cancelEmote("0res")
    Citizen.Wait(300)
    local animationDuration = -1
    TaskPlayAnim(PlayerPedId(), animDict, animName, 5.0, 5.0, animationDuration, movementType, 0, false, false, false)
    RemoveAnimDict(animDict)
    isInAnimation = true
    syncedAnimDictLoaded = false
    if animOptions and (animOptions.Duration or animOptions.EmoteDuration) then
        local duration = animOptions.Duration or animOptions.EmoteDuration
        Citizen.Wait(duration)
        if IsEntityPositionFrozen(PlayerPedId()) then
            FreezeEntityPosition(PlayerPedId(), false)
        end
        if GetEntityCollisionDisabled(PlayerPedId()) then
            SetEntityCollision(PlayerPedId(), true, true)
        end
        TriggerServerEvent('0resmon-animmenu:cancelEmote:server', syncedTarget)
        if IsEntityAttachedToAnyPed(PlayerPedId()) or IsEntityAttachedToEntity(PlayerPedId(), targetPed) then
            DetachEntity(PlayerPedId(), false, false)
        end
    end
end)

RegisterNetEvent('0r-animmenu:attachPeds:client', function(targetId, targetAnimData)
    local myPed = PlayerPedId()
    local targetPed = GetPlayerPed(GetPlayerFromServerId(targetId))
    AttachEntityToEntity(
        myPed,
        targetPed,
        GetPedBoneIndex(targetPed, targetAnimData.bone or -1),
        targetAnimData.xPos or 0.0,
        targetAnimData.yPos or 0.0,
        targetAnimData.zPos or 0.0,
        targetAnimData.xRot or 0.0,
        targetAnimData.yRot or 0.0,
        targetAnimData.zRot or 0.0,
        false,
        false,
        false,
        true,
        1,
        true
    )
end)

RegisterNetEvent('0resmon-animmenu:cancelEmote:client', function()
    cancelEmote("0res")
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

RegisterNetEvent('0r-animmenu:getAnimationList:client', function()
    TriggerEvent('0r-anim-recorder:setAnimationList:client', RES2)
end)

-- function gangPropsMenu()
--     if GetResourceState("ox_lib") == "started" then
--         local options = {}
--         for _, prop in ipairs(Config.GangEmoteProps) do
--             table.insert(options, {
--                 title = prop.label .. " (Right Hand)",
--                 description = "Attach " .. prop.label .. " to right hand",
--                 onSelect = function()
--                     attachPropToHand(
--                         prop.objName,
--                         "right",
--                         prop.handOffsets.rightHand.pos,
--                         prop.handOffsets.rightHand.rot
--                     )
--                 end
--             })
--             table.insert(options, {
--                 title = prop.label .. " (Left Hand)",
--                 description = "Attach " .. prop.label .. " to left hand",
--                 onSelect = function()
--                     attachPropToHand(
--                         prop.objName,
--                         "left",
--                         prop.handOffsets.leftHand.pos,
--                         prop.handOffsets.leftHand.rot
--                     )
--                 end
--             })
--         end
--         exports["ox_lib"]:registerContext({
--             id = 'prop_menu',
--             title = 'Prop Options',
--             options = options
--         })
--         exports["ox_lib"]:showContext('prop_menu')
--     elseif GetResourceState("qb-menu") == "started" then
--         local menu = {
--             {
--                 header = "Prop Options",
--                 isMenuHeader = true
--             }
--         }
--         for _, prop in ipairs(Config.GangEmoteProps) do
--             table.insert(menu, {
--                 header = prop.label .. " (Right Hand)",
--                 txt = "Attach " .. prop.label .. " to right hand",
--                 action = function()
--                     attachPropToHand(
--                         prop.objName,
--                         "right",
--                         prop.handOffsets.rightHand.pos,
--                         prop.handOffsets.rightHand.rot
--                     )
--                 end
--             })
--             table.insert(menu, {
--                 header = prop.label .. " (Left Hand)",
--                 txt = "Attach " .. prop.label .. " to left hand",
--                 action = function()
--                     attachPropToHand(
--                         prop.objName,
--                         "left",
--                         prop.handOffsets.leftHand.pos,
--                         prop.handOffsets.leftHand.rot
--                     )
--                 end
--             })
--         end
--         exports['qb-menu']:openMenu(menu)
--     end
-- end

RegisterKeyMapping(Config.GangEmotePropMenuCommand, "Opens gang anim prop menu", "keyboard", Config.GangEmotePropMenuKey)
RegisterCommand(Config.GangEmotePropMenuCommand, function()
    if lastPlayedAnimType == "gang" then
        gangPropsMenu()
    end
end)

RegisterKeyMapping(Config.GangEmotePropMenuInfoCommand, "Opens gang anim prop info menu", "keyboard", Config.GangEmotePropMenuInfoKey)
RegisterCommand(Config.GangEmotePropMenuInfoCommand, function()
    if lastPlayedAnimType == "gang" then
        SendNUIMessage({action = "openGangInfoMenu", state = nil})
    end
end)

function gangPropsMenu()
    if GetResourceState("ox_lib") == "started" then
        exports.ox_lib:registerContext({
            id = 'prop_menu',
            title = 'Prop Options',
            options = {
                {
                    title = "Right Hand",
                    description = "Show right hand props",
                    onSelect = function()
                        local rightOptions = {}
                        for _, prop in ipairs(Config.GangEmoteProps) do
                            table.insert(rightOptions, {
                                title = prop.label,
                                description = "Attach " .. prop.label .. " to right hand",
                                onSelect = function()
                                    attachPropToHand(
                                        prop.objName,
                                        "right",
                                        prop.handOffsets.rightHand.pos,
                                        prop.handOffsets.rightHand.rot
                                    )
                                    exports.ox_lib:showContext('prop_menu_right')
                                end
                            })
                        end

                        exports.ox_lib:registerContext({
                            id = 'prop_menu_right',
                            title = 'Right Hand Props',
                            menu = 'prop_menu',
                            options = rightOptions
                        })
                        exports.ox_lib:showContext('prop_menu_right')
                    end
                },
                {
                    title = "Left Hand",
                    description = "Show left hand props",
                    onSelect = function()
                        local leftOptions = {}
                        for _, prop in ipairs(Config.GangEmoteProps) do
                            table.insert(leftOptions, {
                                title = prop.label,
                                description = "Attach " .. prop.label .. " to left hand",
                                onSelect = function()
                                    attachPropToHand(
                                        prop.objName,
                                        "left",
                                        prop.handOffsets.leftHand.pos,
                                        prop.handOffsets.leftHand.rot
                                    )
                                    exports.ox_lib:showContext('prop_menu_left')
                                end
                            })
                        end

                        exports.ox_lib:registerContext({
                            id = 'prop_menu_left',
                            title = 'Left Hand Props',
                            menu = 'prop_menu',
                            options = leftOptions
                        })
                        exports.ox_lib:showContext('prop_menu_left')
                    end
                }
            }
        })

        exports.ox_lib:showContext('prop_menu')
    elseif GetResourceState("qb-menu") == "started" then
        local mainMenu = {
            {
                header = "Prop Options",
                isMenuHeader = true
            },
            {
                header = "Right Hand",
                txt = "Show all right-hand props",
                params = {
                    event = "showRightHandProps"
                }
            },
            {
                header = "Left Hand",
                txt = "Show all left-hand props",
                params = {
                    event = "showLeftHandProps"
                }
            }
        }
        exports['qb-menu']:openMenu(mainMenu)
        RegisterNetEvent("showRightHandProps", function()
            local menu = {
                { header = "Right Hand Props", isMenuHeader = true }
            }
            for _, prop in ipairs(Config.GangEmoteProps) do
                table.insert(menu, {
                    header = prop.label,
                    txt = "Attach " .. prop.label .. " to right hand",
                    params = { event = "attachPropRight", args = prop }
                })
            end
            exports['qb-menu']:openMenu(menu)
        end)
        RegisterNetEvent("showLeftHandProps", function()
            local menu = {
                { header = "Left Hand Props", isMenuHeader = true }
            }
            for _, prop in ipairs(Config.GangEmoteProps) do
                table.insert(menu, {
                    header = prop.label,
                    txt = "Attach " .. prop.label .. " to left hand",
                    params = { event = "attachPropLeft", args = prop }
                })
            end
            exports['qb-menu']:openMenu(menu)
        end)
        RegisterNetEvent("attachPropRight", function(prop)
            attachPropToHand(
                prop.objName,
                "right",
                prop.handOffsets.rightHand.pos,
                prop.handOffsets.rightHand.rot
            )
        end)
        RegisterNetEvent("attachPropLeft", function(prop)
            attachPropToHand(
                prop.objName,
                "left",
                prop.handOffsets.leftHand.pos,
                prop.handOffsets.leftHand.rot
            )
        end)
    end
end

-- function isAreaClear(ped, distance)
--     local pedCoords = GetEntityCoords(ped)
--     local directions = {
--         GetEntityForwardVector(ped),
--         GetEntityForwardVector(ped) * -1.0,
--         vector3(GetEntityForwardVector(ped).y, -GetEntityForwardVector(ped).x, 0.0),
--         vector3(-GetEntityForwardVector(ped).y, GetEntityForwardVector(ped).x, 0.0)
--     }
--     for _, dir in ipairs(directions) do
--         local startPos = pedCoords + vector3(0.0, 0.0, 0.5)
--         local endPos = startPos + (dir * distance)
--         local rayHandle = StartShapeTestRay(startPos.x, startPos.y, startPos.z, endPos.x, endPos.y, endPos.z, -1, ped, 0)
--         local _, hit, _, _, _ = GetShapeTestResult(rayHandle)
--         if hit then
--             return false
--         end
--     end
--     return true
-- end

exports('getHandsup', function() return handsUp end)

local function exportHandler(exportName, func)
    AddEventHandler(('__cfx_export_qb-smallresources_%s'):format(exportName), function(setCB)
        setCB(func)
    end)
end

exportHandler('getHandsup', function()
    return handsUp
end)

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