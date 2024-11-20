GlobalState['SafeZones'] = {}

RegisterCommand(Config.Commands["safezones"]['command'],function(source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["safezones"]['perm']) then
        ClientControl.showSafes(source)
    end
end)

function Server.registerSafezone(data)
    local source = source
    if data.name then
        local SafeZones = GlobalState['SafeZones']
        local id = #SafeZones + 1
        data.id = "Safezone-"..id
        SafeZones[id] = data
        GlobalState:set("SafeZones",SafeZones,true)
        SaveControlFile("safezones",id,data)
        TriggerClientEvent("Notify",source,"sucesso","SafeZone registrado com sucesso!",5000)
    end
end

function Server.deleteSafezone(index)
    local source = source
    local SafeZones = GlobalState['SafeZones']
    if SafeZones[index] then
        RemoveControlFile("safezones",index)
        table.remove(SafeZones,index)
        GlobalState:set("SafeZones",SafeZones,true)
        TriggerClientEvent("Notify",source,"sucesso","SafeZone removido com sucesso!",5000)
    end
end

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        local SafeZones = GetControlFile("safezones")
        GlobalState['SafeZones'] = SafeZones
    end
end)
