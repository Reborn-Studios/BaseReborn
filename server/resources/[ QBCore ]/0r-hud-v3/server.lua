server = {}

require 'modules.bridge.server'

local showOnlinePlayers = Config.DefaultHudSettings.client_info.server_info.showOnlinePlayers

local playerCount = #GetPlayers()
local maxPlayers = showOnlinePlayers and GetConvarInt('sv_maxclients', 32) or 0

-- Get the current player count and max players
---@return integer PlayerCount, integer MaxPlayers
local function GetCurrentTotalPlayerCount()
    local newPlayerCount = #GetPlayers()
    local newMaxPlayers = showOnlinePlayers and GetConvarInt('sv_maxclients', 32) or 0
    return newPlayerCount, newMaxPlayers
end

RegisterNetEvent(_e('server:getTotalPlayerCount'), function()
    local src = source
    TriggerClientEvent(_e('client:updatePlayerCount'), src, playerCount, maxPlayers)
end)


if Config.DefaultHudSettings.client_info?.server_info?.showOnlinePlayers then
    CreateThread(function()
        while true do
            Wait(Config.RefreshTimes.requestPlayerCount)
            local newPlayerCount, newMaxPlayers = GetCurrentTotalPlayerCount()
            if playerCount ~= newPlayerCount or maxPlayers ~= newMaxPlayers then
                playerCount = newPlayerCount
                maxPlayers = newMaxPlayers
                TriggerClientEvent(_e('client:updatePlayerCount'), -1, playerCount, maxPlayers)
            end
        end
    end)
end
