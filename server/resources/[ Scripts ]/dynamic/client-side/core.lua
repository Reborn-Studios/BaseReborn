-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Dynamic = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- ADDBUTTON
-----------------------------------------------------------------------------------------------------------------------------------------
exports("AddButton",function(title,description,trigger,par,id,server)
	SendNUIMessage({ addbutton = true, title = title, description = description, trigger = trigger, par = par, id = id, server = server })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- SUBMENU
-----------------------------------------------------------------------------------------------------------------------------------------
exports("SubMenu",function(title,description,id,icons)
	SendNUIMessage({ addmenu = true, title = title, description = description, menuid = id, icons = icons })
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- OPENMENU
-----------------------------------------------------------------------------------------------------------------------------------------
exports("openMenu",function()
	SendNUIMessage({ show = true })
	SetNuiFocus(true,true)
	Dynamic = true
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CLICKED
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNUICallback("clicked",function(Data,Callback)
	if Data["trigger"] and Data["trigger"] ~= "" then
		if Data["server"] == "true" then
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
RegisterNUICallback("close",function(Data,Callback)
	SetNuiFocus(false,false)
	Dynamic = false
	Callback("Ok")
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DYNAMIC:CLOSESYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("dynamic:closeSystem")
AddEventHandler("dynamic:closeSystem",function()
	if Dynamic then
		SendNUIMessage({ close = true })
		SetNuiFocus(false,false)
		Dynamic = false
	end
end)

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
	if result[1] then
		TriggerEvent("pma-voice:setRadioAnim",result[1])
		if result[1] == "default_anim" then
			TriggerEvent("Notify","amarelo","Animação do radio alterada para <b>ombro</b>.",5000)
		else
			TriggerEvent("Notify","amarelo","Animação do radio alterada para <b>boca</b>.",5000)
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GLOBALFUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("globalFunctions",function()
	if not LocalPlayer["state"]["Commands"] and not LocalPlayer["state"]["Handcuff"] and not LocalPlayer["state"]["Prison"] and not Dynamic and not IsPauseMenuActive() then
		local Ped = PlayerPedId()
		if GetEntityHealth(Ped) > 100 then
			if LocalPlayer["state"]["Premium"] then
				exports["dynamic"]:AddButton("Vestir Premium","Vestir-se com as vestimentas guardadas.","player:Outfit","aplicarpre","wardrobe",true)
				exports["dynamic"]:AddButton("Guardar Premium","Salvar suas vestimentas do corpo.","player:Outfit","salvarpre","wardrobe",true)
				exports["dynamic"]:SubMenu("Armário Premium","Colocar/Retirar roupas.","wardrobe","fa-light fa-clothes-hanger")

				exports["dynamic"]:AddButton("VIP status","Verificar VIP.","dynamic:checkVipStatus","","others",false)
			end

			exports["dynamic"]:AddButton("Vestir","Vestir-se com as vestimentas guardadas.","player:Outfit","aplicar","wardrobe",true)
			exports["dynamic"]:AddButton("Guardar","Salvar suas vestimentas do corpo.","player:Outfit","salvar","wardrobe",true)
			exports["dynamic"]:AddButton("Remover","Remover suas vestimentas do corpo.","player:Outfit","remover","wardrobe",true)
			exports["dynamic"]:SubMenu("Armário","Colocar/Retirar roupas.","wardrobe","fa-light fa-clothes-hanger")

			exports["dynamic"]:AddButton("Chapéu","Colocar/Retirar o chapéu.","player:Outfit","Hat","clothes",true)
			exports["dynamic"]:AddButton("Máscara","Colocar/Retirar a máscara.","player:Outfit","Mask","clothes",true)
			exports["dynamic"]:AddButton("Óculos","Colocar/Retirar o óculos.","player:Outfit","Glasses","clothes",true)
			exports["dynamic"]:AddButton("Camisa","Colocar/Retirar a camisa.","player:Outfit","Shirt","clothes",true)
			exports["dynamic"]:AddButton("Jaqueta","Colocar/Retirar a jaqueta.","player:Outfit","Jacket","clothes",true)
			exports["dynamic"]:AddButton("Mãos","Ajustas as mãos.","player:Outfit","Arms","clothes",true)
			exports["dynamic"]:AddButton("Colete","Colocar/Retirar o colete.","player:Outfit","Vest","clothes",true)
			exports["dynamic"]:AddButton("Calça","Colocar/Retirar a calça.","player:Outfit","Pants","clothes",true)
			exports["dynamic"]:AddButton("Sapatos","Colocar/Retirar o sapato.","player:Outfit","Shoes","clothes",true)
			exports["dynamic"]:AddButton("Acessórios","Colocar/Retirar os acessórios.","player:Outfit","Accessory","clothes",true)
			exports["dynamic"]:SubMenu("Roupas","Mudança de roupas rápidas.","clothes","fa-light fa-shirt")

			local Vehicle = vRP.getNearVehicle(7)
			local LastVehicle = GetLastDrivenVehicle()
			if IsEntityAVehicle(Vehicle) then
				if not IsPedInAnyVehicle(Ped) then
					if GetEntityModel(LastVehicle) == GetHashKey("flatbed") and not IsPedInAnyVehicle(Ped) then
						exports["dynamic"]:AddButton("Rebocar","Colocar o veículo na prancha.","towdriver:invokeTow","","others",false)
					end
					if vRP.nearestPlayer(3) then
						exports["dynamic"]:AddButton("Colocar no Veículo","Colocar no veículo mais próximo.","player:cvFunctions","cv","closestpeds",true)
						exports["dynamic"]:AddButton("Remover do Veículo","Remover do veículo mais próximo.","player:cvFunctions","rv","closestpeds",true)

						exports["dynamic"]:SubMenu("Jogador","Pessoa mais próxima de você.","closestpeds","fa-light fa-user")
					end
				else
					exports["dynamic"]:AddButton("Sentar no Motorista","Sentar no banco do motorista.","vrp_player:SeatPlayer","0","vehicle",false)
					exports["dynamic"]:AddButton("Sentar no Passageiro","Sentar no banco do passageiro.","vrp_player:SeatPlayer","1","vehicle",false)
					exports["dynamic"]:AddButton("Sentar em Outros","Sentar no banco do passageiro.","vrp_player:SeatPlayer","2","vehicle",false)
					exports["dynamic"]:AddButton("Mexer nos Vidros","Levantar/Abaixar os vidros.","vrp_player:syncWins",Vehicle,"vehicle",false)

					exports["dynamic"]:SubMenu("Veículo","Funções do veículo.","vehicle","fa-light fa-car")
				end

				exports["dynamic"]:AddButton("Porta do Motorista","Abrir porta do motorista.","vehcontrol:Doors","1","doors",true)
				exports["dynamic"]:AddButton("Porta do Passageiro","Abrir porta do passageiro.","vehcontrol:Doors","2","doors",true)
				exports["dynamic"]:AddButton("Porta Traseira Esquerda","Abrir porta traseira esquerda.","vehcontrol:Doors","3","doors",true)
				exports["dynamic"]:AddButton("Porta Traseira Direita","Abrir porta traseira direita.","vehcontrol:Doors","4","doors",true)
				exports["dynamic"]:AddButton("Porta-Malas","Abrir porta-malas.","vehcontrol:Doors","5","doors",true)
				exports["dynamic"]:AddButton("Capô","Abrir capô.","vehcontrol:Doors","6","doors",true)

				exports["dynamic"]:SubMenu("Portas","Portas do veículo.","doors")
			end

			if exports['Accessories']:MyPet() ~= nil then
				exports["dynamic"]:AddButton("Seguir","Seguir o proprietário.","dynamic:animalFunctions","seguir","animal",false)
				exports["dynamic"]:AddButton("Colocar no Veículo","Colocar o animal no veículo.","dynamic:animalFunctions","colocar","animal",false)
				exports["dynamic"]:AddButton("Remover do Veículo","Remover o animal no veículo.","dynamic:animalFunctions","remover","animal",false)
				exports["dynamic"]:AddButton("Deletar","Remover o animal.","dynamic:animalFunctions","deletar","animal",false)
				exports["dynamic"]:SubMenu("Domésticos","Todas as funções dos animais domésticos.","animal","fa-solid fa-dog")
			end

			exports["dynamic"]:AddButton("Propriedades","Marcar/Desmarcar propriedades no mapa.","will_homes:blips","","others",false)
			exports["dynamic"]:AddButton("Desbugar","Recarregar o personagem.","player:Debug","","others",true)
			exports["dynamic"]:AddButton("Radio","Animação do radio.","radio:setAnim","","others")
			if GetResourceState("will_login") == "started" then
				exports["dynamic"]:AddButton("Referencias","Abrir menu de referencias.","will_login:openMyReferences","","others",true)
			end
			exports["dynamic"]:SubMenu("Outros","Todas as funções do personagem.","others","fa-light fa-sliders")
			exports["dynamic"]:AddButton("Chamar Staff","Preciso de Suporte.","chamados:chamado","aplicar","chamado",true)
			exports["dynamic"]:SubMenu("Chamados","Chamados Admin.","chamado","fa-solid fa-phone-volume")
			if GetResourceState("will_battlepass") == "started" then
				exports["dynamic"]:AddButton("Passe de Batalha","Abrir o passe de batalha.","will_battlepass:open","",false,false)
			end
			exports["dynamic"]:openMenu()
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- EMERGENCYFUNCTIONS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("emergencyFunctions",function()
	if (LocalPlayer["state"]["Police"] or LocalPlayer["state"]["Paramedic"]) and not IsPauseMenuActive() and not LocalPlayer["state"]["Commands"] and not LocalPlayer["state"]["Handcuff"] and not LocalPlayer["state"]["Prison"] and not Dynamic then
		local Ped = PlayerPedId()
		if LocalPlayer["state"]["Police"] then
			if GetEntityHealth(Ped) > 100 and not IsPedInAnyVehicle(Ped) then
				exports["dynamic"]:AddButton("Anuncio Policia","Fazer um anúncio para todos os moradores.","dynamic:EmergencyAnnounce","",false,true)
				exports["dynamic"]:AddButton("Computador","Computador de bordo policial.","police:Open","",false,false)

				exports["dynamic"]:AddButton("Carregar","Carregar a pessoa mais próxima.","inventory:Carry","","player",true)
				exports["dynamic"]:AddButton("Colocar no Veículo","Colocar no veículo mais próximo.","player:cvFunctions","cv","player",true)
				exports["dynamic"]:AddButton("Remover do Veículo","Remover do veículo mais próximo.","player:cvFunctions","rv","player",true)
				exports["dynamic"]:AddButton("Remover Chapéu","Remover da pessoa mais próxima.","skinshop:Remove","Hat","player",true)
				exports["dynamic"]:AddButton("Remover Máscara","Remover da pessoa mais próxima.","skinshop:Remove","Mask","player",true)
				exports["dynamic"]:AddButton("Remover Óculos","Remover da pessoa mais próxima.","skinshop:Remove","Glasses","player",true)
				exports["dynamic"]:SubMenu("Jogador","Pessoa mais próxima de você.","player","fa-light fa-user")
				if Presets["Police"] then
					for Name,data in pairs(Presets["Police"]) do
						if LocalPlayer["state"][Name] then
							exports["dynamic"]:AddButton(Name,"Fardamento de "..Name..".","player:Preset",Name,"prePolice",true)
						end
					end
				end
				exports["dynamic"]:SubMenu("Fardamentos","Todos os fardamentos policiais.","prePolice","fa-light fa-shirt")
			end
			exports["dynamic"]:openMenu()
		elseif LocalPlayer["state"]["Paramedic"] then
			if GetEntityHealth(Ped) > 100 and not IsPedInAnyVehicle(Ped) then
				exports["dynamic"]:AddButton("Anuncio Paramedic","Fazer um anúncio para todos os moradores.","dynamic:EmergencyAnnounceMedic","",false,true)
				exports["dynamic"]:AddButton("Carregar","Carregar a pessoa mais próxima.","inventory:Carry","","player",true)
				exports["dynamic"]:AddButton("Colocar no Veículo","Colocar no veículo mais próximo.","player:cvFunctions","cv","player",true)
				exports["dynamic"]:AddButton("Remover do Veículo","Remover do veículo mais próximo.","player:cvFunctions","rv","player",true)
				exports["dynamic"]:AddButton("Remover Chapéu","Remover da pessoa mais próxima.","skinshop:Remove","Hat","player",true)
				exports["dynamic"]:AddButton("Remover Máscara","Remover da pessoa mais próxima.","skinshop:Remove","Mask","player",true)
				exports["dynamic"]:AddButton("Remover Óculos","Remover da pessoa mais próxima.","skinshop:Remove","Glasses","player",true)
				exports["dynamic"]:SubMenu("Jogador","Pessoa mais próxima de você.","player","fa-light fa-user")
				if Presets["Paramedic"] then
					for Name,data in pairs(Presets["Paramedic"]) do
						if LocalPlayer["state"][Name] then
							exports["dynamic"]:AddButton(Name,"Fardamento de "..Name..".","player:Preset",Name,"preMedic",true)
						end
					end
				end
				exports["dynamic"]:SubMenu("Fardamentos","Todos os fardamentos médicos.","preMedic","fa-light fa-shirt")
				exports["dynamic"]:openMenu()
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- KEYMAPPING
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterKeyMapping("globalFunctions","Abrir menu principal.","keyboard","F9")
RegisterKeyMapping("emergencyFunctions","Abrir menu de emergencial.","keyboard","F10")