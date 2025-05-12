-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Explode = {}
Tunnel.bindInterface("Street",Explode)
ClientExplode = Tunnel.getInterface("Street")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local race = 1
local totalRaces = #Config.streetRace.races
-----------------------------------------------------------------------------------------------------------------------------------------
-- STARTRACE
-----------------------------------------------------------------------------------------------------------------------------------------
function Explode.checkTicket()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.wantedReturn(user_id) then
			return false
		end
		if vRP.tryGetInventoryItem(user_id,"raceticket",1) then
			TriggerEvent("vrp_blipsystem:serviceEnter",source,"Corredor",75)
			vRP.upgradeStress(user_id,5)
			return true
		else
			TriggerClientEvent("Notify",source,"negado","Você não possui um ticket de corrida",5000)
		end
		return false
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STARTRACE
-----------------------------------------------------------------------------------------------------------------------------------------
function Explode.startRace()
	local source = source
	local user_id = vRP.getUserId(source)
	local copAmount = vRP.getUsersByPermission("policia.permissao")
	for k,v in pairs(copAmount) do
		async(function()
			TriggerClientEvent("Notify",v,"importante","Recebemos um relato de um corredor ilegal.",5000)
		end)
	end
	vRP.createWeebHook(Webhooks.webhookraces,"```prolog\n[ID]: "..user_id.."\n[Iniciou a corrida explosiva]: "..race..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	return race
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- RANDOMPOINT
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		race = math.random(totalRaces)
		Wait(5*60000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYMENTMETHOD
-----------------------------------------------------------------------------------------------------------------------------------------
function Explode.paymentMethod(raceSelect)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		vRP.wantedTimer(user_id,300)
		TriggerEvent("vrp_blipsystem:serviceExit",source)
		local payment = math.random(Config.streetRace['payment']['min'],Config.streetRace['payment']['min'])
		if raceSelect and Config.streetRace.races[raceSelect] and Config.streetRace.races[raceSelect]['payment'] then
			payment = math.random(Config.streetRace.races[raceSelect]['payment']['min'],Config.streetRace.races[raceSelect]['payment']['max'])
		end
		vRP.giveInventoryItem(user_id,"dollars2",payment,true)
		TriggerClientEvent("vrp_sound:source",source,"coin",0.5)
		vRP.createWeebHook(Webhooks.webhookraces,"```prolog\n[ID]: "..user_id.."\n[Ganhou da corrida explosiva]: $"..payment..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEFUSAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("defusar",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"policia.permissao") then
			local nplayer = vRPclient.nearestPlayer(source,10)
			if nplayer then
				ClientExplode.defuseRace(nplayer)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP_STREETRACE:EXPLOSIVEPLAYERS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("vrp_streetrace:explosivePlayers")
AddEventHandler("vrp_streetrace:explosivePlayers",function()
	local source = source
	TriggerEvent("vrp_blipsystem:serviceExit",source)
end)
