--  _____  ________  ________  ________  ___       _______   ________  ___  __    ________      
-- / __  \|\  ___  \|\   __  \|\  ___  \|\  \     |\  ___ \ |\   __  \|\  \|\  \ |\   ____\     
-- |\/_|\  \ \____   \ \  \|\  \ \____   \ \  \    \ \   __/|\ \  \|\  \ \  \/  /|\ \  \___|_    
-- \|/ \ \  \|____|\  \ \  \\\  \|____|\  \ \  \    \ \  \_|/_\ \   __  \ \   ___  \ \_____  \   
--      \ \  \  __\_\  \ \  \\\  \  __\_\  \ \  \____\ \  \_|\ \ \  \ \  \ \  \\ \  \|____|\  \  
--       \ \__\|\_______\ \_______\|\_______\ \_______\ \_______\ \__\ \__\ \__\\ \__\____\_\  \ 
--        \|__|\|_______|\|_______|\|_______|\|_______|\|_______|\|__|\|__|\|__| \|__|\_________\
--                                                                                   \|_________|
--                                                                                               
-- https://www.youtube.com/watch?v=bSN7Hhfk2QU&feature=youtu.be                                                                                              
-- https://discord.gg/mRJFK5sTyr  & https://dsc.gg/1909leaks 
Core = nil
CoreName = nil
CoreReady = false
Citizen.CreateThread(function()
    for k, v in pairs(Cores) do
        if GetResourceState(v.ResourceName) == "starting" or GetResourceState(v.ResourceName) == "started" then
            CoreName = v.ResourceName
            Core = v.GetFramework()
            CoreReady = true
        end
    end
end)

function GetPlayerData()
    if CoreName == "qb-core" or CoreName == "qbx_core" then
        local player = Core.Functions.GetPlayerData()
        return player
    elseif CoreName == "es_extended" then
        local player = Core.GetPlayerData()
        return player
    end
end