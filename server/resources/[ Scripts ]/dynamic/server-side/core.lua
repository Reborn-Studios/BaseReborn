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
local answeredCalls = {}
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
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAMADOS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("chamados:chamado")
AddEventHandler("chamados:chamado",function()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		TriggerClientEvent("dynamic:closeSystem",source)
		local Admins = vRP.getUsersByPermission("suporte.permissao")
		if #Admins > 0 then
			local description = vRP.prompt(source,"Descrição do seu chamado:","")
			if description == "" or #description < 3 then
				return
			end
			TriggerClientEvent("Notify",source,"sucesso","Chamado efetuado com sucesso, aguarde no local.",5000)
			local x,y,z = vRPC.getPositions(source)
			local identity = vRP.getUserIdentity(user_id)
			for k,v in pairs(Admins) do
				local admSrc = vRP.getUserSource(v)
				if v and v ~= user_id then
					TriggerClientEvent("chatMessage",admSrc,identity.name.." "..identity.name2.." ("..user_id..")",{107,182,84},description)
					local request = vRP.request(admSrc,"Aceitar o chamado de <b>"..identity.name.." ("..description..")</b>?",30)
					if request then
						TriggerClientEvent("NotifyPush",admSrc,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = description, sprite = 358, code = 20, title = "Chamado", x = x, y = y, z = z, name = identity.name.." "..identity.name2, phone = identity.phone, rgba = {69,115,41} })
						if not answeredCalls[user_id] then
							local identitys = vRP.getUserIdentity(v)
							answeredCalls[user_id] = os.time() + 30
							vRPC.playSound(source,"Event_Message_Purple","GTAO_FM_Events_Soundset")
							TriggerClientEvent("Notify",source,"importante","Chamado atendido por <b>"..identitys.name.." "..identitys.name2.."</b>, aguarde no local.",10000)
						else
							TriggerClientEvent("Notify",admSrc,"negado","Chamado já foi atendido por outra pessoa.",5000)
							vRPC.playSound(admSrc,"CHECKPOINT_MISSED","HUD_MINI_GAME_SOUNDSET")
						end
					end
				end
			end
		else
			TriggerClientEvent("Notify",source,"negado","Não tem administradores em serviço.",5000)
		end
	end
end)