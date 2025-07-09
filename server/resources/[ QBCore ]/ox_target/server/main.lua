lib.versionCheck('overextended/ox_target')

if not lib.checkDependency('ox_lib', '3.30.0', true) then return end

---@type table<number, EntityInterface>
local entityStates = {}

---@param netId number
RegisterNetEvent('ox_target:setEntityHasOptions', function(netId)
    local entity = Entity(NetworkGetEntityFromNetworkId(netId))
    entity.state.hasTargetOptions = true
    entityStates[netId] = entity
end)

---@param netId number
---@param door number
RegisterNetEvent('ox_target:toggleEntityDoor', function(netId, door)
    local entity = NetworkGetEntityFromNetworkId(netId)
    if not DoesEntityExist(entity) then return end

    local owner = NetworkGetEntityOwner(entity)
    TriggerClientEvent('ox_target:toggleEntityDoor', owner, netId, door)
end)

CreateThread(function()
    local arr = {}
    local num = 0

    while true do
        Wait(10000)

        for netId, entity in pairs(entityStates) do
            if not DoesEntityExist(entity.__data) or not entity.state.hasTargetOptions then
                entityStates[netId] = nil
                num += 1

                arr[num] = netId
            end
        end

        if num > 0 then
            TriggerClientEvent('ox_target:removeEntity', -1, arr)
            table.wipe(arr)

            num = 0
        end
    end
end)

RegisterNetEvent("ox_inventory:requestRevist",function(nplayer, playingAnim)
    local source = source
    if tonumber(nplayer) == nil then return end
    if playingAnim or Player(tonumber(nplayer)).state.Handcuff or GetEntityHealth(GetPlayerPed(tonumber(nplayer))) <= 101 then
        if Player(tonumber(nplayer)).state.Police then
            TriggerClientEvent("Notify",source,"negado","Você não pode revistar um policia",5000)
            return
        end
        exports.ox_inventory:forceOpenInventory(source, 'player', tonumber(nplayer))
    else
        TriggerClientEvent("Notify",source,"negado","A pessoa precisa estar algemada ou rendido",5000)
    end
end)