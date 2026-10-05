-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - DADOS DE UM PERSONAGEM
-----------------------------------------------------------------------------------------------------------------------------------------
TA.Character = {
	["map"] = {},			-- entradas validadas contra o schema
	["skipped"] = {},		-- entradas descartadas (tabela/coluna inexistente)
	["phoneScope"] = {},	-- tabelas do telefone ligadas por scope_id
	["ready"] = false
}

-- kind: "int"  -> a coluna guarda o passaporte como numero
--       "text" -> guarda como texto (o valor vai em tostring)
local CANDIDATES = {
	-- Identidade e conta do personagem ---------------------------------------------------------
	{ "permissions",					"user_id",			"int"  },
	{ "vrp_user_data",					"user_id",			"int"  },
	{ "charskins",						"user_id",			"text" },
	{ "avatars",						"Passport",			"int"  },
	{ "characters",						"id",				"int"  },

	-- Dinheiro, dividas e movimentos -----------------------------------------------------------
	{ "taxes",							"Passport",			"int"  },
	{ "invoices",						"Passport",			"int"  },
	{ "bank_transactions",				"Passport",			"int"  },
	{ "painel_transactions",			"Passport",			"int"  },

	-- Veiculos ---------------------------------------------------------------------------------
	{ "vehicles",						"user_id",			"int"  },
	{ "owned_vehicles",					"owner",			"text" },
	{ "player_vehicles",				"citizenid",		"text" },

	-- Inventario e armazens --------------------------------------------------------------------
	{ "ox_inventory",					"owner",			"text" },
	{ "warehouses",						"owner",			"text" },

	-- Casas ------------------------------------------------------------------------------------
	{ "will_homes",						"owner",			"text" },
	{ "will_rent",						"user_id",			"int"  },

	-- Faccoes e organizacoes -------------------------------------------------------------------
	-- { "triade_faccoes_membros",			"passaporte",		"int"  },
	-- { "triade_faccoes_horas",			"passaporte",		"int"  },
	-- { "triade_faccoes_banidos",			"passaporte",		"int"  },
	-- { "triade_faccoes_resgates",		"passaporte",		"int"  },
	-- { "qs_housing_agency_members",		"identifier",		"text" },

	-- Empregos, progressao e reputacao ---------------------------------------------------------
	{ "will_battlepass",				"user_id",			"text" },
	{ "will_ficha",						"user_id",			"int"  },

	-- MDT / ficha policial ---------------------------------------------------------------------
	{ "mdt_arrest",						"Passport",			"int"  },
	{ "mdt_fines",						"Passport",			"int"  },
	{ "mdt_internalaffairs",			"Passport",			"int"  },
	{ "mdt_reports",					"Passport",			"int"  },
	{ "mdt_vehicles",					"Passport",			"int"  },
	{ "mdt_wanted",						"Passport",			"int"  },
	{ "mdt_warning",					"Passport",			"int"  },

	-- Lazer e cosmeticos -----------------------------------------------------------------------
	{ "races",							"Passport",			"int"  },
	{ "pause_shopping",					"passport",			"text" },

	-- Telefone: contas de app (as filhas caem por FK em cascata) --------------------------------

	-- Do proprio painel ------------------------------------------------------------------------
	{ "triade_admin_warns",				"passport",			"int"  },
	{ "triade_admin_tickets",			"passport",			"int"  }
}

-- As tabelas do telefone que nao guardam o passaporte: ligam-se ao numero por `scope_id`.
-- Apagamos por scope_id depois de descobrir o(s) numero(s) do passaporte.
local PHONE_SCOPE_SOURCE = { ["table"] = "qs_phone_numbers", ["owner"] = "owner_identifier", ["scope"] = "scope_id" }

-----------------------------------------------------------------------------------------------------------------------------------------
-- VALIDACAO CONTRA O SCHEMA
-----------------------------------------------------------------------------------------------------------------------------------------
local function existingColumns()
	local rows = MySQL.query.await([[
		SELECT TABLE_NAME AS t, COLUMN_NAME AS c
		FROM INFORMATION_SCHEMA.COLUMNS
		WHERE TABLE_SCHEMA = DATABASE()
	]]) or {}

	local index = {}
	for _, row in ipairs(rows) do
		local t = string.lower(row.t or row.TABLE_NAME or "")
		local c = string.lower(row.c or row.COLUMN_NAME or "")
		index[t .. "." .. c] = true
	end
	return index
end

local function buildMap()
	local index = existingColumns()

	TA.Character.map = {}
	TA.Character.skipped = {}

	for _, entry in ipairs(CANDIDATES) do
		local tableName, column, kind = entry[1], entry[2], entry[3]
		if index[string.lower(tableName) .. "." .. string.lower(column)] then
			TA.Character.map[#TA.Character.map + 1] = { ["table"] = tableName, ["column"] = column, ["kind"] = kind }
		else
			TA.Character.skipped[#TA.Character.skipped + 1] = tableName .. "." .. column
		end
	end

	-- Tabelas do telefone que se ligam por scope_id.
	TA.Character.phoneScope = {}
	if index[string.lower(PHONE_SCOPE_SOURCE["table"]) .. "." .. string.lower(PHONE_SCOPE_SOURCE.scope)] then
		local rows = MySQL.query.await([[
			SELECT TABLE_NAME AS t FROM INFORMATION_SCHEMA.COLUMNS
			WHERE TABLE_SCHEMA = DATABASE() AND COLUMN_NAME = 'scope_id'
		]]) or {}
		for _, row in ipairs(rows) do
			local name = row.t or row.TABLE_NAME
			if name and name ~= PHONE_SCOPE_SOURCE["table"] then
				TA.Character.phoneScope[#TA.Character.phoneScope + 1] = name
			end
		end
	end

	TA.Character.ready = true
end

CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(2500)
	local ok, err = pcall(buildMap)
	if not ok then
		print("^1[triade_admin]^7 falha ao montar o mapa de tabelas do personagem: " .. tostring(err))
		TA.Character.ready = true
	end
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- APAGAR UM PERSONAGEM
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.wipeCharacterData(passport, dryRun)
	passport = TA.int(passport)
	local detail, errors, total = {}, {}, 0

	if passport <= 0 then return 0, detail, { "passaporte invalido" } end
	if not TA.Character.ready then return 0, detail, { "o mapa de tabelas ainda nao foi montado" } end

	local function value(kind)
		if kind == "text" then return tostring(passport) end
		return passport
	end

	-- 1. O telefone primeiro: precisamos do scope_id ANTES de apagar qs_phone_numbers.
	local scopes = {}
	if #TA.Character.phoneScope > 0 then
		local rows = MySQL.query.await(
			"SELECT " .. PHONE_SCOPE_SOURCE.scope .. " AS scope FROM " .. PHONE_SCOPE_SOURCE["table"] .. " WHERE " .. PHONE_SCOPE_SOURCE.owner .. " = ?",
			{ tostring(passport) }
		) or {}
		for _, row in ipairs(rows) do
			if row.scope and row.scope ~= "" then scopes[#scopes + 1] = row.scope end
		end
	end

	for _, scope in ipairs(scopes) do
		for _, tableName in ipairs(TA.Character.phoneScope) do
			local ok, affected = pcall(function()
				if dryRun then
					return TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM `" .. tableName .. "` WHERE scope_id = ?", { scope }))
				end
				return TA.int(MySQL.update.await("DELETE FROM `" .. tableName .. "` WHERE scope_id = ?", { scope }))
			end)

			if not ok then
				errors[#errors + 1] = tableName .. " (scope_id): " .. tostring(affected)
			elseif affected > 0 then
				detail[#detail + 1] = { ["table"] = tableName, ["column"] = "scope_id", ["rows"] = affected }
				total = total + affected
			end
		end
	end

	-- 2. Todas as outras tabelas.
	for _, entry in ipairs(TA.Character.map) do
		local ok, affected = pcall(function()
			if dryRun then
				return TA.int(MySQL.scalar.await("SELECT COUNT(*) FROM `" .. entry["table"] .. "` WHERE `" .. entry.column .. "` = ?", { value(entry.kind) }))
			end
			return TA.int(MySQL.update.await("DELETE FROM `" .. entry["table"] .. "` WHERE `" .. entry.column .. "` = ?", { value(entry.kind) }))
		end)

		if not ok then
			errors[#errors + 1] = entry["table"] .. "." .. entry.column .. ": " .. tostring(affected)
		elseif affected > 0 then
			detail[#detail + 1] = { ["table"] = entry["table"], ["column"] = entry.column, ["rows"] = affected }
			total = total + affected
		end
	end

	return total, detail, errors
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- MOVER UM PERSONAGEM PARA OUTRO PASSAPORTE
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.moveCharacterData(oldPassport, newPassport)
	oldPassport = TA.int(oldPassport)
	newPassport = TA.int(newPassport)

	local detail, errors, total = {}, {}, 0

	if oldPassport <= 0 or newPassport <= 0 then return 0, detail, { "passaporte invalido" } end
	if oldPassport == newPassport then return 0, detail, { "os dois passaportes sao iguais" } end
	if not TA.Character.ready then return 0, detail, { "o mapa de tabelas ainda nao foi montado" } end

	for _, entry in ipairs(TA.Character.map) do
		local from = (entry.kind == "text") and tostring(oldPassport) or oldPassport
		local to = (entry.kind == "text") and tostring(newPassport) or newPassport

		local ok, affected = pcall(function()
			return TA.int(MySQL.update.await(
				"UPDATE `" .. entry["table"] .. "` SET `" .. entry.column .. "` = ? WHERE `" .. entry.column .. "` = ?",
				{ to, from }
			))
		end)

		if not ok then
			errors[#errors + 1] = entry["table"] .. "." .. entry.column .. ": " .. tostring(affected)
		elseif affected > 0 then
			detail[#detail + 1] = { ["table"] = entry["table"], ["column"] = entry.column, ["rows"] = affected }
			total = total + affected
		end
	end

	return total, detail, errors
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- DIAGNOSTICO EM CONSOLA
-----------------------------------------------------------------------------------------------------------------------------------------
RegisterCommand("triadeadmin_personagem", function(source, args)
	if source ~= 0 then return end

	local passport = TA.int(args[1])
	if passport <= 0 then
		print("^3[triade_admin]^7 uso: triadeadmin_personagem <passaporte>")
		return
	end

	CreateThread(function()
		local total, detail, errors = TA.wipeCharacterData(passport, true)

		print("^5=====================================================================^7")
		print("^5 TRIADE ADMIN - DADOS DO PASSAPORTE " .. passport .. " (simulacao, nada foi apagado)^7")
		print("^5=====================================================================^7")
		print("^7 Tabelas no mapa   : ^2" .. #TA.Character.map .. "^7")
		print("^7 Tabelas ignoradas : ^3" .. #TA.Character.skipped .. "^7 (nao existem nesta base)")
		print("^7 Linhas encontradas: ^2" .. total .. "^7")
		print("")

		if #detail == 0 then
			print("   ^3nenhuma linha encontrada para este passaporte^7")
		end
		for _, row in ipairs(detail) do
			print("   " .. string.format("%-34s", row["table"] .. "." .. row.column) .. "^2" .. row.rows .. "^7")
		end

		if #errors > 0 then
			print("")
			print("^1 ERROS (" .. #errors .. ")^7")
			for _, message in ipairs(errors) do print("   ^1- " .. message .. "^7") end
		end
		print("^5=====================================================================^7")
	end)
end, true)
