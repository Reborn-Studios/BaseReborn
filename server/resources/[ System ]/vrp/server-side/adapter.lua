function exportHandler(resource, exportName, func)
    AddEventHandler(('__cfx_export_%s_%s'):format(resource,exportName), function(setCB)
        setCB(func)
    end)
end
-------##########-------##########-------##########-------##########
--						CREATIVE -> VRP
-------##########-------##########-------##########-------##########

-- MONEY

vRP.giveBankMoney = function(id, price)
    vRP.addBank(id, price)
end

vRP.setBankMoney = function(id, price)
    vRP.setBank(id, price)
end

vRP.getMoney = function(user_id)
	return vRP.getInventoryItemAmount(user_id,'dollars')
end

vRP.setMoney = function(user_id,value)
    local money = vRP.getMoney(user_id)
    if vRP.tryGetInventoryItem(user_id, 'dollars', money) then
        vRP.giveMoney(user_id, value)
    end
end

vRP.getBankMoney = function(id)
    return vRP.getBank(id)
end

vRP.tryPayment = function(id, price)
    return vRP.paymentBank(id, price)
end

function vRP.giveMoney(user_id, amount)
    if parseInt(amount) > 0 then
        vRP.giveInventoryItem(user_id, "dollars", parseInt(amount))
    end
end

-- INVENTORY

vRP.getItemWeight = function(item)
    return vRP.itemWeightList(item)
end

vRP.getInventoryWeight = function(id)
    return vRP.computeInvWeight(id)
end

vRP.computeItemsWeight = function(items)
    return vRP.computeChestWeight(items)
end

vRP.getInventoryMaxWeight = function(id)
    return vRP.getBackpack(id)
end

-- IDENTITY

vRP.getUserByRegistration = function(id)
    return vRP.getUserIdRegistration(id)
end

-- CREATIVE V5

vRP.checkBanned = function(id)
    return vRP.isBanned(id)
end

vRP.userData = function(id,key)
    return vRP.getUData(id,key)
end

vRP.infoAccount = function(id)
    return vRP.getInfos(id)
end

vRP.userInventory = function(id)
    return vRP.getInventory(id)
end

vRP.userPlayers = function()
    return vRP.getUsers()
end

vRP.userSource = function(id)
    return vRP.getUserSource(id)
end

vRP.getDatatable = function(id)
    return vRP.getUserDataTable(id)
end

vRP.userIdentity = function(id)
    return vRP.getUserIdentity(id)
end

vRP.generateItem = function(id,item,amount,notify)
    return vRP.giveInventoryItem(id,item,amount,notify)
end

vRP.userBank = function(id)
    return vRP.getBank(id)
end

vRP.setPermission = function(id,group)
    return vRP.addUserGroup(id,group)
end

vRP.remPermission = function(id,group)
    return vRP.removeUserGroup(id,group)
end

vRP.updatePermission = function(user_id,perm,new)
    if vRP.hasPermission(user_id,perm) then
        vRP.removeUserGroup(user_id,perm)
        vRP.addUserGroup(user_id,new)
    end
end

vRP.characterChosen = function(source,user_id,model,locate)
    TriggerEvent("baseModule:idLoaded",source,user_id,model)
end

vRP.userPlate = function(data)
    return vRP.getVehiclePlate(data)
end

vRP.userPhone = function(data)
    return vRP.getUserByPhone(data)
end

vRP.generatePlate = function()
    return vRP.generatePlateNumber()
end

vRP.generatePhone = function()
    return vRP.generatePhoneNumber()
end

vRP.generateSerial = function()
    return vRP.generateRegistrationNumber()
end

vRP.userSerial = function(id)
    return vRP.getUserIdRegistration(id)
end

vRP.getSrvdata = function(key)
    return vRP.getSData(key)
end

vRP.setSrvdata = function(key,value)
    return vRP.setSData(key,value)
end

vRP.remSrvdata = function(key)
    vRP.setSData(key,'[]')
end

vRP.getWeight = function(id)
    return vRP.getBackpack(id)
end

vRP.setWeight = function(id,amount)
    return vRP.setBackpack(id,amount)
end

vRP.inventoryWeight = function(id)
    return vRP.computeInvWeight(id)
end

vRP.chestWeight = function(id)
    return vRP.computeChestWeight(id)
end

vRP.tryChest = function(user_id,chestData,itemName,amount,slot)
    return vRP.tryChestItem(user_id,chestData,itemName,amount,slot)
end

vRP.storeChest = function(user_id,chestData,itemName,amount,chest,slot)
    return vRP.storeChestItem(user_id,chestData,itemName,amount,chest,slot)
end

vRP.updateChest = function(user_id,chestData,itemName,amount,chest,slot)
    return vRP.storeChestItem(user_id,chestData,itemName,amount,chest,slot)
end

vRP.paymentFull = function(id,amount)
    return vRP.paymentBank(id,amount)
end

-------##########-------##########-------##########-------##########
--							PERMISSIONS
-------##########-------##########-------##########-------##########

vRP.getUsersByPermission = function(group)
    if string.find(group, ".permissao") then
        local users = {}
        for k,v in pairs(vRP.rusers) do
            if vRP.hasPermission(tonumber(k), group) then
                table.insert(users,tonumber(k))
            end
        end
        return users
    end
    return vRP.numPermission(group) 
end

vRP.hasGroup = function(user_id,group)
    return vRP.hasPermission(user_id,group)
end

vRP.addUserGroup = function(user, group)
    local source = vRP.getUserSource(parseInt(user))
    Reborn.setGroup(source, group)
end

vRP.removeUserGroup = function(user,group)
    local source = vRP.getUserSource(parseInt(user))
    Reborn.remGroup(source,group)
end
-------##########-------##########-------##########-------##########
--			CREATIVE NETWORK -> VRP
-------##########-------##########-------##########-------##########

function vRP.Source(Passport)
    return vRP.getUserSource(Passport)
end

function vRP.Passport(Source)
    return vRP.getUserId(Source)
end

function vRP.UserData(Passport, Key)
    return vRP.getUData(Passport, Key)
end

function vRP.Query(name, query)
    return vRP.query(name, query)
end

function vRP.Prepare(name, query)
    return vRP.prepare(name, query)
end

function vRP.Datatable(Passport)
    return vRP.getUserDataTable(Passport)
end

function vRP.HasPermission(Passport, Permission)
    return vRP.hasPermission(Passport, Permission)
end

function vRP.Identities(source)
    local Result = false
    local Identifiers = GetPlayerIdentifiers(source)
    for _, v in pairs(Identifiers) do
        if string.find(v,BaseMode) then
            local SplitName = splitString(v, ":")
            Result = SplitName[2]
            break
        end
    end
    return Result
end

function vRP.Inventory(Passport)
    return vRP.getInventory(Passport)
end

vRP.CharacterChosen = function(source,Passport,Model)
    TriggerEvent("baseModule:idLoaded",source,Passport,Model)
end

function vRP.Identity(Passport)
    return vRP.getUserIdentity(Passport)
end

function vRP.InitPrison(Passport,Amount)
    vRP.initPrison(Passport,Amount)
end

function vRP.UpdatePrison(Passport,Amount)
    vRP.updatePrison(Passport,Amount)
end

function vRP.GiveBank(id, amount)
    return vRP.giveBankMoney(id, amount)
end

function vRP.RemoveBank(id, amount)
    return vRP.paymentBank(id, amount)
end

function vRP.GetBank(id)
    return vRP.getBank(id)
end

function vRP.GetFine(id)
    return vRP.getFines(id)
end

function vRP.GiveFine(id, amount)
    return vRP.setFines(id, amount)
end

function vRP.PaymentBank(id, amount)
    return vRP.paymentBank(id, amount)
end

function vRP.PaymentMoney(id, amount)
    return vRP.tryFullPayment(id, amount)
end

function vRP.PaymentFull(id, amount)
    return vRP.tryFullPayment(id, amount)
end

function vRP.WithdrawCash(id, amount)
    return vRP.withdrawCash(id, amount)
end

-- ##########
-- INVENTORY
-- ##########

function vRP.InventoryItemAmount(Passport, Item)
    local Source = vRP.Source(Passport)
    if Source then
        if GetResourceState("ox_inventory") == "started" then
            local itemData = exports.ox_inventory:GetItem(Source, Item, nil, false)
            return { itemData.count, itemData.name }
        else
            local Inventory = vRP.Inventory(Passport) or {}
            for k, v in pairs(Inventory) do
                if splitString(Item, "-")[1] == splitString(v["item"], "-")[1] then
                    return { v["amount"], v["item"] }
                end
            end
        end
    end
    return { 0,"" }
end

function vRP.ConsultItem(Passport, Item, Amount)
    if vRP.Source(Passport) then
        if Amount > vRP.InventoryItemAmount(Passport,Item)[1] then
            return false
       --[[  elseif vRP.CheckDamaged(vRP.InventoryItemAmount(Passport,Item)[1]) then
            return false ]]
        end
    end
    return true
end

function vRP.Request(source,Message,Accept,Reject)
	return vRP.request(source,Message,30)
end