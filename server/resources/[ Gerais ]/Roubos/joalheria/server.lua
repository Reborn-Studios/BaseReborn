-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Jewelry = {}
Tunnel.bindInterface("joalheria",Jewelry)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
GlobalState['JewelryStatus'] = false
local jewelryDrawer = {}
local jewelryTimer = 0
local jewelryCooldown = 0
-----------------------------------------------------------------------------------------------------------------------------------------
-- JEWELRYUPDATESTATUS
-----------------------------------------------------------------------------------------------------------------------------------------
function Jewelry.jewelryUpdateStatus(status)
	GlobalState:set("JewelryStatus",status,true)
	TriggerEvent("doors:doorsStatistics",17,not status)
	exports.ox_doorlock:setDoorState(6, not status)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- JEWELRYCHECKITENS
-----------------------------------------------------------------------------------------------------------------------------------------
function Jewelry.jewelryCheckItens()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if jewelryCooldown > os.time() then
			TriggerClientEvent("Notify",source,"aviso","Aguarde "..vRP.getTimers(jewelryCooldown - os.time()),5000)
			return false
		end

		local copAmount = vRP.getUsersByPermission("policia.permissao")
		if #copAmount <= Config.jewelry['cops'] then
			TriggerClientEvent("Notify",source,"aviso","Sistema indisponível no momento, tente mais tarde.",5000)
			return false
		end

		if vRP.getInventoryItemAmount(user_id,"c4") >= 1 and vRP.getInventoryItemAmount(user_id,"bluecard") >= 1 then
			vRP.removeInventoryItem(user_id,"bluecard",1)
			vRP.removeInventoryItem(user_id,"c4",1)
			jewelryCooldown = os.time() + 7200
			jewelryTimer = 2700
			CashMachine.callPolice(-1311.87, -829.86, 17.15,"Joalheria")
			return true
		else
			TriggerClientEvent("Notify",source,"aviso","Voce nao possui <b>c4</b> e um <b>cartao azul</b>.",5000)
		end
		return false
	end
end

RegisterNetEvent("robberys:jewelry")
AddEventHandler("robberys:jewelry",function(number)
	local source = source
	local user_id = vRP.getUserId(source)
	if jewelryDrawer[number] or not GlobalState['JewelryStatus'] then
		return
	else
		jewelryDrawer[number] = true
		TriggerClientEvent("cancelando",source,true)
		vRPclient.playAnim(source,false,{"oddjobs@shop_robbery@rob_till","loop"},true)
		Wait(10000)
		Config.jewelry.itens(user_id)
		TriggerClientEvent("cancelando",source,false)
		vRPclient._removeObjects(source)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- JEWELRYTIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if GlobalState['JewelryStatus'] and jewelryTimer > 0 then
			jewelryTimer = jewelryTimer - 1
			if jewelryTimer <= 0 then
				jewelryDrawer = {}
				Jewelry.jewelryUpdateStatus(false)
			end
		end
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERSPAWN
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("vRP:playerSpawn",function(user_id,source)
	TriggerClientEvent("vrp_jewelry:jewelryFunctionStart",source)
end)