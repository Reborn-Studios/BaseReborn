local jammers = {}
local insideJammerZones = {}

local function saveJammers()
    local file = { "return {\n}" }
    file[1] = file[1]:gsub('}$', '')

    local fileSize = #file

    local format = [[
	['%s'] = {
        id = '%s',
        coords = %s,
        heading = %s,
        radius = %s
	},
]]
    for id, jammer in pairs(jammers) do
        fileSize += 1
        file[fileSize] = (format):format(id, id, jammer.coords, jammer.heading, jammer.radius)
    end

    file[fileSize + 1] = '}'
    SaveResourceFile(GetCurrentResourceName(), 'data/jammers.lua', table.concat(file), -1)
end

local function loadJammers()
    local chunk = LoadResourceFile(GetCurrentResourceName(), 'data/jammers.lua')

    if chunk then
        local func, err = load(chunk, file)

        if err then
            return
        end

        jammers = func()
    end
end

callback.register("fd_radio:generateJammerId", function(source)
    return utils.uuid()
end)

callback.register("fd_radio:placeJammer", function(source, coords, heading)
    local uuid = utils.uuid()

    jammers[uuid] = {
        id = uuid,
        coords = coords,
        heading = heading,
        radius = Config.JammerRadius
    }

    saveJammers()

    if Config.UseJammerItem and Config.JammerItemName and Config.Framework ~= 'none' then
        bridge.removeItem(source, Config.JammerItemName, 1)
    end

    TriggerClientEvent("fd_radio:newJammerPlaced", -1, uuid, jammers[uuid])
end)

callback.register("fd_radio:removeJammerCB", function(source, uuid)
    if jammers[uuid] == nil then
        return false
    end

    jammers[uuid] = nil

    saveJammers()

    if Config.UseJammerItem and Config.JammerItemName and Config.Framework ~= 'none' then
        bridge.addItem(source, Config.JammerItemName, 1)
    end

    TriggerClientEvent("fd_radio:removeJammer", -1, uuid)

    return true
end)

callback.register("fd_radio:updateInsideJammerZone", function(source, uuid, state)
    if insideJammerZones[source] == nil then
        insideJammerZones[source] = {}
    end

    if state then
        insideJammerZones[source][uuid] = state

        return
    end

    insideJammerZones[source][uuid] = nil
end)

callback.register("fd_radio:isInJammerZone", function(source, ply)
    if insideJammerZones[ply] == nil then
        return false
    end

    if type(insideJammerZones[ply]) == 'table' and utils.tableLength(insideJammerZones[ply]) > 0 then
        return true
    end

    return false
end)

RegisterNetEvent("fd_radio:getJammers", function()
    TriggerClientEvent("fd_radio:placeJammers", source, jammers)
end)

Citizen.CreateThread(function()
    loadJammers()
end)
