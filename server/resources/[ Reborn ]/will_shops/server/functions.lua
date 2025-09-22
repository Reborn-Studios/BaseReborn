
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
        identity.name2 = identity.firstname or identity.Lastname or ""
    end
    if not identity.name then
        identity.name = identity.Firstname or ""
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
        notify(source, "Denied", Config.Notify['NoWeight'])
    end
end

function getItemName(item)
    if itemName and type(itemName) == "function" then
        return itemName(item)
    elseif vRP.itemNameList then
        return vRP.itemNameList(item) or item
    end
    return item
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
    if type(itemWeight) == "function" then
        return itemWeight(item)
    end
    if itemsWeight[item] then
        return itemsWeight[item]
    end
    if vRP.itemWeightList then
        return vRP.itemWeightList(item) or 0.5
    end
    return 0.5
end

function tryPayment(user_id, price)
    if Config.base == "cn" then
        return vRP.PaymentFull(user_id, parseInt(price))
    elseif Config.base == "summerz" then
        return vRP.paymentFull(user_id, parseInt(price))
    end
	return vRP.tryFullPayment(user_id, parseInt(price))
end

function paymentBuyShop(user_id, value, shop)
    return tryPayment(user_id, value)
end

function getUserMoney(user_id)
    if Config.base == "cn" then
        return vRP.InventoryItemAmount(user_id,"dollars")[1]
    elseif Config.base == "summerz" then
        return vRP.itemAmount(user_id, "dollars")
    end
    return vRP.getInventoryItemAmount(user_id, "dollars")
end

function giveUserMoney(user_id, money)
    if Config.base == "cn" then
        vRP.GiveBank(user_id, money)
    elseif Config.base == "vrpex" then
        vRP.giveBankMoney(user_id, money)
    else
        vRP.addBank(user_id, money)
    end
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
        vRP.Query(name, data)
    else
        vRP.execute(name, data)
    end
end

function spawnVehicle(vehName, coords)
    local debugVehicle = 0
    local mHash = GetHashKey(vehName)
    local nveh = CreateVehicle(mHash,coords,true,true)
    while not DoesEntityExist(nveh) and debugVehicle <= 80 do
        debugVehicle = debugVehicle + 1
        Citizen.Wait(100)
    end
    if DoesEntityExist(nveh) then
        local vehPlate = "SHOPS"..math.random(100,999)
        SetVehicleNumberPlateText(nveh,vehPlate)
        TriggerEvent("setPlateEveryone",vehPlate)
        TriggerEvent("plateEveryone",vehPlate)
        SetVehicleDoorsLocked(nveh,1)
        return NetworkGetNetworkIdFromEntity(nveh)
    end
end

function deleteVehicle(vehNet)
    local nveh = NetworkGetEntityFromNetworkId(vehNet)
    if DoesEntityExist(nveh) then
        DeleteEntity(nveh)
    end
end

function request(source,text)
    if Config.base == "cn" then
        return vRP.Request(source,text,30)
    end
    return vRP.request(source,text,30)
end

--#####################
--## SYNC OX_INVENTORY
--#####################

local function registerShop(ShopId, data)
    local products = {}
    for item,price in pairs(data) do
        table.insert(products, {
            name = item,
            price = price,
        })
    end
    exports.ox_inventory:RegisterShop(ShopId, {
        name = splitString(ShopId,"_")[1],
        inventory = products,
        locations = {
            Config.Shops[ShopId]['buy_products_coords'],
        },
    })
end

AddStateBagChangeHandler("Will_Shops","",function (_,_,value)
    for ShopId,data in pairs(value) do
        registerShop(ShopId, data['products'])
    end
end)

AddStateBagChangeHandler("Will_Shops_Products","",function (_,_,value)
    for ShopId,data in pairs(value) do
        registerShop(ShopId, data)
    end
end)

AddEventHandler("onResourceStart",function(rs)
	if rs == "ox_inventory" then
        Wait(1000)
        for ShopId,data in pairs(GlobalState["Will_Shops_Products"]) do
            registerShop(ShopId, data)
        end
	end
end)
