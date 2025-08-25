GlobalState["NewItems"] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        local NewItems = GetControlFile("items")
        GlobalState['NewItems'] = NewItems
        for k,v in pairs(NewItems) do
            exports['ox_inventory']:createItem({
                name = k,
                label = v.name,
                weight = v.weight * 1000,
                description = v.description,
                close = true,
                client = {
                    image = v.index..".png"
                }
            })
        end
        TriggerEvent("ox_inventory:reloadItems")
    end
end)

RegisterCommand(Config.Commands["items"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["items"]['perm']) then
        TriggerClientEvent("AdminControl:openNewItems",source)
    end
end)

local function createNewItem(data,edit)
    local NewItems = GetControlFile("items")
    NewItems[data.item] = {
        name = data.name,
        index = data.index,
        type = data.type,
        description = data.description,
        weight = data.weight,
    }
    GlobalState:set("NewItems",NewItems,true)
    exports['ox_inventory']:createItem({
        name = data.item,
        label = data.name,
        weight = data.weight * 1000,
        description = data.description,
        close = true,
        client = {
            image = data.index..".png"
        }
    })
    ExecuteCommand("reloadconfig")
    TriggerEvent("ox_inventory:reloadItems")
    if edit then
        EditControlFile("items",data.item,NewItems[data.item])
    else
        SaveControlFile("items",data.item,NewItems[data.item])
    end
end

RegisterNetEvent("AdminControl:createNewItem")
AddEventHandler("AdminControl:createNewItem",function (data)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["items"]['perm']) then
        createNewItem(data)
        TriggerClientEvent("Notify",source,"sucesso","Item adicionado com sucesso!",5000)
    end
end)

RegisterNetEvent("AdminControl:editNewItem")
AddEventHandler("AdminControl:editNewItem",function (data)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["items"]['perm']) then
        createNewItem(data,true)
        TriggerClientEvent("Notify",source,"sucesso","Item editado com sucesso!",5000)
    end
end)

RegisterNetEvent("AdminControl:deleteNewItem")
AddEventHandler("AdminControl:deleteNewItem",function (item)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["items"]['perm']) then
        local NewItems = GetControlFile("items")
        NewItems[item] = nil
        RemoveControlFile("items",item)
        GlobalState:set("NewItems",NewItems,true)
        exports['ox_inventory']:deleteItem(item)
        ExecuteCommand("reloadconfig")
        TriggerClientEvent("Notify",source,"sucesso","Item removido com sucesso!",5000)
    end
end)