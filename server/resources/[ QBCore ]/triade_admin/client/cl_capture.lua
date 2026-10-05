-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - CAPTURA DE IMAGENS DE VEICULO (CLIENTE)
-----------------------------------------------------------------------------------------------------------------------------------------
local capturing = false
local cam = nil
local veiculo = nil
local modeloAtual = nil

-- Estado do jogador antes de comecar, para devolver tudo no fim.
local antes = {
	["coords"] = nil,
	["heading"] = nil,
	["visivel"] = true,
	["weather"] = nil
}

local CFG = function() return TriadeAdmin.Capture end

-----------------------------------------------------------------------------------------------------------------------------------------
-- ENQUADRAMENTO
-----------------------------------------------------------------------------------------------------------------------------------------
local function enquadrar(minV, maxV, angDeg, fov, formato, fill, alturaCam)
	local ang = math.rad(angDeg)
	local meioV = math.tan(math.rad(fov) * 0.5)
	local meioH = meioV * formato

	local comp = math.abs(maxV.y - minV.y)
	local larg = math.abs(maxV.x - minV.x)
	local alt = math.abs(maxV.z - minV.z)
	local midZ = (minV.z + maxV.z) * 0.5

	-- Palpite inicial: a conta ortografica. So serve para arrancar perto do alvo.
	local silhueta = math.abs(comp * math.sin(ang)) + math.abs(larg * math.cos(ang))
	local dist = math.max((silhueta * 0.5) / (meioH * fill), (alt * 0.5) / (meioV * fill), 1.5)

	local elev, ocup = 0.0, 1.0

	for _ = 1, 16 do
		elev = alt * alturaCam + dist * 0.10

		-- Referencial do modelo: +y e a frente, +x e a direita. A camara fica a frente e ao
		-- lado; e o mesmo sitio que o codigo la em baixo calcula em coordenadas do mundo.
		local cx, cy, cz = -math.sin(ang) * dist, math.cos(ang) * dist, midZ + elev

		local fx, fy, fz = -cx, -cy, midZ - cz
		local fn = math.sqrt(fx * fx + fy * fy + fz * fz)
		fx, fy, fz = fx / fn, fy / fn, fz / fn

		local rx, ry = fy, -fx
		local rn = math.sqrt(rx * rx + ry * ry)
		rx, ry = rx / rn, ry / rn

		local ux, uy, uz = ry * fz, -rx * fz, rx * fy - ry * fx

		local minX, maxX, minY, maxY, perto = 1e9, -1e9, 1e9, -1e9, 1e9

		for _, sx in ipairs({ minV.x, maxV.x }) do
			for _, sy in ipairs({ minV.y, maxV.y }) do
				for _, sz in ipairs({ minV.z, maxV.z }) do
					local vx, vy, vz = sx - cx, sy - cy, sz - cz
					local z = vx * fx + vy * fy + vz * fz
					if z < perto then perto = z end
					if z > 0.05 then
						local px = (vx * rx + vy * ry) / (z * meioH)
						local py = (vx * ux + vy * uy + vz * uz) / (z * meioV)
						if px < minX then minX = px end
						if px > maxX then maxX = px end
						if py < minY then minY = py end
						if py > maxY then maxY = py end
					end
				end
			end
		end

		-- 1.0 = o quadro inteiro: as coordenadas projetadas vao de -1 a 1.
		ocup = math.max((maxX - minX) * 0.5, (maxY - minY) * 0.5)

		if perto < 0.5 or ocup > fill + 0.01 or ocup < fill - 0.03 then
			dist = math.max(dist * math.max(ocup / fill, 0.35), 1.2)
		else
			break
		end
	end

	return dist, elev, midZ, ocup
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- LIMPEZA
-----------------------------------------------------------------------------------------------------------------------------------------
local function limpar()
	if veiculo and DoesEntityExist(veiculo) then
		SetEntityAsMissionEntity(veiculo, true, true)
		DeleteVehicle(veiculo)
		if DoesEntityExist(veiculo) then DeleteEntity(veiculo) end
	end
	veiculo = nil

	if modeloAtual then
		SetModelAsNoLongerNeeded(modeloAtual)
		modeloAtual = nil
	end

	if cam then
		RenderScriptCams(false, false, 0, true, true)
		DestroyCam(cam, true)
		cam = nil
	end

	local ped = PlayerPedId()
	FreezeEntityPosition(ped, false)
	SetEntityInvincible(ped, false)
	SetEntityVisible(ped, antes.visivel ~= false, false)
	DisplayRadar(true)

	-- Devolver o clima ao do servidor. O laco do Controller nao faz isso sozinho: ele so
	-- reaplica quando `weatherSync` MUDA, e nos mexemos no clima sem tocar no statebag.
	local alvo = GlobalState.weatherSync or antes.weather
	if alvo then
		SetWeatherTypeNow(alvo)
		SetWeatherTypePersist(alvo)
		SetWeatherTypeNowPersist(alvo)
	end

	pcall(function() exports["Controller"]:ReleaseClock(GetCurrentResourceName()) end)

	if antes.coords then
		SetEntityCoordsNoOffset(ped, antes.coords.x, antes.coords.y, antes.coords.z, false, false, true)
		SetEntityHeading(ped, antes.heading or 0.0)
		antes.coords = nil
	end

	capturing = false
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- INICIO
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterNetEvent("triade_admin:captureBegin", function()
	if capturing then return end
	capturing = true

	local cfg = CFG()
	local ped = PlayerPedId()

	antes.coords = GetEntityCoords(ped)
	antes.heading = GetEntityHeading(ped)
	antes.visivel = IsEntityVisible(ped)
	antes.weather = GlobalState.weatherSync

	-- O ped vai junto para o sitio da captura: o servidor ja o pos no bucket isolado, mas o
	-- jogo so transmite entidades perto do jogador -- longe dali o carro nem chega a nascer.
	SetEntityCoordsNoOffset(ped, cfg.Coords[1], cfg.Coords[2], cfg.Coords[3], false, false, true)
	SetEntityHeading(ped, cfg.Heading or 0.0)
	FreezeEntityPosition(ped, true)
	SetEntityInvincible(ped, true)
	SetEntityVisible(ped, false, false)		-- senao o proprio admin aparece na foto
	DisplayRadar(false)

	-- Luz igual em todas as fotos.
	pcall(function()
		exports["Controller"]:HoldClock(GetCurrentResourceName(), cfg.Clock.hour, cfg.Clock.minute)
	end)
	NetworkOverrideClockTime(cfg.Clock.hour, cfg.Clock.minute, 0)

	local w = cfg.Weather or "EXTRASUNNY"
	SetWeatherTypeNow(w)
	SetWeatherTypePersist(w)
	SetWeatherTypeNowPersist(w)

	cam = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
	SetCamFov(cam, cfg.Camera.fov or 45.0)
	SetCamActive(cam, true)
	RenderScriptCams(true, false, 0, true, true)

	-- Esconder a HUD tem de ser por frame -- nao ha versao persistente.
	CreateThread(function()
		while capturing do
			HideHudAndRadarThisFrame()
			Wait(0)
		end
	end)
end)

RegisterNetEvent("triade_admin:captureEnd", function()
	limpar()
end)

-- Progresso: so reencaminha para a NUI desenhar a barra.
RegisterNetEvent("triade_admin:captureProgress", function(data)
	SendNUIMessage({ ["action"] = "captureProgress", ["data"] = data })
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- UM MODELO
-----------------------------------------------------------------------------------------------------------------------------------------
lib.callback.register("triade_admin:captureModel", function(spawn)
	if not capturing then return { ok = false, motivo = "captura nao iniciada" } end

	local cfg = CFG()

	-- Tirar o anterior de cena ANTES de carregar o proximo.
	if veiculo and DoesEntityExist(veiculo) then
		SetEntityAsMissionEntity(veiculo, true, true)
		DeleteVehicle(veiculo)
		if DoesEntityExist(veiculo) then DeleteEntity(veiculo) end
		veiculo = nil
	end
	if modeloAtual then
		SetModelAsNoLongerNeeded(modeloAtual)
		modeloAtual = nil
	end

	local hash = GetHashKey(spawn)
	if not IsModelInCdimage(hash) or not IsModelAVehicle(hash) then
		return { ok = false, motivo = "o jogo nao tem este modelo" }
	end

	RequestModel(hash)
	local esperou = 0
	local teto = (cfg.Timing and cfg.Timing.load) or 12000
	while not HasModelLoaded(hash) and esperou < teto do
		Wait(50)
		esperou = esperou + 50
	end

	if not HasModelLoaded(hash) then
		SetModelAsNoLongerNeeded(hash)
		return { ok = false, motivo = "modelo nao carregou em " .. math.floor(teto / 1000) .. "s" }
	end

	modeloAtual = hash

	local c = cfg.Coords
	veiculo = CreateVehicle(hash, c[1] + 0.0, c[2] + 0.0, c[3] + 0.0, cfg.Heading or 0.0, false, false)

	if not veiculo or veiculo == 0 or not DoesEntityExist(veiculo) then
		SetModelAsNoLongerNeeded(hash)
		modeloAtual = nil
		return { ok = false, motivo = "nao foi possivel criar o veiculo" }
	end

	-- Parado no ar, limpo e com o motor desligado: nada de fumo, luz de travao ou roda a girar.
	FreezeEntityPosition(veiculo, true)
	SetEntityCollision(veiculo, false, false)
	SetVehicleDirtLevel(veiculo, 0.0)
	SetVehicleEngineOn(veiculo, false, true, false)
	SetVehicleLights(veiculo, 1)
	SetVehicleDoorsShut(veiculo, true)
	SetEntityCoordsNoOffset(veiculo, c[1] + 0.0, c[2] + 0.0, c[3] + 0.0, false, false, true)

	local min, max = GetModelDimensions(hash)
	local largura = math.abs(max.x - min.x)
	local comprimento = math.abs(max.y - min.y)
	local altura = math.abs(max.z - min.z)
	local diagonal = math.sqrt(largura * largura + comprimento * comprimento + altura * altura)
	if diagonal < 1.0 then diagonal = 4.0 end

	local cam_cfg = cfg.Camera
	local ecraW, ecraH = GetActiveScreenResolution()
	local formato = (ecraW > 0 and ecraH > 0) and (ecraW / ecraH) or (16.0 / 9.0)
	local fov = cam_cfg.fov or 38.0

	local dist, elev, midZ = enquadrar(min, max, cam_cfg.yaw or 34.0, fov, formato,
		cam_cfg.fill or 0.86, cam_cfg.height or 0.38)

	-- MAIS o vetor de frente, nao menos. Com o sinal trocado a camara ficava ATRAS do
	-- carro e as primeiras 5 fotos de teste sairam todas de traseira -- inutil num catalogo.
	local yaw = math.rad((cfg.Heading or 0.0) + (cam_cfg.yaw or 34.0))
	local centro = GetEntityCoords(veiculo)
	local camX = centro.x - math.sin(yaw) * dist
	local camY = centro.y + math.cos(yaw) * dist

	SetCamCoord(cam, camX, camY, centro.z + midZ + elev)

	-- Ao CENTRO da caixa, nao a origem da entidade: a origem de um veiculo fica junto ao
	-- chao, e apontar la empurrava o carro para cima no quadro.
	PointCamAtCoord(cam, centro.x, centro.y, centro.z + midZ)
	SetCamFov(cam, fov)

	-- A hora e reposta a cada foto: o HoldClock impede o Controller de mexer, mas deixa o
	-- relogio correr ate 5 horas de jogo antes de o repor sozinho.
	NetworkOverrideClockTime(cfg.Clock.hour, cfg.Clock.minute, 0)

	-- Deixar o LOD e a textura assentarem. Sem isto os primeiros carros do lote saem em
	-- baixa resolucao.
	Wait((cfg.Timing and cfg.Timing.settle) or 500)

	-- A resolucao vai junto: e com ela que o servidor calcula a ALTURA do ficheiro, para a
	-- foto nao sair achatada em ecra que nao seja 16:9. (Lida no inicio do enquadramento.)
	return {
		ok = true,
		largura = largura, comprimento = comprimento, altura = altura,
		ecraW = ecraW, ecraH = ecraH
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- SEGURANCA
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("onResourceStop", function(resource)
	if resource ~= GetCurrentResourceName() then return end
	if capturing then limpar() end
end)
