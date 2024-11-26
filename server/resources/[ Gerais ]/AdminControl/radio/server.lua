GlobalState["RadioFrequency"] = {}

RegisterCommand(Config.Commands["radio"]['command'],function(source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["radio"]['perm']) then
        ClientControl.showRadioFreqs(source)
    end
end)

function Server.setRadioFrequency(data)
    local source = source
    if data.name then
        local RadioFrequency = GlobalState['RadioFrequency']
        for k,v in pairs(RadioFrequency) do
            if v.freq == data.freq then
                TriggerClientEvent("Notify",source,"importante","Essa frequencia de radio ja existe!",5000)
                return
            end
        end
        local id = #RadioFrequency + 1
        RadioFrequency[id] = data
        GlobalState:set("RadioFrequency",RadioFrequency,true)
        SaveControlFile("frequency",id,RadioFrequency[id])
        TriggerClientEvent("Notify",source,"sucesso","Frequencia de radio registrado com sucesso!",5000)
    end
end

function Server.deleteFrequency(index)
    local source = source
    local RadioFrequency = GlobalState['RadioFrequency']
    if RadioFrequency[index] then
        RemoveControlFile("frequency",index)
        table.remove(RadioFrequency,index)
        GlobalState:set("RadioFrequency",RadioFrequency,true)
        TriggerClientEvent("Notify",source,"sucesso","Frequencia de radio removido com sucesso!",5000)
    end
end

AddEventHandler("onResourceStart",function (rs)
    if rs == GetCurrentResourceName() or rs == "fd_radio_os" then
        Wait(500)
        local Frequencies = GetControlFile("frequency")
        if Frequencies then
            GlobalState["RadioFrequency"] = Frequencies
        end
    end
end)