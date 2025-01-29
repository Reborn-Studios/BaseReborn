-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
cnVRP = {}
Tunnel.bindInterface("Street",cnVRP)
vsSERVER = Tunnel.getInterface("Street")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local inRace = false
local startX = Config.streetRace['startRace'][1]
local startY = Config.streetRace['startRace'][2]
local startZ = Config.streetRace['startRace'][3]
local racePos = 0
local raceTime = 0
local raceSelect = 0
local blipRace = {}
local timeSeconds = 0
----  
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local race = Config.streetRace['races']
-----------------------------------------------------------------------------------------------------------------------------------------
-- RACETIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
local raceTimers = Config.streetRace['timers']
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSTARTRACE
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()

		if IsPedInAnyVehicle(ped) then
			local coords = GetEntityCoords(ped)

			if not inRace then
				local distance = #(coords - vector3(startX,startY,startZ))
				if distance <= 100 then
					timeDistance = 4
					DrawBase3D(startX,startY,startZ,"races")
					if distance <= 12.5 then
						local vehicle = GetVehiclePedIsUsing(ped)
						if IsControlJustPressed(1,38) and timeSeconds <= 0 and GetPedInVehicleSeat(vehicle,-1) == ped then
							timeSeconds = 2
							if vsSERVER.checkTicket() then
								racePos = 1
								inRace = true
								raceSelect = vsSERVER.startRace()
								raceTime = parseInt(raceTimers[raceSelect])
								makeStreetBlipMarked(raceSelect)
								SetNewWaypoint(race[raceSelect][racePos][1]+0.0001,race[raceSelect][racePos][2]+0.0001)
							end
						end
					end
				end
			else
				local distance = #(coords - vector3(race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]))
				if distance <= 200 then
					timeDistance = 4
					DrawMarker(1,race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]-3,0,0,0,0,0,0,12.0,12.0,8.0,255,255,255,25,0,0,0,0)
					DrawMarker(21,race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]+1,0,0,0,0,180.0,130.0,3.0,3.0,2.0,255,0,0,50,1,0,0,1)
					if distance <= 10 then
						if DoesBlipExist(blipRace[racePos]) then
							RemoveBlip(blipRace[racePos])
							blipRace[racePos] = nil
						end

						if racePos >= #race[raceSelect] then
							vsSERVER.paymentMethod(GetVehicleNumberPlateText(GetVehiclePedIsUsing(ped)))
							PlaySoundFrontend(-1,"RACE_PLACED","HUD_AWARDS",false)
							inRace = false
							raceTime = 0
						else
							racePos = racePos + 1
							SetNewWaypoint(race[raceSelect][racePos][1]+0.0001,race[raceSelect][racePos][2]+0.0001)
						end
					end
				end

				if raceTime > 0 then
					timeDistance = 4
					dwText("~b~"..raceTime.." SEGUNDOS ~w~RESTANTES PARA O FINAL DA CORRIDA",4,0.5,0.905,0.45,255,255,255,100)
					dwText("CORRA CONTRA O TEMPO, SUPERE SEUS LIMITES E QUEBRE SEUS RECORDES",4,0.5,0.93,0.38,255,255,255,50)
				end
			end
		end

		Citizen.Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADRACETIME
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		if inRace then
			if raceTime > 0 then
				raceTime = raceTime - 1

				if (raceTime <= 0 or not IsPedInAnyVehicle(PlayerPedId())) then
					TriggerServerEvent("vrp_streetrace:explosivePlayers")

					for k,v in pairs(blipRace) do
						if DoesBlipExist(blipRace[k]) then
							RemoveBlip(blipRace[k])
							blipRace[k] = nil
						end
					end

					raceTime = 0
					blipRace = {}
					inRace = false

					Citizen.Wait(3000)

					AddExplosion(GetEntityCoords(GetPlayersLastVehicle()),2,1.0,true,true,true)
				end
			end
		end

		Citizen.Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- TIMESECONDS
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		if timeSeconds > 0 then
			timeSeconds = timeSeconds - 1
		end
		Citizen.Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MAKEBLIPRACE
-----------------------------------------------------------------------------------------------------------------------------------------
function makeStreetBlipMarked(number)
	for k,v in pairs(race[number]) do
		blipRace[k] = AddBlipForCoord(v[1],v[2],v[3])
		SetBlipSprite(blipRace[k],1)
		SetBlipColour(blipRace[k],0)
		SetBlipAsShortRange(blipRace[k],true)
		SetBlipScale(blipRace[k],0.8)
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentString("Checkpoint")
		EndTextCommandSetBlipName(blipRace[k])
		ShowNumberOnBlip(blipRace[k],parseInt(k))
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DWTEXT
-----------------------------------------------------------------------------------------------------------------------------------------
function dwText(text,font,x,y,scale,r,g,b,a)
	SetTextFont(font)
	SetTextScale(scale,scale)
	SetTextColour(r,g,b,a)
	SetTextOutline()
	SetTextCentre(1)
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEFUSE
-----------------------------------------------------------------------------------------------------------------------------------------
function cnVRP.defuseRace()
	inRace = false
	timeSeconds = 0

	for k,v in pairs(blipRace) do
		if DoesBlipExist(blipRace[k]) then
			RemoveBlip(blipRace[k])
			blipRace[k] = nil
		end
	end
end