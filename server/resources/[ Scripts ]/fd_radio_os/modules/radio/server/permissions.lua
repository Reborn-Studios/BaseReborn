function checkAce(src, permission)
    return IsPlayerAceAllowed(src, permission)
end

callback.register("fd_radio:isAceAllowed", function(source, channel)
    return checkAce(source, ("FDCHANNEL.%s"):format(channel))
end)
