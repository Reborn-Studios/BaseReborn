--#########################
---## FUNCTIONS
--#########################

Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")
vRP = Proxy.getInterface("vRP")
ShopServer = {}
Tunnel.bindInterface("will_jobs",ShopServer)

function getUserId(source)
    if Config.base == "cn" then
		return vRP.Passport(source)
    end
    return vRP.getUserId(source)
end

function getUserSource(user_id)
	if Config.base == "summerz" then
		return vRP.userSource(user_id)
    elseif Config.base == "cn" then
		return vRP.Source(user_id)
	end
	return vRP.getUserSource(user_id)
end

function getUserIdentity(user_id)
    local identity = vRP.getUserIdentity(user_id)
    if Config.base == "summerz" then
		identity = vRP.userIdentity(user_id)
    elseif Config.base == "cn" then
		identity = vRP.Identity(user_id)
	end
	if not identity.name2 then
        identity.name2 = identity.firstname
    end
    return identity
end

function giveInventoryItem(user_id, item, amount)
    if Config.base == "cn" then
		vRP.GiveItem(user_id, item, amount, true)
    else
        vRP.giveInventoryItem(user_id, item, amount, true)
	end
end

function getInventoryItemAmount(user_id, item)
    local itemAmount = vRP.getInventoryItemAmount and vRP.getInventoryItemAmount(user_id, item) or vRP.InventoryItemAmount and vRP.InventoryItemAmount(user_id, item)[1]
    return parseInt(itemAmount)
end

function tryGetInventoryItem(user_id, item, amount)
    return vRP.tryGetInventoryItem and vRP.tryGetInventoryItem(user_id, item, amount) or vRP.TakeItem and vRP.TakeItem(user_id, item, amount)
end

function checkUserWeight(user_id, item, amount)
    if Config.base == "cn" then
        if vRP.InventoryWeight(user_id) + (getItemWeight(item) * amount) <= vRP.GetWeight(user_id) then
            return true
        end
    elseif Config.base == "summerz" then
        if vRP.inventoryWeight(user_id) + (getItemWeight(item) * amount) <= vRP.getWeight(user_id) then
            return true
        end
    elseif Config.base == "creative" then
        if vRP.computeInvWeight(user_id) + (getItemWeight(item) * amount) <= vRP.getBackpack(user_id) then
            return true
        end
    else
        if vRP.getInventoryWeight(user_id) + (getItemWeight(item) * amount) <= vRP.getInventoryMaxWeight(user_id) then
            return true
        end
    end
    local source = getUserSource(user_id)
    if source then
        Config.notify("Sem espaço na mochila","negado", source)
    end
end

local itemsWeight = {
    ['fuel'] = 0.01,
    ["arms"] = 0.01,
	["backpack"] = 0.01,
	["tshirt"] = 0.01,
	["torso"] = 0.01,
	["pants"] = 0.01,
	["vest"] = 0.01,
	["shoes"] = 0.01,
	["mask"] = 0.01,
	["hat"] = 0.01,
	["glass"] = 0.01,
	["ear"] = 0.01,
	["watch"] = 0.01,
	["bracelet"] = 0.01,
	["accessory"] = 0.01,
	["decals"] = 0.01,
}

function getItemWeight(item)
    if itemsWeight[item] then
        return itemsWeight[item]
    end
    return vRP.itemWeightList(item) or 0.5
end

function tryPayment(user_id, price)
    if Config.base == "cn" then
        return vRP.PaymentFull(user_id, parseInt(price))
    elseif Config.base == "summerz" then
        return vRP.paymentFull(user_id, parseInt(price))
    end
	return vRP.tryFullPayment(user_id, parseInt(price))
end

local vipRewards = {
    ['Diamante'] = 0.5,
    ['Platina'] = 0.3,
    ['Ouro'] = 0.2,
    ['Prata'] = 0.1,
    ['Bronze'] = 0.05
}

function giveUserMoney(user_id, money, job)
    vRP.addBank(user_id, money)
    local nplayer = getUserSource(user_id)
    if nplayer then
        TriggerClientEvent("vrp_sound:source",nplayer,"coin",0.5)
    end
    if vRP.hasPermission(user_id,"vip.permissao") then
        local userGroups = vRP.getUserGroups(user_id)
        for group, v in pairs(userGroups) do
            if vipRewards[group] then
                local vipReward = math.ceil(money * vipRewards[group])
                if vipReward > 0 then
                    vRP.addBank(user_id, vipReward)
                    if nplayer then
                        Config.notify("Você ganhou R$"..vipReward.." de bônus por ser VIP "..group,"sucesso",nplayer)
                    end
                end
            end
        end
    end
end

function prepare(name, query)
    vRP.prepare(name, query)
end

function query(name, data)
    return vRP.query(name, data)
end

function execute(name, data)
    if Config.base == "cn" then
        vRP.query(name, data)
    else
        vRP.execute(name, data)
    end
end

function deleteVehicle(vehNet)
    local nveh = NetworkGetEntityFromNetworkId(vehNet)
    if DoesEntityExist(nveh) then
        DeleteEntity(nveh)
    end
end

function request(source,text)
    return vRP.request(source,text,30)
end

RegisterServerEvent("will_jobs:tryDeleteEntity")
AddEventHandler("will_jobs:tryDeleteEntity",function(netObj)
    local Entity = NetworkGetEntityFromNetworkId(netObj)
    DeleteEntity(Entity)
end)

--######################--
--##  JOBS FUNCTIONS  ##--
--######################--

RegisterServerEvent("will_jobs:lumbermanPayout",function()
    local source = source
    local WOOD_ITEM = "woodlog"
    local amount = math.random(2, 5)

    local user_id = getUserId(source)
    if checkUserWeight(user_id, WOOD_ITEM, amount) then
        giveInventoryItem(user_id, WOOD_ITEM, amount)
        return true
    else
        Config.notify("Mochila cheia","negado",source)
    end
    return false
end)

prepare("will/get_all_shop_jobs","SELECT * FROM will_shops_jobs WHERE `finished` = 'false';")

function ShopServer.getShopsJobs()
    local consult = query("will/get_all_shop_jobs")
    return consult or {}
end
