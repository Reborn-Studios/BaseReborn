isPrice = 0
lastFuel = 0
vehFuels = {}
isFuel = false
showNui = false
allShops = GlobalState['Will_Shops'] or {}
lastVeh = nil
local gameTimer = GetGameTimer()
local vehClass = {
	[13] = 0.0,
	[14] = 0.0,
	[15] = 2.5,
	[21] = 0.0
}

AddStateBagChangeHandler("Will_Shops", nil,function(bagName,_,value)
    allShops = value
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- MAIN THREADS
-----------------------------------------------------------------------------------------------------------------------------------------
local function getClosestBlip()
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	local closestBlip = nil
	local closestDistance = 6.0
	for k,v in pairs(allShops) do
		local jobDis = #(coords - v['job_coords']) < closestDistance
		local shopDis = #(coords - v['buy_products_coords']) < closestDistance
		local managmentDis = #(coords - v['managment_coords']) < closestDistance
		if shopDis or managmentDis or jobDis then
			closestDistance = shopDis and #(coords - v['buy_products_coords']) or managmentDis and #(coords - v['managment_coords']) or jobDis and #(coords - v['job_coords'])
			closestBlip = k
		end
	end
	return closestBlip
end

CreateThread(function()
	SetNuiFocus(false, false)
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		local coords = GetEntityCoords(ped)
		local closestShop = getClosestBlip()
		if closestShop then
			local v = allShops[closestShop]
			local managmentDis = #(coords - v['managment_coords'])
			local shopDis = #(coords - v['buy_products_coords'])
			local jobDis = #(coords - v['job_coords'])
			if managmentDis <= 2.0 then
				timeDistance = 4
				DrawText3D(v['managment_coords'].x,v['managment_coords'].y,v['managment_coords'].z,"~g~[E]~w~ Gerenciamento")
				if IsControlJustPressed(0,38) then
					openManagment(closestShop)
				end
			elseif shopDis <= 6.0 then
				timeDistance = 4
				if closestShop:find("Conveniencia") then
					DrawBase3D(v['buy_products_coords'].x,v['buy_products_coords'].y,v['buy_products_coords'].z,"department")
				elseif closestShop:find("Ammunation") then
					DrawBase3D(v['buy_products_coords'].x,v['buy_products_coords'].y,v['buy_products_coords'].z,"ammunation")
				else
					DrawText3D(v['buy_products_coords'].x,v['buy_products_coords'].y,v['buy_products_coords'].z,"~g~[E]~w~ Abrir loja")
				end
				if IsControlJustPressed(0,38) and shopDis <= 2 then
					if GetResourceState("ox_inventory") ~= "started" then
						openShop(closestShop)
					else
						exports.ox_inventory:openInventory('shop', { type = closestShop, id = 1 })
					end
				end
			elseif jobDis <= 2.0 then
				timeDistance = 4
				DrawText3D(v['job_coords'].x,v['job_coords'].y,v['job_coords'].z,"~g~[E]~w~ Emprego")
				if IsControlJustPressed(0,38) then
					checkShopJobs(closestShop)
				end
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- CREATE BOX
-----------------------------------------------------------------------------------------------------------------------------------------
function createBox()
    if Config.base == "creative" or Config.base == "summerz" then
        vRP.createObjects("anim@heists@box_carry@","idle","hei_prop_heist_box",50,28422)
	elseif Config.base == "cn" then
        vRP.CreateObjects("anim@heists@box_carry@","idle","hei_prop_heist_box",50,28422)
	else
        vRP._CarregarObjeto("anim@heists@box_carry@","idle","hei_prop_heist_box",50,28422)
    end
end

function removeObjects()
    if Config.base == "creative" or Config.base == "summerz" then	
		vRP.removeObjects()
	elseif Config.base == "cn" then
		vRP.Destroy()
	else
		vRP._DeletarObjeto()
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- WORKS THREADS - PRODUCTS
-----------------------------------------------------------------------------------------------------------------------------------------
function startThreadInWork(destiny, id, quantity, shop)
    local collected = 0
    local withBox = false
    local totalQuantity = quantity
    local newQuantity = parseInt(quantity / 5)
	addBlipCoords("Mercadoria", destiny)

    CreateThread(function()
        while inWork and quantity > 0 do
            local ped = PlayerPedId()
            local coords = GetEntityCoords(ped)
            local timeDistance = 500
            if not withBox then
                local distance = #(coords - vector3(destiny.x, destiny.y, destiny.z))
                if distance <= 10 then
                    timeDistance = 4
                    DrawMarker(23,destiny.x, destiny.y, destiny.z-0.95,0,0,0,0,0,0,2.0,2.0,1.0,240,203,88,250,0,0,0,0)
                    if distance <= 2 and not IsPedInAnyVehicle(ped) then
                        DrawText3D(destiny.x, destiny.y, destiny.z,"~g~[E]~w~ Coletar mercadoria")
                        if IsControlJustPressed(0,38) then
                            withBox = true
                            SetVehicleDoorOpen(workVeh, 6, true, false)
							async(function()
								createBox()
							end)
                        end
                    end
                end
            else
                local coordsVeh = GetEntityCoords(workVeh)
                local distance = #(coords - coordsVeh)
                
                if distance <= 5 then
                    timeDistance = 4
                    DrawText3D(coordsVeh.x, coordsVeh.y, coordsVeh.z,"~g~[E]~w~ Guardar mercadoria")
                    if IsControlJustPressed(0,38) then
                        withBox = false
						async(function()
							removeObjects()
						end)
                        collected = collected + newQuantity
                        if collected == totalQuantity then
                            quantity = 0
                        elseif collected + newQuantity >= totalQuantity then
                            newQuantity = collected - totalQuantity
                            quantity = 0
                        end
                    end
                end
            end
            Wait(timeDistance)
        end
		TriggerEvent(Config.Notify['NotifyEvent'], Config.Notify['NotifyTypes']['Warning'],"Volte a loja para entregar os produtos!",5000)
        if DoesBlipExist(workBlip) then
            RemoveBlip(workBlip)
        end
        endOfWork(shop, id)
    end)
end

function startWorkFuel(destiny, id, shop, data)
	local nearVeh = GetClosestVehicle(destiny.x, destiny.y, destiny.z,1.701,0,71)
    if nearVeh == 0 then
		addBlipCoords(data['name'], data['destiny'])
		while #(GetEntityCoords(PlayerPedId()) - vector3(destiny.x, destiny.y, destiny.z)) > 50 do
			Wait(3000)
		end
		local vHash = GetHashKey("tanker")
		loadModel(vHash)
		local tanker = CreateVehicle(vHash, destiny.x, destiny.y, destiny.z, destiny.w, true, false)
		local tankAttached = false
		CreateThread(function()
			while inWork and not tankAttached do
				local ped = PlayerPedId()
				local coords = GetEntityCoords(ped)
				local timeDistance = 500
				local distance = #(coords - vector3(destiny.x, destiny.y, destiny.z))
				if distance <= 20 then
					timeDistance = 4
					DrawMarker(23,destiny.x, destiny.y, destiny.z-0.95,0,0,0,0,0,0,5.0,5.0,1.0,20,203,88,250,0,0,0,0)
					if IsEntityAttachedToEntity(tanker, workVeh) then
						tankAttached = true
					end
				end
				Wait(timeDistance)
			end
			if DoesBlipExist(workBlip) then
				RemoveBlip(workBlip)
			end
			endOfWork(shop, id)
		end)
	else
        TriggerEvent(Config.Notify['NotifyEvent'], Config.Notify['NotifyTypes']['Denied'],"Já possui um veiculo na vaga!",5000)
		Wait(5000)
		local deliveryCoords = Config.deliveryCoords["fuel"]
		local rand = math.random(1, #deliveryCoords)
		local destiny = deliveryCoords[rand]
		local newDestiny = vector4(destiny[1],destiny[2],destiny[3],destiny[4] or 0.0)
		startWorkFuel(newDestiny, id, shop, data)
	end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- GAMEEVENTTRIGGERED
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("gameEventTriggered",function(eventName,args)
	if eventName == "CEventNetworkPlayerEnteredVehicle" then
		if args[1] == PlayerId() then
			local vehPlate = GetVehicleNumberPlateText(args[2])
			if vehPlate then
				vehFuels[vehPlate] = Entity(args[2]).state['fuel'] or vSERVER.vehicleFuel(vehPlate)
			end
		end
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- FLOOR
-----------------------------------------------------------------------------------------------------------------------------------------
function floor(num)
	local mult = 10 ^ 1
	return math.floor(num * mult + 0.5) / mult
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSUMEFUEL
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	SetNuiFocus(false,false)
	while true do
		local timeDistance = 1999
		local ped = PlayerPedId()
		if IsPedInAnyVehicle(ped) then
			local vehicle = GetVehiclePedIsUsing(ped)
			local speed = GetEntitySpeed(vehicle) * 2.236936
			if GetVehicleFuelLevel(vehicle) >= 1 then
				if speed >= 1 then
					local vehPlate = GetVehicleNumberPlateText(vehicle)
					if vehFuels[vehPlate] ~= nil then
						local vehClasses = GetVehicleClass(vehicle)
						vehFuels[vehPlate] = (vehFuels[vehPlate] - (floor(GetVehicleCurrentRpm(vehicle)) or 1.0) * (vehClass[vehClasses] or 1.0) / 10)
						SetVehicleFuelLevel(vehicle,vehFuels[vehPlate])
						Entity(vehicle).state:set("fuel", vehFuels[vehPlate], true)
					end
					if GetPedInVehicleSeat(vehicle,-1) == ped then
						TriggerServerEvent("engine:tryFuel",vehPlate,vehFuels[vehPlate])
					end
				end
			else
				SetVehicleEngineOn(vehicle,false,true,true)
				timeDistance = 1
			end
		end
		Wait(timeDistance)
	end
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THRED FUEL
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while true do
		local timeDistance = 999
		local ped = PlayerPedId()
		if not IsPedInAnyVehicle(ped) and GetResourceState("ox_inventory") ~= "started" then
			if GetSelectedPedWeapon(ped) == 883325847 then
				local vehicle = GetPlayersLastVehicle()
				if DoesEntityExist(vehicle) then
					local coords = GetEntityCoords(ped)
					local coordsVeh = GetEntityCoords(vehicle)
					local vehFuel = GetVehicleFuelLevel(vehicle)
					local vehPlate = GetVehicleNumberPlateText(vehicle)
					local distance = #(coords - vector3(coordsVeh["x"],coordsVeh["y"],coordsVeh["z"]))
					if distance <= 3.5 then

						if not isFuel then
							timeDistance = 4
							if GetAmmoInPedWeapon(ped,883325847) - 0.02 * 100 <= 1 then
								DrawText3D(coordsVeh["x"],coordsVeh["y"],coordsVeh["z"] + 1,"~b~GALÃO VAZIO")
							elseif vehFuel < 100.0 then
								DrawText3D(coordsVeh["x"],coordsVeh["y"],coordsVeh["z"] + 1,"~g~E~w~   ABASTECER")
							end
						else
							if GetAmmoInPedWeapon(ped,883325847) - 0.02 * 100 > 1 then
								timeDistance = 4
								SetPedAmmo(ped,883325847,math.floor(GetAmmoInPedWeapon(ped,883325847) - 0.01 * 100))

								SetVehicleFuelLevel(vehicle,vehFuel + 0.005)
								DrawText3D(coordsVeh["x"],coordsVeh["y"],coordsVeh["z"] + 1,"~g~E~w~   CANCELAR")
								DrawText3D(coordsVeh["x"],coordsVeh["y"],coordsVeh["z"] + 0.85,"TANQUE: ~y~"..parseInt(floor(vehFuel)).."%   ~w~GALÃO: ~y~"..parseInt(GetAmmoInPedWeapon(ped,883325847) / 4500 * 100).."%")

								if not IsEntityPlayingAnim(ped,"timetable@gardener@filling_can","gar_ig_5_filling_can",3) then
									TaskPlayAnim(ped,"timetable@gardener@filling_can","gar_ig_5_filling_can",3.0,3.0,-1,50,0,0,0,0)
								end

								if vehFuel >= 100.0 or GetAmmoInPedWeapon(ped,883325847) - 0.02 * 100 <= 1 or GetEntityHealth(ped) <= 101 then
									TriggerServerEvent("engine:tryFuel",vehPlate,vehFuel)
									StopAnimTask(ped,"timetable@gardener@filling_can","gar_ig_5_filling_can",2.0)
									RemoveAnimDict("timetable@gardener@filling_can")
									isFuel = false
								end
							end
						end

						if IsControlJustPressed(1,38) and GetGameTimer() >= gameTimer and MumbleIsConnected() then
							gameTimer = GetGameTimer() + 3000

							if isFuel then
								TriggerServerEvent("engine:tryFuel",vehPlate,vehFuel)
								StopAnimTask(ped,"timetable@gardener@filling_can","gar_ig_5_filling_can",2.0)
								RemoveAnimDict("timetable@gardener@filling_can")
								isFuel = false
							else
								if GetAmmoInPedWeapon(ped,883325847) - 0.02 * 100 >= 0 and vehFuel <= 100.0 then
									TaskTurnPedToFaceEntity(ped,vehicle,5000)
									loadAnim("timetable@gardener@filling_can")
									TaskPlayAnim(ped,"timetable@gardener@filling_can","gar_ig_5_filling_can",3.0,3.0,-1,50,0,0,0,0)
									isFuel = true
								end
							end
						end
					end

					if isFuel and distance > 3.5 then
						TriggerServerEvent("engine:tryFuel",vehPlate,vehFuel)
						StopAnimTask(ped,"timetable@gardener@filling_can","gar_ig_5_filling_can",2.0)
						RemoveAnimDict("timetable@gardener@filling_can")
						isFuel = false
					end
				end
			end

			if isFuel then
				DisableControlAction(1,18,true)
				DisableControlAction(1,22,true)
				DisableControlAction(1,23,true)
				DisableControlAction(1,24,true)
				DisableControlAction(1,29,true)
				DisableControlAction(1,30,true)
				DisableControlAction(1,31,true)
				DisableControlAction(1,140,true)
				DisableControlAction(1,142,true)
				DisableControlAction(1,143,true)
				DisableControlAction(1,257,true)
				DisableControlAction(1,263,true)
			end
		end

		Wait(timeDistance)
	end
end)

local fuelTypes = { "prop_gas_pump_1a", "prop_gas_pump_1b", "prop_gas_pump_1c", "prop_gas_pump_1d", "prop_gas_pump_old2", "prop_gas_pump_old3", "prop_vintage_pump" }
local nozzleDropped = false
local holdingNozzle = false
local nozzleInVehicle = false
local nozzle
local rope
local pumpCoords
local tankBone
local nozzleBasedOnClass = {
    0.65, -- Compacts
    0.65, -- Sedans
    0.85, -- SUVs
    0.6, -- Coupes
    0.55, -- Muscle
    0.6, -- Sports Classics
    0.6, -- Sports
    0.55, -- Super
    0.12, -- Motorcycles
    0.8, -- Off-road
    0.7, -- Industrial
    0.6, -- Utility
    0.7, -- Vans
    0.0, -- Cycles
    0.0, -- Boats
    0.0, -- Helicopters
    0.0, -- Planes
    0.6, -- Service
    0.65, -- Emergency
    0.65, -- Military
    0.75, -- Commercial
    0.0 -- Trains
}

local function getClosestShop(coords)
	for shop,v in pairs(allShops) do
		if v.shopDifference and type(v.shopDifference) == "string" and v.shopDifference == "fuelSystem" then
			if #(v.buy_products_coords - coords) <= 20 then
				return shop
			end
		end
	end
	return nil
end

function LoadAnimDict(dict)
	if not HasAnimDictLoaded(dict) then
		RequestAnimDict(dict)
		while not HasAnimDictLoaded(dict) do
			Wait(1)
		end
	end
end

function PlayEffect(pdict, pname)
    CreateThread(function()
        local position = GetOffsetFromEntityInWorldCoords(nozzle, 0.0, 0.28, 0.17)
        UseParticleFxAssetNextCall(pdict)
        local pfx = StartParticleFxLoopedAtCoord(pname, position.x, position.y, position.z, 0.0, 0.0, GetEntityHeading(nozzle), 1.0, false, false, false, false)
        Wait(100)
        StopParticleFxLooped(pfx, 0)
    end)
end

local function vehicleInFront()
	local ped = PlayerPedId()
    local offset = GetOffsetFromEntityInWorldCoords(ped, 0.0, 2.0, 0.0)
	local pedCoords = GetEntityCoords(ped)
    local rayHandle = CastRayPointToPoint(pedCoords.x, pedCoords.y, pedCoords.z - 1.3, offset.x, offset.y, offset.z, 10, ped, 0)
    local A, B, C, D, entity = GetRaycastResult(rayHandle)
    if IsEntityAVehicle(entity) then
        return entity
    end
end

local function grabNozzleFromPump(pump,pumpHandle)
	local ped = PlayerPedId()
    LoadAnimDict("anim@am_hold_up@male")
    TaskPlayAnim(ped, "anim@am_hold_up@male", "shoplift_high", 2.0, 8.0, -1, 50, 0, 0, 0, 0)
    Wait(300)
    nozzle = CreateObject(`prop_cs_fuel_nozle`, 0, 0, 0, true, true, true)
    AttachEntityToEntity(nozzle, ped, GetPedBoneIndex(ped, 0x49D9), 0.11, 0.02, 0.02, -80.0, -90.0, 15.0, true, true, false, true, 1, true)
    RopeLoadTextures()
    while not RopeAreTexturesLoaded() do
        Wait(0)
    end
    rope = AddRope(pump.x, pump.y, pump.z, 0.0, 0.0, 0.0, 3.0, 1, 1000.0, 0.0, 1.0, false, false, false, 1.0, true)
    while not rope do
        Wait(0)
    end
    ActivatePhysics(rope)
    Wait(50)
    local nozzlePos = GetEntityCoords(nozzle)
    nozzlePos = GetOffsetFromEntityInWorldCoords(nozzle, 0.0, -0.033, -0.195)
    AttachEntitiesToRope(rope, pumpHandle, nozzle, pump.x, pump.y, pump.z + 1.45, nozzlePos.x, nozzlePos.y, nozzlePos.z, 5.0, false, false, nil, nil)
    nozzleDropped = false
    holdingNozzle = true
    nozzleInVehicle = false
end

local function grabExistingNozzle()
	local ped = PlayerPedId()
    AttachEntityToEntity(nozzle, ped, GetPedBoneIndex(ped, 0x49D9), 0.11, 0.02, 0.02, -80.0, -90.0, 15.0, true, true, false, true, 1, true)
    nozzleDropped = false
    holdingNozzle = true
    nozzleInVehicle = false
end

local function putNozzleInVehicle(vehicle, ptankBone, isBike, dontClear, newTankPosition)
    if isBike then
        AttachEntityToEntity(nozzle, vehicle, ptankBone, 0.0 + newTankPosition.x, -0.2 + newTankPosition.y, 0.2 + newTankPosition.z, -80.0, 0.0, 0.0, true, true, false, false, 1, true)
    else
        AttachEntityToEntity(nozzle, vehicle, ptankBone, -0.18 + newTankPosition.x, 0.0 + newTankPosition.y, 0.75 + newTankPosition.z, -125.0, -90.0, -90.0, true, true, false, false, 1, true)
    end
    if not dontClear and IsEntityPlayingAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 3) then
        ClearPedTasks(ped)
    end
    nozzleDropped = false
    holdingNozzle = false
    nozzleInVehicle = true
end

local function dropNozzle()
    DetachEntity(nozzle, true, true)
    nozzleDropped = true
    holdingNozzle = false
    nozzleInVehicle = false
    SendNUIMessage({ fuel = false })
	showNui = false
	isFuel = false
	isPrice = 0
	litros = 0
	ClearPedTasks(PlayerPedId())
end

local function returnNozzleToPump()
    DeleteEntity(nozzle)
    RopeUnloadTextures()
    DeleteRope(rope)
    nozzleDropped = false
    holdingNozzle = false
    nozzleInVehicle = false
    SendNUIMessage({ fuel = false })
	showNui = false
	isFuel = false
	isPrice = 0
	litros = 0
end

AddEventHandler("onResourceStop",function(resourceName)
	if resourceName == GetCurrentResourceName() then
		if DoesEntityExist(nozzle) then
			DeleteEntity(nozzle)
			DeleteRope(rope)
		end
	end
end)

CreateThread(function()
	local litros = 0
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		local coords = GetEntityCoords(ped)
		local objCds = nil
		local shop = nil
		local object = nil
		for k,pump in ipairs(fuelTypes) do
			object = GetClosestObjectOfType(coords,6.0,GetHashKey(pump),0,0,0)
			if object and DoesEntityExist(object) then
				objCds = GetEntityCoords(object)
				shop = getClosestShop(objCds)
				break
			end
		end
		if object and objCds then
			local distance = #(coords - objCds)
			if distance <= 6.0 then
				timeDistance = 4
				if not holdingNozzle and not nozzleInVehicle and not nozzleDropped and distance <= 2.0 then
					DrawText3D(objCds.x, objCds.y, objCds.z + 0.5, "~g~[E]~w~ Pegar bocal")
					if IsControlJustPressed(0, 51) then
						grabNozzleFromPump(objCds,object)
						Wait(1000)
						ClearPedTasks(ped)
					end
				elseif holdingNozzle and not nozzleInVehicle and distance <= 2.0 then
					DrawText3D(objCds.x, objCds.y, objCds.z + 1.2, "~g~[E]~w~ Retornar bocal")
					if IsControlJustPressed(0, 51) then
						LoadAnimDict("anim@am_hold_up@male")
						TaskPlayAnim(ped, "anim@am_hold_up@male", "shoplift_high", 2.0, 8.0, -1, 50, 0, 0, 0, 0)
						Wait(300)
						returnNozzleToPump()
						Wait(1000)
						ClearPedTasks(ped)
					end
				end
				if holdingNozzle or nozzleInVehicle or nozzleDropped then
					if nozzle and pumpCoords then
						nozzleLocation = GetEntityCoords(nozzle)
						if #(nozzleLocation - objCds) > 6.0 then
							dropNozzle()
						elseif #(objCds - coords) > 50.0 then
							returnNozzleToPump()
						end
					end
					local veh = vehicleInFront()
					if DoesEntityExist(veh) and not IsPedInAnyVehicle(ped,false) and GetSelectedPedWeapon(ped) ~= 883325847 then
						if nozzle then
							DisableControlAction(0, 25, true)
							DisableControlAction(0, 24, true)
							if IsDisabledControlPressed(0, 24) then
								if veh and tankPosition and #(coords - tankPosition) < 1.2 then
									if not IsEntityPlayingAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 3) then
										LoadAnimDict("timetable@gardener@filling_can")
										TaskPlayAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 2.0, 8.0, -1, 50, 0, 0, 0, 0)
									end
								else
									if IsEntityPlayingAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 3) then
										ClearPedTasks(ped)
									end
									if nozzleLocation then
										PlayEffect("core", "veh_trailer_petrol_spray")
									end
								end
							else
								if IsEntityPlayingAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 3) then
									ClearPedTasks(ped)
								end
							end
						end

						local vehClass = GetVehicleClass(veh)
						local zPos = nozzleBasedOnClass[vehClass + 1]
						local isBike = false
						local nozzleModifiedPosition = {
							x = 0.0,
							y = 0.0,
							z = 0.0
						}
						local textModifiedPosition = {
							x = 0.0,
							y = 0.0,
							z = 0.0
						}

						if vehClass == 8 and vehClass ~= 13 then
							tankBone = GetEntityBoneIndexByName(veh, "petrolcap")
							if tankBone == -1 then
								tankBone = GetEntityBoneIndexByName(veh, "petroltank")
							end
							if tankBone == -1 then
								tankBone = GetEntityBoneIndexByName(veh, "engine")
							end
							isBike = true
						elseif vehClass ~= 13 then
							tankBone = GetEntityBoneIndexByName(veh, "petrolcap")
							if tankBone == -1 then
								tankBone = GetEntityBoneIndexByName(veh, "petroltank_l")
							end
							if tankBone == -1 then
								tankBone = GetEntityBoneIndexByName(veh, "hub_lr")
							end
							if tankBone == -1 then
								tankBone = GetEntityBoneIndexByName(veh, "handle_dside_r")
								nozzleModifiedPosition.x = 0.1
								nozzleModifiedPosition.y = -0.5
								nozzleModifiedPosition.z = -0.6
								textModifiedPosition.x = 0.55
								textModifiedPosition.y = 0.1
								textModifiedPosition.z = -0.2
							end
						end
						tankPosition = GetWorldPositionOfEntityBone(veh, tankBone)
						local vehFuel = GetVehicleFuelLevel(veh)
						local vehPlate = GetVehicleNumberPlateText(veh)
						if tankPosition and #(coords - tankPosition) < 1.2 and vehFuel < 100.0 then
							if not nozzleInVehicle and holdingNozzle then
								nearTank = true
								DrawText3D(tankPosition.x + textModifiedPosition.x, tankPosition.y + textModifiedPosition.y, tankPosition.z + zPos + textModifiedPosition.z, "~g~[E]~w~ Colocar bocal")
								if IsControlJustPressed(0, 51) then
									LoadAnimDict("timetable@gardener@filling_can")
									TaskPlayAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 2.0, 8.0, -1, 50, 0, 0, 0, 0)
									Wait(300)
									putNozzleInVehicle(veh, tankBone, isBike, true, nozzleModifiedPosition)
									if not showNui then
										SendNUIMessage({ fuel = true })
										showNui = true
									end
									lastFuel = vehFuel
									lastVeh = veh
									isFuel = true
								end
							elseif nozzleInVehicle then
								DrawText3D(tankPosition.x + textModifiedPosition.x, tankPosition.y + textModifiedPosition.y, tankPosition.z + zPos + textModifiedPosition.z, "~g~[E]~w~ Pegar bocal")
								if IsControlJustPressed(0, 51) then
									LoadAnimDict("timetable@gardener@filling_can")
									TaskPlayAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 2.0, 8.0, -1, 50, 0, 0, 0, 0)
									Wait(300)
									grabExistingNozzle()
									if isFuel then
										if vSERVER.paymentFuel(isPrice,vehPlate,vehFuel,shop,isPrice * 4) then
											TriggerServerEvent("engine:tryFuel",vehPlate,vehFuel)
											vehFuels[vehPlate] = vehFuel
										else
											TriggerServerEvent("engine:tryFuel",vehPlate,lastFuel)
											vehFuels[vehPlate] = lastFuel
										end
										SetVehicleFuelLevel(veh,vehFuels[vehPlate])
										Entity(veh).state:set("fuel", vehFuels[vehPlate], true)
									end
									Wait(300)
									ClearPedTasks(ped)
								end
							end
						end

						if nozzleInVehicle then
							local fuelPrice = 0.025
							if shop then
								fuelPrice = allShops[shop]['products']['fuel']
							end
							isPrice = isPrice + fuelPrice
							SetVehicleFuelLevel(veh,vehFuel + 0.025)
							litros = litros + 0.02
							SendNUIMessage({ tank = parseInt(floor(vehFuel)), price = parseInt(isPrice), lts = litros })

							if vehFuel >= 100.0 or GetEntityHealth(ped) <= 101 then
								if vSERVER.paymentFuel(isPrice,vehPlate,100.0,shop,litros) then
									TriggerServerEvent("engine:tryFuel",vehPlate,100.0)
									vehFuels[vehPlate] = 100.0
								else
									TriggerServerEvent("engine:tryFuel",vehPlate,lastFuel)
									vehFuels[vehPlate] = lastFuel
								end
								SetVehicleFuelLevel(veh,vehFuels[vehPlate])
								Entity(veh).state:set("fuel", vehFuels[vehPlate], true)
								ClearPedTasks(ped)
								SendNUIMessage({ fuel = false })
								grabExistingNozzle()
							end
						end
					else
						if isFuel and nozzleInVehicle and #(coords - tankPosition) > 3.0 and lastVeh then
							SetVehicleFuelLevel(lastVeh,lastFuel)
							Entity(lastVeh).state:set("fuel", lastFuel, true)
							returnNozzleToPump()
						end
					end
				end
			elseif holdingNozzle or nozzleInVehicle then
				returnNozzleToPump()
			end
		end
		Wait(timeDistance)
	end
end)

RegisterNetEvent("engine:syncFuel")
AddEventHandler("engine:syncFuel",function(vehPlate,vehResult)
	vehFuels[vehPlate] = vehResult
end)
-----------------------------------------------------------------------------------------------------------------------------------------
-- THRED SKINSHOPS
-----------------------------------------------------------------------------------------------------------------------------------------
function skinshopThread(locs,shop)
	CreateThread(function()
		while true do
			local timeDistance = 500
			local ped = PlayerPedId()
			local coords = GetEntityCoords(ped)
			for k,v in pairs(locs) do
				local distance = #(coords - vector3(v[1],v[2],v[3]))
				if distance <= 5 then
					timeDistance = 4
					DrawBase3D(v[1],v[2],v[3],"clothes")
					if IsControlJustPressed(1,38) then
						timeDistance = 1000
						TriggerEvent("will_skinshop:openShop",shop)
					end
				end
			end
			Wait(timeDistance)
		end
	end)
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- STOP WORK
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
    while true do
        local timeDistance = 500
        if inWork then
            timeDistance = 4
            drawTxt()
            if IsControlJustPressed(0,168) then
                offWork()
            end
        end
        Wait(timeDistance)
    end
end)

function drawTxt()
	SetTextFont(4)
	SetTextScale(0.40,0.40)
	SetTextColour(255,255,255,180)
	SetTextOutline()
	SetTextCentre(1)
	SetTextEntry("STRING")
	AddTextComponentString("~w~PRESSIONE~r~  F7  ~w~PARA FINALIZAR O TRABALHO")
	DrawText(0.25,0.97)
end

function offWork()
    if inWork then
        if workBlip and DoesBlipExist(workBlip) then
            RemoveBlip(workBlip)
        end
        if DoesEntityExist(workVeh) then
            vSERVER.cancelJob(VehToNet(workVeh))
        end
        inWork = false
    end
end
-----------------------------------------------------------------------------------------------------------------------------------------
-- DRAWTEXT3D
-----------------------------------------------------------------------------------------------------------------------------------------
function DrawText3D2(x,y,z, text)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    SetTextScale(0.45, 0.45)
    SetTextFont(6)
    SetTextProportional(true)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(text)
    DrawText(_x,_y)
end

function DrawText3D(x,y,z,text)
	local onScreen,_x,_y = World3dToScreen2d(x,y,z)
	SetTextFont(4)
	SetTextScale(0.35,0.35)
	SetTextColour(255,255,255,200)
	SetTextEntry("STRING")
	SetTextCentre(1)
	AddTextComponentString(text)
	DrawText(_x,_y)
	local factor = (string.len(text))/350
	DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,100)
end

function loadAnim(dict)
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
		RequestAnimDict(dict)
		Wait(10)
	end
end

function loadModel(model)
	RequestModel(model)
	while not HasModelLoaded(model) do
		Wait(10)
	end
end

function addBlipCoords(name, coords)
    workBlip = AddBlipForCoord(coords.x, coords.y, coords.z)
    SetBlipSprite(workBlip,1)
	SetBlipColour(workBlip,84)
	SetBlipScale(workBlip,0.4)
	SetBlipAsShortRange(workBlip,false)
	SetBlipRoute(workBlip,true)
	BeginTextCommandSetBlipName("STRING")
    AddTextComponentString(name)
    EndTextCommandSetBlipName(workBlip)
end
