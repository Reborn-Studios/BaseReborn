GlobalState['Houses'] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == 'will_homes' or resourceName == GetCurrentResourceName() then
        if GetResourceState("will_homes") == "missing" then return end
        local Houses = GetControlFile("houses")
        local ConvertedHouses = {}
        for k,v in pairs(Houses) do
            ConvertedHouses[k] = v
            ConvertedHouses[k].coords.house_out = vector3(v.coords.house_out.x,v.coords.house_out.y,v.coords.house_out.z)
            ConvertedHouses[k].coords.house_in = vector3(v.coords.house_in.x,v.coords.house_in.y,v.coords.house_in.z)
            ConvertedHouses[k].coords.chest = vector3(v.coords.chest.x,v.coords.chest.y,v.coords.chest.z)
            if v.coords.manage then
                ConvertedHouses[k].coords.manage = vector3(v.coords.manage.x,v.coords.manage.y,v.coords.manage.z)
            end
        end
        GlobalState['Houses'] = Houses
    end
end)

RegisterCommand(Config.Commands["houses"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["houses"]['perm']) then
        if GetResourceState("will_homes") == "started" then
            TriggerClientEvent("AdminControl:openHouses",source)
        else
            TriggerClientEvent("Notify",source,"negado","will_homes não iniciado",5000)
        end
    end
end)

function Server.createHouse(House)
    local source = source
    if House.name then
        local Houses = GlobalState['Houses']
        for k,v in pairs(Houses) do
            if v.name == House.name then
                TriggerClientEvent("Notify",source,"negado","Nome de casa já existe!",5000)
                return
            end
        end
        local id = #Houses + 1
        Houses[id] = House
        GlobalState:set("Houses",Houses,true)
        SaveControlFile("houses",id,House)
        TriggerClientEvent("Notify",source,"sucesso","Casa registrada com sucesso!",5000)
    end
end

function Server.deleteHouse(id)
    local source = source
    local Houses = GlobalState['Houses']
    if Houses[id] then
        Houses[id] = nil
        GlobalState:set("Houses",Houses,true)
        RemoveControlFile("houses",id)
        TriggerClientEvent("Notify",source,"sucesso","Casa deletada com sucesso!",5000)
    end
end
