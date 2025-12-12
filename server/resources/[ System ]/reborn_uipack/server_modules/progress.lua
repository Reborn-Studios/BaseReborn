local progressPropLimit = GetConvarInt("ox:progressPropLimit", 2)

RegisterNetEvent("ox_lib:progressProps", function(props)
    local playerId = source
    
    if type(props) == "table" then
        -- Limita o número de props ao limite configurado
        if #props > progressPropLimit then
            props = {table.unpack(props, 1, progressPropLimit)}
        end
    else
        props = nil
    end
    
    Player(playerId).state:set("lib:progressProps", props, true)
end)