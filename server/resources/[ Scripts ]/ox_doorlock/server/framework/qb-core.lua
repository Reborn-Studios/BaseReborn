local resourceName = 'qb-core'

SetTimeout(0, function()
    local QBCore = exports[resourceName]:GetCoreObject()

    GetPlayer = QBCore.Functions.GetPlayer
end)

function GetCharacterId(player)
    return player.PlayerData.citizenid
end

function IsPlayerInGroup(player, filter)
    if type(filter) == 'string' then
        if player.PlayerData.job.name == filter then
            return player.PlayerData.job.name, player.PlayerData.job.grade
        end
    else
        local tabletype = table.type(filter)

        if tabletype == 'hash' then
            local grade = filter[player.PlayerData.job.name]
            if grade and grade <= 0 then
                return player.PlayerData.job.name, player.PlayerData.job.grade
            end
        elseif tabletype == 'array' then
            for i = 1, #filter do
                if player.PlayerData.job.name == filter[i] then
                    return player.PlayerData.job.name, player.PlayerData.job.grade
                end
            end
        end
    end
end