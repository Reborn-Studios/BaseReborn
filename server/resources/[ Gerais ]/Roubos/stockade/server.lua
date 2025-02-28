-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Stockade = {}
Tunnel.bindInterface("Rstockade",Stockade)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local stockadePlates = {}
local blockStockades = {}
local stockadeItem = Config.stockade.stockadeItem
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKPOLICE
-----------------------------------------------------------------------------------------------------------------------------------------
function Stockade.checkPolice(vehPlate)
	local source = source
	if blockStockades[vehPlate] ~= nil then return false end
	local police = vRP.getUsersByPermission("policia.permissao")
	if #police <= Config.stockade['cops'] then
		TriggerClientEvent("Notify",source,"aviso","Sistema indisponível no momento, tente mais tarde.",5000)
		return false
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WITHDRAWMONEY
-----------------------------------------------------------------------------------------------------------------------------------------
function Stockade.withdrawMoney(vehPlate,vehNet)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if stockadePlates[vehPlate] == nil then
			if vRP.getInventoryItemAmount(user_id,stockadeItem) >= 1 then
				local taskResult = vTASKBAR.taskThree(source)
				if taskResult then
					if vRP.tryGetInventoryItem(user_id,stockadeItem,1,true) then
						stockadePlates[vehPlate] = 5
						TriggerClientEvent("vrp_stockade:Destroy",-1,vehNet)
						TriggerClientEvent("Notify",source,"sucesso","Sistema violado e as autoridades foram notificadas.",5000)
						local x,y,z = vRPclient.getPositions(source)
						CashMachine.callPolice(x,y,z,"Carro Forte")
					end
				end
			else
				TriggerClientEvent("Notify",source,"importante","Você não possui um <b>"..vRP.itemNameList(stockadeItem).."</b>.",5000)
			end
		else
			if stockadePlates[vehPlate] > 0 then
				vRP.wantedTimer(user_id,30)
				FreezeEntityPosition(GetPlayerPed(source),true)
				TriggerClientEvent("cancelando",source,true)
				stockadePlates[vehPlate] = stockadePlates[vehPlate] - 1
				vRPclient._playAnim(source,false,{ task = "PROP_HUMAN_BUM_BIN" },true)

				Wait(10000)

				vRPclient._stopAnim(source,false)
				FreezeEntityPosition(GetPlayerPed(source),false)
				TriggerClientEvent("cancelando",source,false)
				vRP.giveInventoryItem(user_id,Config.stockade['payment']['item'],Config.stockade['payment']['qntd'],true)
				if stockadePlates[vehPlate] > 0 then
					TriggerClientEvent("Notify",source,"aviso","Ainda possui dinheiro no carro forte.",5000)
				end
			else
				TriggerClientEvent("Notify",source,"negado","Nenhum dinheiro encontrado.",5000)
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- INPUTVEHICLE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("vrp_stockade:inputVehicle")
AddEventHandler("vrp_stockade:inputVehicle",function(vehPlate)
	blockStockades[vehPlate] = true
	TriggerClientEvent("vrp_stockade:Client",-1,blockStockades)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERSPAWN
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("vRP:playerSpawn",function(user_id,source)
	TriggerClientEvent("vrp_stockade:Client",source,blockStockades)
end)
