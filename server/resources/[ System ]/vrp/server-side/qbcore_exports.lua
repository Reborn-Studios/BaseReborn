exportHandler("qb-core","GetCoreObject", function()
    return QBCore
end)

-- Add or change (a) method(s) in the QBCore.Functions table
local function SetMethod(methodName, handler)
    if type(methodName) ~= "string" then
        return false, "invalid_method_name"
    end

    QBCore.Functions[methodName] = handler

    TriggerEvent('QBCore:Server:UpdateObject')

    return true, "success"
end

QBCore.Functions.SetMethod = SetMethod
exportHandler("qb-core","SetMethod", SetMethod)

-- Add or change (a) field(s) in the QBCore table
local function SetField(fieldName, data)
    if type(fieldName) ~= "string" then
        return false, "invalid_field_name"
    end

    QBCore[fieldName] = data

    TriggerEvent('QBCore:Server:UpdateObject')

    return true, "success"
end

QBCore.Functions.SetField = SetField
exportHandler("qb-core", "SetField", SetField)

-- Single add job function which should only be used if you planning on adding a single job
local function AddJob(jobName, job)
    if type(jobName) ~= "string" then
        return false, "invalid_job_name"
    end

    if QBCore.Shared.Jobs[jobName] then
        return false, "job_exists"
    end

    QBCore.Shared.Jobs[jobName] = job

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Jobs', jobName, job)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.AddJob = AddJob
exportHandler("qb-core", 'AddJob', AddJob)

-- Multiple Add Jobs
local function AddJobs(jobs)
    local shouldContinue = true
    local message = "success"
    local errorItem = nil

    for key, value in pairs(jobs) do
        if type(key) ~= "string" then
            message = 'invalid_job_name'
            shouldContinue = false
            errorItem = jobs[key]
            break
        end

        if QBCore.Shared.Jobs[key] then
            message = 'job_exists'
            shouldContinue = false
            errorItem = jobs[key]
            break
        end

        QBCore.Shared.Jobs[key] = value
    end

    if not shouldContinue then return false, message, errorItem end
    TriggerClientEvent('QBCore:Client:OnSharedUpdateMultiple', -1, 'Jobs', jobs)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, message, nil
end

QBCore.Functions.AddJobs = AddJobs
exportHandler("qb-core", 'AddJobs', AddJobs)

-- Single Remove Job
local function RemoveJob(jobName)
    if type(jobName) ~= "string" then
        return false, "invalid_job_name"
    end

    if not QBCore.Shared.Jobs[jobName] then
        return false, "job_not_exists"
    end

    QBCore.Shared.Jobs[jobName] = nil

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Jobs', jobName, nil)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.RemoveJob = RemoveJob
exportHandler("qb-core", 'RemoveJob', RemoveJob)

-- Single Update Job
local function UpdateJob(jobName, job)
    if type(jobName) ~= "string" then
        return false, "invalid_job_name"
    end

    if not QBCore.Shared.Jobs[jobName] then
        return false, "job_not_exists"
    end

    QBCore.Shared.Jobs[jobName] = job

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Jobs', jobName, job)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.UpdateJob = UpdateJob
exportHandler("qb-core", 'UpdateJob', UpdateJob)

-- Single add item
local function AddItem(itemName, item)
    if type(itemName) ~= "string" then
        return false, "invalid_item_name"
    end

    if QBCore.Shared.Items[itemName] then
        return false, "item_exists"
    end

    QBCore.Shared.Items[itemName] = item

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Items', itemName, item)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.AddItem = AddItem
exportHandler("qb-core", 'AddItem', AddItem)

-- Single update item
local function UpdateItem(itemName, item)
    if type(itemName) ~= "string" then
        return false, "invalid_item_name"
    end
    if not QBCore.Shared.Items[itemName] then
        return false, "item_not_exists"
    end
    QBCore.Shared.Items[itemName] = item
    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Items', itemName, item)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.UpdateItem = UpdateItem
exportHandler("qb-core", 'UpdateItem', UpdateItem)

-- Multiple Add Items
local function AddItems(items)
    local shouldContinue = true
    local message = "success"
    local errorItem = nil

    for key, value in pairs(items) do
        if type(key) ~= "string" then
            message = "invalid_item_name"
            shouldContinue = false
            errorItem = items[key]
            break
        end

        if QBCore.Shared.Items[key] then
            message = "item_exists"
            shouldContinue = false
            errorItem = items[key]
            break
        end

        QBCore.Shared.Items[key] = value
    end

    if not shouldContinue then return false, message, errorItem end
    TriggerClientEvent('QBCore:Client:OnSharedUpdateMultiple', -1, 'Items', items)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, message, nil
end

QBCore.Functions.AddItems = AddItems
exportHandler("qb-core", 'AddItems', AddItems)

-- Single Remove Item
local function RemoveItem(itemName)
    if type(itemName) ~= "string" then
        return false, "invalid_item_name"
    end

    if not QBCore.Shared.Items[itemName] then
        return false, "item_not_exists"
    end

    QBCore.Shared.Items[itemName] = nil

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Items', itemName, nil)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.RemoveItem = RemoveItem
exportHandler("qb-core", 'RemoveItem', RemoveItem)

-- Single Add Gang
local function AddGang(gangName, gang)
    if type(gangName) ~= "string" then
        return false, "invalid_gang_name"
    end

    if QBCore.Shared.Gangs[gangName] then
        return false, "gang_exists"
    end

    QBCore.Shared.Gangs[gangName] = gang

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Gangs', gangName, gang)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.AddGang = AddGang
exportHandler("qb-core", 'AddGang', AddGang)

-- Multiple Add Gangs
local function AddGangs(gangs)
    local shouldContinue = true
    local message = "success"
    local errorItem = nil

    for key, value in pairs(gangs) do
        if type(key) ~= "string" then
            message = "invalid_gang_name"
            shouldContinue = false
            errorItem = gangs[key]
            break
        end

        if QBCore.Shared.Gangs[key] then
            message = "gang_exists"
            shouldContinue = false
            errorItem = gangs[key]
            break
        end

        QBCore.Shared.Gangs[key] = value
    end

    if not shouldContinue then return false, message, errorItem end
    TriggerClientEvent('QBCore:Client:OnSharedUpdateMultiple', -1, 'Gangs', gangs)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, message, nil
end

QBCore.Functions.AddGangs = AddGangs
exportHandler("qb-core", 'AddGangs', AddGangs)

-- Single Remove Gang
local function RemoveGang(gangName)
    if type(gangName) ~= "string" then
        return false, "invalid_gang_name"
    end

    if not QBCore.Shared.Gangs[gangName] then
        return false, "gang_not_exists"
    end

    QBCore.Shared.Gangs[gangName] = nil

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Gangs', gangName, nil)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.RemoveGang = RemoveGang
exportHandler("qb-core", 'RemoveGang', RemoveGang)

-- Single Update Gang
local function UpdateGang(gangName, gang)
    if type(gangName) ~= "string" then
        return false, "invalid_gang_name"
    end

    if not QBCore.Shared.Gangs[gangName] then
        return false, "gang_not_exists"
    end

    QBCore.Shared.Gangs[gangName] = gang

    TriggerClientEvent('QBCore:Client:OnSharedUpdate', -1, 'Gangs', gangName, gang)
    TriggerEvent('QBCore:Server:UpdateObject')
    return true, "success"
end

QBCore.Functions.UpdateGang = UpdateGang
exportHandler("qb-core", 'UpdateGang', UpdateGang)

local function GetCoreVersion(InvokingResource)
    local resourceVersion = GetResourceMetadata(GetCurrentResourceName(), 'version')
    if InvokingResource and InvokingResource ~= '' then
        print(("%s called qbcore version check: %s"):format(InvokingResource or 'Unknown Resource', resourceVersion))
    end
    return resourceVersion
end

QBCore.Functions.GetCoreVersion = GetCoreVersion
exportHandler("qb-core", 'GetCoreVersion', GetCoreVersion)

local function ExploitBan(playerId, origin)
    local name = GetPlayerName(playerId)
    MySQL.insert('INSERT INTO user_bans (name, license, discord, ip, reason, expire, bannedby) VALUES (?, ?, ?, ?, ?, ?, ?)', {
        name,
        QBCore.Functions.GetIdentifier(playerId, 'license'),
        QBCore.Functions.GetIdentifier(playerId, 'discord'),
        QBCore.Functions.GetIdentifier(playerId, 'ip'),
        origin,
        2147483647,
        'Anti Cheat'
    })
    DropPlayer(playerId, Lang:t('info.exploit_banned', {discord = QBCore.Config.Server.Discord}))
    TriggerEvent("qb-log:server:CreateLog", "anticheat", "Anti-Cheat", "red", name .. " has been banned for exploiting " .. origin, true)
end

exportHandler("qb-core", 'ExploitBan', ExploitBan)

local function AddVehicle(source, vehicle, plate)
    local Player = QBCore.Functions.GetPlayer(source)
    local vehPlate = plate or vRP.generatePlateNumber()
    if Player then
        MySQL.insert('INSERT INTO player_vehicles (license, citizenid, vehicle, hash, mods, plate, state, garage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', {
            Player.PlayerData.license,
            Player.PlayerData.citizenid,
            vehicle,
            GetHashKey(vehicle),
            '{}',
            vehPlate,
            0,
            'pillboxgarage'
        })
    end
end

exportHandler("qb-core", 'AddVehicle', AddVehicle)
