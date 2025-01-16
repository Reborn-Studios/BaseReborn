-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
HPServer = {}
Tunnel.bindInterface("Hospital",HPServer)
HClient = Tunnel.getInterface("Hospital")
SVClient = Tunnel.getInterface("Survival")
-----------------------------------------------------------------------------------------------------------------------------------------
-- BONES
-----------------------------------------------------------------------------------------------------------------------------------------
local bones = {
	[11816] = "Pelvis",
	[58271] = "Coxa Esquerda",
	[63931] = "Panturrilha Esquerda",
	[14201] = "Pe Esquerdo",
	[2108] = "Dedo do Pe Esquerdo",
	[65245] = "Pe Esquerdo",
	[57717] = "Pe Esquerdo",
	[46078] = "Joelho Esquerdo",
	[51826] = "Coxa Direita",
	[36864] = "Panturrilha Direita",
	[52301] = "Pe Direito",
	[20781] = "Dedo do Pe Direito",
	[35502] = "Pe Direito",
	[24806] = "Pe Direito",
	[16335] = "Joelho Direito",
	[23639] = "Coxa Direita",
	[6442] = "Coxa Direita",
	[57597] = "Espinha Cervical",
	[23553] = "Espinha Toraxica",
	[24816] = "Espinha Lombar",
	[24817] = "Espinha Sacral",
	[24818] = "Espinha Cocciana",
	[64729] = "Escapula Esquerda",
	[45509] = "Braco Esquerdo",
	[61163] = "Antebraco Esquerdo",
	[18905] = "Mao Esquerda",
	[26610] = "Dedo Esquerdo",
	[4089] = "Dedo Esquerdo",
	[4090] = "Dedo Esquerdo",
	[26611] = "Dedo Esquerdo",
	[4169] = "Dedo Esquerdo",
	[4170] = "Dedo Esquerdo",
	[26612] = "Dedo Esquerdo",
	[4185] = "Dedo Esquerdo",
	[4186] = "Dedo Esquerdo",
	[26613] = "Dedo Esquerdo",
	[4137] = "Dedo Esquerdo",
	[4138] = "Dedo Esquerdo",
	[26614] = "Dedo Esquerdo",
	[4153] = "Dedo Esquerdo",
	[4154] = "Dedo Esquerdo",
	[60309] = "Mao Esquerda",
	[36029] = "Mao Esquerda",
	[61007] = "Antebraco Esquerdo",
	[5232] = "Antebraco Esquerdo",
	[22711] = "Cotovelo Esquerdo",
	[10706] = "Escapula Direita",
	[40269] = "Braco Direito",
	[28252] = "Antebraco Direito",
	[57005] = "Mao Direita",
	[58866] = "Dedo Direito",
	[64016] = "Dedo Direito",
	[64017] = "Dedo Direito",
	[58867] = "Dedo Direito",
	[64096] = "Dedo Direito",
	[64097] = "Dedo Direito",
	[58868] = "Dedo Direito",
	[64112] = "Dedo Direito",
	[64113] = "Dedo Direito",
	[58869] = "Dedo Direito",
	[64064] = "Dedo Direito",
	[64065] = "Dedo Direito",
	[58870] = "Dedo Direito",
	[64080] = "Dedo Direito",
	[64081] = "Dedo Direito",
	[28422] = "Mao Direita",
	[6286] = "Mao Direita",
	[43810] = "Antebraço Direito",
	[37119] = "Antebraço Direito",
	[2992] = "Cotovelo Direito",
	[39317] = "Pescoco",
	[31086] = "Cabeca",
	[12844] = "Cabeca",
	[65068] = "Rosto"
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- BLEEDING
-----------------------------------------------------------------------------------------------------------------------------------------
local function getBleeding(source,nplayer)
	local user_id = vRP.getUserId(source)
	if nplayer and vRP.hasPermission(user_id,"paramedico.permissao") then
        TriggerClientEvent("resetBleeding",nplayer)
        TriggerClientEvent("Notify",source,"sucesso","O sangramento parou.",5000)
    end
end

RegisterCommand("sangramento",function(source,args,rawCommand)
	local nplayer = vRPclient.nearestPlayer(source,3)
    getBleeding(source,nplayer)
end)

RegisterNetEvent("hospital:sangramento")
AddEventHandler("hospital:sangramento",function(nplayer)
	local source = source
	if type(nplayer) == "table" or not nplayer then
		nplayer = vRPclient.nearestPlayer(source,2)
	end
	if not nplayer then return end
	getBleeding(source,nplayer)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DIAGNOSTIC
-----------------------------------------------------------------------------------------------------------------------------------------
local function getDiagnostic(source,nplayer)
	local user_id = vRP.getUserId(source)
	if nplayer and vRP.hasPermission(user_id,"paramedico.permissao") then
		local hurt = false
		local diagnostic,bleeding = HClient.getDiagnostic(nplayer)
		if diagnostic then
			local damaged = {}
			for k,v in pairs(diagnostic) do
				damaged[k] = bones[k]
			end
			if next(damaged) then
				hurt = true
				TriggerClientEvent("drawInjuries",source,nplayer,damaged)
			end
		end

		local text = ""
		if Config.Hospital['bleeding'] and bleeding > 4 then
			text = "- <b>Sangrando</b><br>"
		end

		if diagnostic.taser then
			text = text .. "- <b>Taser</b><br>"
		end

		if diagnostic.vehicle then
			text = text .. "- <b>Indicios de acidente de veiculo</b><br>"
		end

		if text ~= "" then
			TriggerClientEvent("Notify",source,"aviso","Status do paciente:<br>" .. text,5000)
		elseif not hurt then
			TriggerClientEvent("Notify",source,"sucesso","Status do paciente:<br>- <b>Nada encontrado</b>",5000)
		end
		vRP.createWeebHook(Webhooks.webhookdiagnostico,"```prolog\n[ID]: "..user_id.."\n[DIAGNOSTICOU]: "..nplayer.."\n[RESULTADO]: "..text.. " "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
	end
end

RegisterCommand("diagnostico",function(source,args,rawCommand)
	local nplayer = vRPclient.nearestPlayer(source,3)
	getDiagnostic(source,nplayer)
end)

RegisterNetEvent("hospital:diagnostico")
AddEventHandler("hospital:diagnostico",function(nplayer)
	local source = source
	if type(nplayer) == "table" or not nplayer then
		nplayer = vRPclient.nearestPlayer(source,2)
	end
	getDiagnostic(source,nplayer)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TREAT
-----------------------------------------------------------------------------------------------------------------------------------------
local function getTreatment(user_id,nplayer)
	if vRP.hasPermission(user_id,"paramedico.permissao") then
		if nplayer then
			if not SVClient.deadPlayer(nplayer) then
				local source = vRP.getUserSource(user_id)
				vRPclient.playAnim(source,false,{ "amb@prop_human_parking_meter@female@idle_a","idle_a_female" },true)
				Wait(3000)
				async(function()
					SVClient.startCure(nplayer)
				end)
				TriggerClientEvent("resetBleeding",nplayer)
				TriggerClientEvent("resetDiagnostic",nplayer)
				vRPclient._stopAnim(source)
				TriggerClientEvent("Notify",source,"sucesso","O tratamento começou.",5000)
				vRP.createWeebHook(Webhooks.webhooktratamento,"```prolog\n[ID]: "..user_id.."\n[DEU TRATAMENTO PARA:]: "..nplayer.." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
			end
		end
	end
end

RegisterCommand("tratamento",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	local nplayer = vRPclient.nearestPlayer(source,3)
	getTreatment(user_id,nplayer)
end)

RegisterNetEvent("hospital:tratamento")
AddEventHandler("hospital:tratamento",function(nplayer)
	local source = source
	local user_id = vRP.getUserId(source)
	if type(nplayer) == "table" or not nplayer then
		nplayer = vRPclient.nearestPlayer(source,2)
	end
	if not nplayer then return end
	getTreatment(user_id,nplayer)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHECKSERVICES
-----------------------------------------------------------------------------------------------------------------------------------------
function HPServer.checkServices()
	local amountMedics = vRP.getUsersByPermission("paramedico.permissao")
	if parseInt(#amountMedics) >= 1 then
		TriggerClientEvent("Notify",source,"negado","Existem paramédicos em serviço.",5000)
		return false
	end
	return true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PAYMENTCHECKIN
-----------------------------------------------------------------------------------------------------------------------------------------
function HPServer.paymentCheckin()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"tratamentolivre.permissao") then
			return true
		end
		local treatmentValue = Config.Hospital['treatmentValue']
		if treatmentValue['freePolice'] and vRP.hasPermission(user_id,"policia.permissao") then
			return true
		end

		local value = treatmentValue['default']
		if GetEntityHealth(GetPlayerPed(source)) <= 101 then
			value = treatmentValue['death']
		end
		if vRP.paymentBank(user_id,value) then
			return true
		else
			TriggerClientEvent("Notify",source,"negado","Dinheiro insuficiente para o tratamento.",5000)
		end
	end
	return false
end
