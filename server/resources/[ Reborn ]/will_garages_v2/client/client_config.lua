--#########################--
--## VEICULOS DE EMPREGO ##--
--#########################--

function getServiceVehicles(name, myvehicles)
	local vehsService = {}
	if Config.workgarage[name] then
		local i = 0
		for _,veh in pairs(Config.workgarage[name]) do
			for _,v in pairs(myvehicles) do
				if v.vehicle == veh and v.work then
					i = i + 1
					vehsService[i] = { name = veh, vname = v.vname, modifies = v }
				end
			end
		end
	end
	return vehsService 
end

--##############################################--
--## APLICAR MODIFICAÇÕES NO SPAWN DO VEICULO ##--
--##############################################--

function applyModifies(nveh,engine,fuel,tuning,vehDoors,vehWindows,vehTyres,vname)
    SetVehicleOnGroundProperly(nveh)
    SetVehRadioStation(nveh,"OFF")
	if engine then
		SetVehicleEngineHealth(nveh,engine+0.0)
	else
		SetVehicleEngineHealth(nveh,1000.0)
	end
	if fuel then
		SetVehicleFuelLevel(nveh,fuel+0.0)
		Entity(nveh).state:set("fuel", fuel+0.0, true)
	else
		SetVehicleFuelLevel(nveh,100.0)
		Entity(nveh).state:set("fuel", 100.0, true)
	end
	if vehWindows ~= nil and type(vehWindows) == "table" then
		for k,v in pairs(vehWindows) do
			if not v then
				SmashVehicleWindow(nveh,parseInt(k))
			end
		end
	end
	if vehTyres ~= nil and type(vehTyres) == "table" then
		for k,v in pairs(vehTyres) do
			if type(v) == "boolean" then
				SetVehicleTyreBurst(nveh,parseInt(k),v,1000.01)
			elseif v < 2 then
				SetVehicleTyreBurst(nveh,parseInt(k),(v == 1),1000.01)
			end
		end
	end
	if GetResourceState("will_tunners") == "started" then
		exports['will_tunners']:SetVehicleProp(nveh,tuning or {})
	elseif GetResourceState("ld_tunners") == "started" then
		if tuning and next(tuning) then
            local onlyLivery = true
            for k, _ in pairs(tuning) do
                if k ~= "livery" then
                    onlyLivery = false
                    break
                end
            end
            if not onlyLivery then
                TriggerEvent("ld_tunners:client:applyMods", nveh, tuning)
            end
			if tuning.livery then
				SetVehicleLivery(nveh, tonumber(tuning.livery))
			end
        end
	else
		vehicleMods(nveh,tuning)
	end
	TriggerEvent("vehiclekeys:client:SetOwner", GetVehicleNumberPlateText(nveh))
end

--######################--
--## SPAWNAR VEICULO ###--
--######################--

function spawnVeh(vname,x,y,z,h,data,interior)
    local nveh = 0
    local debugSpawning = 0
    while nveh == 0 and debugSpawning <= 5 do
        local hash = GetHashKey(vname)
        setupModelo(hash)
        nveh = CreateVehicle(hash,x,y,z+0.1,h,true,false)
        if nveh == 0 then
            debugSpawning = debugSpawning + 1
            setupModelo(hash)
        end
        Citizen.Wait(10)
    end
    if nveh then
        local plate = ""
        if data.plate then
            plate = data.plate
        else
            plate = vSERVER.getVehiclePlate(nil, vname)
        end
        SetVehicleNumberPlateText(nveh,plate)
		if interior then
            SetVehicleDoorsLocked(nveh,1)   -- Destrancado
        else
            SetVehicleDoorsLocked(nveh,2)   -- Trancado
        end
		TriggerServerEvent("setPlateEveryone",plate)
        if data.vehDoors ~= nil and type(data.vehDoors) == "table" then
            for k,v in pairs(data.vehDoors) do
                if v then
                    SetVehicleDoorBroken(nveh,parseInt(k),parseInt(v))
                end
            end
        end
    end
    return nveh
end

--######################--
--## APLICAR TUNAGEM ###--
--######################--

function vehicleMods(veh,custom)
	if custom and veh then
		SetVehicleModKit(veh,0)
		if custom.color then
			SetVehicleColours(veh,tonumber(custom.color[1]),tonumber(custom.color[2]))
			SetVehicleExtraColours(veh,tonumber(custom.extracolor[1]),tonumber(custom.extracolor[2]))
		end
		
		if custom.customPcolor then
			SetVehicleCustomPrimaryColour(veh,custom.customPcolor[1],custom.customPcolor[2],custom.customPcolor[3])
		end

		if custom.customScolor then
			SetVehicleCustomSecondaryColour(veh,custom.customScolor[1],custom.customScolor[2],custom.customScolor[3])
		end

		if custom.smokecolor then
			ToggleVehicleMod(veh,20,true)
			SetVehicleTyreSmokeColor(veh,tonumber(custom.smokecolor[1]),tonumber(custom.smokecolor[2]),tonumber(custom.smokecolor[3]))
		end

		if custom.neon then
			SetVehicleNeonLightEnabled(veh,0,true)
			SetVehicleNeonLightEnabled(veh,1,true)
			SetVehicleNeonLightEnabled(veh,2,true)
			SetVehicleNeonLightEnabled(veh,3,true)
			SetVehicleNeonLightsColour(veh,tonumber(custom.neoncolor[1]),tonumber(custom.neoncolor[2]),tonumber(custom.neoncolor[3]))
		else
			SetVehicleNeonLightEnabled(veh,0,false)
			SetVehicleNeonLightEnabled(veh,1,false)
			SetVehicleNeonLightEnabled(veh,2,false)
			SetVehicleNeonLightEnabled(veh,3,false)
		end
		
		if custom.livery and tonumber(custom.livery) then
			SetVehicleLivery(veh, tonumber(custom.livery))
		end

		if custom.xenoncolor then
			ToggleVehicleMod(veh,22,true)
			SetVehicleXenonLightsColour(veh,tonumber(custom.xenoncolor))
		end

		if custom.plateindex then
			SetVehicleNumberPlateTextIndex(veh,tonumber(custom.plateindex))
		end

		if custom.windowtint then
			SetVehicleWindowTint(veh,tonumber(custom.windowtint))
		end

		if parseInt(custom.bulletProofTyres) > 0 then
			SetVehicleTyresCanBurst(veh,parseInt(custom.bulletProofTyres))
		end

		if custom.wheeltype then
			SetVehicleWheelType(veh,tonumber(custom.wheeltype))
		end
		if custom.mods then
			SetVehicleMod(veh,0,custom.mods["0"].mod)
			SetVehicleMod(veh,1,custom.mods["1"].mod)
			SetVehicleMod(veh,2,custom.mods["2"].mod)
			SetVehicleMod(veh,3,custom.mods["3"].mod)
			SetVehicleMod(veh,4,custom.mods["4"].mod)
			SetVehicleMod(veh,5,custom.mods["5"].mod)
			SetVehicleMod(veh,6,custom.mods["6"].mod)
			SetVehicleMod(veh,7,custom.mods["7"].mod)
			SetVehicleMod(veh,8,custom.mods["8"].mod)
			SetVehicleMod(veh,10,custom.mods["10"].mod)
			SetVehicleMod(veh,11,custom.mods["11"].mod)
			SetVehicleMod(veh,12,custom.mods["12"].mod)
			SetVehicleMod(veh,13,custom.mods["13"].mod)
			SetVehicleMod(veh,14,custom.mods["14"].mod)
			SetVehicleMod(veh,15,custom.mods["15"].mod)
			SetVehicleMod(veh,16,custom.mods["16"].mod)
			SetVehicleMod(veh,23,custom.mods["23"].mod,custom.mods["23"].variation)
			SetVehicleMod(veh,24,custom.mods["24"].mod,custom.mods["24"].variation)
			SetVehicleMod(veh,25,custom.mods["25"].mod)
			SetVehicleMod(veh,26,custom.mods["26"].mod)
			SetVehicleMod(veh,27,custom.mods["27"].mod) 
			SetVehicleMod(veh,28,custom.mods["28"].mod)
			SetVehicleMod(veh,29,custom.mods["29"].mod)
			SetVehicleMod(veh,30,custom.mods["30"].mod)
			SetVehicleMod(veh,31,custom.mods["31"].mod)
			SetVehicleMod(veh,32,custom.mods["32"].mod)
			SetVehicleMod(veh,33,custom.mods["33"].mod)
			SetVehicleMod(veh,34,custom.mods["34"].mod)
			SetVehicleMod(veh,35,custom.mods["35"].mod)
			SetVehicleMod(veh,36,custom.mods["36"].mod)
			SetVehicleMod(veh,37,custom.mods["37"].mod) 
			SetVehicleMod(veh,38,custom.mods["38"].mod)
			SetVehicleMod(veh,39,custom.mods["39"].mod)
			SetVehicleMod(veh,40,custom.mods["40"].mod)
			SetVehicleMod(veh,41,custom.mods["41"].mod)
			SetVehicleMod(veh,42,custom.mods["42"].mod)
			SetVehicleMod(veh,43,custom.mods["43"].mod)
			SetVehicleMod(veh,44,custom.mods["44"].mod)
			SetVehicleMod(veh,45,custom.mods["45"].mod)
			SetVehicleMod(veh,46,custom.mods["46"].mod)
			SetVehicleMod(veh,48,custom.mods["48"].mod)

			ToggleVehicleMod(veh,18,custom.mods["18"].mod)
		end
    end
end

--######################--
--##  REPARAR VEICULO  ##-
--######################--

RegisterNetEvent("will_garages_v2:repairVehicle")
AddEventHandler("will_garages_v2:repairVehicle",function(index,status)
	if NetworkDoesNetworkIdExist(index) then
		local v = NetToEnt(index)
		if DoesEntityExist(v) then
			local fuel = GetVehicleFuelLevel(v)
			if status then
				SetVehicleFixed(v)
				SetVehicleDeformationFixed(v)
			end
			SetVehicleBodyHealth(v,1000.0)
			SetVehicleEngineHealth(v,1000.0)
			SetVehiclePetrolTankHealth(v,1000.0)
			SetVehicleFuelLevel(v,fuel)
		end
	end
end)

--######################--
--###	 /CAR ADMIN	 ###--
--######################--

RegisterNetEvent("will_garages_v2:adminVehicle")
AddEventHandler("will_garages_v2:adminVehicle",function(name)
    local plate = vSERVER.getVehiclePlate(nil, name)
	local mHash = GetHashKey(name)
    setupModelo(mHash)
	if HasModelLoaded(mHash) and plate then
		local ped = PlayerPedId()
		local nveh = CreateVehicle(mHash,GetEntityCoords(ped),GetEntityHeading(ped),true,false)
		SetVehicleDirtLevel(nveh,0.0)
		SetPedIntoVehicle(ped,nveh,-1)
		SetVehicleNumberPlateText(nveh,plate)
		TriggerServerEvent("setPlateEveryone",plate)
		local tuning = vSERVER.gettinTunning(plate, name)
        applyModifies(nveh,1000.0,100.0,tuning)
	end
end)

--######################--
--##  TRANCAR CARRO   ##--
--######################--

local Button = GetGameTimer()

RegisterCommand("LockVehicle",function()
	if GetResourceState("qb-vehiclekeys") == "started" then return end
	if GetGameTimer() >= Button then
		TriggerServerEvent("will_garages_v2:vehicleLock")
		Button = GetGameTimer() + 1000
	end
end)

RegisterKeyMapping("LockVehicle","Trancar/destrancar veiculo","keyboard","l")

--############################--
--##    VEICULOS PROXIMOS   ##--
--############################--

function will.getNearVehicles(radius,x,y,z)
	local r = {}
	local vehs = {}
	local it,veh = FindFirstVehicle()
	if veh then
		table.insert(vehs,veh)
	end
	local ok
	repeat
		ok,veh = FindNextVehicle(it)
		if ok and veh then
			table.insert(vehs,veh)
		end
	until not ok
	EndFindVehicle(it)

	for _,veh in pairs(vehs) do
		local coordsVeh = GetEntityCoords(veh)
		local distance
		if x then
			distance = #(vector3(x,y,z) - coordsVeh)
		else
			local coords = GetEntityCoords(PlayerPedId())
			distance = #(coords - coordsVeh)
		end
		if distance <= radius then
			r[veh] = distance
		end
	end
	return r
end

function will.getNearVehicle(radius)
	local veh
	local vehs = will.getNearVehicles(radius)
	local min = radius + 0.0001
	for _veh,dist in pairs(vehs) do
		if dist < min then
			min = dist
			veh = _veh
		end
	end
	return veh 
end

--########################--
--##    REQUEST MODELS  ##--
--########################--

function setupModelo(modelo)
    RequestModel(modelo)
    local i = 0
    while not HasModelLoaded(modelo) and i < 200 do
        i = i + 1
        RequestModel(modelo)
        Citizen.Wait(10)
    end
    SetModelAsNoLongerNeeded(modelo)
end

--#######################--
--##  GARAGEM PROXIMA  ##--
--#######################--

local garagesGlobal = GlobalState['GaragesGlobal'] or {}
local createdBlips = {}

function reloadBlips(garages)
	for k,v in pairs(createdBlips) do
		if v and DoesBlipExist(v) then
			RemoveBlip(v)
			createdBlips[k] = nil
		end
	end
	for k, v in pairs(garages) do
		if v.map then
			local x,y,z = table.unpack(v.entrada['blip'])
			local blip = AddBlipForCoord(x,y,z)
			SetBlipSprite(blip, 357)
			SetBlipScale(blip, 0.6)
			SetBlipColour(blip, 14)
			SetBlipDisplay(blip, 4)
			SetBlipAsShortRange(blip, true)

			BeginTextCommandSetBlipName("STRING")
			AddTextComponentString("Garagem")
			EndTextCommandSetBlipName(blip)
			table.insert(createdBlips,blip)
		end
    end
end

reloadBlips(garagesGlobal)

AddStateBagChangeHandler("GaragesGlobal","",function(name,key,value)
	garagesGlobal = value
	reloadBlips(value)
end)

local function getClosestBlip()
	local coords = GetEntityCoords(PlayerPedId())
	local closest = nil
	local closestDistance = 1000
	for k,v in pairs(garagesGlobal) do
		local x,y,z = getBlip(v)
		local distance = #(coords - vector3(x, y, z))
		if distance < closestDistance then
			closest = k
			closestDistance = distance
		end
	end
	return closest
end

local actualGarage = nil

Citizen.CreateThread(function()
	while true do
		local coords = GetEntityCoords(PlayerPedId())
		local will = 1000
		local closestBlip = getClosestBlip()
		if closestBlip then
			local x,y,z = getBlip(garagesGlobal[closestBlip])
			local distance = #(coords - vector3(x, y, z))
			if distance <= Config.blip_distance['Normal'] then
				local refreshTimer = GetGameTimer()
				while distance <= Config.blip_distance['Normal'] and refreshTimer + 2000 > GetGameTimer() do
					will = 4
					distance = #(GetEntityCoords(PlayerPedId()) - vector3(x, y, z))
					drawMark(x,y,z)
					if IsControlJustPressed(0,38) and distance <= 2.0 then
						actualGarage = closestBlip
						pickGarage(closestBlip)
					end
					Citizen.Wait(will)
				end
			end
		end
		Citizen.Wait(will)
	end
end)

RegisterNetEvent("checkIfIsInsideGarage")
AddEventHandler("checkIfIsInsideGarage",function()
	if actualGarage and garagesGlobal[closestBlip] then
		local x,y,z = getBlip(garagesGlobal[closestBlip])
		TriggerServerEvent("will_garages:updatePos",vector3(x,y,z))
	end
end)

function getBlip(v)
	local ped = PlayerPedId()
	local x,y,z = 0,0,0
	if v.entrada then
		if IsPedInAnyVehicle(ped) and v.entrada['veiculo'] then
			x,y,z = v.entrada['veiculo'][1],v.entrada['veiculo'][2],v.entrada['veiculo'][3]
		else
			x,y,z = v.entrada['blip'][1], v.entrada['blip'][2], v.entrada['blip'][3]
		end
	elseif Config.base == "creative" and type(v[1]) == "number" then
		x,y,z = v[1],v[2],v[3]
	elseif Config.base == "vrpex" and v.x then
		x,y,z = v.x,v.y,v.z
	end
	return x,y,z
end

function drawMark(x,y,z)
	DrawBase3D(x,y,z,"garage")
end

--################--
--##  TRYDOORS  ##--
--################--

Citizen.CreateThread(function()
	while true do
		local timeDistance = 1000
		local ped = PlayerPedId()
        if Config.disable_veh_peds then
            if IsPedInAnyVehicle(ped) then
                local vehicle = GetVehiclePedIsUsing(ped)
                local platext = GetVehicleNumberPlateText(vehicle)
                if GetPedInVehicleSeat(vehicle,-1) == ped and not GlobalState["vehPlates"][platext] or GetEntityHealth(ped) <= 101 then
                    SetVehicleEngineOn(vehicle,false,true,true)
                    DisablePlayerFiring(ped,true)
                    timeDistance = 4
                end
            end
		else
			break
        end
		Citizen.Wait(timeDistance)
	end
end)

--#####################--
--##  GET SPAWN CDS  ##--
--#####################--

function GetCoordsFromCam(distance,coords)
	local rotation = GetGameplayCamRot()
	local adjustedRotation = vector3((math.pi / 180) * rotation["x"],(math.pi / 180) * rotation["y"],(math.pi / 180) * rotation["z"])
	local direction = vector3(-math.sin(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.cos(adjustedRotation[3]) * math.abs(math.cos(adjustedRotation[1])),math.sin(adjustedRotation[1]))

	return vector3(coords[1] + direction[1] * distance, coords[2] + direction[2] * distance, coords[3] + direction[3] * distance)
end

function getBlipCoords()
	local ped = PlayerPedId()
	local objectProgress = true
	local aplicationObject = false
	local mHash = GetHashKey("zentorno")

	RequestModel(mHash)
	while not HasModelLoaded(mHash) do
		Citizen.Wait(1)
	end

	local coords = GetEntityCoords(ped)
	local pedHeading = GetEntityHeading(ped)
	local newVehicle = CreateVehicle(mHash,coords["x"],coords["y"],coords["z"],false,false,false)
	SetEntityCollision(newVehicle,false,false)
	SetEntityHeading(newVehicle,pedHeading)
	SetEntityAlpha(newVehicle,100,false)

	while objectProgress do
		local ped = PlayerPedId()
		local cam = GetGameplayCamCoord()
		local handle = StartExpensiveSynchronousShapeTestLosProbe(cam,GetCoordsFromCam(20.0,cam),-1,ped,4)
		local _,_,coords = GetShapeTestResult(handle)
		HideHudComponentThisFrame(19)
		SetEntityCoordsNoOffset(newVehicle,coords["x"],coords["y"],coords["z"]+0.6,1,0,0)

		dwText("~g~F~w~  CANCELAR",4,0.015,0.56,0.38,255,255,255,255)
		dwText("~g~E~w~  CONFIRMAR",4,0.015,0.59,0.38,255,255,255,255)
		dwText("~y~SCROLL UP~w~  GIRA ESQUERDA",4,0.015,0.62,0.38,255,255,255,255)
		dwText("~y~SCROLL DOWN~w~  GIRA DIREITA",4,0.015,0.65,0.38,255,255,255,255)

		if IsControlJustPressed(1,38) then
			aplicationObject = true
			objectProgress = false
		end

		if IsControlJustPressed(1,49) then
			objectProgress = false
		end

		if IsControlJustPressed(1,180) then
			local headObject = GetEntityHeading(newVehicle)
			SetEntityHeading(newVehicle,headObject + 2.5)
		end

		if IsControlJustPressed(1,181) then
			local headObject = GetEntityHeading(newVehicle)
			SetEntityHeading(newVehicle,headObject - 2.5)
		end

		Citizen.Wait(1)
	end

	local headObject = GetEntityHeading(newVehicle)
	local coordsObject = GetEntityCoords(newVehicle)
	local _,GroundZ = GetGroundZFor_3dCoord(coordsObject["x"],coordsObject["y"],coordsObject["z"])

	local newCoords = {
		["x"] = coordsObject["x"],
		["y"] = coordsObject["y"],
		["z"] = GroundZ ~= 0.0 and GroundZ or coordsObject["z"]
	}

	DeleteEntity(newVehicle)

	return aplicationObject,newCoords,headObject
end

function dwText(text,font,x,y,scale,r,g,b,a)
	SetTextFont(font)
	SetTextScale(scale,scale)
	SetTextColour(r,g,b,a)
	SetTextOutline()
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end

--#####################--
--##  Anim Hotwired  ##--
--#####################--

local anim = "machinic_loop_mechandplayer"
local animDict = "anim@amb@clubhouse@tutorial@bkr_tut_ig3@"

function will.startAnimHotwired()
	RequestAnimDict(animDict)
	while not HasAnimDictLoaded(animDict) do
		Citizen.Wait(1)
	end
	TaskPlayAnim(PlayerPedId(),animDict,anim,3.0,3.0,-1,49,5.0,0,0,0)
end

function will.stopAnimHotwired(vehicle)
	RequestAnimDict(animDict)
	while not HasAnimDictLoaded(animDict) do
		Citizen.Wait(1)
	end
	StopAnimTask(PlayerPedId(),animDict,anim,2.0)
	if vehicle ~= nil then
		local netVeh = VehToNet(vehicle)
		SetNetworkIdCanMigrate(netVeh,true)
		SetEntityAsMissionEntity(vehicle,true,false)
		SetVehicleHasBeenOwnedByPlayer(vehicle,true)
		SetVehicleNeedsToBeHotwired(vehicle,false)
	end
end

--#################--
--##  NEW HOMES  ##--
--#################--
-- Evento para utilizar com outros scripts de casas
RegisterNetEvent("will_garages:setHomes")
AddEventHandler("will_garages:setHomes", function(serverHomes)
    for k,v in pairs(serverHomes) do
        for l,w in pairs(v) do
            table.insert(Config.garages, w)
        end
    end
end)

--#####################--
--##  SET MAP BLIPS  ##--
--#####################--

Citizen.CreateThread(function()
    for k, v in pairs(Config.garages) do
		if v.map then
			local x,y,z = table.unpack(v.entrada['blip'])
			local blip = AddBlipForCoord(x,y,z)
			SetBlipSprite(blip, 357)
			SetBlipScale(blip, 0.6)
			SetBlipColour(blip, 14)
			SetBlipDisplay(blip, 4)
			SetBlipAsShortRange(blip, true)

			BeginTextCommandSetBlipName("STRING")
			AddTextComponentString("Garagem")
			EndTextCommandSetBlipName(blip)
			table.insert(createdBlips,blip)
		end
    end
end)

--###################--
--##  SET IMAGENS  ##--
--###################--

function getImage(interior)
    if interior == "Garagem_menor" then
        return "small.png"
	elseif interior == "Garagem_media" then
		return "medium.png"
	elseif interior == "Garagem_maior" then
		return "bigger.png"
	elseif interior == "Garagem_luxo" then
		return "luxe.png"
	elseif interior == "Garagem_gigante" then
		return "huge.png"
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- VEHLIST
-----------------------------------------------------------------------------------------------------------------------------------------
function will.vehList(radius)
	local veh = nil
	local ped = PlayerPedId()
	if IsPedInAnyVehicle(ped) then
		veh = GetVehiclePedIsUsing(ped)
	else
		veh = will.getNearVehicle(radius)
	end
	if veh and IsEntityAVehicle(veh) then
		local vehname = getModelName(veh)
		if vehname then
			local model = GetEntityModel(veh)
			return veh,VehToNet(veh),GetVehicleNumberPlateText(veh),vehname,GetVehicleDoorLockStatus(veh),false,GetVehicleBodyHealth(veh),model,GetVehicleClass(veh)
		end
	end
end

function getModelName(vehicle)
	local vehicleHash = GetEntityModel(vehicle)
	local vehsGlobal = GlobalState['VehicleGlobal']
    for k,v in pairs(vehsGlobal) do
        if GetHashKey(k) == vehicleHash then
            return k
        end
    end
	local vehName = nil
    local AllVehicleModels = GetAllVehicleModels()
	for i = 1, #AllVehicleModels do
		if GetHashKey(AllVehicleModels[i]) == vehicleHash then
			vehName = AllVehicleModels[i]
		end
	end
	if vehName then
		TriggerServerEvent("will_garages_v2:registerVehicle", vehName, GetVehicleType(vehicle))
	end
	return vehName
end

--###############--
--##  EXPORTS  ##--
--###############--

exports('vehList', will.vehList)
exports('getModelName', getModelName)
