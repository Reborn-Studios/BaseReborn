GlobalState["Elevators"] = {}

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        GlobalState['Elevators'] = GetControlFile("elevators")
    end
end)

RegisterCommand(Config.Commands["elevators"]["command"],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["elevators"]['perm']) then
        ClientControl.elevatorsControl(source)
    end
end)

function Server.registerElevator(data)
    if data then
        local Elevators = GlobalState['Elevators']
        table.insert(Elevators,data)
        SaveControlFile("elevators",#Elevators,data)
        GlobalState:set("Elevators",Elevators,true)
        TriggerClientEvent("Notify",source,"sucesso","Elevador adicionado com sucesso!",5000)
    end
end

function Server.deleteElevator(index)
    local source = source
    local Elevators = GlobalState['Elevators']
    if index and Elevators[index] then
        RemoveControlFile("elevators",index)
        table.remove(Elevators,index)
        GlobalState:set("Elevators",Elevators,true)
        TriggerClientEvent("Notify",source,"sucesso","Elevador removido com sucesso!",5000)
    end
end
