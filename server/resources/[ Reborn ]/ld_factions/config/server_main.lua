

Functions = {}
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Functions.generateAllPrepares = function()
    Functions.prepare('ld_factions/orgs/CreateOrgIfNotExist', " INSERT IGNORE INTO ld_orgs(org) VALUES (@org) ")
    Functions.prepare('ld_factions/orgs/GetOrgsInfo', " SELECT bank,description,permissions,historico FROM ld_orgs WHERE org = @org ")
    
    Functions.prepare('ld_factions/orgs/GetDataTable', " SELECT user_id,dvalue FROM vrp_user_data WHERE dkey = 'Datatable' ")
    Functions.prepare('ld_factions/getLast', " SELECT * FROM characters WHERE id = @id ")

    Functions.prepare('ld_factions/updatePerms', "UPDATE ld_orgs SET permissions = @permissions WHERE org = @org")
    Functions.prepare('ld_factions/updateBankAndHistoric', "UPDATE ld_orgs SET bank = @bank, historico = @historico WHERE org = @org")

    Functions.prepare("ld/getOrgMonthly","SELECT * FROM ld_orgs_monthly WHERE org = @org")
    Functions.prepare("ld/DeleteMonthly","DELETE FROM ld_orgs_monthly WHERE user_id = @user_id")

    Functions.prepare("ld/DeleteDaily","DELETE FROM ld_orgs_daily WHERE user_id = @user_id")

    Functions.prepare("ld/setReward", "UPDATE ld_orgs_daily SET reward = @reward WHERE org = @org AND user_id = @user_id")
    Functions.prepare("ld/setPayment", "UPDATE ld_orgs_monthly SET payment = @payment WHERE org = @org AND user_id = @user_id")

    --

    Functions.prepare("ld/getStorageDay","SELECT * FROM ld_orgs_daily WHERE user_id = @user_id")
    Functions.prepare("ld/updateStorageDay", "UPDATE ld_orgs_daily SET itens = @itens, dia = @dia, org = @org WHERE user_id = @user_id")
    Functions.prepare("ld/SetStorageDay", "INSERT IGNORE INTO ld_orgs_daily(org, user_id,dia,itens) VALUES(@org,@user_id,@dia,@itens)")
    
    Functions.prepare("ld/getStorageMonthly","SELECT * FROM ld_orgs_monthly WHERE user_id = @user_id")
    Functions.prepare("ld/updateStorageMonthly", "UPDATE ld_orgs_monthly SET itens = @itens, mes = @mes, org = @org WHERE user_id = @user_id")
    Functions.prepare("ld/SetStorageMonthly", "INSERT IGNORE INTO ld_orgs_monthly(org,user_id,mes,itens) VALUES(@org, @user_id, @mes, @itens)")

    Functions.prepare('ld_factions/orgs/GetDataTable', " SELECT user_id,dvalue FROM vrp_user_data WHERE dkey = 'Datatable' ")
    Functions.prepare('ld_factions/orgs/CreateOrgIfNotExist', " INSERT IGNORE INTO ld_orgs(org) VALUES (@org) ")
    Functions.prepare('ld_factions/orgs/GetOrgsInfo', " SELECT bank,description,permissions,historico FROM ld_orgs WHERE org = @org ")
    
    Functions.prepare('ld_factions/getLast', " SELECT * FROM characters WHERE id = @id ")
    
    Functions.prepare('ld_factions/updatePerms', "UPDATE ld_orgs SET permissions = @permissions WHERE org = @org")
    Functions.prepare('ld_factions/updateBankAndHistoric', "UPDATE ld_orgs SET bank = @bank, historico = @historico WHERE org = @org")
    
    Functions.prepare("ld/getOrgMonthly","SELECT * FROM ld_orgs_monthly WHERE org = @org")
    Functions.prepare("ld/DeleteMonthly","DELETE FROM ld_orgs_monthly WHERE user_id = @user_id")
    
    Functions.prepare("ld/DeleteDaily","DELETE FROM ld_orgs_daily WHERE user_id = @user_id")
    
    Functions.prepare("ld/setReward", "UPDATE ld_orgs_daily SET reward = @reward WHERE org = @org AND user_id = @user_id")
    Functions.prepare("ld/setPayment", "UPDATE ld_orgs_monthly SET payment = @payment WHERE org = @org AND user_id = @user_id")
    
    Functions.prepare("ld/getFarm","SELECT * FROM ld_orgs_farm WHERE org = @org AND type = @type")
    Functions.prepare("ld/updateFarm", "UPDATE ld_orgs_farm SET daily = @daily, monthly = @monthly, payment = @payment WHERE org = @org AND type = @type")
    Functions.prepare("ld/setFarm", "INSERT IGNORE INTO ld_orgs_farm(org,type,daily,monthly, payment) VALUES(@org, @type, @daily, @monthly, @payment)")


    Functions.prepare("vRP/set_userdata","REPLACE INTO vrp_user_data(user_id,dkey,dvalue) VALUES(@user_id,@key,@value)")

end

Functions.query = function(name, params)
	return vRP.query(name, params)
end

Functions.prepare = function(name, params)
	return vRP.prepare(name, params)
end

Functions.execute = function(name, params)
	return vRP.execute(name, params)
end

Functions.getUsers = function()
	return vRP.getUsers()
end

Functions.getUserId = function(source)
    return vRP.getUserId(source)
end

Functions.getUserSource = function(user_id)
    return vRP.getUserSource(user_id)
end

Functions.hasGroup = function(user_id, perm)
    return vRP.hasGroup(user_id, perm)
end

Functions.hasPermission = function(user_id, perm)
    local hasPerm = vRP.hasPermission(user_id, perm)
    return hasPerm
end

Functions.addUserGroup = function(user_id, group)
	vRP.addUserGroup(user_id,group)
end

Functions.setUData = function(user_id, key, value)
	vRP.setUData(user_id,key,value)
end

Functions.getUData = function(user_id,key)
	return vRP.getUData(user_id,key)
end

Functions.removeUserGroup = function(user_id, group)
	vRP.removeUserGroup(user_id,group)
end

Functions.getUserGroups = function(user_id)
	return vRP.getUserGroups(user_id)
end

Functions.getPlayerPhoto = function(user_id)
	return "https://media.discordapp.net/attachments/1123364297645490196/1129559011948236820/D34GCzCWAAEWzDm.jpg"
end

Functions.getAllName = function(user_id)
    local identity = vRP.getUserIdentity(user_id)
    return identity.name.." "..identity.firstname
end

Functions.getBank = function(user_id)
    return vRP.getBankMoney(user_id)
end

Functions.giveBankMoney = function(user_id, amount)
    vRP.giveBankMoney(user_id,amount)
end

Functions.setBank = function(user_id, value)
    vRP.setBankMoney(user_id,value)
end

Functions.getItemName = function(item)
    return vRP.itemNameList(item)
end

Functions.request = function(source, mensagem, time)
    return vRP.request(source, mensagem, time)
end

Functions.notify = function(event, source, type, mensagem, time)
	TriggerClientEvent(event, source, type, mensagem, 10000)
end

Functions.sendLog = function(webhook, text)
	SendWebhookMessage(webhook,text)
end

Functions.translateNotify = function(index)
    if index == "sucesso" then
        return "verde"
    elseif index == "negado" then
     return "vermelho"
    elseif index == "aviso" then
        return "amarelo"
    elseif index == "importante" then
        return "azul"
    end
end

SendWebhookMessage = function(webhook,message)
    if webhook ~= "none" then
        PerformHttpRequest(webhook, function(err, text, headers) end, 'POST', json.encode({content = message}), { ['Content-Type'] = 'application/json' })
    end
end
