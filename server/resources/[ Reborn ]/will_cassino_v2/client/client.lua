-- Locais de cada npc, aconselha-se deixar assim, mas caso queira mudar:
-- { x, y, z, heading, HashDoNpc }
local npcLocal = {
    { 938.46,47.36,72.28, 180.0, 691061163 }, 
    { 936.32,48.28,72.28, 180.0, -886023758 },
    { 933.51,47.9,72.28, 181.21, 469792763 },

    { 931.17,46.59,72.28,223.97, -245247470 },
    { 929.47,44.06,72.28,251.92, 691061163 },

    { 949.62,32.95,71.84,63.22, 1535236204 },

    { 998.77,45.27,69.84,36.84, -886023758 },
    { 958.85,50.18,71.44,121.98, 469792763 },
    -- 
    { 933.6,41.57,81.09,63.18, -254493138 },

}
local wantNpc = Config.npc
local wantAll = Config.details
local x,y,z = Config.carCoords[1], Config.carCoords[2], Config.carCoords[3]
closeToCassino = false

CreateThread(function()
	Wait(1000)
	if wantAll then
		if wantNpc then
			for _,v in pairs(npcLocal) do
				RequestModel(v[5])
				while not HasModelLoaded(v[5]) do
					Wait(1)
				end

				RequestAnimDict("mini@strip_club@idles@bouncer@base")
				while not HasAnimDictLoaded("mini@strip_club@idles@bouncer@base") do
					Wait(1)
				end
				ped = CreatePed(4, v[5],v[1],v[2],v[3]-1, 3374176, false, true)
				SetEntityHeading(ped, v[4])
				FreezeEntityPosition(ped, true)
				SetEntityInvincible(ped, true)
				SetBlockingOfNonTemporaryEvents(ped, true)
				TaskPlayAnim(ped,"mini@strip_club@idles@bouncer@base","base", 8.0, 0.0, -1, 1, 0, 0, 0, 0)
			end
		end
	end
end)

CreateThread(function()
    while true do
        local playerpos = GetEntityCoords(PlayerPedId())
		local casinoCenter = vector3(960.17,46.75,71.44)
        closeToPokers = false
		closeToBlackjack = false
		closetoRulett = false
		closetoSlots = false
		closeToCassino = false
        for k, v in pairs(Config.Pokers) do
            if #(playerpos - v.Position) < 6.0 then
                closeToPokers = true
            end
        end
        for k,v in pairs(Config.blackJackTables) do
            if #(playerpos - v.tablePos) < 4.0 then
                closeToBlackjack = true
				closeToPokers = false
            end
        end
        for k, v in pairs(Config.RulettTables) do
            if #(playerpos - v.position) < 4.0 then
                closetoRulett = true
				closeToBlackjack = false
				closeToPokers = false
            end
        end
		for k, v in pairs(Config.Slots) do
			if #(playerpos - v.pos) < 5.0 then
				closetoSlots = true
			end
		end
		if #(playerpos - casinoCenter) <= 50.0 and (playerpos.z - casinoCenter.z <= 2) then
			closeToCassino = true
		end
        Citizen.Wait(1000)
    end
end)

CreateThread(function()
	Wait(500)
	local showedCasino = false
	while true do
		if closeToCassino then
			if not showedCasino then
				showedCasino = true
				SendNUIMessage({ action = "showCassino", prices = {
					Poker = Config.Pokers[1].MinimumBet.." - "..Config.Pokers[1].MaximumBet.." fichas",
					Blackjack = Config.blackjack['MinimumBet'].." - "..Config.blackjack['MaximumBet'].." fichas",
					Roleta = Config.roleta,
					Slots = "100-2500 fichas",
					InsideTrack = Config.InsideTrack['minBet'].." - "..Config.InsideTrack['maxBet'].." fichas"
				} })
				SendNUIMessage({ action = "updateChips", myChips = vSERVER.getBalance() })
			else
				SendNUIMessage({ action = "updateChips", myChips = vSERVER.getBalance() })
			end
		else
			showedCasino = false
			SendNUIMessage({ action = "hideCassino" })
		end
		Wait(5000)
	end
end)

CreateThread(function()
	while true do
		local timeDistance = 500
		if closeToCassino then
			timeDistance = 4
			if IsControlJustPressed(1,47) then
				SendNUIMessage({ action = "toggleCassinoNui" })
			end
		end
		Wait(timeDistance)
	end
end)

function drawfreameeMarker(position)
    DrawMarker(20, position, 0.0, 0.0, 0.0, 180.0, 0.0, 0.0, 0.3, 0.3, 0.3, 255, 255, 255, 255, true, true, 2, true, nil, nil, false)
    DrawText3Ds(position.x,position.y,position.z + 0.3,'~g~[E]~w~ para se sentar.')
end

function DrawText3Ds(x,y,z, text)
    local onScreen,_x,_y = World3dToScreen2d(x,y,z)
    local px,py,pz=table.unpack(GetGameplayCamCoords())
    
    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(text)
    DrawText(_x,_y)
    local factor = (string.len(text)) / 370
    DrawRect(_x,_y+0.0125, 0.015+ factor, 0.03, 41, 11, 41, 68)
end

local vehicle = nil

Citizen.CreateThread(function()
	local heading = 254.5
	if wantAll then
		while true do
			local idle = 500
			if GetDistanceBetweenCoords(GetEntityCoords(GetPlayerPed(-1)), x,y,z, true) < 20 then
				idle = 4
				if DoesEntityExist(vehicle) == false then
					RequestModel(GetHashKey(Config.car))
					while not HasModelLoaded(GetHashKey(Config.car)) do
						Wait(1)
					end
					vehicle = CreateVehicle(GetHashKey(Config.car), x,y,z, heading, false, false)
					FreezeEntityPosition(vehicle, true)
					SetEntityInvincible(vehicle, true)
					SetEntityCoords(vehicle,x,y,z, false, false, false, true)
				else
					SetEntityHeading(vehicle, heading)
					heading = heading+0.2
				end
			end
			Citizen.Wait(idle)
		end
	end
end)

Citizen.CreateThread(function()
	if wantAll then
		while true do
			Citizen.Wait(10000)
			if vehicle ~= nil and GetDistanceBetweenCoords(GetEntityCoords(GetPlayerPed(-1)), x,y,z, true) < 20 then
				SetEntityCoords(vehicle, x,y,z, false, false, false, true)
			end
		end
	end
end)
