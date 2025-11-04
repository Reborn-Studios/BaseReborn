--######################--
--##  FRAMEWORK FUNC ###--
--######################--

CreateThread(function() 
    if Config.debug then
		-- Auxilio para abrir painel dos empregos
        RegisterCommand("jobs",function()
			SendNUIMessage({
				action = "openJobs",
				data = {
					jobs = getJobs(),
					salary = moneyGained,
					myJob = actualJob
				}
			})
			SetNuiFocus(true, true)
		end)
    end

	Wait(100)

	if GetResourceState("will_shops") == "started" then
		Tunnel = module("vrp","lib/Tunnel")
		vSERVER = Tunnel.getInterface("will_jobs")

		function getShopImage(shopName)
			if shopName:find("Posto") then
				return "https://static.wikia.nocookie.net/gta/images/6/6d/LTDGroveSt-GTAV.png/revision/latest?cb=20180227153305&path-prefix=pt"
			elseif shopName:find("Conveniencia") then
				return "https://img.gta5-mods.com/q75/images/7-eleven-stores-prodigyhd/87ca65-GTA5%202016-05-21%2002-06-41-556.png"
			elseif shopName:find("Ammunation") then
				return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTeHGoyY0GCxKg0IbanOj941-lwg7L2MJMrQ&s"
			end
		end

		function getJobs()
			local allJobs = {}

			local shopsJobs = vSERVER.getShopsJobs()
			for k,v in pairs(shopsJobs) do
				local image = getShopImage(v.shop_name)
				Config.jobs[v.shop_name] = {
					description = v.description,
					image = image,
					salary = v.value or math.random(2000,3500),
					steps = {
						[1] = {
							message = "Vá até o blip para iniciar o emprego",
							coords = vector3(-1081.44,-256.28,37.77),
						},
						[2] = {
							message = "Abra o painel de Empregos na loja",
						},
						[3] = {
							message = "Inicie o emprego e faça a rota",
						}
					},
					startEvent = "will_jobs:initShopJob"
				}
			end

			for k,v in pairs(Config.jobs) do
				local jobSteps = {}
				if v.steps then
					for k2,v2 in ipairs(v.steps) do
						table.insert(jobSteps, v2.message)
					end
				end
				table.insert(allJobs, {
					name = k,
					salary = v.salary or math.random(2000,3500),
					description = v.description,
					image = v.image,
					steps = jobSteps,
					exp = myJobs[k] or 0
				})
			end
			
			return allJobs
		end

		RegisterNetEvent("will_jobs:initShopJob",function ()
			if actualJob and GlobalState["Will_Shops"][actualJob] then
				local loc = GlobalState["Will_Shops"][actualJob]['job_coords']
				SetTimeout(200,function ()
					setupBlip(loc.x, loc.y, loc.z,actualJob)
				end)
			end
		end)
	end
end)

-- Finalizar emprego
RegisterCommand("endjob", function (source, args, raw)
    if inService then
        exitService()
		for k,v in pairs(passengers) do
			if DoesEntityExist(v) then
				DeleteEntity(v)
			end
		end
        Config.notify("Serviço finalizado", "sucesso")
    end
end)

RegisterKeyMapping("endjob","Finalizar emprego","keyboard","F7")

function spawnVeh(vname,x,y,z,h)
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
        Wait(100)
    end
    if nveh then
        local plate = "JOBS"..math.random(1000, 9999)
        SetVehicleNumberPlateText(nveh,plate)
        SetVehicleDoorsLocked(nveh,1)
		TriggerServerEvent("setPlateEveryone",plate)
		TriggerServerEvent("will_garages_v2:GiveKey",plate)
    end
    return nveh
end

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

function getClosestVeh(x,y,z)
    local vehicles = getNearVehicles(2.2, x, y, z)
    if next(vehicles) then
        return next(vehicles)
    end
    return 0
end

function getNearVehicles(radius,x,y,z)
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

--######################--
--##  ANIMS/OBJECTS  ###--
--######################--

object = nil
jobBlip = nil
animDict = nil
animName = nil
animActived = false

function loadAnimSet(dict)
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
		RequestAnimDict(dict)
		Wait(10)
	end
end

function createObjects(dict,anim,prop,flag,mao,altura,pos1,pos2,pos3,pos4,pos5)
	if DoesEntityExist(object) then
		TriggerServerEvent("tryDeleteEntity",ObjToNet(object))
		object = nil
	end

	local ped = PlayerPedId()

	if anim ~= "" then
		loadAnimSet(dict)
		TaskPlayAnim(ped,dict,anim,3.0,3.0,-1,flag,0,0,0,0)
	end
	if prop then
		local mHash = GetHashKey(prop)
		RequestModel(mHash)
		while not HasModelLoaded(mHash) do
			RequestModel(mHash)
			Wait(10)
		end
		if altura then
			local coords = GetOffsetFromEntityInWorldCoords(ped,0.0,0.0,-5.0)
			object = CreateObject(mHash,coords.x,coords.y,coords.z,true,true,true)
			AttachEntityToEntity(object,ped,GetPedBoneIndex(ped,mao),altura,pos1,pos2,pos3,pos4,pos5,true,true,false,true,1,true)
		else
			local coords = GetOffsetFromEntityInWorldCoords(ped,0.0,0.0,-5.0)
			object = CreateObject(mHash,coords.x,coords.y,coords.z,true,true,true)
			AttachEntityToEntity(object,ped,GetPedBoneIndex(ped,mao),0.0,0.0,0.0,0.0,0.0,0.0,false,false,false,false,2,true)
		end
		SetEntityAsMissionEntity(object,true,true)
		SetModelAsNoLongerNeeded(mHash)
	end

	animDict = dict
	animName = anim
	animFlags = flag
	animActived = true
end

function removeActived()
	if animActived then
		if DoesEntityExist(object) then
			TriggerServerEvent("tryDeleteEntity",ObjToNet(object))
			DeleteEntity(object)
			object = nil
		end
		animActived = false
	end
end

CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		if not IsEntityPlayingAnim(ped,animDict,animName,3) and animActived then
			TaskPlayAnim(ped,animDict,animName,3.0,3.0,-1,animFlags,0,0,0,0)
			timeDistance = 4
		end
		Wait(timeDistance)
	end
end)

CreateThread(function()
	while true do
		local timeDistance = 500
		local ped = PlayerPedId()
		if animActived then
			timeDistance = 4
			DisableControlAction(1,16,true)
			DisableControlAction(1,17,true)
			DisableControlAction(1,24,true)
			DisableControlAction(1,25,true)
		end
		Wait(timeDistance)
	end
end)

function removeObjects()
	animActived = false
	ClearPedTasks(PlayerPedId())
	ClearPedSecondaryTask(PlayerPedId())
	if DoesEntityExist(object) then
		TriggerServerEvent("tryDeleteEntity",ObjToNet(object))
		object = nil
	end
end

--######################--
--##       BLIPS     ###--
--######################--

function DrawText3D(x,y,z,text)
	if text then
		if text:find("CENTRAL DE EMPREGOS") then
			DrawBase3D(x,y,z,"jobs")
		else
			local onScreen,_x,_y = World3dToScreen2d(x,y,z)
			SetTextFont(4)
			SetTextScale(0.3,0.3)
			SetTextColour(255,255,255,100)
			SetTextEntry("STRING")
			SetTextCentre(1)
			AddTextComponentString(text)
			DrawText(_x,_y)
			local factor = (string.len(text)) / 450
			DrawRect(_x,_y+0.0125,0.01+factor,0.03,0,0,0,100)
		end
	end
end

function addBlip(k,x,y,z,blipType)
	blips[k] = AddBlipForCoord(x,y,z)
	SetBlipSprite(blips[k],1)
	SetBlipColour(blips[k],57)
	if blipType ~= "all" then
		SetBlipRoute(blips[k],true)
		SetBlipAsShortRange(blips[k],false)
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentString(actualJob.." - Destino")
		EndTextCommandSetBlipName(blips[k])
	end
end

function setupBlip(x,y,z,name)
	if jobBlip and DoesBlipExist(jobBlip) then
		RemoveBlip(jobBlip)
		jobBlip = nil
	end
	jobBlip = AddBlipForCoord(x,y,z)
	SetBlipSprite(jobBlip,835)
	SetBlipColour(jobBlip,1)
	SetBlipScale(jobBlip,0.8)
	SetBlipAsShortRange(jobBlip,false)
	SetBlipRoute(jobBlip,true)
	BeginTextCommandSetBlipName("STRING")
	AddTextComponentString(name)
	EndTextCommandSetBlipName(jobBlip)
end
