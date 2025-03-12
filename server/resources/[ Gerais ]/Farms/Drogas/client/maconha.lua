local function getClosestFarm()
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	for k,v in pairs(Farms.maconha) do
		for l,w in pairs(v.locais) do
			if #(vector3(w['x'],w['y'],w['z']) - coords) <= 2.0 then
				return k,l
			end
		end
	end
end

CreateThread(function()
	while true do
		local will = 1000
		local closestFarm, loc = getClosestFarm()
		if closestFarm and loc then
			local data = Farms.maconha[closestFarm].locais[loc]
			if data and not InProcess then
				if #(vector3(data['x'],data['y'],data['z']) - GetEntityCoords(PlayerPedId())) <= 2.0 then
					will = 4
					DrawTxt("Pressione  ~r~E~w~  para "..data.text,4,0.5,0.93,0.50,255,255,255,180)
					if IsControlJustPressed(0,38) and Drugs.checkPermission(Farms.maconha[closestFarm]['perm']) then
						if data['id'] == 1 then
							if Drugs.checkPayment(closestFarm,data['id'],"maconha") then
								InProcess = true
								TriggerEvent("cancelando",true)
								SetEntityHeading(ped, 22.48)
								vRP._playAnim(false,{"anim@amb@business@weed@weed_inspecting_lo_med_hi@","weed_crouch_checkingleaves_idle_01_inspector"},false)
								Wait(5000)
								TriggerEvent("cancelando",false)
								vRP.stopAnim()
								InProcess = false
							end
						elseif data['id'] == 2 then
							if Drugs.checkPayment(closestFarm,data['id'],"maconha") then
								InProcess = true
								SetEntityHeading(ped, 19.00)
								vRP._playAnim(false,{"anim@amb@business@weed@weed_inspecting_lo_med_hi@","weed_crouch_checkingleaves_idle_01_inspector"},false)
								TriggerEvent("cancelando",true)
								Wait(5000)
								TriggerEvent("cancelando",false)
								vRP.stopAnim()
								InProcess = false
							end
						elseif data['id'] == 3 then
							if Drugs.checkPayment(closestFarm,data['id'],"maconha") then
								InProcess = true
								TriggerEvent("cancelando",true)
								Separando(data)
								TriggerEvent("cancelando",false)
							end
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
function Separando(farm)
	while true do
		Wait(10)
		local ped = PlayerPedId()
		local targetRotation = farm.rotation
		local sceneCds = farm.sceneCds
		local animDict = "anim@amb@business@weed@weed_sorting_seated@"
		LoadAnim(animDict)
		LoadModel("bkr_prop_weed_bag_01a")
		LoadModel("bkr_prop_weed_bag_pile_01a")
		LoadModel("bkr_prop_weed_bud_02b")
		LoadModel("bkr_prop_weed_leaf_01a")
		LoadModel("bkr_prop_weed_dry_01a")
		LoadModel("bkr_prop_weed_bucket_open_01a")

		local bud = CreateObject(GetHashKey('bkr_prop_weed_bud_02b'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
		local folha = CreateObject(GetHashKey('bkr_prop_weed_leaf_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
		local maconha_seca = CreateObject(GetHashKey('bkr_prop_weed_dry_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
		local balde = CreateObject(GetHashKey('bkr_prop_weed_bucket_open_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
		local plastico_vazio = CreateObject(GetHashKey('bkr_prop_weed_bag_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
		local pilha_plasticos = CreateObject(GetHashKey('bkr_prop_weed_bag_pile_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)

		local netScene = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
		NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "sorter_left_sort_v1_sorter01", 1.5, -4.0, 1, 16, 1148846080, 0)
		NetworkAddEntityToSynchronisedScene(plastico_vazio, netScene, animDict, "sorter_left_sort_v1_weedbag01a", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(pilha_plasticos, netScene, animDict, "sorter_left_sort_v1_weedbagpile01a", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(bud, netScene, animDict, "sorter_left_sort_v1_weedbud02b^3", 4.0, -8.0, 1)

		local netScene2 = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
		NetworkAddPedToSynchronisedScene(ped, netScene2, animDict, "sorter_left_sort_v1_sorter01", 1.5, -4.0, 1, 16, 1148846080, 0)
		NetworkAddEntityToSynchronisedScene(maconha_seca, netScene2, animDict, "sorter_left_sort_v1_weeddry01a", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(folha, netScene2, animDict, "sorter_left_sort_v1_weedleaf01a^1", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(balde, netScene2, animDict, "sorter_left_sort_v1_bucket01a", 4.0, -8.0, 1)
		Wait(150)
		NetworkStartSynchronisedScene(netScene)
		NetworkStartSynchronisedScene(netScene2)
		Wait(GetAnimDuration(animDict, "sorter_left_sort_v1_sorter01") * 770)
		TriggerEvent('Notify', 'sucesso', 'Você separou a bucha.')
		DeleteObject(plastico_vazio)
		DeleteObject(pilha_plasticos)
		DeleteObject(bud)
		DeleteObject(folha)
		DeleteObject(maconha_seca)
		DeleteObject(balde)
		InProcess = false
		break
	end
end
