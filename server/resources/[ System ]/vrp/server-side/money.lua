-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.addBank(user_id,amount,reason)
	if amount > 0 then
		user_id = parseInt(user_id)
		local source = vRP.getUserSource(user_id)
		Reborn.addMoney(source, amount, reason, user_id)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.setBank(user_id,amount,reason)
	if amount >= 0 then
		user_id = parseInt(user_id)
		local source = vRP.getUserSource(user_id)
		Reborn.setMoney(source, amount, reason, user_id)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DELBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.delBank(user_id,amount,reason)
	if amount > 0 then
		user_id = parseInt(user_id)
		local source = vRP.getUserSource(user_id)
		Reborn.remMoney(source, amount, reason)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getBank(user_id)
	user_id = parseInt(user_id)
	local source = vRP.getUserSource(user_id)
	return Reborn.getMoney(source,user_id)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYMENTBANK
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.paymentBank(user_id,amount)
	if amount > 0 then
		user_id = parseInt(user_id)
		local consult = vRP.getInformation(user_id)
		if consult[1] then
			if consult[1].bank >= amount then
				vRP.delBank(parseInt(user_id),parseInt(amount))

				local source = vRP.getUserSource(user_id)
				if source then
					TriggerClientEvent("itensNotify",source,{ "REMOVIDO","dollars",vRP.format(amount),"Dólares" })
				end
				return true
			elseif vRP.tryGetInventoryItem(user_id,"dollars",amount) then
				local source = vRP.getUserSource(user_id)
				if source then
					TriggerClientEvent("itensNotify",source,{ "REMOVIDO","dollars",vRP.format(amount),"Dólares" })
				end
				return true
			end
		end
	end
	return false
end

function vRP.tryFullPayment(user_id, price)
	if price > 0 and vRP.tryGetInventoryItem(user_id,"dollars",price) then
		return true
	end
    return vRP.paymentBank(user_id, price)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WITHDRAWCASH
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.withdrawCash(user_id,amount)
	if amount > 0 then
		local consult = vRP.getInformation(user_id)
		if consult[1] then
			if consult[1].bank >= amount then
				vRP.giveInventoryItem(user_id,"dollars",amount,true)
				vRP.delBank(parseInt(user_id),parseInt(amount))
				return true
			end
		end
	end
	return false
end

function vRP.tryWithdraw(user_id,amount)
	local money = vRP.getBankMoney(user_id)
	if amount >= 0 and money >= amount then
		vRP.setBankMoney(user_id,money-amount)
		vRP.giveMoney(user_id,amount)
		return true
	else
		return false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETFINES
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.setFines(user_id,price,message)
	local fines = vRP.getFines(user_id)
	vRP.setUData(parseInt(user_id),"vRP:multas",json.encode(fines + parseInt(price)))
	local hasExport = pcall(function()
		return exports['bank']['AddTaxs']
	end)
	if hasExport then
		exports['bank']:AddTaxs(user_id, "Prefeitura", price, message or "Motivo desconhecido")
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETFINES
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getFines(user_id)
	local value = vRP.getUData(parseInt(user_id),"vRP:multas")
    local multas = json.decode(value) or 0
	return parseInt(multas)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEMULTAS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.updateMultas(user_id, value)
	vRP.setUData(parseInt(user_id),"vRP:multas",json.encode(value))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GET GEMS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getGmsId(user_id)
	local identity = vRP.getUserIdentity(user_id)
	if identity then
		local infos = vRP.query("vRP/get_accounts",{ identifier = identity.identifier })
		if infos[1] and infos[1].gems then
			return infos[1].gems
		end
		return 0
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- REM GEMS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.remGmsId(user_id,amount)
	local identity = vRP.getUserIdentity(user_id)
	if identity then
		local infos = vRP.query("vRP/get_accounts",{ identifier = identity.identifier })						
        if infos[1].gems >= amount then
			vRP.execute("vRP/rem_vRP_gems",{ identifier = identity.identifier, gems = parseInt(amount) })
			return true
		end
		return false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADD GEMS
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.addGmsId(user_id,amount)
	local identity = vRP.getUserIdentity(user_id)
	if identity then
		vRP.execute("vRP/set_vRP_gems",{ identifier = identity.identifier, gems = parseInt(amount) })
		return true
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETPREMIUM
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.getPremium(user_id)
	local identity = vRP.getUserIdentity(user_id)
	if identity then
		local consult = vRP.getInfos(identity.identifier)
		if consult[1] and os.time() >= (consult[1].premium+24*consult[1].predays*60*60) then
			return false
		else
			return true
		end
	end
end

function vRP.tryDeposit(user_id,amount)
    if amount > 0 and vRP.tryGetInventoryItem(user_id,"dollars",amount) then
        vRP.addBank(user_id,amount)
        return true
    else
        return false
    end
end
