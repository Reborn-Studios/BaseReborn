local pedHashs = {
    "ig_abigail",
    "u_m_y_abner",
    "a_m_o_acult_02",
    "a_m_m_afriamer_01",
    "csb_mp_agent14",
    "csb_agent",
    "u_m_m_aldinapoli",
    "ig_amandatownley",
    "ig_andreas",
    "u_m_y_antonb",
    "csb_anita",
    "cs_andreas",
    "ig_ashley",
    "s_m_m_autoshop_01",
    "ig_money",
    "g_m_y_ballaeast_01",
    "g_m_y_ballaorig_01",
    "g_f_y_ballas_01",
    "u_m_y_babyd",
    "ig_barry",
    "s_m_y_barman_01",
    "u_m_y_baygor",
    "a_f_y_beach_01",
    "a_f_y_bevhills_02",
    "a_f_y_bevhills_01",
    "u_m_y_burgerdrug_01",
    "a_m_m_business_01",
    "a_f_m_business_02",
    "a_m_y_business_02",
    "ig_car3guy1",
    "ig_chef2",
    "g_m_m_chigoon_02",
    "g_m_m_chigoon_01",
    "ig_claypain",
    "ig_clay",
    "a_f_m_eastsa_01"
}
--######################--
--##  JOBS FUNCTIONS  ###--
--######################--

RegisterNetEvent("will_jobs:initGarbageman",function()
    
    function JobFunctions:collectItem()
        createObjects("missfbi4prepp1","_bag_pickup_garbage_man")
        Wait(1000)
        createObjects("missfbi4prepp1","_bag_walk_garbage_man","prop_cs_street_binbag_01",49,0x6F06)
        if jobVehicle and DoesEntityExist(jobVehicle) then
            local withBag = true
            while withBag do
                local timeDistance = 500
                local jobVehCds = GetOffsetFromEntityInWorldCoords(jobVehicle, 0.0,-4.5,0.5)
                if #(GetEntityCoords(PlayerPedId()) - jobVehCds) <= 2.0 then
                    timeDistance = 4
                    DrawText3D(jobVehCds.x, jobVehCds.y, jobVehCds.z, "~b~[E]~w~ Colocar")
                    if IsControlJustPressed(0,38) then
                        withBag = false
                        self:deliveryItem()
                    end
                end
                Wait(timeDistance)
            end
        end
    end

    function JobFunctions:deliveryItem()
        removeActived()
        createObjects("missfbi4prepp1","_bag_throw_garbage_man")
        DetachEntity(object, true, false)
        DeleteEntity(object)
        Wait(2000)
        removeObjects()
        paymentMethod()
    end
end)

RegisterNetEvent("will_jobs:initTaxi",function()
    local passageiro = nil

    function JobFunctions:collectItem()
        local vehicle = GetVehiclePedIsIn(PlayerPedId())
        local vehConfig = Config.jobs[actualJob].vehicleConfig
        if vehicle and IsVehicleModel(vehicle,GetHashKey(vehConfig.vehicle)) then
            FreezeEntityPosition(vehicle,true)
            local pedRand = pedHashs[math.random(#pedHashs)]
            passageiro = spawnPed(pedRand, {locs[1].xp,locs[1].yp,locs[1].zp})
            SetEntityInvincible(passageiro,true)
            TaskEnterVehicle(passageiro,vehicle,-1,2,1.0,1,0)
            if DoesEntityExist(passageiro) then
                while true do
                    Wait(4)
                    local x2,y2,z2 = table.unpack(GetEntityCoords(passageiro))
                    if not IsPedSittingInVehicle(passageiro,vehicle) then
                        DrawMarker(21,x2,y2,z2+1.3,0,0,0,0,180.0,130.0,0.6,0.8,0.5,255,0,0,50,1,0,0,1)
                    end
                    if IsPedSittingInVehicle(passageiro,vehicle) then
                        FreezeEntityPosition(vehicle,false)
                        break
                    end
                end
                locs = getLocs(Config.jobs[actualJob], "collets")
                setupBlip(locs[1].x,locs[1].y,locs[1].z,"Taxi - Destino")
                while true do
                    local timeDistance = 500
                    local destinyDist = #(GetEntityCoords(vehicle) - vector3(locs[1].x,locs[1].y,locs[1].z))
                    if destinyDist <= 15.0 then
                        timeDistance = 4
                        DrawMarker(21,locs[1].x,locs[1].y,locs[1].z + 0.5,0,0,0,0,180.0,130.0,2.0,2.0,1.0,121,206,121,100,1,0,0,1)
                        if destinyDist <= 3.0 and IsControlJustPressed(0,38) then
                            if passageiro and DoesEntityExist(passageiro) then
                                FreezeEntityPosition(vehicle,true)
                                Wait(500)
                                TaskLeaveVehicle(passageiro,vehicle,262144)
                                TaskWanderStandard(passageiro,10.0,10)
                                Wait(1100)
                                SetVehicleDoorShut(vehicle,3,0)
                                self:deliveryItem()
                                Wait(1100)
                                FreezeEntityPosition(vehicle,false)
                                break
                            end
                        end
                    end
                    Wait(timeDistance)
                end
            end
        end
    end

    function JobFunctions:deliveryItem()
        paymentMethod()
        if DoesBlipExist(jobBlip) then
            RemoveBlip(jobBlip)
            jobBlip = nil
        end
    end
end)

RegisterNetEvent("will_jobs:initDelivery",function()
    local jobConfigs = Config.jobs[actualJob]

    function JobFunctions:collectItem()
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped)
        local vehConfig = jobConfigs.vehicleConfig
        local deliverys = getLocs(jobConfigs, "deliverys")[1]

        setupBlip(deliverys[1],deliverys[2],deliverys[3],"Entrega")
        if vehicle and IsVehicleModel(vehicle,GetHashKey(vehConfig.vehicle)) then
            local inRoute = true
            while inService and inRoute do
                local timeDistance = 500
				local distance = #(GetEntityCoords(ped) - vector3(deliverys[1],deliverys[2],deliverys[3]))
				if distance <= 30 then
					timeDistance = 4
					DrawText3D(deliverys[1],deliverys[2],deliverys[3],"~g~E~w~   ENTREGAR PACOTE",400)
					if distance <= 1.5 and IsControlJustPressed(1,38) then
                        if not IsPedInAnyVehicle(ped) then
                            self:deliveryItem()
                            inRoute = false                   
                        else
                            Config.notify("Desça do veiculo para fazer a entrega","negado")
                        end
					end
				end
                Wait(timeDistance)
			end
        end
    end
    
    function JobFunctions:deliveryItem()
        createObjects("pickup_object","pickup_low")
        Wait(1500)
        removeObjects()
        paymentMethod()
        if DoesBlipExist(jobBlip) then
            RemoveBlip(jobBlip)
            jobBlip = nil
        end
    end
end)

RegisterNetEvent("will_jobs:initLumberman",function()
    local jobConfigs = Config.jobs[actualJob]
    local deliverys = getLocs(jobConfigs, "deliverys")
    local firstCollect = false

    function JobFunctions:collectItem()
        local ped = PlayerPedId()
        if not firstCollect then
            firstCollect = true
            for k,v in pairs(deliverys) do
                setupBlip(v[1],v[2],v[3],"Venda de madeira")
            end
            jobStep = jobStep + 1
            sendNuiHint(Config.jobs[actualJob].steps[jobStep].message,actualJob)
        end
        if not IsPedInAnyVehicle(ped) then
            if GetSelectedPedWeapon(ped) == GetHashKey("WEAPON_HATCHET") then
                SetEntityHeading(ped,locs[jobIndex][4])
                SetEntityCoords(ped,locs[jobIndex][1],locs[jobIndex][2],locs[jobIndex][3]-1)
                createObjects("melee@hatchet@streamed_core","plyr_front_takedown_b")
                Wait(3000)
                removeObjects()
                return true
            else
                Config.notify("Você precisa de um machado para o trabalho","negado")
            end
        else
            Config.notify("Desça do veiculo para fazer a entrega","negado")
        end
    end
    
    function JobFunctions:deliveryItem()
        local ped = PlayerPedId()
        while inService do
            local timeDistance = 500
            for k,v in pairs(deliverys) do
                local deliverDis = #(GetEntityCoords(ped) - vector3(v[1],v[2],v[3]))
                if deliverDis <= 20 then
                    timeDistance = 4
                    DrawMarker(21,v[1],v[2],v[3]-0.6,0,0,0,0.0,0,0,0.5,0.5,0.4,100,185,230,50,0,0,0,1)
                    if deliverDis <= 0.6 and IsControlJustPressed(1,38) then
                        paymentMethod()
                        deliverys[k] = nil
                    end
                end
            end
            Wait(timeDistance)
        end
    end

    JobFunctions:deliveryItem()
end)

RegisterNetEvent("will_jobs:initDriver",function()
    local jobConfigs = Config.jobs[actualJob]
    local passengers = {}

    function spawnRandPeds()
        local rand = math.random(1,3)
        local pedCoords = nil
        while not pedCoords do
            pedCoords = locs[1]
            Wait(500)
        end
        repeat
            rand = rand - 1
            local pedRand = pedHashs[math.random(#pedHashs)]
            local nped = spawnPed(pedRand, {pedCoords.x2, pedCoords.y2, pedCoords.z2})
            table.insert(createdPeds,nped)
        until rand <= 0
    end

    function JobFunctions:collectItem()
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped)
        local vehConfig = jobConfigs.vehicleConfig
        if vehicle and IsVehicleModel(vehicle,GetHashKey(vehConfig.vehicle)) then
            FreezeEntityPosition(vehicle, true)
            local vehSeats = GetVehicleNumberOfPassengers(vehicle)
            JobFunctions:deliveryItem()
            for k,nped in pairs(createdPeds) do
                if not IsPedInAnyVehicle(nped) then
                    local actualSeat = vehSeats
                    for i=0,vehSeats do
                        if IsVehicleSeatFree(vehicle,i) then
                            actualSeat = i
                            break
                        end
                    end
                    local cooldown = 75
                    if IsVehicleSeatFree(vehicle,actualSeat) then
                        TaskEnterVehicle(nped,vehicle,-1,actualSeat,1.0,1,0)
                        while not IsPedSittingInVehicle(nped,vehicle) and cooldown > 0  do
                            Wait(100)
                            cooldown = cooldown - 1
                        end
                        if IsPedSittingInVehicle(nped,vehicle) then
                            paymentMethod()
                            table.insert(passengers, nped)
                            table.remove(createdPeds, k)
                        end
                    end
                end
            end
            actualSelected = actualSelected + 1
            FreezeEntityPosition(vehicle, false)
            SetTimeout(2000, function()
                spawnRandPeds()
            end)
        end
    end
    
    function JobFunctions:deliveryItem()
        local rand = math.random(0,#passengers)
        for k,ped in pairs(passengers) do
            if k <= rand then
                TaskLeaveAnyVehicle(ped,0,0)
                local cooldown = 50
                TaskWanderStandard(ped,10.0,10)
                while IsPedInAnyVehicle(ped) and cooldown > 0 do
                    TaskLeaveAnyVehicle(ped,0,0)
                    Wait(100)
                    cooldown = cooldown - 1
                end
                table.remove(passengers, k)
                SetPedKeepTask(ped, false)
                TaskWanderStandard(ped,10.0,10)
            end
        end
    end
    spawnRandPeds()
end)

RegisterNetEvent("will_jobs:initTransporter",function()

    function JobFunctions:collectItem()
        createObjects("amb@prop_human_atm@male@idle_a","idle_a")
        Wait(3000)
        removeObjects()
        if jobVehicle and DoesEntityExist(jobVehicle) then
            createObjects("missfbi4prepp1","_bag_walk_garbage_man","prop_money_bag_01",49,0x6F06)
            local withBag = true
            while withBag do
                local timeDistance = 500
                local jobVehCds = GetOffsetFromEntityInWorldCoords(jobVehicle, 0.0,-4.0,0.5)
                if #(GetEntityCoords(PlayerPedId()) - jobVehCds) <= 2.0 then
                    timeDistance = 4
                    DrawText3D(jobVehCds.x, jobVehCds.y, jobVehCds.z, "~b~[E]~w~ Colocar")
                    if IsControlJustPressed(0,38) then
                        withBag = false
                        self:deliveryItem()
                    end
                end
                Wait(timeDistance)
            end
        end
    end

    function JobFunctions:deliveryItem()
        removeObjects()
        removeActived()
        Wait(1000)
        paymentMethod()
    end
end)

RegisterNetEvent("will_jobs:initTrucker",function()
    local jobConfigs = Config.jobs[actualJob]
    local collets = getLocs(jobConfigs, "collets")
    local deliverys = Config.deliverys[actualJob]
    local tanker = nil
    local tankAttached = false

    CreateThread(function()
        while inService do
            local timeDistance = 500
            if not tankAttached then
                local ped = PlayerPedId()
                local coords = GetEntityCoords(ped)
                local x,y,z,h
                for k,v in pairs(locs) do
                    x,y,z,h = v[1], v[2], v[3], v[4]
                end
                if x and y and z then
                    local distance = #(coords - vector3(x,y,z))
                    if tanker == nil and distance <= 50 and not DoesEntityExist(tanker) then
                        tanker = spawnVeh("trailers", x,y,z,h)
                    end
                    if distance <= 20 then
                        timeDistance = 4
                        DrawMarker(23,x,y,z - 0.95,0,0,0,0,0,0,5.0,5.0,1.0,20,203,88,250,0,0,0,0)
                        if IsEntityAttachedToEntity(tanker, jobVehicle) then
                            tankAttached = true
                        end
                    end
                end
            end
            Wait(timeDistance)
        end
    end)

    function JobFunctions:collectItem()
        local randCollect = math.random(1,#deliverys)
        local destiny = deliverys[randCollect]
        setupBlip(destiny[1], destiny[2], destiny[3],"Caminhoneiro - Entrega")
        jobStep = jobStep + 1
        sendNuiHint(Config.jobs[actualJob].steps[jobStep].message,actualJob)
        while inService do
            local timeDistance = 5000
            if tankAttached then
                local coords = GetEntityCoords(tanker)
                local distance = #(coords - vector3(destiny[1], destiny[2], destiny[3]))
                if distance <= 50.0 then
                    timeDistance = 4
                    DrawMarker(1,destiny[1], destiny[2], destiny[3] - 1.04,0,0,0,0,0,0,5.0,5.0,1.0,20,203,88,250,0,0,0,0)
                    if distance <= 5.0 then
                        self:deliveryItem()
                        break
                    end
                end
            else
                Config.notify("Veiculo não esta com a carga","negado")
            end
            Wait(timeDistance)
        end
    end
    
    function JobFunctions:deliveryItem()
        Config.notify("Carga entregue com sucesso","sucesso")
        if DoesEntityExist(tanker) and IsEntityAttachedToEntity(tanker, jobVehicle) then
            while IsEntityAttachedToEntity(tanker, jobVehicle) do
                DetachEntity(tanker)
                Wait(500)
            end
            tankAttached = false
            actualSelected = actualSelected + 1
            paymentMethod()
            SetTimeout(5000,function()
                DeleteEntity(tanker)
                tanker = nil
                if jobBlip and DoesBlipExist(jobBlip) then
                    RemoveBlip(jobBlip)
                    jobBlip = nil
                end
            end)
        end
        jobStep = jobStep - 1
        sendNuiHint(Config.jobs[actualJob].steps[jobStep].message,actualJob)
    end
end)

RegisterNetEvent("will_jobs:initFireman",function()
    local jobConfigs = Config.jobs[actualJob]
    
    CreateThread(function()
        while inService do
            local timeDistance = 500
            local ped = PlayerPedId()
            
            if IsPedInAnyVehicle(ped) then
                local vehicle = GetVehiclePedIsIn(ped)
                local vehConfig = jobConfigs.vehicleConfig
                if vehicle and IsVehicleModel(vehicle,GetHashKey(vehConfig.vehicle)) then
                    timeDistance = 100
                    if locs[1] then
                        local x,y,z = locs[1][1],locs[1][2],locs[1][3]
                        z = z - 1.0
                        for i=1,5 do
                            StartScriptFire(x, y, z, 15, false)
                            StartScriptFire(x, y + i, z, 15, false)
                            StartScriptFire(x, y - i, z, 15, false)
                            StartScriptFire(x - i, y, z, 15, false)
                            StartScriptFire(x + i, y, z, 15, false)
                            Wait(100)
                        end
                        Wait(2000)
                        while GetNumberOfFiresInRange(x,y,z,15.0) > 0 do
                            Wait(1000)
                        end
                        local distance = #(GetEntityCoords(ped) - vector3(x,y,z))
                        removeAllBlips()
                        locs = getLocs(jobConfigs, "collets")
                        if distance <= 30.0 then
                            paymentMethod()
                        end
                    end
                end
            end
            Wait(timeDistance)
        end
    end)

    function JobFunctions:collectItem()
        
    end
    
    function JobFunctions:deliveryItem()
        removeAllBlips()
        locs = getLocs(jobConfigs, "collets")
        paymentMethod()
    end
end)

RegisterNetEvent("will_jobs:initDiver",function()

    CreateThread(function ()
        local ped = PlayerPedId()
        while inService do
            if IsPedSwimmingUnderWater(ped) then
                if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") and GetPedDrawableVariation(ped,8) ~= 123 then
                    SetPedComponentVariation(ped,8,123,0,2)
                    SetPedPropIndex(ped,1,26,0,true)
                elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") and GetPedDrawableVariation(ped,8) ~= 153 then
                    SetPedComponentVariation(ped,8,153,0,2)
                    SetPedPropIndex(ped,1,28,0,true)
                end
            end
            Wait(500)
        end
    end)

    function JobFunctions:collectItem()
        if jobVehicle and DoesEntityExist(jobVehicle) then
            createObjects("anim@heists@box_carry@","idle","prop_big_bag_01",50,28422)
            local withBag = true
            while withBag do
                local timeDistance = 500
                local jobVehCds = GetEntityCoords(jobVehicle)
                if #(GetEntityCoords(PlayerPedId()) - jobVehCds) <= 4.0 then
                    timeDistance = 4
                    DrawText3D(jobVehCds.x, jobVehCds.y, jobVehCds.z, "~b~[E]~w~ Colocar")
                    if IsControlJustPressed(0,38) then
                        withBag = false
                        self:deliveryItem()
                    end
                end
                Wait(timeDistance)
            end
        end
    end

    function JobFunctions:deliveryItem()
        removeObjects()
        removeActived()
        Wait(1000)
        paymentMethod()
    end
end)

RegisterNetEvent("will_jobs:initSafeguard",function()
    local drowingPed = nil
    local jobConfigs = Config.jobs[actualJob]
    local collects = Config.collets[actualJob]
    local deliverys = Config.deliverys[actualJob]

    function JobFunctions:collectItem()
        local ped = PlayerPedId()
        createObjects("amb@world_human_binoculars@male@enter" ,"enter" ,"prop_binoc_01" ,50 ,28422)
        FreezeEntityPosition(ped, true)
        SetEntityHeading(ped, collects[jobIndex][4])
        Wait(5000)
        ClearPedTasks(ped)
        FreezeEntityPosition(ped, false)
        removeObjects()
        Config.notify("Um americano está se afogando, salve-o!","aviso")
        local pedRand = pedHashs[math.random(#pedHashs)]
        drowingPed = spawnPed(pedRand, deliverys[jobIndex])
        TaskPlayAnim(drowingPed, "dam_ko", "drown", 8.0, 8.0, -1, 1, 10, 0, 0, 0)
        SetEntityInvincible(drowingPed, true)
        FreezeEntityPosition(drowingPed, true)
        local inSafeMission = true
        while inSafeMission do
            local timeDistance = 4
            local drowPed = GetEntityCoords(drowingPed)
            local distance = #(GetEntityCoords(ped) - drowPed)
            jobConfigs.helperMark(distance,drowPed.x,drowPed.y,drowPed.z)
            if distance <= 3.0 then
                SetEntityAsMissionEntity(drowingPed, true,true)
                FreezeEntityPosition(drowingPed, false)
                AttachEntityToEntity(drowingPed, ped, 0, 0.27, -0.12, 0.63-0.4, 0.5, 0.5, 180, false, false, false, false, 2, false)
                Config.notify("Saia da água para salvar a vítima.","importante")
                inSafeMission = false
            end
            Wait(timeDistance)
        end
        Wait(1000)
        Config.notify("Pressione <b>E</b> para reanimá-la.","importante")
        while true do
            if not IsEntityInWater(ped) and IsControlJustPressed(0, 38) then
                self:deliveryItem()
                break
            end
            Wait(4)
        end
    end

    function JobFunctions:deliveryItem()
        local ped = PlayerPedId()
        if DoesEntityExist(drowingPed) then
            DetachEntity(drowingPed,true,true)
            Wait(500)
            ClearPedTasksImmediately(ped)
            ClearPedTasksImmediately(drowingPed)
            Wait(500)
            SetEntityHeading(drowingPed, GetEntityHeading(ped)+90.0)
            SetEntityHeading(ped, GetEntityHeading(ped)+180.0)
            local playerCds = GetEntityCoords(ped)
            SetEntityCoords(drowingPed, playerCds.x-0.75, playerCds.y, playerCds.z)
            loadAnimSet("switch@trevor@annoys_sunbathers")
            createObjects("mini@cpr@char_a@cpr_str","cpr_pumpchest")
            TaskPlayAnim(drowingPed, "switch@trevor@annoys_sunbathers","trev_annoys_sunbathers_loop_guy", 8.0, -8.0, 6000, 15, 0.0, false, false, false)
            Wait(5000)
            removeObjects()
            ClearPedTasksImmediately(drowingPed)
            TaskWanderStandard(drowingPed,10.0,10)
            Wait(500)
            paymentMethod()
        end
    end
end)
