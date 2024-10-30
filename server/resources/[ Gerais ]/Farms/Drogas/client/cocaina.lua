local Tunnel = module("vrp","lib/Tunnel")
Drugs = Tunnel.getInterface("drogas")
InProcess = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- LOCAIS
-----------------------------------------------------------------------------------------------------------------------------------------
local locais = Farms.cocaina.locais

CreateThread(function()
	while true do
		local will = 1000
		for k,v in pairs(locais) do
			local ped = PlayerPedId()
			local x,y,z = table.unpack(GetEntityCoords(ped))
			local bowz,cdz = GetGroundZFor_3dCoord(v.x,v.y,v.z)
			local distance = GetDistanceBetweenCoords(v.x,v.y,cdz,x,y,z,true)
			if distance <= 1.2 and not InProcess then
				will = 4
				DrawTxt("Pressione  ~r~E~w~  para "..v.text,4,0.5,0.93,0.50,255,255,255,180)
				if IsControlJustPressed(0,38) and Drugs.checkPermission(v.perm) then
					if v.id == 1 then
						if Drugs.checkPayment(v.id,"cocaina") then
							InProcess = true
							TriggerEvent("cancelando",true)
							Despejando()
						end
					elseif v.id == 2 then
						if Drugs.checkPayment(v.id,"cocaina") then
							InProcess = true
							TriggerEvent("cancelando",true)
							Espalhando()
						end
					elseif v.id == 3 then
						if Drugs.checkPayment(v.id,"cocaina") then
							InProcess = true
							TriggerEvent("cancelando",true)
							EmbalarBrinquedo()
						end
					end
				end
			end
		end
		Wait(will)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FUNÇÕES
-----------------------------------------------------------------------------------------------------------------------------------------
function EmbalarBrinquedo()
	CreateThread(function()
		while true do
			Wait(10)
			local ped = PlayerPedId()
			local x,y,z = table.unpack(GetEntityCoords(ped))
			local animDict = "anim@amb@business@coc@coc_packing_hi@"
			LoadAnim(animDict)
			LoadModel("bkr_prop_coke_fullscoop_01a")
            LoadModel("bkr_prop_coke_fullmetalbowl_02")
            LoadModel("bkr_prop_coke_dollboxfolded")
            LoadModel("bkr_prop_coke_dollmould")
            LoadModel("bkr_prop_coke_press_01b")
            LoadModel("bkr_prop_coke_dollcast")
            LoadModel("bkr_prop_coke_doll")
            LoadModel("bkr_prop_coke_dollbox")
            LoadModel("bkr_prop_coke_doll_bigbox")

            local pazinha = CreateObject(GetHashKey('bkr_prop_coke_fullscoop_01a'), x, y, z, true,false,true)
            local vasilha = CreateObject(GetHashKey('bkr_prop_coke_fullmetalbowl_02'), x, y, z, true,false,true)
            local caixa_aberta = CreateObject(GetHashKey('bkr_prop_coke_dollboxfolded'), x, y, z, true,false,true)
            local boneco_molde = CreateObject(GetHashKey('bkr_prop_coke_dollmould'), x, y, z, true,false,true)
            local prensa = CreateObject(GetHashKey('bkr_prop_coke_press_01b'), x, y, z, true,false,true)
            local boneco_vazio = CreateObject(GetHashKey('bkr_prop_coke_dollcast'), x, y, z, true,false,true)
            local boneco_pronto = CreateObject(GetHashKey('bkr_prop_coke_doll'), x, y, z, true,false,true)
            local caixa_fechada = CreateObject(GetHashKey('bkr_prop_coke_dollbox'), x, y, z, true,false,true)

            local targetRotation = vec3(180.0, 180.0, 60.5)
            local x,y,z = table.unpack(vec3(-1111.88, 4942.48,  218.65))

			local netScene = NetworkCreateSynchronisedScene(x + 5.3 ,y + 4.6, z - 1.0, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
            NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "full_cycle_v1_pressoperator", 1.5, -4.0, 1, 16, 1148846080, 0)
            NetworkAddEntityToSynchronisedScene(pazinha, netScene, animDict, "full_cycle_v1_scoop", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(vasilha, netScene, animDict, "full_cycle_v1_cocbowl", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa_aberta, netScene, animDict, "full_cycle_v1_foldedbox", 4.0, -8.0, 1)

            local netScene2 = NetworkCreateSynchronisedScene(x + 5.3 ,y + 4.6, z - 1.0, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
            NetworkAddEntityToSynchronisedScene(boneco_molde, netScene2, animDict, "full_cycle_v1_dollmould", 4.0, -8.0, 1) --
            NetworkAddEntityToSynchronisedScene(prensa, netScene2, animDict, "full_cycle_v1_cokepress", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(boneco_vazio, netScene2, animDict, "full_cycle_v1_dollcast^3", 4.0, -8.0, 1)

			local netScene3 = NetworkCreateSynchronisedScene(x + 5.3 ,y + 4.6, z - 1.0, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
            NetworkAddEntityToSynchronisedScene(boneco_pronto, netScene3, animDict, "full_cycle_v1_cocdoll", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa_fechada, netScene3, animDict, "full_cycle_v1_boxeddoll", 4.0, -8.0, 1)

			Wait(150)
			NetworkStartSynchronisedScene(netScene)
			Wait(100)
			NetworkStartSynchronisedScene(netScene2)
			Wait(100)
            NetworkStartSynchronisedScene(netScene3)

			Wait(GetAnimDuration(animDict, "full_cycle_v1_pressoperator") * 780)

			NetworkStopSynchronisedScene(netScene)
			NetworkStopSynchronisedScene(netScene2)
			NetworkStopSynchronisedScene(netScene3)

			TriggerEvent('Notify', 'sucesso', 'Você embalou a cocaína.')

			DeleteObject(prensa)
            DeleteObject(caixa_aberta)
            DeleteObject(boneco_molde)
            DeleteObject(boneco_vazio)
            DeleteObject(boneco_pronto)
			DeleteObject(caixa_fechada)
			InProcess = false
			TriggerEvent("cancelando",false)
			break
		end
	end)
end

function Despejando()
	CreateThread(function()
		while true do
			Wait(10)
			local ped = PlayerPedId()
			local x,y,z = table.unpack(GetEntityCoords(ped))
			local animDict = "anim@amb@business@coc@coc_unpack_cut@"
			RequestAnimDict(animDict)
			RequestModel("bkr_prop_coke_box_01a")
			RequestModel("bkr_prop_coke_fullmetalbowl_02")
			RequestModel("bkr_prop_coke_fullscoop_01a")

			while not HasAnimDictLoaded(animDict) and
				not HasModelLoaded("bkr_prop_coke_box_01a") and 
				not HasModelLoaded("bkr_prop_coke_fullmetalbowl_02") and 
				not HasModelLoaded("bkr_prop_coke_fullscoop_01a") do
				Wait(100)
			end

			local vasilha = CreateObject(GetHashKey('bkr_prop_coke_fullmetalbowl_02'), x, y, z, true, false, true)
			local pazinha = CreateObject(GetHashKey('bkr_prop_coke_fullscoop_01a'), x, y, z, true, false, true)
			local caixa = CreateObject(GetHashKey('bkr_prop_coke_box_01a'), x, y, z, true, false, true)

			local targetRotation = vec3(180.0, 180.0, 60.5)
			local x,y,z = table.unpack(vec3(-1105.13, 4952.35, 218.65))
			local netScene = NetworkCreateSynchronisedScene(x + 0.5 ,y - 0.2, z - 0.65, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "fullcut_cycle_v1_cokepacker", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(vasilha, netScene, animDict, "fullcut_cycle_v1_cokebowl", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa, netScene, animDict, 'fullcut_cycle_v1_cokebox', 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(pazinha, netScene, animDict, 'fullcut_cycle_v1_cokescoop', 4.0, -8.0, 1)
			Wait(150)
			NetworkStartSynchronisedScene(netScene)

			SetEntityVisible(pazinha, false, false)
			Wait(GetAnimDuration(animDict, "fullcut_cycle_v1_cokepacker") * 450)
			SetEntityVisible(pazinha, true, false)
			Wait(GetAnimDuration(animDict, "fullcut_cycle_v1_cokepacker") * 65)
			SetEntityVisible(caixa, false, false)

			Wait(GetAnimDuration(animDict, "fullcut_cycle_v1_cokepacker") * 245)
			TriggerEvent('Notify', 'sucesso', 'Você colocou a cocaína na vasilha.')
			DeleteObject(caixa)
			DeleteObject(pazinha)
			InProcess = false
			TriggerEvent("cancelando",false)
			break
		end
	end)
end

function Espalhando()
	CreateThread(function()
		while true do
			Wait(10)
			local ped = PlayerPedId()
			local x,y,z = table.unpack(GetEntityCoords(ped))
			local animDict = "anim@amb@business@coc@coc_unpack_cut_left@"
            RequestAnimDict(animDict)
            RequestModel("bkr_prop_coke_box_01a")
            RequestModel("prop_cs_credit_card")
            RequestModel("bkr_prop_coke_bakingsoda_o")

            while not HasAnimDictLoaded(animDict) and
                not HasModelLoaded("bkr_prop_coke_bakingsoda_o") and
                not HasModelLoaded("prop_cs_credit_card") do
                Wait(100)
            end

            local cartao = CreateObject(GetHashKey('prop_cs_credit_card'), x, y, z, true, false, true)
            local cartao_2 = CreateObject(GetHashKey('prop_cs_credit_card'), x, y, z, true, false, true)
            local soda = CreateObject(GetHashKey('bkr_prop_coke_bakingsoda_o'), x, y, z, true, false, true)

            local targetRotation = vec3(180.0, 180.0, 240.0)
            local x,y,z = table.unpack(vec3(-1106.4, 4951.23, 218.68))

            local netScene = NetworkCreateSynchronisedScene(x - 0.7 ,y - 1.8, z - 0.65, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
            NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "coke_cut_coccutter", 1.5, -4.0, 1, 16, 1148846080, 0)
            NetworkAddEntityToSynchronisedScene(cartao, netScene, animDict, "coke_cut_creditcard", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(cartao_2, netScene, animDict, "coke_cut_creditcard^1", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(soda, netScene, animDict, "cut_cough_v1_bakingsoda", 4.0, -8.0, 1) 
            NetworkStartSynchronisedScene(netScene)
			Wait(GetAnimDuration(animDict, "coke_cut_coccutter") * 770)
			TriggerEvent('Notify', 'sucesso', 'Você espalhou a cocaína na mesa.')
            DeleteObject(cartao)
            DeleteObject(cartao_2)
			DeleteObject(soda)
			InProcess = false
			TriggerEvent("cancelando",false)
			break
		end
	end)
end

function DrawTxt(text,font,x,y,scale,r,g,b,a)
	SetTextFont(font)
	SetTextScale(scale,scale)
	SetTextColour(r,g,b,a)
	SetTextOutline()
	SetTextCentre(true)
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end

function LoadModel(model)
	if type(model) ~= "number" then
		model = GetHashKey(model)
	end
	while not HasModelLoaded(model) do
        RequestModel(model)
        Citizen.Wait(10)
    end
	return true
end