-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel") or {}
local Proxy = module("vrp","lib/Proxy") or {}
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
vSERVER = Tunnel.getInterface("dynamic")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Dynamic = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDBUTTON
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddButton",function(title,description,trigger,param,parent_id,server,back)
	SendNUIMessage({ Action = "AddButton", Payload = { title,description,trigger,param,parent_id,server,back } })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDMENU
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddMenu",function(title,description,id,parent_id)
	SendNUIMessage({ Action = "AddMenu", Payload = { title,description,id,parent_id } })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:ADDBUTTON
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dynamic:AddButton")
AddEventHandler("dynamic:AddButton",function(title,description,trigger,param,parent_id,server,back)
	SendNUIMessage({ Action = "AddButton", Payload = { title,description,trigger,param,parent_id,server,back } })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:ADDMENU
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dynamic:AddMenu")
AddEventHandler("dynamic:AddMenu",function(title,description,id,parent_id)
	SendNUIMessage({ Action = "AddMenu", Payload = { title,description,id,parent_id } })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OPEN
-----------------------------------------------------------------------------------------------------------------------------------------
exports("Open",function()
	SendNUIMessage({ Action = "Open" })
	TriggerEvent("hud:Active",false)
	SetNuiFocus(true,true)
	Dynamic = true
end)

RegisterNUICallback("Theme",function(Data,Callback)
	Callback({
		shadow = true,
		main = "7335d8f2",
		mainText = "#ffffff",
	})
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLICKED
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Clicked",function(Data,Callback)
	if Data["trigger"] and Data["trigger"] ~= "" then
		if Data["server"] then
			TriggerServerEvent(Data["trigger"],Data["param"])
		else
			TriggerEvent(Data["trigger"],Data["param"])
		end
	end

	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("Close",function(Data,Callback)
	TriggerEvent("hud:Active",true)
	SetNuiFocus(false,false)
	Dynamic = false

	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:CLOSE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dynamic:Close")
AddEventHandler("dynamic:Close",function()
	if Dynamic then
		SendNUIMessage({ Action = "Close" })
		TriggerEvent("hud:Active",true)
		SetNuiFocus(false,false)
		Dynamic = false
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:EVENTS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dynamic:checkVipStatus")
AddEventHandler("dynamic:checkVipStatus",function()
	ExecuteCommand("premium")
end)

RegisterNetEvent("radio:setAnim")
AddEventHandler("radio:setAnim",function ()
	local result = exports['ox_inventory']:Keyboard("Animação do radio",{
		{ type = 'select', label = 'Animação', description = 'Selecione a animação', icon = "radio", options = {
			{ label = "Animação na boca", description = "Animação com radio na boca", value = "mouth_anim" },
			{ label = "Animaçao no ombro", description = "Animação com radio no ombro", value = "default_anim" },
		}, default = "default_anim" },
	})
	if result and result[1] then
		TriggerEvent("pma-voice:setRadioAnim",result[1])
		if result[1] == "default_anim" then
			TriggerEvent("Notify","amarelo","Animação do radio alterada para <b>ombro</b>.",5000)
		else
			TriggerEvent("Notify","amarelo","Animação do radio alterada para <b>boca</b>.",5000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERFUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("PlayerFunctions",function()
	local Ped = PlayerPedId()
	if not LocalPlayer["state"]["Commands"] and not LocalPlayer["state"]["Handcuff"] and not LocalPlayer["state"]["Prison"] and not Dynamic and not IsPauseMenuActive() and GetEntityHealth(Ped) > 100 then
		if LocalPlayer["state"]["Premium"] then
			exports["dynamic"]:AddButton("VIP status","Verificar VIP.","dynamic:checkVipStatus","","others",false)
		end
		exports["dynamic"]:AddMenu("Armário","Abrir lista com todas as vestimentas.","wardrobe")
		exports["dynamic"]:AddButton("Guardar","Salvar vestimentas do corpo.","dynamic:Clothes","Save","wardrobe",true)
		exports["dynamic"]:AddButton("Remover","Remover suas vestimentas do corpo.","player:Outfit","remover","wardrobe",true)
		local Clothes = vSERVER.myClothes()
		if parseInt(#Clothes) > 0 then
			for Index,v in pairs(Clothes) do
				exports["dynamic"]:AddMenu(v:gsub("Clothes:",""),"Informações da vestimenta.",Index,"wardrobe")
				exports["dynamic"]:AddButton("Aplicar","Vestir-se com as vestimentas.","dynamic:Clothes","Apply-"..v,Index,true)
				exports["dynamic"]:AddButton("Remover","Deletar a vestimenta do armário.","dynamic:Clothes","Delete-"..v,Index,true,true)
			end
		end

		exports["dynamic"]:AddMenu("Roupas","Colocar/Retirar roupas.","clothes")
		exports["dynamic"]:AddButton("Chapéu","Colocar/Retirar o chapéu.","player:Outfit","Hat","clothes",true)
		exports["dynamic"]:AddButton("Máscara","Colocar/Retirar a máscara.","player:Outfit","Mask","clothes",true)
		exports["dynamic"]:AddButton("Óculos","Colocar/Retirar o óculos.","player:Outfit","Glasses","clothes",true)
		exports["dynamic"]:AddButton("Camisa","Colocar/Retirar a camisa.","player:Outfit","Shirt","clothes",true)
		exports["dynamic"]:AddButton("Jaqueta","Colocar/Retirar a jaqueta.","player:Outfit","Jacket","clothes",true)
		exports["dynamic"]:AddButton("Luvas","Colocar/Retirar as luvas.","player:Outfit","Arms","clothes",true)
		exports["dynamic"]:AddButton("Colete","Colocar/Retirar o colete.","player:Outfit","Vest","clothes",true)
		exports["dynamic"]:AddButton("Calça","Colocar/Retirar a calça.","player:Outfit","Pants","clothes",true)
		exports["dynamic"]:AddButton("Sapatos","Colocar/Retirar o sapato.","player:Outfit","Shoes","clothes",true)
		exports["dynamic"]:AddButton("Acessórios","Colocar/Retirar os acessórios.","player:Outfit","Accessory","clothes",true)
		exports["dynamic"]:AddButton("Enviar","Vestir roupas no próximo.","skinshop:Send","","clothes",true)

		local Vehicle = vRP.getNearVehicle(7)
		local LastVehicle = GetLastDrivenVehicle()
		if IsEntityAVehicle(Vehicle) then
			if not IsPedInAnyVehicle(Ped, false) then
				if GetEntityModel(LastVehicle) == GetHashKey("flatbed") then
					exports["dynamic"]:AddButton("Rebocar","Colocar o veículo na prancha.","towdriver:invokeTow","","others",false)
				end
				if vRP.nearestPlayer(3) then
					exports["dynamic"]:AddMenu("Jogador","Pessoa mais próxima de você.","closestpeds")
					exports["dynamic"]:AddButton("Colocar no Veículo","Colocar no veículo mais próximo.","player:cvFunctions","cv","closestpeds",true)
					exports["dynamic"]:AddButton("Remover do Veículo","Remover do veículo mais próximo.","player:cvFunctions","rv","closestpeds",true)
				end
			else
				exports["dynamic"]:AddMenu("Veículo","Funções do veículo.","vehicle")
				exports["dynamic"]:AddButton("Sentar no Motorista","Sentar no banco do motorista.","vrp_player:SeatPlayer","0","vehicle",false)
				exports["dynamic"]:AddButton("Sentar no Passageiro","Sentar no banco do passageiro.","vrp_player:SeatPlayer","1","vehicle",false)
				exports["dynamic"]:AddButton("Sentar em Outros","Sentar no banco do passageiro.","vrp_player:SeatPlayer","2","vehicle",false)
				exports["dynamic"]:AddButton("Mexer nos Vidros","Levantar/Abaixar os vidros.","vrp_player:syncWins",Vehicle,"vehicle",false)
			end

			exports["dynamic"]:AddMenu("Portas","Portas do veículo.","doors")
			exports["dynamic"]:AddButton("Porta do Motorista","Abrir porta do motorista.","vehcontrol:Doors","1","doors",true)
			exports["dynamic"]:AddButton("Porta do Passageiro","Abrir porta do passageiro.","vehcontrol:Doors","2","doors",true)
			exports["dynamic"]:AddButton("Porta Traseira Esquerda","Abrir porta traseira esquerda.","vehcontrol:Doors","3","doors",true)
			exports["dynamic"]:AddButton("Porta Traseira Direita","Abrir porta traseira direita.","vehcontrol:Doors","4","doors",true)
			exports["dynamic"]:AddButton("Porta-Malas","Abrir porta-malas.","vehcontrol:Doors","5","doors",true)
			exports["dynamic"]:AddButton("Capô","Abrir capô.","vehcontrol:Doors","6","doors",true)
		end

		if exports['Accessories']:MyPet() ~= nil then
			exports["dynamic"]:AddMenu("Domésticos","Todas as funções dos animais domésticos.","animal")
			exports["dynamic"]:AddButton("Seguir","Seguir o proprietário.","dynamic:animalFunctions","seguir","animal",false)
			exports["dynamic"]:AddButton("Colocar no Veículo","Colocar o animal no veículo.","dynamic:animalFunctions","colocar","animal",false)
			exports["dynamic"]:AddButton("Remover do Veículo","Remover o animal no veículo.","dynamic:animalFunctions","remover","animal",false)
			exports["dynamic"]:AddButton("Deletar","Remover o animal.","dynamic:animalFunctions","deletar","animal",false)
		end

		exports["dynamic"]:AddMenu("Chamados","Chamados Admin.","chamado")
		exports["dynamic"]:AddButton("Chamar Staff","Preciso de Suporte.","chamados:chamado","aplicar","chamado",true)

		exports["dynamic"]:AddMenu("Outros","Todas as funções do personagem.","others")
		exports["dynamic"]:AddButton("Propriedades","Marcar/Desmarcar propriedades no mapa.","will_homes:blips","","others",false)
		exports["dynamic"]:AddButton("Desbugar","Recarregar o personagem.","player:Debug","","others",true)
		exports["dynamic"]:AddButton("Radio","Animação do radio.","radio:setAnim","","others")
		if GetResourceState("will_login") == "started" then
			exports["dynamic"]:AddButton("Referencias","Abrir menu de referencias.","will_login:openMyReferences","","others",true)
		end
		if GetResourceState("will_battlepass") == "started" then
			exports["dynamic"]:AddButton("Passe de Batalha","Abrir o passe de batalha.","will_battlepass:open","",false,false)
		end
		exports["dynamic"]:Open()
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- EMERGENCYFUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("EmergencyFunctions",function()
	if (LocalPlayer["state"]["Police"] or LocalPlayer["state"]["Paramedic"] or LocalPlayer["state"]["Mechanic"]) and not IsPauseMenuActive() and not LocalPlayer["state"]["Commands"] and not LocalPlayer["state"]["Handcuff"] and not LocalPlayer["state"]["Prison"] and not Dynamic then
		local Ped = PlayerPedId()
		if LocalPlayer["state"]["Police"] then
			if GetEntityHealth(Ped) > 100 and not IsPedInAnyVehicle(Ped, false) then
				exports["dynamic"]:AddButton("Anuncio Policia","Fazer um anúncio para todos os moradores.","dynamic:EmergencyAnnounce","",false,true)
				exports["dynamic"]:AddButton("Computador","Computador de bordo policial.","police:Open","",false,false)

				exports["dynamic"]:AddMenu("Jogador","Pessoa mais próxima de você.","player")
				exports["dynamic"]:AddButton("Carregar","Carregar a pessoa mais próxima.","inventory:Carry","","player",true)
				exports["dynamic"]:AddButton("Colocar no Veículo","Colocar no veículo mais próximo.","player:cvFunctions","cv","player",true)
				exports["dynamic"]:AddButton("Remover do Veículo","Remover do veículo mais próximo.","player:cvFunctions","rv","player",true)
				exports["dynamic"]:AddButton("Remover Chapéu","Remover da pessoa mais próxima.","skinshop:Remove","Hat","player",true)
				exports["dynamic"]:AddButton("Remover Máscara","Remover da pessoa mais próxima.","skinshop:Remove","Mask","player",true)
				exports["dynamic"]:AddButton("Remover Óculos","Remover da pessoa mais próxima.","skinshop:Remove","Glasses","player",true)

				exports["dynamic"]:AddMenu("Fardamentos","Todos os fardamentos policiais.","prePolice")
				if Presets["Police"] then
					for Name,data in pairs(Presets["Police"]) do
						if LocalPlayer["state"][Name] then
							exports["dynamic"]:AddButton(Name,"Fardamento de "..Name..".","player:Preset",Name,"prePolice",true)
						end
					end
				end
			end
			exports["dynamic"]:Open()
		elseif LocalPlayer["state"]["Paramedic"] then
			if GetEntityHealth(Ped) > 100 and not IsPedInAnyVehicle(Ped, false) then
				exports["dynamic"]:AddButton("Anuncio Paramedic","Fazer um anúncio para todos os moradores.","dynamic:EmergencyAnnounceMedic","",false,true)
				exports["dynamic"]:AddMenu("Jogador","Pessoa mais próxima de você.","player")
				exports["dynamic"]:AddButton("Carregar","Carregar a pessoa mais próxima.","inventory:Carry","","player",true)
				exports["dynamic"]:AddButton("Colocar no Veículo","Colocar no veículo mais próximo.","player:cvFunctions","cv","player",true)
				exports["dynamic"]:AddButton("Remover do Veículo","Remover do veículo mais próximo.","player:cvFunctions","rv","player",true)
				exports["dynamic"]:AddButton("Remover Chapéu","Remover da pessoa mais próxima.","skinshop:Remove","Hat","player",true)
				exports["dynamic"]:AddButton("Remover Máscara","Remover da pessoa mais próxima.","skinshop:Remove","Mask","player",true)
				exports["dynamic"]:AddButton("Remover Óculos","Remover da pessoa mais próxima.","skinshop:Remove","Glasses","player",true)
				if Presets["Paramedic"] then
					for Name,data in pairs(Presets["Paramedic"]) do
						if LocalPlayer["state"][Name] then
							exports["dynamic"]:AddButton(Name,"Fardamento de "..Name..".","player:Preset",Name,"preMedic",true)
						end
					end
				end
				exports["dynamic"]:AddMenu("Fardamentos","Todos os fardamentos médicos.","preMedic")
				exports["dynamic"]:Open()
			end
		elseif LocalPlayer["state"]["Mechanic"] then
			if Presets["Mechanic"] then
				for Name,data in pairs(Presets["Mechanic"]) do
					if LocalPlayer["state"][Name] then
						exports["dynamic"]:AddButton(Name,"Fardamento de "..Name..".","player:Preset",Name,"preMechanic",true)
					end
				end
			end
			exports["dynamic"]:AddMenu("Fardamentos","Todos os fardamentos mecânicos.","preMechanic")
			exports["dynamic"]:Open()
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- KEYMAPPING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterKeyMapping("PlayerFunctions","Abrir menu principal.","keyboard","F9")
RegisterKeyMapping("EmergencyFunctions","Abrir menu de emergencial.","keyboard","F10")