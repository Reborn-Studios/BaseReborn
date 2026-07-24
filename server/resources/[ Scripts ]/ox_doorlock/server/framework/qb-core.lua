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
        elseif Player(player.PlayerData.source).state[filter] then
            return true, Player(player.PlayerData.source).state[filter]
        end
    else
        local tabletype = table.type(filter)

        if tabletype == 'hash' then
            local grade = filter[player.PlayerData.job.name]
            if grade and grade >= player.PlayerData.job.grade.level then
                return player.PlayerData.job.name, player.PlayerData.job.grade
            end
            for Job,ngrade in pairs(filter) do
                if Player(player.PlayerData.source).state[Job] and ngrade >= player.PlayerData.job.grade.level then
                    return true, Player(player.PlayerData.source).state[Job]
                end
            end
        elseif tabletype == 'array' then
            for i = 1, #filter do
                if player.PlayerData.job.name == filter[i] then
                    return player.PlayerData.job.name, player.PlayerData.job.grade
                elseif Player(player.PlayerData.source).state[filter[i]] then
                    return true, Player(player.PlayerData.source).state[filter[i]]
                end
            end
        end
    end
end
