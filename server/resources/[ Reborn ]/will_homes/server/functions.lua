-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")

-----------------------------------
--########## Funções vRP ##########
-----------------------------------

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
    if Config.base == "summerz" then
		return vRP.userIdentity(user_id)
    elseif Config.base == "cn" then
        return vRP.Identity(user_id)
	end
	return vRP.getUserIdentity(user_id)
end

function hasPermission(user_id, perm)
    if Config.base == "cn" then
        return vRP.HasPermission(user_id, perm)
	end
    return vRP.hasPermission(user_id, perm)
end

function getPolicesByPermission()
    return vRP.getUsersByPermission("policia.permissao")
end

function paymentMethod(user_id, price)
    local payment = nil
    if Config.base == "creative" or Config.base == "summerz" then
        payment = vRP.paymentBank(parseInt(user_id),price)
    elseif Config.base == "vrpex" then
        payment = vRP.tryFullPayment(parseInt(user_id),price)
    elseif Config.base == "cn" then
        payment = vRP.PaymentFull(parseInt(user_id),price)
    end
    if not payment then
        local nplayer = getUserSource(user_id)
        TriggerClientEvent("Notify",nplayer,"negado","Dinheiro insuficiente",5000)
    end
    return payment
end

function addBank(user_id, amount)
    local nplayer = getUserSource(user_id)
    if nplayer then
        if Config.base == "creative" or Config.base == "summerz" then
            vRP.addBank(user_id, amount)
        elseif Config.base == "vrpex" then
            vRP.giveBankMoney(user_id, amount)
        elseif Config.base == "cn" then
            vRP.GiveBank(user_id, amount)
        end
        TriggerClientEvent("Notify",nplayer,"payment","Dinheiro recebido R$"..amount,5000)
    end
end

function getInventoryWeigth(user_id)
    if Config.base == "summerz" then
        return vRP.inventoryWeight(user_id)
    elseif Config.base == "creative" then
        return vRP.computeInvWeight(user_id)
    elseif Config.base == "cn" then
        return vRP.InventoryWeight(user_id)
    else
        return vRP.getInventoryWeight(user_id)
    end
end

function getItemWeight(item)
    return vRP.itemWeightList and vRP.itemWeightList(item) or 0.5
end

function getInventoryMaxWeight(user_id)
    if Config.base == "summerz" then
        return vRP.getWeight(user_id)
    elseif Config.base == "creative" then
        return vRP.getBackpack(user_id)
    elseif Config.base == "cn" then
        return vRP.GetWeight(user_id)
    else
        return vRP.getInventoryMaxWeight(user_id)
    end
end

function getUserBank(user_id)
    if Config.base == "cn" then
        return vRP.GetBank(user_id)
    end
    return vRP.getBankMoney(user_id)
end

function getNearestPlayers(source)
    local result = {}
    local users = vCLIENT.nearestPlayers(source, 4)
    if users then
        for k,v in pairs(users) do
            local nuser_id = getUserId(k)
            local identity = getUserIdentity(nuser_id)
            table.insert(result, { id = nuser_id, name = identity.name })
        end
    end
    return result
end

function prepare(name, query)
    if Config.base == "cn" then
        return vRP.Prepare(name, query)
    end
    vRP.prepare(name, query)
end

function query(name, data)
    if Config.base == "cn" then
        return vRP.Query(name, data)
    end
    return vRP.query(name, data)
end

function execute(name, data)
    if Config.base == "cn" then
        return vRP.Query(name, data)
    end
    vRP.execute(name, data)
end

function request(source,text,time)
    if Config.base == "cn" then
        return vRP.Request(source,text,time)
    end
    return vRP.request(source,text,time)
end

CreateThread(function()
    -- AddEventHandler("playerConnect",playerSpawn)
    -- AddEventHandler("Connect",playerSpawn)
    AddEventHandler("vRP:playerSpawn",playerSpawn)
end)

function SendDiscord(text, text2)
    local Weebhok = ""
	local ts = os.time()
	local time = os.date('%Y-%m-%d %H:%M:%S', ts)
	local avatar = 'https://cdn.discordapp.com/attachments/796797155100327976/875550178264903730/unknown.png'
    local embeds = {
        { 
            ["title"] = "Imobiliaria",
            ["type"] = "Reborn Shop",

            ["thumbnail"] = {
            	["url"] = avatar
            }, 

            ["fields"] = {
                { 
                    ["name"] = text,
                    ["value"] = text2
                }
            },

            ["footer"] = { 
                ["text"] = os.date("%H:%M:%S - %d/%m/%Y"),
                ["icon_url"] = avatar
            },

            ["color"] =  12422

        }
    }
    PerformHttpRequest(Config.Weebhok, function(Error, Content, Hand) end, 'POST', json.encode({username = "Reborn Shop", embeds = embeds, avatar_url = avatar}), { ['Content-Type'] = 'application/json' })
end
