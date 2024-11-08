-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRPC = Tunnel.getInterface("vRP")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("dynamic",Creative)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:EMERGENCYANNOUNCE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("dynamic:EmergencyAnnounceMedic")
AddEventHandler("dynamic:EmergencyAnnounceMedic",function()
	local source = source
	local Passport = vRP.getUserId(source)
	if Passport then
		if vRP.hasPermission(Passport,"paramedico.permissao") then
			TriggerClientEvent("dynamic:closeSystem",source)
			local message = vRP.prompt(source,"Mensagem:","")
			if message then
				TriggerClientEvent("Notify",-1,"Anuncio Hospital",'<b>'..message.."</b>",15000)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:EMERGENCYANNOUNCE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("dynamic:EmergencyAnnounce")
AddEventHandler("dynamic:EmergencyAnnounce",function()
	local source = source
	local Passport = vRP.getUserId(source)
	if Passport then
		if vRP.hasPermission(Passport,"policia.permissao") then
			TriggerClientEvent("dynamic:closeSystem",source)
			local message = vRP.prompt(source,"Mensagem:","")
			if message then
				TriggerClientEvent("Notify",-1,"Anuncio Policial",'<b>'..message.."</b>",30000)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PRESET
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("player:Preset")
AddEventHandler("player:Preset",function(Number)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local model = vRPC.getModelPlayer(source)
		local modelType = model == "mp_m_freemode_01" and "homem" or "mulher"
		if Presets["Paramedic"][Number] then
			TriggerClientEvent("updateRoupas",source,Presets["Paramedic"][Number][modelType])
		elseif Presets["Police"][Number] then
			TriggerClientEvent("updateRoupas",source,Presets["Police"][Number][modelType])
		elseif Presets["Mechanic"][Number] then
			TriggerClientEvent("updateRoupas",source,Presets["Mechanic"][Number][modelType])
		end
	end
end)
