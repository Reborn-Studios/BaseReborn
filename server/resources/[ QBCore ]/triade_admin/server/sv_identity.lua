-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - ABA ALTERAR RG
-----------------------------------------------------------------------------------------------------------------------------------------
local function refreshIdentity(passport)
	pcall(function() vRP.getUserIdentity(TA.int(passport), true) end)
	local target = vRP.getUserSource(TA.int(passport))
	if target then
		TriggerClientEvent("triade_admin:identityUpdated", target)
	end
end

local function getAge(passport)
	if TA.Schema.charactersAge then
		local row = MySQL.single.await("SELECT age FROM characters WHERE id = ?", { TA.int(passport) })
		if row then return TA.int(row.age) end
		return 0
	end

	local ok, value = pcall(function() return vRP.getUData(TA.int(passport), "triade:age") end)
	if ok and value then
		local decoded = json.decode(value)
		return TA.int(decoded)
	end
	return 0
end

local function setAge(passport, age)
	if TA.Schema.charactersAge then
		MySQL.update.await("UPDATE characters SET age = ? WHERE id = ?", { TA.int(age), TA.int(passport) })
	else
		pcall(function() vRP.setUData(TA.int(passport), "triade:age", json.encode(TA.int(age))) end)
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- CONSULTA
-----------------------------------------------------------------------------------------------------------------------------------------
TA.fetch("identity", "tab.rg", function(source, payload)
	local passport = TA.int(payload.passport)
	if passport <= 0 then return nil end

	local row = MySQL.single.await("SELECT id, name, name2, phone, registration, bank FROM characters WHERE id = ?", { passport })
	if not row then return nil end

	local target = vRP.getUserSource(passport)

	return {
		["passport"] = TA.int(row.id),
		["name"] = TA.str(row.name),
		["name2"] = TA.str(row.name2),
		["fullname"] = TA.str(row.name) .. " " .. TA.str(row.name2),
		["age"] = getAge(passport),
		["phone"] = TA.str(row.phone),
		["registration"] = TA.str(row.registration),
		["wallet"] = TA.wallet(passport),
		["bank"] = TA.int(row.bank),
		["online"] = target ~= nil,
		["hasAgeColumn"] = TA.Schema.charactersAge
	}
end)

-----------------------------------------------------------------------------------------------------------------------------------------
-- ALTERACOES
-----------------------------------------------------------------------------------------------------------------------------------------
TA.action("identity.set", "rg.edit", function(source, payload)
	local passport = TA.int(payload.passport)
	local field = TA.str(payload.field, 24)
	local value = payload.value

	if passport <= 0 then return { ok = false, message = "Informe um passaporte valido." } end
	if not TA.canTarget(source, passport) then
		return { ok = false, message = "Este jogador possui cargo igual ou superior ao seu." }
	end

	local exists = MySQL.scalar.await("SELECT id FROM characters WHERE id = ?", { passport })
	if not exists then return { ok = false, message = "Passaporte nao encontrado." } end

	if field == "name" or field == "name2" then
		local text = TA.str(value, 40)
		if text == "" then return { ok = false, message = "O campo nao pode ficar vazio." } end

		MySQL.update.await("UPDATE characters SET " .. (field == "name" and "name" or "name2") .. " = ? WHERE id = ?", { text, passport })
		local row = MySQL.single.await("SELECT name, name2 FROM characters WHERE id = ?", { passport })
		if row then
			pcall(function() vRP.upgradeNames(passport, row.name, row.name2) end)
		end

		refreshIdentity(passport)
		TA.log(source, "rg-" .. field, "Passaporte " .. passport .. " => " .. text)
		return { ok = true, message = "Dado atualizado com sucesso." }

	elseif field == "age" then
		local age = TA.int(value)
		if age < 1 or age > 120 then return { ok = false, message = "Informe uma idade entre 1 e 120." } end

		setAge(passport, age)
		refreshIdentity(passport)
		TA.log(source, "rg-idade", "Passaporte " .. passport .. " => " .. age)
		return { ok = true, message = "Idade atualizada." }

	elseif field == "phone" then
		local phone = TA.str(value, 20)
		if phone == "" then return { ok = false, message = "Informe um telefone." } end

		local taken = MySQL.scalar.await("SELECT id FROM characters WHERE phone = ? AND id <> ?", { phone, passport })
		if taken then return { ok = false, message = "Este telefone ja pertence ao passaporte " .. TA.int(taken) .. "." } end

		MySQL.update.await("UPDATE characters SET phone = ? WHERE id = ?", { phone, passport })
		pcall(function() vRP.upgradePhone(passport, phone) end)

		refreshIdentity(passport)
		TA.log(source, "rg-telefone", "Passaporte " .. passport .. " => " .. phone)
		return { ok = true, message = "Telefone atualizado." }

	elseif field == "registration" then
		local registration = TA.str(value, 20)
		if registration == "" then return { ok = false, message = "Informe um RG." } end

		local taken = MySQL.scalar.await("SELECT id FROM characters WHERE registration = ? AND id <> ?", { registration, passport })
		if taken then return { ok = false, message = "Este RG ja pertence ao passaporte " .. TA.int(taken) .. "." } end

		MySQL.update.await("UPDATE characters SET registration = ? WHERE id = ?", { registration, passport })
		refreshIdentity(passport)
		TA.log(source, "rg-registro", "Passaporte " .. passport .. " => " .. registration)
		return { ok = true, message = "RG atualizado." }

	elseif field == "bank" then
		if not TA.allowed(source, "rg.edit.money") then return { ok = false, message = "Sem permissao para alterar valores." } end

		local amount = TA.int(value)
		if amount < 0 then return { ok = false, message = "Informe um valor valido." } end

		pcall(function() vRP.setBank(passport, amount, "Painel administrativo") end)
		MySQL.update.await("UPDATE characters SET bank = ? WHERE id = ?", { amount, passport })

		refreshIdentity(passport)
		TA.log(source, "rg-banco", "Passaporte " .. passport .. " => " .. amount)
		return { ok = true, message = "Saldo bancario atualizado." }

	elseif field == "wallet" then
		if not TA.allowed(source, "rg.edit.money") then return { ok = false, message = "Sem permissao para alterar valores." } end

		local target = vRP.getUserSource(passport)
		if not target then return { ok = false, message = "O jogador precisa estar online para alterar a carteira." } end

		local amount = TA.int(value)
		if amount < 0 then return { ok = false, message = "Informe um valor valido." } end

		local current = TA.wallet(passport)
		if amount > current then
			pcall(function() vRP.giveInventoryItem(passport, "dollars", amount - current, true) end)
		elseif amount < current then
			pcall(function() vRP.tryGetInventoryItem(passport, "dollars", current - amount) end)
		end

		TA.log(source, "rg-carteira", "Passaporte " .. passport .. " => " .. amount)
		return { ok = true, message = "Carteira atualizada." }

	elseif field == "id" then
		if not TA.allowed(source, "rg.edit.id") then return { ok = false, message = "Sem permissao para alterar o passaporte." } end

		local newId = TA.int(value)
		if newId <= 0 then return { ok = false, message = "Informe um passaporte valido." } end
		if newId == passport then return { ok = false, message = "O novo passaporte e igual ao atual." } end

		if vRP.getUserSource(passport) then
			return { ok = false, message = "O jogador precisa estar offline para trocar o passaporte." }
		end

		local occupied = MySQL.scalar.await("SELECT id FROM characters WHERE id = ?", { newId })
		if occupied then return { ok = false, message = "O passaporte " .. newId .. " ja esta em uso." } end

		local moved = MySQL.update.await("UPDATE characters SET id = ? WHERE id = ?", { newId, passport })
		if TA.int(moved) == 0 then
			return { ok = false, message = "Nao foi possivel mover a ficha do personagem." }
		end

		MySQL.update.await("UPDATE accounts_ids SET user_id = ? WHERE user_id = ?", { newId, passport })

		local total, detail, errors = TA.moveCharacterData(passport, newId)

		if #errors > 0 then
			print("^1[triade_admin]^7 troca de passaporte " .. passport .. " => " .. newId .. " com " .. #errors .. " erro(s):")
			for _, message in ipairs(errors) do print("   ^1- " .. message .. "^7") end
		end

		TA.log(source, "rg-id", "Passaporte " .. passport .. " => " .. newId .. " | " .. total .. " linhas em " .. #detail .. " tabelas")

		local message = "Passaporte alterado para " .. newId .. ": " .. total .. " linha(s) movida(s) em " .. #detail .. " tabela(s)."
		if #errors > 0 then
			message = message .. " " .. #errors .. " tabela(s) deram erro -- veja a consola."
		end

		return { ok = true, message = message, data = { ["passport"] = newId } }
	end

	return { ok = false, message = "Campo desconhecido." }
end)
