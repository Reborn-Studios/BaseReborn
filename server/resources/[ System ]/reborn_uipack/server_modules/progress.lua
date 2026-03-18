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

--####----####----####----
--##   VARIABLES   ##--
--####----####----####----

GlobalState['Basics'] = {
    ['ServerName'] = "Reborn Studios",
    ['Discord'] = "https://discord.gg/8unYr9MUdx",
    ['MaxHealth'] = 400,
    ['CityLogo'] = "https://api.rebornsystem.com.br/imagens/RebornLogo.png",
    ['ServerStore'] = "",
    ['Identifier'] = "steam",
    ['Whitelist'] = false,
    ['Theme'] = "default",
    ['Debug'] = true
}

GlobalState['Inventory'] = "ox_inventory"       -- "ld_inventory" / "ox_inventory" / "custom"

GlobalState['WeaponWheel'] = false               -- Utilizado para o ox_inventory / Ao ativar, as armas não terão mais durabilidade e metadatas

local BaseConfig = json.decode(LoadResourceFile("AdminControl", 'data/baseconfig.json')) or {}
GlobalState:set("Basics",BaseConfig,true)
