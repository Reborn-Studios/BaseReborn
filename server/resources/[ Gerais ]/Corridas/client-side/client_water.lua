-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
ServerWater = Tunnel.getInterface("Water")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local racePos = 0
local raceTime = 0
local raceSelect = 0
local blipRace = nil
local inRace = false
local race = Config.waterRace['races']
local startX = Config.waterRace['startRace'][1]
local startY = Config.waterRace['startRace'][2]
local startZ = Config.waterRace['startRace'][3]
-----------------------------------------------------------------------------------------------------------------------------------------
-- MAKEBLIPRACE
-----------------------------------------------------------------------------------------------------------------------------------------
local function makeBlipMarked()
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
-- THREADSTARTRACE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		if IsPedInAnyBoat(ped) then
			local coords = GetEntityCoords(ped)
			if not inRace then
				local distance = #(coords - vector3(startX,startY,startZ))
				if distance <= 500 then
					timeDistance = 4
					DrawMarker(1,startX,startY,startZ-5,0,0,0,0,0,0,50.0,50.0,100.0,255,0,0,100)
					if distance <= 25 then
						if IsControlJustPressed(1,38) and ServerExplode.checkTicket() then
							racePos = 1
							inRace = true
							raceSelect = ServerWater.raceSelect()
							raceTime = parseInt(race[raceSelect].time)
							makeBlipMarked()
						end
					end
				end
			else
				local distance = #(coords - vector3(race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]))
				if distance <= 999 then
					timeDistance = 4
					DrawMarker(1,race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]-5,0,0,0,0,0,0,50.0,50.0,100.0,100,100,255,100)
					if distance <= 25 then
						if blipRace and DoesBlipExist(blipRace) then
							RemoveBlip(blipRace)
							blipRace = nil
						end
						if racePos >= #race[raceSelect] then
							inRace = false
							ServerWater.paymentMethod()
							PlaySoundFrontend(-1,"RACE_PLACED","HUD_AWARDS",false)
						else
							racePos = racePos + 1
							makeBlipMarked()
						end
					end
				end
				if raceTime > 0 then
					timeDistance = 4
					DrwText("~b~"..raceTime.." SEGUNDOS ~w~RESTANTES PARA O FINAL DA CORRIDA",0.905)
					DrwText("CORRA CONTRA O TEMPO, SUPERE SEUS LIMITES E QUEBRE SEUS RECORDES",0.93)
				end
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADRACETIME
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if inRace and raceTime > 0 then
			raceTime = raceTime - 1
			if raceTime <= 0 or not IsPedInAnyBoat(PlayerPedId()) then
				raceTime = 0
				inRace = false
				if blipRace and DoesBlipExist(blipRace) then
					RemoveBlip(blipRace)
				end
			end
		end
		Wait(1000)
	end
end)
