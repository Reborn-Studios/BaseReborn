RegisterServerEvent("AdminControl:setUserGroups",function (nuser_id, addGroups, remGroups)
    local source = source
    local user_id = vRP.getUserId(source)
    if not vRP.hasPermission(user_id,"admin.permissao") then return end
    for AddGroup, Level in pairs(addGroups) do
        vRP.addUserGroup(nuser_id,AddGroup,Level)
        TriggerClientEvent("Notify",source,"sucesso","O cidadão foi setado como " ..vRP.getGroupTitle(AddGroup,Level).." ",5000)
        vRP.createWeebHook(Webhooks.webhookset,"```prolog\n[ID]: "..user_id.." \n[SETOU]: "..nuser_id.." \n [GROUP]: "..AddGroup.."\n [HIERARQUIA]: "..Level.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
    end
    for RemGroup, v in pairs(remGroups) do
        vRP.removeUserGroup(nuser_id,RemGroup)
        TriggerClientEvent("Notify",source,"aviso","O cidadão foi retirado de " ..RemGroup.." ",5000)
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
AddEventHandler("AdminControl:createGroup",function (data)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        AllGroups[data.groupName] = {
            ["Name"] = data["Name"],
            ["Type"] = data["Type"],
            ["QBESXGroup"] = data["QBESXGroup"],
            ["Markers"] = data["Markers"],
            ["Service"] = data["Service"],
            ["OrgPanel"] = data["OrgPanel"],
            ["Hierarchy"] = {},
            ["Permissions"] = {},
        }
        local perms = data["Permissions"] and splitString(data["Permissions"],",") or {}
        for _,perm in pairs(perms) do
            perm = string.gsub(perm," ","")
            table.insert(AllGroups[data.groupName]["Permissions"], perm)
        end
        GlobalState:set("AllGroups",AllGroups,true)
        SaveControlFile("groups",data.groupName,AllGroups[data.groupName])
        if data["OrgPanel"] and GetResourceState("ld_orgs_v2") == "started" then
            StopResource("ld_orgs_v2")
            Wait(500)
            StartResource("ld_orgs_v2")
        end
        TriggerClientEvent("Notify",source,"sucesso","Grupo registrado com sucesso!",5000)
    end
end)

RegisterServerEvent("AdminControl:createGroupHierarchy")
AddEventHandler("AdminControl:createGroupHierarchy",function (data)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        if AllGroups[data.groupName] then
            local hierarchyPerms = {}
            local perms = data["perms"] and splitString(data["perms"],",") or {}
            for _,perm in pairs(perms) do
                perm = string.gsub(perm," ","")
                table.insert(hierarchyPerms, perm)
            end
            table.insert(AllGroups[data.groupName]["Hierarchy"], {
                ["Group"] = data.group,
                ["Title"] = data.title,
				["Leader"] = data.leader,
				["Salary"] = data.salary,
				["Permission"] = hierarchyPerms,
            })
            GlobalState:set("AllGroups",AllGroups,true)
            EditControlFile("groups",data.groupName,AllGroups[data.groupName])
            TriggerClientEvent("Notify",source,"sucesso","Grupo registrado com sucesso!",5000)
        end
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

RegisterNetEvent("AdminControl:deleteGroupLevel")
AddEventHandler("AdminControl:deleteGroupLevel",function (group,level)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        if AllGroups[group] and AllGroups[group]["Hierarchy"] then
            table.remove(AllGroups[group]["Hierarchy"], level)
            GlobalState:set("AllGroups",AllGroups,true)
            RemoveControlFile("groups",group)
            TriggerClientEvent("Notify",source,"sucesso","Grupo deletado com sucesso!",5000)
        end
    end
end)

RegisterServerEvent("AdminControl:editGroup")
AddEventHandler("AdminControl:editGroup",function (data)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        local perms = data.Permissions and splitString(data.Permissions,",") or {}
        for _,perm in pairs(perms) do
            perm = string.gsub(perm," ","")
            table.insert(AllGroups[data.groupName]["Permissions"], perm)
        end

        AllGroups[data.groupName]["Name"] = data.Name
        AllGroups[data.groupName]["Type"] = data.Type
        AllGroups[data.groupName]["QBESXGroup"] = data.QBESXGroup
        AllGroups[data.groupName]["Markers"] = data.Markers
        AllGroups[data.groupName]["Service"] = data.Service
        AllGroups[data.groupName]["OrgPanel"] = data.OrgPanel

        GlobalState:set("AllGroups",AllGroups,true)
        EditControlFile("groups",data.groupName,AllGroups[data.groupName])
        TriggerClientEvent("Notify",source,"sucesso","Grupo editado com sucesso!",5000)
    end
end)

RegisterServerEvent("AdminControl:editGroupHierarchy")
AddEventHandler("AdminControl:editGroupHierarchy",function (data)
    local source = source
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,Config.Commands["groups"]['perm']) then
        local AllGroups = GlobalState['AllGroups']
        local perms = data.perms and splitString(data.perms,",") or {}
        AllGroups[data.groupName] = {}
        for _,perm in pairs(perms) do
            perm = string.gsub(perm," ","")
            table.insert(AllGroups[data.groupName], perm)
        end
        AllGroups[data.groupName]["Hierarchy"][data.level] = {
            ["Group"] = data.group,
            ["Title"] = data.title,
			["Leader"] = data.leader,
			["Salary"] = data.salary,
			["Permission"] = data.perms,
        }
        GlobalState:set("AllGroups",AllGroups,true)
        EditControlFile("groups",data.groupName,AllGroups[data.groupName])
        TriggerClientEvent("Notify",source,"sucesso","Grupo editado com sucesso!",5000)
    end
end)
