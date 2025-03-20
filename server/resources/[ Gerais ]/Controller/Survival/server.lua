-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
SvServer = {}
Tunnel.bindInterface("Survival",SvServer)
SvTunnel = Tunnel.getInterface("Survival")
local resetCoords = Config.Survival['reviveCoords']
local MaxHealth = GlobalState['Basics']['MaxHealth'] or 400
-----------------------------------------------------------------------------------------------------------------------------------------
-- GOD
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("god",function(source,args,rawCommand)
	if source == 0 then
		local nplayer = vRP.getUserSource(parseInt(args[1]))
		if nplayer then
			SvTunnel.revivePlayer(nplayer,MaxHealth)
			TriggerClientEvent("resetBleeding",nplayer)
			TriggerClientEvent("resetDiagnostic",nplayer)
			print('Jogador revivido!')
		else
			print('Jogador não esta online!')
		end
		return
	end
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"moderador.permissao") then
			if args[1] then
				local nplayer = vRP.getUserSource(parseInt(args[1]))
				if nplayer then
					SvTunnel.revivePlayer(nplayer,MaxHealth)
					TriggerClientEvent("resetBleeding",nplayer)
					TriggerClientEvent("resetDiagnostic",nplayer)
					vRP.createWeebHook(Webhooks.webhookgod,"```prolog\n[ID]: "..user_id.."\n[DEU GOD PARA:]: "..args[1].." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
				end
			else
				SvTunnel.revivePlayer(source,MaxHealth)
				TriggerClientEvent("resetBleeding",source)
				TriggerClientEvent("resetDiagnostic",source)
				vRP.createWeebHook(Webhooks.webhookgod,"```prolog\n[ID]: "..user_id.."\n[DEU GOD PARA SI MESMO]"..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GOOD
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("good",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		if vRP.hasPermission(user_id,"Owner") then
			if args[1] then
				local nplayer = vRP.getUserSource(parseInt(args[1]))
				if nplayer then
					vRP.downgradeStress(user_id,100)
					vRPclient.setArmour(nplayer,100)
					SvTunnel.revivePlayer(nplayer,MaxHealth)
					vRP.upgradeThirst(parseInt(args[1]),100)
					vRP.upgradeHunger(parseInt(args[1]),100)
					TriggerClientEvent("resetBleeding",nplayer)
					TriggerClientEvent("resetDiagnostic",nplayer)
				end
			else
				vRP.upgradeThirst(user_id,100)
				vRP.upgradeHunger(user_id,100)
				vRPclient.setArmour(source,100)
				vRP.downgradeStress(user_id,100)
				SvTunnel.revivePlayer(source,MaxHealth)
				TriggerClientEvent("resetBleeding",source)
				TriggerClientEvent("resetDiagnostic",source)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- REVIVE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("re",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		local nplayer = vRPclient.nearestPlayer(source,2)
		RevivePlayer(user_id, nplayer)
	end
end)

RegisterNetEvent("paramedic:Revive")
AddEventHandler("paramedic:Revive",function(nplayer)
	local source = source
	local user_id = vRP.getUserId(source)
	if type(nplayer) == "table" or not nplayer then
		nplayer = vRPclient.nearestPlayer(source,2)
	end
	if not nplayer then return end
	RevivePlayer(user_id, nplayer)
end)

function RevivePlayer(user_id, nplayer)
	if vRP.hasPermission(user_id,"paramedico.permissao") or vRP.hasPermission(user_id,"suporte.permissao") then
		if nplayer then
			if SvTunnel.Death(nplayer) then
				local source = vRP.getUserSource(user_id)
				TriggerClientEvent("Progress",source,10000,"Reanimando...")
				TriggerClientEvent("cancelando",source,true)
				vRPclient._playAnim(source,false,{"mini@cpr@char_a@cpr_str","cpr_pumpchest"},true)
				if not SvTunnel.finalizado(nplayer) then
					SetTimeout(10000,function()
						vRPclient._removeObjects(source)
						SvTunnel.revivePlayer(nplayer,110)
						TriggerClientEvent("resetBleeding",nplayer)
						TriggerClientEvent("cancelando",source,false)
						vRP.createWeebHook(Webhooks.webhookreviver,"```prolog\n[ID]: "..user_id.."\n[REVIVEU:]: "..vRP.getUserId(nplayer).." "..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
					end)
				else
					SetTimeout(10000,function()
						TriggerClientEvent("cancelando",source,false)
						vRPclient._removeObjects(source)
						TriggerClientEvent("Notify",source,"negado","Cidadão está sem pulso.",5000)
						TriggerClientEvent("Notify",nplayer,"negado","Você está sem pulso.",5000)
						Wait(120000)
						if vRPclient.getHealth(nplayer) >= 101 then return end
						ResetPed(nplayer)
					end)
				end
			end
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- RESET PED
-----------------------------------------------------------------------------------------------------------------------------------------
function SvServer.ResetPedToHospital()
	local source = source
	ResetPed(source)
end

function ResetPed(source)
	local user_id = vRP.getUserId(source)
	if user_id then
		if SvTunnel.Death(source) then
			SvTunnel.finishDeath(source)
			TriggerClientEvent("resetHandcuff",source)
			TriggerClientEvent("resetBleeding",source)
			TriggerClientEvent("resetDiagnostic",source)
			TriggerClientEvent("vrp_survival:FadeOutIn",source)
			Wait(1000)
			local clear = vRP.clearInventory(user_id)
			if clear then
				vRPclient._clearWeapons(source)
			end
			vRP.upgradeThirst(user_id,100)
			vRP.upgradeHunger(user_id,100)
			Wait(2000)
			vRPclient.teleport(source,resetCoords[1], resetCoords[2], resetCoords[3])
			Wait(1000)
			SvTunnel.SetPedInBed(source)
			Wait(1000)
			TriggerClientEvent("Notify",source,"importante","Você acabou de acordar de um coma.",3000)
		end
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- COMMANDOS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("finalizar",function(source,args,rawCommand)
	local nplayer = vRPclient.nearestPlayer(source,2)
	if SvTunnel.Death(nplayer) then
		TriggerClientEvent("vrp_survival:finalizado",nplayer)
		TriggerClientEvent("Notify",source,"sucesso","Cidadão finalizado.",3000)
		TriggerClientEvent("Notify",nplayer,"aviso","Você foi finalizado",3000)
	end
end)

RegisterCommand("bugado",function(source,args,rawCommand)
	if vRPclient.getHealth(source) >= 101 then
		TriggerClientEvent("vrp_survival:desbugar",source)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SOCORRO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("socorro",function(source,args,rawCommand)
	local user_id = vRP.getUserId(source)
	if user_id then
		local paramedic = vRP.getUsersByPermission("paramedico.permissao")
		if #paramedic == 0 then
			local valor = Config.Survival['socorroValue']
			local request = vRP.request(source, "Você deseja dar socorro por R$"..vRP.format(valor).."?", 60)
			if request then
				if SvTunnel.Death(source) and not SvTunnel.finalizado(source) then
					if vRP.paymentBank(user_id,valor) then
						SvTunnel.revivePlayer(source,120)
						TriggerClientEvent("resetBleeding",source)
						vRP.createWeebHook(Webhooks.webhooksocorro,"```prolog\n[ID]: "..user_id.."\n[DEU SOCORRO]"..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
					else
						TriggerClientEvent("Notify",source,"negado","Dinheiro insuficiente na sua conta bancária.",3000)
					end
				else
					TriggerClientEvent("Notify",source,"negado","Você não esta morto ou foi finalizado.",3000)
				end
			end
		else
			TriggerClientEvent("Notify",source,"negado","Existe paramedicos em serviço.",3000)
		end
	end
end)

local answeredCalls = {}
local description = "Me machuquei feio e estou precisando de ajuda!"

function SvServer.callMedics()
	local source = source
    local user_id = vRP.getUserId(source)
    local players = vRP.getUsersByPermission("paramedico.permissao")
    if #players > 0 then
        TriggerClientEvent("Notify",source,"sucesso","Chamado efetuado com sucesso",5000)
        local x,y,z = vRPclient.getPositions(source)
        local identity = vRP.getUserIdentity(user_id)
        for k,v in pairs(players) do
            local sourcecall = vRP.getUserSource(v)
            if v and v ~= user_id then
                TriggerClientEvent("chatMessage",sourcecall,identity.name.." "..identity.name2.." ("..user_id..")",{107,182,84},description)
                local request = vRP.request(sourcecall,"Aceitar o chamado de <b>"..identity.name.." ("..description..")</b>?",30)
                if request then
                    TriggerClientEvent("NotifyPush",sourcecall,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = description, sprite = 358, code = 20, title = "Chamado", x = x, y = y, z = z, name = identity.name.." "..identity.name2, phone = identity.phone, rgba = {69,115,41} })
                    if not answeredCalls[user_id] then
                        local identitys = vRP.getUserIdentity(v)
                        answeredCalls[user_id] = os.time() + 30
                        vRPclient.playSound(source,"Event_Message_Purple","GTAO_FM_Events_Soundset")
                        TriggerClientEvent("Notify",source,"importante","Chamado atendido por <b>"..identitys.name.." "..identitys.name2.."</b>, aguarde no local.",10000)
                    else
                        if answeredCalls[user_id] then
                            TriggerClientEvent("Notify",sourcecall,"negado","Chamado já foi atendido por outra pessoa.",5000)
                            vRPclient.playSound(sourcecall,"CHECKPOINT_MISSED","HUD_MINI_GAME_SOUNDSET")
                        end
                    end
                end
            end
        end
    else
        TriggerClientEvent("Notify",source,"negado","Não tem medicos em serviço.",5000)
    end
end
