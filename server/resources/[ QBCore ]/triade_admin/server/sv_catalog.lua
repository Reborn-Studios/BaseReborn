-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - CATALOGO DE VEICULOS
-----------------------------------------------------------------------------------------------------------------------------------------
TA.Catalog = {
	["addon"] = {},
	["game"] = {},
	["addonSet"] = {},
	["byHash"] = {},		-- joaat -> nome de spawn
	["ready"] = false,

	-- Preenchidos pela validacao em jogo (ver a seccao VALIDACAO EM JOGO).
	["inGame"] = nil,		-- conjunto dos modelos que o jogo tem mesmo; nil = ainda nao validado
	["inGameCount"] = 0,
	["validatedAt"] = nil,
	["semAsset"] = {}		-- declarados em vehicles.meta sem .yft no disco
}

local function indexHash(map, name)
	local ok, hash = pcall(GetHashKey, name)
	if not ok or not hash then return end

	map[hash] = name
	if hash > 2147483647 then
		map[hash - 4294967296] = name
	elseif hash < 0 then
		map[hash + 4294967296] = name
	end
end

local CACHE_FILE = "data/vehicles_addon.json"

local function loadAddonCache()
	local models = {}

	local raw = LoadResourceFile(GetCurrentResourceName(), CACHE_FILE)
	if not raw then return models end

	local ok, decoded = pcall(json.decode, raw)
	if not ok or type(decoded) ~= "table" or type(decoded.models) ~= "table" then return models end

	for _, name in ipairs(decoded.models) do
		local clean = tostring(name):lower():gsub("%s+", "")
		if clean ~= "" then models[clean] = true end
	end

	-- Declarados num vehicles.meta mas sem o .yft no disco: nao nascem. Ficam de fora do
	-- catalogo e guardados a parte, para o diagnostico os poder nomear em vez de os sumir.
	TA.Catalog.semAsset = {}
	for _, name in ipairs(decoded.semAsset or {}) do
		TA.Catalog.semAsset[#TA.Catalog.semAsset + 1] = tostring(name):lower()
	end

	return models
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSTRUIR CATALOGO
-----------------------------------------------------------------------------------------------------------------------------------------
local function buildCatalog()
	local addonSet = loadAddonCache()

	if not next(addonSet) then
		print("^3[triade_admin]^7 data/vehicles_addon.json esta vazio. Corre tools/gerar_catalogo.bat (Windows) ou tools/gerar_catalogo.sh (Linux) e depois usa o comando triadeadmin_veiculos.")
	end

	-- Veiculos registados na base
	local registered = {}
	local ok, list = pcall(function() return vRP.vehicleGlobal() end)
	if ok and type(list) == "table" then
		for spawn, data in pairs(list) do
			local name = string.lower(tostring(spawn))
			registered[name] = {
				["spawn"] = name,
				["label"] = (type(data) == "table" and (data.name or data.modelo)) or name,
				["price"] = (type(data) == "table" and TA.int(data.price)) or 0,
				["type"] = (type(data) == "table" and tostring(data.type or "carros")) or "carros"
			}
		end
	end

	-- Extras adicionados manualmente pelo painel
	local extras = MySQL.query.await("SELECT spawn, label, kind FROM triade_admin_catalog") or {}
	for _, row in ipairs(extras) do
		local name = string.lower(tostring(row.spawn))
		registered[name] = registered[name] or { ["spawn"] = name, ["label"] = row.label or name, ["price"] = 0, ["type"] = "carros" }
		if row.kind == "addon" then addonSet[name] = true end
	end

	local addon, game = {}, {}

	for name in pairs(addonSet) do
		local data = registered[name]
		addon[#addon + 1] = {
			["spawn"] = name,
			["label"] = data and data.label or name,
			["type"] = data and data.type or "addon",
			["price"] = data and data.price or 0
		}
	end

	for name, data in pairs(registered) do
		if not addonSet[name] then
			game[#game + 1] = {
				["spawn"] = name,
				["label"] = data.label,
				["type"] = data.type,
				["price"] = data.price
			}
		end
	end

	table.sort(addon, function(a, b) return a.spawn < b.spawn end)
	table.sort(game, function(a, b) return a.spawn < b.spawn end)

	local byHash = {}
	for name in pairs(registered) do indexHash(byHash, name) end
	for name in pairs(addonSet) do indexHash(byHash, name) end

	TA.Catalog.addonSet = addonSet
	TA.Catalog.addon = addon
	TA.Catalog.game = game
	TA.Catalog.byHash = byHash
	TA.Catalog.ready = true

	print("^2[triade_admin]^7 catalogo pronto: ^2" .. #game .. "^7 veiculo(s) do jogo e ^2" .. #addon .. "^7 addon(s).")
end

function TA.rebuildCatalog()
	local ok, err = pcall(buildCatalog)
	if not ok then
		print("^1[triade_admin]^7 falha ao montar o catalogo de veiculos: " .. tostring(err))
		TA.Catalog.ready = true
	end
end

CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(4000)

	for attempt = 1, 6 do
		TA.rebuildCatalog()
		if #TA.Catalog.game > 0 or #TA.Catalog.addon > 0 then return end
		if attempt < 6 then Wait(5000) end
	end

	print("^3[triade_admin]^7 catalogo de veiculos vazio depois de 6 tentativas. Use ^3triadeadmin_veiculos^7 na consola quando o servidor estabilizar.")
end)

RegisterCommand("triadeadmin_veiculos", function(source)
	if source ~= 0 then return end
	print("^3[triade_admin]^7 a recarregar catalogo de veiculos...")
	CreateThread(function()
		TA.rebuildCatalog()
		TA.Catalog.inGame = nil		-- forca nova validacao com o catalogo novo
		TA.Catalog.validatedAt = nil
	end)
end, true)

-----------------------------------------------------------------------------------------------------------------------------------------
-- VALIDACAO EM JOGO
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.validateCatalog(source)
	if TA.Catalog.inGame then return true end
	if not source or source == 0 then return false end

	local ok, models = pcall(function()
		return lib.callback.await("triade_admin:gameModels", source)
	end)

	if not ok or type(models) ~= "table" or #models == 0 then
		-- Sem resposta nao filtramos nada: e melhor mostrar a lista inteira do que esconder o
		-- catalogo todo por causa de um cliente que nao respondeu.
		return false
	end

	local set = {}
	local total = 0
	for _, name in ipairs(models) do
		if type(name) == "string" and name ~= "" then
			set[string.lower(name)] = true
			total = total + 1
		end
	end

	TA.Catalog.inGame = set
	TA.Catalog.inGameCount = total
	TA.Catalog.validatedAt = os.date("%Y-%m-%d %H:%M:%S")

	local faltam = {}
	for _, entry in ipairs(TA.Catalog.game) do
		if not set[entry.spawn] then faltam[#faltam + 1] = entry.spawn end
	end
	for _, entry in ipairs(TA.Catalog.addon) do
		if not set[entry.spawn] then faltam[#faltam + 1] = entry.spawn end
	end

	print(("^2[triade_admin]^7 catalogo validado no jogo: ^2%d^7 modelos no cliente, ^3%d^7 do catalogo nao existem.")
		:format(total, #faltam))

	return true
end

function TA.splitByGame(list)
	if not TA.Catalog.inGame then return list, {} end

	local dentro, fora = {}, {}
	for _, entry in ipairs(list) do
		if TA.Catalog.inGame[entry.spawn] then
			dentro[#dentro + 1] = entry
		else
			fora[#fora + 1] = entry
		end
	end

	return dentro, fora
end

RegisterCommand("triadeadmin_veiculos_fantasma", function(source)
	if source ~= 0 then return end

	if not TA.Catalog.inGame then
		print("^3[triade_admin]^7 o catalogo ainda nao foi validado em jogo. Abra a aba Veiculos com um admin ligado e repita.")
		return
	end

	local _, foraGame = TA.splitByGame(TA.Catalog.game)
	local _, foraAddon = TA.splitByGame(TA.Catalog.addon)

	print("^5=====================================================================^7")
	print("^5 TRIADE ADMIN - VEICULOS DO CATALOGO QUE NAO EXISTEM NO JOGO^7")
	print("^5=====================================================================^7")
	print("^7 Validado em      : ^2" .. tostring(TA.Catalog.validatedAt) .. "^7")
	print("^7 Modelos no jogo  : ^2" .. TA.Catalog.inGameCount .. "^7")
	print("")
	print("^5 CATALOGO DA BASE (config/Vehicles.lua + concessionaria): ^1" .. #foraGame .. "^7 sem modelo")
	for _, entry in ipairs(foraGame) do
		print("   ^1" .. entry.spawn .. "^7  " .. tostring(entry.label))
	end
	print("")
	print("^5 ADDONS declarados em vehicles.meta: ^1" .. #foraAddon .. "^7 sem modelo")
	for _, entry in ipairs(foraAddon) do
		print("   ^1" .. entry.spawn .. "^7")
	end

	if #TA.Catalog.semAsset > 0 then
		print("")
		print("^5 DECLARADOS SEM .yft NO DISCO: ^3" .. #TA.Catalog.semAsset .. "^7 (ja ficam fora do catalogo)")
		print("   ^3" .. table.concat(TA.Catalog.semAsset, ", ") .. "^7")
	end

	print("^5=====================================================================^7")
	print("^7 Um veiculo a venda na concessionaria que apareca acima e uma compra perdida:")
	print("^7 o jogador paga e o carro nao nasce. Isso corrige-se no will_conce_v2/config.lua.")
	print("^5=====================================================================^7")
end, true)
