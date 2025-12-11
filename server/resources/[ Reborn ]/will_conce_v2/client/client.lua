srv = Tunnel.getInterface('will_conce_v2')

local cam = nil
local actualRbg = {}
local freeCam = false
local inConce = false
local spawnedVehs = {}
local indexConce = nil
local loadedVeh = false
local inTestDrive = false
local ConceVehicles = config.veiculos

local function loadVehicles()
    local AllVehicles = {}
    local AllVehicleModels = GetAllVehicleModels()
    for k,v in pairs(AllVehicleModels) do
        for category, models in pairs(ConceVehicles) do
            if not AllVehicles[category] then AllVehicles[category] = {} end
            for model, _ in pairs(models) do
                if string.lower(v) == string.lower(model) then
                    AllVehicles[category][v] = ConceVehicles[category][model]
                end
            end
        end
    end
    return AllVehicles
end

Citizen.CreateThread(function()
    DoScreenFadeIn(500)
    while true do
        local idle = 500
        if not indexConce then
            checkDistance()
        else
            idle = 1
            local distance = #(GetEntityCoords(PlayerPedId()) - config.conce[indexConce].coord)
            if distance <= 3 then
                mBMarker(config.conce[indexConce].coord, tonumber('0.3'), tonumber('0.3'),tonumber('0.3'), "images", "conce")
                if distance <= 2 and IsControlJustPressed(0,38) then
                    inConce = true
                    -- init_cam(config.conce[indexConce].camCoord)
                    TriggerServerEvent('will_conce_v2:join_dimesion')
                    SetNuiFocus(true,true)
                    ConceVehicles = config.conce[indexConce].vehicles or config.veiculos
                    SendNUIMessage({
                        action = "show",
                        ip = config.ip,
                        vehicles = loadVehicles()
                    })
                end
            else
                if not inConce then
                    indexConce = nil
                end
            end
        end
        Wait(idle)
    end
end)

checkDistance = function()
    for k,v in pairs(config.conce) do
        local distance = #(GetEntityCoords(PlayerPedId()) - v.coord)
        if distance <= 3 then
            indexConce = k
        end
    end
end

-------------------------------------------------------
--- [ CORE - Test Drive ]
-------------------------------------------------------
RegisterNUICallback('spaw_testeDrive',function(data,cb)
    DoScreenFadeOut(1000)
    Wait(1000)
    deleteLastCar() 
    inTestDrive = true
    local model = data.vehicle
    if model then
        local mhash = GetHashKey(model)
        while not HasModelLoaded(mhash) do
            RequestModel(mhash)
            Citizen.Wait(1)
        end
        if HasModelLoaded(mhash) then
	    	tnveh = CreateVehicle(mhash,config.conce[indexConce].testeDrive,config.conce[indexConce].testeDriveHeading,true,true)
            SetPedIntoVehicle(PlayerPedId(),tnveh,-1)
            SetVehicleIsStolen(tnveh,false)
            SetVehicleNeedsToBeHotwired(tnveh,false)
            SetVehicleOnGroundProperly(tnveh)
            SetVehicleNumberPlateText(tnveh,"TESTDRIV")
            TriggerServerEvent('setPlateEveryone',"TESTDRIV")
            SetEntityAsMissionEntity(tnveh,true,true)
            SetVehRadioStation(tnveh,"OFF")
            SetVehicleEngineHealth(tnveh,tonumber('1000.0'))
            SetVehicleBodyHealth(tnveh,tonumber('1000.0'))
            SetVehicleFuelLevel(tnveh,tonumber('100.0'))
            SetModelAsNoLongerNeeded(mhash)
            SetVehicleDoorsLocked(tnveh,4)
            local time = config.conce[indexConce] and config.conce[indexConce].testDriveDuracao or 30
            cb({ time = time })
            Wait(1500)
            DoScreenFadeIn(1000)
            timer_testDrive(time)
        end
    end
end)

timer_testDrive = function(time)
    Citizen.CreateThread(function()
        while true do
            if time > 0 then
                time = time - 1
                if time == 0 then
                    inTestDrive = false
                    DoScreenFadeOut(500)
                    Wait(1000)
                    DeleteEntity(tnveh)
                    SetEntityCoords(PlayerPedId(),config.conce[indexConce].coord)
                    SendNUIMessage({ action = "stopTest" })
                    TriggerServerEvent('will_conce_v2:remove_dimesion')
                    Wait(1500)
                    DoScreenFadeIn(500)
                    break
                end
            end
            Wait(1000)
        end
    end)
end

-------------------------------------------------------
--- [ NuiCallBacks ]
-------------------------------------------------------

RegisterNUICallback('add_stock',function(data,cb)
    srv.addVehStock(data)
end)

RegisterNUICallback('load_vehicle',function(data,cb)
    local model = data.vehicle
    local category = data.actualCategory
    if model and category then
        local mhash = GetHashKey(model)

        while not HasModelLoaded(mhash) do
            RequestModel(mhash)
            Citizen.Wait(1)
        end

        if HasModelLoaded(mhash) then
            deleteLastCar()
            loadedVeh = true
	    	nveh = CreateVehicle(mhash,config.conce[indexConce].spaw_vehicle,138.50,true,true)
            table.insert(spawnedVehs, nveh)
            local plate = "TESTDRIV"
            SetPedIntoVehicle(PlayerPedId(),nveh,-1)
            FreezeEntityPosition(nveh,true)
            SetVehicleIsStolen(nveh,false)
            SetVehicleNeedsToBeHotwired(nveh,false)
            SetVehicleOnGroundProperly(nveh)
            SetVehicleNumberPlateText(nveh,plate)
            TriggerServerEvent('setPlateEveryone',plate)

            SetVehicleDoorsLocked(nveh,4)

            SetEntityAsMissionEntity(nveh,true,true)
            SetVehRadioStation(nveh,"OFF")
            SetVehicleEngineHealth(nveh,1000.0)
            SetVehicleBodyHealth(nveh,1000.0)
            SetVehicleFuelLevel(nveh,0.1)
            SetModelAsNoLongerNeeded(mhash)
            SetVehicleWindowTint(nveh,1)
            SetVehicleDirtLevel(nveh,0.0)

            init_cam(indexConce)

            local horsePower = math.ceil(GetVehicleHandlingFloat(nveh,'CHandlingData','fInitialDriveMaxFlatVel') * GetVehicleHandlingFloat(nveh,'CHandlingData','fInitialDriveForce') * 10)
            local vehMass = math.floor(GetVehicleHandlingFloat(nveh,'CHandlingData','fMass'))
            local aceleration = horsePower / vehMass
            local acelerationTime = (math.ceil(math.sqrt(200/aceleration) * 10) / 100) + 0.6
            if vehMass > 1000 then
                vehMass = tostring(vehMass/1000)..'T'
            else
                vehMass = tostring(vehMass).."KG"
            end
            local seats = GetVehicleModelNumberOfSeats(mhash)
            local name = ConceVehicles[category] and ConceVehicles[category][model] and ConceVehicles[category][model].nome or model
            local price = ConceVehicles[category] and ConceVehicles[category][model] and ConceVehicles[category][model].valor or 5000
            local chest = ConceVehicles[category] and ConceVehicles[category][model] and ConceVehicles[category][model].peso or 40
            cb({
                horsePower = horsePower,
                initialDrive = acelerationTime,
                vehMass = vehMass,
                nome = name,
                seats = seats,
                price = price,
                vip = ConceVehicles[category] and ConceVehicles[category][model] and ConceVehicles[category][model].vip,
                chest = chest
            })
        end
    end
end)
-------------------------------------------------------
--- [ Tuning ]
-------------------------------------------------------
RegisterNUICallback('change_color',function(data,cb)
    local rgb = data.rgb
    local veh = GetVehiclePedIsIn(PlayerPedId())
    if veh and rgb then
        actualRbg = rgb
        SetVehicleCustomPrimaryColour(veh,tonumber(rgb.r),tonumber(rgb.g),tonumber(rgb.b))
        SetVehicleExtraColours(veh,1,0)
    end
end)
-------------------------------------------------------
--- [ Outros ]
-------------------------------------------------------
RegisterNUICallback('chance_cam',function(data,cb)
    SetNuiFocus(false,false)
    freeCam = true
    if cam and (DoesCamExist(cam)) then
        RenderScriptCams(false, false, 0, true, false)
        DestroyCam(cam, false)
        cam = nil
    end
    fix()
end)
-------------------------------------------------------
--- [ BUY VEHICLE ]
-------------------------------------------------------
RegisterNUICallback('buy_vehicle',function(data,cb)
    local model = data.vehicle
    local category = data.category
    local tuning = {
        ['customPcolor'] = { actualRbg.r, actualRbg.g, actualRbg.b }
    }
    if model and category then
        srv.buy_vehicle(category,model,tuning)
    end
end)
-------------------------------------------------------
--- [ RENT VEHICLE ]
-------------------------------------------------------
RegisterNUICallback('rent_vehicle',function(data,cb)
    local model = data.vehicle
    local categoria = data.category
    if model and categoria then
        srv.register_rent(categoria,model)
    end
end)

function fix()
    Citizen.CreateThread(function()
        while freeCam do
            drawTxt("~g~[H]~w~ para voltar",4,0.5,0.93,0.50,255,255,255,120)
            if IsControlJustPressed(0,74) then
                init_cam(indexConce)
                SetNuiFocus(true,true)
                freeCam = false
            end
            Wait(1)
        end
    end)
end

init_cam = function(indexConce)
    local coord = config.conce[indexConce].camCoord
    if cam and (DoesCamExist(cam)) then
        RenderScriptCams(false, false, 0, true, false)
        DestroyCam(cam, false)
        cam = nil
    end
	cam = CreateCam("DEFAULT_SCRIPTED_CAMERA",true)
	SetCamCoord(cam,coord.x,coord.y,coord.z+1)
    PointCamAtCoord(cam,config.conce[indexConce].spaw_vehicle.x,config.conce[indexConce].spaw_vehicle.y,config.conce[indexConce].spaw_vehicle.z+1)
	SetCamActive(cam,true)
    SetCamRot(cam,350.0,0.0,0.0,1)
	RenderScriptCams(true,false,cam,false,false)
end

function deleteLastCar()
    for i,v in pairs(spawnedVehs) do
       if DoesEntityExist(v) then
          DeleteEntity(v)
          table.remove(spawnedVehs, i)
       end
    end
    if vehicle and DoesEntityExist(vehicle) then
        DeleteEntity(vehicle)
        vehicle = nil
    end
end

RegisterNUICallback('close',function()
    if not loadedVeh then
        SetNuiFocus(false,false)
        TriggerServerEvent('will_conce_v2:remove_dimesion')
        return
    end
    DoScreenFadeOut(1000)
    Wait(1000)
    if nveh then
        DeleteEntity(nveh)
    end
    if cam and (DoesCamExist(cam)) then
        RenderScriptCams(false, false, 0, true, false)
        DestroyCam(cam, false)
        cam = nil
    end
    SetNuiFocus(false,false)
    if not inTestDrive then
        TriggerServerEvent('will_conce_v2:remove_dimesion')
        SetEntityCoords(PlayerPedId(),config.conce[indexConce].coord)
        inConce = false
    end
    loadedVeh = false
    Wait(500)
    DoScreenFadeIn(500)
end)

RegisterNetEvent("will_conce_v2:openAdmin")
AddEventHandler("will_conce_v2:openAdmin",function()
    SetNuiFocus(true,true)
    SendNUIMessage({ action = "admMenu" })
end)

function drawTxt(text,font,x,y,scale,r,g,b,a)
	SetTextFont(font)
	SetTextScale(scale,scale)
	SetTextColour(r,g,b,a)
	SetTextOutline()
	SetTextCentre(1)
	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x,y)
end

RegisterNUICallback('change_user_veh',function(data)
    srv.changeUserVeh(data)
end)
