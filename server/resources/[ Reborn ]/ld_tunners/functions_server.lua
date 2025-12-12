Citizen.CreateThread(function()

    MySQL.Async.execute([[
        CREATE TABLE IF NOT EXISTS `ld_tunners` (
        `car` text DEFAULT NULL,
        `plate` text DEFAULT NULL,
        `data` longtext DEFAULT '[]'
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ]])

    GetUserSource = function(user_id)
        return vRP.getUserSource(user_id)
    end

    GetUserId = function(source)
        return vRP.getUserId(source)
    end

    GetPlayerName = function(source)
        local user_id = GetUserId(source)
        if user_id then
            return vRP.getUserIdentity(user_id).name.." "..vRP.getUserIdentity(user_id).firstname
        end
    end

    GetMoney = function(source, type)
        local user_id = GetUserId(source)
        if type == "card" then
            return vRP.getBankMoney(user_id)
        else
            return vRP.getInventoryItemAmount(user_id, "dollars")
        end
    end

    RemoveMoney = function(source, amount, type)
        local user_id = GetUserId(source)
        if type == "card" then
            vRP.tryPayment(user_id, amount)
        else
            vRP.tryGetInventoryItem(user_id, "dollars", amount)
        end
    end

    GiveMoney = function(source, amount, type)
        local user_id = GetUserId(source)
        if type == "card" then
            vRP.giveBank(user_id, amount)
        else
            vRP.giveInventoryItem(user_id, "dollars", amount)
        end
    end

    RemoveItem = function(source,item)
        local user_id = GetUserId(source)
        return vRP.tryGetInventoryItem(user_id, item, 1)
    end

    HasPermission = function(source, permission)
        local user_id = GetUserId(source)
        return vRP.hasPermission(user_id, permission)
    end

    Notification = function(source, message)
        TriggerClientEvent("Notify",source,"importante",message)
    end

    GetUserByPlate = function(plate)
        return vRP.getVehiclePlate(plate)
    end

    GenerateItemOrder = function(source, serial_name)
        if GetResourceState("ox_inventory") == "started" then
            exports.ox_inventory:AddItem(source, "tunning_order", 1, {
                serial = serial_name, 
                description = "Ordem de serviço para aplicação de tunagem"
            })
        else
            local generateFunc = (vRP.GenerateItem and vRP.GenerateItem) or (vRP.generateItem and vRP.generateItem) or nil
            if generateFunc ~= nil then generateFunc(GetUserId(source), "tunning_order-" .. serial_name, 1, true, false) end
        end
    end

    RegisterServerEvent("ld_tunners:saveVehicle")
    AddEventHandler("ld_tunners:saveVehicle", function(mods, plate, car)
        local user_id = GetUserByPlate(plate)
        if user_id then
            
            MySQL.Async.execute("REPLACE INTO vrp_srv_data(dkey,dvalue) VALUES(@dkey,@dvalue)", {
                ["@dkey"] = "mods:" .. plate,
                ["@dvalue"] = json.encode(mods),
            })
            
            local cacheKey = plate
            if vehicleModsCache[cacheKey] then
                vehicleModsCache[cacheKey] = nil
            end
        end
    end)

    RegisterServerEvent("ld_tunners:server:syncMods")
    AddEventHandler("ld_tunners:server:syncMods", function(plate, car_name, entity)
        local user_id = GetUserByPlate(plate)
        if user_id then
            local source = GetUserSource(user_id)
            if source then
                local cacheKey = plate
                if vehicleModsCache[cacheKey] then
                    TriggerClientEvent("ld_tunners:client:applyMods", source, entity, vehicleModsCache[cacheKey])
                else
                    MySQL.Async.fetchAll("SELECT * FROM vrp_srv_data WHERE dkey = @key", {
                        ["@key"] = "mods:" .. plate
                    }, function(result)
                        if #result > 0 then
                            local mods = json.decode(result[1].dvalue)
                            vehicleModsCache[cacheKey] = mods
                            TriggerClientEvent("ld_tunners:client:applyMods", source, entity, mods)
                        end
                    end)
                end
            end
        end
    end)
end)

