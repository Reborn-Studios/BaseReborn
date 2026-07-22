-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
vRPclient = Tunnel.getInterface("vRP")
vCLIENT = Tunnel.getInterface("will_bateponto")
QBCore = exports["qb-core"]:GetCoreObject()
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
cnVRP = {}
Tunnel.bindInterface("will_bateponto",cnVRP)

local serviceTime = {}

local function checkGroupPermission(user_id, Index)
    local Groups = vRP.Groups()
    if Groups[Index] and Groups[Index]["Permissions"] then
        for k,perm in pairs(Groups[Index]["Permissions"]) do
            if vRP.hasPermission(user_id,perm) then
                return true
            end
        end
    end
end

function cnVRP.checkBateponto(Index)
	local source = source
	local user_id = vRP.getUserId(source)
    local batePontos = Config.getData()
    if user_id and Index[1] and batePontos[Index[1]] then
        vCLIENT.sendText(source,"Verificando...")
        Wait(2000)
        if checkGroupPermission(user_id, Index[1]) then
            if vRP.HasService(user_id,Index[1]) then
                vRP.ServiceLeave(source,user_id,Index[1],true)
                vCLIENT.sendText(source,"Saiu de serviço")
                if QBCore then
                    local Player = QBCore.Functions.GetPlayer(source)
                    if Player then
                        Player.Functions.SetJobDuty(false)
                    end
                end
                local webhook = Index[2] and batePontos[Index[1]][Index[2]] and batePontos[Index[1]][Index[2]].webhook
                if webhook and webhook ~= "" then
                    if parseInt(serviceTime[user_id]) > 0 then
                        Config.func.sendDiscord(webhook,"ID:"..user_id,"Saiu de serviço \n[Tempo de serviço]: "..minimalTimers(os.time() - parseInt(serviceTime[user_id])))
                    else
                        Config.func.sendDiscord(webhook,"ID:"..user_id,"Saiu de serviço")
                    end
                end
            else
                serviceTime[user_id] = os.time()
                vRP.ServiceEnter(source,user_id,Index[1],true)
                vCLIENT.sendText(source,"Entrou em serviço")
                if QBCore then
                    local Player = QBCore.Functions.GetPlayer(source)
                    if Player then
                        Player.Functions.SetJobDuty(true)
                    end
                end
                local webhook = Index[2] and batePontos[Index[1]][Index[2]] and batePontos[Index[1]][Index[2]].webhook
                if webhook and webhook ~= "" then
                    Config.func.sendDiscord(webhook,"ID:"..user_id,"Entrou em serviço")
                end
            end
        else
            vCLIENT.sendText(source,"Não permitido")
        end
	end
end

-- Itens proibidos para policia enviar/dropar
local function checkItens(user_id, item)
    if vRP.hasPermission(user_id,"policia.permissao") then
        for k,v in pairs(Config.arsenalItens) do
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
