GlobalState['Skinshops'] = {}

RegisterCommand(Config.Commands["skinshop"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["skinshop"]['perm']) then
        if GetResourceState("will_skinshop") == "started" then
            local Skinshops = GetControlFile("skinshops")
            TriggerClientEvent("AdminControl:openSkinshops",source,Skinshops)
        else
            TriggerClientEvent("Notify",source,"negado","Will skinshop não iniciado",5000)
        end
    end
end)

function Server.registerSkinshop(data)
    local source = source
	local skinshopsGlobal = GlobalState['Skinshops'] or {}
	local skinshopSize = #skinshopsGlobal + 1
	skinshopsGlobal[skinshopSize] = {
		clothes = "all",
		name = data.name,
		coords = data.coords,
        blockedCategories = data.blockedCategories,
	}
	GlobalState:set("Skinshops", skinshopsGlobal, true)
    local Skinshops = GetControlFile("skinshops")
    SaveControlFile("skinshops",#Skinshops + 1,skinshopsGlobal[skinshopSize])
    TriggerClientEvent("Notify",source,"sucesso","Loja de roupa registrada com sucesso!",5000)
end

function Server.deleteSkinshop(id)
    local Skinshops = GetControlFile("skinshops")
	local skinshopsGlobal = GlobalState['Skinshops'] or {}
    for k,v in pairs(Skinshops) do
        if k == id then
            RemoveControlFile("skinshops",k)
            table.remove(skinshopsGlobal,k)
            break
        end
    end
    GlobalState:set("Skinshops", skinshopsGlobal, true)
    TriggerClientEvent("Notify",source,"sucesso","Loja de roupa deletada com sucesso!",5000)
end

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == 'will_skinshop' or resourceName == GetCurrentResourceName() then
        Wait(1000)
        local skinshopsGlobal = GlobalState['Skinshops'] or {}
        local Skinshops = GetControlFile("skinshops")
        for Index,skinshop in pairs(Skinshops) do
            skinshopsGlobal[Index] = skinshop
        end
        GlobalState:set("Skinshops", skinshopsGlobal, true)
    end
end)
