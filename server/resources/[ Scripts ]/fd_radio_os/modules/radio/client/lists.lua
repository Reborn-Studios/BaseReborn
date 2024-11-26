lists = {}

RegisterNetEvent('fd_radio:updateNames', function(channel, list)
    lists[channel] = list
    --[[ if formatChannel(getCurrentChannel()) == channel then
        ui.updateValues({
            externalListUsers = list
        })
    end ]]
end)

RegisterNUICallback('fetchList', function(data, cb)
    cb(lists[formatChannel(data.channel)] or {})
end)

function getUser(src)
    local usersList = lists[formatChannel(getCurrentChannel())] or {}
    for k,v in pairs(usersList) do
        if tonumber(v.src) == tonumber(src) then
            return usersList[k]
        end
    end
end

function updatePlayersTalking(playersTalking)
    ui.updateValues({
        externalListUsers = {}
    })
    local listTalking = {}
    for id,talking in pairs(playersTalking) do
        local user = getUser(id)
        if user and talking then
            table.insert(listTalking,{
                name = user.name,
                sign = tostring(user.sign) or nil
            })
        end
    end
    ui.updateValues({
        externalListUsers = listTalking
    })
end