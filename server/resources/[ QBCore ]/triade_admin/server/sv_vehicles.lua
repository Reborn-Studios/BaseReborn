-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA VEICULOS
-----------------------------------------------------------------------------------------------------------------------------------------
local function vehicleImage(spawn)
	local base = TriadeAdmin.Images.VehiclesURL and tostring(TriadeAdmin.Images.VehiclesURL) or ""
	if base ~= "" then
		return base .. tostring(spawn) .. ".png"
	end
	return tostring(spawn) .. ".png"
end

local function decorate(list)
	local result = {}
	for _, entry in ipairs(list) do
		result[#result + 1] = {
			["spawn"] = entry.spawn,
			["label"] = entry.label,
			["type"] = entry.type,
			["price"] = entry.price,
			["image"] = vehicleImage(entry.spawn)
		}
	end
	return result
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTA
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("vehicles", "tab.veiculos", function(source, payload)
	if not TA.Catalog.ready then
		return { ["game"] = {}, ["addon"] = {}, ["loading"] = true }
	end

	pcall(function() TA.validateCatalog(source) end)

	local gameIn, gameOut = TA.splitByGame(TA.Catalog.game)
	local addonIn, addonOut = TA.splitByGame(TA.Catalog.addon)

	-- Por omissao mostra so o que existe. Quem quiser ver o resto pede -- e ai mandamos as
	-- duas listas juntas, com os ausentes marcados, em vez de os deixar indistinguiveis.
	local mostrarTodos = payload and payload.all == true

	local function juntar(dentro, fora)
		if not mostrarTodos then return decorate(dentro) end

		local todos = decorate(dentro)
		for _, entry in ipairs(decorate(fora)) do
			entry.missing = true
			todos[#todos + 1] = entry
		end
		table.sort(todos, function(a, b) return a.spawn < b.spawn end)
		return todos
	end

	return {
		["game"] = juntar(gameIn, gameOut),
		["addon"] = juntar(addonIn, addonOut),
		["loading"] = false,
		["validated"] = TA.Catalog.inGame ~= nil,
		["validatedAt"] = TA.Catalog.validatedAt,
		["hidden"] = { ["game"] = #gameOut, ["addon"] = #addonOut },
		["showingAll"] = mostrarTodos
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- GARAGEM
-----------------------------------------------------------------------------------------------------------------------------------------
local GARAGE_TABLE = "owned_vehicles"

local function qsGarageActive()
	return GetResourceState("qs-advancedgarages") == "started"
end

local function modelNameFrom(row)
	if row.legacy_name and row.legacy_name ~= "" then return row.legacy_name end

	local hash = tonumber(row.hash)
	if not hash and row.vehicle then
		local ok, props = pcall(json.decode, row.vehicle)
		if ok and type(props) == "table" then hash = tonumber(props.model) end
	end

	if hash then
		local name = TA.Catalog.byHash[hash]
		if name then return name end
		return tostring(math.floor(hash))
	end

	return "desconhecido"
end

function TA.garageList(passport)
	local vehicles = {}

	if qsGarageActive() then
		local rows = MySQL.query.await([[
			SELECT o.plate, o.vehicle, o.hash, o.garage, o.stored, o.type, v.vehicle AS legacy_name
			FROM ]] .. GARAGE_TABLE .. [[ o
			LEFT JOIN vehicles v ON v.plate = o.plate
			WHERE o.owner = ?
			ORDER BY o.plate ASC
		]], { tostring(passport) }) or {}

		for _, row in ipairs(rows) do
			local spawn = modelNameFrom(row)
			local label = spawn
			local ok, name = pcall(function() return vRP.vehicleName(spawn) end)
			if ok and name and name ~= "" then label = name end

			vehicles[#vehicles + 1] = {
				["spawn"] = spawn,
				["plate"] = row.plate,
				["label"] = label,
				["garage"] = row.garage or "-",
["stored"] = TA.int(row.stored) == 1,
			["image"] = vehicleImage(spawn)
			}
		end

		return vehicles
	end

	-- Sem o qs-advancedgarages a correr, cai na garagem antiga do vRP.
	local rows = MySQL.query.await("SELECT vehicle, plate FROM vehicles WHERE user_id = ? ORDER BY vehicle ASC", { passport }) or {}
	for _, row in ipairs(rows) do
		local label = row.vehicle
		local ok, name = pcall(function() return vRP.vehicleName(row.vehicle) end)
		if ok and name and name ~= "" then label = name end

		vehicles[#vehicles + 1] = {
			["spawn"] = row.vehicle,
			["plate"] = row.plate,
			["label"] = label,
			["garage"] = "-",
			["stored"] = true,
			["image"] = vehicleImage(row.vehicle)
		}
	end

	return vehicles
end

TA.fetch("garage", "tab.veiculos", function(source, payload)
	local passport = TA.int(payload.passport)
	if passport <= 0 then return { ["vehicles"] = {} } end
	return { ["vehicles"] = TA.garageList(passport) }
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("vehicle.spawn", "vehicle.spawn", function(source, payload)
	local spawn = string.lower(TA.str(payload.spawn, 64))
	if spawn == "" then return { ok = false, message = "Informe o nome de spawn do veiculo." } end

	TriggerClientEvent("triade_admin:spawnVehicle", source, spawn)
	TA.log(source, "spawn-veiculo", spawn)
	return { ok = true, message = "Veiculo " .. spawn .. " spawnado." }
end)

TA.action("vehicle.give", "vehicle.give", function(source, payload)
	local spawn = string.lower(TA.str(payload.spawn, 64))
	local passport = TA.int(payload.passport)

	if spawn == "" then return { ok = false, message = "Informe o nome de spawn do veiculo." } end
	if passport <= 0 then return { ok = false, message = "Informe o passaporte de destino." } end
	if not TA.identity(passport) then return { ok = false, message = "Passaporte nao encontrado." } end

	local antes = #TA.garageList(passport)

	local ok, err = pcall(function() vRP.addUserVehicle(passport, spawn) end)
	if not ok then
		return { ok = false, message = "Falha ao entregar o veiculo: " .. tostring(err) }
	end

	-- addUserVehicle e assincrono do lado da garagem nova; damos tempo antes de reconferir.
	Wait(250)
	local depois = #TA.garageList(passport)
	if depois <= antes then
		return { ok = false, message = "O veiculo nao apareceu na garagem. Confirme se o nome de spawn " .. spawn .. " esta registado na base." }
	end

	local target = vRP.getUserSource(passport)
	if target then
		TA.notify(target, "sucesso", "Um veiculo foi adicionado a sua garagem: <b>" .. spawn .. "</b>.", 8000)
	end

	TA.log(source, "dar-veiculo", spawn .. " => passaporte " .. passport)
	return { ok = true, message = "Veiculo entregue ao passaporte " .. passport .. "." }
end)

TA.action("vehicle.remove", "vehicle.remove", function(source, payload)
	local spawn = string.lower(TA.str(payload.spawn, 64))
	local plate = TA.str(payload.plate, 20)
	local passport = TA.int(payload.passport)

	if passport <= 0 then return { ok = false, message = "Informe o passaporte." } end
	if spawn == "" and plate == "" then return { ok = false, message = "Informe o veiculo ou a placa." } end

	local alvos = {}
	for _, vehicle in ipairs(TA.garageList(passport)) do
		if plate ~= "" then
			if vehicle.plate == plate then alvos[#alvos + 1] = vehicle end
		elseif string.lower(tostring(vehicle.spawn)) == spawn then
			alvos[#alvos + 1] = vehicle
		end
	end

	if #alvos == 0 then
		return { ok = false, message = "Este passaporte nao possui " .. (plate ~= "" and ("a placa " .. plate) or ("o veiculo " .. spawn)) .. "." }
	end

	-- Apagar nas DUAS tabelas. So a owned_vehicles deixa o carro fora da garagem mas
	-- ainda registado para o MDT e para o checkMaxVehs; so a vehicles faz o contrario.
	for _, vehicle in ipairs(alvos) do
		MySQL.query.await("DELETE FROM owned_vehicles WHERE owner = ? AND plate = ?", { tostring(passport), vehicle.plate })
		MySQL.query.await("DELETE FROM vehicles WHERE user_id = ? AND plate = ?", { passport, vehicle.plate })
	end

	local detalhe = alvos[1].spawn .. " (placa " .. alvos[1].plate .. ")"
	if #alvos > 1 then detalhe = #alvos .. "x " .. alvos[1].spawn end

	TA.log(source, "remover-veiculo", detalhe .. " <= passaporte " .. passport)
	return { ok = true, message = (#alvos > 1 and (#alvos .. " veiculos removidos") or "Veiculo removido") .. " da garagem do passaporte " .. passport .. "." }
end)

TA.action("vehicle.repair", "vehicle.repair", function(source)
	TriggerClientEvent("triade_admin:repairVehicle", source)
	TA.log(source, "reparar-veiculo", "Veiculo atual/proximo")
	return { ok = true, message = "Veiculo reparado." }
end)

TA.action("vehicle.tune", "vehicle.repair", function(source)
	TriggerClientEvent("triade_admin:tuneVehicle", source)
	TA.log(source, "tunar-veiculo", "Veiculo atual/proximo")
	return { ok = true, message = "Tuning aplicado." }
end)

TA.action("vehicle.delete", "vehicle.delete", function(source)
	TriggerClientEvent("triade_admin:deleteVehicle", source)
	TA.log(source, "deletar-veiculo", "Veiculo atual/proximo")
	return { ok = true, message = "Veiculo deletado." }
end)

TA.action("vehicle.catalog", "vehicle.catalog", function(source, payload)
	local spawn = string.lower(TA.str(payload.spawn, 64))
	local label = TA.str(payload.label, 64)
	local kind = payload.kind == "addon" and "addon" or "game"

	if spawn == "" then return { ok = false, message = "Informe o nome de spawn." } end
	if label == "" then label = spawn end

	MySQL.query.await("REPLACE INTO triade_admin_catalog (spawn, label, kind, created_at) VALUES (?, ?, ?, ?)", { spawn, label, kind, TA.now() })
	CreateThread(function() TA.rebuildCatalog() end)

	TA.log(source, "catalogo-veiculo", spawn .. " (" .. kind .. ")")
	return { ok = true, message = "Veiculo adicionado ao catalogo." }
end)
