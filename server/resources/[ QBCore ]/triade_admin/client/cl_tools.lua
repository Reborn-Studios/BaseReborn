-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - FERRAMENTAS (LADO DO CLIENTE)
-----------------------------------------------------------------------------------------------------------------------------------------
local godmode = false
local invisible = false
local viewDistance = 1.0

local dev = {
	["vehicles"] = false,
	["peds"] = false,
	["objects"] = false,
	["coords"] = false
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- MODO DIVINDADE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:godmode", function(state)
	godmode = state == true

	if not godmode then
		local ped = PlayerPedId()
		SetEntityInvincible(ped, false)
		SetPlayerInvincible(PlayerId(), false)
		SetPedCanRagdoll(ped, true)
		SetEntityProofs(ped, false, false, false, false, false, false, false, false)
		TriggerEvent("Notify", "aviso", "Modo divindade <b>desligado</b>.", 4000)
		return
	end

	TriggerEvent("Notify", "sucesso", "Modo divindade <b>ligado</b>.", 4000)

	CreateThread(function()
		while godmode do
			local ped = PlayerPedId()
			SetEntityInvincible(ped, true)
			SetPlayerInvincible(PlayerId(), true)
			SetPedCanRagdoll(ped, false)
			SetEntityProofs(ped, true, true, true, true, true, true, true, true)
			if GetEntityHealth(ped) < GetEntityMaxHealth(ped) then
				SetEntityHealth(ped, GetEntityMaxHealth(ped))
			end
			Wait(1000)
		end
	end)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- INVISIBILIDADE
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:invisible", function(state)
	invisible = state == true

	if not invisible then
		SetEntityVisible(PlayerPedId(), true, false)
		TriggerEvent("Notify", "aviso", "Invisibilidade <b>desligada</b>.", 4000)
		return
	end

	TriggerEvent("Notify", "sucesso", "Invisibilidade <b>ligada</b>. Lembre-se que o seu blip e a sua voz continuam a existir.", 6000)

	CreateThread(function()
		while invisible do
			SetEntityVisible(PlayerPedId(), false, false)
			Wait(1000)
		end
		SetEntityVisible(PlayerPedId(), true, false)
	end)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- DISTANCIA DE VISAO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:viewDistance", function(value)
	local previous = viewDistance
	viewDistance = tonumber(value) or 1.0

	if viewDistance <= 1.0 then return end
	if previous > 1.0 then return end		-- ja ha um laco a correr

	CreateThread(function()
		while viewDistance > 1.0 do
			OverrideLodscaleThisFrame(viewDistance)
			Wait(0)
		end
	end)
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- OPCOES DE PROGRAMADOR
-----------------------------------------------------------------------------------------------------------------------------------------
local DEV_RADIUS = 100.0
local devRunning = false

local function drawTag(coords, text, r, g, b)
	local onScreen, x, y = World3dToScreen2d(coords.x, coords.y, coords.z)
	if not onScreen then return end

	SetTextScale(0.30, 0.30)
	SetTextFont(4)
	SetTextColour(r, g, b, 220)
	SetTextCentre(true)
	SetTextOutline()
	SetTextEntry("STRING")
	AddTextComponentSubstringPlayerName(text)
	DrawText(x, y)
end

local function devLoop()
	if devRunning then return end
	devRunning = true

	CreateThread(function()
		while dev.vehicles or dev.peds or dev.objects or dev.coords do
			local origin = GetEntityCoords(PlayerPedId())

			if dev.coords then
				drawTag(
					vector3(origin.x, origin.y, origin.z + 1.1),
					string.format("%.2f  %.2f  %.2f  |  %.1f", origin.x, origin.y, origin.z, GetEntityHeading(PlayerPedId())),
					120, 200, 255
				)
			end

			local sets = {
				{ ["on"] = dev.vehicles, ["pool"] = "CVehicle", ["r"] = 90, ["g"] = 200, ["b"] = 255 },
				{ ["on"] = dev.peds, ["pool"] = "CPed", ["r"] = 255, ["g"] = 200, ["b"] = 90 },
				{ ["on"] = dev.objects, ["pool"] = "CObject", ["r"] = 160, ["g"] = 255, ["b"] = 160 }
			}

			for _, set in ipairs(sets) do
				if set.on then
					for _, entity in ipairs(GetGamePool(set.pool)) do
						if DoesEntityExist(entity) then
							local coords = GetEntityCoords(entity)
							if #(origin - coords) <= DEV_RADIUS then
								local model = GetEntityModel(entity)
								local label = (set.pool == "CVehicle") and GetDisplayNameFromVehicleModel(model) or tostring(model)
								drawTag(coords, label .. "\n" .. model, set.r, set.g, set.b)
							end
						end
					end
				end
			end

			Wait(0)
		end

		devRunning = false
	end)
end

RegisterNetEvent("triade_admin:devToggle", function(key, state)
	if dev[key] == nil then return end
	dev[key] = state == true
	devLoop()
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- INFORMACAO DA ENTIDADE NA MIRA
-----------------------------------------------------------------------------------------------------------------------------------------
local function entityInFront(distance)
	local camCoords = GetGameplayCamCoord()
	local rotation = GetGameplayCamRot(2)
	local radian = math.pi / 180.0

	local direction = vector3(
		-math.sin(rotation.z * radian) * math.abs(math.cos(rotation.x * radian)),
		math.cos(rotation.z * radian) * math.abs(math.cos(rotation.x * radian)),
		math.sin(rotation.x * radian)
	)

	local target = camCoords + direction * (distance or 30.0)
	local ray = StartShapeTestRay(camCoords.x, camCoords.y, camCoords.z, target.x, target.y, target.z, -1, PlayerPedId(), 0)
	local _, hit, _, _, entity = GetShapeTestResult(ray)

	if hit == 1 and entity and entity ~= 0 and DoesEntityExist(entity) then return entity end
	return nil
end

local TYPE_LABEL = { [1] = "ped", [2] = "veiculo", [3] = "objeto" }

lib.callback.register("triade_admin:entityInfo", function()
	local entity = entityInFront(40.0)
	if not entity then return nil end

	local model = GetEntityModel(entity)
	local coords = GetEntityCoords(entity)
	local kind = GetEntityType(entity)

	local label = tostring(model)
	if kind == 2 then
		local display = GetDisplayNameFromVehicleModel(model)
		if display and display ~= "" and display ~= "CARNOTFOUND" then label = display end
	end

	return {
		["model"] = label,
		["hash"] = model,
		["type"] = TYPE_LABEL[kind] or "desconhecido",
		["coords"] = string.format("%.2f, %.2f, %.2f", coords.x, coords.y, coords.z),
		["heading"] = string.format("%.2f", GetEntityHeading(entity)),
		["netId"] = NetworkGetEntityIsNetworked(entity) and NetworkGetNetworkIdFromEntity(entity) or 0,
		["mine"] = NetworkGetEntityIsNetworked(entity) and "em rede" or "local (so voce ve)"
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- APAGAR A ENTIDADE MAIS PROXIMA
-----------------------------------------------------------------------------------------------------------------------------------------
local function closestOfPool(pool, radius)
	local origin = GetEntityCoords(PlayerPedId())
	local best, bestDistance = nil, radius or 20.0

	for _, entity in ipairs(GetGamePool(pool)) do
		if DoesEntityExist(entity) and entity ~= PlayerPedId() then
			local distance = #(origin - GetEntityCoords(entity))
			if distance < bestDistance then
				best, bestDistance = entity, distance
			end
		end
	end

	return best
end

lib.callback.register("triade_admin:deleteClosest", function(kind)
	local pool = (kind == "ped") and "CPed" or ((kind == "vehicle") and "CVehicle" or "CObject")
	local entity = closestOfPool(pool, 20.0)

	if not entity then return { ok = false } end

	-- Nunca apagar um ped que seja o corpo de um jogador: o jogo trata-o como qualquer ped no
	-- pool, e apagar deixa a pessoa sem personagem ate ao proximo respawn.
	if pool == "CPed" and IsPedAPlayer(entity) then
		return { ok = false }
	end

	local model = GetEntityModel(entity)
	SetEntityAsMissionEntity(entity, true, true)

	if pool == "CVehicle" then DeleteVehicle(entity) else DeleteEntity(entity) end
	if DoesEntityExist(entity) then DeleteEntity(entity) end

	return { ["ok"] = not DoesEntityExist(entity), ["model"] = model, ["label"] = TYPE_LABEL[GetEntityType(entity)] or kind }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONVENIENCIAS DE VEICULO
-----------------------------------------------------------------------------------------------------------------------------------------
local function nearestVehicleForTools(radius)
	local ped = PlayerPedId()
	if IsPedInAnyVehicle(ped, false) then return GetVehiclePedIsIn(ped, false) end

	local coords = GetEntityCoords(ped)
	local vehicle = GetClosestVehicle(coords.x, coords.y, coords.z, radius or 8.0, 0, 71)
	if vehicle and vehicle ~= 0 and DoesEntityExist(vehicle) then return vehicle end

	return nil
end

function TA_SetFuel(vehicle, amount)
	SetVehicleFuelLevel(vehicle, amount + 0.0)

	-- via autoritativa: o sistema de combustivel da base
	if GetResourceState("qs-fuelstations") == "started" then
		pcall(function() exports["qs-fuelstations"]:SetFuel(vehicle, amount + 0.0) end)
	end

	local state = Entity(vehicle) and Entity(vehicle).state
	if state then
		-- `true` replica para o servidor; sem isso o valor fica so neste cliente.
		pcall(function() state:set("fuel", amount, true) end)
	end
end

lib.callback.register("triade_admin:vehicleQuality", function(key)
	local vehicle = nearestVehicleForTools(8.0)
	if not vehicle then return { ok = false, message = "Nenhum veiculo por perto." } end

	if key == "wash" then
		SetVehicleDirtLevel(vehicle, 0.0)
		WashDecalsFromVehicle(vehicle, 1.0)
		return { ok = true, message = "Veiculo lavado." }
	end

	if key == "lock" or key == "unlock" then
		local locked = (key == "lock")
		-- 2 = trancado para todos, 1 = destrancado. `SetVehicleDoorsLockedForAllPlayers`
		-- acompanha, senao so tranca para quem executou.
		SetVehicleDoorsLocked(vehicle, locked and 2 or 1)
		SetVehicleDoorsLockedForAllPlayers(vehicle, locked)
		return { ok = true, message = locked and "Veiculo trancado." or "Veiculo destrancado." }
	end

	if key == "fuel" then
		TA_SetFuel(vehicle, 100.0)
		return { ok = true, message = "Tanque cheio." }
	end

	return { ok = false, message = "Acao desconhecida." }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- PRINT DA TELA E CHAT DA STAFF
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:screenshot", function(data)
	SendNUIMessage({ ["action"] = "screenshot", ["data"] = data })
end)

RegisterNetEvent("triade_admin:chat", function(message)
	SendNUIMessage({ ["action"] = "chat", ["data"] = message })
end)

RegisterNetEvent("triade_admin:chatCleared", function()
	SendNUIMessage({ ["action"] = "chatCleared" })
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- LIMPEZA
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("onResourceStop", function(resource)
	if resource ~= GetCurrentResourceName() then return end

	godmode = false
	invisible = false
	viewDistance = 1.0
	for key in pairs(dev) do dev[key] = false end

	local ped = PlayerPedId()
	SetEntityInvincible(ped, false)
	SetPlayerInvincible(PlayerId(), false)
	SetPedCanRagdoll(ped, true)
	SetEntityProofs(ped, false, false, false, false, false, false, false, false)
	SetEntityVisible(ped, true, false)
end)
