local locais = Farms.meta.locais

CreateThread(function()
	while true do
		local will = 1200
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
						if Drugs.checkPayment(v.id,"meta") then
							InProcess = true
							TriggerEvent("cancelando",true)
							ColocarLiquidos()
						end
					elseif v.id == 2 then
						if Drugs.checkPayment(v.id,"meta") then
							InProcess = true
							TriggerEvent("cancelando",true)
							QuebrarMeta()
						end
					elseif v.id == 3 then
						if Drugs.checkPayment(v.id,"meta") then
							InProcess = true
							TriggerEvent("cancelando",true)
							EmbalarMeta()
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
function ColocarLiquidos()
	CreateThread(function()
		while true do
			Wait(10)
			local ped = PlayerPedId() 
            local targetRotation = vec3(180.0, 180.0, 180.0)
            local x,y,z = table.unpack(vec3(1493.17,6390.24,21.26))
			local animDict = "anim@amb@business@meth@meth_monitoring_cooking@cooking@"
			LoadAnim(animDict)
            LoadModel("bkr_prop_meth_ammonia")
            LoadModel("bkr_prop_meth_sacid")
            LoadModel("bkr_prop_fakeid_clipboard_01a")
            LoadModel("bkr_prop_fakeid_penclipboard")

            local ammonia = CreateObject(GetHashKey('bkr_prop_meth_ammonia'), x, y, z, true, false, true)
            local acido = CreateObject(GetHashKey('bkr_prop_meth_sacid'), x, y, z, true, false, true)
            local caderneta = CreateObject(GetHashKey('bkr_prop_fakeid_clipboard_01a'), x, y, z, true, false, true)
            local caneta = CreateObject(GetHashKey('bkr_prop_fakeid_penclipboard'), x, y, z, true, false, true)

            local netScene = NetworkCreateSynchronisedScene(x + 5.0 ,y + 2.0, z - 0.4, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
            NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "chemical_pour_long_cooker", 1.5, -4.0, 1, 16, 1148846080, 0)
            NetworkAddEntityToSynchronisedScene(ammonia, netScene, animDict, "chemical_pour_long_ammonia", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(acido, netScene, animDict, "chemical_pour_long_sacid", 4.0, -8.0, 1)
            NetworkAddEntityToSynchronisedScene(caderneta, netScene, animDict, "chemical_pour_long_clipboard", 4.0, -8.0, 1)

            local netScene2 = NetworkCreateSynchronisedScene(x + 5.0 ,y + 2.0, z - 0.4, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
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

function EmbalarMeta()
	CreateThread(function()
		while true do
			Wait(5)
			local ped = PlayerPedId()
			local targetRotation = vec3(180.0, 180.0, 168.0)
			local x,y,z = table.unpack(vec3(1500.67, 6394.03, 20.79))
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

			local pazinha = CreateObject(GetHashKey('bkr_prop_meth_scoop_01a'), x, y, z, true, false, true)
			local caixa_grande = CreateObject(GetHashKey('bkr_prop_meth_bigbag_03a'), x, y, z, true, false, true)
			local caixa_grande_2 = CreateObject(GetHashKey('bkr_prop_meth_bigbag_04a'), x, y, z, true, false, true)
			local bolsa = CreateObject(GetHashKey('bkr_prop_meth_openbag_02'), x, y, z, true, false, true)
			local bolsa_fechada = CreateObject(GetHashKey('bkr_prop_meth_smallbag_01a'), x, y, z, true, false, true)
			local bolsa_aberta = CreateObject(GetHashKey('bkr_prop_meth_openbag_01a'), x, y, z, true, false, true)
			local balanca = CreateObject(GetHashKey('bkr_prop_coke_scale_01'), x, y, z, true, false, true)
			local caderneta = CreateObject(GetHashKey('bkr_prop_fakeid_clipboard_01a'), x, y, z, true, false, true)
			local caneta = CreateObject(GetHashKey('bkr_prop_fakeid_penclipboard'), x, y, z, true, false, true)

			local netScene = NetworkCreateSynchronisedScene(x - 5.3,y - 0.4, z - 1.0, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "break_weigh_char01", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(pazinha, netScene, animDict, "break_weigh_scoop", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa_grande_2, netScene, animDict, "break_weigh_box01", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(bolsa, netScene, animDict, "break_weigh_methbag01^3", 4.0, -8.0, 1)

			local netScene2 = NetworkCreateSynchronisedScene(x - 5.3 ,y - 0.4, z - 1.0, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene2, animDict, "break_weigh_char01", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(balanca, netScene2, animDict, "break_weigh_scale", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(caixa_grande, netScene2, animDict, "break_weigh_box01^1", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(bolsa_fechada, netScene2, animDict, "break_weigh_methbag01^2", 4.0, -8.0, 1)

			local netScene3 = NetworkCreateSynchronisedScene(x - 5.3 ,y - 0.4, z - 1.0, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
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

function QuebrarMeta()
	CreateThread(function()
		while true do
			Wait(5)
			local ped = PlayerPedId()
			local targetRotation = vec3(180.0, 180.0, 168.0)
			local x,y,z = table.unpack(vec3(1504.89, 6393.25, 20.79))
			local animDict = "anim@amb@business@meth@meth_smash_weight_check@"
			LoadAnim(animDict)
			LoadModel("bkr_prop_meth_tray_02a")
			LoadModel("w_me_hammer")
			LoadModel("bkr_prop_meth_tray_01a")
			LoadModel("bkr_prop_meth_smashedtray_01")
			LoadModel("bkr_prop_meth_smashedtray_01_frag_")
			LoadModel("bkr_prop_meth_bigbag_02a")

			local forma = CreateObject(GetHashKey('bkr_prop_meth_tray_02a'), x, y, z, true, false, true)
			local forma_2 = CreateObject(GetHashKey('bkr_prop_meth_tray_01a'), x, y, z, true, false, true)
			local forma_quebrada = CreateObject(GetHashKey('bkr_prop_meth_smashedtray_01'), x, y, z, true, false, true)
			local forma_quebrada_2 = CreateObject(GetHashKey('bkr_prop_meth_smashedtray_01_frag_'), x, y, z, true, false, true)
			local martelo = CreateObject(GetHashKey('w_me_hammer'), x, y, z, true, false, true)
			local caixa = CreateObject(GetHashKey('bkr_prop_meth_bigbag_02a'), x, y, z, true, false, true)

			local netScene = NetworkCreateSynchronisedScene(x - 3.6,y - 1.0, z - 1.0, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
			NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "break_weigh_char02", 1.5, -4.0, 1, 16, 1148846080, 0)
			NetworkAddEntityToSynchronisedScene(forma_quebrada, netScene, animDict, "break_weigh_tray01", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(forma_2, netScene, animDict, "break_weigh_tray01^1", 4.0, -8.0, 1)
			NetworkAddEntityToSynchronisedScene(martelo, netScene, animDict, "break_weigh_hammer", 4.0, -8.0, 1)

			local netScene2 = NetworkCreateSynchronisedScene(x - 3.6,y - 1.0, z - 1.0, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
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
