-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local Me = {}
local MeActive = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAT:ME_NEW
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("chat:me_new")
AddEventHandler("chat:me_new",function(source,Name,Message,Seconds)
	local Index = GetPlayerFromServerId(source)
	if Index ~= -1 then
		local Ped = GetPlayerPed(Index)
		Me[Ped] = { Message = Message, Name = Name, Timer = Seconds }
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHAT:ME_REMOVE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("chat:me_remove")
AddEventHandler("chat:me_remove",function(source)
	local Index = GetPlayerFromServerId(source)
	if Index ~= -1 then
		local Ped = GetPlayerPed(Index)
		if MeActive[Ped] then
			SendNUIMessage({ Action = "RemoveMe", Payload = Ped })
			MeActive[Ped] = nil
			Me[Ped] = nil
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADSYSTEM
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local TimeDistance = 999
		local Ped = PlayerPedId()
		local Coords = GetEntityCoords(Ped)

		for Index,v in pairs(Me) do
			local OtherCoords = GetEntityCoords(Index)
			if #(Coords - OtherCoords) <= 5 then
				TimeDistance = 1
				local _,x,y = GetScreenCoordFromWorldCoord(OtherCoords.x,OtherCoords.y,OtherCoords.z + 0.7)

				if not MeActive[Index] then
					SendNUIMessage({ Action = "ShowMe", Payload = { Index,v.Name,v.Message,x,y,false } })
					MeActive[Index] = true
				end

				SendNUIMessage({ Action = "UpdateMe", Payload = { Index,v.Message,x,y } })
			elseif MeActive[Index] then
				SendNUIMessage({ Action = "RemoveMe", Payload = Index })
				MeActive[Index] = nil
			end
		end

		Wait(TimeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADREMOVE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		for Index,v in pairs(Me) do
			if v.Timer > 0 then
				v.Timer = v.Timer - 1

				if v.Timer <= 0 then
					Me[Index] = nil

					if MeActive[Index] then
						SendNUIMessage({ Action = "RemoveMe", Payload = Index })
						MeActive[Index] = nil
					end
				end
			end
		end

		Wait(1000)
	end
end)