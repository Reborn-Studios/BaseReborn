GlobalState['TattoosShops'] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == 'tattoo' or resourceName == GetCurrentResourceName() then
        local TattoosShops = GetControlFile("tattoos")
        GlobalState['TattoosShops'] = TattoosShops
    end
end)

RegisterCommand(Config.Commands["tattooshop"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["tattooshop"]['perm']) then
        TriggerClientEvent("AdminControl:openTattoosShop",source)
    end
end)

function Server.registerTattooShop(TattooShop)
    local source = source
    if TattooShop.label then
        local TattoosShops = GlobalState['TattoosShops']
        local id = #TattoosShops + 1
        TattoosShops[id] = TattooShop
        GlobalState:set("TattoosShops",TattoosShops,true)
        SaveControlFile("tattoos",id,TattooShop)
        TriggerClientEvent("Notify",source,"sucesso","Loja de tatuagem registrada com sucesso!",5000)
    end
end

function Server.deleteTattooShop(index)
    local source = source
    local TattoosShops = GlobalState['TattoosShops']
    if TattoosShops[index] then
        RemoveControlFile("tattoos",index)
        table.remove(TattoosShops,index)
        GlobalState:set("TattoosShops",TattoosShops,true)
        TriggerClientEvent("Notify",source,"sucesso","Loja de tatuagem removida com sucesso!",5000)
    end
end