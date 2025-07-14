--#########################
---## FRAMEWORK FUNCTIONS
--#########################

function getUserId(source)
    if Config.base == "cn" then
		return vRP.Passport(source)
    end
    return vRP.getUserId(source)
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
    if category == "mask" and item == "2" then
        if hasPermission(user_id,"Owner") then
            return true
        end
        return false
    end
    if hasPermission(user_id, "vip.permissao") then
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
		vRP.setUData(user_id, "Clothings", json.encode(clothes))
	end
end

function tryPayment(payMethod, user_id, price)
    if price <= 0 then return true end
    if payMethod == "money" then
        if Config.base == "cn" then
            return vRP.PaymentBank(user_id, price)
        elseif Config.base == "summerz" then
            return vRP.paymentBank(user_id, price)
        end
        return vRP.tryFullPayment(user_id, price)
    elseif payMethod == "vip" then
        if hasPermission(user_id,"Owner") then
            return true
        end
        -- Pagamento de VIP
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

function getUserClothes(user_id)
    local data = vRP.getUData(user_id,"Clothings")
    if data then
        return json.decode(data)
    end
    return {}
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMMANDS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("admSkinshop",function (source)
	local user_id = getUserId(source)
    if user_id and (hasPermission(user_id,"Admin") or hasPermission(user_id,"admin.permissao")) then
        TriggerClientEvent("will_skinshop:openAdm",source)
    end
end, false)

RegisterCommand("skinshop",function(source,args)
    local user_id = getUserId(source)
    if user_id and (hasPermission(user_id,"Admin") or hasPermission(user_id,"admin.permissao")) then
        TriggerClientEvent("will_skinshop:openShop",source,"Creator")
    end
end, false)

local commands = {
    ['mascara'] = "skinshop:setMask",
    ['chapeu'] = "skinshop:setHat",
    ['oculos'] = "skinshop:setGlasses",
    ['maos'] = "skinshop:setArms",
    ['sapatos'] = "skinshop:setShoes",
    ['calcas'] = "skinshop:setPants",
    ['camisa'] = "skinshop:setShirt",
    ['jaqueta'] = "skinshop:setJacket",
    ['colete'] = "skinshop:setVest",
}

CreateThread(function()
    for command, event in pairs(commands) do
        RegisterCommand(command,function(source,args)
            local user_id = getUserId(source)
            if user_id and args[1] then
                if hasPermission(user_id,"roupas.permissao") or vRP.getInventoryItemAmount(user_id, "roupas") >= 1 then
                    TriggerClientEvent(event,source,tonumber(args[1]),tonumber(args[2]))
                else
                    TriggerClientEvent("Notify",source,"negado","Você não possui o item roupas",5000)
                end
            end
        end,false)
    end
end)
