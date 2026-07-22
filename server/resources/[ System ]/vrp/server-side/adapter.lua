local Groups = module('vrp',"config/Groups") or {}

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

vRP.setPermission = function(id,group,level)
    return vRP.addUserGroup(id,group,level)
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
    return vRP.numPermission(group)
end

vRP.hasGroup = function(user_id,group)
    return vRP.hasPermission(user_id,group)
end

vRP.addUserGroup = function(user, group, level)
    local source = vRP.getUserSource(parseInt(user))
    Reborn.setGroup(source, user, group, level, false)
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
    return vRP.getUserDataTable(Passport) or {}
end

function vRP.Kick(source,Reason)
    DropPlayer(source,Reason)
end

function vRP.HasPermission(Passport, Permission, Level)
    return vRP.hasPermission(Passport, Permission, Level)
end

function vRP.HasGroup(Passport, Permission, Level)
    return vRP.hasPermission(Passport, Permission, Level)
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
    if identity then
        return identity["name"].." "..identity["name2"]
    end
    return ""
end

function vRP.GetPhone(Passport)
    return vRP.getPhone(Passport)
end

function vRP.Account(License)
    local userAccount = vRP.getInfos(License)
    return {
        ['License'] = userAccount["identifier"],
        ['Chars'] = userAccount["chars"],
        ['Characters'] = userAccount["chars"],
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

function vRP.GetUserType(user_id,gtype)
    return vRP.GetUserHierarchy(user_id,gtype)
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
            return { itemData.count, itemData.name, itemData.slot }
        else
            local Inventory = vRP.Inventory(Passport) or {}
            for k, v in pairs(Inventory) do
                if splitString(Item, "-")[1] == splitString(v["item"], "-")[1] then
                    return { v["amount"], v["item"], v["slot"] }
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
    local Passport = parseInt(Passport)
	local Amount = parseInt(Amount) or 1
	local ItemAmount,ItemName,ItemSlot = table.unpack(vRP.InventoryItemAmount(Passport,Item))

	if ItemAmount >= Amount then
		return { Amount = ItemAmount, Item = ItemName, Slot = ItemSlot }
	end

	return false
end

function vRP.CleanSlot(Passport,Slot)
    local Passport = parseInt(Passport)
    local Slot = tostring(Slot)
    local source = vRP.Source(Passport)
    local Inventory = vRP.Inventory(Passport)

    if not (source and Inventory and Inventory[Slot]) then
        return false
    end

    local Item = Inventory[Slot].item
    local Amount = Inventory[Slot].amount

    Inventory[Slot] = nil

    if ItemTypeCheck(Item,"Armamento") or ItemTypeCheck(Item,"Arremesso") then
        TriggerClientEvent("inventory:verifyWeapon",source,Item)
    end

    if ItemUnique(Item) then
        vRP.RemSrvData(SplitUnique(Item))
    end

    local Execute = ItemExecute(Item)
    if Execute and Execute.Event and Execute.Type and not vRP.ConsultItem(Passport,Item) then
        if Execute.Type == "Client" then
            TriggerClientEvent(Execute.Event,source)
        else
            TriggerEvent(Execute.Event,source,Passport)
        end
    end

    if ItemExist(Item) then
        TriggerClientEvent("inventory:NotifyItem",source,{ Item,-Amount })
    end

    TriggerClientEvent("inventory:Update",source)

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
    return vRP.setSData(Key,json.encode(Data))
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

vRP.SetPermission = function(id,group,level)
    return vRP.addUserGroup(id,group,level)
end

vRP.RemovePermission = function(id,group)
    return vRP.removeUserGroup(id,group)
end

function vRP.DiscordAvatar(Passport)
    return ""
end

function vRP.Hierarchy(Permission)
    local Hierarchy = {}
    local GroupPerm = Groups[Permission]
    if GroupPerm and GroupPerm["Hierarchy"] then
        for level,v in ipairs(GroupPerm["Hierarchy"]) do
            Hierarchy[level] = v["Title"]
        end
    end
    return Hierarchy
end

function vRP.DataGroups(Permission)
    local UserGroups = {}
    local consult = vRP.query("vRP/get_specific_perm", { permiss = Permission })
    for _,v in pairs(consult) do
        UserGroups[v["user_id"]] = v.hierarchy
    end
    return UserGroups
end

function vRP.Permissions(Permission, Column)
    local Consult = exports["oxmysql"]:query_async("SELECT * FROM mdt_permissions WHERE Permission = @Permission", { Permission = Permission })[1] or {}
    local Default = {
        Members = 10,
        Experience = 0,
        Points = 0,
        Bank = 0,
        Premium = 0,
        Tags = 3,
        Announces = 3
    }
    if Column == "Premium" then
        return tonumber(Consult[Column]) or Default[Column]
    end
    return Consult[Column] and tonumber(Consult[Column]) or Default[Column] or 0
end

function vRP.PermissionsUpdate(Permission, Column, Mode, Amount)
    local Consult = exports["oxmysql"]:single_async("SELECT * FROM mdt_permissions WHERE Permission = @Permission LIMIT 1", { Permission = Permission })
    if not Consult then
        exports["oxmysql"]:query_async("INSERT INTO mdt_permissions (Permission, Tags, Announces) VALUES (@Permission, 3, 3)", { Permission = Permission })
    end

    if Column == "Premium" then
        local Premium
        if Mode == "+" then
            Premium = tonumber(Amount)
        else
            local current = tonumber(Consult.Premium) or 0
            Premium = math.max(current - tonumber(Amount), 0)
        end

        exports["oxmysql"]:query_async("UPDATE mdt_permissions SET Premium = @Value WHERE Permission = @Permission", { Permission = Permission, Value = Premium })
        return
    end

    if not Contains({ "Members", "Experience", "Points", "Bank", "Tags", "Announces" }, Column) then
        return
    end

	local Operation = Mode == "+" and "+" or "-"
	local Query = string.format("UPDATE mdt_permissions SET %s = GREATEST(%s %s @Amount, 0) WHERE Permission = @Permission", Column, Column, Operation)

    exports["oxmysql"]:query_async(Query, { Permission = Permission, Amount = parseInt(Amount) })
end

function vRP.AmountService(Permission,Level)
    local Amount = 0

    local PermissionParts = splitString(Permission,"-")
	if PermissionParts[2] then
		Permission,Level = PermissionParts[1],parseInt(PermissionParts[2])
	end
    local GroupPermission = Groups[Permission]

    if not GroupPermission then
		return Amount
	end

    if GroupPermission["Service"] then
        for Passport,Source in pairs(GroupPermission["Service"]) do
            if not Level then
			    Amount = Amount + 1
            else
                local UserLevel = vRP.HasPermission(Passport,Permission)
                if UserLevel and UserLevel == Level then
                    Amount = Amount + 1
                end
            end
        end
    end
	return Amount
end

function vRP.NameHierarchy(Permission,Level)
    if Groups[Permission] and Groups[Permission]["Hierarchy"] and Groups[Permission]["Hierarchy"][Level] then
        return Groups[Permission]["Hierarchy"][Level]["Title"]
    end
	return Permission
end

function vRP.HasTable(Passport,Table)
	for _,Permission in ipairs(Table) do
        local Check = splitString(Permission)
		local _,LevelParented = Check[1],Check[2] and parseInt(Check[2]) or nil
		local CurrentLevel = vRP.HasGroup(Passport,Permission)
        if CurrentLevel and (not LevelParented or CurrentLevel <= LevelParented) then
			return Permission
		end
	end
	return false
end

function vRP.SelectVehicle(Passport,Model)
	local consult = vRP.query("vRP/get_vehicles",{ user_id = Passport, vehicle = Model })
    if consult[1] then
        return consult[1]
    end
    return false
end

function vRP.DatatableInformation(Passport,Mode)
	local Passport = parseInt(Passport)

	return vRP.Datatable(Passport)[Mode]
end

function vRP.UpdateDatatable(Passport,Mode,Value)
	local Datatable = vRP.Datatable(Passport) or vRP.UserData(Passport,"Datatable")

	Datatable[Mode] = Value

	vRP.Query("playerdata/SetData",{ Passport = Passport, Name = "Datatable", Information = json.encode(Datatable) })
end

function vRP.InsertPrison(Passport,Amount)
	vRP.InitPrison(Passport,Amount)
end

function vRP.HasService(Passport,Permission)
    if Groups[Permission] and Groups[Permission]["Service"] then
        return Groups[Permission]["Service"][Passport]
    end
    return false
end

local Playing = {}

function vRP.Playing(Passport,Permission)
	local Return = 0
	local CurrentTimer = os.time()
	local Passport = tostring(Passport)
	local Consult = vRP.GetSrvData("Playing:"..Passport)
	local BaseTimer = Consult[Permission] or 0

	if Playing[Permission] and Playing[Permission][Passport] then
		Return = BaseTimer + (CurrentTimer - Playing[Permission][Passport])
	end

	return Return
end

function vRP.Update(Name,Params)
    return vRP.Query(Name,Params)
end

function vRP.SingleQuery(Name,Params)
	return vRP.Query(Name,Params)[1]
end

function vRP.ServiceToggle(source,Passport,Permission,Silenced)
	local Permission = SplitOne(Permission)
	local Group = Groups[Permission]
	if not Group then return end
	if Group.Service and Group.Service[Passport] then
		vRP.ServiceLeave(source,Passport,Permission,Silenced)
	elseif vRP.HasPermission(Passport,Permission) then
		vRP.ServiceEnter(source,Passport,Permission,Silenced)
	end
end

function vRP.ServiceEnter(source,Passport,Permission,Silenced)
	local Group = Groups[Permission]
	if not Group then return end

	local CurrentTimer = os.time()

	if not Playing[Permission] then
		Playing[Permission] = {}
	end

	Playing[Permission][Passport] = Playing[Permission][Passport] or CurrentTimer

	if Group.Service then
		Group.Service[Passport] = source
		TriggerClientEvent("service:Client",source,Permission,true)
	end

	if not Silenced then
		TriggerClientEvent("Notify",source,"Central de Empregos","Você acaba de dar inicio a sua jornada de trabalho, lembrando que a sua vida não se resume só a isso.","default",5000)
	end
end

function vRP.ServiceLeave(source,Passport,Permission,Silenced)
	local Group = Groups[Permission]
	if not Group then return end

	local CurrentTimer = os.time()

	if not Playing[Permission] then
		Playing[Permission] = {}
	end

	if Playing[Permission][Passport] then
		local Consult = vRP.GetSrvData("Playing:"..Passport)
		Consult[Permission] = (Consult[Permission] or 0) + (CurrentTimer - Playing[Permission][Passport])
		vRP.SetSrvData("Playing:"..Passport,Consult)

		Playing[Permission][Passport] = nil
	end

	if Group.Service and Group.Service[Passport] then
		TriggerClientEvent("service:Client",source,Permission,false)
		Group.Service[Passport] = nil
	end

	if not Silenced then
		TriggerClientEvent("Notify",source,"Central de Empregos","Você acaba finalizar sua jornada de trabalho, esperamos que você tenha aprendido bastante hoje.","default",5000)
	end
end
