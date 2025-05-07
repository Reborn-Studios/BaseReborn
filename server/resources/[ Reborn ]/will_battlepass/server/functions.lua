-----------------------------------
--########## Funções vRP ##########
-----------------------------------

function getUserId(source)
    return vRP.getUserId(source)
end

function getUserSource(user_id)
	if Config.base == "summerz" then
		return vRP.userSource(user_id)
	end
	return vRP.getUserSource(user_id)
end

function getUserIdentity(user_id)
    if Config.base == "summerz" then
		return vRP.userIdentity(user_id)
	end
	return vRP.getUserIdentity(user_id)
end

function hasAdminPermission(user_id)
    return vRP.hasPermission(user_id, "Admin")
end

function giveInventoryItem(user_id, item, amount)
    vRP.giveInventoryItem(user_id, item, amount)
end

function addVehicle(user_id, vehicle)
    vRP.addUserVehicle(user_id,vehicle)
end

function prepare(name, query)
    vRP.prepare(name, query)
end

function query(name, data)
    return vRP.query(name, data) or {}
end

function execute(name, data)
    vRP.execute(name, data)
end

function prompt(source,title,text)
    return vRP.prompt(source,title,text)
end

-------------------------------------------------
--####### Funções de Coins e recompensas ########
-------------------------------------------------

function verifyUserBattlepass(user_id)
    if not Config.ExclusiveBattlepass then
        return true
    end
    if vRP.hasPermission(user_id,Config.BattlepassPerm) then
        return true
    end
    return false
end

function tryGetCoins(user_id, amount)
    return vRP.remGmsId(user_id, amount)
end

function addCoin(user_id, amount)
    vRP.addGmsId(user_id, amount)
end

function buyLootbox(source, lootbox, useCoins)
    local user_id = getUserId(source)
    if useCoins then
        if tryGetCoins(user_id, Config.Lootboxes[lootbox].coinPrice) then
            giveInventoryItem(user_id, Config.Lootboxes[lootbox].name, 1)
            TriggerClientEvent("Notify", source, "sucesso", "Você recebeu um "..Config.Lootboxes[lootbox].title, 5000)
        else
            TriggerClientEvent("Notify", source, "negado", "Coins insuficientes.", 5000)
        end
    else
        if tryPayment(user_id, Config.Lootboxes[lootbox].moneyPrice) then
            giveInventoryItem(user_id, Config.Lootboxes[lootbox].name, 1)
            TriggerClientEvent("Notify", source, "sucesso", "Você recebeu um "..Config.Lootboxes[lootbox].title, 5000)
        end
    end
end

function giveReward(user_id, level, mode)
    if mode == 'money' then
        addMoney(user_id, Config.LevelRewards[level].amount)
        TriggerClientEvent("Notify", source, "sucesso", "Você recebeu R$"..Config.LevelRewards[level].amount..".", 5000)
    elseif mode == 'weapon' then
        giveInventoryItem(user_id, Config.LevelRewards[level].item, Config.LevelRewards[level].amount)
        TriggerClientEvent("Notify", source, "sucesso", "Você recebeu "..Config.LevelRewards[level].title..".", 5000)
    elseif mode == 'coin' then
        addCoin(user_id, Config.LevelRewards[level].amount)
        TriggerClientEvent("Notify", source, "sucesso", "Você recebeu "..Config.LevelRewards[level].amount.." coins!", 5000)
    elseif mode == 'item' then
        giveInventoryItem(user_id, Config.LevelRewards[level].item, Config.LevelRewards[level].amount)
        TriggerClientEvent("Notify", source, "sucesso", "Você recebeu "..Config.LevelRewards[level].amount.."x "..Config.LevelRewards[level].title..".", 5000)
    end
end

function addMoney(user_id, amount)
    local nplayer = getUserSource(user_id)
    if nplayer then
        if Config.base == "creative" or Config.base == "summerz" then
            vRP.addBank(user_id, amount)
        elseif Config.base == "vrpex" then
            vRP.giveBankMoney(user_id, amount)
        end
        TriggerClientEvent("Notify",nplayer,"sucesso","Dinheiro recebido R$"..amount,5000)
    end
end

function tryPayment(user_id, price)
    local payment = nil
    if Config.base == "creative" or Config.base == "summerz" then
        payment = vRP.paymentBank(parseInt(user_id),price)
    elseif Config.base == "vrpex" then
        payment = vRP.tryFullPayment(parseInt(user_id),price)
    end
    if not payment then
        local nplayer = getUserSource(user_id)
        TriggerClientEvent("Notify",nplayer,"negado","Dinheiro insuficiente",5000)
    end
    return payment
end

---------------------------
--####### PREPARES ########
---------------------------

Citizen.CreateThread(function()
    prepare("will/add_battlepass", "INSERT INTO will_battlepass(user_id, level, xp) VALUES (@user_id, @level, @xp)")
    prepare("will/rem_battlepass", "DELETE FROM will_battlepass WHERE user_id = @user_id")
    prepare("will/get_battlepass","SELECT * FROM will_battlepass WHERE user_id = @user_id")
    prepare("will/set_xp","UPDATE will_battlepass SET xp = @xp WHERE user_id = @user_id")
    prepare("will/level_up","UPDATE will_battlepass SET xp = @xp, level = @level WHERE user_id = @user_id")
    prepare("will/create_battlepass",[[
        CREATE TABLE IF NOT EXISTS `will_battlepass` (
        `user_id` varchar(255) NULL DEFAULT '',
        `level` int(3) NOT NULL DEFAULT '0',
        `xp` int(11) NOT NULL DEFAULT '0',
        PRIMARY KEY (`user_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ]])
    execute("will/create_battlepass")
end)
