--#########################
---## FRAMEWORK FUNCTIONS
--#########################

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

function hasPermission(user_id, perm)
    if Config.base == "summerz" then
		return vRP.HasPermission(user_id, perm)
    elseif Config.base == "cn" then
		return vRP.HasGroup(user_id, perm)
	end
    return vRP.hasPermission(user_id,perm)
end

function checkVipCloth(source,category,item)
    local user_id = getUserId(source)
    if hasPermission(user_id, "Gold") then
        return true
    end
    return false
end

function checkFines(source)
    local user_id = getUserId(source)
    if vRP.getFines(user_id) > 0 then
        TriggerClientEvent("Notify",source,"aviso","Multas pendentes encontradas.",3000)
        return false
    end
    return true
end

function updateUserClothes(source, clothes)
    local user_id = vRP.getUserId(source)
	if user_id then
        TriggerClientEvent("will_inventory:setClothes",source)
		vRP.setUData(user_id, "Clothings", json.encode(clothes))
	end
end

function tryPayment(payMethod, user_id, price)
    if price <= 0 then return true end
    if payMethod == "bank" then
        if Config.base == "cn" then
            return vRP.PaymentBank(user_id, price)
        elseif Config.base == "summerz" then
            return vRP.paymentBank(user_id, price)
        end
        return vRP.tryFullPayment(user_id, price)
    elseif payMethod == "wallet" then
        if Config.base == "cn" then
            return vRP.TakeItem(user_id,"dollars", price)
        elseif Config.base == "summerz" then
            return vRP.tryGetInventoryItem(user_id,"dollars",price)
        end
        return vRP.tryPayment(user_id,price)
    elseif payMethod == "vip" then
        return false
    else
        if Config.base == "cn" then
            return vRP.PaymentFull(user_id, price)
        elseif Config.base == "summerz" then
            return vRP.paymentFull(user_id, price)
        end
        return vRP.tryFullPayment(user_id, price)
    end
end

function getUserName(user_id)
    local identity = getUserIdentity(user_id)
    return identity.name.." "..identity.name2
end

function getItemName(data)
    return data.name
end

function getClothPrice(shop, item, model, texture)
    local price = 0
    if GlobalState['Will_Shops_Products'][shop] then
        if GlobalState['Will_Shops_Products'][shop][item] then
            if type(GlobalState['Will_Shops_Products'][shop][item]) == "table" then
                price = GlobalState['Will_Shops_Products'][shop][item][model]
            else
                price = GlobalState['Will_Shops_Products'][shop][item]
            end
        else
            price = GlobalState['Will_Shops_Products'][shop]['all']
        end
    else
        price = Config.clothPrices[item] and Config.clothPrices[item][model] or Config.clothPrices['all']
    end
    if type(price) == "table" then
        price = price[texture]
    end
    return price
end

AddEventHandler("vRP:playerSpawn",function(user_id,source)
    local data = json.decode(vRP.getUData(user_id,"Clothings"))
    playerSpawn(source, user_id, data)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMMANDS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("skinshop",function(source,args)
    local user_id = getUserId(source)
    if user_id and hasPermission(user_id,"Admin") then
        TriggerClientEvent("will_skinshop:openShop",source,"Creator")
    end
end)

local commands = {
    ['mascara'] = "will_skinshop:setMask",
    ['chapeu'] = "will_skinshop:setHat",
    ['oculos'] = "will_skinshop:setGlasses",
    ['maos'] = "will_skinshop:setArms",
    ['sapatos'] = "will_skinshop:setShoes",
    ['calcas'] = "will_skinshop:setPants",
    ['camisa'] = "will_skinshop:setShirt",
    ['jaqueta'] = "will_skinshop:setJacket",
    ['colete'] = "will_skinshop:setVest",
}

CreateThread(function()
    for command, event in pairs(commands) do
        RegisterCommand(command,function(source,args)
            local user_id = getUserId(source)
            if user_id and args[1] then
                if vRP.hasPermission(user_id,"roupas.permissao") or vRP.getInventoryItemAmount(user_id, "roupas") >= 1 then
                    TriggerClientEvent(event,source,tonumber(args[1]),tonumber(args[2]))
                else
                    TriggerClientEvent("Notify",source,"negado","Você não possui o item roupas",5000)
                end
            end
        end)
    end
end)
