RegisterCommand(Config.Commands["garages"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["garages"]['perm']) then
        if GetResourceState("will_garages_v2") == "started" then
            local Garages = GetControlFile("garages")
            TriggerClientEvent("AdminControl:openGarages",source,Garages)
        else
            TriggerClientEvent("Notify",source,"negado","Will garagem não iniciado",5000)
        end
    end
end)

function Server.registerGarage(data)
    local source = source
	local garagesGlobal = GlobalState['GaragesGlobal'] or {}
	local garageSize = #garagesGlobal + 1
    if data.payment == 0 then
        data.payment = false
    end
	garagesGlobal[garageSize] = {
		name = data.name,
		payment = data.payment,
		perm = data.perms,
		entrada = data.entrada,
        map = data.map,
	}
    if data.type == "interior" then
		garagesGlobal[garageSize].interior = data.interior
	else
		garagesGlobal[garageSize].spawns = data.spawns
	end
	GlobalState:set("GaragesGlobal", garagesGlobal, true)
    local Garages = GetControlFile("garages")
    local id = #Garages + 1
    garagesGlobal[garageSize].id = garageSize
    SaveControlFile("garages",id,garagesGlobal[garageSize])
    TriggerClientEvent("Notify",source,"sucesso","Garagem registrada com sucesso!",5000)
end

function Server.updateGarage(data)
    local source = source
	local garagesGlobal = GlobalState['GaragesGlobal'] or {}
    local id = data.id
    if data.payment == 0 then
        data.payment = false
    end
    garagesGlobal[id].name = data.name
    garagesGlobal[id].payment = data.payment
    garagesGlobal[id].perm = data.perms
    garagesGlobal[id].entrada = data.entrada
    garagesGlobal[id].map = data.map
    if data.type == "interior" then
		garagesGlobal[id].interior = data.interior
	else
		garagesGlobal[id].spawns = data.spawns
	end
	GlobalState:set("GaragesGlobal", garagesGlobal, true)
    local Garages = GetControlFile("garages")
    for k,v in pairs(Garages) do
        if v.id == id then
            EditControlFile("garages",k,garagesGlobal[id])
            break
        end
    end
    TriggerClientEvent("Notify",source,"sucesso","Garagem editada com sucesso!",5000)
end

function Server.deleteGarage(id)
    local source = source
    local Garages = GetControlFile("garages")
	local garagesGlobal = GlobalState['GaragesGlobal'] or {}
    for k,v in pairs(Garages) do
        if v.id == id then
            RemoveControlFile("garages",k)
            garagesGlobal[v.id] = nil
            break
        end
    end
    GlobalState:set("GaragesGlobal", garagesGlobal, true)
    TriggerClientEvent("Notify",source,"sucesso","Garagem deletada com sucesso!",5000)
end

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == 'will_garages_v2' or resourceName == GetCurrentResourceName() then
        Wait(1000)
        local garagesGlobal = GlobalState['GaragesGlobal'] or {}
        local Garages = GetControlFile("garages")
        for Index,garage in pairs(Garages) do
            if tonumber(garage.id) then
                garagesGlobal[tonumber(garage.id)] = garage
            end
        end
        GlobalState:set("GaragesGlobal", garagesGlobal, true)
    end
end)
