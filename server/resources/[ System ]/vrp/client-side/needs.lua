-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local playerReady = false
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERREADY
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.playerReady()
	playerReady = true
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- THREADREADY
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	NetworkSetFriendlyFireOption(true)
	SetCanAttackFriendly(PlayerPedId(),true,true)
	while true do
		if playerReady then
			local coords = GetEntityCoords(PlayerPedId())
			vRPserver._updatePositions(coords.x,coords.y,coords.z)
			vRPserver._updateHealth(GetEntityHealth(PlayerPedId()))
			vRPserver._updateArmour(GetPedArmour(PlayerPedId()))
		end
		Wait(30000)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETHEALTH
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getHealth()
	return GetEntityHealth(PlayerPedId())
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETHEALTH
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.setHealth(health)
	SetEntityHealth(PlayerPedId(),parseInt(health))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATEHEALTH
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.updateHealth(number)
	local ped = PlayerPedId()
	local health = GetEntityHealth(ped)
	if health > 101 then
		SetEntityHealth(ped,parseInt(health+number))
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DOWNHEALTH
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.downHealth(number)
	local ped = PlayerPedId()
	local health = GetEntityHealth(ped)
	SetEntityHealth(ped,parseInt(health-number))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GETARMOUR
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.getArmour()
	return GetPedArmour(PlayerPedId())
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- SETARMOUR
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.setArmour(amount)
	local ped = PlayerPedId()
	local armour = GetPedArmour(ped) or 0
	amount = tonumber(amount) or 0
	SetPedArmour(ped,parseInt(armour+amount))
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPDATENEEDS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("hud:client:UpdateNeeds",function(hunger,thirst)
	vRPserver.clientUpgradeHunger(hunger)
	vRPserver.clientUpgradeThirst(thirst)
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- NETWORKRESSURECTION
-----------------------------------------------------------------------------------------------------------------------------------------
function tvRP.killGod()
	local ped = PlayerPedId()
	local x,y,z = table.unpack(GetEntityCoords(ped))
	NetworkResurrectLocalPlayer(x,y,z,0,0,false)
	ClearPedBloodDamage(ped)
	SetEntityInvincible(ped,false)
	ClearPedTasks(ped)
	ClearPedSecondaryTask(ped)
end

RegisterNetEvent("killGod")
AddEventHandler("killGod", function()
	tvRP.killGod()
end)
