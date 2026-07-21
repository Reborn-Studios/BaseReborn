GlobalState["BatePontoLocations"] = {}

local function loadBatePontos()
    local batePontos = GetControlFile("batepontos") or {}
    GlobalState:set("BatePontoLocations", batePontos, true)
end

RegisterCommand(Config.Commands["bateponto"]["command"], function(source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id, Config.Commands["bateponto"]["perm"]) then
        local Services = {}
        local Groups = vRP.Groups()
        for Group,v in pairs(Groups) do
            if v["Service"] then
                table.insert(Services, { name = Group, label = v["Name"] })
            end
        end
        ClientControl.showBatePontos(source,Services)
    end
end)

function Server.registerBatePonto(groupName,data)
    local source = source
    if not data or not data.name or not data.coords then
        return
    end

    local batePontos = GlobalState["BatePontoLocations"] or {}
    if not batePontos[groupName] then
        batePontos[groupName] = {}
        table.insert(batePontos[groupName], data)
        SaveControlFile("batepontos", groupName, { data })
    else
        table.insert(batePontos[groupName], data)
        EditControlFile("batepontos", groupName, batePontos[groupName])
    end

    GlobalState:set("BatePontoLocations", batePontos, true)
    TriggerClientEvent("Notify", source, "sucesso", "Bate-ponto registrado com sucesso!", 5000)
end

function Server.updateBatePonto(groupName, index, data)
    local source = source
    local batePontos = GlobalState["BatePontoLocations"] or {}

    if not batePontos[groupName] or not data then
        return
    end

    batePontos[groupName][index] = data

    GlobalState:set("BatePontoLocations", batePontos, true)
    EditControlFile("batepontos", groupName, batePontos[groupName])

    TriggerClientEvent("Notify", source, "sucesso", "Bate-ponto atualizado com sucesso!", 5000)
end

function Server.deleteBatePonto(groupName,index)
    local source = source
    local batePontos = GlobalState["BatePontoLocations"] or {}

    if not batePontos[groupName] then
        return
    end
    table.remove(batePontos[groupName], index)
    EditControlFile("batepontos", groupName, batePontos[groupName])

    GlobalState:set("BatePontoLocations", batePontos, true)
    TriggerClientEvent("Notify", source, "sucesso", "Bate-ponto removido com sucesso!", 5000)
end

AddEventHandler("onResourceStart", function(resourceName)
    if resourceName == GetCurrentResourceName() or resourceName == "will_bateponto" then
        Wait(500)
        loadBatePontos()
    end
end)
