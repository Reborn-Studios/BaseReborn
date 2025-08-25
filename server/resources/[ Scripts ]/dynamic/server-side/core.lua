-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel") or {}
local Proxy = module("vrp","lib/Proxy") or {}
vRPC = Tunnel.getInterface("vRP")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Creative = {}
Tunnel.bindInterface("dynamic",Creative)
vSKINSHOP = Tunnel.getInterface("will_skinshop")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local CountClothes = {}
local answeredCalls = {}
local DEFAULT_CLOTHES_AMOUNT = 3		-- Quantidade de roupas para salvar para todos
local ClothesPerms = {					-- Quantidade de roupas para VIPs
	Platina = 8,
	Ouro = 6,
	Prata = 4,
	Bronze = 2
}
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
		if next(Admins) then
			local description = vRP.prompt(source,"Descrição do seu chamado:","")
			if description == "" or #description < 3 then
				return
			end
			TriggerClientEvent("Notify",source,"sucesso","Chamado efetuado com sucesso, aguarde no local.",5000)
			local x,y,z = vRPC.getPositions(source)
			local identity = vRP.getUserIdentity(user_id)
			for k,v in pairs(Admins) do
				local admSrc = vRP.getUserSource(v)
				if admSrc and v ~= user_id then
					TriggerClientEvent("chatMessage",admSrc,identity.name.." "..identity.name2.." ("..user_id..")",{107,182,84},description)
					local request = vRP.request(admSrc,"Aceitar o chamado de <b>"..identity.name.." ("..description..")</b>?",30)
					if request then
						TriggerClientEvent("NotifyPush",admSrc,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = description, sprite = 358, code = 20, title = "Chamado", x = x, y = y, z = z, name = identity.name.." "..identity.name2, phone = identity.phone, rgba = {69,115,41} })
						if not answeredCalls[user_id] or answeredCalls[user_id] < os.time() then
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
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLOTHES
-----------------------------------------------------------------------------------------------------------------------------------------
function Creative.myClothes()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		local Clothes = {}

		CountClothes[user_id] = DEFAULT_CLOTHES_AMOUNT

		for Permission,Multiplier in pairs(ClothesPerms) do
			if vRP.hasPermission(user_id,Permission) then
				CountClothes[user_id] = CountClothes[user_id] + Multiplier
			end
		end

		local Consult = vRP.query("SELECT * FROM vrp_user_data WHERE user_id = '"..user_id.."' AND dkey LIKE '%Clothes%'")
		local consult = Consult or {}
		if consult then
			for k,v in pairs(consult) do
				if v.dvalue then
					Clothes[#Clothes + 1] = v.dkey
				end
			end
		end
		return Clothes
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:CLOTHES
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterServerEvent("dynamic:Clothes")
AddEventHandler("dynamic:Clothes",function(Mode)
	local source = source
	local Passport = vRP.Passport(source)
	if Passport then
		local query = vRP.query("SELECT * FROM vrp_user_data WHERE user_id = '"..Passport.."' AND dkey LIKE '%Clothes%'")
		local Consult = {}
		local Number = 0
		for k,v in pairs(query) do
			Consult[v.dkey] = json.decode(v.dvalue)
			Number = Number + 1
		end
		local Split = splitString(Mode)
		local Name = Split[2]
		if Split[1] == "Save" then
			if Number >= CountClothes[Passport] then
				TriggerClientEvent("Notify",source,"Armário","Limite atingide de roupas.",5000)
				return false
			end
			local Keyboard = vRP.prompt(source,"Nome do preset")
			if Keyboard then
				local Check = Keyboard
				if string.len(Check) >= 4 then
					if not Consult[Check] then
						Consult["Clothes:"..Check] = vSKINSHOP.Customization(source)
						vRP.setUData(Passport,"Clothes:"..Check,json.encode(Consult["Clothes:"..Check]))
						TriggerClientEvent("dynamic:AddMenu",source,Check,"Informações da vestimenta.",Check,"wardrobe")
						TriggerClientEvent("dynamic:AddButton",source,"Aplicar","Vestir-se com as vestimentas.","dynamic:Clothes","Apply-"..Check,Check,true)
						TriggerClientEvent("dynamic:AddButton",source,"Remover","Deletar a vestimenta do armário.","dynamic:Clothes","Delete-"..Check,Check,true,true)
					end
				else
					TriggerClientEvent("Notify",source,"Armário","Nome escolhido precisa possuir mínimo de 4 letras.",5000)
				end
			end
		elseif Split[1] == "Delete" then
			if Consult[Name] then
				Consult[Name] = nil
				vRP.execute("vRP/rem_user_dkey",{ user_id = Passport, key = Name })
			end
		elseif Split[1] == "Apply" then
			if Consult[Name] then
				TriggerClientEvent("skinshop:Apply",source,Consult[Name],true)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("Disconnect",function(Passport)
	if CountClothes[Passport] then
		CountClothes[Passport] = nil
	end
end)