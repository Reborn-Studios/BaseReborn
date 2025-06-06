-----------------------------------
--########## Funções vRP ##########
-----------------------------------
local vSERVER = Tunnel.getInterface("will_ficha_v3")

RegisterNetEvent("police:Open")
AddEventHandler("police:Open",function()
	TriggerEvent("dynamic:closeSystem")
	ExecuteCommand(Config.openPainel)
end)

function removeObjects()
	vRP.removeObjects()
end

function createTablet()
    vRP.createObjects("amb@code_human_in_bus_passenger_idles@female@tablet@base","base","prop_cs_tablet",50,28422)
end

function createBox()
    vRP.createObjects("anim@heists@box_carry@","idle","hei_prop_heist_box",50,28422)
end

function playServiceAnim()
    vRP._playAnim(false,{"anim@amb@business@coc@coc_packing_hi@", "full_cycle_v1_pressoperator"},	true)
end

function takingPhoto()
	local wait = false
	local response = ""
	if Config.post_photo ~= "" then
		wait = true
		exports['screenshot-basic']:requestScreenshotUpload(Config.post_photo, 'files[]', function(data)
			CellCamActivate(false, false)
			DestroyMobilePhone()
			local resp = json.decode(data) or {}
			if resp.attachments then
				response = vSERVER.uploadToCatbox(resp.attachments[1].proxy_url)
				wait = false
			else
				print("Sem webhook configurada!")
				wait = false
			end
		end)
	end
	while wait do
		Wait(10)
	end
	return response
end

-------##########-------##########-------##########-------##########
-------##########				 VARIABLES
-------##########-------##########-------##########-------##########

local servicosElec = {                                         -- Serviço de eletrica
    [1] = { 1679.65,2480.19,45.57,136.52 },
    [2] = { 1700.21,2474.81,45.57,228.39 },
    [3] = { 1706.99,2481.11,45.57,226.21 },
    [4] = { 1737.41,2504.68,45.57,166.44 },
    [5] = { 1760.65,2519.08,45.57,256.13 },
    [6] = { 1695.8,2536.22,45.57,90.09 },
    [7] = { 1652.46,2564.41,45.57,0.38 },
    [8] = { 1629.92,2564.38,45.57,1.6 },
    [9] = { 1624.51,2577.44,45.57,272.34 },
    [10] = { 1608.92,2566.89,45.57,43.79 },
    [11] = { 1609.91,2539.73,45.57,135.58 },
    [12] = { 1622.37,2507.73,45.57,97.58 },
    [13] = { 1643.92,2490.75,45.57,187.29 }
}
local numServices = 1
local reducaopenal = false
local prisonTimer = 0
local prison = LocalPlayer.state.Prison

-------##########-------##########-------##########
-------##########	 	PENA
-------##########-------##########-------##########

RegisterNetEvent("prisioneiro")
AddEventHandler("prisioneiro",function(status)
	prison = status
	LocalPlayer.state:set("Prison",status,true)
end)

CreateThread(function()
	while true do
		local ped = PlayerPedId()
		local coords = GetEntityCoords(ped)
		local will = 1000
		if prison then
			local distance1 = #(coords - Config.serviceTime['Caixa'].Pegar)
			local distance2 = #(coords - Config.serviceTime['Caixa'].Entregar)
            local distance3 = #(coords - Config.coords_prison['Preso'])

			if GetEntityHealth(ped) <= 100 then
				removeObjects()
				reducaopenal = false
				SetEntityHealth(ped,120)
				SetEntityInvincible(ped,false)
				ClearPedBloodDamage(ped)
			end

			if distance3 > 250 then
				local x,y,z = table.unpack(Config.coords_prison['Preso'])
				SetEntityCoords(ped,x,y,z)
			end

			if distance1 <= 3 and not reducaopenal then
				will = 4
				local x,y,z = table.unpack(Config.serviceTime['Caixa'].Pegar)
				Config.drawMark(x,y,z)
				if distance1 <= 1.2 then
					Config.drawText(x,y,z,"[~r~E~w~]  PARA PEGAR A CAIXA")
					if IsControlJustPressed(0,38) then
						reducaopenal = true
						ResetPedMovementClipset(ped,0)
						SetRunSprintMultiplierForPlayer(PlayerId(),1.0)
						createBox()
					end
				end
			end

			if distance2 <= 4 and reducaopenal then
				will = 4
				local x,y,z = table.unpack(Config.serviceTime['Caixa'].Entregar)
				Config.drawMark(x,y,z)
				if distance2 <= 1.2 then
					Config.drawText(x,y,z,"[~r~E~w~]  PARA ENTREGAR A CAIXA")
					if IsControlJustPressed(0,38) then
						reducaopenal = false
						TriggerServerEvent("will_ficha_v3:diminuirpena1903")
						removeObjects()
					end
				end
			end
			
			local x,y,z = servicosElec[numServices][1],servicosElec[numServices][2],servicosElec[numServices][3]
			local distance4 = #(coords - vector3(x,y,z))
            if distance4 <= 70 and not reducaopenal and prisonTimer <= 0 then
                will = 4
				Config.drawText(x,y,z,"[~r~E~w~]  PARA INICIAR SERVIÇO")
                if distance4 <= 2.5 then
					Config.drawMark(x,y,z)
                    if IsControlJustPressed(1, 38) then
                        prisonTimer = 3
						reducaopenal = true
                        SetEntityHeading(ped, servicosElec[numServices][4])
						TriggerEvent("cancelando",true)
                        SetEntityCoords(ped,servicosElec[numServices][1],servicosElec[numServices][2],servicosElec[numServices][3] - 1)
						numServices = numServices + 1
                        playServiceAnim()
                        SetTimeout(15000,function()
                            removeObjects()
							TriggerServerEvent("will_ficha_v3:diminuirpena1903")
                            reducaopenal = false
							prisonTimer = 0
							TriggerEvent("cancelando",false)
                        end)
                    end
                end
            end
		end
		Wait(will)
	end
end)

CreateThread(function()
	while true do
		local timeDistance = 1000
		if reducaopenal then
			timeDistance = 4
			BlockWeaponWheelThisFrame()
			DisableControlAction(0,21,true)
			DisableControlAction(0,22,true)
			DisableControlAction(0,24,true)
			DisableControlAction(0,25,true)
			DisableControlAction(0,29,true)
			DisableControlAction(0,32,true)
			DisableControlAction(0,33,true)
			DisableControlAction(0,34,true)
			DisableControlAction(0,35,true)
			DisableControlAction(0,56,true)
			DisableControlAction(0,58,true)
			DisableControlAction(0,73,true)
			DisableControlAction(0,75,true)
			DisableControlAction(0,140,true)
			DisableControlAction(0,141,true)
			DisableControlAction(0,142,true)
			DisableControlAction(0,143,true)
			DisableControlAction(0,166,true)
			DisableControlAction(0,167,true)
			DisableControlAction(1,167,true)
			DisableControlAction(2,167,true)
			DisableControlAction(0,170,true)
			DisableControlAction(0,177,true)
			DisableControlAction(0,182,true)
			DisableControlAction(0,187,true)
			DisableControlAction(0,188,true)
			DisableControlAction(0,189,true)
			DisableControlAction(0,190,true)
			DisableControlAction(0,243,true)
			DisableControlAction(0,245,true)
			DisableControlAction(0,246,true)
			DisableControlAction(0,257,true)
			DisableControlAction(0,263,true)
			DisableControlAction(0,264,true)
			DisableControlAction(0,268,true)
			DisableControlAction(0,269,true)
			DisableControlAction(0,270,true)
			DisableControlAction(0,271,true)
			DisableControlAction(0,288,true)
			DisableControlAction(0,289,true)
			DisableControlAction(0,303,true)
			DisableControlAction(0,311,true)
			DisableControlAction(0,344,true)
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FUUGA DA PRISÃO
-----------------------------------------------------------------------------------------------------------------------------------------
local inLocates = {
	{ 1772.89,2536.78,45.56,246.62 },
	{ 1760.7,2519.03,45.56,260.79 },
	{ 1758.27,2508.99,45.56,260.79 },
	{ 1757.89,2507.81,45.56,255.12 },
	{ 1737.37,2504.68,45.56,170.08 },
	{ 1719.86,2502.73,45.56,260.79 },
	{ 1706.99,2481.05,45.56,226.78 },
	{ 1700.22,2474.79,45.56,229.61 },
	{ 1679.53,2480.26,45.56,136.07 },
	{ 1643.86,2490.76,45.56,187.09 },
	{ 1635.7,2490.19,45.56,189.93 },
	{ 1634.68,2490.11,45.56,181.42 },
	{ 1622.39,2507.78,45.56,96.38 },
	{ 1618.41,2521.4,45.56,141.74 },
	{ 1609.77,2539.59,45.56,133.23 },
	{ 1607.37,2541.43,45.56,102.05 },
	{ 1606.28,2542.57,45.56,136.07 },
	{ 1608.95,2567.03,45.56,48.19 },
	{ 1624.83,2567.9,45.56,274.97 },
	{ 1624.78,2567.15,45.56,263.63 },
	{ 1629.9,2564.37,45.56,5.67 },
	{ 1642.2,2565.22,45.56,2.84 },
	{ 1643.98,2565.08,45.56,31.19 },
	{ 1652.52,2564.39,45.56,2.84 },
	{ 1665.09,2567.66,45.56,5.67 },
	{ 1716.03,2568.78,45.56,85.04 },
	{ 1715.95,2567.97,45.56,85.04 },
	{ 1715.97,2567.13,45.56,85.04 },
	{ 1768.78,2565.74,45.56,5.67 },
	{ 1695.25,2506.62,45.56,53.86 },
	{ 1630.53,2526.15,45.56,325.99 },
	{ 1627.89,2543.56,45.56,226.78 },
	{ 1636.13,2553.62,45.56,0.0 },
	{ 1657.59,2549.32,45.56,138.9 },
	{ 1649.73,2538.35,45.56,62.37 },
	{ 1699.07,2535.87,45.56,153.08 },
	{ 1699.63,2534.6,45.56,87.88 },
	{ 1699.35,2532.08,45.56,93.55 }
}

local runAway = {
	{ 1647.26,2763.14,45.76 },
	{ 1565.97,2682.8,45.53 },
	{ 1529.94,2585.13,45.53 },
	{ 1535.6,2467.81,45.58 },
	{ 1658.73,2390.01,45.51 },
	{ 1763.9,2405.9,45.6 },
	{ 1829.03,2473.42,45.31 },
	{ 1851.78,2703.64,45.76 },
	{ 1774.36,2767.32,45.66 }
}

local inSelect = 1
local inTimer = GetGameTimer()
local coordsLeaver = { 1816.94, 2602.66, 45.6 }

if Config.fugaPrisao then
	CreateThread(function()
		SetNuiFocus(false,false)

		while true do
			local timeDistance = 999
			if prison then
				local ped = PlayerPedId()
				local coords = GetEntityCoords(ped)
				local distance = #(coords - vector3(inLocates[inSelect][1],inLocates[inSelect][2],inLocates[inSelect][3]))

				if distance <= 150 then
					timeDistance = 1
					Config.drawText(inLocates[inSelect][1],inLocates[inSelect][2],inLocates[inSelect][3],"~g~E~w~   VASCULHAR")

					if distance <= 1 and GetGameTimer() >= inTimer and IsControlJustPressed(1,38) and not IsPedInAnyVehicle(ped) then
						inTimer = GetGameTimer() + 3000
						SetEntityHeading(ped,inLocates[inSelect][4])
						vRP.playAnim(false,{{"amb@prop_human_parking_meter@female@idle_a","idle_a_female"}},true)
						SetEntityCoords(ped,inLocates[inSelect][1],inLocates[inSelect][2],inLocates[inSelect][3] - 1,1,0,0,0)
						TriggerEvent('cancelando',true)
						Wait(10000)
						TriggerEvent('cancelando',false)
						vSERVER.checkLocate()
						vRP._stopAnim(false)
						inSelect = math.random(#inLocates)
					end
				end
			end
			Wait(timeDistance)
		end
	end)

	CreateThread(function()
		while true do
			local timeDistance = 999
			if prison then
				local ped = PlayerPedId()
				local coords = GetEntityCoords(ped)
				local distance = #(coords - vector3(coordsLeaver[1],coordsLeaver[2],coordsLeaver[3]))

				if distance <= 5.0 then
					timeDistance = 1
					Config.drawText(coordsLeaver[1],coordsLeaver[2],coordsLeaver[3],"~g~E~w~   FUGIR")

					if distance <= 2.0 and GetGameTimer() >= inTimer and IsControlJustPressed(1,38) then
						inTimer = GetGameTimer() + 3000

						if vSERVER.checkKey() then
							local rand = math.random(#runAway)
							SetEntityCoords(ped,runAway[rand][1],runAway[rand][2],runAway[rand][3],1,0,0,0)
						end
					end
				end
			end
			Wait(timeDistance)
		end
	end)
end
