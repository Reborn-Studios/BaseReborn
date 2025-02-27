AdminPanel = { -- This should not need saying, but do not mess with these unless you know what you"re doing.
    PlayerBlips = {},
    PlayerBlipsOnline = {},
    ServerInformation = {
        StaffCount = 0,
    },
    Spectating = false,
    DisplayingRadar = false,
    DisplayingBlips = false,
    DisplayingNames = false,
    FastSpeed = false,
    SpectatingPlayer = nil,
    SpectatingID = nil,
    ShowBlips = false,
    isInvisible = false,
    isFrozen = false,
    SavedCoords = nil,
    CurrentLogs = nil,
    SuperJump = false,
    NoRagdoll = false,
    GodMode = false,
    InfiniteStamina = false,
    NoClip = false,
    NewNoClip = false,
    Settings = {DarkMode = false, SeeThrough = false, Notifications = true},
}
local ShowNames = false

CreateThread(function()
    Wait(50)
    local DM = GetResourceKvpInt("mri_Qadmin:setting:darkmode") or 1
    if DM == 1 then DM = true elseif DM == 0 then DM = false end
    local ST = GetResourceKvpInt("mri_Qadmin:setting:seethrough") or 0
    if ST == 1 then ST = true elseif ST == 0 then ST = false end
    local NT = GetResourceKvpInt("mri_Qadmin:setting:notifications")
    if NT == 1 then NT = true elseif NT == 0 then NT = false end
    local theme = GetResourceKvpInt("mri_Qadmin:setting:theme") or 2
    AdminPanel.Settings = {DarkMode = DM, SeeThrough = ST, Notifications = NT, Theme = theme}
end)

local curLocation = {}
local curRotation = 0
local curHeading = 0

RegisterCommand("*adminpanel", function()
    -- TriggerServerEvent("mri_Qadmin:server:RefreshMenu", true)
    -- Wait(200)
    TriggerServerEvent("mri_Qadmin:server:RequestPanel")
end, false)
RegisterKeyMapping("*adminpanel", "(mri-Qadmin)", "keyboard", Config.AdminPanelKey)

--[[ RegisterCommand("*noclip", function()
    TriggerServerEvent("mri_Qadmin:server:RequestNoClip")
end, false)
RegisterKeyMapping("*noclip", Lang:t("commands.noclip").."(mri-Qadmin)", "keyboard", Config.NoClipKey) ]]

RegisterCommand("*showNames", function()
    if Config.EnableNames then
        if not Config.AllPlayersUseNames then
            Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
                AdminPanel.DisplayingNames = not AdminPanel.DisplayingNames
                if AdminPanel.DisplayingNames then
                    ShowNames = true
                    toggleNames()
                    -- TriggerServerEvent("mri_Qadmin:server:GetPlayersForBlips")
                else
                    ShowNames = false
                    toggleNames()
                    -- TriggerServerEvent("mri_Qadmin:server:GetPlayersForBlips")
                end
            end, "playernames")
        else
            AdminPanel.DisplayingNames = not AdminPanel.DisplayingNames
            if AdminPanel.DisplayingNames then
                ShowNames = true
                toggleNames()
                -- TriggerServerEvent("mri_Qadmin:server:GetPlayersForBlips")
            else
                ShowNames = false
                toggleNames()
                -- TriggerServerEvent("mri_Qadmin:server:GetPlayersForBlips")
            end
        end
    end
end, false)
RegisterKeyMapping("*showNames", Lang:t("commands.showNames").."(mri-Qadmin)", "keyboard", Config.ShowNamesKey)

if Config.EnableReportCommand then
    RegisterCommand(Config.ReportCommand, function()
        SendNUIMessage({
            action = "reportscreen",
            Translation = json.encode(Translations.html),
        })
        SetNuiFocus(true, true)
    end, false)
end

RegisterNetEvent("mri_Qadmin:client:ToggleNoClip", function()
    if Config.NoClipType == 2 then
        local x, y, z = table.unpack(GetEntityCoords(PlayerPedId(), false))
        curLocation = { x = x, y = y, z = z }
        curRotation = GetEntityRotation(playerPed, false)
        curHeading = GetEntityHeading(playerPed)
        AdminPanel.NoClip = not AdminPanel.NoClip
        NoClip(AdminPanel.NoClip)
    elseif Config.NoClipType == 1 then
        AdminPanel.NewNoClip = not AdminPanel.NewNoClip
        toggleFreecam(AdminPanel.NewNoClip, AdminPanel.isInvisible)
    elseif Config.NoClipType == 3 then
        AdminPanel.NewNoClip = not AdminPanel.NewNoClip
        ToggleNoClip(AdminPanel.NewNoClip)
    elseif Config.NoClipType == 4 then
        AdminPanel.NewNoClip = not AdminPanel.NewNoClip
        toggleNoClipMode()
        -- toggleNoClipMode(AdminPanel.NewNoClip)
    end
    if AdminPanel.NewNoClip or AdminPanel.NoClip then
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong>"..Lang:t("alerts.noclipEnabled"))
    else
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong>"..Lang:t("alerts.noclipDisabled"))
    end
end)

RegisterNetEvent("mri_Qadmin:client:OpenMenu", function(playerList, ServerInformation, MaxPlayers, Version, hasPerms, Role)
    SendNUIMessage({
        action = "open",
        name = GetPlayerName(PlayerId()),
        playerlist = playerList,
        darkmode = AdminPanel.Settings.DarkMode,
        seethrough = AdminPanel.Settings.SeeThrough,
        Notifications = AdminPanel.Settings.Notifications,
        Theme = AdminPanel.Settings.Theme,
        serverData = ServerInformation,
        maxplayers = MaxPlayers,
        version = Version,
        hasPerms = hasPerms,
        Translation = json.encode(Translations.html),
        Framework = QBCore and "QBCore" or "ESX",
        Role = Role
    })
    SetNuiFocus(true,true)
end)

RegisterNetEvent("mri_Qadmin:client:RefreshMenu", function(playerList, silent)
    SendNUIMessage({
        action = "refresh",
        name = GetPlayerName(PlayerId()),
        playerlist = playerList,
        serverData = AdminPanel.ServerInformation,
    })
    if not silent then
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.playerListRefreshed"))
    end
end)

RegisterNetEvent("mri_Qadmin:client:ViewPlayer", function(online, playerData)
    if online then
        SendNUIMessage({
            action = "viewonlineplayer",
            playerid = playerData
        })
        DebugTrace("NUIMessage: viewonlineplayer")
    else
        SendNUIMessage({
            action = "viewofflineplayer",
            playerdata = playerData
        })
        DebugTrace("NUIMessage: viewofflineplayer")
    end
    DebugTrace("Received player data. Online: "..(online and "yes" or "no"))
end)

RegisterNetEvent("mri_Qadmin:client:ResetMenu", function()
    SendNUIMessage({
        action = "noperms"
    })
end)

RegisterNetEvent("mri_Qadmin:client:WarnPlayer", function(warnedBy, reason)
    SendNUIMessage({
        action = "showwarning",
        by = warnedBy,
        reason = reason
    })
    SetNuiFocus(true, true)
    FreezeEntityPosition(PlayerPedId(), true)
end)

RegisterNUICallback("GiveItem", function(data)
    TriggerServerEvent("mri_Qadmin:server:GiveItem", data.Id, data.Item, data.Amount)
end)

RegisterNUICallback("SpawnVehicle", function(data)
    TriggerServerEvent("mri_Qadmin:server:RequestVehicleSpawn", data.Vehicle)
end)

RegisterNUICallback("ReportReply", function(data)
    if data ~= nil then
        TriggerServerEvent("mri_Qadmin:server:ReportReply", data)
    end
end)

RegisterNUICallback("ExitWarn", function()
    SetNuiFocus(false, false)
    FreezeEntityPosition(PlayerPedId(), false)
end)

RegisterNetEvent("mri_Qadmin:client:ShowPanelAlert", function(type, text)
    if type == "success" then 
        PlaySoundFrontend(-1, "Confirm", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds", true)
    elseif type == "danger" or type == "warning" or type == "error" then
        PlaySoundFrontend(-1, "Cancel", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds", true)
    end
    SendNUIMessage({
        action = "showalert",
        type = type,
        text = text
    })
end)

RegisterNetEvent("mri_Qadmin:client:ShowReportAlert", function(title, text)
    PlaySoundFrontend(-1, "Cancel", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds", true)
    SendNUIMessage({
        action = "showreportalert",
        title = title,
        text = text
    })
end)

RegisterNetEvent("mri_Qadmin:client:ForceReloadResources", function()
    TriggerServerEvent("mri_Qadmin:server:RequestResourcePageInfo")
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveJobPageInfo", function(JobPageInfo)
    DebugTrace("Received job page info")
    SendNUIMessage({
        action = "jobinfo",
        jobinfo = JobPageInfo,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveGangPageInfo", function(GangPageInfo)
    DebugTrace("Received gang page info")
    SendNUIMessage({
        action = "ganginfo",
        ganginfo = GangPageInfo,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveResourcePageInfo", function(ResourcePageInfo)
    DebugTrace("Received resource page info")
    SendNUIMessage({
        action = "resourceinfo",
        resourceinfo = ResourcePageInfo,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveBansInfo", function(BansInfo)
    DebugTrace("Received bans page info")
    SendNUIMessage({
        action = "bansinfo",
        bansinfo = BansInfo,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveReportsInfo", function(ReportsInfo)
    DebugTrace("Received reports page info")
    SendNUIMessage({
        action = "reportsinfo",
        reportsinfo = ReportsInfo,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveAdminChat", function(AdminChat)
    DebugTrace("Received admin chat")
    SendNUIMessage({
        action = "adminchat",
        adminchat = AdminChat,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveVehiclesInfo", function(VehiclesInfo)
    DebugTrace("Received vehicles page info")
    local vehicles = {}
    local allVehicles = GetAllVehicleModels()
    for k,veh in pairs(allVehicles) do
        if VehiclesInfo[veh] then
            vehicles[veh] = VehiclesInfo[veh]
        end
    end
    SendNUIMessage({
        action = "vehiclesinfo",
        vehiclesinfo = vehicles,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveLeaderboardInfo", function(money, vehicles)
    DebugTrace("Received leaderboard page info")
    SendNUIMessage({
        action = "leaderboardinfo",
        money = money,
        vehicles = vehicles,
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveItemsInfo", function(ItemsInfo)
    DebugTrace("Received items page info")
    SendNUIMessage({
        action = "itemsinfo",
        itemsinfo = ItemsInfo,
    })
end)


RegisterNetEvent("mri_Qadmin:client:ReceiveCharacters", function(players)
    DebugTrace("Received characters page info")
    SendNUIMessage({
        action = "characterslist",
        characters = players
    })
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveCurrentLogs", function(currentLogs)
    AdminPanel.CurrentLogs = currentLogs
    SendNUIMessage({
        action = "logslist",
        logs = AdminPanel.CurrentLogs
    })
end)

RegisterNetEvent("mri_Qadmin:client:ToggleBlips", function()
    --COME BACK HERE
end)

RegisterNetEvent("mri_Qadmin:client:ViewWarnings", function(warnings)
    DebugTrace("[mri_Qadmin:client:ViewWarnings] Received warnings")
    SendNUIMessage({
        action = "viewwarnings",
        warnings = warnings,
    })
end)

RegisterNetEvent("mri_Qadmin:client:SetPedModel", function(model)
    if model then
        Citizen.CreateThread(function()
            model = GetHashKey(model)
            RequestModel(model)
            while not HasModelLoaded(model) do
                RequestModel(model)
                Citizen.Wait(0)
            end
            SetPlayerModel(PlayerId(), model)
            SetPedComponentVariation(PlayerPedId(), 0, 0, 0, 2)
        end)
    end
end)

RegisterNetEvent("mri_Qadmin:client:DeleteAllEntities", function(entityType)
    if entityType == 1 then
        for vehicle in EnumerateVehicles() do
            if (not IsPedAPlayer(GetPedInVehicleSeat(vehicle, -1))) then 
                SetVehicleHasBeenOwnedByPlayer(vehicle, false) 
                SetEntityAsMissionEntity(vehicle, false, false) 
                DeleteVehicle(vehicle)
                if (DoesEntityExist(vehicle)) then 
                    DeleteVehicle(vehicle) 
                end
            end
        end
    elseif entityType == 2 then
        for ped in EnumeratePeds() do
            if (not IsPedAPlayer(ped)) then 
                SetEntityAsMissionEntity(ped, false, false) 
                DeleteEntity(ped)
                if (DoesEntityExist(ped)) then 
                    DeleteEntity(ped) 
                end
            end
        end
    elseif entityType == 3 then
        for object in EnumerateObjects() do
            SetEntityAsMissionEntity(object, false, false) 
            DeleteEntity(object)
            if (DoesEntityExist(object)) then 
                DeleteEntity(object) 
            end
        end
    end
end)

RegisterNetEvent("mri_Qadmin:client:RequestSpectate", function(playerServerId, tgtCoords, name)
	local localPlayerPed = PlayerPedId()
    AdminPanel.SpectatingPlayer = name
    AdminPanel.SpectatingID = playerServerId
    if playerServerId == -1 then 
        AdminPanel.SpectatePlayer(-1,-1,"")
    else
        if ((not tgtCoords) or (tgtCoords.z == 0.0)) then tgtCoords = GetEntityCoords(GetPlayerPed(GetPlayerFromServerId(playerServerId))) end
        if playerServerId == GetPlayerServerId(PlayerId()) then 
            if AdminPanel.SavedCoords then
                RequestCollisionAtCoord(AdminPanel.SavedCoords.x, AdminPanel.SavedCoords.y, AdminPanel.SavedCoords.z)
                Wait(500)
                SetEntityCoords(playerPed, AdminPanel.SavedCoords.x, AdminPanel.SavedCoords.y, AdminPanel.SavedCoords.z, 0, 0, 0, false)
                AdminPanel.SavedCoords = nil
            end
            AdminPanel.SpectatePlayer(GetPlayerPed(PlayerId()),GetPlayerFromServerId(PlayerId()),GetPlayerName(PlayerId()))
            return
        else
            if not AdminPanel.SavedCoords then
                AdminPanel.SavedCoords = GetEntityCoords(PlayerPedId())
            end
        end
        SetEntityCoords(localPlayerPed, tgtCoords.x, tgtCoords.y, tgtCoords.z - 10.0, 0, 0, 0, false)
        local adminPed = localPlayerPed
        local playerId = GetPlayerFromServerId(playerServerId)
        repeat
            Wait(200)
            playerId = GetPlayerFromServerId(playerServerId)
        until ((GetPlayerPed(playerId) > 0) and (playerId ~= -1))
        AdminPanel.SpectatePlayer(GetPlayerPed(playerId),playerId,GetPlayerName(playerId))
    end
end)

RegisterNetEvent("mri_Qadmin:client:RequestInventory", function(TargetId)
    local targetPlayer = GetPlayerServerId(NetworkGetPlayerIndexFromPed(TargetId))
    if not targetPlayer then return end
    exports.ox_inventory:openInventory("player", targetPlayer)
end)
  
RegisterNetEvent("mri_Qadmin:client:setLivery", function(livery)
    local Veh = GetVehiclePedIsIn(PlayerPedId())
    if Veh then
        SetVehicleLivery(Veh, livery)
    end
end)

RegisterNetEvent("mri_Qadmin:client:SetPosition", function(coords)
    local ped = PlayerPedId()
    SetEntityCoords(ped, coords.x, coords.y, coords.z)
end)

RegisterNetEvent("mri_Qadmin:client:Freeze", function()
    AdminPanel.isFrozen = not AdminPanel.isFrozen
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped)

    if veh ~= 0 then
        FreezeEntityPosition(ped, AdminPanel.isFrozen)
        FreezeEntityPosition(veh, AdminPanel.isFrozen)
    else
        FreezeEntityPosition(ped, AdminPanel.isFrozen)
    end
end)

RegisterNetEvent("mri_Qadmin:client:SendReport", function(name, src, msg, subject)
    TriggerServerEvent("mri_Qadmin:server:SendReport", name, src, msg, subject)
end)

RegisterNetEvent("mri_Qadmin:client:SaveCar", function(senderId)
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped)

    if veh ~= nil and veh ~= 0 then
        local plate = QBCore.Functions.GetPlate(veh)
        local props = QBCore.Functions.GetVehicleProperties(veh)
        local hash = props.model
        local vehname = GetDisplayNameFromVehicleModel(hash):lower()
        if QBCore.Shared.Vehicles[vehname] ~= nil and next(QBCore.Shared.Vehicles[vehname]) ~= nil then
            TriggerServerEvent("mri_Qadmin:server:SaveCar", props, QBCore.Shared.Vehicles[vehname], `veh`, plate, senderId)
        else
            QBCore.Functions.Notify(Lang:t("notify.cantStoreVehicle"), "error")
        end
    else
        QBCore.Functions.Notify(Lang:t("notify.notInVehicle"), "error")
    end
end)

RegisterNetEvent("mri_Qadmin:client:SetModel", function(skin)
    local ped = PlayerPedId()
    local model = GetHashKey(skin)

    SetEntityInvincible(ped, true)

    if IsModelInCdimage(model) and IsModelValid(model) then
        RequestModel(model)
        repeat Wait(0) until HasModelLoaded(model)
        SetPlayerModel(PlayerId(), model)

        if isPedAllowedRandom() then
            SetPedRandomComponentVariation(ped, true)
            SetPedDefaultComponentVariation(ped)
        end
        
		SetModelAsNoLongerNeeded(model)
	end
	SetEntityInvincible(ped, false)
end)

RegisterNetEvent("mri_Qadmin:client:MassDespawn", function ()
    for vehicle in EnumerateVehicles() do
        if (not IsPedAPlayer(GetPedInVehicleSeat(vehicle, -1))) then 
            SetVehicleHasBeenOwnedByPlayer(vehicle, false) 
            SetEntityAsMissionEntity(vehicle, false, false) 
            DeleteVehicle(vehicle)
            if (DoesEntityExist(vehicle)) then 
                DeleteVehicle(vehicle) 
            end
        end
    end
end)

RegisterNetEvent("mri_Qadmin:client:MassPedDespawn", function ()
    for ped in EnumeratePeds() do
        if (not IsPedAPlayer(ped)) then 
            SetEntityAsMissionEntity(ped, false, false) 
            DeleteEntity(ped)
            if (DoesEntityExist(ped)) then 
                DeleteEntity(ped) 
            end
        end
    end
end)

RegisterNetEvent("mri_Qadmin:client:MassObjDespawn", function ()
    for object in EnumerateObjects() do
        if (IsEntityAnObject(object)) then 
            SetEntityAsMissionEntity(object, false, false) 
            DeleteEntity(object)
            if (DoesEntityExist(object)) then 
                DeleteEntity(object) 
            end
        end
    end
end)

RegisterNetEvent("mri_Qadmin:client:MassEverythingDespawn", function ()
    for entity in EnumerateEntities() do
        if (IsEntityAPed(entity)) then 
            if not IsPedAPlayer(entity) then
                SetEntityAsMissionEntity(entity, false, false) 
                DeleteEntity(entity)
                if (DoesEntityExist(entity)) then 
                    DeleteEntity(entity) 
                end
            end
        else
            SetEntityAsMissionEntity(entity, false, false) 
            DeleteEntity(entity)
            if (DoesEntityExist(entity)) then 
                DeleteEntity(entity) 
            end
        end
    end
end)

RegisterNetEvent("mri_Qadmin:client:SetNuiFocus", function(focus, mouse)
    SetNuiFocus(focus, mouse)
end)

RegisterNetEvent("mri_Qadmin:client:ReceiveServerMetrics", function(serverMetrics)
    DebugTrace("Received server metrics")
    SendNUIMessage({
        action = "servermetrics",
        metrics = serverMetrics,
    })
end)

---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------

RegisterNUICallback("close", function()
    SetNuiFocus(false, false)
    TriggerServerEvent("mri_Qadmin:server:ClosePanel")
    DebugTrace("NUICallback: close")
end)

RegisterNUICallback("LoadJobInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestJobPageInfo")
    DebugTrace("NUICallback: LoadJobInfo")
end)

RegisterNUICallback("LoadGangInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestGangPageInfo")
    DebugTrace("NUICallback: LoadGangInfo")
end)

RegisterNUICallback("LoadResourcesInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestResourcePageInfo")
    DebugTrace("NUICallback: LoadResourcesInfo")
end)

RegisterNUICallback("LoadServerMetrics", function()
    TriggerServerEvent("mri_Qadmin:server:RequestServerMetrics")
    DebugTrace("NUICallback: LoadServerMetrics")
end)

RegisterNUICallback("LoadBansInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestBansInfo")
    DebugTrace("NUICallback: LoadBansInfo")
end)

RegisterNUICallback("LoadReportsInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestReportsInfo")
    DebugTrace("NUICallback: LoadReportsInfo")
end)

RegisterNUICallback("LoadAdminChat", function()
    TriggerServerEvent("mri_Qadmin:server:RequestAdminChat")
    DebugTrace("NUICallback: LoadAdminChat")
end)

RegisterNUICallback("AdminChatSend", function(info)
    TriggerServerEvent("mri_Qadmin:server:AdminChatSend", info["message"])
    DebugTrace("NUICallback: AdminChatSend")
end)

RegisterNUICallback("LoadItemsInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestItemsInfo")
    DebugTrace("NUICallback: LoadItemsInfo")
end)

RegisterNUICallback("LoadVehiclesInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestVehiclesInfo")
    DebugTrace("NUICallback: LoadVehiclesInfo")
end)

RegisterNUICallback("LoadLeaderboardInfo", function()
    TriggerServerEvent("mri_Qadmin:server:RequestLeaderboardInfo")
    DebugTrace("NUICallback: LoadLeadeaderboardInfo")
end)

RegisterNUICallback("LoadLogs", function()
    TriggerServerEvent("mri_Qadmin:server:RequestCurrentLogs")
    DebugTrace("NUICallback: LoadLogs")
end)

RegisterNUICallback("LoadCharacters", function()
    TriggerServerEvent("mri_Qadmin:server:RequestCharacters")
    DebugTrace("NUICallback: LoadCharacters")
end)

RegisterNUICallback("RequestViewPlayer", function(player)
    TriggerServerEvent("mri_Qadmin:server:RequestViewPlayer", player)
    DebugTrace("NUICallback: RequestViewPlayer")
end)

RegisterNUICallback("SendReport", function(info)
    TriggerServerEvent("mri_Qadmin:server:SendReport", info["subject"], info["info"], info["type"])
    DebugTrace("NUICallback: SendReport")
end)

RegisterNUICallback("ResourceAction", function(info)
    local currentResource = info["resource"]
    if info["action"] == "start" or info["action"] == "stop" or info["action"] == "restart" then
        TriggerServerEvent("mri_Qadmin:server:ResourceAction", currentResource, info["action"])
    end
    DebugTrace("NUICallback: ResourceAction ["..info["action"].."]")
end)

RegisterNetEvent("mri_Qadmin:client:OpenSkinMenu1", function()
    if Config.ESXSkin == "AK" then
        exports["ak47_clothing"]:openOutfitMenu()
    else
        TriggerEvent("esx_skin:openRestrictedMenu", function(data, menu)
            menu.close()
    
            ESX.UI.Menu.Open("default", GetCurrentResourceName(), "shop_confirm", {
                title = "Validate this purchase!",
                align = "top-left",
                elements = {
                    {label = "No", value = "no"},
                    {label = "Yes", value = "yes"}
            }}, function(data, menu)
                menu.close()
    
                if data.current.value == "yes" then
                    ESX.TriggerServerCallback("esx_clotheshop:buyClothes", function(bought)
                        if bought then
                            TriggerEvent("skinchanger:getSkin", function(skin)
                                TriggerServerEvent("esx_skin:save", skin)
                            end)
    
                            hasPaid = true
    
                            ESX.TriggerServerCallback("esx_clotheshop:checkPropertyDataStore", function(foundStore)
                                if foundStore then
                                    ESX.UI.Menu.Open("default", GetCurrentResourceName(), "save_dressing", {
                                        title = "Save in dressing",
                                        align = "top-left",
                                        elements = {
                                            {label = "No",  value = "no"},
                                            {label = "Yes", value = "yes"}
                                    }}, function(data2, menu2)
                                        menu2.close()
    
                                        if data2.current.value == "yes" then
                                            ESX.UI.Menu.Open("dialog", GetCurrentResourceName(), "outfit_name", {
                                                title = "Outfit name"
                                            }, function(data3, menu3)
                                                menu3.close()
    
                                                TriggerEvent("skinchanger:getSkin", function(skin)
                                                    TriggerServerEvent("esx_clotheshop:saveOutfit", data3.value, skin)
                                                    ESX.ShowNotification("Saved outfit")
                                                end)
                                            end, function(data3, menu3)
                                                menu3.close()
                                            end)
                                        end
                                    end)
                                end
                            end)
    
                        else
                            ESX.TriggerServerCallback("esx_skin:getPlayerSkin", function(skin)
                                TriggerEvent("skinchanger:loadSkin", skin)
                            end)
    
                            ESX.ShowNotification("Not enough money!")
                        end
                    end)
                elseif data.current.value == "no" then
                    ESX.TriggerServerCallback("esx_skin:getPlayerSkin", function(skin)
                        TriggerEvent("skinchanger:loadSkin", skin)
                    end)
                end
    
                currentAction     = "shop_menu"
                currentActionMsg  = "Press the menu"
                currentActionData = {}
            end, function(data, menu)
                menu.close()
    
                currentAction     = "shop_menu"
                currentActionMsg  = "Press the menu"
                currentActionData = {}
            end)
    
        end, function(data, menu)
            menu.close()
    
            currentAction     = "shop_menu"
            currentActionMsg  = "Press the menu"
            currentActionData = {}
        end, {
            "tshirt_1", "tshirt_2",
            "torso_1", "torso_2",
            "decals_1", "decals_2",
            "arms",	"arms_2",
            "pants_1", "pants_2",
            "shoes_1", "shoes_2",
            "bags_1", "bags_2",
            "chain_1", "chain_2",
            "helmet_1", "helmet_2",
            "glasses_1", "glasses_2"
        })
    end
end)

RegisterNUICallback("Action", function(info)
    local currentPlayer = info["id"]
    if info["action"] == "uncuffSelf" then
        Compat.UncuffSelf()
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.uncuffed"))
    elseif info["action"] == "revive" then
        TriggerServerEvent("mri_Qadmin:server:RevivePlayer", currentPlayer)
    elseif info["action"] == "goto" then
        TriggerServerEvent("mri_Qadmin:server:GotoPlayer", currentPlayer)
    elseif info["action"] == "bring" then
        local target = GetPlayerPed(currentPlayer)
        local plyCoords = GetEntityCoords(PlayerPedId())
        TriggerServerEvent("mri_Qadmin:server:BringPlayer", currentPlayer, plyCoords)
    elseif info["action"] == "sendtolegion" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, 215.75, -804.26, 30.81)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.senToLegion"))
    elseif info["action"] == "sendtopillbox" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, 299.01, -577.48, 43.26)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.sentToPillbox"))
    elseif info["action"] == "sendtolsc" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, -366.58, -126.01, 38.69)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.sentToCustoms"))
    elseif info["action"] == "sendtomrpd" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, 415.41, -993.4, 29.38)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.sentToMRPD"))
    elseif info["action"] == "sendtosandy" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, 1963.56, 3735.19, 32.2)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.sentToSandy"))
    elseif info["action"] == "sendtograpeseed" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, 1692.89, 4942.49, 42.32)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.sentToGrapeseed"))
    elseif info["action"] == "sendtopaleto" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, 125.64, 6611.6, 31.86)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.sentToPaleto"))
    elseif info["action"] == "sendtolsia" then
        TriggerServerEvent("mri_Qadmin:server:SetPosition", currentPlayer, -1021.81, -2701.25, 13.76)
        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.sentToLSA"))
    elseif info["action"] == "kill" then
        TriggerServerEvent("mri_Qadmin:server:KillPlayer", currentPlayer)
    elseif info["action"] == "cuff" then
        TriggerServerEvent("mri_Qadmin:server:CuffPlayer", currentPlayer)
    elseif info["action"] == "save" then
        TriggerServerEvent("mri_Qadmin:server:SavePlayer", currentPlayer)
    elseif info["action"] == "clothing" then
        TriggerServerEvent("mri_Qadmin:server:OpenSkinMenu", currentPlayer)
    elseif info["action"] == "sclothing" then
        SendNUIMessage({
            action = "close"
        })
        SetNuiFocus(false, false)
        TriggerServerEvent("mri_Qadmin:server:OpenSkinMenu", GetPlayerServerId(PlayerId()))
    elseif info["action"] == "feed" then
        TriggerServerEvent("mri_Qadmin:server:FeedPlayer", currentPlayer)
        Citizen.Wait(50)
        TriggerServerEvent("mri_Qadmin:server:RefreshMenu", true)
    elseif info["action"] == "stress" then
        TriggerServerEvent("mri_Qadmin:server:RelieveStress", currentPlayer)
        Citizen.Wait(50)
        TriggerServerEvent("mri_Qadmin:server:RefreshMenu", true)
    elseif info["action"] == "openinv" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            SendNUIMessage({
                action = "close"
            })
            SetNuiFocus(false, false)
            TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.openingPlayerInv"))
            TriggerEvent("mri_Qadmin:client:RequestInventory", currentPlayer)
        end, "openinventory")
    elseif info["action"] == "clearinv" then
        TriggerServerEvent("mri_Qadmin:server:ClearInventory", currentPlayer)
    elseif info["action"] == "screenshot" then
        TriggerServerEvent("mri_Qadmin:server:ScreenshotSubmit", currentPlayer)
    elseif info["action"] == "spectate" then
        TriggerServerEvent("mri_Qadmin:server:RequestSpectate", currentPlayer)
        SendNUIMessage({
            action = "close"
        })
        SetNuiFocus(false, false)
    elseif info["action"] == "freeze" then
        TriggerServerEvent("mri_Qadmin:server:Freeze", currentPlayer)
    elseif info["action"] == "revives" then
        TriggerServerEvent("mri_Qadmin:server:RevivePlayer", GetPlayerServerId(PlayerId()))
    elseif info["action"] == "sendback" then
        TriggerServerEvent("mri_Qadmin:server:SendPlayerBack", currentPlayer)
    elseif info["action"] == "goback" then
        TriggerServerEvent("mri_Qadmin:server:SendBackSelf")
    elseif info["action"] == "tpm" then
        if IsWaypointActive() then
            local WaypointHandle = GetFirstBlipInfoId(8)

            if DoesBlipExist(WaypointHandle) then
                local waypointCoords = GetBlipInfoIdCoord(WaypointHandle)

                for height = 1, 1000 do
                    SetPedCoordsKeepVehicle(PlayerPedId(), waypointCoords["x"], waypointCoords["y"], height + 0.0)

                    local foundGround, zPos = GetGroundZFor_3dCoord(waypointCoords["x"], waypointCoords["y"], height + 0.0)

                    if foundGround then
                        SetPedCoordsKeepVehicle(PlayerPedId(), waypointCoords["x"], waypointCoords["y"], height + 0.0)

                        break
                    end

                    Citizen.Wait(5)
                end
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.tpm"))
            else
                ESX.ShowNotification("Select Waypoint")
            end
        else
            TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.error").."</strong> "..Lang:t("alerts.noMarker"))
        end
    elseif info["action"] == "setpedmodel" then
        if info["model"] then
            TriggerServerEvent("mri_Qadmin:server:SetPedModel", currentPlayer, info["model"])
        end
    elseif info["action"] == "invisible" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if not AdminPanel.isInvisible then
                SetEntityVisible(PlayerPedId(), false, false)
                AdminPanel.isInvisible = true
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.invis"))
            else
                SetEntityVisible(PlayerPedId(), true, false)
                AdminPanel.isInvisible = false
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong> "..Lang:t("alerts.vis"))
            end
        end, "invisibility")
    elseif info["action"] == "togradar" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            AdminPanel.DisplayingRadar = not AdminPanel.DisplayingRadar
            if AdminPanel.DisplayingRadar then
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.radarOn"))
            else
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong> "..Lang:t("alerts.radarOff"))
            end
        end, "forceradar")
    elseif info["action"] == "togblips" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            AdminPanel.DisplayingBlips = not AdminPanel.DisplayingBlips
            if AdminPanel.DisplayingBlips then
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.blipsOn"))
            else
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong> "..Lang:t("alerts.blipsOff"))
            end
        end, "playerblips")
    elseif info["action"] == "tognames" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            AdminPanel.DisplayingNames = not AdminPanel.DisplayingNames
            if AdminPanel.DisplayingNames then
                ShowNames = true
                -- TriggerServerEvent("mri_Qadmin:server:GetPlayersForBlips")
                toggleNames()
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.NamesOn"))
            else
                ShowNames = false
                -- TriggerServerEvent("mri_Qadmin:server:GetPlayersForBlips")
                toggleNames()
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong> "..Lang:t("alerts.NamesOff"))
            end
        end, "playerblips")
    elseif info["action"] == "togspeed" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            AdminPanel.FastSpeed = not AdminPanel.FastSpeed
            if AdminPanel.FastSpeed then
                SetRunSprintMultiplierForPlayer(PlayerId(), 1.49)
                SetSwimMultiplierForPlayer(PlayerId(), 1.49)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.RunOn"))
            else
                SetRunSprintMultiplierForPlayer(PlayerId(), 1.0)
                SetSwimMultiplierForPlayer(PlayerId(), 1.0)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong> "..Lang:t("alerts.RunOff"))
            end
        end, "fastrun")
    elseif info["action"] == "god" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if not AdminPanel.GodMode then
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.GodOn"))
                godModeChange()
            else
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong> "..Lang:t("alerts.GodOff"))
                godModeChange()
            end
        end, "godmode")
    elseif info["action"] == "setmedriver" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = Compat.GetClosestVehicle()
            if vehicle then
                if IsVehicleSeatFree(vehicle,-1) then
                    SetPedIntoVehicle(PlayerPedId(),vehicle,-1)
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.EnterVehicle"))
                else
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong> "..Lang:t("alerts.VehicleFull"))
                end
            end
        end, "setmedriver")
    elseif info["action"] == "setmepass" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = Compat.GetClosestVehicle()
            if vehicle then
                if seat == nil then
                    seat = 0 
                elseif tonumber(seat) == 3 then
                    seat = 1
                elseif tonumber(seat) == 4 then
                    seat = 2
                end
                if IsVehicleSeatFree(vehicle,seat) then
                    SetPedIntoVehicle(PlayerPedId(),vehicle,seat)
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong> "..Lang:t("alerts.EnterVehicle"))
                else
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong> "..Lang:t("alerts.VehicleFull"))
                end
            end
        end, "setmepassenger")
    elseif info["action"] == "clearblood" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            ClearPedBloodDamage(PlayerPedId())
            TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.bloodCleared"))
        end, "clearblood")
    elseif info["action"] == "wetclothes" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            SetPedWetnessHeight(PlayerPedId(), 2.0)
            TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.clothesWet"))
        end, "wetclothes")
    elseif info["action"] == "dryclothes" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            ClearPedWetness(PlayerPedId())
            TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.clothesDry"))
        end, "dryclothes")
    elseif info["action"] == "deleteclosestveh" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local entity, distance = Compat.GetClosestVehicle()
            if entity then
                if distance < 10.0 then
                    AdminPanel.DeleteEntity(entity)
                else
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong>"..Lang:t("alerts.vehicleFar"))
                end
            end
        end, "deleteclosestvehicle")
    elseif info["action"] == "deleteclosestped" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local entity, distance = AdminPanel.GetClosestPedNotPlayer()
            if entity then
                if not IsPedAPlayer(entity) then
                    if distance < 10.0 then
                        AdminPanel.DeleteEntity(entity)
                    else
                        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong>"..Lang:t("alerts.pedFar"))
                    end
                else
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong>"..Lang:t("alerts.pedIsPlayer"))
                end
            end
        end, "deleteclosestped")
    elseif info["action"] == "deleteclosestobj" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local entity, distance = Compat.GetClosestObject()
            if entity then
                if distance < 10.0 then                
                    AdminPanel.DeleteEntity(entity)
                else
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong>"..Lang:t("alerts.objectFar"))
                end
            end
        end, "deleteclosestobject")
    elseif info["action"] == "repairv" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = Compat.GetClosestVehicle()
            if vehicle then
                SetVehicleUndriveable(vehicle, false)
                SetVehicleBodyHealth(vehicle, 1000)
                SetVehicleDeformationFixed(vehicle)
                SetVehicleEngineHealth(vehicle, 1000)
                SetVehicleEngineOn(vehicle, true, true)
                SetVehicleFixed(vehicle)
                SetVehicleOnGroundProperly(vehicle)
                SetVehicleGravity(vehicle, true)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.repairedVehicle"))
            end
        end, "repairvehicle")
    elseif info["action"] == "wash" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = Compat.GetClosestVehicle()
            if vehicle then
                SetVehicleDirtLevel(vehicle, 0)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.washedVehicle"))
            end
        end, "washvehicle")
    elseif info["action"] == "hotwire" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = GetVehiclePedIsIn(PlayerPedId())
            if vehicle then
                -- exports["qb-vehiclekeys"]:SetVehicleKey(GetVehicleNumberPlateText(vehicle), true)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.hotwireVehicle"))
            end
        end, "hotwirevehicle")
    elseif info["action"] == "lockv" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = Compat.GetClosestVehicle()
            if vehicle then
                SetVehicleDoorsLocked(vehicle, 2)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.lockedVehicle"))
            end
        end, "lockvehicle")
    elseif info["action"] == "unlockv" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = Compat.GetClosestVehicle()
            if vehicle then
                SetVehicleDoorsLocked(vehicle, 1)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.lockedVehicle"))
            end
        end, "unlockvehicle")
    elseif info["action"] == "spawnvehicle" then
        if info["model"] then
            SendNUIMessage({
                action = "close"
            })
            SetNuiFocus(false, false)
            TriggerServerEvent("mri_Qadmin:server:RequestVehicleSpawn", info["model"])
        end
    elseif info["action"] == "maxpupgrades" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
            if vehicle then
                SetVehicleModKit(vehicle, 0)
                SetVehicleMod(vehicle, 11, GetNumVehicleMods(vehicle, 11) - 1, false)
                SetVehicleMod(vehicle, 12, GetNumVehicleMods(vehicle, 12) - 1, false)
                SetVehicleMod(vehicle, 13, GetNumVehicleMods(vehicle, 13) - 1, false)
                SetVehicleMod(vehicle, 15, GetNumVehicleMods(vehicle, 15) - 2, false)
                SetVehicleMod(vehicle, 16, GetNumVehicleMods(vehicle, 16) - 1, false)
                ToggleVehicleMod(vehicle, 17, true)
                ToggleVehicleMod(vehicle, 18, true)
                ToggleVehicleMod(vehicle, 19, true)
                ToggleVehicleMod(vehicle, 21, true)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.vehicleMaxPerformance"))
                SendNUIMessage({
                    action = "close"
                })
                SetNuiFocus(false, false)
            end
        end, "maxperformanceupgrades")
    elseif info["action"] == "randvisualparts" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle, distance = Compat.GetClosestVehicle()
            if vehicle then
                if distance < 10.0 then
                    SetVehicleModKit(vehicle, 0)
                    for i=1, 47 do
                        SetVehicleMod(vehicle, i, math.random(1, 4), true)
                    end
                    SetVehicleMod(vehicle, 49, math.random(1, 4), true)
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.vehicleRandomVisual"))
                    SendNUIMessage({
                        action = "close"
                    })
                    SetNuiFocus(false, false)
                    --PlaySoundFrontend(-1, "CONTINUE", "HUD_FRONTEND_DEFAULT_SOUNDSET", false)
                else
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong>"..Lang:t("alerts.vehicleFar"))
                end
            end
        end, "randomvisualparts")
    elseif info["action"] == "setlivery" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle, distance = Compat.GetClosestVehicle()
            if vehicle then
                if distance < 10.0 then
                    if info["livery"] then
                        SetVehicleModKit(vehicle, 0)
                        SetVehicleMod(vehicle, 48, tonumber(info["livery"]), true)
                        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.liverySet").." "..GetLabelText(GetLiveryName(vehicle, tonumber(info["livery"])))..".")
                        SendNUIMessage({
                            action = "close"
                        })
                        SetNuiFocus(false, false)
                    end
                else
                    TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong>"..Lang:t("alerts.vehicleFar"))
                end
            end
        end, "setlivery")
    elseif info["action"] == "setcolor" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if info["primarycolor"] and info["secondarycolor"] then
                local PrimaryColor = info["primarycolor"]
                local SecondaryColor = info["secondarycolor"]
                local vehicle, distance = Compat.GetClosestVehicle()
                if vehicle then
                    if distance < 10.0 then
                        SetVehicleCustomPrimaryColour(vehicle, PrimaryColor.r, PrimaryColor.g, PrimaryColor.b)
                        SetVehicleCustomSecondaryColour(vehicle, SecondaryColor.r, SecondaryColor.g, SecondaryColor.b)
                        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.colorSet"))
                        SendNUIMessage({
                            action = "close"
                        })
                        SetNuiFocus(false, false)
                    else
                        TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong>"..Lang:t("alerts.vehicleFar"))
                    end
                end
            end
        end, "setcolor")
    elseif info["action"] == "filltank" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            local vehicle = Compat.GetClosestVehicle()
            if vehicle then
                -- exports[Config.FuelScript]:SetFuel(vehicle, 100)
                TriggerEvent("ox_fuel:createStatebag", vehicle, 100)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.fuelSet"))
            end
        end, "fillgastank")
    elseif info["action"] == "kick" then       
        TriggerServerEvent("mri_Qadmin:server:KickPlayer", currentPlayer, info["reason"])
    elseif info["action"] == "warn" then       
        TriggerServerEvent("mri_Qadmin:server:WarnPlayer", currentPlayer, info["reason"], info["citizenid"])
    elseif info["action"] == "checkwarn" then
        TriggerServerEvent("mri_Qadmin:server:ViewWarnings", currentPlayer, info["citizenid"])
    elseif info["action"] == "ban" then       
        info["timeamt"] = info["timeamt"] * 60 * 60
        TriggerServerEvent("mri_Qadmin:server:BanPlayer", currentPlayer, info["timeamt"], info["reason"], info["citizenid"])
    elseif info["action"] == "givecash" or info["action"] == "removecash" or info["action"] == "givebank" or info["action"] == "removebank" then
        local cashAmount = tonumber(info["amount"])
        TriggerServerEvent("mri_Qadmin:server:MonetaryAction", currentPlayer, info["action"], cashAmount)
        Citizen.Wait(50)
        TriggerServerEvent("mri_Qadmin:server:RefreshMenu", true)
    elseif info["action"] == "setjob" then
        TriggerServerEvent("mri_Qadmin:server:SetJob", currentPlayer, info["jobname"], info["jobgrade"])
        Citizen.Wait(50)
        TriggerServerEvent("mri_Qadmin:server:RefreshMenu", true)
    elseif info["action"] == "giveitem" then
        TriggerServerEvent("mri_Qadmin:server:GiveItem", currentPlayer, info["itemname"], info["itemamount"])
    elseif info["action"] == "setgang" then
        TriggerServerEvent("mri_Qadmin:server:SetGang", currentPlayer, info["gangname"], info["ganggrade"])
        Citizen.Wait(50)
        TriggerServerEvent("mri_Qadmin:server:RefreshMenu", true)
    elseif info["action"] == "loadipl" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if info["ipl"] ~= "" and info["ipl"] ~= nil then
                RequestIpl(info["ipl"])
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.iplReqested"))
            end
        end, "ipl")
    elseif info["action"] == "unloadipl" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if info["ipl"] ~= "" and info["ipl"] ~= nil then
                RemoveIpl(info["ipl"])
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.unloadIPL"))
            end
        end, "ipl")
    elseif info["action"] == "setViewDistance" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                SetEntityViewDistance(info)
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.distanceChanged"))
            end
        end, "setViewDistance")
    elseif info["action"] == "copyEntityInfo" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                CopyToClipboard()
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.copied"))
            end
        end, "copyEntityInfo")
    elseif info["action"] == "freeaimMode" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                ToggleEntityFreeView()
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.freeaimTog"))
            end
        end, "freeaimMode")
    elseif info["action"] == "displayVehicles" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                ToggleEntityVehicleView()
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.dispVeh"))
            end
        end, "displayVehicles")
    elseif info["action"] == "displayPeds" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                ToggleEntityPedView()
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.dispPeds"))
            end
        end, "displayPeds")
    elseif info["action"] == "displayObjects" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                ToggleEntityObjectView()
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.success").."</strong>"..Lang:t("alerts.dispEnt"))
            end
        end, "displayObjects")
    elseif info["action"] == "vec3" then
        local Position = GetEntityCoords(PlayerPedId())
        local InVehicle = IsPedInAnyVehicle(PlayerPedId(), false)
        if InVehicle then
            Position = GetEntityCoords(GetVehiclePedIsIn(PlayerPedId(), false))
        end
        local string = "vector3("..string.format("%.2f", Position.x)..", "..string.format("%.2f", Position.y)..", "..string.format("%.2f", Position.z)..")"
        SendNUIMessage({
            action = "clipboard",
            string = string
        })
    elseif info["action"] == "vec4" then
        local Position = GetEntityCoords(PlayerPedId())
        local Heading = GetEntityHeading(PlayerPedId())
        local InVehicle = IsPedInAnyVehicle(PlayerPedId(), false)
        if InVehicle then
            Position = GetEntityCoords(GetVehiclePedIsIn(PlayerPedId(), false))
            Heading = GetEntityHeading(GetVehiclePedIsIn(PlayerPedId(), false))
        end
        local string = "vector4("..string.format("%.2f", Position.x)..", "..string.format("%.2f", Position.y)..", "..string.format("%.2f", Position.z)..", "..math.floor(Heading)..")"
        SendNUIMessage({
            action = "clipboard",
            string = string
        })
    elseif info["action"] == "heading" then
        local Heading = GetEntityHeading(PlayerPedId())
        if InVehicle then
            Heading = GetEntityHeading(GetVehiclePedIsIn(PlayerPedId(), false))
        end
        local string = "heading: "..math.floor(Heading)
        SendNUIMessage({
            action = "clipboard",
            string = string
        })
    elseif info["action"] == "setweather" then
        if info["weather"] ~= "" and info["weather"] ~= nil then
            TriggerServerEvent("mri_Qadmin:server:SetWeather", info["weather"])
        end
    elseif info["action"] == "noclip" then
        TriggerServerEvent("mri_Qadmin:server:RequestNoClip")
    elseif info["action"] == "superjump" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            AdminPanel.SuperJump = not AdminPanel.SuperJump
            if AdminPanel.SuperJump then
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.jumpOn"))
            else
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>DISABLED:</strong> "..Lang:t("alerts.jumpOff"))
            end
        end, "superjump")
    elseif info["action"] == "noragdoll" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            AdminPanel.NoRagdoll = not AdminPanel.NoRagdoll
            if AdminPanel.NoRagdoll then
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success",  "<strong>"..Lang:t("alerts.enabled").."</strong>  "..Lang:t("alerts.ragdollOn"))
            else
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger",  "<strong>"..Lang:t("alerts.disabled").."</strong>  "..Lang:t("alerts.ragdollOff"))
            end
        end, "noragdoll")
    elseif info["action"] == "infinitestam" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            AdminPanel.InfiniteStamina = not AdminPanel.InfiniteStamina
            if AdminPanel.InfiniteStamina then
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.enabled").."</strong> "..Lang:t("alerts.infStamOn"))
            else
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.disabled").."</strong> "..Lang:t("alerts.infStamOff"))
            end
        end, "infinitestam")
    elseif info["action"] == "settime" then
        TriggerServerEvent("mri_Qadmin:server:SetTime", info["time"], info["time"])
    elseif info["action"] == "reviveall" then
        TriggerServerEvent("mri_Qadmin:server:ReviveAll")
    elseif info["action"] == "messageall" then
        if info["message"] then
            if #info["message"] > 5 then
                TriggerServerEvent("mri_Qadmin:server:MessageAll", info["message"])
            else
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong> "..Lang:t("alerts.msgShort"))
            end
        else
            TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "danger", "<strong>"..Lang:t("alerts.error").."</strong> "..Lang:t("alerts.noMessage"))
        end
    elseif info["action"] == "removejob" then
        TriggerServerEvent("mri_Qadmin:server:FireJob", currentPlayer)
    elseif info["action"] == "removegang" then
        TriggerServerEvent("mri_Qadmin:server:FireGang", currentPlayer)
    elseif info["action"] == "savecar" then
        TriggerServerEvent("mri_Qadmin:server:AddVehicleToGarage", currentPlayer)
    elseif info["action"] == "massdv" then
        TriggerServerEvent("mri_Qadmin:server:DeleteAllEntities", 1) -- Vehicles
    elseif info["action"] == "massdp" then
        TriggerServerEvent("mri_Qadmin:server:DeleteAllEntities", 2) -- Peds
    elseif info["action"] == "massdo" then
        TriggerServerEvent("mri_Qadmin:server:DeleteAllEntities", 3) -- Objects
    elseif info["action"] == "clearreports" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                TriggerServerEvent("mri_Qadmin:server:ClearJSON", "reports")
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.cleared").."</strong> "..Lang:t("alerts.reports"))
            end
        end, "clearreports")
    elseif info["action"] == "clearadminchat" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                TriggerServerEvent("mri_Qadmin:server:ClearJSON", "admin")
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.cleared").."</strong> "..Lang:t("alerts.adminchat"))
            end
        end, "clearadminchat")
    elseif info["action"] == "clearlogs" then
        Compat.TriggerCallback("mri_Qadmin:server:HasPermission", function(hasPermission)
            if hasPermission then
                TriggerServerEvent("mri_Qadmin:server:ClearJSON", "logs")
                TriggerEvent("mri_Qadmin:client:ShowPanelAlert", "success", "<strong>"..Lang:t("alerts.cleared").."</strong> "..Lang:t("alerts.logs"))
            end
        end, "clearlogs")
    end
    DebugTrace("NUICallback: Action ["..info["action"].."]")
end)

RegisterNUICallback("FirePlayerFromJob", function(citizenID)
    TriggerServerEvent("mri_Qadmin:server:FireJobByCitizenId", citizenID)
    DebugTrace("NUICallback: FirePlayerFromJob ["..citizenID.."]")
end)

RegisterNUICallback("FirePlayerFromGang", function(citizenID)
    TriggerServerEvent("mri_Qadmin:server:FireGangByCitizenId", citizenID)
    DebugTrace("NUICallback: FirePlayerFromGang ["..citizenID.."]")
end)

RegisterNUICallback("SetJobGrade", function(data)
    if data["citizenid"] ~= nil and data["grade"] ~= nil then
        TriggerServerEvent("mri_Qadmin:server:SetJobGradeByCitizenId", data["citizenid"], data["grade"])
        DebugTrace("NUICallback: SetJobGrade [".. data["citizenid"]..", "..data["grade"].."]")
    else
        DebugTrace("NUICallback: SetJobGrade [nil, nil]")
    end
end)

RegisterNUICallback("SetGangGrade", function(data)
    if data["citizenid"] ~= nil and data["grade"] ~= nil then
        TriggerServerEvent("mri_Qadmin:server:SetGangGradeByCitizenId", data["citizenid"], data["grade"])
        DebugTrace("NUICallback: SetGangGrade [".. data["citizenid"]..", "..data["grade"].."]")
    else
        DebugTrace("NUICallback: SetGangGrade [nil, nil]")
    end
end)

RegisterNUICallback("UnbanPlayer", function(data)
    if data["license"] ~= nil then
        TriggerServerEvent("mri_Qadmin:server:UnbanPlayer", data["license"])
    end
end)

RegisterNUICallback("DeleteReport", function(data)
    if data["id"] ~= nil then
        TriggerServerEvent("mri_Qadmin:server:DeleteReport", data["id"])
    end
end)

RegisterNUICallback("ClaimReport", function(data)
    if data["id"] ~= nil then
        TriggerServerEvent("mri_Qadmin:server:ClaimReport", data["id"])
    end
end)

RegisterNUICallback("DeleteCharacter", function(citizenId)
    if citizenId ~= nil then
        TriggerServerEvent("mri_Qadmin:server:DeleteCharacter", citizenId)
    end
end)

RegisterNUICallback("SaveSetting", function(data)
    if data["setting"] ~= nil and data["value"] ~= nil then
        if data["setting"] == "darkmode" then
            if data["value"] == 1 then
                AdminPanel.Settings.DarkMode = true
                SetResourceKvpInt("mri_Qadmin:setting:darkmode", 1)
            else
                AdminPanel.Settings.DarkMode = false
                SetResourceKvpInt("mri_Qadmin:setting:darkmode", 0)
            end
        elseif data["setting"] == "seethrough" then
            if data["value"] == 1 then
                AdminPanel.Settings.SeeThrough = true
                SetResourceKvpInt("mri_Qadmin:setting:seethrough", 1)
            else
                AdminPanel.Settings.SeeThrough = false
                SetResourceKvpInt("mri_Qadmin:setting:seethrough", 0)
            end
        elseif data["setting"] == "Notifications" then
            if data["value"] == 1 then
                AdminPanel.Settings.Notifications = true
                SetResourceKvpInt("mri_Qadmin:setting:notifications", 1)
            else
                AdminPanel.Settings.Notifications = false
                SetResourceKvpInt("mri_Qadmin:setting:notifications", 0)
            end
        elseif data["setting"] == "theme" then
            AdminPanel.Settings.Notifications = tonumber(data["value"])
            AdminPanel.Settings.Theme = tonumber(data["value"])
            SetResourceKvpInt("mri_Qadmin:setting:theme", tonumber(data["value"]))
        end
        DebugTrace("NUICallback: SaveSetting [".. data["setting"]..", "..data["value"].."]")
    else
        DebugTrace("NUICallback: SaveSetting [nil, nil]")
    end
end)

RegisterNUICallback("Refresh", function()
    TriggerServerEvent("mri_Qadmin:server:RefreshMenu")
end)
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
function NoClip(on)
    if not on then
        local playerPed = PlayerPedId()
        local inVehicle = IsPedInAnyVehicle( playerPed, false )
        ResetEntityAlpha(PlayerPedId())

        if ( inVehicle ) then
            local veh = GetVehiclePedIsUsing( playerPed )
            SetEntityInvincible( veh, false )
        else
            ClearPedTasksImmediately( playerPed )
        end

        SetUserRadioControlEnabled( true )
        SetPlayerInvincible( PlayerId(), false )
        SetEntityInvincible( target, false )
    else
        blockinput = true
        local playerPed = PlayerPedId()
        local inVehicle = IsPedInAnyVehicle(playerPed, false)
        SetEntityAlpha(PlayerPedId(), 127, false)
        if ( not inVehicle ) then
            LoadAnimDict("mp_sleep")
            loadedAnims = true
        end
    end
end

Citizen.CreateThread( function()
    local rotationSpeed = 2.5
    local forward = 1.8

    local speeds = { 0.1, 0.2, 0.5, 1.0, 2.0, 7.0, 15.0 }

    local moveUpKey = 44      -- Q
    local moveDownKey = 46    -- E
    local moveForwardKey = 32 -- W
    local moveBackKey = 33    -- S
    local rotateLeftKey = 34  -- A
    local rotateRightKey = 35 -- D
    local changeSpeedKey = 21 -- LSHIFT

    function updateForward()
        forward = speeds[ travelSpeed ]
    end

    function handleMovement(xVect,yVect)
        if IsControlJustPressed(1, changeSpeedKey) or IsDisabledControlJustPressed(1, changeSpeedKey) then
            travelSpeed = travelSpeed + 1
            if travelSpeed > getTableLength(speeds) then
                travelSpeed = 1
            end
            updateForward();
        end

        if IsControlPressed(1, moveUpKey) or IsDisabledControlPressed(1, moveUpKey) then curLocation.z = curLocation.z + forward / 2 ;
        elseif IsControlPressed(1, moveDownKey) or IsDisabledControlPressed(1, moveDownKey) then curLocation.z = curLocation.z - forward / 2 ; end

        if IsControlPressed(1, moveForwardKey) or IsDisabledControlPressed(1, moveForwardKey) then
            curLocation.x = curLocation.x + xVect
            curLocation.y = curLocation.y + yVect
        elseif IsControlPressed(1, moveBackKey) or IsDisabledControlPressed(1, moveBackKey) then
            curLocation.x = curLocation.x - xVect
            curLocation.y = curLocation.y - yVect
        end

        if IsControlPressed(1, rotateLeftKey) or IsDisabledControlPressed(1, rotateLeftKey) then
            curHeading = curHeading + rotationSpeed
        elseif IsControlPressed(1, rotateRightKey) or IsDisabledControlPressed(1, rotateRightKey) then
            curHeading = curHeading - rotationSpeed
        end
    end

     while true do
        Citizen.Wait(3)
        if AdminPanel.NoClip then
            local playerPed = PlayerPedId()
            if IsEntityDead( playerPed ) then
                AdminPanel.NoClip = false
                Citizen.Wait( 100 )
            else
                target = playerPed
                drawTxt("~r~NO CLIP ACTIVE ~s~[SPEED: ~y~"..speeds[travelSpeed].."~s~] - ~r~"..Config.NoClipKey.."~s~ TO STOP", 4, true, 0.50, 0.92, 0.6, 255, 255, 255, 255)
                local inVehicle = IsPedInAnyVehicle(playerPed, true)
                if inVehicle then
                    target = GetVehiclePedIsUsing(playerPed)
                end
                SetEntityVelocity(playerPed, 0.0, 0.0, 0.0)
                SetEntityRotation(playerPed, 0, 0, 0, 0, false)
                SetUserRadioControlEnabled(false)
                SetPlayerInvincible(PlayerId(), true)
                SetEntityInvincible(target, true)
                if not inVehicle then
                    TaskPlayAnim(playerPed, "mp_sleep", "bind_pose_180", 8.0, 0.0, -1, 9, 0, 0, 0, 0 )
                end
                local xVect = forward * math.sin(degToRad(curHeading)) * -1.0
                local yVect = forward * math.cos(degToRad(curHeading))
                handleMovement(xVect, yVect)
                SetEntityCoordsNoOffset(target, curLocation.x, curLocation.y, curLocation.z, true, true, true)
                SetEntityHeading(target, curHeading - rotationSpeed)
            end
        else
            Citizen.Wait(100)
        end
     end
end)

Citizen.CreateThread(function() 
    while true do
        Citizen.Wait(3)
        if AdminPanel.DisplayingRadar then
            DisplayRadar(true)
        end

        if AdminPanel.InfiniteStamina then
            RestorePlayerStamina(PlayerId(), 1.0)
        end

        if AdminPanel.SuperJump then
            SetSuperJumpThisFrame(PlayerId())
        end

        SetPedCanRagdoll(PlayerPedId(), not AdminPanel.NoRagdoll)
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(5)
        if AdminPanel.Spectating then
            drawTxt("ESPECTANDO AGORA "..AdminPanel.SpectatingPlayer.." [ID: "..AdminPanel.SpectatingID.."] - ~r~BACKSPACE~s~ PARA CANCELAR", 4, true, 0.47, 0.88, 0.6, 255, 255, 255, 255)
            drawTxt("[~y~SETA ESQUERDA~s~] Ver anterior - [~y~SETA DIREITA~s~] Ver próximo", 4, true, 0.47, 0.92, 0.6, 255, 255, 255, 255)
            if IsControlJustReleased(0, 177) then
                AdminPanel.SpectatePlayer(-1, -1, "")
            end
            if IsControlJustReleased(0, 174) then
                TriggerServerEvent("mri_Qadmin:server:requestPrevSpectate")
            end
            if IsControlJustReleased(0, 175) then
                TriggerServerEvent("mri_Qadmin:server:requestNextSpectate")
            end
        end
    end
end)

AdminPanel.SpectatePlayer = function(targetPed, target, name)
	local playerPed = PlayerPedId() -- yourself
	enable = true
	if (target == PlayerId() or target == -1) then 
		enable = false
	end
	if (enable) then
		if targetPed == playerPed then
			Wait(500)
			targetPed = GetPlayerPed(target)
		end
		local targetx,targety,targetz = table.unpack(GetEntityCoords(targetPed, false))

		RequestCollisionAtCoord(targetx,targety,targetz)
		NetworkSetInSpectatorMode(true, targetPed)
        SetEntityInvincible(playerPed,true)
		SetEntityVisible(playerPed,false)
        SetEntityCollision(playerPed, false, false)
        AdminPanel.Spectating = true
	else
		if AdminPanel.SavedCoords then
			RequestCollisionAtCoord(AdminPanel.SavedCoords.x, AdminPanel.SavedCoords.y, AdminPanel.SavedCoords.z)
			Wait(500)
			SetEntityCoords(playerPed, AdminPanel.SavedCoords.x, AdminPanel.SavedCoords.y, AdminPanel.SavedCoords.z, 0, 0, 0, false)
			AdminPanel.SavedCoords = nil
		end
		NetworkSetInSpectatorMode(false, targetPed)
        SetEntityInvincible(playerPed,false)
		SetEntityVisible(playerPed,true)
        SetEntityCollision(playerPed, true, true)
        if QBCore then
		    QBCore.Functions.Notify("Stopped spectating.", "success")
        else
            ESX.ShowNotification("Stopped spectating.")
        end
        AdminPanel.Spectating = false
	end
end

Citizen.CreateThread(function()
    while true do
        if AdminPanel.DisplayingBlips then
            local Players = {}
            Compat.TriggerCallback("mri_Qadmin:server:GetPlayerPositions", function(p)
                Players = p
                for k,v in ipairs(AdminPanel.PlayerBlips) do
                    if AdminPanel.PlayerBlipsOnline[k] == nil or AdminPanel.PlayerBlipsOnline[k] == true then
                        AdminPanel.PlayerBlipsOnline[k] = false
                    end
                end
                for k, v in ipairs(Players) do
                    local playerCoords = v.pos
                    if AdminPanel.PlayerBlips[k] == nil then
                        AdminPanel.PlayerBlips[k] = AddBlipForCoord(playerCoords.x, playerCoords.y, playerCoords.z)
                        SetBlipSprite(AdminPanel.PlayerBlips[k], 1)
                        SetBlipColour(AdminPanel.PlayerBlips[k], 0)
                        SetBlipScale(AdminPanel.PlayerBlips[k], 0.75)
                        SetBlipCategory(AdminPanel.PlayerBlips[k], 7)
                        SetBlipDisplay(AdminPanel.PlayerBlips[k], 6)
                        SetBlipShrink(AdminPanel.PlayerBlips[k], true)
                        SetBlipAsShortRange(AdminPanel.PlayerBlips[k], true)
                        BeginTextCommandSetBlipName("STRING")
                        AddTextComponentString("[ "..v.id.." ] "..v.name)
                        EndTextCommandSetBlipName(AdminPanel.PlayerBlips[k])
                    else
                        SetBlipCoords(AdminPanel.PlayerBlips[k], playerCoords.x, playerCoords.y, playerCoords.z);
                    end
                    AdminPanel.PlayerBlipsOnline[k] = true
                end
                for k,v in ipairs(AdminPanel.PlayerBlips) do
                    if AdminPanel.PlayerBlipsOnline[k] == false then
                        RemoveBlip(AdminPanel.PlayerBlips[k])
                        AdminPanel.PlayerBlips[k] = nil
                        AdminPanel.PlayerBlipsOnline[k] = nil
                    end
                end
            end)
            Citizen.Wait(1000)
        else
            for k,v in ipairs(AdminPanel.PlayerBlips) do
                if DoesBlipExist(AdminPanel.PlayerBlips[k]) then
                    RemoveBlip(AdminPanel.PlayerBlips[k])
                    AdminPanel.PlayerBlips[k] = nil
                    AdminPanel.PlayerBlipsOnline[k] = nil
                end
            end
            Citizen.Wait(10000)
        end
    end
end)

function getPlayerName(id)
    local playerName = nil
    Compat.TriggerCallback("mri_Qadmin:GetPlayerName", function(name)
        playerName = name
    end, id)
    while playerName == nil do
        Wait(10)
    end
    return playerName
end

function toggleNames()
    CreateThread(function()
        while true do
            for _, player in pairs(GetPlayersFromCoords(GetEntityCoords(PlayerPedId()), 1000.0)) do
                local PlayerId = GetPlayerServerId(player)
                local PlayerPed = GetPlayerPed(player)
                local PlayerName = "ID: "..PlayerId.." | "..getPlayerName(PlayerId).." ("..GetPlayerName(player)..")"
                local Tag = CreateFakeMpGamerTag(PlayerPed, PlayerName, false, false, "", false)
                SetMpGamerTagAlpha(Tag, 0, 255) -- Sets "MP_TAG_GAMER_NAME" bar alpha to 100% (not needed just as a fail safe)
                SetMpGamerTagAlpha(Tag, 2, 255) -- Sets "MP_TAG_HEALTH_ARMOUR" bar alpha to 100%
                SetMpGamerTagAlpha(Tag, 4, 255) -- Sets "MP_TAG_AUDIO_ICON" bar alpha to 100%
                SetMpGamerTagAlpha(Tag, 6, 255) -- Sets "MP_TAG_PASSIVE_MODE" bar alpha to 100%
                SetMpGamerTagHealthBarColour(Tag, 25)  --https://wiki.rage.mp/index.php?title=Fonts_and_Colors

                if ShowNames then
                    SetMpGamerTagVisibility(Tag, 0, true) -- Activates the player ID Char name and FiveM name
                    SetMpGamerTagVisibility(Tag, 2, true) -- Activates the health (and armor if they have it on) bar below the player names
                    if NetworkIsPlayerTalking(playeridx) then
                        SetMpGamerTagVisibility(Tag, 4, true) -- If player is talking a voice icon will show up on the left side of the name
                    else
                        SetMpGamerTagVisibility(Tag, 4, false)
                    end
                    if GetPlayerInvincible(playeridx) then
                        SetMpGamerTagVisibility(Tag, 6, true) -- If player is in godmode a circle with a line through it will show up
                    else
                        SetMpGamerTagVisibility(Tag, 6, false)
                    end
                else
                    Tag = CreateFakeMpGamerTag(PlayerPed, PlayerName, false, false, "", false)
                    SetMpGamerTagVisibility(Tag, 0, false)
                    SetMpGamerTagVisibility(Tag, 2, false)
                    SetMpGamerTagVisibility(Tag, 4, false)
                    SetMpGamerTagVisibility(Tag, 6, false)
                    RemoveMpGamerTag(Tag) -- Unloads the tags till you activate it again
                end
            end
            Wait(5000)
        end
    end)
end

RegisterNetEvent("mri_Qadmin:client:ExecuteCommand",function(command,args)

    ExecuteCommand(command.." "..args)

end)