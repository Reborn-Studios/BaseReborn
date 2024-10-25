-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
will = {}
Tunnel.bindInterface("identity",will)
vCLIENT = Tunnel.getInterface("identity")

function will.getIndentity()
    local source = source
    local user_id = vRP.getUserId(source)
    local identity = vRP.getUserIdentity(user_id)
    local infos = {
        userId = user_id,
        name = identity.name.." "..identity.name2,
        bank = identity.bank,
        gems = vRP.getGmsId(user_id),
        phone = identity.phone,
        job = vRP.getGroupTitle(vRP.getUserGroupByType(user_id,"job")) or "Desempregado",
        vip = vRP.getGroupTitle(vRP.getUserGroupByType(user_id,"vip")) or "Indefinido",
        fines = vRP.getFines(user_id),
    }
    return infos
end
