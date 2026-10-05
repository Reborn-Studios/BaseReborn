-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA LOCAIS
-----------------------------------------------------------------------------------------------------------------------------------------

-----------------------------------------------------------------------------------------------------------------------------------------
-- FONTES EXTERNAS
-----------------------------------------------------------------------------------------------------------------------------------------
local function tabelaExiste(nome)
	local ok, existe = pcall(function()
		return MySQL.scalar.await(
			"SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?",
			{ nome })
	end)
	return ok and TA.int(existe) > 0
end

local function decodificar(raw)
	if type(raw) ~= "string" or raw == "" then return nil end
	local ok, valor = pcall(json.decode, raw)
	if not ok or type(valor) ~= "table" then return nil end
	return valor
end

-- Bancadas: uma linha pode ter varios pontos, por isso o nome leva o indice quando ha mais
-- do que um -- senao apareciam tres "Bancada Milicia" sem se distinguirem.
local function pontosDasBancadas()
	if not tabelaExiste("rc_benches") then return {} end

	local rows = MySQL.query.await("SELECT id, label, org, mode, locations FROM rc_benches WHERE enabled = 1 ORDER BY label ASC") or {}
	local pontos = {}

	for _, row in ipairs(rows) do
		local lista = decodificar(row.locations) or {}
		for indice, ponto in ipairs(lista) do
			if ponto.x and ponto.y and ponto.z then
				local nome = tostring(row.label or "Bancada")
				if #lista > 1 then nome = nome .. " (" .. indice .. ")" end

				local detalhe = (row.org ~= nil and row.org ~= "") and ("org " .. row.org) or "sem org"
				if row.mode and row.mode ~= "" then detalhe = detalhe .. " - " .. row.mode end

				pontos[#pontos + 1] = {
					["name"] = nome,
					["x"] = ponto.x + 0.0, ["y"] = ponto.y + 0.0, ["z"] = ponto.z + 0.0,
					["h"] = (ponto.h or 0.0) + 0.0,
					["info"] = detalhe
				}
			end
		end
	end

	return pontos
end

-- Rotas: cada checkpoint e um ponto. O `label` do craft ja diz "Recolher X"/"Entregar X",
-- por isso o nome do local leva a rota a frente, que e o que falta para o situar.
local function pontosDasRotas(tipo)
	if not tabelaExiste("rc_routes") then return {} end

	local rows = MySQL.query.await("SELECT id, label, kind, item, checkpoints FROM rc_routes WHERE enabled = 1 AND kind = ? ORDER BY label ASC", { tipo }) or {}
	local pontos = {}

	for _, row in ipairs(rows) do
		local lista = decodificar(row.checkpoints) or {}
		for indice, ponto in ipairs(lista) do
			if ponto.x and ponto.y and ponto.z then
				pontos[#pontos + 1] = {
					["name"] = tostring(row.label or "Rota") .. " #" .. indice,
					["x"] = ponto.x + 0.0, ["y"] = ponto.y + 0.0, ["z"] = ponto.z + 0.0,
					["h"] = 0.0,
					["info"] = tostring(ponto.label or row.item or "")
						.. (ponto.amount and (" - " .. TA.int(ponto.amount) .. "un") or "")
				}
			end
		end
	end

	return pontos
end

local FONTES_EXTERNAS = {
	{ ["category"] = "Craft - Bancadas", ["build"] = pontosDasBancadas },
	{ ["category"] = "Craft - Coleta",   ["build"] = function() return pontosDasRotas("collect") end },
	{ ["category"] = "Craft - Entrega",  ["build"] = function() return pontosDasRotas("delivery") end }
}

-- Devolve categorias e locais das fontes externas, ja no formato da aba.
local function locaisExternos()
	local categorias, locais = {}, {}

	for _, fonte in ipairs(FONTES_EXTERNAS) do
		local ok, pontos = pcall(fonte.build)
		if not ok then
			print("^3[triade_admin]^7 fonte de locais '" .. fonte.category .. "' falhou: " .. tostring(pontos))
			pontos = {}
		end

		if #pontos > 0 then
			categorias[#categorias + 1] = {
				["name"] = fonte.category,
				["total"] = #pontos,
				["external"] = true
			}

			for _, ponto in ipairs(pontos) do
				locais[#locais + 1] = {
					["id"] = 0,
					["category"] = fonte.category,
					["name"] = ponto.name,
					["x"] = ponto.x, ["y"] = ponto.y, ["z"] = ponto.z, ["h"] = ponto.h,
					["info"] = ponto.info,
					["external"] = true
				}
			end
		end
	end

	return categorias, locais
end

TA.fetch("locations", "tab.locais", function(source)
	local categories = MySQL.query.await("SELECT name FROM triade_admin_categories ORDER BY name ASC") or {}
	local locations = MySQL.query.await("SELECT id, category, name, x, y, z, h FROM triade_admin_locations ORDER BY category ASC, name ASC") or {}

	local counts = {}
	for _, location in ipairs(locations) do
		counts[location.category] = (counts[location.category] or 0) + 1
	end

	local result = {}
	for _, category in ipairs(categories) do
		result[#result + 1] = { ["name"] = category.name, ["total"] = counts[category.name] or 0 }
	end

	-- As de fora vao no fim de proposito: as categorias da staff sao as que ela criou e usa
	-- todos os dias; estas sao referencia.
	local catExternas, locExternos = locaisExternos()
	for _, categoria in ipairs(catExternas) do result[#result + 1] = categoria end
	for _, local_ in ipairs(locExternos) do locations[#locations + 1] = local_ end

	return { ["categories"] = result, ["locations"] = locations }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("location.category", "local.create", function(source, payload)
	local name = TA.str(payload.name, 64)
	if name == "" then return { ok = false, message = "Informe o nome da categoria." } end

	local exists = MySQL.scalar.await("SELECT id FROM triade_admin_categories WHERE name = ?", { name })
	if exists then return { ok = false, message = "Esta categoria ja existe." } end

	MySQL.insert.await("INSERT INTO triade_admin_categories (name, created_by, created_at) VALUES (?, ?, ?)", {
		name, vRP.getUserId(source) or 0, TA.now()
	})

	TA.log(source, "categoria-criar", name)
	return { ok = true, message = "Categoria criada." }
end)

TA.action("location.categoryDelete", "local.delete", function(source, payload)
	local name = TA.str(payload.name, 64)
	if name == "" then return { ok = false, message = "Informe a categoria." } end

	local total = TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM triade_admin_locations WHERE category = ?", { name }) or 0)
	if total > 0 then return { ok = false, message = "Apague os " .. total .. " local(is) desta categoria primeiro." } end

	MySQL.query.await("DELETE FROM triade_admin_categories WHERE name = ?", { name })
	TA.log(source, "categoria-apagar", name)
	return { ok = true, message = "Categoria removida." }
end)

TA.action("location.create", "local.create", function(source, payload)
	local name = TA.str(payload.name, 64)
	local category = TA.str(payload.category, 64)

	if name == "" then return { ok = false, message = "Informe o nome do local." } end
	if category == "" then category = "Geral" end

	local exists = MySQL.scalar.await("SELECT id FROM triade_admin_categories WHERE name = ?", { category })
	if not exists then
		MySQL.insert.await("INSERT IGNORE INTO triade_admin_categories (name, created_by, created_at) VALUES (?, ?, ?)", {
			category, vRP.getUserId(source) or 0, TA.now()
		})
	end

	local x, y, z, h

	if payload.manual == true then
		local raw = TA.str(payload.coords, 120)
		local numbers = {}
		for value in raw:gmatch("%-?%d+%.?%d*") do numbers[#numbers + 1] = tonumber(value) end
		if #numbers < 3 then return { ok = false, message = "Use o formato X, Y, Z (ou X, Y, Z, H)." } end
		x, y, z, h = numbers[1], numbers[2], numbers[3], numbers[4] or 0.0
	else
		local coords = TA.coords(source)
		if not coords then return { ok = false, message = "Nao foi possivel obter a sua posicao." } end
		x, y, z, h = coords.x, coords.y, coords.z, coords.h
	end

	local id = MySQL.insert.await("INSERT INTO triade_admin_locations (category, name, x, y, z, h, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", {
		category, name, x, y, z, h, vRP.getUserId(source) or 0, TA.now()
	})

	TA.log(source, "local-criar", category .. " / " .. name)
	return { ok = true, message = "Local cadastrado com sucesso.", data = { ["id"] = id } }
end)

TA.action("location.delete", "local.delete", function(source, payload)
	local id = TA.int(payload.id)
	if id <= 0 then return { ok = false, message = "Local invalido." } end

	local row = MySQL.single.await("SELECT name, category FROM triade_admin_locations WHERE id = ?", { id })
	if not row then return { ok = false, message = "Local nao encontrado." } end

	MySQL.query.await("DELETE FROM triade_admin_locations WHERE id = ?", { id })
	TA.log(source, "local-apagar", row.category .. " / " .. row.name)
	return { ok = true, message = "Local removido." }
end)

TA.action("location.teleport", "local.teleport", function(source, payload)
	local id = TA.int(payload.id)

	if id <= 0 then
		local x, y, z = TA.num(payload.x), TA.num(payload.y), TA.num(payload.z)
		if x == 0.0 and y == 0.0 and z == 0.0 then
			return { ok = false, message = "Coordenada invalida." }
		end

		local nome = TA.str(payload.name, 64)
		if nome == "" then nome = "local externo" end

		TriggerClientEvent("triade_admin:teleport", source, x, y, z)
		TA.log(source, "local-teleporte", nome .. " (externo)")
		return { ok = true, message = "Teleportado para " .. nome .. "." }
	end

	local row = MySQL.single.await("SELECT name, x, y, z FROM triade_admin_locations WHERE id = ?", { id })
	if not row then return { ok = false, message = "Local nao encontrado." } end

	TriggerClientEvent("triade_admin:teleport", source, row.x, row.y, row.z)
	TA.log(source, "local-teleporte", row.name)
	return { ok = true, message = "Teleportado para " .. row.name .. "." }
end)

TA.action("location.current", "local.create", function(source)
	local coords = TA.coords(source)
	if not coords then return { ok = false, message = "Nao foi possivel obter a sua posicao." } end

	return {
		ok = true,
		message = "Coordenada capturada.",
		data = {
			["coords"] = string.format("%.2f, %.2f, %.2f", coords.x, coords.y, coords.z),
			["x"] = coords.x,
			["y"] = coords.y,
			["z"] = coords.z,
			["h"] = coords.h
		}
	}
end)
