local Proxy = module("vrp","lib/Proxy") or {}
local Tunnel = module("vrp","lib/Tunnel") or {}
local Webhooks = module("config/webhooks") or {}
local items = module('vrp',"config/Itemlist") or {}
vRP = Proxy.getInterface("vRP")
vRPclient = Tunnel.getInterface("vRP")
ESX = exports.es_extended:getSharedObject()
local vTASKBAR = Tunnel.getInterface("taskbar")
local vSURVIVAL = Tunnel.getInterface("Survival")
local vPLAYER = Tunnel.getInterface("Player")

local active = {}
local Objects = {}
local Trashes = {}
local MaxHealth = GlobalState['Basics']['MaxHealth'] or 400

RegisterServerEvent("ox_inventory:useItem")
AddEventHandler("ox_inventory:useItem",function(source, itemName, rAmount, data)
	local user_id = vRP.getUserId(source)
	if vRPclient.getHealth(source) <= 101 then return end
	if not rAmount or rAmount <= 0 then
		rAmount = 1
	end

	if vRP.itemTypeList(itemName) == "weapon" then
		if vRP.tryGetInventoryItem(user_id,itemName,1) then
			local Ammo = 0
			if not vRP.itemAmmoList(itemName) then
				Ammo = 1
			end
			vRPclient.giveWeapons(source, {[itemName] = { ammo = Ammo }})
		end
		return
	end

	if vRP.itemTypeList(itemName) == "ammo" then
		local CurrentWeapon = GetCurrentPedWeapon(GetPlayerPed(source))
		if CurrentWeapon then
			local Weapon = nil
			for k,v in pairs(items) do
				if v.type == "weapon" and CurrentWeapon == GetHashKey(k) and v.ammo == itemName then
					Weapon = k
					break
				end
			end
			if not Weapon then
				TriggerClientEvent("Notify",source,"negado","Munição não corresponde a arma",5000)
				return
			end
			local AmmoClip = vRPclient.getWeaponAmmo(source,Weapon)
			if Weapon == "WEAPON_PETROLCAN" then
				if (AmmoClip + rAmount) > 4500 then
					rAmount = 4500 - AmmoClip
				end
			else
				if (AmmoClip + rAmount) > 250 then
					rAmount = 250 - AmmoClip
				end
			end
			if vRP.tryGetInventoryItem(user_id,itemName,rAmount) then
				vRPclient.giveWeapons(source, {[Weapon] = { ammo = rAmount }})
			end
		else
			TriggerClientEvent("Notify",source,"negado","Você precisa estar com a arma equipada",5000)
		end
		return
	end

	if ESX.UseItem(source, itemName) then return end
	Player(source)["state"]["Commands"] = true
	if itemName == "analgesic" then
		if vRPclient.getHealth(source) > 101 and vRPclient.getHealth(source) < MaxHealth then
			active[user_id] = 6
			TriggerClientEvent("Progress",source,6000,"Utilizando...")
			vRPclient._playAnim(source,true,{"mp_suicide","pill"},true)

			repeat
				if active[user_id] == 0 then
					active[user_id] = nil
					vRPclient._stopAnim(source,false)

					if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
						vRPclient.updateHealth(source,20)
					end
				end
				Citizen.Wait(0)
			until active[user_id] == nil
		else
			TriggerClientEvent("Notify",source,"aviso","Você não pode utilizar de vida cheia ou nocauteado.",5000)
		end
	end

	if itemName == "weed" then
		if vRP.getInventoryItemAmount(user_id,"weed") >= 1 and vRP.getInventoryItemAmount(user_id,"silk") >= 1 then
			active[user_id] = 3
			TriggerClientEvent("Progress",source,3000,"Utilizando...")

			repeat
				if active[user_id] == 0 then
					active[user_id] = nil

					if vRP.tryGetInventoryItem(user_id,"weed",1,true) and vRP.tryGetInventoryItem(user_id,"silk",1,true) then
						vRP.giveInventoryItem(user_id,"joint",1,true)
					end
				end
				Citizen.Wait(0)
			until active[user_id] == nil
		else
			TriggerClientEvent("Notify",source,"aviso","Você não tem uma seda.",5000)
		end
	end

	if itemName == "joint" then
		if vRP.getInventoryItemAmount(user_id,"lighter") <= 0 then
			TriggerClientEvent("Notify",source,"aviso","Você não tem um isqueiro.",5000)
			return
		end
		
		active[user_id] = 1
		TriggerClientEvent("Progress",source,1000,"Fumando...")
		vRPclient._createObjects(source,"amb@world_human_aa_smoke@male@idle_a","idle_c","prop_cs_ciggy_01",49,28422)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.weedTimer(user_id,2)
					vRP.downgradeHunger(user_id,20)
					vRP.downgradeThirst(user_id,15)
					vRPclient.updateHealth(source,5)
					vRP.downgradeStress(user_id,40)
					vPLAYER.movementClip(source,"move_m@shadyped@a")
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "lean" then
		active[user_id] = 6
		TriggerClientEvent("Progress",source,6000,"Utilizando...")
		vRPclient._playAnim(source,true,{"mp_suicide","pill"},true)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._stopAnim(source,false)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.chemicalTimer(user_id,2)
					vRP.downgradeStress(user_id,50)
					TriggerClientEvent("cleanEffectDrugs",source)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "ecstasy" then
		active[user_id] = 6
		TriggerClientEvent("Progress",source,6000,"Utilizando...")
		vRPclient._playAnim(source,true,{"mp_suicide","pill"},true)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._stopAnim(source,false)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.chemicalTimer(user_id,2)
					vRP.upgradeHunger(user_id,5)
					vRP.downgradeThirst(user_id,10)
					TriggerClientEvent("setEcstasy",source)
					TriggerClientEvent("setEnergetic",source,20,1.25)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "lsd" then
		active[user_id] = 6
		TriggerClientEvent("Progress",source,6000,"Utilizando...")
		vRPclient._playAnim(source,true,{"mp_suicide","pill"},true)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._stopAnim(source,false)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.chemicalTimer(user_id,2)
					vRP.downgradeStress(user_id,3)
					vRP.upgradeHunger(user_id,5)
					vRP.upgradeThirst(user_id,5)
					TriggerClientEvent("setEcstasy",source)
					TriggerClientEvent("setEnergetic",source,30,1.15)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "meth" then
		active[user_id] = 6
		TriggerClientEvent("Progress",source,6000,"Utilizando...")
		vRPclient._playAnim(source,true,{"anim@amb@nightclub@peds@","missfbi3_party_snort_coke_b_male3"},true)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._stopAnim(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.chemicalTimer(user_id,2)
					vRP.upgradeThirst(user_id,5)
					TriggerClientEvent("setMeth",source)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "cocaine" then
		active[user_id] = 6
		TriggerClientEvent("Progress",source,6000,"Utilizando...")
		vRPclient._playAnim(source,true,{"anim@amb@nightclub@peds@","missfbi3_party_snort_coke_b_male3"},true)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._stopAnim(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.chemicalTimer(user_id,2)
					vRPclient.setArmour(source,2)
					TriggerClientEvent("setMeth",source)
					TriggerClientEvent("setEnergetic",source,10,1.41)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "warfarin" then
		local nplayer = vRPclient.nearestPlayer(source,2.5)
		if nplayer then
			if vRPclient.getHealth(nplayer) <= 101 then
				active[user_id] = 10
				TriggerClientEvent("Progress",source,10000,"Utilizando...")
				TriggerClientEvent("Notify",nplayer,"aviso","Você está sendo reanimado.")
				vRPclient._playAnim(source,false,{"mini@cpr@char_a@cpr_str","cpr_pumpchest"},true)
				repeat
					if active[user_id] == 0 then
						active[user_id] = nil
						if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
							vSURVIVAL._revivePlayer(nplayer,110)
							TriggerClientEvent("resetBleeding",nplayer)
							vRPclient._stopAnim(source)
						end
					end
					Citizen.Wait(0)
				until active[user_id] == nil
			end
		else
			if vRPclient.getHealth(source) > 101 and vRPclient.getHealth(source) < MaxHealth then
				active[user_id] = 30
				TriggerClientEvent("Progress",source,30000,"Utilizando...")
				vRPclient._createObjects(source,"amb@world_human_clipboard@male@idle_a","idle_c","v_ret_ta_firstaid",49,60309)

				repeat
					if active[user_id] == 0 then
						active[user_id] = nil
						vRPclient._removeObjects(source)

						if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
							vRPclient.updateHealth(source,50)
							TriggerClientEvent("resetBleeding",source)
						end
					end
					Citizen.Wait(0)
				until active[user_id] == nil
			else
				TriggerClientEvent("Notify",source,"aviso","Você não pode utilizar de vida cheia ou nocauteado.",5000)
			end
		end
	end

	if itemName == "gauze" then
		if vRPclient.getHealth(source) > 101 and vRPclient.getHealth(source) < MaxHealth then
			active[user_id] = 3
			TriggerClientEvent("Progress",source,3000,"Utilizando...")
			vRPclient._playAnim(source,true,{"amb@world_human_clipboard@male@idle_a","idle_c"},true)

			repeat
				if active[user_id] == 0 then
					active[user_id] = nil
					vRPclient._stopAnim(source,false)

					if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
						TriggerClientEvent("resetBleeding",source)
					end
				end
				Citizen.Wait(0)
			until active[user_id] == nil
		else
			TriggerClientEvent("Notify",source,"aviso","Você não pode utilizar de vida cheia ou nocauteado.",5000)
		end
	end

	if itemName == "premiumgarage" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			vRP.execute("vRP/update_garages",{ id = parseInt(user_id) })
			TriggerClientEvent("Notify",source,"negado","Voce adicionou uma vaga na garagem.",5000)
		end
	end

	if itemName == "binoculars" then
		active[user_id] = 2
		TriggerClientEvent("Progress",source,2000,"Utilizando...")

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._createObjects(source,"amb@world_human_binoculars@male@enter","enter","prop_binoc_01",50,28422)
				Citizen.Wait(750)
				TriggerClientEvent("useBinoculos",source)
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "camera" then
		active[user_id] = 2
		TriggerClientEvent("Progress",source,2000,"Utilizando...")

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._createObjects(source,"amb@world_human_paparazzi@male@base","base","prop_pap_camera_01",49,28422)
				Citizen.Wait(100)
				TriggerClientEvent("useCamera",source)
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "celular" then
		TriggerClientEvent("smartphone:activePhone",source)
	end

	if itemName == "adrenaline" then
		local parAmount = vRP.getUsersByPermission("paramedico.permissao")
		if #parAmount > 0 then
			TriggerClientEvent("Notify",source,"aviso","Existem <b>"..#parAmount.."</b> paramedicos em serviço.",5000)
			return
		end

		local nplayer = vRPclient.nearestPlayer(source,2)
		if nplayer then
			local nuser_id = vRP.getUserId(nplayer)
			if nuser_id then
				if vSURVIVAL.deadPlayer(nplayer) then
					active[user_id] = 10
					vRPclient.stopActived(source)
					TriggerClientEvent("Progress",source,10000,"Utilizando...")
					vRPclient._playAnim(source,false,{"mini@cpr@char_a@cpr_str","cpr_pumpchest"},true)

					repeat
						if active[user_id] == 0 then
							active[user_id] = nil
							vSURVIVAL._reverseRevive(source)

							if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
								vRP.upgradeThirst(nuser_id,10)
								vRP.upgradeHunger(nuser_id,10)
								vRP.chemicalTimer(nuser_id,1)
								vSURVIVAL._revivePlayer(nplayer,110)
								TriggerClientEvent("resetBleeding",nplayer)
								vRPclient._stopAnim(source)
							end
						end
						Citizen.Wait(0)
					until active[user_id] == nil
				end
			end
		end
	end

	if itemName == "teddy" then
		vRPclient._createObjects(source,"impexp_int-0","mp_m_waremech_01_dual-0","v_ilev_mr_rasberryclean",49,24817,-0.20,0.46,-0.016,-180.0,-90.0,0.0)
	end

	if itemName == "rose" then
		vRPclient._createObjects(source,"anim@heists@humane_labs@finale@keycards","ped_a_enter_loop","prop_single_rose",49,18905,0.13,0.15,0.0,-100.0,0.0,-20.0)
	end

	if itemName == "identity" then
		local nplayer = vRPclient.nearestPlayer(source,2)
		if nplayer then
			local identity = vRP.getUserIdentity(user_id)
			if identity then
				TriggerClientEvent("Notify",nplayer,"importante","<b>Passaporte:</b> "..vRP.format(parseInt(identity.id)).."<br><b>Nome:</b> "..identity.name.." "..identity.name2.."<br><b>RG:</b> "..identity.registration.."<br><b>Telefone:</b> "..identity.phone,10000)
			end
		end
	end

	if itemName == "cirurgia" then
		if GetResourceState("will_creator") == "started" then
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				TriggerClientEvent("will_creator:resetChar",source)
			end
		else
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				vRP.setUData(user_id,"currentCharacterMode","")
				vRP.kick(user_id, "Você resetou sua aparência")  
			end
		end
	end

	if itemName == "gsrkit" then
		local nplayer = vRPclient.nearestPlayer(source,5)
		if nplayer then
			if vPLAYER.getHandcuff(nplayer) then
				active[user_id] = 10
				TriggerClientEvent("Progress",source,10000,"Utilizando...")

				repeat
					if active[user_id] == 0 then
						active[user_id] = nil

						if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
							local check = vPLAYER.gsrCheck(nplayer)
							if parseInt(check) > 0 then
								TriggerClientEvent("Notify",source,"sucesso","Resultado positivo.",5000)
							else
								TriggerClientEvent("Notify",source,"negado","Resultado negativo.",3000)
							end
						end
					end
					Citizen.Wait(0)
				until active[user_id] == nil
			end
		end
	end

	if itemName == "gdtkit" then
		local nplayer = vRPclient.nearestPlayer(source,5)
		if nplayer then
			local nuser_id = vRP.getUserId(nplayer)
			if nuser_id then
				active[user_id] = 10
				TriggerClientEvent("Progress",source,10000,"Utilizando...")

				repeat
					if active[user_id] == 0 then
						active[user_id] = nil

						if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
							local weed = vRP.weedReturn(nuser_id)
							local chemical = vRP.chemicalReturn(nuser_id)
							local alcohol = vRP.alcoholReturn(nuser_id)
							local chemStr = ""
							local alcoholStr = ""
							local weedStr = ""

							if chemical == 0 then
								chemStr = "Nenhum"
							elseif chemical == 1 then
								chemStr = "Baixo"
							elseif chemical == 2 then
								chemStr = "Médio"
							elseif chemical >= 3 then
								chemStr = "Alto"
							end

							if alcohol == 0 then
								alcoholStr = "Nenhum"
							elseif alcohol == 1 then
								alcoholStr = "Baixo"
							elseif alcohol == 2 then
								alcoholStr = "Médio"
							elseif alcohol >= 3 then
								alcoholStr = "Alto"
							end

							if weed == 0 then
								weedStr = "Nenhum"
							elseif weed == 1 then
								weedStr = "Baixo"
							elseif weed == 2 then
								weedStr = "Médio"
							elseif weed >= 3 then
								weedStr = "Alto"
							end
							TriggerClientEvent("Notify",source,"importante","<b>Químicos:</b> "..chemStr.."<br><b>Álcool:</b> "..alcoholStr.."<br><b>Drogas:</b> "..weedStr,8000)
						end
					end
					Citizen.Wait(0)
				until active[user_id] == nil
			end
		end
	end

	if itemName == "vest" then
		active[user_id] = 10
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._playAnim(source,true,{"clothingtie","try_tie_negative_a"},true)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._stopAnim(source,false)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRPclient.setArmour(source,100)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "removedor" then
		TriggerClientEvent("will_spray:removeClosestSpray",source)
	end

	if itemName == "GADGET_PARACHUTE" or itemName == "parachute" then
		active[user_id] = 10
		TriggerClientEvent("Progress",source,10000,"Utilizando...")

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRPclient.giveWeapons(source, {["GADGET_PARACHUTE"] = { ammo = 1 }})
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "skate" then
		active[user_id] = 3
		TriggerClientEvent("Progress",source,3000,"Utilizando...")

		repeat	
			if active[user_id] == 0 then
				active[user_id] = nil
				TriggerClientEvent("skate",source)
				
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "toolbox" then
		if not vRPclient.inVehicle(source) then
			local vehicle,vehNet = vRPclient.getNearVehicle(source,3)
			if vehicle then
				active[user_id] = 30
				vRPclient.stopActived(source)
				vRPclient._playAnim(source,false,{"mini@repair","fixing_a_player"},true)
				local taskResult = vTASKBAR.taskLockpick(source)
				if taskResult then
					if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
						TriggerClientEvent("vrp_inventory:repairTires",-1,vehNet)
						TriggerClientEvent("will_garages_v2:repairVehicle",-1,vehNet,true)
						TriggerClientEvent("Notify",source,"aviso","Carro arrumado com sucesso.",7000)
					end
				else
					TriggerClientEvent("Notify",source,"negado","Voce falhou.",7000)
				end
				vRPclient._stopAnim(source,false)
				active[user_id] = nil
			end
		end
	end

	if itemName == "lockpick" then
		if GetResourceState("will_homes") == "started" then
			local checkHome = exports['will_homes']:tryEnterHome(source, true)
			if checkHome then
				local polices = vRP.getUsersByPermission("policia.permissao")
				if #polices < 2 then
					TriggerClientEvent("Notify",source,"negado","Não há contingente suficiente.",7000)
					return
				end
				vRPclient.playAnim(source,false,{"missheistfbi3b_ig7","lift_fibagent_loop"},false)
				local taskResult = vTASKBAR.taskLockpick(source)
				if taskResult and vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					TriggerClientEvent("will_homes:client:enterHouse",source, checkHome, true)
				end
				vRPclient._stopAnim(source,false)
				return
			end
		end
		local vehicle,vehNet,vehPlate,vehName,vehLock,vehBlock,vehHealth,vehModel,vehClass = vRPclient.vehList(source,3)
		if vehicle and vehClass ~= 15 and vehClass ~= 16 then
			if vRPclient.inVehicle(source) then
				active[user_id] = 100
				vRPclient.stopActived(source)
                vRPclient._playAnim(source,true,{"anim@amb@clubhouse@tutorial@bkr_tut_ig3@","machinic_loop_mechandplayer"},true)
				local taskResult = vTASKBAR.taskLockpick(source)
				if taskResult and vRP.tryGetInventoryItem(user_id,itemName,1) then
					local iddoroubado = vRP.getVehiclePlate(vehPlate)
					if iddoroubado then
						local nplayer = vRP.getUserSource(iddoroubado)
						if nplayer then
							TriggerClientEvent("Notify",nplayer,"aviso","O alarme do seu veículo <b>"..vRP.vehicleName(vehName).."</b> foi acionado.",7000)
						end
						vRP.createWeebHook(Webhooks.webhookrobberycar,"```prolog\n[ID]: "..user_id.."\n[ROUBOU VEICULO]: "..vRP.vehicleName(vehName).." \n[DONO VEICULO]: "..iddoroubado.."\n[LOCAL]: "..GetEntityCoords(GetPlayerPed(source))..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
					else
						vRP.createWeebHook(Webhooks.webhookrobberycar,"```prolog\n[ID]: "..user_id.."\n[ROUBOU VEICULO]: "..vRP.vehicleName(vehName).."\n[LOCAL]: "..GetEntityCoords(GetPlayerPed(source))..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
					end
					TriggerEvent("setPlateEveryone",vehPlate)
					TriggerEvent("setPlatePlayers",vehPlate,user_id)
					TriggerClientEvent("Notify",source,"sucesso","Veiculo roubado com sucesso.",7000)
					if math.random(100) >= 15 then
						local x,y,z = vRPclient.getPositions(source)
						local copAmount = vRP.numPermission("Police")
						for k,v in pairs(copAmount) do
							local player = vRP.getUserSource(v)
							async(function()
								TriggerClientEvent("Notify",source,"aviso","A policia foi acionada.",5000)
								TriggerClientEvent("NotifyPush",player,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = "Opa tem um cara aqui no bairro querendo roubar um carro!", code = 31, title = "Roubo de Veículo", x = x, y = y, z = z, vehicle = vRP.vehicleName(vehName).." - "..vehPlate, rgba = {15,110,110} })
							end)
						end
					end
				else
					TriggerClientEvent("Notify",source,"aviso","Voce falhou, tente novamente.",7000)
				end
                vRPclient._stopAnim(source)
				active[user_id] = nil
			else
				active[user_id] = 100
				vRPclient.stopActived(source)
				vRPclient._playAnim(source,false,{"missfbi_s4mop","clean_mop_back_player"},true)
				local taskResult = vTASKBAR.taskLockpick(source)
				if taskResult then
					vRP.upgradeStress(user_id,4)
					local iddoroubado = vRP.getVehiclePlate(vehPlate)
					if iddoroubado then
						local nplayer = vRP.getUserSource(iddoroubado)
						if nplayer then
							TriggerClientEvent("Notify",nplayer,"aviso","O alarme do seu veículo <b>"..vRP.vehicleName(vehName).."</b> foi acionado.",7000)
						end
						vRP.createWeebHook(Webhooks.webhookrobberycar,"```prolog\n[ID]: "..user_id.."\n[ROUBOU VEICULO]: "..vRP.vehicleName(vehName).." \n[DONO VEICULO]: "..iddoroubado.."\n[LOCAL]: "..GetEntityCoords(GetPlayerPed(source))..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
					else
						vRP.createWeebHook(Webhooks.webhookrobberycar,"```prolog\n[ID]: "..user_id.."\n[ROUBOU VEICULO]: "..vRP.vehicleName(vehName).."\n[LOCAL]: "..GetEntityCoords(GetPlayerPed(source))..os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S").." \r```")
					end
					TriggerClientEvent("Notify",source,"sucesso","Veiculo roubado com sucesso.",7000)
					TriggerEvent("setPlateEveryone",vehPlate)
					local networkVeh = NetworkGetEntityFromNetworkId(vehNet)
					TriggerClientEvent("vrp_sound:source",source,"unlock",0.3)
					SetVehicleDoorsLocked(networkVeh,1)   -- Destrancado

					if math.random(100) >= 15 then
						local x,y,z = vRPclient.getPositions(source)
						local copAmount = vRP.numPermission("Police")
						for k,v in pairs(copAmount) do
							local player = vRP.getUserSource(v)
							async(function()
								TriggerClientEvent("NotifyPush",player,{ time = os.date("%H:%M:%S - %d/%m/%Y"), text = "Opa tem um cara aqui no bairro querendo roubar um carro!", code = 31, title = "Roubo de Veículo", x = x, y = y, z = z, vehicle = vRP.vehicleName(vehName).." - "..vehPlate, rgba = {15,110,110} })
							end)
						end
					end
				else
					TriggerClientEvent("Notify",source,"aviso","Voce falhou.",7000)
				end
				vRPclient._stopAnim(source,false)
				active[user_id] = nil
			end
		end
	end

	if itemName == "barrier" then
		local application,coords,heading = vRPclient.objectCoords(source,"prop_mp_barrier_02b")
		if application then
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				local Number = 0

				repeat
					Number = Number + 1
				until Objects[tostring(Number)] == nil

				Objects[tostring(Number)] = { x = mathLegth(coords["x"]), y = mathLegth(coords["y"]), z = mathLegth(coords["z"]), h = heading, object = "prop_mp_barrier_02b", item = itemName, distance = 100, mode = "3" }
				TriggerClientEvent("objects:Adicionar",-1,tostring(Number),Objects[tostring(Number)])
			end
		end
	end

	if itemName == "energetic" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_intdrink","loop_bottle","prop_energy_drink",49,60309,0.0,0.0,0.0,0.0,0.0,130.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeStress(user_id,4)
					TriggerClientEvent("setEnergetic",source,90,1.10)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "absolut" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_drinking@beer@male@idle_a","idle_a","p_whiskey_notop",49,28422,0.0,0.0,0.05,0.0,0.0,0.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.alcoholTimer(user_id,1)
					vRP.upgradeThirst(user_id,20)
					TriggerClientEvent("setDrunkTime",source,300)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "hennessy" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_drinking@beer@male@idle_a","idle_a","p_whiskey_notop",49,28422,0.0,0.0,0.05,0.0,0.0,0.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.alcoholTimer(user_id,1)
					vRP.upgradeThirst(user_id,20)
					TriggerClientEvent("setDrunkTime",source,300)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "chandon" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_drinking@beer@male@idle_a","idle_a","prop_beer_blr",49,28422,0.0,0.0,-0.10,0.0,0.0,0.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.alcoholTimer(user_id,1)
					vRP.upgradeThirst(user_id,20)
					TriggerClientEvent("setDrunkTime",source,300)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "dewars" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_drinking@beer@male@idle_a","idle_a","prop_beer_blr",49,28422,0.0,0.0,-0.10,0.0,0.0,0.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.alcoholTimer(user_id,1)
					vRP.upgradeThirst(user_id,20)
					TriggerClientEvent("setDrunkTime",source,300)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "saque" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_drinking@beer@male@idle_a","idle_a","prop_tequila",49,28422,0.0,0.0,-0.10,0.0,0.0,0.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)
				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.alcoholTimer(user_id,1)
					vRP.upgradeThirst(user_id,20)
					TriggerClientEvent("setDrunkTime",source,300)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "water" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_intdrink","loop_bottle","prop_ld_flow_bottle",49,60309,0.0,0.0,0.02,0.0,0.0,130.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeThirst(user_id,25)
					vRP.giveInventoryItem(user_id,"emptybottle",1)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "sinkalmy" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_drinking@beer@male@idle_a","idle_a","prop_ld_flow_bottle",49,28422)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeThirst(user_id,25)
					vRP.chemicalTimer(user_id,1)
					vRP.downgradeStress(user_id,25)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "ritmoneury" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_drinking@beer@male@idle_a","idle_a","prop_ld_flow_bottle",49,28422)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeThirst(user_id,5)
					vRP.chemicalTimer(user_id,1)
					vRP.downgradeStress(user_id,50)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "dirtywater" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_intdrink","loop_bottle","prop_ld_flow_bottle",49,60309)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeStress(user_id,4)
					vRP.upgradeThirst(user_id,25)
					vRPclient.downHealth(source,10)
					vRP.giveInventoryItem(user_id,"emptybottle",1)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "cola" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_intdrink","loop_bottle","prop_ecola_can",49,60309,0.0,0.0,0.04,0.0,0.0,130.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeThirst(user_id,20)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "soda" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_intdrink","loop_bottle","ng_proc_sodacan_01b",49,60309,0.0,0.0,-0.04,0.0,0.0,130.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeThirst(user_id,20)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "fishingrod" then
		local fishingStatus = false
		local fishingCoords = vector3(-1202.71,2714.76,4.11)
		local coords = GetEntityCoords(GetPlayerPed(source))
		local distance = #(coords - fishingCoords)
		if distance <= 20 then
			fishingStatus = true
		end
		if fishingStatus then
			active[user_id] = 30
			vRPclient.stopActived(source)
			vRPclient._createObjects(source,"amb@world_human_stand_fishing@idle_a","idle_c","prop_fishing_rod_01",49,60309)
			if vTASKBAR.taskFishing(source) then
				local rand = parseInt(math.random(3))
				local fishs = { "octopus","shrimp","carp" }

				if vRP.computeInvWeight(user_id) + vRP.itemWeightList(fishs[rand]) * rand <= vRP.getBackpack(user_id) then
					if vRP.tryGetInventoryItem(user_id,"bait",rand,true) then
						vRP.giveInventoryItem(user_id,fishs[rand],rand,true)
					else
						TriggerClientEvent("Notify",source,"aviso","Você precisa de <b>"..vRP.format(rand).."x "..vRP.itemNameList("bait").."</b>.",5000)
					end
				else
					TriggerClientEvent("Notify",source,"negado","Mochila cheia.",5000)
				end
			end
			active[user_id] = nil
		else
			TriggerClientEvent("Notify",source,"negado","Muito longe do local de pesca.",5000)
		end
	end

	if itemName == "coffee" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@world_human_aa_coffee@idle_a", "idle_a","p_amb_coffeecup_01",49,28422)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeStress(user_id,2)
					vRP.upgradeThirst(user_id,20)
					TriggerClientEvent("setEnergetic",source,30,1.15)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "hamburger" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_inteat@burger","mp_player_int_eat_burger","prop_cs_burger_01",49,60309)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeHunger(user_id,30)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "delivery" then
		active[user_id] = 5
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,5000,"Utilizando...")
		vRPclient._createObjects(source,"amb@code_human_wander_drinking@beer@male@base","","prop_paper_bag_01",49,28422,0.0,-0.02,-0.05,0.0,0.0,0.0)
		vRPclient._playAnim(source,false,{"mini@cpr@char_a@cpr_str","cpr_kol_idle"},false)
		local itemList = { "tacos","hamburger","hotdog","soda","cola","chocolate","sandwich","fries","absolut","chandon","dewars","donut","hennessy" }
		local food = itemList[math.random(#itemList)]
		
		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)
				vRPclient._stopAnim(source,false)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.giveInventoryItem(user_id,food,math.random(3),true)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "hotdog" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@code_human_wander_eating_donut@male@idle_a","idle_c","prop_cs_hotdog_01",49,28422)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeHunger(user_id,20)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "sandwich" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_inteat@burger","mp_player_int_eat_burger","prop_sandwich_01",49,18905,0.13,0.05,0.02,-50.0,16.0,60.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeHunger(user_id,20)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "tacos" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_inteat@burger","mp_player_int_eat_burger","prop_taco_01",49,18905,0.16,0.06,0.02,-50.0,220.0,60.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeHunger(user_id,30)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "fries" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_inteat@burger","mp_player_int_eat_burger","prop_food_bs_chips",49,18905,0.10,0.0,0.08,150.0,320.0,160.0)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeHunger(user_id,20)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "chocolate" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"mp_player_inteat@burger","mp_player_int_eat_burger","prop_choc_ego",49,60309)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.upgradeHunger(user_id,10)
					vRP.downgradeStress(user_id,25)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "donut" then
		active[user_id] = 10
		vRPclient.stopActived(source)
		TriggerClientEvent("Progress",source,10000,"Utilizando...")
		vRPclient._createObjects(source,"amb@code_human_wander_eating_donut@male@idle_a","idle_c","prop_amb_donut",49,28422)

		repeat
			if active[user_id] == 0 then
				active[user_id] = nil
				vRPclient._removeObjects(source)

				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.downgradeStress(user_id,8)
					vRP.upgradeHunger(user_id,10)
				end
			end
			Citizen.Wait(0)
		until active[user_id] == nil
	end

	if itemName == "backpackp" then
		local exp = vRP.getBackpack(user_id)
		if exp < 25 then
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				local BACKPACK_WEIGHT = 40
				local BACKPACK_SLOTS = 60
				vRP.setSlots(user_id,BACKPACK_SLOTS)
				vRP.setBackpack(user_id,BACKPACK_WEIGHT)
				if GetResourceState("ox_inventory") == "started" then
					exports.ox_inventory:SetMaxWeight(source, BACKPACK_WEIGHT * 1000)
					exports.ox_inventory:SetSlotCount(source, BACKPACK_SLOTS)
				end
			end
		else
			TriggerClientEvent("Notify",source,"aviso","Essa mochila é usada quando estiver com menos de 25 kilos.",5000)
		end
	end

	if itemName == "backpackm" then
		local exp = vRP.getBackpack(user_id)
		if exp >= 25 and exp < 50 then
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				local BACKPACK_WEIGHT = 60
				local BACKPACK_SLOTS = 75
				vRP.setSlots(user_id,BACKPACK_SLOTS)
				vRP.setBackpack(user_id,BACKPACK_WEIGHT)
				if GetResourceState("ox_inventory") == "started" then
					exports.ox_inventory:SetMaxWeight(source, BACKPACK_WEIGHT * 1000)
					exports.ox_inventory:SetSlotCount(source, BACKPACK_SLOTS)
				end
			end
		else
			TriggerClientEvent("Notify",source,"aviso","Essa mochila é usada quando estiver com mais de 25 kilos e menos de 50 kilos.",5000)
		end
	end

	if itemName == "backpackg" then
		local exp = vRP.getBackpack(user_id)
		if exp >= 50 and exp < 75 then
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				local BACKPACK_WEIGHT = 80
				local BACKPACK_SLOTS = 90
				vRP.setSlots(user_id,BACKPACK_SLOTS)
				vRP.setBackpack(user_id,BACKPACK_WEIGHT)
				if GetResourceState("ox_inventory") == "started" then
					exports.ox_inventory:SetMaxWeight(source, BACKPACK_WEIGHT * 1000)
					exports.ox_inventory:SetSlotCount(source, BACKPACK_SLOTS)
				end
			end
		else
			TriggerClientEvent("Notify",source,"aviso","Essa mochila é usada quando estiver com mais de 50 kilos e menos de 75 kilos.",5000)
		end
	end

	if itemName == "backpackx" then
		local exp = vRP.getBackpack(user_id)
		if exp >= 75 and exp < 100 then
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				local BACKPACK_WEIGHT = 100
				local BACKPACK_SLOTS = 100
				vRP.setSlots(user_id,BACKPACK_SLOTS)
				vRP.setBackpack(user_id,BACKPACK_WEIGHT)
				if GetResourceState("ox_inventory") == "started" then
					exports.ox_inventory:SetMaxWeight(source, BACKPACK_WEIGHT * 1000)
					exports.ox_inventory:SetSlotCount(source, BACKPACK_SLOTS)
				end
			end
		else
			TriggerClientEvent("Notify",source,"aviso","Essa mochila é usada quando estiver com mais de 75 kilos e menos de 100 kilos.",5000)
		end
	end

	if itemName == "tires" then
		if not vRPclient.inVehicle(source) then
			local tyreStatus,Tyre,Network,Plate,TyreHealth = vRPclient.tyreStatus(source)
			if tyreStatus then
				local Vehicle = NetworkGetEntityFromNetworkId(Network)
				if DoesEntityExist(Vehicle) and not IsPedAPlayer(Vehicle) and GetEntityType(Vehicle) == 2 and TyreHealth ~= 1000.0 then
					active[user_id] = 30
					vRPclient.stopActived(source)
					vRPclient._playAnim(source,false,{"anim@amb@clubhouse@tutorial@bkr_tut_ig3@","machinic_loop_mechandplayer"},true)

					local taskResult = vTASKBAR.taskTwo(source)
					if taskResult then
						if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
							TriggerClientEvent("inventory:repairTyre",-1,Network,Tyre,Plate)
						end
					end

					vRPclient._stopAnim(source,false)
					active[user_id] = nil
				end
			end
		end
	end

	if itemName == "premiumplate" then
		local vehModel = vRP.prompt(source,"Nome de spawn do veiculo:","")
		if vehModel == "" then
			return
		end
		local vehicle = vRP.query("vRP/get_vehicles",{ user_id = parseInt(user_id), vehicle = tostring(vehModel) })
		if vehicle[1] then
			local vehPlate = string.lower(vRP.prompt(source,"NOVA PLACA:",""))
			if vehPlate == "" then
				return
			end

			local plateUserId = vRP.getVehiclePlate(vehPlate)
			if plateUserId then
				TriggerClientEvent("Notify",source,"negado","A placa escolhida já está sendo usada por outro veículo.",5000)
				return
			end

			local plateCheck = sanitizeString(vehPlate,"abcdefghijklmnopqrstuvwxyz0123456789",true)
			if plateCheck and string.len(plateCheck) == 8 then
				if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
					vRP.execute("vRP/update_plate_vehicle",{ user_id = parseInt(user_id), vehicle = tostring(vehModel), plate = string.upper(tostring(vehPlate)) })
					TriggerClientEvent("Notify",source,"sucesso","Placa atualizada com sucesso.",5000)
				end
			else
				TriggerClientEvent("Notify",source,"importante","O nome da definição para placas deve conter no máximo 8 caracteres e podem ser usados números e letras minúsculas.",5000)
			end
		else
			TriggerClientEvent("Notify",source,"negado","Modelo de veículo não encontrado em sua garagem.",5000)
		end
	end

	if itemName == "premiumname" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			local newName = vRP.prompt(source,"Primeiro Nome (NOVO):","")
			if newName == "" then
				return
			end

			local newLastName = vRP.prompt(source,"Sobre Nome (NOVO):","")
			if newLastName == "" then
				return
			end
			vRP.upgradeNames(user_id,newName,newLastName)
			TriggerClientEvent("Notify",source,"sucesso","Nome atualizado com sucesso.",5000)
		end
	end

	if itemName == "premiumpersonagem" then
		if vRP.request(source,"Deseja adicionar +1 Personagem?",30) and vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			vRP.upgradeChars(user_id)
			TriggerClientEvent("Notify",source,"sucesso","Relogue para criar seu outro personagem.",5000)
		end
	end

	if itemName == "aio_box" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			TriggerClientEvent("will_battlepass:openLootbox",source,"aio_box")
		end
	end

	if itemName == "vest_box" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			TriggerClientEvent("will_battlepass:openLootbox",source,"vest_box")
		end
	end

	if itemName == "money_box" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			TriggerClientEvent("will_battlepass:openLootbox",source,"money_box")
		end
	end

	if itemName == "weapon_box" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			TriggerClientEvent("will_battlepass:openLootbox",source,"weapon_box")
		end
	end

	if itemName == "medkit_box" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			TriggerClientEvent("will_battlepass:openLootbox",source,"medkit_box")
		end
	end

	if itemName == "vehicle_box" then
		if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
			TriggerClientEvent("will_battlepass:openLootbox",source,"vehicle_box")
		end
	end

	if itemName == "fueltech" then
		if vRPclient.inVehicle(source) then
			local techDistance = false
			local techCoords = vector3(1174.66,2640.45,37.82)
			local coords = GetEntityCoords(GetPlayerPed(source))
			local distance = #(coords - techCoords)
			if distance <= 10 then
				techDistance = true
			end
			if techDistance then
				local vehPlate = vRPclient.vehiclePlate(source)
				local plateUsers = vRP.getVehiclePlate(vehPlate)
				if not plateUsers then
					active[user_id] = 30
					TriggerClientEvent("Progress",source,30000,"Utilizando...")
					vRPclient._playAnim(source,true,{"anim@amb@clubhouse@tutorial@bkr_tut_ig3@","machinic_loop_mechandplayer"},true)

					repeat
						if active[user_id] == 0 then
							active[user_id] = nil
							vRPclient._stopAnim(source,false)

							if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
								TriggerClientEvent("vehtuning",source)
							end
						end
						Citizen.Wait(0)
					until active[user_id] == nil
				end
			end
		end
	end

	if itemName == "radio" then
		vRPclient.stopActived(source)
		TriggerClientEvent("radio:openSystem",source)
	end

	if itemName == "divingsuit" then
		if not vRP.wantedReturn(user_id) and not vRP.reposeReturn(user_id) then
			vPLAYER.setDiving(source)
		end
	end

	if itemName == "handcuff" then
		if not vRPclient.inVehicle(source) then
			local nplayer = vRPclient.nearestPlayer(source,1.5)
			if nplayer then
				if vPLAYER.getHandcuff(nplayer) then
					vRPclient._playAnim(source,false,{"mp_arresting","a_uncuff"},false)
					SetTimeout(4000,function()
						vPLAYER.toggleHandcuff(nplayer)
						vRPclient._stopAnim(nplayer,false)
						TriggerClientEvent("vrp_sound:source",nplayer,"uncuff",0.5)
						TriggerClientEvent("vrp_sound:source",source,"uncuff",0.5)
					end)
				else
					active[user_id] = 30
					local taskResult = vTASKBAR.taskHandcuff(nplayer)
					if not taskResult then
						TriggerClientEvent("vrp_sound:source",source,"cuff",0.5)
						TriggerClientEvent("vrp_sound:source",nplayer,"cuff",0.5)
						vRPclient._playAnim(source,false,{"mp_arrest_paired","cop_p2_back_left"},false)
						vRPclient._playAnim(nplayer,false,{"mp_arrest_paired","crook_p2_back_left"},false)
						SetTimeout(3500,function()
							vPLAYER.toggleHandcuff(nplayer)
							vRPclient._stopAnim(source,false)
						end)
					else
						TriggerClientEvent("Notify",source,"importante","O cidadao resistiu de ser algemado.",5000)
					end
					active[user_id] = nil
				end
			end
		end
	end

	if itemName == "hood" then
		local nplayer = vRPclient.nearestPlayer(source,1)
		if nplayer and vPLAYER.getHandcuff(nplayer) then
			TriggerClientEvent("vrp_hud:toggleHood",nplayer)
		end
	end

	if itemName == "rope" then
		local nplayer = vRPclient.nearestPlayer(source,2)
		if nplayer and not vRPclient.inVehicle(source) then
			local taskResult = vTASKBAR.taskHandcuff(nplayer)
			if not taskResult then
				TriggerClientEvent("vrp_rope:toggleRope",source,nplayer)
			else
				TriggerClientEvent("Notify",source,"importante","O cidadao resistiu de ser carregado.",5000)
			end
		end
	end

	if itemName == "c4" then
		TriggerClientEvent("vrp_cashmachine:machineRobbery",source)
	end

	if itemName == "pager" then
		local nplayer = vRPclient.nearestPlayer(source,2.5)
		if nplayer then
			local nuser_id = vRP.getUserId(nplayer)
			if nuser_id then
				if vRP.hasPermission(nuser_id,"policia.permissao") then
					TriggerClientEvent("radio:outServers",nplayer)
					TriggerEvent("vrp_blipsystem:serviceExit",nplayer)
					TriggerClientEvent("tencode:StatusService",nplayer,false)
					TriggerClientEvent("vrp_tencode:StatusService",nplayer,false)
					local polGroup = vRP.getUserGroupByType(nuser_id,"job")
					vRP.removeUserGroup(nuser_id,polGroup)
					vRP.addUserGroup(nuser_id, "Paisana"..polGroup)
					TriggerClientEvent("Notify",source,"importante","Todas as comunicações do policial foram retiradas.",5000)
				end
			end
		end
	end

	if itemName == "grafite" then
		exports['will_grafite']:OpenGrafite(source)
	end

	if itemName == "drugtable" then
		TriggerEvent("will_drugsales:useTable", source, "prop_protest_table_01")
	end

	if itemName == "gemstone" then
		if vRP.tryGetInventoryItem(user_id, itemName, rAmount, true) then
			vRP.addGmsId(user_id, rAmount)
			TriggerClientEvent("Notify", source, "sucesso", "Você usou <b>"..rAmount.."x Gemas</b>.", 5000)
		end
	end

	if itemName == "rottweiler" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_rottweiler")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "husky" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_husky")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "shepherd" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_shepherd")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "retriever" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_retriever")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "poodle" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_poodle")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "pug" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_pug")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "westy" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_westy")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "cat" then
		TriggerClientEvent("dynamic:animalSpawn",source,"a_c_cat_01")
		vRPclient.playAnim(source,true,{"rcmnigel1c","hailing_whistle_waive_a"},false)
	end

	if itemName == "vehkey" then
		if data and data.metadata and data.metadata.plate then
			local vehicle,vehNet,vehPlate = vRPclient.vehList(source,2)
			if data.metadata.plate == vehPlate then
				TriggerEvent("garages:vehicleLock",source,vehNet)
			end
		end
	end

	Player(source)["state"]["Commands"] = false
end)

RegisterNetEvent("inventory:verifyObjects")
AddEventHandler("inventory:verifyObjects",function(data)
	local source = source
	local coords = GetEntityCoords(GetPlayerPed(source))
	for k,v in pairs(Trashes) do
		if #(coords - v) <= 2.0 then
			TriggerClientEvent("Notify",source,"negado","Lixeira esta vazia.",5000)
			return
		end
	end
	local user_id = vRP.getUserId(source)
	local itens = { "emptybottle", "bandage", "burger", "water" }
	local itemName = itens[math.random(1, #itens)]
	if vRP.computeInvWeight(user_id)+vRP.itemWeightList(itemName) <= vRP.getBackpack(user_id) then
		table.insert(Trashes, data.coords)
		TriggerClientEvent("Progress",source,3000)
		TriggerClientEvent('cancelando',source,true)
		vRPclient._playAnim(source,false,{"amb@prop_human_parking_meter@female@idle_a","idle_a_female"},true)
		SetTimeout(3000,function()
			vRPclient._DeletarObjeto(source)
			TriggerClientEvent('cancelando',source,false)
			vRP.giveInventoryItem(user_id,itemName,1,true)
		end)
	else
		TriggerClientEvent("Notify",source,"negado","Mochila cheia.",5000)
	end
end)

RegisterNetEvent("inventory:makeWater")
AddEventHandler("inventory:makeWater",function()
	local source = source
	local user_id = vRP.getUserId(source)
	local itemName = "emptybottle"
	if vRP.computeInvWeight(user_id)+vRP.itemWeightList(itemName) <= vRP.getBackpack(user_id) then
		TriggerClientEvent("Progress",source,3000)
		TriggerClientEvent('cancelando',source,true)
		vRPclient._playAnim(source,false,{"amb@prop_human_parking_meter@female@idle_a","idle_a_female"},true)
		SetTimeout(3000,function()
			vRPclient._DeletarObjeto(source)
			TriggerClientEvent('cancelando',source,false)
			if vRP.tryGetInventoryItem(user_id,itemName,1,true) then
				vRP.giveInventoryItem(user_id,"water",1)
			end
		end)
	else
		TriggerClientEvent("Notify",source,"negado","Mochila cheia.",5000)
	end
end)

RegisterServerEvent("objects:Guardar")
AddEventHandler("objects:Guardar",function (Number)
	local source = source
	local user_id = vRP.getUserId(source)
	local Object = Objects[Number]
	if user_id and Object then
		vRP.giveInventoryItem(user_id,Object.item,1,true)
		TriggerClientEvent("objects:Remover",-1,Number)
	end
end)

RegisterServerEvent("inventory:RemoveTyres")
AddEventHandler("inventory:RemoveTyres",function (VehNet,Tyre,vehPlate)
	local source = source
	local Passport = vRP.Passport(source)
	if Passport and not active[Passport] then
		local Vehicle = NetworkGetEntityFromNetworkId(VehNet)
		if DoesEntityExist(Vehicle) and not IsPedAPlayer(Vehicle) and GetEntityType(Vehicle) == 2 then
			if vRP.PassportPlate(vehPlate) then
				Player(source)["state"]["Buttons"] = true
				vRPclient.playAnim(source,false,{"anim@amb@clubhouse@tutorial@bkr_tut_ig3@","machinic_loop_mechandplayer"},true)

				if vTASKBAR.taskTwo(source) then
					active[Passport] = os.time() + 10
					TriggerClientEvent("Progress",source,"Removendo",10000)

					repeat
						if os.time() >= parseInt(active[Passport]) then
							active[Passport] = nil
							if DoesEntityExist(Vehicle) and not IsPedAPlayer(Vehicle) and GetEntityType(Vehicle) == 2 then
								TriggerClientEvent("inventory:explodeTyres",source,VehNet,vehPlate,Tyre)
								vRP.GenerateItem(Passport,"tires",1,true)
							end
						end
						Wait(100)
					until not active[Passport]
				end

				Player(source)["state"]["Buttons"] = false
				vRPclient.Destroy(source)
			end
		end
	end
end)

CreateThread(function()
	while true do
		for k,v in pairs(active) do
			if active[k] > 0 then
				active[k] = active[k] - 1
			end
		end
		Wait(1000)
	end
end)
