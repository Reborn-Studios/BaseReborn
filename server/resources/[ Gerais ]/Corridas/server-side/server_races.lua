-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
Tunnel = module("vrp","lib/Tunnel")
Proxy = module("vrp","lib/Proxy")
Webhooks = module("config/webhooks")
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Races = {}
Tunnel.bindInterface("Races",Races)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FINISHRACES
-----------------------------------------------------------------------------------------------------------------------------------------
function Races.finishRaces(selected)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local payment = 0
		if selected and Config.races['runners'][selected] and Config.races['runners'][selected]['payment'] then
			payment = math.random(Config.races['runners'][selected]['payment']['min'],Config.races['runners'][selected]['payment']['max'])
		else
			payment = math.random(Config.races['payment']['min'],Config.races['payment']['max'])
		end
		vRP.giveInventoryItem(user_id,"dollars2",payment)
		vRP.createWeebHook(Webhooks.webhookraces,"```prolog\n[ID]: "..user_id.."\n[Ganhou da corrida normal]: $"..payment..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STARTRACES
-----------------------------------------------------------------------------------------------------------------------------------------
function Races.startRaces()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		TriggerClientEvent("Notify",source,"importante","A policia foi acionada, corra!",5000)
		vRP.createWeebHook(Webhooks.webhookraces,"```prolog\n[ID]: "..user_id.."\n[Iniciou corrida] "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CALLPOLICE
-----------------------------------------------------------------------------------------------------------------------------------------
function Races.callPolice(x,y,z)
	local copAmount = vRP.getUsersByPermission("policia.permissao")
	for k,v in pairs(copAmount) do
		local player = vRP.getUserSource(v)
		async(function()
			TriggerClientEvent("NotifyPush",player,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = "Estou vendo um bando de incompetente planejando uma corrida por aqui!", code = 10, title = "Corrida em andamento", x = x, y = y, z = z, rgba = {95,158,160} })
		end)
	end
end
