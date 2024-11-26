serverIdentifier = nil

function identifiers(source)
    local license, steamid

    for k, v in pairs(GetPlayerIdentifiers(source)) do
        if string.sub(v, 1, string.len("steam:")) == "steam:" then
            steamid = v
        elseif string.sub(v, 1, string.len("license:")) == "license:" then
            license = v
        end
    end

    return license, steamid
end

callback.register('fd_radio:getIdentifiers', function(source)
    return identifiers(source)
end)

local function loadServerIdentifier()
    local chunk = LoadResourceFile(GetCurrentResourceName(), 'data/identifier.lua')

    if chunk then
        local func, err = load(chunk, file)

        if err then
            return
        end

        local data = func()

        if data.identifier then
            serverIdentifier = data.identifier
            return
        end

        local file = { "return {\n}" }
        file[1] = file[1]:gsub('}$', '')

        local fileSize = #file

        local hostname = GetConvar("sv_hostname", "UnknownServer-" .. os.time(os.date("!*t")))
        local encoded = utils.enc(hostname)
        serverIdentifier = encoded

        local format = [[
	["identifier"] = "%s",
]]
        fileSize += 1
        file[fileSize] = (format):format(encoded)

        file[fileSize + 1] = '}'
        SaveResourceFile(GetCurrentResourceName(), 'data/identifier.lua', table.concat(file), -1)
    end
end

Citizen.CreateThread(function()
    loadServerIdentifier()

    Wait(100)
    bridge.applyPmaChannelCheck()
end)

callback.register('fd_radio:getHostname', function(source)
    return serverIdentifier
end)
