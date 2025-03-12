Drugs = {}
Tunnel.bindInterface("drogas",Drugs)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FUNÇÕES
-----------------------------------------------------------------------------------------------------------------------------------------
function Drugs.checkPermission(perm)
	local source = source
	local user_id = vRP.getUserId(source)
	if vRP.hasPermission(user_id,perm) then
		return true
	end
	TriggerClientEvent("Notify",source,"negado","Você não possui permissão para fazer isso.", 5000)
end

function Drugs.checkPayment(loc,id,farm)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local src = Farms[farm][loc].itens
		if src[id].re ~= nil then
			if vRP.computeInvWeight(user_id) + vRP.itemWeightList(src[id].item) * src[id].itemqtd <= vRP.getBackpack(user_id) then
				if vRP.tryGetInventoryItem(user_id,src[id].re,src[id].reqtd,true) then
					vRP.giveInventoryItem(user_id,src[id].item,src[id].itemqtd,true)
					return true
				else
					TriggerClientEvent("Notify",source,"negado","Você não possui "..src[id].reqtd.."x "..vRP.itemNameList(src[id].re), 5000)
				end
			else
				TriggerClientEvent("Notify",source,"negado","Você não possui espaço suficiente", 5000)
			end
		else
			if vRP.computeInvWeight(user_id)+vRP.itemWeightList(src[id].item)*src[id].itemqtd <= vRP.getBackpack(user_id) then
				vRP.giveInventoryItem(user_id,src[id].item,src[id].itemqtd,true)
				return true
			else
				TriggerClientEvent("Notify",source,"negado","Você não possui espaço suficiente", 5000)
			end
		end
	end
end
