-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ACOES NO CLIENTE
-----------------------------------------------------------------------------------------------------------------------------------------
local frozen = false
local punished = false
local punishEnd = 0
local punishReason = ""

-----------------------------------------------------------------------------------------------------------------------------------------
-- TELEPORTE
-----------------------------------------------------------------------------------------------------------------------------------------
local function teleportTo(x, y, z)
	local ped = PlayerPedId()
	local entity = ped

	if IsPedInAnyVehicle(ped, false) then
		entity = GetVehiclePedIsIn(ped, false)
	end

	DoScreenFadeOut(250)
	Wait(300)

	local found = false
	for _, height in ipairs({ 0.0, 50.0, 100.0, 200.0, 300.0, 500.0, 700.0, 900.0, 1100.0 }) do
		SetEntityCoordsNoOffset(entity, x + 0.0, y + 0.0, height, false, false, true)
		RequestCollisionAtCoord(x + 0.0, y + 0.0, height)

		local timeout = 0
		while not HasCollisionLoadedAroundEntity(entity) and timeout < 100 do
			Wait(10)
			timeout = timeout + 1
		end

		local ok, groundZ = GetGroundZFor_3dCoord(x + 0.0, y + 0.0, height, false)
		if ok then
			SetEntityCoordsNoOffset(entity, x + 0.0, y + 0.0, groundZ + 1.0, false, false, true)
			found = true
			break
		end
	end

	if not found then
		SetEntityCoordsNoOffset(entity, x + 0.0, y + 0.0, z + 0.0, false, false, true)
	end

	Wait(250)
	DoScreenFadeIn(350)
end

RegisterNetEvent("triade_admin:teleport", function(x, y, z)
	CreateThread(function() teleportTo(x, y, z) end)
end)

RegisterNetEvent("triade_admin:teleportWaypoint", function()
	local blip = GetFirstBlipInfoId(8)
	if not DoesBlipExist(blip) then
		TriggerEvent("Notify", "negado", "Nenhuma marcacao definida no mapa.", 5000)
		return
	end

	local coords = GetBlipInfoIdCoord(blip)
	CreateThread(function() teleportTo(coords.x, coords.y, coords.z) end)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- VER TELA (PREVISUALIZACAO AO VIVO)
-----------------------------------------------------------------------------------------------------------------------------------------
local previewStreaming = false
local previewCapturing = false

RegisterNetEvent("triade_admin:previewStart", function()
	if previewStreaming then return end
	previewStreaming = true

	local quality = 0.5
	local resW, resH = 480, 270

	local byteBudget = 400000    -- teto ~400 KB/s (frames de 10-15 KB cabem a 30 fps)
	local capFrame = 512 * 1024  -- guarda absoluta: nunca reencaminhar frame acima disto
	local minInterval = math.floor(1000 / 30)

	CreateThread(function()
		local lastRequest = 0
		local lastFrameBytes = 0 -- a frio vale 0: o bloco de pacing la em baixo conta com isso
		local interval = 200 -- arranque conservador: so acelera apos o primeiro frame medido

		while previewStreaming do
			if previewCapturing then
				-- Watchdog: se o screenshot nunca devolver (NUI preso/recarregando), desbloqueia.
				if GetGameTimer() - lastRequest > 1500 then
					previewCapturing = false
				end
			elseif GetGameTimer() - lastRequest >= interval then
				previewCapturing = true
				lastRequest = GetGameTimer()

				-- Degraus de qualidade/resolucao quando os frames chegam grandes demais (so
				-- descem, para o fluxo estabilizar num ponto seguro).
				if lastFrameBytes > capFrame then
					if resW > 320 then
						resW, resH = 320, 180
					elseif quality > 0.2 then
						quality = math.max(0.2, quality - 0.1)
					end
				end

				local ok = pcall(function()
					exports["screenshot-basic"]:requestScreenshot({
						["encoding"] = "jpg",
						["quality"] = quality,
						["width"] = resW,
						["height"] = resH
					}, function(data)
						previewCapturing = false
						if data and type(data) == "string" and previewStreaming then
							lastFrameBytes = #data
							if lastFrameBytes <= capFrame then
								TriggerServerEvent("triade_admin:previewFrame", data)
							end
						end
					end)
				end)

				if not ok then
					previewCapturing = false
				end
			end

			if lastFrameBytes == 0 then
				interval = 200
			else
				interval = math.min(math.max(math.floor(lastFrameBytes * 1000 / byteBudget), minInterval), 1500)
			end

			Wait(0)
		end
	end)
end)

RegisterNetEvent("triade_admin:previewStop", function()
	previewStreaming = false
end)

-- A tela de um jogador espreitado chega aqui (o servidor reencaminha) e passa ao painel.
RegisterNetEvent("triade_admin:previewFrame", function(frame)
	if type(frame) ~= "string" then return end
	SendNUIMessage({ ["action"] = "previewFrame", ["data"] = frame })
end)

AddEventHandler("onResourceStop", function(resource)
	if resource == GetCurrentResourceName() then
		previewStreaming = false
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONGELAR
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:freeze", function(state)
	frozen = state == true
	local ped = PlayerPedId()
	FreezeEntityPosition(ped, frozen)

	if frozen then
		CreateThread(function()
			while frozen do
				FreezeEntityPosition(PlayerPedId(), true)
				Wait(1000)
			end
			FreezeEntityPosition(PlayerPedId(), false)
		end)
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- REVIVER
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:revive", function()
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)

	if IsEntityDead(ped) then
		NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, GetEntityHeading(ped), true, false)
	end

	SetEntityHealth(ped, GetEntityMaxHealth(ped))
	ClearPedBloodDamage(ped)
	ClearPedTasksImmediately(ped)
	SetPlayerInvincible(PlayerId(), false)
	TriggerEvent("hospital:revive")
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- LIMPAR ARMAS
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:clearWeapons", function()
	RemoveAllPedWeapons(PlayerPedId(), true)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- VEICULOS
-----------------------------------------------------------------------------------------------------------------------------------------
local function nearestVehicle(radius)
	local ped = PlayerPedId()

	if IsPedInAnyVehicle(ped, false) then
		return GetVehiclePedIsIn(ped, false)
	end

	local coords = GetEntityCoords(ped)
	local vehicle = GetClosestVehicle(coords.x, coords.y, coords.z, radius or 8.0, 0, 71)
	if vehicle and vehicle ~= 0 and DoesEntityExist(vehicle) then return vehicle end

	return nil
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- MODELOS QUE O JOGO TEM DE VERDADE
lib.callback.register("triade_admin:gameModels", function()
	local ok, models = pcall(GetAllVehicleModels)
	if not ok or type(models) ~= "table" then return nil end

	local list = {}
	for _, model in ipairs(models) do
		if type(model) == "string" and model ~= "" then
			list[#list + 1] = string.lower(model)
		end
	end

	if #list == 0 then return nil end
	return list
end)

lib.callback.register("triade_admin:nearVehicle", function()
	local vehicle = nearestVehicle(12.0)
	if not vehicle then return nil end

	local model = GetEntityModel(vehicle)
	return {
		["model"] = GetDisplayNameFromVehicleModel(model),
		["hash"] = model,
		["plate"] = GetVehicleNumberPlateText(vehicle)
	}
end)

RegisterNetEvent("triade_admin:repairVehicle", function()
	local vehicle = nearestVehicle(8.0)
	if not vehicle then
		TriggerEvent("Notify", "negado", "Nenhum veiculo por perto.", 4000)
		return
	end

	SetVehicleFixed(vehicle)
	SetVehicleDeformationFixed(vehicle)
	SetVehicleUndriveable(vehicle, false)
	SetVehicleEngineOn(vehicle, true, true, true)
	SetVehicleFuelLevel(vehicle, 100.0)
	-- O native sozinho volta atras no primeiro sync: o qs-fuelstations e que manda no nivel.
	if GetResourceState("qs-fuelstations") == "started" then
		pcall(function() exports["qs-fuelstations"]:SetFuel(vehicle, 100.0) end)
	end
	SetVehicleDirtLevel(vehicle, 0.0)
	SetVehicleBodyHealth(vehicle, 1000.0)
	SetVehicleEngineHealth(vehicle, 1000.0)
	SetVehiclePetrolTankHealth(vehicle, 1000.0)

	for tyre = 0, 7 do
		SetVehicleTyreFixed(vehicle, tyre)
	end
end)

RegisterNetEvent("triade_admin:tuneVehicle", function()
	local vehicle = nearestVehicle(8.0)
	if not vehicle then
		TriggerEvent("Notify", "negado", "Nenhum veiculo por perto.", 4000)
		return
	end

	SetVehicleModKit(vehicle, 0)

	for modType = 0, 16 do
		local total = GetNumVehicleMods(vehicle, modType)
		if total > 0 then
			SetVehicleMod(vehicle, modType, total - 1, false)
		end
	end

	for modType = 17, 22 do
		ToggleVehicleMod(vehicle, modType, true)
	end

	SetVehicleWindowTint(vehicle, 1)
	SetVehicleWheelType(vehicle, 7)
	SetVehicleFixed(vehicle)
end)

RegisterNetEvent("triade_admin:deleteVehicle", function()
	local vehicle = nearestVehicle(12.0)
	if not vehicle then
		TriggerEvent("Notify", "negado", "Nenhum veiculo por perto.", 4000)
		return
	end

	SetEntityAsMissionEntity(vehicle, true, true)
	DeleteVehicle(vehicle)
	if DoesEntityExist(vehicle) then DeleteEntity(vehicle) end
end)

RegisterNetEvent("triade_admin:spawnVehicle", function(spawnName)
	local hash = GetHashKey(spawnName)
	if not IsModelInCdimage(hash) or not IsModelAVehicle(hash) then
		TriggerEvent("Notify", "negado", "O modelo <b>" .. tostring(spawnName) .. "</b> nao existe no servidor.", 6000)
		return
	end

	RequestModel(hash)
	local timeout = 0
	while not HasModelLoaded(hash) and timeout < 200 do
		Wait(10)
		timeout = timeout + 1
	end

	if not HasModelLoaded(hash) then
		TriggerEvent("Notify", "negado", "Nao foi possivel carregar o modelo.", 5000)
		return
	end

	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	local vehicle = CreateVehicle(hash, coords.x, coords.y, coords.z, GetEntityHeading(ped), true, false)
	local plate = "ADM" .. math.random(10000, 99999)

	SetVehicleOnGroundProperly(vehicle)
	SetVehicleNumberPlateText(vehicle, plate)
	TriggerServerEvent("setPlateEveryone",plate)
	SetEntityAsMissionEntity(vehicle, true, true)
	SetPedIntoVehicle(ped, vehicle, -1)
	SetModelAsNoLongerNeeded(hash)
end)

RegisterNetEvent("triade_admin:clearVehicles", function()
	local removed = 0
	local vehicles = GetGamePool("CVehicle")

	for _, vehicle in ipairs(vehicles) do
		if DoesEntityExist(vehicle) and IsVehicleSeatFree(vehicle, -1) then
			local occupied = false
			for seat = -1, GetVehicleMaxNumberOfPassengers(vehicle) do
				if not IsVehicleSeatFree(vehicle, seat) then occupied = true end
			end

			if not occupied then
				SetEntityAsMissionEntity(vehicle, true, true)
				DeleteVehicle(vehicle)
				removed = removed + 1
			end
		end
	end

	if removed > 0 then
		TriggerEvent("Notify", "aviso", removed .. " veiculo(s) vazio(s) removido(s).", 5000)
	end
end)

RegisterNetEvent("triade_admin:clearProps", function(radius)
	local coords = GetEntityCoords(PlayerPedId())
	local removed = 0

	for _, object in ipairs(GetGamePool("CObject")) do
		if DoesEntityExist(object) then
			local distance = #(coords - GetEntityCoords(object))
			if distance <= (radius + 0.0) then
				SetEntityAsMissionEntity(object, true, true)
				DeleteObject(object)
				removed = removed + 1
			end
		end
	end

	TriggerEvent("Notify", "sucesso", removed .. " objeto(s) removido(s).", 5000)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CASTIGO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:punish", function(state, seconds, reason)
	punished = state == true
	punishReason = reason or ""

	if not punished then
		SendNUIMessage({ ["action"] = "punish", ["state"] = false })
		return
	end

	punishEnd = GetGameTimer() + ((seconds or 0) * 1000)
	SendNUIMessage({ ["action"] = "punish", ["state"] = true, ["reason"] = punishReason, ["seconds"] = seconds or 0 })

	CreateThread(function()
		while punished do
			local ped = PlayerPedId()
			RemoveAllPedWeapons(ped, true)
			SetEntityInvincible(ped, true)
			SetEntityHealth(ped, GetEntityMaxHealth(ped))

			if GetGameTimer() >= punishEnd then
				punished = false
			end

			Wait(2000)
		end

		SetEntityInvincible(PlayerPedId(), false)
		SendNUIMessage({ ["action"] = "punish", ["state"] = false })
	end)
end)
