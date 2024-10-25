local Tunnel = module("vrp", "lib/Tunnel")
local Proxy = module("vrp", "lib/Proxy")
vRP = Proxy.getInterface("vRP")

vRPShud = {}
Tunnel.bindInterface("hud",vRPShud)
Proxy.addInterface("hud",vRPShud)
local iniciated = false

function ExecuteSql(query)
    local IsBusy = true
    local result = nil
    if Config.Mysql == "oxmysql" then
        if MySQL == nil then
            exports.oxmysql:execute(query, function(data)
                result = data
                IsBusy = false
            end)
        else
            MySQL.query(query, {}, function(data)
                result = data
                IsBusy = false
            end)
        end
    elseif Config.Mysql == "ghmattimysql" then
        exports.ghmattimysql:execute(query, {}, function(data)
            result = data
            IsBusy = false
        end)
    elseif Config.Mysql == "mysql-async" then   
        MySQL.Async.fetchAll(query, {}, function(data)
            result = data
            IsBusy = false
        end)
    end
    while IsBusy do
        Citizen.Wait(0)
    end
    return result
end

AddEventHandler("onResourceStart", function(rs)  
    if rs == "hud" then
        Citizen.Wait(1000)
        ExecuteSql([[
            CREATE TABLE IF NOT EXISTS `hud-data` (
            `identifier` varchar(65) DEFAULT NULL,
            `data` longtext DEFAULT NULL,
            `stress` int(11) DEFAULT NULL,
            UNIQUE KEY `identifier` (`identifier`) USING HASH
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        ]])
        local data = ExecuteSql("SELECT * FROM `hud-data`")
        local newPreferences = {}
        for k,v in pairs(data) do
            newPreferences[tonumber(v.identifier)] = json.decode(v.data)
        end
        local newStress = {}
        for _,v in pairs(data) do
            newStress[v.identifier] = v.stress
        end
        stressData = newStress
        preferences = newPreferences
        -- iniciated = true
        for _, playerId in ipairs(GetPlayers()) do
            if playerId ~= nil then
                local identifier = vRP.getUserId(tonumber(playerId))
                if identifier then
                    CheckPreferencesExist(identifier)
                    if Config.UseStress then
                        if stressData[identifier] == nil then
                            stressData[identifier] = 0
                        end
                        TriggerClientEvent('hud:client:UpdateStress', tonumber(playerId), stressData[identifier])
                    end
                    TriggerClientEvent('hud:client:UpdateSettings', tonumber(playerId),  preferences[identifier])
                    TriggerClientEvent('hudActived', tonumber(playerId), true)
                    TriggerClientEvent("hud:setClientUserId",tonumber(playerId),identifier)

                end
            end
        end
    end
end)

AddEventHandler("vRP:playerSpawn",function(user_id,source,first_spawn)
    Wait(1000)
    CheckPreferencesExist(user_id)
    TriggerClientEvent('hud:client:UpdateSettings', source, preferences[user_id])
    if Config.UseStress then
        if stressData[user_id] == nil then
            stressData[user_id] = 0
        end
        TriggerClientEvent('hud:client:UpdateStress', source, stressData[user_id])
    end
    TriggerClientEvent("hud:setClientUserId",source,user_id)
    TriggerClientEvent('hudActived', source, true)
end)

RegisterCommand("hudax",function(source)
    local user_id = vRP.getUserId(source)
    CheckPreferencesExist(user_id)
    TriggerClientEvent('hud:client:UpdateSettings', source, preferences[user_id])
    if Config.UseStress then
        if stressData[user_id] == nil then
            stressData[user_id] = 0
        end
        TriggerClientEvent('hud:client:UpdateStress', source, stressData[user_id])
    end
    TriggerClientEvent("hud:setClientUserId",source,user_id)
    TriggerClientEvent('hudActived', source, true)
end)

preferences = {}

RegisterServerEvent('hud:RemoveItem')
AddEventHandler('hud:RemoveItem', function(item, amount)
    local src = source
    local user_id = vRP.getUserId(src)
    if user_id then
        vRP.tryGetInventoryItem(user_id,item,amount,true)
    end
end)

function CheckPreferencesExist(identifier)
    if preferences[identifier] == nil then
        preferences[identifier] = {
            hud = Config.DefaultHud,
            hide = false,
            speedtype = Config.DefaultSpeedUnit,
            maptype = Config.DefaultMap,
            showCompass = true,
            speedometerSize = Config.DefaultSpeedometerSize,
            refreshRate = Config.DefaultRefreshRate,
            showHideBox = false,
            hudSize = Config.DefaultHudSize,
            hudColors = Config.DefaultHudColors,
            positionsData = {
            },
            hideBoxData = {
                health= 100,
                armor= 100,
                water =  100,
                stress= 100,
                hunger= 100,
                stamina= 100,
            },
        }
        ExecuteSql("INSERT INTO `hud-data` (`data`, `identifier`, `stress`) VALUES ('"..json.encode(preferences[identifier]).."', '"..identifier.."', '0')")
        stressData[identifier] = 0
    else
        local updated = false
        local data = preferences[identifier]
        if data.hud == nil then
            data.hud = Config.DefaultHud
            updated = true
        end
        if data.hudColors == nil then
            data.hudColors = Config.DefaultHudColors
            updated = true

        end
        if data.positionsData == nil then
            data.positionsData = {}
            updated = true

        end
        if data.hideBoxData == nil then
            data.hideBoxData = {
                health= 100,
                armor= 100,
                water =  100,
                stress= 100,
                hunger= 100,
                stamina= 100,
            }
            updated = true

        else
            if data.hideBoxData.health == nil then
                data.hideBoxData.health = 100
                updated = true

            end
            if data.hideBoxData.armor == nil then
                data.hideBoxData.armor = 100
                updated = true

            end
            if data.hideBoxData.water == nil then
                data.hideBoxData.water = 100
                updated = true

            end
            if data.hideBoxData.stress == nil then
                data.hideBoxData.stress = 100
                updated = true

            end
            if data.hideBoxData.hunger == nil then
                data.hideBoxData.hunger = 100
                updated = true

            end
            if data.hideBoxData.stamina == nil then
                data.hideBoxData.stamina = 100
                updated = true

            end
        end
        if data.showHideBox == nil then
            data.showHideBox = false
            updated = true

        end
        if data.hide == nil then
            data.hide = false
            updated = true

        end
        if data.refreshRate == nil then
            data.refreshRate = Config.DefaultRefreshRate
            updated = true

        end
        if data.speedtype == nil then
            data.speedtype = Config.DefaultSpeedUnit
            updated = true

        end
        if data.maptype == nil then
            data.maptype = Config.DefaultMap
            updated = true

        end
        if data.showCompass == nil then
            data.showCompass = true
            updated = true

        end
        if data.speedometerSize == nil then
            data.speedometerSize = Config.DefaultSpeedometerSize
            updated = true

        end
        if data.hudSize == nil then
            data.hudSize = Config.DefaultHudSize
            updated = true

        end
        if updated then
            ExecuteSql("UPDATE `hud-data` SET data = '"..json.encode(data).."' WHERE identifier = '"..identifier.."'")
        end
    end
end

RegisterServerEvent('seatbelt:server:PlaySound')
AddEventHandler('seatbelt:server:PlaySound', function(action, table)
      for i=1, #table do
        if table[i] then
            TriggerClientEvent('seatbelt:client:PlaySound', table[i], action, 0.15)
        end
    end 
end)

function GetIdentifier(source)
    return vRP.getUserId(source)
end

RegisterNetEvent('hud:UpdateData')
AddEventHandler("hud:UpdateData", function(settingstype, val)
    local src = source
    local identifier = GetIdentifier(src)
    CheckPreferencesExist(identifier)
    if preferences[identifier][settingstype] ~= nil then
        if settingstype == 'hudColors' then
            if preferences[identifier].hudColors[preferences[identifier].hud] and preferences[identifier].hudColors[preferences[identifier].hud][val.type] then
                preferences[identifier].hudColors[preferences[identifier].hud][val.type] = val.color
            end
        else
            preferences[identifier][settingstype] = val
        end
        TriggerClientEvent('hud:client:UpdateSettings', src, preferences[identifier])
        ExecuteSql("UPDATE `hud-data` SET data = '"..json.encode(preferences[identifier]).."' WHERE identifier = '"..identifier.."'")
    end
end)

RegisterServerEvent('hud:server:EjectPlayer')
AddEventHandler('hud:server:EjectPlayer', function(table, velocity)
   for i=1, #table do
        if table[i] then
            TriggerClientEvent("hud:client:EjectPlayer", table[i], velocity)
        end
    end
end)

