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
			for _, id in ipairs(GetActivePlayers()) do
				if id == -1 or id == nil then return end
				local pid, userIdentity = WallServer.getInfos(GetPlayerServerId(id))
				if pid == -1 then
					return
				end
				if players[id] ~= pid or not players[id] then
					players[id] = { id = pid, name = userIdentity.name.." "..userIdentity.name2 }
				end
			end
			Wait(Config.Wall['threadTime'] or 5000)
		end
	end)
end

local function initWallThread()
	CreateThread(function()
		while showIds do
			for k, id in ipairs(GetActivePlayers()) do
				if (NetworkIsPlayerActive(id)) then
					local x1, y1, z1 = table.unpack(GetEntityCoords(PlayerPedId(), true))
					local x2, y2, z2 = table.unpack(GetEntityCoords(GetPlayerPed(id), true))
					local distance = math.floor(GetDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, true))
					if distance < Config.Wall['distance'] then
						if GetPlayerPed(id) ~= -1 and players[id] then
							local playerName = GetPlayerName(id)
							if playerName == nil or playerName == "" or playerName == -1 then
								playerName = "Sem STEAM"
							end
							local playerHealth = GetEntityHealth(GetPlayerPed(id))
							if playerHealth <= 101 then
								playerHealth = 0
							end
							local playerArmour = GetPedArmour(GetPlayerPed(id))
							if playerArmour <= 1 then
								playerArmour = 0
							end
							local playerHealthPercent = (playerHealth / GetPedMaxHealth(GetPlayerPed(id))) * 100
							local playerArmourPercent = playerArmour
							playerHealthPercent = math.floor(playerHealthPercent)
							playerArmourPercent = math.floor(playerArmourPercent)
							DrawWallText3D(x2, y2, z2+1, "~p~ID: ~w~" .. players[id].id .. "\n~o~NOME:~w~ "..(players[id].name).. "\n~g~VIDA:~w~ "..playerHealth.. " (" .. playerHealthPercent .. "%)\n~r~COLETE:~w~ "..playerArmour.. " (" .. playerArmourPercent .. "%)\n~b~STEAM:~w~ " .. playerName, 255, 255, 255)
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
