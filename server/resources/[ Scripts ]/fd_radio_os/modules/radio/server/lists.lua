local radioLists = {}

local function handleRadioChange(src, channel)
    CreateThread(function()
        for ch, list in pairs(radioLists) do
            for id, _ in pairs(list) do
                if id == tostring(src) then
                    radioLists[ch][id] = nil

                    TriggerClientEvent('fd_radio:updateNames', -1, ch, radioLists[ch])
                end
            end
        end
    end)

    if channel == 0 then
        return
    end

    if not hasList(channel) then
        return
    end

    local Player = core.Functions.GetPlayer(src) -- callback.await("fd_radio:getName", src)
    local userData = Player.PlayerData.charinfo
    local names = {}
    if userData.name then
        names.name = userData.name
        names.sign = userData.id
        names.src = src
    end

    if not names.name or names.name == '' then
        names.name = 'Unknown'
    end

    if not radioLists[formatChannel(channel)] then
        radioLists[formatChannel(channel)] = {}
    end

    table.insert(radioLists[formatChannel(channel)],names)
    -- radioLists[formatChannel(channel)][tostring(src)] = names
    TriggerClientEvent('fd_radio:updateNames', -1, formatChannel(channel), radioLists[formatChannel(channel)])
end

RegisterServerEvent('pma-voice:setPlayerRadio', function(channel)
    local src = source

    handleRadioChange(src, channel)
end)

RegisterServerEvent('fd_radio:updateName', function(sign, name, channel)
    local src = source

    if radioLists[formatChannel(channel)] and radioLists[formatChannel(channel)][tostring(src)] then
        radioLists[formatChannel(channel)][tostring(src)] = {
            sign = sign,
            name = name
        }

        TriggerClientEvent('fd_radio:updateNames', -1, formatChannel(channel), radioLists[formatChannel(channel)])
    end
end)

AddEventHandler("playerDropped", function()
    local src = source

    handleRadioChange(src, 0)
end)
