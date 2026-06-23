Lavagem = {}
Tunnel.bindInterface("Lavagem",Lavagem)
-----------------------------------------------------------------------------------------------------------------------------------------
-- Checar Itens
-----------------------------------------------------------------------------------------------------------------------------------------
function Lavagem.checkItens(index)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local dinheiro_sujo = vRP.getInventoryItemAmount(user_id,"dollars2")
		if vRP.hasPermission(user_id,Farms.lavagem[index].perm) then
			if Farms.lavagem[index].requirements and next(Farms.lavagem[index].requirements) then
				for item,quantity in pairs(Farms.lavagem[index].requirements) do
					local amount = vRP.getInventoryItemAmount(user_id,item)
					if amount < quantity then
						TriggerClientEvent("Notify",source,"negado","Você não possui "..quantity.."x "..item,5000)
						return false
					end
				end
			end
			if dinheiro_sujo >= Farms.lavagem[index]['dinheiro_sujo'].min_money and dinheiro_sujo <= Farms.lavagem[index]['dinheiro_sujo'].max_money then
				if Farms.lavagem[index].requirements and next(Farms.lavagem[index].requirements) then
					for item,quantity in pairs(Farms.lavagem[index].requirements) do
						vRP.tryGetInventoryItem(user_id,item,quantity,true)
					end
				end
				return true
			else
				TriggerClientEvent("Notify",source,"negado","Você precisa de no minimo "..Farms.lavagem[index]['dinheiro_sujo'].min_money.. " e no maximo "..Farms.lavagem[index]['dinheiro_sujo'].max_money.." de dinheiro sujo.",4000)
			end
		else
			TriggerClientEvent("Notify",source,"negado","Sem permissão.",4000)
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- Pagamento
-----------------------------------------------------------------------------------------------------------------------------------------
function Lavagem.checkPayment(index)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
		local identity = vRP.getUserIdentity(user_id)
		local dinheiro = vRP.getInventoryItemAmount(user_id,"dollars2")
		if vRP.tryGetInventoryItem(user_id,"dollars2",dinheiro) then
			local payment = dinheiro * (Farms.lavagem[index]['dinheiro_sujo'].porcentagem) / 100
			vRP.giveInventoryItem(user_id,"dollars",payment)
			vRP.createWeebHook(Webhooks.webhooklavagem,"```prolog\n[PASSAPORTE]: "..user_id.." \n[NOME]: "..identity.name.." "..identity.name2.." \n[LAVOU]: "..dinheiro.." \n[RECEBEU]: "..payment.." "..os.date("\n[Data]: %d/%m/%y \n[Hora]: %H:%M:%S").." \r```")
		end
   end
end
