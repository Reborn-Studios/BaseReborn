-----------------------------------------------------------------------------------------------------------------------------------------
-- CONNECTION
-----------------------------------------------------------------------------------------------------------------------------------------
Roubos = Tunnel.getInterface("Roubos")
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local robberyId = 0
local robberyTimer = 0
local startRobbery = false
local vars = Config.gerais
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADINIT
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	for k,v in pairs(vars) do
		exports["target"]:AddCircleZone("Robbery:0"..k,vector3(v.x,v.y,v.z),0.75,{
			name = "Robbery:0"..k,
			heading = 3374176
		},{
			distance = 2.5,
			options = {
				{
					canInteract = function()
						return not LocalPlayer.state.Police
					end,
					icon = "fa-solid fa-sack-dollar",
					event = "robbery:startRobbery",
					label = "Roubar",
					tunnel = "client",
					service = k
				}
			}
		})
	end
end)

RegisterNetEvent("robbery:startRobbery")
AddEventHandler("robbery:startRobbery",function(data)
	local service = parseInt(data.service)
	if service and not startRobbery then
		local ped = PlayerPedId()
		local coords = GetEntityCoords(ped)
		if Roubos.checkPolice(service,coords) then
			local v = vars[service]
			robberyId = service
			startRobbery = true
			robberyTimer = v.time
			RobThread()
			TriggerEvent("cancelando",true)
			TriggerEvent("Progress",parseInt(v.time)*1000,"Roubando...")
			SetPedComponentVariation(ped,5,45,0,2)
		end
	end
end)

function RobThread()
	CreateThread(function()
		while startRobbery do
			local ped = PlayerPedId()
			local distance = #(GetEntityCoords(ped) - vector3(vars[robberyId].x,vars[robberyId].y,vars[robberyId].z))
			if distance > vars[robberyId].distance or GetEntityHealth(ped) <= 101 then
				TriggerEvent("cancelando",false)
				startRobbery = false
			end
			if robberyTimer > 0 then
				robberyTimer = robberyTimer - 1
				if robberyTimer <= 0 then
					startRobbery = false
					TriggerEvent("cancelando",false)
					Roubos.paymentMethod(robberyId)
				end
			end
			Wait(1000)
		end
	end)
end
