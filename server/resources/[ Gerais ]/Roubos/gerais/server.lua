-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Robbery = {}
Tunnel.bindInterface("Roubos",Robbery)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local robberyProgress = {}
local vars = Config.gerais
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKPOLICE
-----------------------------------------------------------------------------------------------------------------------------------------
function Robbery.checkPolice(robberyId,coords)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local cooldownMode = vars[robberyId]["type"]
		if Config.modeCooldown == "unique" then
			cooldownMode = robberyId
		end
		if robberyProgress[cooldownMode] ~= nil and robberyProgress[cooldownMode] > os.time() then
			TriggerClientEvent("Notify",source,"importante","Aguarde <b>"..(robberyProgress[cooldownMode] - os.time()).."</b> segundos.",4000)
			return false
		end

		local amountCops = vRP.getUsersByPermission("policia.permissao")
		if parseInt(#amountCops) < parseInt(vars[robberyId].cops) then
			TriggerClientEvent("Notify",source,"aviso","Contingente indisponivel, necessario "..vars[robberyId].cops.." policiais em serviço",4000)
			return false
		end

		if vRP.tryGetInventoryItem(user_id,vars[robberyId].required,1,true) then
			CashMachine.callPolice(coords.x, coords.y, coords.z,vars[robberyId].name)
			robberyProgress[cooldownMode] = os.time() + vars[robberyId].cooldown
			vRP.createWeebHook(Webhooks.rouboshook,"```prolog\n[ID]: "..user_id.."\n[ROUBOU]: "..vars[robberyId].name.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
			return true
		else
			TriggerClientEvent("Notify",source,"aviso","Você precisa de <b>1x "..vRP.itemNameList(vars[robberyId].required).."</b>.",4000)
			return false
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYMENTMETHOD
-----------------------------------------------------------------------------------------------------------------------------------------
function Robbery.paymentMethod(robberyId)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		vRP.wantedTimer(user_id,600)
		for k,v in pairs(vars[robberyId].itens) do
			vRP.giveInventoryItem(user_id,v.item,parseInt(math.random(v.min,v.max)),true)
		end
		vRPclient._stopAnim(source,false)
		if GetResourceState("domination") == "started" then
            local status, place = exports['domination']:GetUserDom(source)
            if status then
                for k,v in pairs(vars[robberyId].itens) do
					vRP.giveInventoryItem(user_id,v.item,math.random(v.min,v.max),true)
				end
                TriggerClientEvent("Notify", source, "sucesso", "Você recebeu itens bônus por dominação do territorio", 5000)
            end
        end
	end
end
