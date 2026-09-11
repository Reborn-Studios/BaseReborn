local panelOpen = false

local function setPanel(open)
    panelOpen = open == true
    SetNuiFocus(panelOpen, panelOpen)
    if not panelOpen then
        SendNUIMessage({ action = 'close' })
    end
end

local function getTargetServerIdFromEntity(entity)
    local player = NetworkGetPlayerIndexFromPed(entity)
    if not player or player == -1 then return end
    return GetPlayerServerId(player)
end

local function openRelationshipPanel(targetServerId)
    if panelOpen then return end
    local data = lib.callback.await('will_relacionamento:getPanelData', false, targetServerId)
    if not data or data.error then
        TriggerEvent('Notify', 'negado', 'Não foi possível abrir o painel.')
        return
    end

    setPanel(true)
    SendNUIMessage({
        action = 'open',
        mode = 'panel',
        data = data
    })
end

RegisterNetEvent('will_relacionamento:openIncoming', function(payload)
    if panelOpen then
        setPanel(false)
        Wait(50)
    end

    setPanel(true)
    SendNUIMessage({
        action = 'open',
        mode = 'incoming',
        data = payload
    })
end)

RegisterNUICallback('close', function(_, cb)
    setPanel(false)
    cb(true)
end)

RegisterNUICallback('requestDating', function(data, cb)
    setPanel(false)
    TriggerServerEvent('will_relacionamento:requestDating', data and data.targetServerId)
    cb(true)
end)

RegisterNUICallback('requestMarriage', function(data, cb)
    setPanel(false)
    TriggerServerEvent('will_relacionamento:requestMarriage', data and data.targetServerId)
    cb(true)
end)

RegisterNUICallback('endRelationship', function(data, cb)
    setPanel(false)
    TriggerServerEvent('will_relacionamento:endWithTarget', data and data.targetServerId)
    cb(true)
end)

RegisterNUICallback('respond', function(data, cb)
    setPanel(false)
    TriggerServerEvent('will_relacionamento:respond', data and data.token, data and data.accepted == true)
    cb(true)
end)

CreateThread(function()
    while GetResourceState('ox_target') ~= 'started' do
        Wait(250)
    end

    exports.ox_target:addGlobalPlayer({
        {
            name = 'will_relacionamento:menu',
            icon = 'fa-solid fa-heart',
            label = 'Relacionamento',
            distance = 2.0,
            onSelect = function(data)
                local targetServerId = getTargetServerIdFromEntity(data.entity)
                if not targetServerId then return end
                openRelationshipPanel(targetServerId)
            end
        }
    })

    exports.ox_target:addGlobalPed({
        {
            name = 'will_relacionamento:menu',
            icon = 'fa-solid fa-heart',
            label = 'Relacionamento',
            distance = 2.0,
            onSelect = function()
                openRelationshipPanel()
            end
        }
    })
end)
