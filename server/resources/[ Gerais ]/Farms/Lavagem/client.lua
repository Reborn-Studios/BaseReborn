Lavagem = Tunnel.getInterface("Lavagem")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIAVEIS
-----------------------------------------------------------------------------------------------------------------------------------------
local papel = false
local notasfalsa = nil
local actualIndex = 1
local pegarnota = false
local embalando = false
local colocarnota = false
local colocarpapel = false
-------------------------------------------------------------------------------------------------
-- AÇÃO 
-------------------------------------------------------------------------------------------------
-- PEGAR PAPEL
CreateThread(function()
	while true do
		local sleep = 800
		local playerCds = GetEntityCoords(PlayerPedId())
		for index,v in pairs(Farms.lavagem) do
			local x,y,z = table.unpack(v['locais'][1])
			if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z, x,y,z, true) <= 2 and not papel then
				sleep = 4
				DrawText3D(x,y,z, "[~r~E~w~] Para coletar o ~r~PAPEL~w~.")
				if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z,x,y,z, true) <= 2 and not papel then
					if IsControlJustPressed(0,38) and Lavagem.checkItens(index) then
						papel = true
						actualIndex = index
						vRP._playAnim(true,{"anim@heists@box_carry@","idle"},true)
						vRP.createObjects("anim@heists@box_carry@","idle","bkr_prop_prtmachine_paperream",50,28422,0.0,-0.35,-0.05,0.0,180.0,0.0)
					end
				end
			end
		end
		Wait(sleep)
	end
end)

-- COLOCAR PAPEL
CreateThread(function()
	while true do
		local sleep = 800
		if actualIndex then
			local playerCds = GetEntityCoords(PlayerPedId())
			local x,y,z = table.unpack(Farms.lavagem[actualIndex]['locais'][2])
			if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z,x,y,z,true) <= 2 and papel and not colocarpapel then
				sleep = 4
				DrawText3D(x,y,z, "[~r~E~w~] Para colocar o ~r~PAPEL~w~.")
				if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z,x,y,z,true) <= 2 and papel and not colocarpapel then
					if IsControlJustPressed(0,38) then
						colocarpapel = true
						vRP.removeObjects("one")
						vRP._stopAnim(source,false)
						notasfalsa = CreateObject(GetHashKey("bkr_prop_prtmachine_moneyream"),25.95,-1402.15,30.06-1.1,true,true,true)
					end
				end
			end
		end
		Wait(sleep)
	end
end)

-- PEGAR NOTAS FALSAS
CreateThread(function()
	while true do
		local sleep = 800
		if actualIndex then
			local playerCds = GetEntityCoords(PlayerPedId())
			local x,y,z = table.unpack(Farms.lavagem[actualIndex]['locais'][3])
			if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z,x,y,z,true) <= 2 and colocarpapel and not pegarnota then
				sleep = 4
				DrawText3D(x,y,z, "[~r~E~w~] Para pegar as ~r~NOTAS FALSAS~w~.")
				if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z,x,y,z,true) <= 2 and colocarpapel and not pegarnota then
					if IsControlJustPressed(0,38) then
						pegarnota = true
						vRP._playAnim(true,{"anim@heists@box_carry@","idle"},true)
						vRP.createObjects("anim@heists@box_carry@","idle","bkr_prop_prtmachine_moneyream",50,28422,0.0,-0.35,-0.05,0.0,180.0,0.0)
						if notasfalsa then
							DeleteObject(notasfalsa)
						end
					end
				end
			end
		end
		Wait(sleep)
	end
end)

-- Cortar NOTAS FALSAS
CreateThread(function()
	while true do
		local sleep = 800
		if actualIndex then
			local playerCds = GetEntityCoords(PlayerPedId())
			local x,y,z = table.unpack(Farms.lavagem[actualIndex]['locais'][4])
			if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z,x,y,z, true) <= 5.0 and pegarnota and not colocarnota then
				sleep = 4
				DrawText3D(x,y,z, "[~r~E~w~] Para cortas as ~r~NOTAS FALSAS~w~.")
				if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z,x,y,z, true) <= 2 and pegarnota and not colocarnota then
					if IsControlJustPressed(0,38) then
						local ped = PlayerPedId()
						colocarnota = true
						vRP.removeObjects("one")
						vRP._stopAnim(source,false)
						local animDict = "anim@amb@business@cfm@cfm_cut_sheets@"
						LoadAnim(animDict)
						LoadModel("bkr_prop_cutter_moneypage")
						LoadModel("bkr_prop_cutter_moneystrip")
						LoadModel("bkr_prop_cutter_moneystack_01a")
						LoadModel("bkr_prop_cutter_singlestack_01a")

						local cutter = GetClosestObjectOfType(playerCds.x, playerCds.y, playerCds.z, 3.0, 1731949568, false, false, false)
						local offsets = Farms.lavagem[actualIndex]['offset']
						local targetRotation = offsets[1].rot 	--vector3(0, 0, 130)
						local offsetCds = offsets[1].coords
						local money_page = CreateObject(GetHashKey('bkr_prop_cutter_moneypage'), x, y, z-10, true, false, true)
						local money_stack = CreateObject(GetHashKey('bkr_prop_cutter_moneystack_01a'), x, y, z-10, true, false, true)
						local money_singleStack = CreateObject(GetHashKey('bkr_prop_cutter_singlestack_01a'), x, y, z-10, true, false, true)
						local money_strip = CreateObject(GetHashKey('bkr_prop_cutter_moneystrip'), x, y, z-10, true, false, true)
						local netScene = NetworkCreateSynchronisedScene(x + offsetCds.x, y + offsetCds.y, z + offsetCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
						NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "extended_load_tune_cut_billcutter", 1.5, -4.0, 1, 16, 1148846080, 0)
						NetworkAddEntityToSynchronisedScene(money_page, netScene, animDict, "extended_load_tune_cut_singlemoneypage", 4.0, -8.0, 1)
						NetworkAddEntityToSynchronisedScene(money_stack, netScene, animDict, "extended_load_tune_cut_moneystack", 4.0, -8.0, 1)
						NetworkAddEntityToSynchronisedScene(money_singleStack, netScene, animDict, "extended_load_tune_cut_singlestack", 4.0, -8.0, 1)
						NetworkAddEntityToSynchronisedScene(cutter, netScene, animDict, "extended_load_tune_cut_papercutter", 4.0, -8.0, 1)
						NetworkAddEntityToSynchronisedScene(money_strip, netScene, animDict, "extended_load_tune_cut_singlemoneystrip", 4.0, -8.0, 1)
						NetworkStartSynchronisedScene(netScene)
						Wait(150)
						Wait(GetAnimDuration(animDict, "extended_load_tune_cut_billcutter") * 770)
						DeleteObject(money_page)
						DeleteObject(money_stack)
						DeleteObject(money_singleStack)
						DeleteObject(money_strip)
					end
				end
			end
		end
		Wait(sleep)
	end
end)

-- EMBALAR NOTAS FALSAS
CreateThread(function()
	while true do
		local sleep = 800
		if actualIndex then
			local playerCds = GetEntityCoords(PlayerPedId())
			local x,y,z = table.unpack(Farms.lavagem[actualIndex]['locais'][5])
			if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z, x,y,z, true) <= 2 and colocarnota and not embalando then
				sleep = 4
				DrawText3D(x,y,z, "[~r~E~w~] Para embalas as ~r~NOTAS FALSAS~w~.")
				if GetDistanceBetweenCoords(playerCds.x, playerCds.y, playerCds.z, x,y,z, true) <= 2 and colocarnota and not embalando then
					if IsControlJustPressed(0,38) then
						local ped = PlayerPedId()
						local animDict = "anim@amb@business@cfm@cfm_counting_notes@"
						LoadAnim(animDict)
						LoadModel("bkr_prop_coke_tin_01")
						LoadModel("bkr_prop_tin_cash_01a")
						LoadModel("bkr_prop_money_unsorted_01")
						LoadModel("bkr_prop_money_wrapped_01")
						LoadModel("bkr_prop_moneypack_01a")

						local money_unsorted = CreateObject(GetHashKey('bkr_prop_money_unsorted_01'), x, y, z-10, true, false, true)
						local money_wrapped = CreateObject(GetHashKey('bkr_prop_money_wrapped_01'), x, y, z-10, true, false, true)
						local money_bucket = CreateObject(GetHashKey('bkr_prop_coke_tin_01'), x, y, z-10, true, false, true)
						local money_bucketCash = CreateObject(GetHashKey('bkr_prop_tin_cash_01a'), x, y, z-10, true, false, true)

						local offsets = Farms.lavagem[actualIndex]['offset']
						local targetRotation = offsets[2].rot
						local offsetCds = offsets[2].coords

						local netScene = NetworkCreateSynchronisedScene(x + offsetCds.x, y + offsetCds.y, z + offsetCds.z, targetRotation.x, targetRotation.y, targetRotation.z, 2, false, false, 1148846080, 0, 1.3)
						NetworkAddPedToSynchronisedScene(ped, netScene, animDict, "note_counting_counter", 1.5, -4.0, 1, 16, 1148846080, 0)
						NetworkAddEntityToSynchronisedScene(money_unsorted, netScene, animDict, "note_counting_moneyunsorted", 4.0, -8.0, 1)
						NetworkAddEntityToSynchronisedScene(money_wrapped, netScene, animDict, "note_counting_moneywrap", 4.0, -8.0, 1)
						NetworkAddEntityToSynchronisedScene(money_bucket, netScene, animDict, "note_counting_moneybin", 4.0, -8.0, 1)
						NetworkAddEntityToSynchronisedScene(money_bucketCash, netScene, animDict, "note_counting_moneybin", 4.0, -8.0, 1)
						NetworkStartSynchronisedScene(netScene)

						Wait(150)
						Wait(GetAnimDuration(animDict, "note_counting_counter") * 770)
						DeleteObject(money_unsorted)
						DeleteObject(money_wrapped)
						DeleteObject(money_bucket)
						DeleteObject(money_bucketCash)
						embalando = false
						colocarnota = false
						pegarnota = false
						colocarpapel = false
						papel = false
						Lavagem.checkPayment(actualIndex)
					end
				end
			end
		end
		Wait(sleep)
	end
end)
-------------------------------------------------------------------------------------------------
-- ANTI-BUG 
-------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
    	local sleep = 500
		if papel then
			sleep = 2
			DisableControlAction(0,167,true)
			DisableControlAction(0,21,true)
			DisableControlAction(0,22,true)
		end
		Wait(sleep)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FUNÇÕES --
-----------------------------------------------------------------------------------------------------------------------------------------
function DrawText3D(x, y, z, text)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    local px,py,pz=table.unpack(GetGameplayCamCoords())
    SetTextScale(0.28, 0.28)
    SetTextFont(4)
    SetTextProportional(true)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    DrawText(_x,_y)
    local factor = (string.len(text)) / 370
    DrawRect(_x,_y+0.0125, 0.005+ factor, 0.03, 41, 11, 41, 68)
end
