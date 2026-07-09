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
        if player then
            return player
        else
            return {}
        end
    end
end

function Notify(text, length, type)
    -- TriggerEvent('esx:showNotification', player, text, type, length)
    TriggerEvent('QBCore:Notify', text, type, length)
end

-- Text UI
function Create3DTextUIOnPlayer(name, data)
    create3DTextUIOnPlayers(name, data)
end

function Delete3DTextUIOnPlayer(name)
    delete3DTextUIOnPlayers(name, data)
end

function ShowTextUI(name, key)
    displayTextUI(name, key)
end

function HideTextUI()
    hideTextUI()
end