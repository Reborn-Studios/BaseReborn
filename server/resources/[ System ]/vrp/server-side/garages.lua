-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHGLOBAL
-----------------------------------------------------------------------------------------------------------------------------------------
function vRP.vehicleGlobal()
	if GetResourceState("will_garages_v2") == "started" then
		return exports['will_garages_v2']:getVehicleGlobal()
	end
	return Reborn.vehList()
end

function vRP.vehicleName(vname)
	if GetResourceState("will_garages_v2") == "started" then
		return exports['will_garages_v2']:getVehicleName(vname)
	end
	local vehList = Reborn.vehList()
	for k,v in pairs(vehList) do
		if v.hash == GetHashKey(vname) then
			return v.name
		end
	end
end

function vRP.vehicleChest(vname)
	if GetResourceState("will_garages_v2") == "started" then
		return exports['will_garages_v2']:getVehicleChest(vname)
	end
	local vehList = Reborn.vehList()
	for k,v in pairs(vehList) do
		if v.hash == GetHashKey(vname) then
			return v.capacidade
		end
	end
end

function vRP.vehiclePrice(vname)
	if GetResourceState("will_garages_v2") == "started" then
		return exports['will_garages_v2']:getVehiclePrice(vname)
	end
	local vehList = Reborn.vehList()
	for k,v in pairs(vehList) do
		if v.hash == GetHashKey(vname) then
			return v.price
		end
	end
end

function vRP.vehicleType(vname)
	if GetResourceState("will_garages_v2") == "started" then
		return exports['will_garages_v2']:getVehicleType(vname)
	end
	local vehList = Reborn.vehList()
	for k,v in pairs(vehList) do
		if v.hash == GetHashKey(vname) then
			return v.tipo
		end
	end
end

function vRP.addUserVehicle(user_id, vehicle, vehPlate)
	local plate = vehPlate or vRP.generatePlateNumber()
	if GetResourceState("will_garages_v2") == "started" then
		exports['will_garages_v2']:addVehicle(user_id, vehicle, plate)
	else
		vRP.execute("vRP/add_vehicle",{ user_id = parseInt(user_id), vehicle = vehicle, plate = plate, phone = vRP.getPhone(user_id), work = tostring(false) })
	end
	local frameworkTables = Reborn.frameworkTables()
	local playerId = vRP.getUserSource(user_id)
	if not playerId then return	end
	if frameworkTables['owned_vehicles'] then
		exports["es_extended"]:addVehicle(playerId, vehicle, plate)
	end
	if frameworkTables['player_vehicles'] then
		exports["qb-core"]:AddVehicle(playerId, vehicle, plate)
	end
end

exports("addUserVehicle",function(source, vehicle)
	local user_id = vRP.getUserId(source)
	if user_id then
		vRP.addUserVehicle(user_id, vehicle)
	end
end)