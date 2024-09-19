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
-- TENCODES
-----------------------------------------------------------------------------------------------------------------------------------------
local Tencodes = {
	[1] = {
		tag = "QTI",
		text = "Abordagem de trânsito",
		blip = 77
	},
	[2] = {
		tag = "QTH",
		text = "Localização",
		blip = 1
	},
	[3] = {
		tag = "QRR",
		text = "Apoio com prioridade",
		blip = 38
	},
	[4] = {
		tag = "QRT",
		text = "Oficial desmaiado/ferido",
		blip = 6
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:TENCODE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("dynamic:Tencode")
AddEventHandler("dynamic:Tencode",function(Code)
	local source = source
	local Passport = vRP.getUserId(source)
	if Passport then
		local Ped = GetPlayerPed(source)
		local Coords = GetEntityCoords(Ped)
		local Identity = vRP.getUserIdentity(Passport)
		local Service = vRP.numPermission("Police")
		for k,v in pairs(Service) do
			async(function()
				local player = vRP.getUserSource(v)
				TriggerClientEvent("NotifyPush",player,{ code = Tencodes[parseInt(Code)]["tag"], text = Tencodes[parseInt(Code)]["text"], x = Coords["x"], y = Coords["y"], z = Coords["z"], title = Identity["name"].." "..Identity["name2"], time = "Recebido às "..os.date("%H:%M"), blipColor = Tencodes[parseInt(Code)]["blip"], rgba = {56,52,205} })
			end)
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
