RegisterNetEvent('0r-animmenu:sendAnimRequest:server', function(data)
    TriggerClientEvent('0r-animmenu:receiveAnimRequest:client', data.id, data)
end)

RegisterNetEvent('0r-animmenu:playAnimTogetherSender:server', function(data)
    TriggerClientEvent('0r-animmenu:playAnimTogetherSender:client', data.data.target, data)
end)

RegisterNetEvent('0r-animmenu:requstCanelledNotif:server', function(target)
    TriggerClientEvent('0r-animmenu:requstCanelledNotif:client', target)
end)

Citizen.CreateThread(function()
    -- Find resources that contains "smallresources"
    -- handsup.lua
    local resourceList = {}
    for i = 0, GetNumResources(), 1 do
        local resource_name = GetResourceByFindIndex(i)
        if resource_name and GetResourceState(resource_name) == "started" then
            table.insert(resourceList, resource_name)
        end
    end
    local findedResources = {}
    for k, v in pairs(resourceList) do
        if string.match(v, "smallresources") then
            table.insert(findedResources, v)
        end
    end
    for k, v in pairs(findedResources) do
        local loadedFile = LoadResourceFile(v, "client/handusp.lua")
        if loadedFile ~= nil then
            local resPath = GetResourcePath(v)
            --print("^0[^3WARNING^0] " .. GetCurrentResourceName() .. " you should delete ^1qb-smallresources/client/handsup.lua ^0file.")
            print("^0[^3WARNING^0] " .. GetCurrentResourceName() .. " ^1" .. v .. "/client/handsup.lua ^0file deleted by script.")
            os.remove(resPath .. "/client/handusp.lua")
        end
    end
    for k, v in pairs(findedResources) do
        local loadedFile = LoadResourceFile(v, "client/crouchprone.lua")
        if loadedFile ~= nil then
            local resPath = GetResourcePath(v)
            --print("^0[^3WARNING^0] " .. GetCurrentResourceName() .. " you should delete ^1qb-smallresources/client/crouchprone.lua ^0file.")
            print("^0[^3WARNING^0] " .. GetCurrentResourceName() .. " ^1" .. v .. "/client/crouchprone.lua ^0file deleted by script.")
            os.remove(resPath .. "/client/crouchprone.lua")
        end
    end
end)