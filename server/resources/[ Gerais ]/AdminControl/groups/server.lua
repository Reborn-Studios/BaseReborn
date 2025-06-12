RegisterServerEvent("AdminControl:setUserGroups",function (nuser_id, addGroups, remGroups)
    local source = source
    local user_id = vRP.getUserId(source)
    if not vRP.hasPermission(user_id,"admin.permissao") then return end
    for AddGroup, v in pairs(addGroups) do
        vRP.addUserGroup(nuser_id,AddGroup)
        TriggerClientEvent("Notify",source,"sucesso","O cidadão foi setado como " ..AddGroup.." ",5000)
        vRP.createWeebHook(Webhooks.webhookset,"```prolog\n[ID]: "..user_id.." \n[SETOU]: "..nuser_id.." \n [GROUP]: "..AddGroup.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
    end
    for RemGroup, v in pairs(remGroups) do
        vRP.removePermission(nuser_id, RemGroup)
        TriggerClientEvent("Notify",source,"aviso","O cidadão foi retirado de " ..RemGroup.." ",5000)
		vRP.execute("vRP/del_group",{ user_id = nuser_id, permiss = RemGroup })
        vRP.createWeebHook(Webhooks.webhookunset,"```prolog\n[ID]: "..user_id.." \n[RETIROU SET]: "..nuser_id.." \n [GROUP]: "..RemGroup.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
    end
end)

AddEventHandler('onServerResourceStart', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        local AllGroups = GetControlFile("groups") or {}
        GlobalState:set("AllGroups",AllGroups,true)
    end
end)

RegisterCommand(Config.Commands["groups"]['command'],function (source)
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        TriggerClientEvent("AdminControl:openGroups",source)
    end
end)

RegisterServerEvent("AdminControl:createGroup")
AddEventHandler("AdminControl:createGroup",function (group)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        AllGroups[group.groupName] = {}
        local perms = group.perms and splitString(group.perms,",") or {}
        for _,perm in pairs(perms) do
            perm = string.gsub(perm," ","")
            table.insert(AllGroups[group.groupName], perm)
        end
        AllGroups[group.groupName]._config = {
            title = group.title,
			gtype = group.gtype,
			grade = group.grade,
			salary = group.salary
        }
        GlobalState:set("AllGroups",AllGroups,true)
        SaveControlFile("groups",group.groupName,AllGroups[group.groupName])
        TriggerClientEvent("Notify",source,"sucesso","Grupo registrado com sucesso!",5000)
    end
end)

RegisterServerEvent("AdminControl:deleteGroup")
AddEventHandler("AdminControl:deleteGroup",function (group)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        AllGroups[group] = nil
        GlobalState:set("AllGroups",AllGroups,true)
        RemoveControlFile("groups",group)
        TriggerClientEvent("Notify",source,"sucesso","Grupo deletado com sucesso!",5000)
    end
end)

RegisterServerEvent("AdminControl:editGroup")
AddEventHandler("AdminControl:editGroup",function (group)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        local perms = group.perms and splitString(group.perms,",") or {}
        AllGroups[group.groupName] = {}
        for _,perm in pairs(perms) do
            perm = string.gsub(perm," ","")
            table.insert(AllGroups[group.groupName], perm)
        end
        AllGroups[group.groupName]._config = {
            title = group.title,
			gtype = group.gtype,
			grade = group.grade,
			salary = group.salary
        }
        GlobalState:set("AllGroups",AllGroups,true)
        EditControlFile("groups",group.groupName,AllGroups[group.groupName])
        TriggerClientEvent("Notify",source,"sucesso","Grupo editado com sucesso!",5000)
    end
end)