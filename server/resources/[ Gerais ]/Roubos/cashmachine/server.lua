-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
Webhooks = module("config/webhooks")

vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
vTASKBAR = Tunnel.getInterface("taskbar")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
CashMachine = {}
Tunnel.bindInterface("cashmachine",CashMachine)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local active = {}
local ROBBERY_TIME = 15
local registerTimers = {}

local function checkClosestMachine(x,y,z)
	for k,v in pairs(registerTimers) do
		if #(vector3(x,y,z) - vector3(v[1],v[2],v[3])) <= 2.0 and v[4] > os.time() then
			return v[4]
		end
	end
	return false
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STARTMACHINE
-----------------------------------------------------------------------------------------------------------------------------------------
function CashMachine.startMachine(x,y,z)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local copAmount = vRP.getUsersByPermission("policia.permissao")
		if #copAmount <= Config.cashMachine['atm']['cops'] then
			TriggerClientEvent("Notify",source,"aviso","Sistema indisponível no momento, tente mais tarde.",5000)
			return false
		end
		local checkTimer = checkClosestMachine(x,y,z)
		if checkTimer then
			TriggerClientEvent("Notify",source,"aviso","Aguarde "..vRP.getTimers(checkTimer - os.time()),5000)
			return false
		end
		if vRP.tryGetInventoryItem(user_id,"c4",1,true) then
			table.insert(registerTimers,{ x, y, z, os.time() + 120 })
			vRP.wantedTimer(parseInt(user_id),300)
			vRP.createWeebHook(Webhooks.rouboshook,"```prolog\n[ID]: "..user_id.."\n[ROUBOU]: ATM "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
			return true
		else
			TriggerClientEvent("Notify",source,"negado","Necessário de 1x C4.",5000)
		end
	end
	return false
end

function CashMachine.stopMachine(x,y,z)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		TriggerEvent("ox_inventory:customDrop","Caixinha",Config.cashMachine['atm']['payment'], vector3(x,y,z))
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CALLPOLICE
-----------------------------------------------------------------------------------------------------------------------------------------
function CashMachine.callPolice(x,y,z,reason)
	local copAmount = vRP.getUsersByPermission("policia.permissao")
	for k,v in pairs(copAmount) do
		local player = vRP.getUserSource(v)
		async(function()
			TriggerClientEvent("NotifyPush",player,{
				time = os.date("%H:%M:%S - %d/%m/%Y"),
				text = "Me ajuda esta tendo um roubo a "..reason.." aqui neste bairro!",
				code = 31,
				title = "Roubo a "..reason,
				x = x,
				y = y,
				z = z,
				rgba = {170,80,25}
			})
		end)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CASH MACHINE
-----------------------------------------------------------------------------------------------------------------------------------------
function CashMachine.cashRegister(x,y,z)
	local source = source
	local user_id = vRP.getUserId(source)
	local copAmount = vRP.getUsersByPermission("policia.permissao")
	if #copAmount >= Config.cashMachine['machine']['cops'] then
		vRPclient.stopActived(source)
		if active[user_id] then
			TriggerClientEvent("Notify",source,"aviso","Aguarde "..vRP.getTimers(active[user_id] - os.time()),5000)
			return false
		end
		local checkTimer = checkClosestMachine(x,y,z)
		if checkTimer then
			TriggerClientEvent("Notify",source,"aviso","Aguarde "..vRP.getTimers(checkTimer - os.time()),5000)
			return false
		end
		if vRP.tryGetInventoryItem(user_id,"lockpick",1,true) then
			table.insert(registerTimers,{ x, y, z, os.time() + 120 })
			active[user_id] = os.time() + ROBBERY_TIME
			TriggerClientEvent("cashRegister:updateRegister",-1,registerTimers)
			vRPclient._playAnim(source,false,{"oddjobs@shop_robbery@rob_till","loop"},true)
			TriggerClientEvent("Progress",source,ROBBERY_TIME * 1000,"Roubando...")
			CashMachine.callPolice(x,y,z,"Caixa Eletrônico")
			local playerPed = GetPlayerPed(source)
			repeat
				local actualTimer = os.time()
				if active[user_id] > actualTimer and active[user_id] <= (actualTimer + ROBBERY_TIME) then
					vRP.giveInventoryItem(user_id,"dollars2",Config.cashMachine['machine']['payment'],true)
				end
				Wait(1000)
			until active[user_id] <= actualTimer or #(GetEntityCoords(playerPed) - vector3(x,y,z)) > 2.0 or GetEntityHealth(playerPed) <= 101
			active[user_id] = nil
			Wait(500)
			vRPclient._removeObjects(source)
			vRP.wantedTimer(user_id,ROBBERY_TIME)
			vRP.createWeebHook(Webhooks.rouboshook,"```prolog\n[ID]: "..user_id.."\n[ROUBOU]: Caixa Eletrônico "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
			return true
		else
			TriggerClientEvent("Notify",source,"negado","Necessário de 1x lockpick.",5000)
			return false
		end
	else
		TriggerClientEvent("Notify",source,"importante","Necessário de no mínimo "..Config.cashMachine['machine']['cops'].." policias em patrulha.",5000)
		return false
	end
end
