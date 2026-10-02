-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")

-----------------------------------
--########## Funções vRP ##########
-----------------------------------

function getUserId(source)
    return vRP.getUserId(source)
end

function getUserName(user_id)
    local identity = vRP.getUserIdentity(user_id)
	if not identity.name2 then
        identity.name2 = identity.firstname
    end
    return identity.name.." "..identity.name2
end

function tryGetInventoryItem(user_id, item, amount)
    return vRP.tryGetInventoryItem(user_id, item, amount)
end

function giveInventoryItem(user_id, item, amount)
    vRP.giveInventoryItem(user_id, item, amount)
end

function getInventoryItemAmount(user_id, item)
    return vRP.getInventoryItemAmount(user_id, item)
end

function addVehicle(source)
    local user_id = getUserId(source)
    local vehicle = Config.car
    if user_id then
        vRP.addUserVehicle(user_id,vehicle)
    end
end

function execute(name,query)
    vRP.execute(name,query)
end

RegisterNetEvent("will_cassino_v2:notify")
AddEventHandler("will_cassino_v2:notify",function(src,tipo,msg)
    local source = src or source
    local notifys = {
        ['not_chips_enough'] = "Você não possui essa quantidade de fichas",
        ['no_wheel_item'] = "Você precisa de um "..Config.item.." para rodar",
        ['already_bet'] = "Ja fez sua aposta",
        ['sit_taken'] = "Cadeira ocupada",
        ['game_started'] = "Jogo ja iniciou",
        ['game_lost'] = "Você perdeu"
    }
    local notifyTypes = {
        ['sucess'] = "sucesso",
        ['error'] = "negado",
        ['warning'] = "aviso"
    }
    TriggerClientEvent("Notify",source,notifyTypes[tipo],notifys[msg],5000)
end)

function SendDiscord(id, win, game)
    TriggerEvent("vRP:log",{
        category = "system",
        webhook = "webhookcassino",
        message = "[ID]: "..id.."\n[GAME]: "..game.."\n[GANHOU]: "..win
    })
end
