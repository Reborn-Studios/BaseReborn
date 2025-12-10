-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
vCLIENT = Tunnel.getInterface("will_bateponto")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
cnVRP = {}
Tunnel.bindInterface("will_bateponto",cnVRP)

local serviceTime = {}

function cnVRP.checkBateponto(Index)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id and Config.data[Index] then
        vCLIENT.verify(source)
        Wait(2000)
        for k,v in pairs(Config.data[Index].groups) do
            if vRP.hasGroup(user_id,v.group) then
                vRP.addUserGroup(user_id,v.paisanaGroup)
                TriggerEvent("vrp_blipsystem:serviceExit",source)
                vCLIENT.exit(source)
                if Config.data[Index].webhook then
                    if parseInt(serviceTime[user_id]) > 0 then
                        Config.func.sendDiscord(Config.data[Index].webhook,"ID:"..user_id,"Saiu de serviço \n[Tempo de serviço]: "..minimalTimers(os.time() - parseInt(serviceTime[user_id])))
                    else
                        Config.func.sendDiscord(Config.data[Index].webhook,"ID:"..user_id,"Saiu de serviço")
                    end
                end
                break
            elseif vRP.hasGroup(user_id,v.paisanaGroup) then
                vRP.addUserGroup(user_id,v.group)
                serviceTime[user_id] = os.time()
                TriggerEvent("vrp_blipsystem:serviceEnter",source,"Policial",77)
                vCLIENT.enter(source)
                if Config.data[Index].webhook then
                    Config.func.sendDiscord(Config.data[Index].webhook,"ID:"..user_id,"Entrou em serviço")
                end
                break
            end
        end
	end
end

-- Itens proibidos para policia enviar/dropar
local arsenalItens = {
    'ammo-9',
    'ammo-rifle',
    'WEAPON_FLASHLIGHT',
    'WEAPON_NIGHTSTICK',
    'WEAPON_PISTOL',
    'WEAPON_CARBINERIFLE',
    'WEAPON_PARAFAL',
    'WEAPON_STUNGUN',
}

local function checkItens(user_id, item)
    if vRP.hasPermission(user_id,"policia.permissao") then
        for k,v in pairs(arsenalItens) do
            if v == item then
                return true
            end
        end
    end
    return false
end

CreateThread(function()
    Wait(1000)
    exports.ox_inventory:registerHook('swapItems', function(payload)
        local source = payload.source
        local user_id = vRP.getUserId(source)
        if user_id then
            if payload.fromType == "player" and payload.toType == "player" then
                if vRP.hasPermission(user_id,"policia.permissao") then
                    return true
                end
            end
            if checkItens(user_id, payload.fromSlot?.name) then
                return false
            end
            if payload.toType == "player" and tonumber(payload.toInventory) then
                local nuser_id = vRP.getUserId(tonumber(payload.toInventory))
                if nuser_id then
                    if checkItens(nuser_id, payload.fromSlot?.name) then
                        return false
                    end
                end
            end
            if payload.fromType == "player" and tonumber(payload.fromInventory) then
                local nuser_id = vRP.getUserId(tonumber(payload.fromInventory))
                if nuser_id then
                    if checkItens(nuser_id, payload.fromSlot?.name) then
                        return false
                    end
                end
            end
        end
        return true
    end)
end)

-- Entrar de Paisana quando relogar
AddEventHandler("vRP:playerSpawn",function(user_id,source)
    Wait(1000)
    for Index,data in pairs(Config.data) do
        for k,v in pairs(data.groups) do
            if vRP.hasGroup(user_id,v.group) then
                vRP.addUserGroup(user_id,v.paisanaGroup)
                TriggerEvent("vrp_blipsystem:serviceExit",source)
                break
            end
        end
    end
end)