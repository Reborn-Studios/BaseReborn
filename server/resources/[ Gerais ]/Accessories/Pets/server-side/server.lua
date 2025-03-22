
local Tunnel = module("vrp","lib/Tunnel") or {}
local Proxy = module("vrp","lib/Proxy") or {}
vRP = Proxy.getInterface("vRP")

local cRP = {}
Tunnel.bindInterface("pets",cRP)
-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
local animal = {}
-----------------------------------------------------------------------------------------------------------------------------------------
-- ANIMAREGISTER
-----------------------------------------------------------------------------------------------------------------------------------------
function cRP.animalRegister(netId)
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		animal[user_id] = netId
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- ANIMACLEANER
-----------------------------------------------------------------------------------------------------------------------------------------
function cRP.animalCleaner()
	local source = source
	local user_id = vRP.getUserId(source)
	if user_id then
		TriggerEvent("tryDeletePed",animal[user_id])
		animal[user_id] = nil
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- PLAYERDISCONNECT
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("playerDisconnect",function(user_id)
	if animal[user_id] then
		TriggerEvent("tryDeletePed",animal[user_id])
		animal[user_id] = nil
	end
end)

AddEventHandler("onResourceStop",function (rsr)
	if rsr == GetCurrentResourceName() then
		for k,v in pairs(animal) do
			TriggerEvent("tryDeletePed",v)
			animal[k] = nil
		end
	end
end)