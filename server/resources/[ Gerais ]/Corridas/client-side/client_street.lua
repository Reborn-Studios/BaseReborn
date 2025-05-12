-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
ExplodeRace = {}
Tunnel.bindInterface("Street",ExplodeRace)
ServerExplode = Tunnel.getInterface("Street")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local racePos = 0
local raceTime = 0
local blipRace = {}
local inRace = false
local raceSelect = 0
local timeSeconds = 0
local race = Config.streetRace['races']
local raceTimers = Config.streetRace['timers']
local startX = Config.streetRace['startRace'][1]
local startY = Config.streetRace['startRace'][2]
local startZ = Config.streetRace['startRace'][3]
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSTARTRACE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		if IsPedInAnyVehicle(ped, false) then
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
							if ServerExplode.checkTicket() then
								racePos = 1
								inRace = true
								raceSelect = ServerExplode.startRace()
								raceTime = parseInt(raceTimers[raceSelect])
								initRaceThread()
								if race[raceSelect] then
									for k,v in pairs(race[raceSelect]) do
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
									SetNewWaypoint(race[raceSelect][racePos][1]+0.0001,race[raceSelect][racePos][2]+0.0001)
								end
							end
						end
					end
				end
			else
				local distance = #(coords - vector3(race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]))
				if distance <= 200 then
					timeDistance = 4
					DrawMarker(1,race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]-3,0,0,0,0,0,0,12.0,12.0,8.0,255,255,255,25)
					DrawMarker(21,race[raceSelect][racePos][1],race[raceSelect][racePos][2],race[raceSelect][racePos][3]+1,0,0,0,0,180.0,130.0,3.0,3.0,2.0,255,0,0,50,true,false,0,true)
					if distance <= 10 then
						if DoesBlipExist(blipRace[racePos]) then
							RemoveBlip(blipRace[racePos])
							blipRace[racePos] = nil
						end
						if racePos >= #race[raceSelect] then
							ServerExplode.paymentMethod(raceSelect)
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
function initRaceThread()
	CreateThread(function()
		while inRace do
			if raceTime > 0 then
				raceTime = raceTime - 1
				if raceTime <= 0 or not IsPedInAnyVehicle(PlayerPedId(), false) then
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
					Wait(3000)
					local coords = GetEntityCoords(GetPlayersLastVehicle())
					AddExplosion(coords.x,coords.y,coords.z,2,1.0,true,true,1.0)
				end
			end
			Wait(1000)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- TIMESECONDS
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		if timeSeconds > 0 then
			timeSeconds = timeSeconds - 1
		end
		Wait(1000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DEFUSE
-----------------------------------------------------------------------------------------------------------------------------------------
function ExplodeRace.defuseRace()
	inRace = false
	timeSeconds = 0
	for k,v in pairs(blipRace) do
		if DoesBlipExist(blipRace[k]) then
			RemoveBlip(blipRace[k])
			blipRace[k] = nil
		end
	end
end
