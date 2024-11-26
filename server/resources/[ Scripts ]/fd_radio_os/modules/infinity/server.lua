callback.register('fd_radio:infinity:coords', function(source, netId)
    local ped = GetPlayerPed(netId)

    if not ped then
        return vector3(0, 0, 0)
    end

    return GetEntityCoords(ped)
end)
