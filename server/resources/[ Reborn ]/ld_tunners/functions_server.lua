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

    local vehicleModsCache = {}

    RegisterServerEvent("ld_tunners:saveVehicle")
    AddEventHandler("ld_tunners:saveVehicle", function(mods, plate, car)
        local user_id = GetUserByPlate(plate)
        if user_id then
            vehicleModsCache[plate] = mods
            MySQL.Async.execute("REPLACE INTO vrp_srv_data(dkey,dvalue) VALUES(@dkey,@dvalue)", {
                ["@dkey"] = "mods:"..plate,
                ["@dvalue"] = json.encode(mods),
            })
        end
    end)

    RegisterServerEvent("ld_tunners:server:syncMods")
    AddEventHandler("ld_tunners:server:syncMods", function(plate, car_name, entity)
        local user_id = GetUserByPlate(plate)
        if user_id then
            local source = GetUserSource(user_id)
            if source then
                if vehicleModsCache[plate] then
                    TriggerClientEvent("ld_tunners:client:applyMods", source, entity, vehicleModsCache[plate])
                else
                    MySQL.Async.fetchAll("SELECT * FROM vrp_srv_data WHERE dkey = @key", {
                        ["@key"] = "mods:"..plate
                    }, function(result)
                        if #result > 0 then
                            local mods = json.decode(result[1].dvalue)
                            vehicleModsCache[plate] = mods
                            TriggerClientEvent("ld_tunners:client:applyMods", source, entity, mods)
                        end
                    end)
                end
            end
        end
    end)

    RegisterServerEvent("ld_tunners:applyMods")
    AddEventHandler("ld_tunners:applyMods",function(car_ent,tunning)
        if car_ent then
            TriggerClientEvent("ld_tunners:client:applyMods",source,car_ent,tunning)
        end
    end)
end)

