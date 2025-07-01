--####--####--####--#
--##   CONVERSÃO   -#
--####--####--####--#

function exportHandler(resource, exportName, func)
    AddEventHandler(('__cfx_export_%s_%s'):format(resource,exportName), function(setCB)
        setCB(func)
    end)
end

tvRP.getNearestPlayer = function(radius)
    return vRP.nearestPlayer(radius)
end

tvRP.getNearestPlayers = function(distance)
    return vRP.nearestPlayers(distance)
end

tvRP.getNearestVehicle = function(radius)
    return vRP.getNearVehicle(radius)
end
tvRP.getNearestVehicles = function(radius)
    return vRP.getNearVehicles(radius)
end

tvRP.CarregarObjeto = function(dict,anim,prop,flag,mao,altura,pos1,pos2,pos3,pos4,pos5)
    vRP.createObjects(dict,anim,prop,flag,mao,altura,pos1,pos2,pos3,pos4,pos5)
end

tvRP.DeletarObjeto = function(status)
    vRP.removeObjects(status)
end

tvRP.nearVehicle = function(radius)
    return vRP.getNearVehicle(radius)
end

--####--####--####--####--#
--##   CREATIVE NETWORK -##
--####--####--####--####--#

tvRP.ClosestPeds = function(Radius)
    return vRP.nearestPlayers(Radius)
end

tvRP.ClosestPed = function(Radius)
    return vRP.nearestPlayer(Radius)
end

function tvRP.Players()
	return GetPlayers()
end

function tvRP.PlaySound(Dict,Name)
	PlaySoundFrontend(-1,Dict,Name,false)
end

function tvRP.CreateObjects(Dict,Anim,Prop,Flag,Hands,Height,Pos1,Pos2,Pos3,Pos4,Pos5)
    vRP.createObjects(Dict,Anim,Prop,Flag,Hands,Height,Pos1,Pos2,Pos3,Pos4,Pos5)
end

function tvRP.Destroy(Mode)
    vRP.removeObjects(Mode)
end

function tvRP.ModelExist(Hash)
	return IsModelInCdimage(Hash)
end

function tvRP.SetHealth(Health)
	vRP.setHealth(Health)
end

function tvRP.UpgradeHealth(Number)
	local Ped = PlayerPedId()
	local Health = GetEntityHealth(Ped)
	if Health > 100 then
		SetEntityHealth(Ped,Health + Number)
	end
end

function tvRP.DowngradeHealth(Number)
	local Ped = PlayerPedId()
	local Health = GetEntityHealth(Ped)
	SetEntityHealth(Ped,Health - Number)
end

function tvRP.PlayingAnim(Dict,Name)
	return IsEntityPlayingAnim(PlayerPedId(),Dict,Name,3)
end

function tvRP.Skin(Hash)
	if LoadModel(Hash) then
		LocalPlayer["state"]:set("Invisible",true,false)
		local Pid = PlayerId()
		SetPlayerModel(Pid,Hash)
		local Ped = PlayerPedId()
		SetPedComponentVariation(Ped,5,0,0,1)
		SetModelAsNoLongerNeeded(Hash)
		LocalPlayer["state"]:set("Invisible",false,false)
	end
end

function tvRP.ClosestVehicle(radius)
    return vRP.getNearVehicle(radius)
end

function tvRP.InsideVehicle()
	local Ped = PlayerPedId()
	return IsPedInAnyVehicle(Ped)
end

function tvRP.VehicleList(Radius)
	local Vehicle = nil
	local Ped = PlayerPedId()
	if IsPedInAnyVehicle(Ped) then
		Vehicle = GetVehiclePedIsUsing(Ped)
	else
		Vehicle = tvRP.ClosestVehicle(Radius)
	end
	if IsEntityAVehicle(Vehicle) then
		return Vehicle,VehToNet(Vehicle),GetVehicleNumberPlateText(Vehicle),GetEntityArchetypeName(Vehicle),GetVehicleClass(Vehicle)
	end
end

function tvRP.VehicleName()
	local Ped = PlayerPedId()
	if IsPedInAnyVehicle(Ped) then
		local Vehicle = GetVehiclePedIsUsing(Ped)
		return GetEntityArchetypeName(Vehicle)
	end
end

function tvRP.VehicleHash()
	local ped = PlayerPedId()
	if IsPedInAnyVehicle(ped) then
		local Vehicle = GetLastDrivenVehicle()
		local vehModel = GetEntityModel(Vehicle)
		return vehModel
	end
end

function tvRP.VehicleModel(Vehicle)
	return GetEntityArchetypeName(Vehicle)
end

function tvRP.LastVehicle(Name)
	local Vehicle = GetLastDrivenVehicle()
	if DoesEntityExist(Vehicle) and Name == GetEntityArchetypeName(Vehicle) then
		return true
	end

	return false
end
