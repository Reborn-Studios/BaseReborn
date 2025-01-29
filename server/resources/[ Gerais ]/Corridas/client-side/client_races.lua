-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local Tunnel = module("vrp","lib/Tunnel")
local Proxy = module("vrp","lib/Proxy")
vRP = Proxy.getInterface("vRP")
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
cRP = {}
Tunnel.bindInterface("Races",cRP)
vrSERVER = Tunnel.getInterface("Races")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local inRunners = false
local inSelected = 0
local inCheckpoint = 0
local inLaps = 1
local inTimers = 0
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local runners = Config.races['runners']
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADRUNNERS
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()

		if IsPedInAnyVehicle(ped) then
			local coords = GetEntityCoords(ped)

			if inRunners then
				timeDistance = 4

				dwText("~b~VOLTAS:~w~ "..inLaps.." / "..runners[inSelected]["laps"].."          ~b~CHECKPOINT:~w~ "..inCheckpoint.." / "..#runners[inSelected]["coords"].."          ~b~TEMPO:~w~ "..inTimers,0.94)

				local distance = #(coords - vector3(runners[inSelected]["coords"][inCheckpoint][1],runners[inSelected]["coords"][inCheckpoint][2],runners[inSelected]["coords"][inCheckpoint][3]))
				if distance <= 200 then
					DrawMarker(1,runners[inSelected]["coords"][inCheckpoint][1],runners[inSelected]["coords"][inCheckpoint][2],runners[inSelected]["coords"][inCheckpoint][3]-3,0,0,0,0,0,0,12.0,12.0,8.0,255,255,255,25,0,0,0,0)
					DrawMarker(21,runners[inSelected]["coords"][inCheckpoint][1],runners[inSelected]["coords"][inCheckpoint][2],runners[inSelected]["coords"][inCheckpoint][3]+1,0,0,0,0,180.0,130.0,3.0,3.0,2.0,42,137,255,50,1,0,0,1)

					if distance <= 10 then
						if inCheckpoint >= #runners[inSelected]["coords"] then
							if inLaps >= runners[inSelected]["laps"] then
								PlaySoundFrontend(-1,"RACE_PLACED","HUD_AWARDS",false)
								vrSERVER.finishRaces()
								inRunners = false
							else
								inCheckpoint = 1
								inLaps = inLaps + 1
								SetNewWaypoint(runners[inSelected]["coords"][inCheckpoint][1],runners[inSelected]["coords"][inCheckpoint][2])
							end
						else
							inCheckpoint = inCheckpoint + 1
							SetNewWaypoint(runners[inSelected]["coords"][inCheckpoint][1],runners[inSelected]["coords"][inCheckpoint][2])
						end
					end
				end
			else
				for k,v in pairs(runners) do
					local distance = #(coords - vector3(v["init"][1],v["init"][2],v["init"][3]))
					if distance <= 50 then
						timeDistance = 4
						DrawBase3D(v["init"][1],v["init"][2],v["init"][3],"races")
						if IsControlJustPressed(1,38) and distance <= 5 and vsSERVER.checkTicket() then
							vrSERVER.startRaces()
							vrSERVER.callPolice(v["init"][1],v["init"][2],v["init"][3])
							inSelected = parseInt(k)
							inRunners = true
							inCheckpoint = 1
							inTimers = 0
							inLaps = 1

							SetNewWaypoint(runners[inSelected]["coords"][inCheckpoint][1],runners[inSelected]["coords"][inCheckpoint][2])
						end
					end
				end
			end
		else
			if inRunners then
				inRunners = false
			end
		end

		Citizen.Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADTIMERS
-----------------------------------------------------------------------------------------------------------------------------------------
Citizen.CreateThread(function()
	while true do
		local timeDistance = 500
		if inRunners then
			timeDistance = 4
			inTimers = inTimers + 1
		end

		Citizen.Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- DWTEXT
-----------------------------------------------------------------------------------------------------------------------------------------
function dwText(text,height)
	SetTextFont(4)
	SetTextScale(0.50,0.50)
	SetTextColour(255,255,255,180)
	SetTextOutline()
	SetTextCentre(1)
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(0.5,1,height)
end