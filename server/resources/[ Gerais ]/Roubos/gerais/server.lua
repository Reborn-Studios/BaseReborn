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
		if robberyProgress[vars[robberyId].type] ~= nil and robberyProgress[vars[robberyId].type] > os.time() then
			TriggerClientEvent("Notify",source,"importante","Aguarde <b>"..(robberyProgress[vars[robberyId].type] - os.time()).."</b> segundos.",4000)
			return false
		end

		local amountCops = vRP.getUsersByPermission("policia.permissao")
		if parseInt(#amountCops) < parseInt(vars[robberyId].cops) then
			TriggerClientEvent("Notify",source,"aviso","Sistema indisponível,tente mais tarde.",4000)
			return false
		end

		if vRP.tryGetInventoryItem(user_id,vars[robberyId].required,1,true) then
			CashMachine.callPolice(coords.x, coords.y, coords.z,vars[robberyId].name)
			robberyProgress[vars[robberyId].type] = os.time() + vars[robberyId].cooldown
			vRPclient._playAnim(source,false,{"oddjobs@shop_robbery@rob_till","loop"},true)
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
			vRPclient._stopAnim(source,false)
		end
	end
end
