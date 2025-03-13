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
                    Config.func.sendDiscord(Config.data[Index].webhook,8923574, "Bate ponto","ID:"..user_id,"Saiu de serviço")
                end
                break
            elseif vRP.hasGroup(user_id,v.paisanaGroup) then
                vRP.addUserGroup(user_id,v.group)
                TriggerEvent("vrp_blipsystem:serviceEnter",source,"Policial",77)
                vCLIENT.enter(source)
                if Config.data[Index].webhook then
                    Config.func.sendDiscord(Config.data[Index].webhook,12422,"Bate ponto","ID:"..user_id,"Entrou em serviço")
                end
                break
            end
        end
	end
end
