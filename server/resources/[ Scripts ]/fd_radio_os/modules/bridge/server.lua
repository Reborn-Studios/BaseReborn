function bridge.notify(src, message, type)
    -- notification
end

function bridge.applyPmaChannelCheck()
    for channel, _ in pairs(Config.WhitelistedAccess) do
        exports['pma-voice']:addChannelCheck(channel, function(source)
            return checkAce(source, ("FDCHANNEL.%s"):format(channel))
        end)
    end
end

function bridge.addItem(source, item, amount)

end

function bridge.removeItem(source, item, amount)

end
