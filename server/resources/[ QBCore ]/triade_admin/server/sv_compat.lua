-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - CAMADA DE COMPATIBILIDADE
-----------------------------------------------------------------------------------------------------------------------------------------
TA.Compat = {
	["ready"] = false,
	["inventory"] = "desconhecido",
	["garage"] = "desconhecido",
	["weather"] = "desconhecido",
	["resources"] = {},
	["images"] = {},
	["imagesMissing"] = {},
	["tables"] = {},
	["columns"] = {},
	["vrp"] = {},
	["warnings"] = {}
}

local function warn(message)
	TA.Compat.warnings[#TA.Compat.warnings + 1] = message
end

-- GetResourcePath devolve por vezes caminhos com barras duplas ("resources//[ Addons ]/x").
-- Abrem ficheiros na mesma, mas sujam os logs, por isso normaliza-se.
local function tidy(path)
	return (tostring(path or ""):gsub("\\", "/"):gsub("([^:])//+", "%1/"):gsub("/+$", ""))
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- RAIZ DO SERVIDOR
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.serverRoot()
	local path = tidy(GetResourcePath(GetCurrentResourceName()))

	local last, cursor = nil, 1
	while true do
		local found = path:find("/resources/", cursor, true)
		if not found then break end
		last = found
		cursor = found + 1
	end

	if last then return path:sub(1, last - 1) end
	return path
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- PASTAS DE IMAGENS
-----------------------------------------------------------------------------------------------------------------------------------------
local function folderExists(path)
	if type(os.rename) ~= "function" then return true, false end

	local ok, result = pcall(os.rename, path, path)
	if not ok then return true, false end

	return result and true or false, true
end

function TA.resolveFolder(entry)
	entry = tostring(entry or "")
	if entry == "" then return nil, "entrada vazia" end

	-- Absoluto: "C:/x", "C:\x" ou "/x"
	if entry:match("^%a:[/\\]") or entry:sub(1, 1) == "/" then
		local absolute = tidy(entry)
		local exists, verified = folderExists(absolute)
		if verified and not exists then
			return nil, "pasta '" .. absolute .. "' nao existe no disco"
		end
		return absolute
	end

	if entry:sub(1, 1) == "@" then
		local resource, sub = entry:match("^@([^/]+)/?(.*)$")
		if not resource then return nil, "formato invalido" end

		if GetResourceState(resource) == "missing" then
			return nil, "recurso '" .. resource .. "' nao existe"
		end

		local base = tidy(GetResourcePath(resource))
		if base == "" then return nil, "caminho do recurso '" .. resource .. "' nao resolvido" end

		if sub ~= "" then return tidy(base .. "/" .. sub) end
		return base
	end

	return tidy(TA.serverRoot() .. "/resources/" .. entry)
end

local function resolveImageFolders()
	local folders, missing = {}, {}

	for _, entry in ipairs(TriadeAdmin.Images.Folders or {}) do
		local resolved, reason = TA.resolveFolder(entry)
		if resolved then
			folders[#folders + 1] = resolved
		else
			missing[#missing + 1] = entry .. " (" .. tostring(reason) .. ")"
		end
	end

	TA.Compat.images = folders
	TA.Compat.imagesMissing = missing

	if #folders == 0 then
		warn("Nenhuma pasta de imagens foi resolvida: os icones de itens e veiculos vao depender do CDN remoto.")
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- RECURSOS
-----------------------------------------------------------------------------------------------------------------------------------------
local WATCHED = {
	"vrp", "ox_lib", "oxmysql", "ox_inventory",
	"qs-advancedgarages",
	"Controller", "mri_Qadmin"
}

local function detectResources()
	for _, name in ipairs(WATCHED) do
		TA.Compat.resources[name] = GetResourceState(name)
	end

	if TA.Compat.resources["ox_inventory"] == "started" then
		TA.Compat.inventory = "ox_inventory"
	else
		TA.Compat.inventory = "vrp"
		warn("ox_inventory nao esta iniciado: o inventario usa as funcoes nativas da vRP.")
	end

	if TA.Compat.resources["qs-advancedgarages"] == "started" then
		TA.Compat.garage = "qs-advancedgarages (owned_vehicles + vehicles)"
	else
		TA.Compat.garage = "vehicles (legado vRP)"
		warn("Nenhum sistema de garagem detetado: a aba Veiculos le e escreve so na tabela `vehicles`.")
	end

	if TA.Compat.resources["mri_Qadmin"] == "started" then
		warn("mri_Qadmin ainda esta a correr: os dois paineis convivem, mas escolha um antes de abrir para o publico.")
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- SONDAGEM DA API DA VRP
-----------------------------------------------------------------------------------------------------------------------------------------
local function probe(label, fn, validate)
	local ok, result = pcall(fn)

	if not ok then
		TA.Compat.vrp[label] = "erro"
		warn("vRP." .. label .. " rebentou ao ser chamada: " .. tostring(result))
		return false
	end

	if not validate(result) then
		TA.Compat.vrp[label] = "ausente"
		warn("vRP." .. label .. " nao devolveu o esperado: esta base pode nao ser compativel.")
		return false
	end

	TA.Compat.vrp[label] = "ok"
	return true
end

local function isTable(value) return type(value) == "table" end

local function detectVrpApi()
	probe("getUsers", function() return vRP.getUsers() end, isTable)
	probe("Groups", function() return vRP.Groups() end, function(v) return isTable(v) and next(v) ~= nil end)
	probe("vehicleGlobal", function() return vRP.vehicleGlobal() end, isTable)
	probe("format", function() return vRP.format(1234) end, function(v) return type(v) == "string" end)
	probe("getUserGroups", function() return vRP.getUserGroups(0) end, isTable)
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- BASE DE DADOS
-----------------------------------------------------------------------------------------------------------------------------------------
local REQUIRED_TABLES = { "characters", "accounts", "permissions", "vehicles", "vrp_user_data" }
local OPTIONAL_TABLES = { "accounts_ids" }

local function detectDatabase()
	local rows = MySQL.query.await("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE()") or {}
	local present = {}
	for _, row in ipairs(rows) do
		present[string.lower(row.TABLE_NAME or row.table_name or "")] = true
	end

	for _, name in ipairs(REQUIRED_TABLES) do
		TA.Compat.tables[name] = present[name] == true
		if not present[name] then
			warn("Tabela obrigatoria em falta: " .. name .. ". Varias abas do painel vao falhar.")
		end
	end

	for _, name in ipairs(OPTIONAL_TABLES) do
		TA.Compat.tables[name] = present[name] == true
	end

	TA.Compat.columns["characters.identifier"] = TA.Schema.charactersIdentifier
	TA.Compat.columns["accounts.identifier"] = TA.Schema.accountsIdentifier
	TA.Compat.columns["characters.age"] = TA.Schema.charactersAge and "coluna age" or "vrp_user_data (triade:age)"
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CLIMA
-----------------------------------------------------------------------------------------------------------------------------------------
local function detectWeather()
	local weather = GlobalState.weatherSync
	local hours = GlobalState.clockHours

	if weather ~= nil and hours ~= nil then
		TA.Compat.weather = "globalstate"
	elseif weather ~= nil then
		TA.Compat.weather = "parcial"
		warn("GlobalState.clockHours nao existe: a barra de horario da aba Clima nao vai ter efeito.")
	else
		TA.Compat.weather = "ausente"
		warn("GlobalState.weatherSync nao existe: esta base usa outro controlador de clima, a aba Clima nao vai ter efeito.")
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONTRATO INTERNO
-----------------------------------------------------------------------------------------------------------------------------------------
local function checkRegistry()
	local broken = 0

	for key, entry in pairs(TA.Actions) do
		if entry.permission and not TriadeAdmin.Permissions[entry.permission] then
			warn("Acao '" .. key .. "' aponta para a permissao inexistente '" .. entry.permission .. "'.")
			broken = broken + 1
		end
	end

	for key, entry in pairs(TA.Fetchers) do
		if entry.permission and not TriadeAdmin.Permissions[entry.permission] then
			warn("Consulta '" .. key .. "' aponta para a permissao inexistente '" .. entry.permission .. "'.")
			broken = broken + 1
		end
	end

	return broken
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- RELATORIO
-----------------------------------------------------------------------------------------------------------------------------------------
local function countPairs(tbl)
	local total = 0
	for _ in pairs(tbl) do total = total + 1 end
	return total
end

function TA.diagnostico()
	local lines = {}
	local function add(text) lines[#lines + 1] = text end

	add("^5=====================================================================^7")
	add("^5 TRIADE ADMIN - DIAGNOSTICO DE COMPATIBILIDADE^7")
	add("^5=====================================================================^7")

	add("^7 Raiz do servidor : ^2" .. TA.serverRoot() .. "^7")
	add("^7 Inventario       : ^2" .. TA.Compat.inventory .. "^7")
	add("^7 Garagens         : ^2" .. TA.Compat.garage .. "^7")
	add("^7 Clima            : ^2" .. TA.Compat.weather .. "^7")

	add("")
	add("^5 RECURSOS^7")
	for _, name in ipairs(WATCHED) do
		local state = TA.Compat.resources[name] or "?"
		local colour = (state == "started") and "^2" or ((state == "missing") and "^1" or "^3")
		add("   " .. string.format("%-18s", name) .. colour .. state .. "^7")
	end

	add("")
	add("^5 BASE DE DADOS^7")
	for _, name in ipairs(REQUIRED_TABLES) do
		add("   " .. string.format("%-26s", name) .. (TA.Compat.tables[name] and "^2existe^7" or "^1EM FALTA^7"))
	end
	for key, value in pairs(TA.Compat.columns) do
		add("   " .. string.format("%-26s", key) .. "^2" .. tostring(value) .. "^7")
	end

	add("")
	add("^5 API DA VRP (sondagem de leitura)^7")
	for name, state in pairs(TA.Compat.vrp) do
		local colour = (state == "ok") and "^2" or "^1"
		add("   " .. string.format("%-18s", name) .. colour .. state .. "^7")
	end

	add("")
	add("^5 IMAGENS^7")
	if #TA.Compat.images == 0 then
		add("   ^1nenhuma pasta resolvida^7")
	end
	for _, folder in ipairs(TA.Compat.images) do
		add("   ^2" .. folder .. "^7")
	end
	for _, entry in ipairs(TA.Compat.imagesMissing) do
		add("   ^3ignorada: " .. entry .. "^7")
	end

	add("")
	add("^5 DADOS DE PERSONAGEM (wipe e troca de passaporte)^7")
	if not (TA.Character and TA.Character.ready) then
		add("   ^3mapa ainda nao montado^7")
	else
		add("   tabelas no mapa       ^2" .. #TA.Character.map .. "^7")
		add("   tabelas do telefone   ^2" .. #(TA.Character.phoneScope or {}) .. "^7 (ligadas por scope_id)")
		if #TA.Character.skipped > 0 then
			add("   ignoradas             ^3" .. #TA.Character.skipped .. "^7 (nao existem nesta base)")
			for _, entry in ipairs(TA.Character.skipped) do
				add("      ^3" .. entry .. "^7")
			end
		end
		add("   ^7simular um wipe: ^2triadeadmin_personagem <passaporte>^7")
	end

	add("")
	add("^5 REGISTO INTERNO^7")
	add("   acoes registadas      ^2" .. countPairs(TA.Actions) .. "^7")
	add("   consultas registadas  ^2" .. countPairs(TA.Fetchers) .. "^7")
	add("   permissoes no config  ^2" .. countPairs(TriadeAdmin.Permissions) .. "^7")
	add("   itens no catalogo     ^2" .. tostring(TA.itemCount and TA.itemCount() or "?") .. "^7")
	add("   veiculos do jogo      ^2" .. #TA.Catalog.game .. "^7")
	add("   veiculos addon        ^2" .. #TA.Catalog.addon .. "^7")

	add("")
	if #TA.Compat.warnings == 0 then
		add("^2 Nenhum aviso: o painel encontrou tudo o que precisa.^7")
	else
		add("^3 AVISOS (" .. #TA.Compat.warnings .. ")^7")
		for _, message in ipairs(TA.Compat.warnings) do
			add("   ^3- " .. message .. "^7")
		end
	end
	add("^5=====================================================================^7")

	return lines
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- ARRANQUE
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(9000)

	resolveImageFolders()
	detectResources()
	detectWeather()

	pcall(detectDatabase)
	pcall(detectVrpApi)
	pcall(checkRegistry)

	TA.Compat.ready = true

	local diagnostics = TriadeAdmin.Diagnostics or {}

	if diagnostics.OnStart then
		-- Espera pelos catalogos para o relatorio sair com as contagens ja preenchidas.
		local waited = 0
		while (not TA.Catalog.ready or TA.itemCount() == 0) and waited < 20000 do
			Wait(500)
			waited = waited + 500
		end

		for _, line in ipairs(TA.diagnostico()) do print(line) end
	elseif #TA.Compat.warnings == 0 then
		print("^2[triade_admin]^7 compatibilidade verificada: nenhum aviso. Usa ^2triadeadmin_diagnostico^7 para o relatorio completo.")
	else
		print("^3[triade_admin]^7 compatibilidade verificada com ^3" .. #TA.Compat.warnings .. "^7 aviso(s). Corre ^3triadeadmin_diagnostico^7 para ver o relatorio.")
	end

	if diagnostics.SelfTestOnStart and TA.selftest then
		Wait(500)
		for _, line in ipairs(TA.selftest()) do print(line) end
	end
end)

RegisterCommand("triadeadmin_diagnostico", function(source)
	if source ~= 0 then return end
	for _, line in ipairs(TA.diagnostico()) do print(line) end
end, true)
