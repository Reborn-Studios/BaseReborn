local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
local Webhooks = module("Reborn/webhooks")
vRP = Proxy.getInterface("vRP")
Rbn = {}
Tunnel.bindInterface("Desmanche", Rbn)
------------------------------------------------------
-- CONFIG 
------------------------------------------------------
local iniciado = {}

-- FUNÇÃO VERIFICAR PERMISSÃO DO DESMANCHE
function Rbn.CheckPerm(index)
    local source = source
    local user_id = vRP.getUserId(source)
	local RestritoParaDesmanche = Farms.desmanche[index].RestritoParaDesmanche
    if RestritoParaDesmanche then
		local PermissaoDesmanche = Farms.desmanche[index].PermissaoDesmanche
        if vRP.hasPermission(user_id, PermissaoDesmanche) and not iniciado[index] then
			iniciado[index] = true
            return true
        end
        return false
    end
	if iniciado[index] then return end
	iniciado[index] = true
	return true
end

-- FUNÇÃO DESBLOQUEAR DESMANCHE
function Rbn.backIniciado(index)
	iniciado[index] = false
end

-- FUNÇÃO PRA VERIFICAR SE POSSUI O ITEM
function Rbn.CheckItem(index)
    local source = source
    local user_id = vRP.getUserId(source)
	local PrecisaDeItem = Farms.desmanche[index].PrecisaDeItem
    if PrecisaDeItem then
		local ItemNecessario = Farms.desmanche[index].ItemNecessario
		local QtdNecessaria = Farms.desmanche[index].QtdNecessaria
        if vRP.tryGetInventoryItem(user_id,ItemNecessario,QtdNecessaria) then
            return true
        end
        return false
    end
    return true
end

-- FUNÇÃO PARA GERAR O PAGAMENTO E OS ITENS
function Rbn.GerarPagamento(placa, nomeFeio, nomeBonito, index)
    local source = source
    local user_id = vRP.getUserId(source)
    local identity = vRP.getUserIdentity(user_id)
	local puser_id = vRP.getVehiclePlate(placa)
	if puser_id and puser_id ~= user_id then
		local pagamento = (vRP.vehiclePrice(nomeFeio) or 0) * 0.5 or 50000
		vRP.giveInventoryItem(user_id,'dollars2',pagamento)
		for k,v in pairs(Farms.desmanche['Payment']) do
			vRP.giveInventoryItem(user_id,k,v)
		end
		iniciado[index] = false
		local multas = pagamento / 2
		vRP.setFines(puser_id,multas,"Desmanche do veiculo: "..nomeBonito)
		local nsource = vRP.getUserSource(puser_id)
		if nsource then
			if GetResourceState("ld_smartbank") == "started" then
				exports['ld_smartbank']:CreateFine(nsource, "Governo", parseInt(multas), "Seguro de veiculo")
			end
			TriggerClientEvent('Notify', nsource, 'aviso', 'Você foi multado em <b>R$' ..multas.. '</b> referente ao seguro do veículo <b>' .. nomeBonito .. ' (' .. nomeFeio .. ')</b>.', 5000)
		end
		TriggerClientEvent("vrp_sound:source",source,'coin',0.3)
		TriggerClientEvent('Notify', source, 'sucesso', 'Você recebeu <b>R$'..vRP.format(pagamento)..'</b> pelo desmanche de um <b>'..nomeBonito..' ('.. nomeFeio..' - PLACA [' .. placa .. '])</b>.', 5000)
		vRP.createWeebHook(Webhooks.hookdesmanche,"```prolog\n[PASSAPORTE]: "..user_id.." \n[NOME]: "..identity.name.." "..identity.name2.." \n[DESMANCHOU]: "..nomeBonito.."  \n[PLACA]: ".. placa .." \n[RECEBEU]: ".. vRP.format(pagamento) .." "..os.date("\n[Data]: %d/%m/%y \n[Hora]: %H:%M:%S").." \r```")
    end
end
