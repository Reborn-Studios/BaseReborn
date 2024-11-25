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
			if dinheiro_sujo >= Farms.lavagem[index]['dinheiro_sujo'].min_money and dinheiro_sujo <= Farms.lavagem[index]['dinheiro_sujo'].max_money then
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
