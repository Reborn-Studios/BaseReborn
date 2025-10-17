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

vRP.Players = function()
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
    Reborn.setGroup(source, group, false, user)
end

vRP.removeUserGroup = function(user,group)
    local source = vRP.getUserSource(parseInt(user))
    Reborn.remGroup(source,group,user)
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
    local result = vRP.getUData(Passport, Key)
    return json.decode(result) or {}
end

function vRP.GetHealth(source)
    local Ped = GetPlayerPed(source)
    if Ped then
        return GetEntityHealth(Ped)
    end
end

function vRP.ModelPlayer(source)
    local GetPlayerPed = GetPlayerPed(source)
    if GetEntityModel(GetPlayerPed) == GetHashKey("mp_f_freemode_01") then
        return "mp_f_freemode_01"
    elseif GetEntityModel(GetPlayerPed) == GetHashKey("mp_m_freemode_01") then
        return "mp_m_freemode_01"
    end
end

function vRP.SetArmour(source,Amount)
    local GetPlayerPed = GetPlayerPed(source)
    if GetPedArmour(GetPlayerPed) + Amount > 100 then
        Amount = 100 - GetPedArmour(GetPlayerPed)
    end
    SetPedArmour(GetPlayerPed,GetPedArmour(GetPlayerPed) + Amount)
end

function vRP.Teleport(source,x,y,z)
    local GetPlayerPed = GetPlayerPed(source)
    SetEntityCoords(GetPlayerPed, x + 1.0E-4, y + 1.0E-4, z + 1.0E-4, false, false, false, false)
end

function vRP.GetEntityCoords(source)
    local GetPlayerPed = GetPlayerPed(source)
    return GetEntityCoords(GetPlayerPed)
end

function vRP.InsideVehicle(source)
    local GetPlayerPed = GetPlayerPed(source)
    if 0 == GetVehiclePedIsIn(GetPlayerPed, false) then
        return false
    end
    return true
end

local Objects = {}

function tvRP.CreateObject(Model,x,y,z,Weapon)
    local Passport = vRP.Passport(source)
    if Passport then
        local spawnObjects = 0
        local hash = GetHashKey(Model)
        local object = CreateObject(hash,x,y,z,true,true,false)

        while not DoesEntityExist(object) and spawnObjects <= 1000 do
            spawnObjects = spawnObjects + 1
            Wait(1)
        end
        local network = NetworkGetNetworkIdFromEntity(object)
        if DoesEntityExist(object) then
            if Weapon then
                if not Objects[Passport] then
                    Objects[Passport] = {}
                end
                Objects[Passport][Weapon] = network
            else
                if not Objects[Passport] then
                    Objects[Passport] = {}
                end
                Objects[Passport][network] = true
            end
            return true,network
        end
    end
    return false
end

RegisterServerEvent("DeleteObject")
AddEventHandler("DeleteObject",function(index,value)
    local source = source
    local Passport = vRP.Passport(source)
    if Passport then
        if value and Objects[Passport] and Objects[Passport][value] then
            index = Objects[Passport][value]
            Objects[Passport][value] = nil
        end
    end
    TriggerEvent("DeleteObjectServer",index)
end)

AddEventHandler("DeleteObjectServer",function(entIndex)
    local NetworkGetEntityFromNetworkId = NetworkGetEntityFromNetworkId(entIndex)
    if DoesEntityExist(NetworkGetEntityFromNetworkId) and not IsPedAPlayer(NetworkGetEntityFromNetworkId) and 3 == GetEntityType(NetworkGetEntityFromNetworkId) then
        DeleteEntity(NetworkGetEntityFromNetworkId)
    end
end)

AddEventHandler("DebugObjects",function(value)
    if Objects[value] then
        for k,v in pairs(Objects[value]) do
            Objects[value][k] = nil
            TriggerEvent("DeleteObjectServer", k)
        end
    end
end)

AddEventHandler("DebugWeapons",function(value)
    if Objects[value] then
        for k,v in pairs(Objects[value]) do
            TriggerEvent("DeleteObjectServer", v)
            Objects[value] = nil
        end
        Objects[value] = nil
    end
end)

RegisterServerEvent("DeletePed")
AddEventHandler("DeletePed",function(entIndex)
    local NetworkGetEntityFromNetworkId = NetworkGetEntityFromNetworkId(entIndex)
    if DoesEntityExist(NetworkGetEntityFromNetworkId) and not IsPedAPlayer(NetworkGetEntityFromNetworkId) and 1 == GetEntityType(NetworkGetEntityFromNetworkId) then
        DeleteEntity(NetworkGetEntityFromNetworkId)
    end
end)

RegisterServerEvent("CleanVehicle")
AddEventHandler("CleanVehicle",function(entIndex)
	if DoesEntityExist(NetworkGetEntityFromNetworkId(entIndex)) and not IsPedAPlayer(NetworkGetEntityFromNetworkId(entIndex)) and 2 == GetEntityType(NetworkGetEntityFromNetworkId(entIndex)) then
		SetVehicleDirtLevel(NetworkGetEntityFromNetworkId(entIndex),0.0)
	end
end)

function vRP.Query(name, query)
    return vRP.query(name, query)
end

function vRP.Prepare(name, query)
    return vRP.prepare(name, query)
end

function vRP.Datatable(Passport)
    return vRP.getUserDataTable(Passport)
end

function vRP.Kick(source,Reason)
    DropPlayer(source,Reason)
end

function vRP.HasPermission(Passport, Permission)
    return vRP.hasPermission(Passport, Permission)
end

function vRP.HasGroup(Passport, Permission)
    return vRP.hasPermission(Passport, Permission)
end

function vRP.Identities(source)
    local Result = nil
    local Identifiers = GetPlayerIdentifiers(source)
    local baseIdentifier = GlobalState['Basics']['Identifier'] or "steam"
    for _, v in pairs(Identifiers) do
        if string.find(v,baseIdentifier) then
            Result = tostring(v)
            break
        end
    end
    return Result
end

function vRP.Inventory(Passport)
    return vRP.getInventory(Passport)
end

function vRP.InventoryWeight(id)
    return vRP.computeInvWeight(id)
end

function vRP.GetWeight(id)
    return vRP.getBackpack(id)
end

vRP.CharacterChosen = function(source,Passport,Model)
    TriggerEvent("baseModule:idLoaded",source,Passport,Model)
end

function vRP.Identity(Passport)
    local identity = vRP.getUserIdentity(Passport)
    return {
        ['License'] = identity["license"],
        ['Name'] = identity["name"],
        ['Name2'] = identity["name2"],
        ['Phone'] = identity["phone"],
        ['Registration'] = identity["registration"],
        ['Bank'] = identity["bank"],
        ['Fines'] = identity["fines"],
        ['Prison'] = identity["prison"],
    }
end

function vRP.FullName(Passport)
    local identity = vRP.getUserIdentity(Passport)
    return identity["name"].." "..identity["name2"]
end

function vRP.GetPhone(Passport)
    return vRP.getPhone(Passport)
end

function vRP.Account(License)
    local userAccount = vRP.getInfos(License)
    return {
        ['License'] = userAccount["identifier"],
        ['Chars'] = userAccount["chars"],
        ['Premium'] = userAccount["premium"],
        ['Whitelist'] = userAccount["whitelist"],
        ['Gemstone'] = userAccount["gems"]
    }
end

function vRP.GetUserHierarchy(user_id,gtype)
    if gtype == "Premium" then
        return vRP.getUserGroupByType(user_id,"vip")
    end
    return vRP.getUserGroupByType(user_id,"job")
end

function vRP.InitPrison(Passport,Amount)
    vRP.initPrison(Passport,Amount)
end

function vRP.UpdatePrison(Passport,Amount)
    vRP.updatePrison(Passport,Amount)
end

function vRP.UpgradeChars(source)
    local user_id = vRP.getUserd(source)
	local UserIdentity = vRP.getUserIdentity(user_id)
	if UserIdentity then
		vRP.execute("accounts/infosUpdatechars",{ identifier = UserIdentity["identifier"] })
	end
end

function vRP.UserGemstone(License)
    return vRP.userGemstone(License)
end

function vRP.UpgradeGemstone(Passport,Amount)
    vRP.upgradeGemstone(Passport,Amount)
end

function vRP.UpgradeNames(Passport,Name,Name2)
    vRP.upgradeNames(Passport,Name,Name2)
end

function vRP.UpgradePhone(Passport,Phone)
    vRP.upgradePhone(Passport,Phone)
end

function vRP.PassportPlate(Plate)
    return vRP.getVehiclePlate(Plate)
end

function vRP.UserPhone(Phone)
    return vRP.getUserByPhone(Phone)
end

function vRP.GenerateString(Format)
    return vRP.generateStringNumber(Format)
end

function vRP.GeneratePlate()
    return vRP.genPlate()
end

function vRP.GeneratePhone()
    return vRP.generatePhoneNumber()
end

function vRP.GiveBank(id, amount)
    return vRP.giveBankMoney(id, amount)
end

function vRP.RemoveBank(id, amount)
    return vRP.paymentBank(id, amount)
end

function vRP.GetBank(source)
    local id = vRP.getUserId(source)
    return vRP.getBank(id)
end

function vRP.GetFine(source)
    local id = vRP.getUserId(source)
    return vRP.getFines(id)
end

function vRP.GiveFine(id, amount)
    return vRP.setFines(id, amount)
end

function vRP.RemoveFine(Passport,Amount)
    local Fines = vRP.getFines(Passport)
    local NewFines = Fines - Amount
    if NewFines < 0 then
        NewFines = 0
    end
    vRP.setFines(Passport, NewFines)
end

function vRP.PaymentGems(Passport,Amount)
    return vRP.remGmsId(Passport,Amount)
end

function vRP.PaymentGemstone(Passport,Amount)
    return vRP.remGmsId(Passport,Amount)
end

function vRP.PaymentBank(id, amount)
    return vRP.paymentBank(id, amount)
end

function vRP.PaymentMoney(id, amount)
    return vRP.tryFullPayment(id, amount)
end

function vRP.PaymentDirty(Passport,Amount)
    return vRP.tryGetInventoryItem(Passport,"dollars2",Amount)
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

function vRP.InventoryFull(Passport, Item)
    if vRP.Source(Passport) then
        local Inventory = vRP.Inventory(Passport) or {}
        for k,v in pairs(Inventory) do
            if v["item"] == Item then
                return true
            end
        end
    end
    return false
end

function vRP.ItemAmount(Passport,Item)
    if vRP.Source(Passport) then
        local Inventory = vRP.Inventory(Passport) or {}
        for k,v in pairs(Inventory) do
            if splitString(v["item"], "-")[1] == splitString(Item, "-")[1] then
                return v["amount"]
            end
        end
    end
    return 0
end

function vRP.ConsultItem(Passport, Item, Amount)
    if vRP.Source(Passport) then
        if Amount > vRP.InventoryItemAmount(Passport,Item)[1] then
            return false
        end
    end
    return true
end

function vRP.Request(source,Message,Accept,Reject)
	return vRP.request(source,Message,30)
end

SURVIVAL = Tunnel.getInterface("Survival")

function vRP.Revive(source,Health,Arena)
	return SURVIVAL.revivePlayer(source,Health,Arena)
end

function vRP.GenerateItem(id,item,amount,notify)
    return vRP.giveInventoryItem(id,item,amount,notify)
end

function vRP.GiveItem(Passport,Item,Amount,Notify,Slot)
    return vRP.giveInventoryItem(Passport,Item,Amount,Notify)
end

function vRP.TakeItem(Passport,Item,Amount,Notify,Slot)
    return vRP.tryGetInventoryItem(Passport,Item,Amount,Notify)
end

function vRP.RemoveItem(Passport,Item,Amount,Notify)
    vRP.removeInventoryItem(Passport,Item,Amount,Notify)
end

function vRP.MaxItens(Passport,Item,Amount)
    return true
end

function vRP.TakeChest(Passport,Data,Amount,Slot,Target)
    return vRP.tryChestItem(Passport,Data,Amount,Slot,Target)
end

function vRP.StoreChest(Passport,Data,Amount,Weight,Slot,Target)
    return vRP.storeChestItem(Passport,Data,Amount,Weight,Slot,Target)
end

function vRP.UpdateChest(Passport,Data,Slot,Target,Amount)
    return vRP.updateChest(Passport,Data,Slot,Target,Amount)
end

vRP.GetSrvData = function(key)
    return json.decode(vRP.getSData(key)) or {}
end

function vRP.SetSrvData(Key,Data)
    return vRP.setSData(Key,Data)
end

function vRP.RemSrvData(Key)
    vRP.setSData(Key,'[]')
end

function vRP.ClearInventory(Passport)
    vRP.clearInventory(Passport)
end

function vRP.UpgradeThirst(Passport,Amount)
    vRP.upgradeThirst(Passport,Amount)
end

function vRP.UpgradeHunger(Passport,Amount)
    vRP.upgradeHunger(Passport,Amount)
end

function vRP.UpgradeStress(Passport,Amount)
    vRP.upgradeStress(Passport,Amount)
end

function vRP.DowngradeThirst(Passport,Amount)
    vRP.downgradeThirst(Passport,Amount)
end

function vRP.DowngradeHunger(Passport,Amount)
    vRP.downgradeHunger(Passport,Amount)
end

function vRP.DowngradeStress(Passport,Amount)
    vRP.downgradeStress(Passport,Amount)
end

-- ##########
-- GROUPS
-- ##########

function vRP.NumPermission(Permission)
    local Services = {}
    local Amount = 0
    for i,v in pairs(vRP.Players()) do
        local Passport = vRP.Passport(v)
        if vRP.HasGroup(Passport,Permission) then
            Amount = Amount + 1
            Services[Passport] = v
        end
    end
    return Services,Amount
end

vRP.SetPermission = function(id,group)
    return vRP.addUserGroup(id,group)
end

vRP.RemovePermission = function(id,group)
    return vRP.removeUserGroup(id,group)
end

function vRP.DiscordAvatar(Passport)
    return ""
end

function vRP.Hierarchy(Permission)
    if Groups[Permission] and Groups[Permission]["Hierarchy"] then
        return Groups[Permission]["Hierarchy"]
    end
    return false
end

function vRP.DataGroups(Permission)
    local consult = vRP.query("vRP/get_specific_perm", { permiss = Permission })
    local UserGroups = {}
    if consult[1] then
        for k,v in pairs(consult) do
            UserGroups[v.user_id] = 1
        end
    end
    return UserGroups
end

function vRP.Permissions()

end

function vRP.AmountService(Perm,Grade)

end