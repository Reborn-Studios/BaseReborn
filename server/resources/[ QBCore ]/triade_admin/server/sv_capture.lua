-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - CAPTURA DE IMAGENS DE VEICULO (SERVIDOR)
-----------------------------------------------------------------------------------------------------------------------------------------
TA.Capture = {
	["running"] = false,
	["admin"] = nil,
	["queue"] = {},
	["done"] = 0,
	["ok"] = 0,
	["fail"] = 0,
	["current"] = "",
	["failures"] = {},
	["startedAt"] = nil,
	["stopRequested"] = false
}

local CFG = function() return TriadeAdmin.Capture or {} end

-----------------------------------------------------------------------------------------------------------------------------------------
-- REGISTO DO QUE JA FOI CAPTURADO
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(2000)

	pcall(function()
		MySQL.query.await([[
			CREATE TABLE IF NOT EXISTS `triade_admin_vehicle_shots` (
				`spawn` VARCHAR(64) NOT NULL,
				`captured_at` DATETIME NULL DEFAULT NULL,
				`staff_id` INT(11) NOT NULL DEFAULT 0,
				PRIMARY KEY (`spawn`)
			) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
		]])
	end)
end)

local function jaCapturado()
	local set = {}
	local rows = MySQL.query.await("SELECT spawn FROM triade_admin_vehicle_shots") or {}
	for _, row in ipairs(rows) do set[string.lower(tostring(row.spawn))] = true end
	return set
end

-- Nao ha listagem de pasta no sandbox do FXServer, so io.open de ficheiro. Por isso a
-- pergunta e sempre "este modelo ja tem imagem?", um a um, e nunca "o que ha na pasta?".
local function temImagem(spawn)
	local folder = tostring(CFG().Folder or "")
	if folder == "" then return false end

	local f = io.open(folder .. "/" .. spawn .. ".png", "rb")
	if not f then return false end
	f:close()
	return true
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- MONTAR A FILA
-----------------------------------------------------------------------------------------------------------------------------------------
local function montarFila(modo, tipo)
	local capturados = jaCapturado()
	local fila = {}

	-- Excluidos pelo config. Vale mesmo no modo "todos": quem esta nesta lista esta la por
	-- partir o jogo, e "refazer todas" nao pode ser a porta dos fundos para o carregar.
	local saltar = {}
	for _, nome in ipairs(CFG().Skip or {}) do
		saltar[string.lower(tostring(nome))] = true
	end

	local function juntar(lista)
		for _, entry in ipairs(lista) do
			local spawn = string.lower(tostring(entry.spawn))

			-- So o que o jogo tem. Fotografar um modelo inexistente produz foto de nada --
			-- e o catalogo ja sabe quais sao, desde a validacao em jogo.
			local existe = (not TA.Catalog.inGame) or TA.Catalog.inGame[spawn]

			if existe and not saltar[spawn] then
				local tem = false
				-- Ja capturado por este painel (tabela) ou ja existe no disco. As duas fontes
				-- porque na VPS o io.open nao alcanca a pasta do XAMPP e so sobra a tabela.
				if modo ~= "todos" and (capturados[spawn] or temImagem(spawn)) then
					tem = true
				end

				if not tem then fila[#fila + 1] = spawn end
			end
		end
	end

	tipo = (tipo == "game" or tipo == "todos") and tipo or "addon"
	if tipo ~= "game" then juntar(TA.Catalog.addon) end
	if tipo ~= "addon" then juntar(TA.Catalog.game) end

	table.sort(fila)
	return fila
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- TIRAR UMA FOTO
-----------------------------------------------------------------------------------------------------------------------------------------
local function fotografar(source, spawn, ecraW, ecraH)
	local cfg = CFG()
	local caminho = tostring(cfg.Folder) .. "/" .. spawn .. ".png"

	local opcoes = {
		["fileName"] = caminho,
		["encoding"] = cfg.Encoding or "png",
		["quality"] = cfg.Quality or 0.92
	}

	local largura = TA.int(cfg.Width)
	if largura > 0 then
		opcoes["width"] = largura

		if not TA.Capture.avisouTamanho then
			TA.Capture.avisouTamanho = true
			print(("^5[triade_admin]^7 fotos a ^2%d^7 px de largura (altura pelo formato do jogo: %s).")
				:format(largura, (TA.int(ecraW) > 0 and TA.int(ecraH) > 0)
					and ("~" .. math.floor(largura * TA.int(ecraH) / TA.int(ecraW) + 0.5)) or "?"))
		end
	end

	local terminou, erro = false, nil

	exports["screenshot-basic"]:requestClientScreenshot(source, opcoes, function(err, data)
		erro = err
		terminou = true
	end)

	local esperou = 0
	local teto = (cfg.Timing and cfg.Timing.shot) or 15000
	while not terminou and esperou < teto do
		Wait(100)
		esperou = esperou + 100
	end

	if not terminou then return false, "o cliente nao devolveu a foto em " .. math.floor(teto / 1000) .. "s" end
	if erro then return false, tostring(erro) end
	return true
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- O LOTE
-----------------------------------------------------------------------------------------------------------------------------------------
local function avisar(source)
	TriggerClientEvent("triade_admin:captureProgress", source, {
		["enabled"] = (CFG().Enabled == true),
		["running"] = TA.Capture.running,
		["done"] = TA.Capture.done,
		["total"] = #TA.Capture.queue,
		["ok"] = TA.Capture.ok,
		["fail"] = TA.Capture.fail,
		["current"] = TA.Capture.current
	})
end

local function terminar(motivo)
	local source = TA.Capture.admin

	TA.Capture.running = false
	TA.Capture.current = ""

	if source and DoesPlayerExist(source) then
		TriggerClientEvent("triade_admin:captureEnd", source)
		SetPlayerRoutingBucket(source, 0)
		avisar(source)
		TA.notify(source, TA.Capture.fail > 0 and "aviso" or "sucesso",
			("Captura terminada: <b>%d</b> gravada(s), <b>%d</b> falha(s). %s"):format(TA.Capture.ok, TA.Capture.fail, motivo or ""), 12000)
	end

	print(("^2[triade_admin]^7 captura terminada: ^2%d^7 ok, ^1%d^7 falha(s). %s")
		:format(TA.Capture.ok, TA.Capture.fail, motivo or ""))

	if #TA.Capture.failures > 0 then
		TA.notify(source, "aviso",	"Verifique o console do Server para analisar as falhas", 12000)
		print("^3[triade_admin]^7 modelos que falharam:")
		for _, f in ipairs(TA.Capture.failures) do
			print(("   ^1%-28s^7 %s"):format(f.spawn, f.motivo))
		end
	end

	TA.Capture.admin = nil
	TA.Capture.stopRequested = false
end

local function correr()
	local source = TA.Capture.admin

	TriggerClientEvent("triade_admin:captureBegin", source)
	Wait(1500)		-- dar tempo a camara e ao teleporte antes do primeiro modelo

	for index, spawn in ipairs(TA.Capture.queue) do
		if TA.Capture.stopRequested then
			terminar("Parada a pedido.")
			return
		end

		if not DoesPlayerExist(source) then
			-- O admin caiu. Nao ha como continuar: e o cliente dele que desenha a cena.
			TA.Capture.running = false
			print("^3[triade_admin]^7 captura interrompida: o admin saiu do servidor.")
			terminar("O admin saiu.")
			return
		end

		TA.Capture.current = spawn

		local ok, resultado = pcall(function()
			return lib.callback.await("triade_admin:captureModel", source, spawn)
		end)

		if ok and resultado and resultado.ok then
			local gravou, motivo = fotografar(source, spawn, resultado.ecraW, resultado.ecraH)
			if gravou then
				TA.Capture.ok = TA.Capture.ok + 1
				MySQL.query("REPLACE INTO triade_admin_vehicle_shots (spawn, captured_at, staff_id) VALUES (?, ?, ?)", {
					spawn, TA.now(), vRP.getUserId(source) or 0
				})
			else
				TA.Capture.fail = TA.Capture.fail + 1
				TA.Capture.failures[#TA.Capture.failures + 1] = { ["spawn"] = spawn, ["motivo"] = motivo or "falha ao gravar" }
			end
		else
			TA.Capture.fail = TA.Capture.fail + 1
			local motivo = (ok and resultado and resultado.motivo) or "o cliente nao respondeu"
			TA.Capture.failures[#TA.Capture.failures + 1] = { ["spawn"] = spawn, ["motivo"] = motivo }
		end

		TA.Capture.done = index

		-- Avisar a interface a cada foto e barato e e o que torna o lote suportavel de ver.
		avisar(source)
	end

	terminar("")
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTA E ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("capture", "vehicle.capture", function(source)
	local cfg = CFG()

	local pendentes, pendentesGame = 0, 0
	if not TA.Capture.running and TA.Catalog.ready then
		local ok, fila = pcall(montarFila, "faltam", "addon")
		if ok then pendentes = #fila end

		local ok2, fila2 = pcall(montarFila, "faltam", "game")
		if ok2 then pendentesGame = #fila2 end
	end

	return {
		["enabled"] = cfg.Enabled == true,
		["running"] = TA.Capture.running,
		["done"] = TA.Capture.done,
		["total"] = #TA.Capture.queue,
		["ok"] = TA.Capture.ok,
		["fail"] = TA.Capture.fail,
		["current"] = TA.Capture.current,
		["pending"] = pendentes,
		["pendingGame"] = pendentesGame,
		["folder"] = tostring(cfg.Folder or ""),
		["validated"] = TA.Catalog.inGame ~= nil,
		["screenshot"] = GetResourceState("screenshot-basic") == "started",
		["failures"] = TA.Capture.failures,
		["mine"] = TA.Capture.admin == source
	}
end)

TA.action("vehicle.capture.start", "vehicle.capture", function(source, payload)
	local cfg = CFG()

	if cfg.Enabled ~= true then return { ok = false, message = "A captura esta desligada no config." } end
	if TA.Capture.running then return { ok = false, message = "Ja ha uma captura a correr." } end
	if GetResourceState("screenshot-basic") ~= "started" then
		return { ok = false, message = "O screenshot-basic nao esta a correr." }
	end
	if not TA.Catalog.ready then return { ok = false, message = "O catalogo de veiculos ainda nao esta pronto." } end

	-- Sem validacao em jogo nao sabemos quais modelos existem, e fotografar um inexistente
	-- produz uma imagem de nada -- pior do que nao ter imagem.
	if not TA.Catalog.inGame then
		return { ok = false, message = "O catalogo ainda nao foi validado no jogo. Abra a aba Veiculos uma vez e tente outra vez." }
	end

	local modo = (payload and payload.mode == "todos") and "todos" or "faltam"
	local tipo = payload and payload.kind or "addon"
	local fila = montarFila(modo, tipo)

	if #fila == 0 then
		return { ok = false, message = "Nao ha nada a capturar: todos ja tem imagem." }
	end

	local limite = TA.int(payload and payload.limit)
	if limite > 0 and limite < #fila then
		local curta = {}
		for i = 1, limite do curta[i] = fila[i] end
		fila = curta
	end

	TA.Capture.running = true
	TA.Capture.admin = source
	TA.Capture.queue = fila
	TA.Capture.done = 0
	TA.Capture.ok = 0
	TA.Capture.fail = 0
	TA.Capture.current = ""
	TA.Capture.failures = {}
	TA.Capture.startedAt = os.time()
	TA.Capture.stopRequested = false
	TA.Capture.avisouTamanho = false

	SetPlayerRoutingBucket(source, cfg.Bucket or 7400)

	TA.log(source, "captura-veiculos", ("inicio: %d modelo(s), modo %s, tipo %s"):format(#fila, modo, tipo))
	print(("^5[triade_admin]^7 captura de imagens iniciada: ^2%d^7 modelo(s), modo ^2%s^7, tipo ^2%s^7."):format(#fila, modo, tipo))
	print("^5[triade_admin]^7 primeiros da fila: ^2" .. table.concat(fila, ", ", 1, math.min(#fila, 8)) .. "^7")

	CreateThread(correr)

	return { ok = true, message = ("Captura iniciada: %d modelo(s). Nao saia do jogo."):format(#fila) }
end)

TA.action("vehicle.capture.stop", "vehicle.capture", function(source)
	if not TA.Capture.running then return { ok = false, message = "Nao ha captura a correr." } end

	TA.Capture.stopRequested = true
	return { ok = true, message = "A parar depois do modelo atual..." }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- SEGURANCA
-----------------------------------------------------------------------------------------------------------------------------------------
AddEventHandler("playerDropped", function()
	local source = source
	if TA.Capture.running and TA.Capture.admin == source then
		TA.Capture.stopRequested = true
		print("^3[triade_admin]^7 o admin da captura saiu; o lote vai parar no proximo modelo.")
	end
end)

RegisterCommand("triadeadmin_captura", function(source)
	if source ~= 0 then return end

	if not TA.Catalog.ready then
		print("^3[triade_admin]^7 catalogo ainda nao esta pronto.")
		return
	end

	CreateThread(function()
		local fila = montarFila("faltam", "addon")
		local filaGame = montarFila("faltam", "game")
		print("^5=====================================================================^7")
		print("^5 TRIADE ADMIN - CAPTURA DE IMAGENS DE VEICULO^7")
		print("^5=====================================================================^7")
		print("^7 Pasta de destino : ^2" .. tostring(CFG().Folder) .. "^7")
		print("^7 screenshot-basic : " .. (GetResourceState("screenshot-basic") == "started" and "^2a correr^7" or "^1parado^7"))
		print("^7 Catalogo validado: " .. (TA.Catalog.inGame and "^2sim^7" or "^1nao -- abra a aba Veiculos uma vez^7"))
		print("^7 Addons sem imagem: ^2" .. #fila .. "^7 modelo(s)  <- o alvo")
		local excluidos = CFG().Skip or {}
		if #excluidos > 0 then
			print("^7 Excluidos no config: ^3" .. table.concat(excluidos, ", ") .. "^7 (partem o jogo)")
		end
		print("^7 Do jogo sem img  : ^3" .. #filaGame .. "^7 modelo(s)  (vanilla/DLC, so a pedido)")
		print("^7 A correr agora   : " .. (TA.Capture.running and ("^2sim^7 (" .. TA.Capture.done .. "/" .. #TA.Capture.queue .. ")") or "^3nao^7"))
		print("")

		print("^7 Quem ve o cartao de captura:^7")
		local viram = 0
		for _, playerId in ipairs(GetPlayers()) do
			local src = tonumber(playerId)
			local roleId, passport = TA.role(src)

			if roleId then
				local pode = TA.allowedForRole(roleId, "vehicle.capture")
				if pode then viram = viram + 1 end
				print(("   id %-4s passaporte ^2%-6s^7 cargo ^2%-6s^7 %s")
					:format(playerId, tostring(passport), roleId,
						pode and "^2ve o cartao^7" or "^1NAO ve -- falta vehicle.capture^7"))
			end
		end
		if viram == 0 then
			print("   ^1nenhum staff online consegue ver o cartao^7")
		end

		print("")
		print("^7 Comeca-se pelo painel, na aba Veiculos. O admin fica preso enquanto corre.")
		print("^5=====================================================================^7")
	end)
end, true)
