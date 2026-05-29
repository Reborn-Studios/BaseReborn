-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel") or {}
local Proxy = module("vrp","lib/Proxy") or {}
vRPC = Tunnel.getInterface("vRP")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Active = {}
local Locations = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- PRISON:SERVICE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("prison:Service")
AddEventHandler("prison:Service",function(Data)
	local source = source
	local Passport = vRP.Passport(source)
	local Identity = vRP.Identity(Passport)
	if Passport and Identity and Identity.Prison > 0 then
		Locations[Passport] = Locations[Passport] or {}

		local CurrentTimer = os.time()
		local LastTimer = Locations[Passport][Data.shop]

		if LastTimer then
			local RemainingTime = LastTimer - CurrentTimer
			if RemainingTime > 0 then
				TriggerClientEvent("Notify",source,"Atenção","Aguarde "..CompleteTimers(RemainingTime)..".","amarelo",5000)

				return false
			end
		end

		Reduction(source,Passport,Data.shop)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PRISON:TIMER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("prison:Timer")
AddEventHandler("prison:Timer",function()
	local source = source
	local Passport = vRP.Passport(source)
	local Identity = vRP.Identity(Passport)
	if Passport and Identity and Identity.Prison > 0 then
		vRP.UpdatePrison(Passport,1)
		local Identity = vRP.Identity(Passport)
		if Identity and Identity.Prison <= 0 then
			vRP.Teleport(source,1896.15,2604.44,45.75)
			Player(source).state.Prison = false
			TriggerClientEvent("Notify",source,"Boolingbroke","Serviços finalizados.","policia",5000)
		else
			TriggerClientEvent("Notify",source,"Boolingbroke","Reduzimos 1 serviço, restando um total de "..Identity.Prison..".","policia",5000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REDUCTION
-----------------------------------------------------------------------------------------------------------------------------------------
function Reduction(source,Passport,Number)
	if Active[Passport] then
		return false
	end

	local CurrentTimer = os.time()
	Player(source).state.Cancel = true
	Player(source).state.Buttons = true
	Active[Passport] = CurrentTimer + 10
	Locations[Passport][Number] = CurrentTimer + 300
	TriggerClientEvent("Progress",source,"Vasculhando",10000)
	vRPC.playAnim(source,false,{"amb@prop_human_bum_bin@base","base"},true)

	while Active[Passport] do
		if os.time() >= Active[Passport] then
			vRPC.Destroy(source)
			Active[Passport] = nil
			vRP.UpdatePrison(Passport,2)
			Player(source).state.Cancel = false
			Player(source).state.Buttons = false

			local Identity = vRP.Identity(Passport)
			if Identity and Identity.Prison <= 0 then
				vRP.Teleport(source,1896.15,2604.44,45.75)
                Player(source).state.Prison = false
				TriggerClientEvent("Notify",source,"Boolingbroke","Serviços finalizados.","policia",5000)
			else
				TriggerClientEvent("Notify",source,"Boolingbroke","Reduzimos 2 serviços, restando um total de "..Identity.Prison..".","policia",5000)
			end

			break
		end

		Wait(100)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Disconnect",function(Passport)
	if Active[Passport] then
		Active[Passport] = nil
	end
end)