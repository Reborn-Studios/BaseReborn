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
