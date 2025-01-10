GlobalState["AllPeds"] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == 'core' or resourceName == GetCurrentResourceName() then
        if resourceName == GetCurrentResourceName() then
            GlobalState["AllPeds"] = GetControlFile("peds")
        end
    end
end)

RegisterCommand(Config.Commands["peds"]['command'],function(source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["peds"]['perm']) then
        ClientControl.getPedData(source)
    end
end)

RegisterServerEvent("AdminControl:addPed",function (coords,heading,pedModel)
    local source = source
    if coords and pedModel then
        local AllPeds = GlobalState["AllPeds"]
        local Data = {
            Distance = 50,
            Coords = { coords.x, coords.y, coords.z, heading + 0.001 },
            Model = pedModel,
            anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
        }
        local id = #AllPeds + 1
        SaveControlFile("peds",id,Data)
        table.insert(AllPeds,Data)
        GlobalState:set("AllPeds",AllPeds,true)
        TriggerClientEvent("Notify",source,"sucesso","Npc adicionado com sucesso",5000)
    end
end)

RegisterServerEvent("AdminControl:editPed",function (id,coords,heading,pedModel)
    local source = source
    if id and coords and pedModel then
        local AllPeds = GlobalState["AllPeds"]
        local Data = {
            Distance = 50,
            Coords = { coords.x, coords.y, coords.z, heading + 0.001 },
            Model = pedModel,
            anim = { "anim@heists@heist_corona@single_team","single_team_loop_boss" }
        }
        AllPeds[id] = Data
        EditControlFile("peds",id,Data)
        GlobalState:set("AllPeds",AllPeds,true)
        TriggerClientEvent("Notify",source,"sucesso","Npc editado com sucesso",5000)
    end
end)

RegisterServerEvent("AdminControl:deletePed",function (id)
    local source = source
    if id then
        local AllPeds = GlobalState["AllPeds"]
        AllPeds[id] = nil
        RemoveControlFile("peds",id)
        GlobalState:set("AllPeds",AllPeds,true)
        TriggerClientEvent("Notify",source,"sucesso","Npc removido com sucesso",5000)
    end
end)
