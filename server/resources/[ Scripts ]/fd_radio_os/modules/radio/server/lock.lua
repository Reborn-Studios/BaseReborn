lockedChannels = {}

callback.register("fd_radio:isRadioLocked", function(source, channel)
    return lockedChannels[channel] ~= nil and lockedChannels[channel].locked
end)

callback.register("fd_radio:isRadioLockedCanJoin", function(source, channel)
    local license, _ = identifiers(source)

    if lockedChannels[channel] == nil then
        return true
    end

    if not lockedChannels[channel].locked then
        return true
    end

    return lockedChannels[channel]?.players[license] ~= nil
end)

callback.register("fd_radio:attemptToLock", function(source, channel, identifier)
    if not canBeLocked(channel) then
        return false
    end

    if not lockedChannels[channel] then
        lockedChannels[channel] = {}
    end

    lockedChannels[channel].locked = true

    if not lockedChannels[channel].players then
        lockedChannels[channel].players = {}
    end

    lockedChannels[channel].players[identifier] = true

    return true
end)

callback.register("fd_radio:attemptToUnlock", function(source, channel, identifier)
    if not canBeLocked(channel) then
        return false
    end

    if not lockedChannels[channel] then
        return false
    end

    if not lockedChannels[channel].locked then
        return false
    end

    if not lockedChannels[channel].players[identifier] then
        return false
    end

    lockedChannels[channel].locked = false
    lockedChannels[channel].players = {}

    return true
end)

callback.register("fd_radio:inviteToChannel", function(source, channel, id)
    local ply = Player(id)

    if not ply then
        return false
    end

    if lockedChannels[channel] == nil then
        return false
    end

    if not lockedChannels[channel].locked then
        return false
    end

    local identifier, _ = identifiers(id)

    if not identifier then
        return false
    end

    if lockedChannels[channel].players[identifier] ~= nil then
        return true
    end

    lockedChannels[channel].players[identifier] = true

    return true
end)

RegisterServerEvent('pma-voice:setPlayerRadio', function(channel)
    local src = source
    local channel = Player(src).state.radioChannel

    if channel == nil then
        return
    end

    local inRadio = 0

    Wait(100)
    for _, index in pairs(GetPlayers()) do
        local ply = Player(index)


        if ply.state.radioChannel == nil then
            goto continue
        end

        if channel == ply.state.radioChannel and lockedChannels[ply.state.radioChannel] and lockedChannels[ply.state.radioChannel]?.locked then
            inRadio = inRadio + 1
        end

        ::continue::
    end

    if inRadio < 1 and lockedChannels[channel] then
        lockedChannels[channel].locked = false
        lockedChannels[channel].players = {}
    end
end)
