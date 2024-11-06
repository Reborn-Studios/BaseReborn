-----------------------------------------------------------------------------------------------------------------------------------------
-- VRP UTILS
-----------------------------------------------------------------------------------------------------------------------------------------	
local Tunnel = module("vrp", "lib/Tunnel")
WallServer = Tunnel.getInterface("Wall")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local players = {}
local showIds = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- CORE
-----------------------------------------------------------------------------------------------------------------------------------------
local function startPlayersThread()
	CreateThread(function()
		while showIds do
			players = WallServer.getInfos()
			for i,playerId in ipairs(GetActivePlayers()) do
				local nplayer = GetPlayerServerId(playerId)
				if not players[nplayer] then
					players[nplayer] = {
						id = "None",
						name = "None"
					}
				end
			end
			Wait(Config.Wall['threadTime'] or 5000)
		end
	end)
end

local function initWallThread()
	CreateThread(function()
		while showIds do
			for source, v in pairs(players) do
				local playerId = GetPlayerFromServerId(source)
				if (NetworkIsPlayerActive(playerId)) then
					local playerPed = GetPlayerPed(playerId)
					local x1, y1, z1 = table.unpack(GetEntityCoords(PlayerPedId(), true))
					local x2, y2, z2 = table.unpack(GetEntityCoords(playerPed, true))
					local distance = math.floor(GetDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, true))
					if distance < Config.Wall['distance'] then
						if playerPed ~= -1 then
							local playerHealth = GetEntityHealth(playerPed)
							if playerHealth <= 101 then
								playerHealth = 0
							end
							local playerArmour = GetPedArmour(playerPed)
							if playerArmour <= 1 then
								playerArmour = 0
							end
							local playerHealthPercent = (playerHealth / GetPedMaxHealth(playerPed)) * 100
							local playerArmourPercent = playerArmour
							playerHealthPercent = math.floor(playerHealthPercent)
							playerArmourPercent = math.floor(playerArmourPercent)
							DrawWallText3D(x2, y2, z2 + 1.2, "~p~ID: ~w~"..v.id.."\n~b~SOURCE:~w~ "..source.."\n~o~NOME:~w~ "..(v.name).. "\n~g~VIDA:~w~ "..playerHealth.. " (" .. playerHealthPercent .. "%)\n~r~COLETE:~w~ "..playerArmour.." ("..playerArmourPercent.."%)", 255, 255, 255)
							DrawLine(x1, y1, z1, x2, y2, z2, 245, 50, 50, 240)
						else
							DrawWallText3D(x2, y2, z2 + 1.2, "\n~r~BUGADO\nID: ~w~"..v.id.."\n~r~SOURCE:~w~ "..source, 255, 255, 255)
						end
					end
				end
			end
			Wait(4)
		end
	end)
end

RegisterCommand("wall",function()
	local admin = WallServer.isAdmin()
	if not admin then return end
	showIds = not showIds
	if showIds then
		initWallThread()
		WallServer.reportLog("ON")
		TriggerEvent('chatMessage',"WALL",{0,213,189},"ON")
		startPlayersThread()
	else
		WallServer.reportLog("OFF")
		TriggerEvent('chatMessage',"WALL",{213,0,189},"OFF")
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- 3D TEXT
-----------------------------------------------------------------------------------------------------------------------------------------
function DrawWallText3D(x,y,z, text, r,g,b)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    if onScreen then
        SetTextFont(0)
        SetTextProportional(true)
        SetTextScale(0.0, 0.25)
        SetTextColour(r, g, b, 255)
        SetTextDropshadow(0, 0, 0, 0, 255)
        SetTextEdge(2, 0, 0, 0, 150)
        SetTextDropShadow()
        SetTextOutline()
        SetTextEntry("STRING")
        SetTextCentre(true)
        AddTextComponentString(text)
        DrawText(_x,_y)
    end
end
