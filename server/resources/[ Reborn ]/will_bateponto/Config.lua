Proxy = module("vrp","lib/Proxy")
Tunnel = module("vrp","lib/Tunnel")
vRP = Proxy.getInterface("vRP")

Config = {}

Config.base = "creative"       -- vrpex / creative

Config.arsenalItens = {
    'ammo-9',
    'ammo-rifle',
    'WEAPON_FLASHLIGHT',
    'WEAPON_NIGHTSTICK',
    'WEAPON_PISTOL',
    'WEAPON_CARBINERIFLE',
    'WEAPON_PARAFAL',
    'WEAPON_STUNGUN',
}

function Config.getData()
    local dynamicData = GlobalState["BatePontoLocations"]
    if type(dynamicData) == "table" and next(dynamicData) then
        return dynamicData
    end
    return {}
end

Config.func = {
    sendDiscord = function(webhook, title, text)
        vRP.createWeebHook(webhook, "```prolog\n"..title.." "..text.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
    end,
}
