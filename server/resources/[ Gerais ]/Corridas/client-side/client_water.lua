-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
wrVRP = {}
Tunnel.bindInterface("Water",wrVRP)
vwSERVER = Tunnel.getInterface("Water")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local inRace = false
local startX = Config.waterRace['startRace'][1]
local startY = Config.waterRace['startRace'][2]
local startZ = Config.waterRace['startRace'][3]
local racePos = 0
local raceTime = 0
local raceSelect = 0
local blipRace = nil

--  -1801.28, -1106.28, -0.7
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local race = Config.waterRace['races']
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSTARTRACE
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()

		if IsPedInAnyBoat(ped) then
			local coords = GetEntityCoords(ped)

			if not inRace then
				local distance = #(coords - vector3(startX,startY,startZ))
				if distance <= 500 then
					timeDistance = 4
					DrawMarker(1,startX,startY,startZ-5,0,0,0,0,0,0,50.0,50.0,100.0,255,0,0,100,0,0,0,0)
					if distance <= 25 then
						if IsControlJustPressed(1,38) then
							racePos = 1
							inRace = true
							raceSelect = vwSERVER.raceSelect()
							raceTime = parseInt(race[raceSelect].time)
							makeWaterBlipMarked()
						end
					end
				end
			else
				local distance = #(coords - vector3(race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]))
				if distance <= 999 then
					timeDistance = 4
					DrawMarker(1,race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]-5,0,0,0,0,0,0,50.0,50.0,100.0,100,100,255,100,0,0,0,0)
					if distance <= 25 then
						if DoesBlipExist(blipRace) then
							RemoveBlip(blipRace)
							blipRace = nil
						end

						if racePos >= #race[raceSelect] then
							inRace = false
							vwSERVER.paymentMethod()
							PlaySoundFrontend(-1,"RACE_PLACED","HUD_AWARDS",false)
						else
							racePos = racePos + 1
							makeWaterBlipMarked()
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
		if inRace and raceTime > 0 then
			raceTime = raceTime - 1

			if raceTime <= 0 or not IsPedInAnyBoat(PlayerPedId()) then
				raceTime = 0
				inRace = false

				if DoesBlipExist(blipRace) then
					RemoveBlip(blipRace)
				end
			end
		end

		Citizen.Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MAKEBLIPRACE
-----------------------------------------------------------------------------------------------------------------------------------------
function makeWaterBlipMarked()
	blipRace = AddBlipForCoord(race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3])
	SetBlipSprite(blipRace,1)
	SetBlipColour(blipRace,1)
	SetBlipScale(blipRace,0.4)
	SetBlipAsShortRange(blipRace,false)
	SetBlipRoute(blipRace,true)
	BeginTextCommandSetBlipName("STRING")
	AddTextComponentString("Checkpoint")
	EndTextCommandSetBlipName(blipRace)
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