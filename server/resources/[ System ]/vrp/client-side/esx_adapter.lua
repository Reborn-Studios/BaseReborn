Core = {}
ESX.PlayerData = {}
ESX.PlayerLoaded = false
Core.CurrentRequestId = 0
Core.ServerCallbacks = {}
Core.TimeoutCallbacks = {}
Core.Input = {}
ESX.UI = {}
ESX.UI.HUD = {}
ESX.UI.HUD.RegisteredElements = {}
ESX.UI.Menu = {}
ESX.UI.Menu.RegisteredTypes = {}
ESX.UI.Menu.Opened = {}

ESX.Game = {}
ESX.Game.Utils = {}

ESX.Scaleform = {}
ESX.Scaleform.Utils = {}

ESX.Streaming = {}

exportHandler("es_extended","getSharedObject", function()
    return ESX
end)

AddEventHandler('esx:getSharedObject', function(cb)
    SetTimeout(1500, function()
        TriggerEvent("esx:playerLoaded", ESX.GetPlayerData())
        TriggerEvent("esx:setJob", ESX.PlayerData.job)
    end)
	cb(ESX)
end)

exports('getSharedObject', function()
	return ESX
end)

function ESX.SetTimeout(msec, cb)
    table.insert(Core.TimeoutCallbacks, {
        time = GetGameTimer() + msec,
        cb = cb
    })
    return #Core.TimeoutCallbacks
end

function ESX.ClearTimeout(i)
    Core.TimeoutCallbacks[i] = nil
end

function ESX.IsPlayerLoaded()
    return ESX.PlayerLoaded
end

function ESX.GetPlayerData()
    return ESX.PlayerData
end

function ESX.SearchInventory(items, count)
    if type(items) == 'string' then
        items = {items}
    end

    local returnData = {}
    local itemCount = #items

    for i = 1, itemCount do
        local itemName = items[i]
        returnData[itemName] = count and 0

        for _, item in pairs(ESX.PlayerData.inventory) do
            if item.name == itemName then
                if count then
                    returnData[itemName] = returnData[itemName] + item.count
                else
                    returnData[itemName] = item
                end
            end
        end
    end

    if next(returnData) then
        return itemCount == 1 and returnData[items[1]] or returnData
    end
end

function ESX.SetPlayerData(key, val)
    local current = ESX.PlayerData[key]
    ESX.PlayerData[key] = val
    if key ~= 'inventory' and key ~= 'loadout' then
        if type(val) == 'table' or val ~= current then
            TriggerEvent('esx:setPlayerData', key, val, current)
        end
    end
end

function ESX.Progressbar(message, length, Options)
    lib.progressCircle({
        duration = length,
        position = 'bottom',
        useWhileDead = false,
    })
end

function ESX.ShowNotification(message, type, length)
    lib.notify({
        title = 'Notificação',
        description = message,
        type = type,
        duration = length
    })
end

function ESX.TextUI(message, type)
    lib.showTextUI(message)
end

function ESX.HideUI()
    lib.hideTextUI()
end

function ESX.ShowAdvancedNotification(sender, subject, msg, textureDict, iconType, flash, saveToBrief, hudColorIndex)
    if saveToBrief == nil then
        saveToBrief = true
    end
    AddTextEntry('esxAdvancedNotification', msg)
    BeginTextCommandThefeedPost('esxAdvancedNotification')
    if hudColorIndex then
        ThefeedSetNextPostBackgroundColor(hudColorIndex)
    end
    EndTextCommandThefeedPostMessagetext(textureDict, textureDict, false, iconType, sender, subject)
    EndTextCommandThefeedPostTicker(flash or false, saveToBrief)
end

function ESX.ShowHelpNotification(msg, thisFrame, beep, duration)
    AddTextEntry('esxHelpNotification', msg)

    if thisFrame then
        DisplayHelpTextThisFrame('esxHelpNotification', false)
    else
        if beep == nil then
            beep = true
        end
        BeginTextCommandDisplayHelp('esxHelpNotification')
        EndTextCommandDisplayHelp(0, false, beep, duration or -1)
    end
end

function ESX.ShowFloatingHelpNotification(msg, coords)
    AddTextEntry('esxFloatingHelpNotification', msg)
    SetFloatingHelpTextWorldPosition(1, coords)
    SetFloatingHelpTextStyle(1, 1, 2, -1, 3, 0)
    BeginTextCommandDisplayHelp('esxFloatingHelpNotification')
    EndTextCommandDisplayHelp(2, false, false, -1)
end

ESX.HashString = function(str)
    local format = string.format
    local upper = string.upper
    local gsub = string.gsub
    local hash = joaat(str)
    local input_map = format("~INPUT_%s~", upper(format("%x", hash)))
    input_map = string.gsub(input_map, "FFFFFFFF", "")

    return input_map
end

if GetResourceState("esx_context") ~= "missing" then
    function ESX.OpenContext(...)
        exports["esx_context"]:Open(...)
    end

    function ESX.PreviewContext(...)
        exports["esx_context"]:Preview(...)
    end

    function ESX.CloseContext(...)
        exports["esx_context"]:Close(...)
    end

    function ESX.RefreshContext(...)
       exports["esx_context"]:Refresh(...) 
    end
else 
    function ESX.OpenContext()
        print("[ERROR] Tried to open context menu, but esx_context is missing!")
    end

    function ESX.PreviewContext()
        print("[ERROR] Tried to preview context menu, but esx_context is missing!")
    end

    function ESX.CloseContext()
        print("[ERROR] Tried to close context menu, but esx_context is missing!")
    end

    function ESX.RefreshContext()
        print("[ERROR] Tried to close context menu, but esx_context is missing!")
    end
end

ESX.RegisterInput = function(command_name, label, input_group, key, on_press, on_release)
    RegisterCommand(on_release ~= nil and "+" .. command_name or command_name, on_press)
    Core.Input[command_name] = on_release ~= nil and ESX.HashString("+" .. command_name) or ESX.HashString(command_name)
    if on_release then
        RegisterCommand("-" .. command_name, on_release)
    end
    RegisterKeyMapping(on_release ~= nil and "+" .. command_name or command_name, label, input_group, key)
end

function ESX.TriggerServerCallback(name, cb, ...)
    Core.ServerCallbacks[Core.CurrentRequestId] = cb
    TriggerServerEvent('esx:triggerServerCallback', name, Core.CurrentRequestId, ...)
    Core.CurrentRequestId = Core.CurrentRequestId < 65535 and Core.CurrentRequestId + 1 or 0
end

function ESX.UI.HUD.SetDisplay(opacity)
    SendNUIMessage({
        action = 'setHUDDisplay',
        opacity = opacity
    })
end

function ESX.UI.HUD.RegisterElement(name, index, priority, html, data)
    local found = false

    for i = 1, #ESX.UI.HUD.RegisteredElements, 1 do
        if ESX.UI.HUD.RegisteredElements[i] == name then
            found = true
            break
        end
    end

    if found then
        return
    end

    ESX.UI.HUD.RegisteredElements[#ESX.UI.HUD.RegisteredElements + 1] = name

    SendNUIMessage({
        action = 'insertHUDElement',
        name = name,
        index = index,
        priority = priority,
        html = html,
        data = data
    })

    ESX.UI.HUD.UpdateElement(name, data)
end

function ESX.UI.HUD.RemoveElement(name)
    for i = 1, #ESX.UI.HUD.RegisteredElements, 1 do
        if ESX.UI.HUD.RegisteredElements[i] == name then
            table.remove(ESX.UI.HUD.RegisteredElements, i)
            break
        end
    end

    SendNUIMessage({
        action = 'deleteHUDElement',
        name = name
    })
end

function ESX.UI.HUD.Reset()
    SendNUIMessage({
        action = 'resetHUDElements'
    })
    ESX.UI.HUD.RegisteredElements = {}
end

function ESX.UI.HUD.UpdateElement(name, data)
    SendNUIMessage({
        action = 'updateHUDElement',
        name = name,
        data = data
    })
end

function ESX.UI.Menu.RegisterType(type, open, close)
    ESX.UI.Menu.RegisteredTypes[type] = {
        open = open,
        close = close
    }
end

---------------------- DEFAULT TYPE ----------------------

CreateThread(function()
    local GUI, MenuType, OpenedMenus = {}, 'default', 0
    GUI.Time = 0

    local function openMenu(namespace, name, data)
        OpenedMenus = OpenedMenus + 1
        SendNUIMessage({
            action = 'openMenu',
            namespace = namespace,
            name = name,
            data = data
        })
    end

    local function closeMenu(namespace, name)
        OpenedMenus = OpenedMenus - 1
        SendNUIMessage({
            action = 'closeMenu',
            namespace = namespace,
            name = name
        })
    end

    ESX.UI.Menu.RegisterType(MenuType, openMenu, closeMenu)

    RegisterNUICallback('menu_submit', function(data, cb)
        local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)
        if menu.submit ~= nil then
            menu.submit(data, menu)
        end
        cb('OK')
    end)

    RegisterNUICallback('menu_cancel', function(data, cb)
        local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)

        if menu.cancel ~= nil then
            menu.cancel(data, menu)
        end
        cb('OK')
    end)

    RegisterNUICallback('menu_change', function(data, cb)
        local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)

        for i = 1, #data.elements, 1 do
            menu.setElement(i, 'value', data.elements[i].value)

            if data.elements[i].selected then
                menu.setElement(i, 'selected', true)
            else
                menu.setElement(i, 'selected', false)
            end
        end

        if menu.change ~= nil then
            menu.change(data, menu)
        end
        cb('OK')
    end)

    CreateThread(function()
        while true do
            local Sleep = 1000
            if OpenedMenus > 0 then
                Sleep = 10
                if IsControlPressed(0, 18) and IsUsingKeyboard(0) and (GetGameTimer() - GUI.Time) > 200 then
                    SendNUIMessage({
                        action = 'controlPressed',
                        control = 'ENTER'
                    })
                    GUI.Time = GetGameTimer()
                end

                if IsControlPressed(0, 177) and IsUsingKeyboard(0) and (GetGameTimer() - GUI.Time) > 200 then
                    SendNUIMessage({
                        action = 'controlPressed',
                        control = 'BACKSPACE'
                    })
                    GUI.Time = GetGameTimer()
                end

                if IsControlPressed(0, 27) and IsUsingKeyboard(0) and (GetGameTimer() - GUI.Time) > 200 then
                    SendNUIMessage({
                        action = 'controlPressed',
                        control = 'TOP'
                    })
                    GUI.Time = GetGameTimer()
                end

                if IsControlPressed(0, 173) and IsUsingKeyboard(0) and (GetGameTimer() - GUI.Time) > 200 then
                    SendNUIMessage({
                        action = 'controlPressed',
                        control = 'DOWN'
                    })
                    GUI.Time = GetGameTimer()
                end

                if IsControlPressed(0, 174) and IsUsingKeyboard(0) and (GetGameTimer() - GUI.Time) > 200 then
                    SendNUIMessage({
                        action = 'controlPressed',
                        control = 'LEFT'
                    })
                    GUI.Time = GetGameTimer()
                end

                if IsControlPressed(0, 175) and IsUsingKeyboard(0) and (GetGameTimer() - GUI.Time) > 200 then
                    SendNUIMessage({
                        action = 'controlPressed',
                        control = 'RIGHT'
                    })
                    GUI.Time = GetGameTimer()
                end
            end
            Wait(Sleep)
        end
    end)
end)

----------------------------------------------------------------
------------------ DIALOG TYPE ---------------------------------

CreateThread(function()
    Wait(500)
    local Timeouts, OpenedMenus, MenuType = {}, {}, 'dialog'

    local function openMenu(namespace, name, data)
        for i=1, #Timeouts, 1 do
            ESX.ClearTimeout(Timeouts[i])
        end

        OpenedMenus[namespace .. '_' .. name] = true

        SendNUIMessage({
            action = 'openDialogMenu',
            namespace = namespace,
            name = name,
            data = data
        })

        local timeoutId = ESX.SetTimeout(200, function()
            SetNuiFocus(true, true)
        end)

        table.insert(Timeouts, timeoutId)
    end

    local function closeMenu(namespace, name)
        OpenedMenus[namespace .. '_' .. name] = nil

        SendNUIMessage({
            action = 'closeDialogMenu',
            namespace = namespace,
            name = name,
        })

        if ESX.Table.SizeOf(OpenedMenus) == 0 then
            SetNuiFocus(false)
        end

    end

    ESX.UI.Menu.RegisterType(MenuType, openMenu, closeMenu)

    AddEventHandler('esx_menu_dialog:message:menu_submit', function(data)
        local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)
        local cancel = false

        if menu.submit then
            -- is the submitted data a number?
            if tonumber(data.value) then
                data.value = ESX.Math.Round(tonumber(data.value))

                -- check for negative value
                if tonumber(data.value) <= 0 then
                    cancel = true
                end
            end

            data.value = ESX.Math.Trim(data.value)

            -- don't submit if the value is negative or if it's 0
            if cancel then
                ESX.ShowNotification('That input is not allowed!')
            else
                menu.submit(data, menu)
            end
        end
    end)

    AddEventHandler('esx_menu_dialog:message:menu_cancel', function(data)
        local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)

        if menu.cancel ~= nil then
            menu.cancel(data, menu)
        end
    end)

    AddEventHandler('esx_menu_dialog:message:menu_change', function(data)
        local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)

        if menu.change ~= nil then
            menu.change(data, menu)
        end
    end)

    CreateThread(function()
        while true do
            Wait(0)

            if ESX.Table.SizeOf(OpenedMenus) > 0 then
                DisableControlAction(0, 1,   true) -- LookLeftRight
                DisableControlAction(0, 2,   true) -- LookUpDown
                DisableControlAction(0, 142, true) -- MeleeAttackAlternate
                DisableControlAction(0, 106, true) -- VehicleMouseControlOverride
                DisableControlAction(0, 12, true) -- WeaponWheelUpDown
                DisableControlAction(0, 14, true) -- WeaponWheelNext
                DisableControlAction(0, 15, true) -- WeaponWheelPrev
                DisableControlAction(0, 16, true) -- SelectNextWeapon
                DisableControlAction(0, 17, true) -- SelectPrevWeapon
            else
                Wait(1500)
            end
        end
    end)
end)

----------------------------------------------------------------
------------------  LIST TYPE  ---------------------------------

CreateThread(function()
	local MenuType    = 'list'
	local OpenedMenus = {}

	local function openMenu(namespace, name, data)

		OpenedMenus[namespace .. '_' .. name] = true

		SendNUIMessage({
			action    = 'openMenuList',
			namespace = namespace,
			name      = name,
			data      = data
		})
		SetTimeout(200, function()
		SetNuiFocus(true, true)
		 end)
	end

	local function closeMenu(namespace, name)

		OpenedMenus[namespace .. '_' .. name] = nil
		local OpenedMenuCount = 0

		SendNUIMessage({
			action    = 'closeMenuList',
			namespace = namespace,
			name      = name,
		})

		for k,v in pairs(OpenedMenus) do
			if v == true then
				OpenedMenuCount = OpenedMenuCount + 1
			end
		end

		if OpenedMenuCount == 0 then
			SetNuiFocus(false)
		end

	end

	ESX.UI.Menu.RegisterType(MenuType, openMenu, closeMenu)

	RegisterNUICallback('menu_submit', function(data, cb)
		local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)
		if menu.submit then
			menu.submit(data, menu)
		end
		cb('OK')
	end)

	RegisterNUICallback('menu_cancel', function(data, cb)
		local menu = ESX.UI.Menu.GetOpened(MenuType, data._namespace, data._name)

		if menu.cancel ~= nil then
			menu.cancel(data, menu)
		end

		cb('OK')
	end)

end)

function ESX.UI.Menu.Open(type, namespace, name, data, submit, cancel, change, close)
    local menu = {}

    menu.type = type
    menu.namespace = namespace
    menu.name = name
    menu.data = data
    menu.submit = submit
    menu.cancel = cancel
    menu.change = change

    menu.close = function()

        ESX.UI.Menu.RegisteredTypes[type].close(namespace, name)

        for i = 1, #ESX.UI.Menu.Opened, 1 do
            if ESX.UI.Menu.Opened[i] then
                if ESX.UI.Menu.Opened[i].type == type and ESX.UI.Menu.Opened[i].namespace == namespace and
                    ESX.UI.Menu.Opened[i].name == name then
                    ESX.UI.Menu.Opened[i] = nil
                end
            end
        end

        if close then
            close()
        end

    end

    menu.update = function(query, newData)

        for i = 1, #menu.data.elements, 1 do
            local match = true

            for k, v in pairs(query) do
                if menu.data.elements[i][k] ~= v then
                    match = false
                end
            end

            if match then
                for k, v in pairs(newData) do
                    menu.data.elements[i][k] = v
                end
            end
        end

    end

    menu.refresh = function()
        ESX.UI.Menu.RegisteredTypes[type].open(namespace, name, menu.data)
    end

    menu.setElement = function(i, key, val)
        menu.data.elements[i][key] = val
    end

    menu.setElements = function(newElements)
        menu.data.elements = newElements
    end

    menu.setTitle = function(val)
        menu.data.title = val
    end

    menu.removeElement = function(query)
        for i = 1, #menu.data.elements, 1 do
            for k, v in pairs(query) do
                if menu.data.elements[i] then
                    if menu.data.elements[i][k] == v then
                        table.remove(menu.data.elements, i)
                        break
                    end
                end

            end
        end
    end

    ESX.UI.Menu.Opened[#ESX.UI.Menu.Opened + 1] = menu
    ESX.UI.Menu.RegisteredTypes[type].open(namespace, name, data)

    return menu
end

function ESX.UI.Menu.Close(type, namespace, name)
    for i = 1, #ESX.UI.Menu.Opened, 1 do
        if ESX.UI.Menu.Opened[i] then
            if ESX.UI.Menu.Opened[i].type == type and ESX.UI.Menu.Opened[i].namespace == namespace and
                ESX.UI.Menu.Opened[i].name == name then
                ESX.UI.Menu.Opened[i].close()
                ESX.UI.Menu.Opened[i] = nil
            end
        end
    end
end

function ESX.UI.Menu.CloseAll()
    for i = 1, #ESX.UI.Menu.Opened, 1 do
        if ESX.UI.Menu.Opened[i] then
            ESX.UI.Menu.Opened[i].close()
            ESX.UI.Menu.Opened[i] = nil
        end
    end
end

function ESX.UI.Menu.GetOpened(type, namespace, name)
    for i = 1, #ESX.UI.Menu.Opened, 1 do
        if ESX.UI.Menu.Opened[i] then
            if ESX.UI.Menu.Opened[i].type == type and ESX.UI.Menu.Opened[i].namespace == namespace and
                ESX.UI.Menu.Opened[i].name == name then
                return ESX.UI.Menu.Opened[i]
            end
        end
    end
end

function ESX.UI.Menu.GetOpenedMenus()
    return ESX.UI.Menu.Opened
end

function ESX.UI.Menu.IsOpen(type, namespace, name)
    return ESX.UI.Menu.GetOpened(type, namespace, name) ~= nil
end

function ESX.UI.ShowInventoryItemNotification(add, item, count)
    SendNUIMessage({
        action = 'inventoryNotification',
        add = add,
        item = item,
        count = count
    })
end

function ESX.Game.GetPedMugshot(ped, transparent)
    if not DoesEntityExist(ped) then return end
    local mugshot = transparent and RegisterPedheadshotTransparent(ped) or RegisterPedheadshot(ped)

    while not IsPedheadshotReady(mugshot) do
        Wait(0)
    end

    return mugshot, GetPedheadshotTxdString(mugshot)
end

function ESX.Game.Teleport(entity, coords, cb)
    local vector = type(coords) == "vector4" and coords or type(coords) == "vector3" and vector4(coords, 0.0) or vec(coords.x, coords.y, coords.z, coords.heading or 0.0)
    if DoesEntityExist(entity) then
        RequestCollisionAtCoord(vector.xyz)
        while not HasCollisionLoadedAroundEntity(entity) do
            Wait(0)
        end
        SetEntityCoords(entity, vector.xyz, false, false, false, false)
        SetEntityHeading(entity, vector.w)
    end
    if cb then
        cb()
    end
end

function ESX.Game.SpawnObject(object, coords, cb, networked)
    networked = networked == nil and true or networked
    if networked then 
        ESX.TriggerServerCallback('esx:Onesync:SpawnObject', function(NetworkID)
            if cb then
                local obj = NetworkGetEntityFromNetworkId(NetworkID)
                local Tries = 0
                while not DoesEntityExist(obj) do
                    obj = NetworkGetEntityFromNetworkId(NetworkID)
                    Wait(0)
                    Tries = Tries + 1
                    if Tries > 250 then
                        break
                    end
                end
                cb(obj)
            end
        end, object, coords, 0.0)
    else
        local model = type(object) == 'number' and object or joaat(object)
        local vector = type(coords) == "vector3" and coords or vec(coords.x, coords.y, coords.z)
        CreateThread(function()
            ESX.Streaming.RequestModel(model)
            local obj = CreateObject(model, vector.xyz, networked, false, true)
            if cb then
                cb(obj)
            end
        end)
    end
end

function ESX.Game.SpawnLocalObject(object, coords, cb)
    ESX.Game.SpawnObject(object, coords, cb, false)
end

function ESX.Game.DeleteVehicle(vehicle)
    SetEntityAsMissionEntity(vehicle, true, true)
    DeleteVehicle(vehicle)
end

function ESX.Game.DeleteObject(object)
    SetEntityAsMissionEntity(object, false, true)
    DeleteObject(object)
end

function ESX.Game.SpawnVehicle(vehicle, coords, heading, cb, networked)
    local model = (type(vehicle) == 'number' and vehicle or joaat(vehicle))
    local vector = type(coords) == "vector3" and coords or vec(coords.x, coords.y, coords.z)
    networked = networked == nil and true or networked
    if networked then
        local isAutomobile = IsThisModelACar(model)
        if isAutomobile ~= false then isAutomobile = true end
        ESX.TriggerServerCallback('esx:Onesync:SpawnVehicle',function(NetID)
            if NetID then
                local Tries = 0
                SetNetworkIdCanMigrate(NetID, true)
                local vehicle = NetworkGetEntityFromNetworkId(NetID)
                while not DoesEntityExist(vehicle) do
                    Wait(0)
                    vehicle = NetworkGetEntityFromNetworkId(NetID)
                    Tries = Tries + 1 
                    if Tries > 250 then
                        break
                    end
                end
                Tries = 0
                NetworkRequestControlOfEntity(vehicle)
                while not NetworkHasControlOfEntity(vehicle) do
                    Wait(0)
                    Tries = Tries + 1 
                    if Tries > 250 then
                        break
                    end
                end
                SetEntityAsMissionEntity(vehicle, true, true)
                SetVehicleHasBeenOwnedByPlayer(vehicle, true)
                SetVehicleNeedsToBeHotwired(vehicle, false)
                SetModelAsNoLongerNeeded(model)
                SetVehRadioStation(vehicle, 'OFF')
                if cb then
                    cb(vehicle)
                end
            end
        end, model, vector, heading, isAutomobile)
    else 
        CreateThread(function()
            ESX.Streaming.RequestModel(model)

            local vehicle = CreateVehicle(model, vector.xyz, heading, networked, false)

            if networked then
                local id = NetworkGetNetworkIdFromEntity(vehicle)
                SetNetworkIdCanMigrate(id, true)
                SetEntityAsMissionEntity(vehicle, true, false)
            end
            SetVehicleHasBeenOwnedByPlayer(vehicle, true)
            SetVehicleNeedsToBeHotwired(vehicle, false)
            SetModelAsNoLongerNeeded(model)
            SetVehRadioStation(vehicle, 'OFF')

            RequestCollisionAtCoord(vector.xyz)
            while not HasCollisionLoadedAroundEntity(vehicle) do
                Wait(0)
            end

            if cb then
                cb(vehicle)
            end
        end)
    end
end

function ESX.Game.SpawnLocalVehicle(vehicle, coords, heading, cb)
    ESX.Game.SpawnVehicle(vehicle, coords, heading, cb, false)
end

function ESX.Game.IsVehicleEmpty(vehicle)
    local passengers = GetVehicleNumberOfPassengers(vehicle)
    local driverSeatFree = IsVehicleSeatFree(vehicle, -1)

    return passengers == 0 and driverSeatFree
end

function ESX.Game.GetObjects() -- Leave the function for compatibility
    return GetGamePool('CObject')
end

function ESX.Game.GetPeds(onlyOtherPeds)
    local peds, myPed, pool = {}, ESX.PlayerData.ped, GetGamePool('CPed')

    for i = 1, #pool do
        if ((onlyOtherPeds and pool[i] ~= myPed) or not onlyOtherPeds) then
            peds[#peds + 1] = pool[i]
        end
    end

    return peds
end

function ESX.Game.GetVehicles() -- Leave the function for compatibility
    return GetGamePool('CVehicle')
end

function ESX.Game.GetPlayers(onlyOtherPlayers, returnKeyValue, returnPeds)
    local players, myPlayer = {}, PlayerId()

    for k, player in ipairs(GetActivePlayers()) do
        local ped = GetPlayerPed(player)

        if DoesEntityExist(ped) and ((onlyOtherPlayers and player ~= myPlayer) or not onlyOtherPlayers) then
            if returnKeyValue then
                players[player] = ped
            else
                players[#players + 1] = returnPeds and ped or player
            end
        end
    end

    return players
end


function ESX.Game.GetClosestObject(coords, modelFilter)
    return ESX.Game.GetClosestEntity(ESX.Game.GetObjects(), false, coords, modelFilter)
end

function ESX.Game.GetClosestPed(coords, modelFilter)
    return ESX.Game.GetClosestEntity(ESX.Game.GetPeds(true), false, coords, modelFilter)
end

function ESX.Game.GetClosestPlayer(coords)
    return ESX.Game.GetClosestEntity(ESX.Game.GetPlayers(true, true), true, coords, nil)
end

function ESX.Game.GetClosestVehicle(coords, modelFilter)
    return ESX.Game.GetClosestEntity(ESX.Game.GetVehicles(), false, coords, modelFilter)
end

local function EnumerateEntitiesWithinDistance(entities, isPlayerEntities, coords, maxDistance)
    local nearbyEntities = {}

    if coords then
        coords = vector3(coords.x, coords.y, coords.z)
    else
        local playerPed = ESX.PlayerData.ped
        coords = GetEntityCoords(playerPed)
    end

    for k, entity in pairs(entities) do
        local distance = #(coords - GetEntityCoords(entity))

        if distance <= maxDistance then
            nearbyEntities[#nearbyEntities + 1] = isPlayerEntities and k or entity
        end
    end

    return nearbyEntities
end

function ESX.Game.GetPlayersInArea(coords, maxDistance)
    return EnumerateEntitiesWithinDistance(ESX.Game.GetPlayers(true, true), true, coords, maxDistance)
end

function ESX.Game.GetVehiclesInArea(coords, maxDistance)
    return EnumerateEntitiesWithinDistance(ESX.Game.GetVehicles(), false, coords, maxDistance)
end

function ESX.Game.IsSpawnPointClear(coords, maxDistance)
    return #ESX.Game.GetVehiclesInArea(coords, maxDistance) == 0
end

function ESX.Game.GetClosestEntity(entities, isPlayerEntities, coords, modelFilter)
    local closestEntity, closestEntityDistance, filteredEntities = -1, -1, nil

    if coords then
        coords = vector3(coords.x, coords.y, coords.z)
    else
        local playerPed = ESX.PlayerData.ped
        coords = GetEntityCoords(playerPed)
    end

    if modelFilter then
        filteredEntities = {}

        for k, entity in pairs(entities) do
            if modelFilter[GetEntityModel(entity)] then
                filteredEntities[#filteredEntities + 1] = entity
            end
        end
    end

    for k, entity in pairs(filteredEntities or entities) do
        local distance = #(coords - GetEntityCoords(entity))

        if closestEntityDistance == -1 or distance < closestEntityDistance then
            closestEntity, closestEntityDistance = isPlayerEntities and k or entity, distance
        end
    end

    return closestEntity, closestEntityDistance
end

function ESX.Game.GetVehicleInDirection()
    local playerPed = ESX.PlayerData.ped
    local playerCoords = GetEntityCoords(playerPed)
    local inDirection = GetOffsetFromEntityInWorldCoords(playerPed, 0.0, 5.0, 0.0)
    local rayHandle = StartExpensiveSynchronousShapeTestLosProbe(playerCoords, inDirection, 10, playerPed, 0)
    local numRayHandle, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(rayHandle)

    if hit == 1 and GetEntityType(entityHit) == 2 then
        local entityCoords = GetEntityCoords(entityHit)
        return entityHit, entityCoords
    end

    return nil
end

function ESX.Game.GetVehicleProperties(vehicle)
    if DoesEntityExist(vehicle) then
        local colorPrimary, colorSecondary = GetVehicleColours(vehicle)
        local pearlescentColor, wheelColor = GetVehicleExtraColours(vehicle)
        local hasCustomPrimaryColor = GetIsVehiclePrimaryColourCustom(vehicle)
        local customPrimaryColor = nil
        if hasCustomPrimaryColor then
            local r, g, b = GetVehicleCustomPrimaryColour(vehicle)
            customPrimaryColor = {r, g, b}
        end

        local customXenonColorR, customXenonColorG, customXenonColorB = GetVehicleXenonLightsCustomColor(vehicle)
        local customXenonColor = nil
        if customXenonColorR and customXenonColorG and customXenonColorB then 
            customXenonColor = {customXenonColorR, customXenonColorG, customXenonColorB}
        end
        
        local hasCustomSecondaryColor = GetIsVehicleSecondaryColourCustom(vehicle)
        local customSecondaryColor = nil
        if hasCustomSecondaryColor then
            local r, g, b = GetVehicleCustomSecondaryColour(vehicle)
            customSecondaryColor = {r, g, b}
        end
        local extras = {}

        for extraId = 0, 12 do
            if DoesExtraExist(vehicle, extraId) then
                local state = IsVehicleExtraTurnedOn(vehicle, extraId)
                extras[tostring(extraId)] = state
            end
        end

        local doorsBroken, windowsBroken, tyreBurst = {}, {}, {}
        local numWheels = tostring(GetVehicleNumberOfWheels(vehicle))

        local TyresIndex = { -- Wheel index list according to the number of vehicle wheels.
            ['2'] = {0, 4}, -- Bike and cycle.
            ['3'] = {0, 1, 4, 5}, -- Vehicle with 3 wheels (get for wheels because some 3 wheels vehicles have 2 wheels on front and one rear or the reverse).
            ['4'] = {0, 1, 4, 5}, -- Vehicle with 4 wheels.
            ['6'] = {0, 1, 2, 3, 4, 5} -- Vehicle with 6 wheels.
        }

        if TyresIndex[numWheels] then
            for tyre, idx in pairs(TyresIndex[numWheels]) do
                if IsVehicleTyreBurst(vehicle, idx, false) then
                    tyreBurst[tostring(idx)] = true
                else
                    tyreBurst[tostring(idx)] = false
                end
            end
        end

        for windowId = 0, 7 do -- 13
            if not IsVehicleWindowIntact(vehicle, windowId) then
                windowsBroken[tostring(windowId)] = true
            else
                windowsBroken[tostring(windowId)] = false
            end
        end

        local numDoors = GetNumberOfVehicleDoors(vehicle)
        if numDoors and numDoors > 0 then
            for doorsId = 0, numDoors do
                if IsVehicleDoorDamaged(vehicle, doorsId) then
                    doorsBroken[tostring(doorsId)] = true
                else
                    doorsBroken[tostring(doorsId)] = false
                end
            end
        end

        return {
            model = GetEntityModel(vehicle),
            doorsBroken = doorsBroken,
            windowsBroken = windowsBroken,
            tyreBurst = tyreBurst,
            plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle)),
            plateIndex = GetVehicleNumberPlateTextIndex(vehicle),

            bodyHealth = ESX.Math.Round(GetVehicleBodyHealth(vehicle), 1),
            engineHealth = ESX.Math.Round(GetVehicleEngineHealth(vehicle), 1),
            tankHealth = ESX.Math.Round(GetVehiclePetrolTankHealth(vehicle), 1),

            fuelLevel = ESX.Math.Round(GetVehicleFuelLevel(vehicle), 1),
            dirtLevel = ESX.Math.Round(GetVehicleDirtLevel(vehicle), 1),
            color1 = colorPrimary,
            color2 = colorSecondary,
            customPrimaryColor = customPrimaryColor,
            customSecondaryColor = customSecondaryColor,

            pearlescentColor = pearlescentColor,
            wheelColor = wheelColor,

            wheels = GetVehicleWheelType(vehicle),
            windowTint = GetVehicleWindowTint(vehicle),
            xenonColor = GetVehicleXenonLightsColor(vehicle),
            customXenonColor = customXenonColor,

            neonEnabled = {IsVehicleNeonLightEnabled(vehicle, 0), IsVehicleNeonLightEnabled(vehicle, 1),
                           IsVehicleNeonLightEnabled(vehicle, 2), IsVehicleNeonLightEnabled(vehicle, 3)},

            neonColor = table.pack(GetVehicleNeonLightsColour(vehicle)),
            extras = extras,
            tyreSmokeColor = table.pack(GetVehicleTyreSmokeColor(vehicle)),

            modSpoilers = GetVehicleMod(vehicle, 0),
            modFrontBumper = GetVehicleMod(vehicle, 1),
            modRearBumper = GetVehicleMod(vehicle, 2),
            modSideSkirt = GetVehicleMod(vehicle, 3),
            modExhaust = GetVehicleMod(vehicle, 4),
            modFrame = GetVehicleMod(vehicle, 5),
            modGrille = GetVehicleMod(vehicle, 6),
            modHood = GetVehicleMod(vehicle, 7),
            modFender = GetVehicleMod(vehicle, 8),
            modRightFender = GetVehicleMod(vehicle, 9),
            modRoof = GetVehicleMod(vehicle, 10),

            modEngine = GetVehicleMod(vehicle, 11),
            modBrakes = GetVehicleMod(vehicle, 12),
            modTransmission = GetVehicleMod(vehicle, 13),
            modHorns = GetVehicleMod(vehicle, 14),
            modSuspension = GetVehicleMod(vehicle, 15),
            modArmor = GetVehicleMod(vehicle, 16),

            modTurbo = IsToggleModOn(vehicle, 18),
            modSmokeEnabled = IsToggleModOn(vehicle, 20),
            modXenon = IsToggleModOn(vehicle, 22),

            modFrontWheels = GetVehicleMod(vehicle, 23),
            modBackWheels = GetVehicleMod(vehicle, 24),

            modPlateHolder = GetVehicleMod(vehicle, 25),
            modVanityPlate = GetVehicleMod(vehicle, 26),
            modTrimA = GetVehicleMod(vehicle, 27),
            modOrnaments = GetVehicleMod(vehicle, 28),
            modDashboard = GetVehicleMod(vehicle, 29),
            modDial = GetVehicleMod(vehicle, 30),
            modDoorSpeaker = GetVehicleMod(vehicle, 31),
            modSeats = GetVehicleMod(vehicle, 32),
            modSteeringWheel = GetVehicleMod(vehicle, 33),
            modShifterLeavers = GetVehicleMod(vehicle, 34),
            modAPlate = GetVehicleMod(vehicle, 35),
            modSpeakers = GetVehicleMod(vehicle, 36),
            modTrunk = GetVehicleMod(vehicle, 37),
            modHydrolic = GetVehicleMod(vehicle, 38),
            modEngineBlock = GetVehicleMod(vehicle, 39),
            modAirFilter = GetVehicleMod(vehicle, 40),
            modStruts = GetVehicleMod(vehicle, 41),
            modArchCover = GetVehicleMod(vehicle, 42),
            modAerials = GetVehicleMod(vehicle, 43),
            modTrimB = GetVehicleMod(vehicle, 44),
            modTank = GetVehicleMod(vehicle, 45),
            modDoorR = GetVehicleMod(vehicle, 47),
            modLivery = GetVehicleMod(vehicle, 48) == -1 and GetVehicleLivery(vehicle) or GetVehicleMod(vehicle, 48),
            modLightbar = GetVehicleMod(vehicle, 49)
        }
    else
        return
    end
end

function ESX.Game.SetVehicleProperties(vehicle, props)
    if DoesEntityExist(vehicle) then
        local colorPrimary, colorSecondary = GetVehicleColours(vehicle)
        local pearlescentColor, wheelColor = GetVehicleExtraColours(vehicle)
        SetVehicleModKit(vehicle, 0)

        if props.plate then
            SetVehicleNumberPlateText(vehicle, props.plate)
        end
        if props.plateIndex then
            SetVehicleNumberPlateTextIndex(vehicle, props.plateIndex)
        end
        if props.bodyHealth then
            SetVehicleBodyHealth(vehicle, props.bodyHealth + 0.0)
        end
        if props.engineHealth then
            SetVehicleEngineHealth(vehicle, props.engineHealth + 0.0)
        end
        if props.tankHealth then
            SetVehiclePetrolTankHealth(vehicle, props.tankHealth + 0.0)
        end
        if props.fuelLevel then
            SetVehicleFuelLevel(vehicle, props.fuelLevel + 0.0)
        end
        if props.dirtLevel then
            SetVehicleDirtLevel(vehicle, props.dirtLevel + 0.0)
        end
        if props.customPrimaryColor then
            SetVehicleCustomPrimaryColour(vehicle, props.customPrimaryColor[1], props.customPrimaryColor[2],
                props.customPrimaryColor[3])
        end
        if props.customSecondaryColor then
            SetVehicleCustomSecondaryColour(vehicle, props.customSecondaryColor[1], props.customSecondaryColor[2],
                props.customSecondaryColor[3])
        end
        if props.color1 then
            SetVehicleColours(vehicle, props.color1, colorSecondary)
        end
        if props.color2 then
            SetVehicleColours(vehicle, props.color1 or colorPrimary, props.color2)
        end
        if props.pearlescentColor then
            SetVehicleExtraColours(vehicle, props.pearlescentColor, wheelColor)
        end
        if props.wheelColor then
            SetVehicleExtraColours(vehicle, props.pearlescentColor or pearlescentColor, props.wheelColor)
        end
        if props.wheels then
            SetVehicleWheelType(vehicle, props.wheels)
        end
        if props.windowTint then
            SetVehicleWindowTint(vehicle, props.windowTint)
        end

        if props.neonEnabled then
            SetVehicleNeonLightEnabled(vehicle, 0, props.neonEnabled[1])
            SetVehicleNeonLightEnabled(vehicle, 1, props.neonEnabled[2])
            SetVehicleNeonLightEnabled(vehicle, 2, props.neonEnabled[3])
            SetVehicleNeonLightEnabled(vehicle, 3, props.neonEnabled[4])
        end

        if props.extras then
            for extraId, enabled in pairs(props.extras) do
                if enabled then
                    SetVehicleExtra(vehicle, tonumber(extraId), false)
                else
                    SetVehicleExtra(vehicle, tonumber(extraId), true)
                end
            end
        end

        if props.neonColor then
            SetVehicleNeonLightsColour(vehicle, props.neonColor[1], props.neonColor[2], props.neonColor[3])
        end
        if props.xenonColor then
            SetVehicleXenonLightsColor(vehicle, props.xenonColor)
        end
        if props.customXenonColor then
            SetVehicleXenonLightsCustomColor(vehicle, props.customXenonColor[1], props.customXenonColor[2],
                props.customXenonColor[3])
        end
        if props.modSmokeEnabled then
            ToggleVehicleMod(vehicle, 20, true)
        end
        if props.tyreSmokeColor then
            SetVehicleTyreSmokeColor(vehicle, props.tyreSmokeColor[1], props.tyreSmokeColor[2], props.tyreSmokeColor[3])
        end
        if props.modSpoilers then
            SetVehicleMod(vehicle, 0, props.modSpoilers, false)
        end
        if props.modFrontBumper then
            SetVehicleMod(vehicle, 1, props.modFrontBumper, false)
        end
        if props.modRearBumper then
            SetVehicleMod(vehicle, 2, props.modRearBumper, false)
        end
        if props.modSideSkirt then
            SetVehicleMod(vehicle, 3, props.modSideSkirt, false)
        end
        if props.modExhaust then
            SetVehicleMod(vehicle, 4, props.modExhaust, false)
        end
        if props.modFrame then
            SetVehicleMod(vehicle, 5, props.modFrame, false)
        end
        if props.modGrille then
            SetVehicleMod(vehicle, 6, props.modGrille, false)
        end
        if props.modHood then
            SetVehicleMod(vehicle, 7, props.modHood, false)
        end
        if props.modFender then
            SetVehicleMod(vehicle, 8, props.modFender, false)
        end
        if props.modRightFender then
            SetVehicleMod(vehicle, 9, props.modRightFender, false)
        end
        if props.modRoof then
            SetVehicleMod(vehicle, 10, props.modRoof, false)
        end
        if props.modEngine then
            SetVehicleMod(vehicle, 11, props.modEngine, false)
        end
        if props.modBrakes then
            SetVehicleMod(vehicle, 12, props.modBrakes, false)
        end
        if props.modTransmission then
            SetVehicleMod(vehicle, 13, props.modTransmission, false)
        end
        if props.modHorns then
            SetVehicleMod(vehicle, 14, props.modHorns, false)
        end
        if props.modSuspension then
            SetVehicleMod(vehicle, 15, props.modSuspension, false)
        end
        if props.modArmor then
            SetVehicleMod(vehicle, 16, props.modArmor, false)
        end
        if props.modTurbo then
            ToggleVehicleMod(vehicle, 18, props.modTurbo)
        end
        if props.modXenon then
            ToggleVehicleMod(vehicle, 22, props.modXenon)
        end
        if props.modFrontWheels then
            SetVehicleMod(vehicle, 23, props.modFrontWheels, false)
        end
        if props.modBackWheels then
            SetVehicleMod(vehicle, 24, props.modBackWheels, false)
        end
        if props.modPlateHolder then
            SetVehicleMod(vehicle, 25, props.modPlateHolder, false)
        end
        if props.modVanityPlate then
            SetVehicleMod(vehicle, 26, props.modVanityPlate, false)
        end
        if props.modTrimA then
            SetVehicleMod(vehicle, 27, props.modTrimA, false)
        end
        if props.modOrnaments then
            SetVehicleMod(vehicle, 28, props.modOrnaments, false)
        end
        if props.modDashboard then
            SetVehicleMod(vehicle, 29, props.modDashboard, false)
        end
        if props.modDial then
            SetVehicleMod(vehicle, 30, props.modDial, false)
        end
        if props.modDoorSpeaker then
            SetVehicleMod(vehicle, 31, props.modDoorSpeaker, false)
        end
        if props.modSeats then
            SetVehicleMod(vehicle, 32, props.modSeats, false)
        end
        if props.modSteeringWheel then
            SetVehicleMod(vehicle, 33, props.modSteeringWheel, false)
        end
        if props.modShifterLeavers then
            SetVehicleMod(vehicle, 34, props.modShifterLeavers, false)
        end
        if props.modAPlate then
            SetVehicleMod(vehicle, 35, props.modAPlate, false)
        end
        if props.modSpeakers then
            SetVehicleMod(vehicle, 36, props.modSpeakers, false)
        end
        if props.modTrunk then
            SetVehicleMod(vehicle, 37, props.modTrunk, false)
        end
        if props.modHydrolic then
            SetVehicleMod(vehicle, 38, props.modHydrolic, false)
        end
        if props.modEngineBlock then
            SetVehicleMod(vehicle, 39, props.modEngineBlock, false)
        end
        if props.modAirFilter then
            SetVehicleMod(vehicle, 40, props.modAirFilter, false)
        end
        if props.modStruts then
            SetVehicleMod(vehicle, 41, props.modStruts, false)
        end
        if props.modArchCover then
            SetVehicleMod(vehicle, 42, props.modArchCover, false)
        end
        if props.modAerials then
            SetVehicleMod(vehicle, 43, props.modAerials, false)
        end
        if props.modTrimB then
            SetVehicleMod(vehicle, 44, props.modTrimB, false)
        end
        if props.modTank then
            SetVehicleMod(vehicle, 45, props.modTank, false)
        end
        if props.modWindows then
            SetVehicleMod(vehicle, 46, props.modWindows, false)
        end

        if props.modLivery then
            SetVehicleMod(vehicle, 48, props.modLivery, false)
            SetVehicleLivery(vehicle, props.modLivery)
        end

        if props.windowsBroken then
            for k, v in pairs(props.windowsBroken) do
                if v then
                    SmashVehicleWindow(vehicle, tonumber(k))
                end
            end
        end

        if props.doorsBroken then
            for k, v in pairs(props.doorsBroken) do
                if v then
                    SetVehicleDoorBroken(vehicle, tonumber(k), true)
                end
            end
        end

        if props.tyreBurst then
            for k, v in pairs(props.tyreBurst) do
                if v then
                    SetVehicleTyreBurst(vehicle, tonumber(k), true, 1000.0)
                end
            end
        end
    end
end

function ESX.Game.Utils.DrawText3D(coords, text, size, font)
    local vector = type(coords) == "vector3" and coords or vec(coords.x, coords.y, coords.z)

    local camCoords = GetFinalRenderedCamCoord()
    local distance = #(vector - camCoords)

    if not size then
        size = 1
    end
    if not font then
        font = 0
    end

    local scale = (size / distance) * 2
    local fov = (1 / GetGameplayCamFov()) * 100
    scale = scale * fov

    SetTextScale(0.0 * scale, 0.55 * scale)
    SetTextFont(font)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    BeginTextCommandDisplayText('STRING')
    SetTextCentre(true)
    AddTextComponentSubstringPlayerName(text)
    SetDrawOrigin(vector.xyz, 0)
    EndTextCommandDisplayText(0.0, 0.0)
    ClearDrawOrigin()
end

function _U(str, ...) -- Translate string first char uppercase
	return tostring(str:gsub("^%l", string.upper))
end

function ESX.ShowInventory()
    local playerPed = ESX.PlayerData.ped
    local elements, currentWeight = {}, 0

    for i=1, #(ESX.PlayerData.accounts) do
        if ESX.PlayerData.accounts[i].money > 0 then
            local formattedMoney = _U('locale_currency', ESX.Math.GroupDigits(ESX.PlayerData.accounts[i].money))
            local canDrop = ESX.PlayerData.accounts[i].name ~= 'bank'

            table.insert(elements, {
                label = ('%s: <span style="color:green;">%s</span>'):format(ESX.PlayerData.accounts[i].label, formattedMoney),
                count = ESX.PlayerData.accounts[i].money,
                type = 'item_account',
                value = ESX.PlayerData.accounts[i].name,
                usable = false,
                rare = false,
                canRemove = canDrop
            })
        end
    end

    for k, v in ipairs(ESX.PlayerData.inventory) do
        if v.count > 0 then
            currentWeight = currentWeight + (v.weight * v.count)

            table.insert(elements, {
                label = ('%s x%s'):format(v.label, v.count),
                count = v.count,
                type = 'item_standard',
                value = v.name,
                usable = v.usable,
                rare = v.rare,
                canRemove = v.canRemove
            })
        end
    end

    for k, v in ipairs(Config.Weapons) do
        local weaponHash = joaat(v.name)

        if HasPedGotWeapon(playerPed, weaponHash, false) then
            local ammo, label = GetAmmoInPedWeapon(playerPed, weaponHash)

            if v.ammo then
                label = ('%s - %s %s'):format(v.label, ammo, v.ammo.label)
            else
                label = v.label
            end

            table.insert(elements, {
                label = label,
                count = 1,
                type = 'item_weapon',
                value = v.name,
                usable = false,
                rare = false,
                ammo = ammo,
                canGiveAmmo = (v.ammo ~= nil),
                canRemove = true
            })
        end
    end

    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'inventory', {
        title = _U('inventory', currentWeight, ESX.PlayerData.maxWeight),
        align = 'bottom-right',
        elements = elements
    }, function(data, menu)
        menu.close()
        local player, distance = ESX.Game.GetClosestPlayer()
        elements = {}

        if data.current.usable then
            table.insert(elements, {
                label = _U('use'),
                action = 'use',
                type = data.current.type,
                value = data.current.value
            })
        end

        if data.current.canRemove then
            if player ~= -1 and distance <= 3.0 then
                table.insert(elements, {
                    label = _U('give'),
                    action = 'give',
                    type = data.current.type,
                    value = data.current.value
                })
            end

            table.insert(elements, {
                label = _U('remove'),
                action = 'remove',
                type = data.current.type,
                value = data.current.value
            })
        end

        if data.current.type == 'item_weapon' and data.current.canGiveAmmo and data.current.ammo > 0 and player ~= -1 and
            distance <= 3.0 then
            table.insert(elements, {
                label = _U('giveammo'),
                action = 'give_ammo',
                type = data.current.type,
                value = data.current.value
            })
        end

        table.insert(elements, {
            label = _U('return'),
            action = 'return'
        })

        ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'inventory_item', {
            title = data.current.label,
            align = 'bottom-right',
            elements = elements
        }, function(data1, menu1)
            local item, type = data1.current.value, data1.current.type

            if data1.current.action == 'give' then
                local playersNearby = ESX.Game.GetPlayersInArea(GetEntityCoords(playerPed), 3.0)

                if #playersNearby > 0 then
                    local players = {}
                    elements = {}

                    for k, playerNearby in ipairs(playersNearby) do
                        players[GetPlayerServerId(playerNearby)] = true
                    end

                    ESX.TriggerServerCallback('esx:getPlayerNames', function(returnedPlayers)
                        for playerId, playerName in pairs(returnedPlayers) do
                            table.insert(elements, {
                                label = playerName,
                                playerId = playerId
                            })
                        end

                        ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'give_item_to', {
                            title = _U('give_to'),
                            align = 'bottom-right',
                            elements = elements
                        }, function(data2, menu2)
                            local selectedPlayer, selectedPlayerId = GetPlayerFromServerId(data2.current.playerId),
                                data2.current.playerId
                            playersNearby = ESX.Game.GetPlayersInArea(GetEntityCoords(playerPed), 3.0)
                            playersNearby = ESX.Table.Set(playersNearby)

                            if playersNearby[selectedPlayer] then
                                local selectedPlayerPed = GetPlayerPed(selectedPlayer)

                                if IsPedOnFoot(selectedPlayerPed) and not IsPedFalling(selectedPlayerPed) then
                                    if type == 'item_weapon' then
                                        TriggerServerEvent('esx:giveInventoryItem', selectedPlayerId, type, item, nil)
                                        menu2.close()
                                        menu1.close()
                                    else
                                        ESX.UI.Menu.Open('dialog', GetCurrentResourceName(),
                                            'inventory_item_count_give', {
                                                title = _U('amount')
                                            }, function(data3, menu3)
                                                local quantity = tonumber(data3.value)

                                                if quantity and quantity > 0 and data.current.count >= quantity then
                                                    TriggerServerEvent('esx:giveInventoryItem', selectedPlayerId, type,
                                                        item, quantity)
                                                    menu3.close()
                                                    menu2.close()
                                                    menu1.close()
                                                else
                                                    ESX.ShowNotification(_U('amount_invalid'))
                                                end
                                            end, function(data3, menu3)
                                                menu3.close()
                                            end)
                                    end
                                else
                                    ESX.ShowNotification(_U('in_vehicle'))
                                end
                            else
                                ESX.ShowNotification(_U('players_nearby'))
                                menu2.close()
                            end
                        end, function(data2, menu2)
                            menu2.close()
                        end)
                    end, players)
                else
                    ESX.ShowNotification(_U('players_nearby'))
                end
            elseif data1.current.action == 'remove' then
                if IsPedOnFoot(playerPed) and not IsPedFalling(playerPed) then
                    local dict, anim = 'weapons@first_person@aim_rng@generic@projectile@sticky_bomb@', 'plant_floor'
                    ESX.Streaming.RequestAnimDict(dict)

                    if type == 'item_weapon' then
                        menu1.close()
                        TaskPlayAnim(playerPed, dict, anim, 8.0, 1.0, 1000, 16, 0.0, false, false, false)
                        RemoveAnimDict(dict)
                        Wait(1000)
                        TriggerServerEvent('esx:removeInventoryItem', type, item)
                    else
                        ESX.UI.Menu.Open('dialog', GetCurrentResourceName(), 'inventory_item_count_remove', {
                            title = _U('amount')
                        }, function(data2, menu2)
                            local quantity = tonumber(data2.value)

                            if quantity and quantity > 0 and data.current.count >= quantity then
                                menu2.close()
                                menu1.close()
                                TaskPlayAnim(playerPed, dict, anim, 8.0, 1.0, 1000, 16, 0.0, false, false, false)
                                RemoveAnimDict(dict)
                                Wait(1000)
                                TriggerServerEvent('esx:removeInventoryItem', type, item, quantity)
                            else
                                ESX.ShowNotification(_U('amount_invalid'))
                            end
                        end, function(data2, menu2)
                            menu2.close()
                        end)
                    end
                end
            elseif data1.current.action == 'use' then
                TriggerServerEvent('esx:useItem', item)
            elseif data1.current.action == 'return' then
                ESX.UI.Menu.CloseAll()
                ESX.ShowInventory()
            elseif data1.current.action == 'give_ammo' then
                local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()
                local closestPed = GetPlayerPed(closestPlayer)
                local pedAmmo = GetAmmoInPedWeapon(playerPed, joaat(item))

                if IsPedOnFoot(closestPed) and not IsPedFalling(closestPed) then
                    if closestPlayer ~= -1 and closestDistance < 3.0 then
                        if pedAmmo > 0 then
                            ESX.UI.Menu.Open('dialog', GetCurrentResourceName(), 'inventory_item_count_give', {
                                title = _U('amountammo')
                            }, function(data2, menu2)
                                local quantity = tonumber(data2.value)

                                if quantity and quantity > 0 then
                                    if pedAmmo >= quantity then
                                        TriggerServerEvent('esx:giveInventoryItem', GetPlayerServerId(closestPlayer),
                                            'item_ammo', item, quantity)
                                        menu2.close()
                                        menu1.close()
                                    else
                                        ESX.ShowNotification(_U('noammo'))
                                    end
                                else
                                    ESX.ShowNotification(_U('amount_invalid'))
                                end
                            end, function(data2, menu2)
                                menu2.close()
                            end)
                        else
                            ESX.ShowNotification(_U('noammo'))
                        end
                    else
                        ESX.ShowNotification(_U('players_nearby'))
                    end
                else
                    ESX.ShowNotification(_U('in_vehicle'))
                end
            end
        end, function(data1, menu1)
            ESX.UI.Menu.CloseAll()
            ESX.ShowInventory()
        end)
    end, function(data, menu)
        menu.close()
    end)
end

RegisterNetEvent('esx:serverCallback')
AddEventHandler('esx:serverCallback', function(requestId, ...)
    if Core.ServerCallbacks[requestId] then
        Core.ServerCallbacks[requestId](...)
        Core.ServerCallbacks[requestId] = nil
    end
end)

RegisterNetEvent('esx:showNotification')
AddEventHandler('esx:showNotification', function(msg, type, length)
    ESX.ShowNotification(msg, type, length)
end)

RegisterNetEvent('esx:showAdvancedNotification')
AddEventHandler('esx:showAdvancedNotification', function(sender, subject, msg, textureDict, iconType, flash, saveToBrief, hudColorIndex)
    ESX.ShowAdvancedNotification(sender, subject, msg, textureDict, iconType, flash, saveToBrief, hudColorIndex)
end)

RegisterNetEvent('esx:showHelpNotification')
AddEventHandler('esx:showHelpNotification', function(msg, thisFrame, beep, duration)
    ESX.ShowHelpNotification(msg, thisFrame, beep, duration)
end)

-- SetTimeout
CreateThread(function()
    while true do
        local sleep = 1000
        if #Core.TimeoutCallbacks > 0 then
            local currTime = GetGameTimer()
            sleep = 0
            for i = 1, #Core.TimeoutCallbacks, 1 do
                if currTime >= Core.TimeoutCallbacks[i].time then
                    Core.TimeoutCallbacks[i].cb()
                    Core.TimeoutCallbacks[i] = nil
                end
            end
        end
        Wait(sleep)
    end
end)

----------------------------------------------------------------------------------------------------------------

local pickups = {}
local PlayerBank, PlayerMoney = 0,0

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer, isNew, skin)
	ESX.PlayerData = xPlayer
	ESX.PlayerLoaded = true

	while ESX.PlayerData.ped == nil do Wait(20) end

	if Config.EnableHud then
		for i=1, #(ESX.PlayerData.accounts) do
			local accountTpl = '<div><img src="img/accounts/' .. ESX.PlayerData.accounts[i].name .. '.png"/>&nbsp;{{money}}</div>'
			ESX.UI.HUD.RegisterElement('account_' .. ESX.PlayerData.accounts[i].name, i, 0, accountTpl, {money = ESX.Math.GroupDigits(ESX.PlayerData.accounts[i].money)})
		end

		local jobTpl = '<div>{{job_label}}{{grade_label}}</div>'

		local gradeLabel = ESX.PlayerData.job.grade_label ~= ESX.PlayerData.job.label and ESX.PlayerData.job.grade_label or ''
		if gradeLabel ~= '' then gradeLabel = ' - '..gradeLabel end

		ESX.UI.HUD.RegisterElement('job', #ESX.PlayerData.accounts, 0, jobTpl, {
			job_label = ESX.PlayerData.job.label,
			grade_label = gradeLabel
		})
	end
end)

RegisterNetEvent('esx:onPlayerLogout')
AddEventHandler('esx:onPlayerLogout', function()
	ESX.PlayerLoaded = false
	if Config.EnableHud then ESX.UI.HUD.Reset() end
end)

RegisterNetEvent('esx:setMaxWeight')
AddEventHandler('esx:setMaxWeight', function(newMaxWeight) ESX.SetPlayerData("maxWeight", newMaxWeight) end)

local function onPlayerSpawn()
	ESX.SetPlayerData('ped', PlayerPedId())
	ESX.SetPlayerData('dead', false)
end

AddEventHandler('playerSpawned', onPlayerSpawn)
AddEventHandler('esx:onPlayerSpawn', onPlayerSpawn)

AddEventHandler('esx:onPlayerDeath', function()
	ESX.SetPlayerData('ped', PlayerPedId())
	ESX.SetPlayerData('dead', true)
end)

AddEventHandler('skinchanger:modelLoaded', function()
	while not ESX.PlayerLoaded do
		Wait(100)
	end
	TriggerEvent('esx:restoreLoadout')
end)

AddEventHandler('esx:restoreLoadout', function()
	ESX.SetPlayerData('ped', PlayerPedId())

	if not Config.OxInventory then
		local ammoTypes = {}
		RemoveAllPedWeapons(ESX.PlayerData.ped, true)

		for k,v in ipairs(ESX.PlayerData.loadout) do
			local weaponName = v.name
			local weaponHash = joaat(weaponName)

			GiveWeaponToPed(ESX.PlayerData.ped, weaponHash, 0, false, false)
			SetPedWeaponTintIndex(ESX.PlayerData.ped, weaponHash, v.tintIndex)

			local ammoType = GetPedAmmoTypeFromWeapon(ESX.PlayerData.ped, weaponHash)

			for k2,v2 in ipairs(v.components) do
				local componentHash = ESX.GetWeaponComponent(weaponName, v2).hash
				GiveWeaponComponentToPed(ESX.PlayerData.ped, weaponHash, componentHash)
			end

			if not ammoTypes[ammoType] then
				AddAmmoToPed(ESX.PlayerData.ped, weaponHash, v.ammo)
				ammoTypes[ammoType] = true
			end
		end
	end
end)

RegisterNetEvent('esx:setAccountMoney')
AddEventHandler('esx:setAccountMoney', function(account)
	for i=1, #(ESX.PlayerData.accounts) do
		if ESX.PlayerData.accounts[i].name == account.name then
			ESX.PlayerData.accounts[i] = account
			if ESX.PlayerData.accounts[i].name == "bank" then
				PlayerBank = account.money
				StatSetInt("BANK_BALANCE", PlayerBank, true)
			elseif ESX.PlayerData.accounts[i].name == "money" then
				PlayerMoney = account.money
				StatSetInt("MP0_WALLET_BALANCE", PlayerMoney, true)
			end
			break
		end
	end

	ESX.SetPlayerData('accounts', ESX.PlayerData.accounts)

	if Config.EnableHud then
		ESX.UI.HUD.UpdateElement('account_' .. account.name, {
			money = ESX.Math.GroupDigits(account.money)
		})
	end
end)

if not Config.OxInventory then
	RegisterNetEvent('esx:addInventoryItem')
	AddEventHandler('esx:addInventoryItem', function(item, count, showNotification)
		for k,v in ipairs(ESX.PlayerData.inventory) do
			if v.name == item then
				ESX.UI.ShowInventoryItemNotification(true, v.label, count - v.count)
				ESX.PlayerData.inventory[k].count = count
				break
			end
		end

		if showNotification then
			ESX.UI.ShowInventoryItemNotification(true, item, count)
		end

		if ESX.UI.Menu.IsOpen('default', 'es_extended', 'inventory') then
			ESX.ShowInventory()
		end
	end)

	RegisterNetEvent('esx:removeInventoryItem')
	AddEventHandler('esx:removeInventoryItem', function(item, count, showNotification)
		for k,v in ipairs(ESX.PlayerData.inventory) do
			if v.name == item then
				ESX.UI.ShowInventoryItemNotification(false, v.label, v.count - count)
				ESX.PlayerData.inventory[k].count = count
				break
			end
		end

		if showNotification then
			ESX.UI.ShowInventoryItemNotification(false, item, count)
		end

		if ESX.UI.Menu.IsOpen('default', 'es_extended', 'inventory') then
			ESX.ShowInventory()
		end
	end)

	RegisterNetEvent('esx:addWeapon')
	AddEventHandler('esx:addWeapon', function(weapon, ammo)
		print("[WARNING] event 'esx:addWeapon' is deprecated. Please use xPlayer.addWeapon Instead!")
	end)

	RegisterNetEvent('esx:addWeaponComponent')
	AddEventHandler('esx:addWeaponComponent', function(weapon, weaponComponent)
		print("[WARNING] event 'esx:addWeaponComponent' is deprecated. Please use xPlayer.addWeaponComponent Instead!")
	end)

	RegisterNetEvent('esx:setWeaponAmmo')
	AddEventHandler('esx:setWeaponAmmo', function(weapon, weaponAmmo)
		print("[WARNING] event 'esx:setWeaponAmmo' is deprecated. Please use xPlayer.addWeaponComponent Instead!")
	end)

	RegisterNetEvent('esx:setWeaponTint')
	AddEventHandler('esx:setWeaponTint', function(weapon, weaponTintIndex)
		SetPedWeaponTintIndex(ESX.PlayerData.ped, joaat(weapon), weaponTintIndex)
	end)

	RegisterNetEvent('esx:removeWeapon')
	AddEventHandler('esx:removeWeapon', function(weapon)
		local playerPed = ESX.PlayerData.ped
		RemoveWeaponFromPed(ESX.PlayerData.ped, joaat(weapon))
		SetPedAmmo(ESX.PlayerData.ped, joaat(weapon), 0)
	end)

	RegisterNetEvent('esx:removeWeaponComponent')
	AddEventHandler('esx:removeWeaponComponent', function(weapon, weaponComponent)
		local componentHash = ESX.GetWeaponComponent(weapon, weaponComponent).hash
		RemoveWeaponComponentFromPed(ESX.PlayerData.ped, joaat(weapon), componentHash)
	end)
end

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(Job)
	if Config.EnableHud then
		local gradeLabel = Job.grade_label ~= Job.label and Job.grade_label or ''
		if gradeLabel ~= '' then gradeLabel = ' - '..gradeLabel end
		ESX.UI.HUD.UpdateElement('job', {
			job_label = Job.label,
			grade_label = gradeLabel
		})
	end
	ESX.SetPlayerData('job', Job)
end)

RegisterNetEvent('esx:spawnVehicle')
AddEventHandler('esx:spawnVehicle', function(vehicle)
	ESX.TriggerServerCallback("esx:isUserAdmin", function(admin)
		if admin then
			local model = (type(vehicle) == 'number' and vehicle or joaat(vehicle))

			if IsModelInCdimage(model) then
				local playerCoords, playerHeading = GetEntityCoords(ESX.PlayerData.ped), GetEntityHeading(ESX.PlayerData.ped)

				ESX.Game.SpawnVehicle(model, playerCoords, playerHeading, function(vehicle)
					TaskWarpPedIntoVehicle(ESX.PlayerData.ped, vehicle, -1)
					SetVehicleDirtLevel(vehicle, 0)
					SetVehicleFuelLevel(vehicle, 100.0)
			    --  SetVehicleCustomSecondaryColour(vehicle, 55, 140, 191) -- ESX Blue
					SetEntityAsMissionEntity(vehicle, true, true) -- Persistant Vehicle

					-- Max out vehicle upgrades
					if Config.MaxAdminVehicles then 
						SetVehicleExplodesOnHighExplosionDamage(vehicle, true)
						SetVehicleModKit(vehicle, 0)
						SetVehicleMod(vehicle, 11, 3, false) -- modEngine
						SetVehicleMod(vehicle, 12, 2, false) -- modBrakes
						SetVehicleMod(vehicle, 13, 2, false) -- modTransmission
						SetVehicleMod(vehicle, 15, 3, false) -- modSuspension
						SetVehicleMod(vehicle, 16, 4, false) -- modArmor
						ToggleVehicleMod(vehicle, 18, true) -- modTurbo
						SetVehicleTurboPressure(vehicle, 100.0)
						SetVehicleNumberPlateText(vehicle, "ESX KISS")
						SetVehicleNumberPlateTextIndex(vehicle, 1)
						SetVehicleNitroEnabled(vehicle, true)

						for i=0, 3 do
							SetVehicleNeonLightEnabled(vehicle, i, true)
						end
						SetVehicleNeonLightsColour(vehicle, 55, 140, 191)  -- ESX Blue
					end
				end)
			else
				ESX.ShowNotification('Invalid vehicle model.')
			end
		end
	end)
end)

if not Config.OxInventory then
	RegisterNetEvent('esx:createPickup')
	AddEventHandler('esx:createPickup', function(pickupId, label, coords, type, name, components, tintIndex)
		local function setObjectProperties(object)
			SetEntityAsMissionEntity(object, true, false)
			PlaceObjectOnGroundProperly(object)
			FreezeEntityPosition(object, true)
			SetEntityCollision(object, false, true)

			pickups[pickupId] = {
				obj = object,
				label = label,
				inRange = false,
				coords = vector3(coords.x, coords.y, coords.z)
			}
		end

		if type == 'item_weapon' then
			local weaponHash = joaat(name)
			ESX.Streaming.RequestWeaponAsset(weaponHash)
			local pickupObject = CreateWeaponObject(weaponHash, 50, coords.x, coords.y, coords.z, true, 1.0, 0)
			SetWeaponObjectTintIndex(pickupObject, tintIndex)

			for k,v in ipairs(components) do
				local component = ESX.GetWeaponComponent(name, v)
				GiveWeaponComponentToWeaponObject(pickupObject, component.hash)
			end

			setObjectProperties(pickupObject)
		else
			ESX.Game.SpawnLocalObject('prop_money_bag_01', coords, setObjectProperties)
		end
	end)

	RegisterNetEvent('esx:createMissingPickups')
	AddEventHandler('esx:createMissingPickups', function(missingPickups)
		for pickupId, pickup in pairs(missingPickups) do
			TriggerEvent('esx:createPickup', pickupId, pickup.label, pickup.coords - vector3(0,0, 1.0), pickup.type, pickup.name, pickup.components, pickup.tintIndex)
		end
	end)
end

RegisterNetEvent('esx:registerSuggestions')
AddEventHandler('esx:registerSuggestions', function(registeredCommands)
	for name,command in pairs(registeredCommands) do
		if command.suggestion then
			TriggerEvent('chat:addSuggestion', ('/%s'):format(name), command.suggestion.help, command.suggestion.arguments)
		end
	end
end)

if not Config.OxInventory then
	RegisterNetEvent('esx:removePickup')
	AddEventHandler('esx:removePickup', function(pickupId)
		if pickups[pickupId] and pickups[pickupId].obj then
			ESX.Game.DeleteObject(pickups[pickupId].obj)
			pickups[pickupId] = nil
		end
	end)
end

-- Pause menu disables HUD display
if Config.EnableHud then
	CreateThread(function()
		local isPaused = false
		while true do
			local time = 500
			if IsPauseMenuActive() and not isPaused then
				time = 100
				isPaused = true
				ESX.UI.HUD.SetDisplay(0.0)
			elseif not IsPauseMenuActive() and isPaused then
				time = 100
				isPaused = false
				ESX.UI.HUD.SetDisplay(1.0)
			end
            Wait(time)
		end
	end)

	AddEventHandler('esx:loadingScreenOff', function()
		ESX.UI.HUD.SetDisplay(1.0)
	end)
end

function StartServerSyncLoops()
	if not Config.OxInventory then
		-- keep track of ammo
        CreateThread(function()
            local currentWeapon = {Ammo = 0}
            while ESX.PlayerLoaded do
                local sleep = 1500
                if GetSelectedPedWeapon(ESX.PlayerData.ped) ~= -1569615261 then
                    sleep = 1000
                    local _,weaponHash = GetCurrentPedWeapon(ESX.PlayerData.ped, true)
                    local weapon = ESX.GetWeaponFromHash(weaponHash) 
                    if weapon then
                        local ammoCount = GetAmmoInPedWeapon(ESX.PlayerData.ped, weaponHash)
                        if weapon.name ~= currentWeapon.name then 
                            currentWeapon.Ammo = ammoCount
                            currentWeapon.name = weapon.name
                        else
                            if ammoCount ~= currentWeapon.Ammo then
                                currentWeapon.Ammo = ammoCount
                                TriggerServerEvent('esx:updateWeaponAmmo', weapon.name, ammoCount)
                            end
                        end
                    end
                end
                Wait(sleep)
            end
        end)
	end

	-- sync current player coords with server
	CreateThread(function()
		local previousCoords = vector3(ESX.PlayerData.coords.x, ESX.PlayerData.coords.y, ESX.PlayerData.coords.z)

		while ESX.PlayerLoaded do
			local playerPed = PlayerPedId()
			if ESX.PlayerData.ped ~= playerPed then ESX.SetPlayerData('ped', playerPed) end

			if DoesEntityExist(ESX.PlayerData.ped) then
				local playerCoords = GetEntityCoords(ESX.PlayerData.ped)
				local distance = #(playerCoords - previousCoords)

				if distance > 1 then
					previousCoords = playerCoords
					TriggerServerEvent('esx:updateCoords')
				end
			end
			Wait(1500)
		end
	end)
end

if not Config.OxInventory and Config.EnableDefaultInventory then
	RegisterCommand('showinv', function()
		if not ESX.PlayerData.dead and not ESX.UI.Menu.IsOpen('default', 'es_extended', 'inventory') then
			ESX.ShowInventory()
		end
	end)
	RegisterKeyMapping('showinv', _U('keymap_showinventory'), 'keyboard', 'F2')
end

if not Config.OxInventory then
	CreateThread(function()
		while true do
			local Sleep = 1500
			local playerCoords = GetEntityCoords(ESX.PlayerData.ped)
			local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer(playerCoords)

			for pickupId,pickup in pairs(pickups) do
				local distance = #(playerCoords - pickup.coords)

				if distance < 5 then
					Sleep = 0
					local label = pickup.label

					if distance < 1 then
						if IsControlJustReleased(0, 38) then
							if IsPedOnFoot(ESX.PlayerData.ped) and (closestDistance == -1 or closestDistance > 3) and not pickup.inRange then
								pickup.inRange = true

								local dict, anim = 'weapons@first_person@aim_rng@generic@projectile@sticky_bomb@', 'plant_floor'
								ESX.Streaming.RequestAnimDict(dict)
								TaskPlayAnim(ESX.PlayerData.ped, dict, anim, 8.0, 1.0, 1000, 16, 0.0, false, false, false)
								RemoveAnimDict(dict)
								Wait(1000)

								TriggerServerEvent('esx:onPickup', pickupId)
								PlaySoundFrontend(-1, 'PICK_UP', 'HUD_FRONTEND_DEFAULT_SOUNDSET', false)
							end
						end

						label = ('%s~n~%s'):format(label, _U('threw_pickup_prompt'))
					end

					ESX.Game.Utils.DrawText3D({
						x = pickup.coords.x,
						y = pickup.coords.y,
						z = pickup.coords.z + 0.25
					}, label, 1.2, 1)
				elseif pickup.inRange then
					pickup.inRange = false
				end
			end
			Wait(Sleep)
		end
	end)
end

----- Admin commnads from esx_adminplus

RegisterNetEvent("esx:tpm")
AddEventHandler("esx:tpm", function()
	local GetEntityCoords = GetEntityCoords
	local GetGroundZFor_3dCoord = GetGroundZFor_3dCoord
	local GetFirstBlipInfoId = GetFirstBlipInfoId
	local DoesBlipExist = DoesBlipExist
	local DoScreenFadeOut = DoScreenFadeOut
	local GetBlipInfoIdCoord = GetBlipInfoIdCoord
	local GetVehiclePedIsIn = GetVehiclePedIsIn

	ESX.TriggerServerCallback("esx:isUserAdmin", function(admin)
		if admin then
			local blipMarker = GetFirstBlipInfoId(8)
			if not DoesBlipExist(blipMarker) then
				ESX.ShowNotification('No Waypoint Set.', true, false)
				return 'marker'
			end
			-- Fade screen to hide how clients get teleported.
			DoScreenFadeOut(650)
			while not IsScreenFadedOut() do
				Wait(0)
			end
			local ped, coords = ESX.PlayerData.ped, GetBlipInfoIdCoord(blipMarker)
			local vehicle = GetVehiclePedIsIn(ped, false)
			local oldCoords = GetEntityCoords(ped)
			-- Unpack coords instead of having to unpack them while iterating.
			-- 825.0 seems to be the max a player can reach while 0.0 being the lowest.
			local x, y, groundZ, Z_START = coords['x'], coords['y'], 850.0, 950.0
			local found = false
			if vehicle > 0 then
				FreezeEntityPosition(vehicle, true)
			else
				FreezeEntityPosition(ped, true)
			end
			for i = Z_START, 0, -25.0 do
                local z = i
                if (i % 2) ~= 0 then
                    z = Z_START - i
                end

                NewLoadSceneStart(x, y, z, x, y, z, 50.0, 0)
                local curTime = GetGameTimer()
                while IsNetworkLoadingScene() do
                    if GetGameTimer() - curTime > 1000 then
                        break
                    end
                    Wait(0)
                end
                NewLoadSceneStop()
                SetPedCoordsKeepVehicle(ped, x, y, z)

                while not HasCollisionLoadedAroundEntity(ped) do
                    RequestCollisionAtCoord(x, y, z)
                    if GetGameTimer() - curTime > 1000 then
                            break
                    end
                    Wait(0)
                end

                -- Get ground coord. As mentioned in the natives, this only works if the client is in render distance.
                found, groundZ = GetGroundZFor_3dCoord(x, y, z, false)
                if found then
                    Wait(0)
                    SetPedCoordsKeepVehicle(ped, x, y, groundZ)
                    break
                end
                Wait(0)
			end
			-- Remove black screen once the loop has ended.
			DoScreenFadeIn(650)
			if vehicle > 0 then
				FreezeEntityPosition(vehicle, false)
			else
				FreezeEntityPosition(ped, false)
			end

			if not found then
                -- If we can't find the coords, set the coords to the old ones.
                -- We don't unpack them before since they aren't in a loop and only called once.
                SetPedCoordsKeepVehicle(ped, oldCoords['x'], oldCoords['y'], oldCoords['z'] - 1.0)
                ESX.ShowNotification('Successfully Teleported', true, false)
			end

			-- If Z coord was found, set coords in found coords.
			SetPedCoordsKeepVehicle(ped, x, y, groundZ)
			ESX.ShowNotification('Successfully Teleported', true, false)
		end
	end)
end)

RegisterNetEvent("esx:killPlayer")
AddEventHandler("esx:killPlayer", function()
    SetEntityHealth(ESX.PlayerData.ped, 0)
end)

RegisterNetEvent("esx:freezePlayer")
AddEventHandler("esx:freezePlayer", function(input)
    local player = PlayerId()
    if input == 'freeze' then
        SetEntityCollision(ESX.PlayerData.ped, false)
        FreezeEntityPosition(ESX.PlayerData.ped, true)
        SetPlayerInvincible(player, true)
    elseif input == 'unfreeze' then
        SetEntityCollision(ESX.PlayerData.ped, true)
	    FreezeEntityPosition(ESX.PlayerData.ped, false)
        SetPlayerInvincible(player, false)
    end
end)
