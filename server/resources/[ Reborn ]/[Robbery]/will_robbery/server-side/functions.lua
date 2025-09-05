------------------------------------
-- FRAMEWORK FUNCTIONS
------------------------------------
ESX = nil
vRP = nil
QBCore = nil

if Config.framework == "qb" then
    QBCore = exports['qb-core']:GetCoreObject()
elseif Config.framework == "esx" then
    ESX = exports['es_extended']:getSharedObject()
elseif Config.framework == "vrp" then
    Proxy = module("vrp", "lib/Proxy") or {}
    Tunnel = module("vrp", "lib/Tunnel") or {}
    vRP = Proxy.getInterface("vRP")
end

---@param source number
---@return string | number | nil
function GetIdentifier(source)
    if Config.framework == "qbcore" and QBCore then
        local Player = QBCore.Functions.GetPlayer(source)
        if Player then
            return Player.PlayerData.citizenid
        end
    elseif Config.framework == "esx" and ESX then
        local xPlayer = ESX.GetPlayerFromId(source)
        if xPlayer then
            return xPlayer.identifier
        end
    elseif Config.framework == "vrp" and vRP then
        local user_id = vRP.getUserId(source)
        if not user_id then
            user_id = vRP.Passport(source)
        end
        return user_id
    else
        return source
    end
end

---@param identifier string | number
---@return string | number | nil
function GetSource(identifier)
    if Config.framework == "qbcore" and QBCore then
        local Player = QBCore.Functions.GetPlayerByCitizenId(identifier)
        if Player then
            return Player.PlayerData.source
        end
    elseif Config.framework == "esx" and ESX then
        local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
        if xPlayer then
            return xPlayer.source
        end
    elseif Config.framework == "vrp" and vRP then
        return vRP.getUserSource(identifier)
    end
    return identifier
end

---@param src number
---@param item string
---@param amount number
function GiveItem(src, item, amount)
    if Config.framework == "qbcore" and QBCore then
        local Player = QBCore.Functions.GetPlayer(src)
        if Player then
            Player.Functions.AddItem(item, amount)
        end
    elseif Config.framework == "esx" and ESX then
        local xPlayer = ESX.GetPlayerFromId(src)
        if xPlayer then
            xPlayer.addInventoryItem(item, amount)
        end
    elseif Config.framework == "vrp" and vRP then
        vRP.giveInventoryItem(GetIdentifier(src),item,amount,true)
    end
end

---@param src number
---@param item string
---@param amount number
---@return boolean
function TakeItem(src, item, amount)
    if Config.framework == "qbcore" and QBCore then
        local Player = QBCore.Functions.GetPlayer(src)
        if Player then
            return Player.Functions.RemoveItem(item, amount)
        end
    elseif Config.framework == "esx" and ESX then
        local xPlayer = ESX.GetPlayerFromId(src)
        if xPlayer then
            return xPlayer.removeInventoryItem(item, amount)
        end
    elseif Config.framework == "vrp" and vRP then
        return vRP.tryGetInventoryItem(GetIdentifier(src),item,amount)
    end
    return false
end

---@param src number
---@param item string
---@return number
function CheckItem(src, item)
    if Config.framework == "qbcore" and QBCore then
        local Player = QBCore.Functions.GetPlayer(src)
        if Player then
            return Player.Functions.GetItemByName(item) and Player.Functions.GetItemByName(item).amount or 0
        end
    elseif Config.framework == "esx" and ESX then
        local xPlayer = ESX.GetPlayerFromId(src)
        if xPlayer then
            local InvItem = xPlayer.getInventoryItem(item)
            if InvItem then
                return InvItem.count
            end
        end
    elseif Config.framework == "vrp" and vRP then
        return vRP.getInventoryItemAmount(GetIdentifier(src),item)
    end
    return 0
end

---@return table
function GetPolice()
    if Config.framework == "qbcore" and QBCore then
        local players = {}
        for _, xPlayer in pairs(QBCore.Functions.GetQBPlayers()) do
            if xPlayer.PlayerData.job.name == "police" and xPlayer.PlayerData.job.onduty then
                players[#players + 1] = xPlayer.PlayerData.source
            end
        end
        return players
    elseif Config.framework == "esx" and ESX then
        local players = {}
        for _, xPlayer in pairs(ESX.GetExtendedPlayers()) do
            if xPlayer.job.name == "police" then
                players[#players + 1] = xPlayer.source
            end
        end
        return players
    elseif Config.framework == "vrp" and vRP then
        return vRP.getUsersByPermission("policia.permissao")
    end
    return {}
end

callback.register("will_robbery:callPolice",function (source, coords,robbery)
    if Config.robberys[robbery] then
        local copAmount = GetPolice()
        for k,v in pairs(copAmount) do
            local player = vRP.getUserSource(v)
            if player then
                TriggerClientEvent("NotifyPush",player,{
                    time = os.date("%H:%M:%S - %d/%m/%Y"),
                    text = "Me ajuda esta tendo um "..Config.robberys[robbery]['name'].." aqui neste bairro!",
                    code = 31,
                    title = Config.robberys[robbery]['name'],
                    x = coords.x,
                    y = coords.y,
                    z = coords.z,
                    rgba = {170,80,25}
                })
            end
        end
    end
end)

---@param src number
---@param robbery string
---@return boolean
function CheckInitRobbery(src, robbery)
    return true
end

---@param src number
---@param msg string
function Notify(src, msg)
    if Config.notifications[msg] then
        if type(Config.notifications[msg]) == "table" then
            TriggerClientEvent("Notify",src,Config.notifications[msg].type,Config.notifications[msg].message,5000)
        else
            TriggerClientEvent("Notify",src,"importante",Config.notifications[msg],5000)
        end
    else
        TriggerClientEvent("Notify",src,"importante",msg,5000)
    end
end

function SendWebhook(title, description, fields)
    PerformHttpRequest(
        Config.webhook,
        function(err, text, headers)
        end,
        "POST",
        json.encode(
            {
                embeds = {
                    {
                        title = title,
                        description = description,
                        author = {
                            name = "",
                            icon_url = ''
                        },
                        fields = fields,
                        footer = {
                            text = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
                            icon_url = "",
                        },
                        color = 16776960
                    }
                }
            }
        ),
        {["Content-Type"] = "application/json"}
    )
end

RegisterCommand('pdbetta', function(source, args)
    local src = source
    if src then
        TriggerClientEvent('bettaheist:client:sync', -1, 'resetHeist')
    end
end, false)

RegisterNetEvent('jewellery_heist:server:toggleDoors', function(value)
    local _source = source
    local localConfig = Config.robberys['Jewelry']
    if localConfig.DoorLock == 'qb' then
        TriggerClientEvent('qb-doorlock:client:setState', -1, _source, localConfig.Locations.doors[1], value, _source, false, false)
    elseif localConfig.DoorLock == 'ox' then
        local door = exports['ox_doorlock']:getDoorFromName("Joalheria")

        if not door then return end

        exports['ox_doorlock']:setDoorState(door.id, value)
    elseif localConfig.DoorLock == 'cd' then
        TriggerClientEvent('cd_doorlock:SetDoorState_name', -1, value, localConfig.Locations.doors[1], 'jewellery_store')
    end
end)
