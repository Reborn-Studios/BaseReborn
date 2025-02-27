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
		Citizen.Wait(10)
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
local prison = false

-------##########-------##########-------##########
-------##########	 	PENA
-------##########-------##########-------##########

RegisterNetEvent("prisioneiro")
AddEventHandler("prisioneiro",function(status)
	prison = status
	LocalPlayer.state:set("Prison",status,true)
end)

Citizen.CreateThread(function()
	while true do
		local ped = PlayerPedId()
		local coords = GetEntityCoords(ped)
		local will = 1000
		if prison then
			local distance1 = #(coords - Config.serviceTime['Caixa'].Pegar)
			local distance2 = #(coords - Config.serviceTime['Caixa'].Entregar)
            local distance3 = #(coords - vector3(servicosElec[numServices][1],servicosElec[numServices][2],servicosElec[numServices][3]))

			if GetEntityHealth(ped) <= 100 then
				removeObjects()
				reducaopenal = false
				SetEntityHealth(ped,120)
				SetEntityInvincible(ped,false)
				ClearPedBloodDamage(ped)
			end

			if distance3 > 150 then
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
						TriggerServerEvent("will_ficha_v3:diminuirpena1902")
						removeObjects()
					end
				end
			end
			
            if distance3 <= 70 and not reducaopenal and prisonTimer <= 0 then
                will = 4
				local x,y,z = servicosElec[numServices][1],servicosElec[numServices][2],servicosElec[numServices][3]
				Config.drawText(x,y,z,"[~r~E~w~]  PARA INICIAR SERVIÇO")
                if distance3 <= 1.5 then
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
							TriggerServerEvent("will_ficha_v3:diminuirpena1902")
                            reducaopenal = false
							prisonTimer = 0
							TriggerEvent("cancelando",false)
                        end)
                    end
                end
            end
		end
		Citizen.Wait(will)
	end
end)

Citizen.CreateThread(function()
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
		Citizen.Wait(timeDistance)
	end
end)