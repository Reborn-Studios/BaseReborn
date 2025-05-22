GlobalState['AllShops'] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == 'ox_inventory' or resourceName == GetCurrentResourceName() then
        if GetResourceState("ox_inventory") == "missing" then return end
        local Shops = GetControlFile("shops")
        for Index,Shop in pairs(Shops) do
            local items = {}
            for item,price in pairs(Shop.items) do
                table.insert(items,{name = item, price = price})
            end
            exports.ox_inventory:RegisterShop(Shop.name,{
                name = Shop.name,
                inventory = items,
                locations = Shop.locations,
                groups = next(Shop.group) and Shop.group or nil,
            })
        end
        GlobalState['AllShops'] = Shops
    end
end)

RegisterCommand(Config.Commands["shops"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["shops"]['perm']) then
        if GetResourceState("ox_inventory") == "started" then
            TriggerClientEvent("AdminControl:openShops",source)
        else
            TriggerClientEvent("Notify",source,"negado","Ox inventory não iniciado",5000)
        end
    end
end)

function Server.registerShop(id, Shop)
    local source = source
    if Shop.name and Shop.items and next(Shop.items) then
        local Shops = GlobalState['AllShops']
        local items = {}
        for item,price in pairs(Shop.items) do
            table.insert(items,{name = item, price = price})
        end
        exports.ox_inventory:RegisterShop(Shop.name,{
            name = Shop.name,
            inventory = items,
            locations = Shop.locations,
            groups = next(Shop.group) and Shop.group or nil,
        })
        local edited = false
        if Shops[id] then
            edited = true
        end
        Shops[id] = Shop
        GlobalState:set("AllShops",Shops,true)
        if edited then
            TriggerClientEvent("Notify",source,"sucesso","Loja editada com sucesso!",5000)
            EditControlFile("shops",id,Shop)
        else
            TriggerClientEvent("Notify",source,"sucesso","Loja registrada com sucesso!",5000)
            SaveControlFile("shops",id,Shop)
        end
    end
end

function Server.deleteShop(id)
    local source = source
    local Shops = GlobalState['AllShops']
    if Shops[id] then
        Shops[id] = nil
        GlobalState:set("AllShops",Shops,true)
        TriggerClientEvent("Notify",source,"sucesso","Loja deletada com sucesso!",5000)
        RemoveControlFile("shops",id)
    end
end