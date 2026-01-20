local framework = GetResourceState('qb-core') == 'started' and 'QBCore' or 'None'

CreateThread(function ()
    if framework == 'None' then
        StopResource(GetCurrentResourceName())
        return
    end

    if framework == 'ESX' then
        ESX = exports['es_extended']:getSharedObject()
    elseif framework == 'QBCore' then
        QBCore = exports['qb-core']:GetCoreObject()
    end
end)

function fetchUserBySource(source)
    if framework == 'ESX' then
        local playerData = ESX.GetPlayerFromId(source)
        return playerData
    elseif framework == 'QBCore' then
        local playerData = QBCore.Functions.GetPlayer(source)
        return playerData
    end
end

function fetchUsersUUID(source)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.identifier
    elseif framework == 'QBCore' then
        return playerData.PlayerData.citizenid
    end
end

function fetchUserSourceById(id)
    if framework == 'ESX' then
        local playerData = ESX.GetPlayerFromIdentifier(id)
        return playerData.source
    elseif framework == 'QBCore' then
        local playerData = QBCore.Functions.GetPlayerByCitizenId(id)
        return playerData and playerData.source
    end
end

function fetchUserNameBySource(source)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.getName()
    elseif framework == 'QBCore' then
        return playerData.PlayerData.charinfo.firstname .. ' ' .. playerData.PlayerData.charinfo.lastname
    end
end

function getUserPrimaryAccount(source)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.getAccount('bank').money
    elseif framework == 'QBCore' then
        return playerData.PlayerData.money.bank
    end
end

function getUserCashAmount(source)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.getMoney()
    elseif framework == 'QBCore' then
        return playerData.Functions.GetMoney("cash")
    end
end

function removeAcountMoney(source, amount)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.removeAccountMoney('bank', amount)
    elseif framework == 'QBCore' then
        return playerData.Functions.RemoveMoney('bank', amount)
    end
end

function addAccountMoney(source, amount)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.addAccountMoney('bank', amount)
    elseif framework == 'QBCore' then
        return playerData.Functions.AddMoney('bank', amount)
    end
end

function removeCashAmount(source, amount)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.removeMoney(amount)
    elseif framework == 'QBCore' then
        return playerData.Functions.RemoveMoney('cash', amount)
    end
end

function addCashAmount(source, amount)
    local playerData = fetchUserBySource(source)
    if not playerData then return end

    if framework == 'ESX' then
        return playerData.addMoney(amount)
    elseif framework == 'QBCore' then
        return playerData.Functions.AddMoney('cash', amount)
    end
end