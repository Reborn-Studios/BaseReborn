local locais = Farms.maconha.locais

CreateThread(function()
	while true do
		local will = 1100
		for k,v in pairs(locais) do
			local ped = PlayerPedId()
			local x,y,z = table.unpack(GetEntityCoords(ped))
			local bowz,cdz = GetGroundZFor_3dCoord(v.x,v.y,v.z)
			local distance = GetDistanceBetweenCoords(v.x,v.y,cdz,x,y,z,true)
			if distance <= 2.0 and not InProcess then
				will = 4
				DrawTxt("Pressione  ~r~E~w~  para "..v.text,4,0.5,0.93,0.50,255,255,255,180)
				if IsControlJustPressed(0,38) and Drugs.checkPermission(v.perm) then
					if v.id == 1 then
						if Drugs.checkPayment(v.id,"maconha") then
							InProcess = true
							TriggerEvent("cancelando",true)
							SetEntityHeading(ped, 22.48)
							vRP._playAnim(false,{"anim@amb@business@weed@weed_inspecting_lo_med_hi@","weed_crouch_checkingleaves_idle_01_inspector"},false)
							Wait(5000)
							TriggerEvent("cancelando",false)
							InProcess = false
						end
					elseif v.id == 2 then
						if Drugs.checkPayment(v.id,"maconha") then
							InProcess = true
							SetEntityHeading(ped, 19.00)
							vRP._playAnim(false,{"anim@amb@business@weed@weed_inspecting_lo_med_hi@","weed_crouch_checkingleaves_idle_01_inspector"},false)
							TriggerEvent("cancelando",true)
							Wait(5000)
							TriggerEvent("cancelando",false)
							InProcess = false
						end
					elseif v.id == 3 then
						if Drugs.checkPayment(v.id,"maconha") then
							InProcess = true
							TriggerEvent("cancelando",true)
							Separando()
							TriggerEvent("cancelando",false)
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
function Separando()
	while true do
		Wait(10)
		local ped = PlayerPedId()
		local targetRotation = vec3(180.0, 180.0, 300.0)
		local x,y,z = table.unpack(vec3(111.74, 6359.91, 32.32))
		local animDict = "anim@amb@business@weed@weed_sorting_seated@"
		LoadAnim(animDict)
		LoadModel("bkr_prop_weed_bag_01a")
		LoadModel("bkr_prop_weed_bag_pile_01a")
		LoadModel("bkr_prop_weed_bud_02b")
		LoadModel("bkr_prop_weed_leaf_01a")
		LoadModel("bkr_prop_weed_dry_01a")
		LoadModel("bkr_prop_weed_bucket_open_01a")

		local bud = CreateObject(GetHashKey('bkr_prop_weed_bud_02b'), x, y, z, true, false, true)
		local folha = CreateObject(GetHashKey('bkr_prop_weed_leaf_01a'), x, y, z, true, false, true)
		local maconha_seca = CreateObject(GetHashKey('bkr_prop_weed_dry_01a'), x, y, z, true, false, true)
		local balde = CreateObject(GetHashKey('bkr_prop_weed_bucket_open_01a'), x, y, z, true, false, true)
		local plastico_vazio = CreateObject(GetHashKey('bkr_prop_weed_bag_01a'), x, y, z, true, false, true)
		local pilha_plasticos = CreateObject(GetHashKey('bkr_prop_weed_bag_pile_01a'), x, y, z, true, false, true)

		local netScene = NetworkCreateSynchronisedScene(x + 5.5,y + 3.1, z - 1.0, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
		NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "sorter_left_sort_v1_sorter01", 1.5, -4.0, 1, 16, 1148846080, 0)
		NetworkAddEntityToSynchronisedScene(plastico_vazio, netScene, animDict, "sorter_left_sort_v1_weedbag01a", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(pilha_plasticos, netScene, animDict, "sorter_left_sort_v1_weedbagpile01a", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(bud, netScene, animDict, "sorter_left_sort_v1_weedbud02b^3", 4.0, -8.0, 1)

		local netScene2 = NetworkCreateSynchronisedScene(x + 5.5 ,y + 3.1, z - 1.0, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
		NetworkAddPedToSynchronisedScene(ped, netScene2, animDict, "sorter_left_sort_v1_sorter01", 1.5, -4.0, 1, 16, 1148846080, 0)
		NetworkAddEntityToSynchronisedScene(maconha_seca, netScene2, animDict, "sorter_left_sort_v1_weeddry01a", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(folha, netScene2, animDict, "sorter_left_sort_v1_weedleaf01a^1", 4.0, -8.0, 1)
		NetworkAddEntityToSynchronisedScene(balde, netScene2, animDict, "sorter_left_sort_v1_bucket01a", 4.0, -8.0, 1)
		Wait(150)
		NetworkStartSynchronisedScene(netScene)
		Wait(150)
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
