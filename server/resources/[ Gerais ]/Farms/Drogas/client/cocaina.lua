InProcess = false
Drugs = Tunnel.getInterface("drogas")

function GetClosestFarm(farm)
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	local closestCoord = 10.0
	local loc = nil
	local closestFarm = nil
	for k,v in pairs(Farms[farm]) do
		for l,w in pairs(v.locais) do
			local distance = #(vector3(w['x'],w['y'],w['z']) - coords)
			if distance < closestCoord then
				closestCoord = distance
				loc = l
				closestFarm = k
			end
		end
	end
	return closestFarm,loc
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- LOCAIS
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local will = 1000
		local closestFarm, loc = GetClosestFarm('cocaina')
		if closestFarm and Farms.cocaina[closestFarm] then
			local data = Farms.cocaina[closestFarm].locais[loc]
			local distance = #(vector3(data.x,data.y,data.z) - GetEntityCoords(PlayerPedId()))
			if distance <= 5.0 then
				will = 4
				DrawBase3D(data['x'],data['y'],data['z'],"Pressione  ~r~E~w~  para "..data.text)
				if distance <= 1.5 and IsControlJustPressed(0,38) and Drugs.checkPermission(Farms.cocaina[closestFarm].perm) then
					if data.id == 1 then
						if Drugs.checkPayment(closestFarm,data.id,"cocaina") then
							InProcess = true
							TriggerEvent("cancelando",true)
							Despejando(data)
						end
					elseif data.id == 2 then
						if Drugs.checkPayment(closestFarm,data.id,"cocaina") then
							InProcess = true
							TriggerEvent("cancelando",true)
							Espalhando(data)
						end
					elseif data.id == 3 then
						if Drugs.checkPayment(closestFarm,data.id,"cocaina") then
							InProcess = true
							TriggerEvent("cancelando",true)
							EmbalarBrinquedo(data)
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
function EmbalarBrinquedo(farm)
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

	local targetRotation = farm.rotation
	local sceneCds = farm.sceneCds

	local netScene = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
	NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "full_cycle_v1_pressoperator", 1.5, -4.0, 1, 16, 1148846080, 0)
	NetworkAddEntityToSynchronisedScene(pazinha, netScene, animDict, "full_cycle_v1_scoop", 4.0, -8.0, 1)
	NetworkAddEntityToSynchronisedScene(vasilha, netScene, animDict, "full_cycle_v1_cocbowl", 4.0, -8.0, 1)
	NetworkAddEntityToSynchronisedScene(caixa_aberta, netScene, animDict, "full_cycle_v1_foldedbox", 4.0, -8.0, 1)

	local netScene2 = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
	NetworkAddEntityToSynchronisedScene(boneco_molde, netScene2, animDict, "full_cycle_v1_dollmould", 4.0, -8.0, 1)
	NetworkAddEntityToSynchronisedScene(prensa, netScene2, animDict, "full_cycle_v1_cokepress", 4.0, -8.0, 1)
	NetworkAddEntityToSynchronisedScene(boneco_vazio, netScene2, animDict, "full_cycle_v1_dollcast^3", 4.0, -8.0, 1)

	local netScene3 = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x,targetRotation.y,targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
	NetworkAddEntityToSynchronisedScene(boneco_pronto, netScene3, animDict, "full_cycle_v1_cocdoll", 4.0, -8.0, 1)
	NetworkAddEntityToSynchronisedScene(caixa_fechada, netScene3, animDict, "full_cycle_v1_boxeddoll", 4.0, -8.0, 1)

	Wait(150)
	NetworkStartSynchronisedScene(netScene)
	NetworkStartSynchronisedScene(netScene2)
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
end

function Despejando(farm)
	local ped = PlayerPedId()
	local x,y,z = table.unpack(GetEntityCoords(ped))
	local animDict = "anim@amb@business@coc@coc_unpack_cut@"
	RequestAnimDict(animDict)
	LoadModel("bkr_prop_coke_box_01a")
	LoadModel("bkr_prop_coke_fullmetalbowl_02")
	LoadModel("bkr_prop_coke_fullscoop_01a")

	local vasilha = CreateObject(GetHashKey('bkr_prop_coke_fullmetalbowl_02'), x, y, z, true, false, true)
	local pazinha = CreateObject(GetHashKey('bkr_prop_coke_fullscoop_01a'), x, y, z, true, false, true)
	local caixa = CreateObject(GetHashKey('bkr_prop_coke_box_01a'), x, y, z, true, false, true)

	local sceneCds = farm.sceneCds
	local targetRotation = farm.rotation
	local netScene = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
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
	DeleteObject(vasilha)
	InProcess = false
	TriggerEvent("cancelando",false)
end

function Espalhando(farm)
	local ped = PlayerPedId()
	local x,y,z = table.unpack(GetEntityCoords(ped))
	local animDict = "anim@amb@business@coc@coc_unpack_cut_left@"
	RequestAnimDict(animDict)
	LoadModel("bkr_prop_coke_box_01a")
	LoadModel("prop_cs_credit_card")
	LoadModel("bkr_prop_coke_bakingsoda_o")

	local cartao = CreateObject(GetHashKey('prop_cs_credit_card'), x, y, z, true, false, true)
	local cartao_2 = CreateObject(GetHashKey('prop_cs_credit_card'), x, y, z, true, false, true)
	local soda = CreateObject(GetHashKey('bkr_prop_coke_bakingsoda_o'), x, y, z, true, false, true)

	local targetRotation = farm.rotation
	local sceneCds = farm.sceneCds

	local netScene = NetworkCreateSynchronisedScene(sceneCds.x , sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
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
end
