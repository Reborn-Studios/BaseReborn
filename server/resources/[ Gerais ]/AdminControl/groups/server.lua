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