GlobalState['BarberShops'] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        local BarberShops = GetControlFile("barbershops")
        GlobalState['BarberShops'] = BarberShops
    end
end)

RegisterCommand(Config.Commands["barbershop"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["barbershop"]['perm']) then
        TriggerClientEvent("AdminControl:openBarberShop",source)
    end
end)

function Server.registerBarberShop(BarberShop)
    local source = source
    if BarberShop.label then
        local BarberShops = GlobalState['BarberShops']
        local id = #BarberShops + 1
        BarberShops[id] = BarberShop
        GlobalState:set("BarberShops",BarberShops,true)
        SaveControlFile("barbershops",id,BarberShop)
        TriggerClientEvent("Notify",source,"sucesso","Barbearia registrada com sucesso!",5000)
    end
end

function Server.deleteBarberShop(index)
    local source = source
    local BarberShops = GlobalState['BarberShops']
    if BarberShops[index] then
        RemoveControlFile("barbershops",index)
        table.remove(BarberShops,index)
        GlobalState:set("BarberShops",BarberShops,true)
        TriggerClientEvent("Notify",source,"sucesso","Barbearia removida com sucesso!",5000)
    end
end