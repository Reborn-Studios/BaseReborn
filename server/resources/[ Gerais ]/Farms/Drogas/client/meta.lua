local function getClosestFarm()
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	for k,v in pairs(Farms.meta) do
		for l,w in pairs(v.locais) do
			if #(vector3(w['x'],w['y'],w['z']) - coords) <= 2.0 then
				return k,l
			end
		end
	end
end

CreateThread(function()
	TriggerEvent("cancelando",false)
	while true do
		local will = 1200
		local closestFarm, loc = getClosestFarm()
		if closestFarm then
			local data = Farms.meta[closestFarm].locais[loc]
			if data and not InProcess then
				if #(vector3(data['x'],data['y'],data['z']) - GetEntityCoords(PlayerPedId())) <= 2 then
					will = 4
					DrawTxt("Pressione  ~r~E~w~  para "..data['text'],4,0.5,0.93,0.50,255,255,255,180)
					if IsControlJustPressed(0,38) and Drugs.checkPermission(Farms.meta[closestFarm]['perm']) then
						if data['id'] == 1 then
							if Drugs.checkPayment(closestFarm,data['id'],"meta") then
								InProcess = true
								TriggerEvent("cancelando",true)
								ColocarLiquidos(data)
							end
						elseif data['id'] == 2 then
							if Drugs.checkPayment(closestFarm,data['id'],"meta") then
								InProcess = true
								TriggerEvent("cancelando",true)
								QuebrarMeta(data)
							end
						elseif data['id'] == 3 then
							if Drugs.checkPayment(closestFarm,data['id'],"meta") then
								InProcess = true
								TriggerEvent("cancelando",true)
								EmbalarMeta(data)
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
function ColocarLiquidos(farm)
	CreateThread(function()
		while true do
			Wait(10)
			local ped = PlayerPedId()
            local targetRotation = farm.rotation
            local sceneCds = farm.sceneCds
			local animDict = "anim@amb@business@meth@meth_monitoring_cooking@cooking@"
			LoadAnim(animDict)
            LoadModel("bkr_prop_meth_ammonia")
            LoadModel("bkr_prop_meth_sacid")
            LoadModel("bkr_prop_fakeid_clipboard_01a")
            LoadModel("bkr_prop_fakeid_penclipboard")

            local ammonia = CreateObject(GetHashKey('bkr_prop_meth_ammonia'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
            local acido = CreateObject(GetHashKey('bkr_prop_meth_sacid'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
            local caderneta = CreateObject(GetHashKey('bkr_prop_fakeid_clipboard_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
            local caneta = CreateObject(GetHashKey('bkr_prop_fakeid_penclipboard'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)

            local netScene = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
            NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "chemical_pour_long_cooker", 1.5, -4.0, 1, 16, 1148846080, 0)
            NetworkAddEntityToSynchronisedScene(ammonia, netScene, animDict, "chemical_pour_long_ammonia", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(acido, netScene, animDict, "chemical_pour_long_sacid", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(caderneta, netScene, animDict, "chemical_pour_long_clipboard", 4.0, -8.0, 1)

            local netScene2 = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
            NetworkAddPedToSynchronisedScene(ped, netScene2, animDict, "chemical_pour_long_cooker", 1.5, -4.0, 1, 16, 1148846080, 0)
            NetworkAddEntityToSynchronisedScene(caneta, netScene2, animDict, "chemical_pour_long_pencil", 4.0, -8.0, 1)

			Wait(150)
            NetworkStartSynchronisedScene(netScene)
            NetworkStartSynchronisedScene(netScene2)

			Wait(GetAnimDuration(animDict, "chemical_pour_long_cooker") * 770)
			TriggerEvent('Notify', 'sucesso', 'Você misturou os ingredientes.')
            DeleteObject(ammonia)
            DeleteObject(acido)
            DeleteObject(caderneta)
			DeleteObject(caneta)
			InProcess = false
			TriggerEvent("cancelando",false)
			break
		end
	end)
end

function EmbalarMeta(farm)
	CreateThread(function()
		while true do
			Wait(5)
			local ped = PlayerPedId()
			local targetRotation = farm.rotation
			local sceneCds = farm.sceneCds
			local animDict = "anim@amb@business@meth@meth_smash_weight_check@"
			LoadAnim(animDict)
			LoadModel("bkr_prop_meth_scoop_01a")
			LoadModel("bkr_prop_meth_bigbag_03a")
			LoadModel("bkr_prop_meth_bigbag_04a")
			LoadModel("bkr_prop_fakeid_penclipboard")
			LoadModel("bkr_prop_fakeid_clipboard_01a")
			LoadModel("bkr_prop_meth_openbag_02")
			LoadModel("bkr_prop_coke_scale_01")
			LoadModel("bkr_prop_meth_smallbag_01a")
			LoadModel("bkr_prop_meth_openbag_01a")
			LoadModel("bkr_prop_fakeid_penclipboard")

			local pazinha = CreateObject(GetHashKey('bkr_prop_meth_scoop_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local caixa_grande = CreateObject(GetHashKey('bkr_prop_meth_bigbag_03a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local caixa_grande_2 = CreateObject(GetHashKey('bkr_prop_meth_bigbag_04a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local bolsa = CreateObject(GetHashKey('bkr_prop_meth_openbag_02'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local bolsa_fechada = CreateObject(GetHashKey('bkr_prop_meth_smallbag_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local bolsa_aberta = CreateObject(GetHashKey('bkr_prop_meth_openbag_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local balanca = CreateObject(GetHashKey('bkr_prop_coke_scale_01'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local caderneta = CreateObject(GetHashKey('bkr_prop_fakeid_clipboard_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local caneta = CreateObject(GetHashKey('bkr_prop_fakeid_penclipboard'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)

			local netScene = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "break_weigh_char01", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(pazinha, netScene, animDict, "break_weigh_scoop", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa_grande_2, netScene, animDict, "break_weigh_box01", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(bolsa, netScene, animDict, "break_weigh_methbag01^3", 4.0, -8.0, 1)

			local netScene2 = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene2, animDict, "break_weigh_char01", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(balanca, netScene2, animDict, "break_weigh_scale", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa_grande, netScene2, animDict, "break_weigh_box01^1", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(bolsa_fechada, netScene2, animDict, "break_weigh_methbag01^2", 4.0, -8.0, 1)

			local netScene3 = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene3, animDict, "break_weigh_char01", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(bolsa_aberta, netScene3, animDict, "break_weigh_methbag01^1", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caderneta, netScene3, animDict, "break_weigh_clipboard", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caneta, netScene3, animDict, "break_weigh_pen", 4.0, -8.0, 1)

			NetworkStartSynchronisedScene(netScene)
			NetworkStartSynchronisedScene(netScene2)
			NetworkStartSynchronisedScene(netScene3)

			Wait(GetAnimDuration(animDict, "break_weigh_char01") * 770)
			TriggerEvent('Notify', 'sucesso', 'Você embalou a metanfetamina.')

			DeleteObject(pazinha)
			DeleteObject(caixa_grande)
			DeleteObject(caixa_grande_2)
			DeleteObject(bolsa)
			DeleteObject(bolsa_fechada)
			DeleteObject(bolsa_aberta)
			DeleteObject(balanca)
			DeleteObject(caderneta)
			DeleteObject(caneta)
			TriggerEvent("cancelando",false)
			InProcess = false
			break
		end
	end)
end

function QuebrarMeta(farm)
	CreateThread(function()
		while true do
			Wait(5)
			local ped = PlayerPedId()
			local targetRotation = farm.rotation
			local sceneCds = farm.sceneCds
			local animDict = "anim@amb@business@meth@meth_smash_weight_check@"
			LoadAnim(animDict)
			LoadModel("bkr_prop_meth_tray_02a")
			LoadModel("w_me_hammer")
			LoadModel("bkr_prop_meth_tray_01a")
			LoadModel("bkr_prop_meth_smashedtray_01")
			LoadModel("bkr_prop_meth_smashedtray_01_frag_")
			LoadModel("bkr_prop_meth_bigbag_02a")

			local forma = CreateObject(GetHashKey('bkr_prop_meth_tray_02a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local forma_2 = CreateObject(GetHashKey('bkr_prop_meth_tray_01a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local forma_quebrada = CreateObject(GetHashKey('bkr_prop_meth_smashedtray_01'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local forma_quebrada_2 = CreateObject(GetHashKey('bkr_prop_meth_smashedtray_01_frag_'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local martelo = CreateObject(GetHashKey('w_me_hammer'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)
			local caixa = CreateObject(GetHashKey('bkr_prop_meth_bigbag_02a'), sceneCds.x, sceneCds.y, sceneCds.z, true, false, true)

			local netScene = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "break_weigh_char02", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(forma_quebrada, netScene, animDict, "break_weigh_tray01", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(forma_2, netScene, animDict, "break_weigh_tray01^1", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(martelo, netScene, animDict, "break_weigh_hammer", 4.0, -8.0, 1)

			local netScene2 = NetworkCreateSynchronisedScene(sceneCds.x, sceneCds.y, sceneCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene2, animDict, "break_weigh_char02", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(forma, netScene2, animDict, "break_weigh_tray01^2", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(forma_quebrada_2, netScene2, animDict, "break_weigh_tray01", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa, netScene2, animDict, "break_weigh_box01^1", 4.0, -8.0, 1)

			Wait(150)
			NetworkStartSynchronisedScene(netScene)
			NetworkStartSynchronisedScene(netScene2)

			Wait(GetAnimDuration(animDict, "break_weigh_char02") * 770)
			TriggerEvent('Notify', 'sucesso', 'Você quebrou a mentafetamina.')

			DeleteObject(forma)
			DeleteObject(forma_2)
			DeleteObject(forma_quebrada)
			DeleteObject(forma_quebrada_2)
			DeleteObject(martelo)
			DeleteObject(caixa)
			InProcess = false
			TriggerEvent("cancelando",false)
			break
		end
	end)
end
