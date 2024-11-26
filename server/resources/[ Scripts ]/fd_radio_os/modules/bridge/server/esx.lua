if string.lower(Config.Framework) == 'esx' then
    core = nil

    local success, _ = pcall(function()
        return exports['es_extended']['getSharedObject']
    end)

    if not success then
        while core == nil do
            TriggerEvent('esx:getSharedObject', function(obj) core = obj end)
            Citizen.Wait(0)
        end
    else
        core = exports['es_extended']:getSharedObject()
    end

    if Config.UseItem then
        core.RegisterUsableItem(Config.UseItemName, function(source)
            TriggerClientEvent('fd_radio:use', source)
        end)
    end

    if Config.AllowJammers and Config.UseJammerItem and Config.JammerItemName then
        core.RegisterUsableItem(Config.JammerItemName, function(source)
            TriggerClientEvent('fd_radio:usedJammer', source)
        end)
    end

    function bridge.applyPmaChannelCheck()
        for channel, config in pairs(Config.WhitelistedAccess) do
            exports['pma-voice']:addChannelCheck(channel, function(source)
                local Player = core.GetPlayerFromId(source)

                if config[Player.job.name] then
                    return true
                end

                return false
            end)
        end
    end

    function bridge.notify(src, message, type)
        TriggerClientEvent('esx:showNotification', src, message)
    end

    function bridge.addItem(source, item, amount)
        local Player = core.GetPlayerFromId(source)

        if Player ~= nil and Player.canCarryItem(item, amount or 1) then
            Player.addInventoryItem(item, amount)
        end
    end

    function bridge.removeItem(source, item, amount)
        local Player = core.GetPlayerFromId(source)

        if Player ~= nil then
            Player.removeInventoryItem(item, amount)
        end
    end

    Citizen.CreateThread(function()
        callback.register('fd_radio:hasItem', function(source, item, amount)
            local Player = core.GetPlayerFromId(source)

            if Player ~= nil then

                local item = Player.getInventoryItem(item)

                if item ~= nil and item.count >= amount then
                    return true
                end

                return false
            end

            return false
        end)
    end)
end
