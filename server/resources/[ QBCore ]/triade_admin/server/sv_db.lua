-----------------------------------------------------------------------------------------------------------------------------------------
-- TRIADE ADMIN - BANCO DE DADOS
-----------------------------------------------------------------------------------------------------------------------------------------
TA.Schema = {
	["charactersAge"] = false,
	["charactersIdentifier"] = "identifier",
	["accountsIdentifier"] = "identifier"
}

local TABLES = {
	[[CREATE TABLE IF NOT EXISTS `triade_admin_logs` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`staff_id` INT(11) NOT NULL DEFAULT 0,
		`staff_name` VARCHAR(100) NULL DEFAULT NULL,
		`action` VARCHAR(64) NOT NULL,
		`details` TEXT NULL DEFAULT NULL,
		`created_at` DATETIME NULL DEFAULT NULL,
		PRIMARY KEY (`id`),
		KEY `staff_id` (`staff_id`),
		KEY `action` (`action`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]],

	[[CREATE TABLE IF NOT EXISTS `triade_admin_permissions` (
		`perm_key` VARCHAR(64) NOT NULL,
		`role` VARCHAR(32) NOT NULL,
		`allowed` TINYINT(1) NOT NULL DEFAULT 0,
		PRIMARY KEY (`perm_key`, `role`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]],

	[[CREATE TABLE IF NOT EXISTS `triade_admin_warns` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`passport` INT(11) NOT NULL,
		`name` VARCHAR(64) NULL DEFAULT NULL,
		`name2` VARCHAR(64) NULL DEFAULT NULL,
		`reason` VARCHAR(255) NOT NULL,
		`minutes` INT(11) NOT NULL DEFAULT 0,
		`staff_id` INT(11) NOT NULL DEFAULT 0,
		`staff_name` VARCHAR(100) NULL DEFAULT NULL,
		`created_at` DATETIME NULL DEFAULT NULL,
		`expires_at` DATETIME NULL DEFAULT NULL,
		`expires_ts` INT(11) NOT NULL DEFAULT 0,
		`active` TINYINT(1) NOT NULL DEFAULT 1,
		PRIMARY KEY (`id`),
		KEY `passport` (`passport`),
		KEY `active` (`active`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]],

	[[CREATE TABLE IF NOT EXISTS `triade_admin_tickets` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`type` VARCHAR(32) NOT NULL,
		`passport` INT(11) NOT NULL,
		`name` VARCHAR(100) NULL DEFAULT NULL,
		`message` TEXT NULL DEFAULT NULL,
		`status` VARCHAR(16) NOT NULL DEFAULT 'aberto',
		`x` FLOAT NULL DEFAULT NULL,
		`y` FLOAT NULL DEFAULT NULL,
		`z` FLOAT NULL DEFAULT NULL,
		`staff_id` INT(11) NULL DEFAULT NULL,
		`staff_name` VARCHAR(100) NULL DEFAULT NULL,
		`created_at` DATETIME NULL DEFAULT NULL,
		`accepted_at` DATETIME NULL DEFAULT NULL,
		`closed_at` DATETIME NULL DEFAULT NULL,
		`rating` INT(2) NULL DEFAULT NULL,
		`comment` VARCHAR(255) NULL DEFAULT NULL,
		PRIMARY KEY (`id`),
		KEY `status` (`status`),
		KEY `staff_id` (`staff_id`),
		KEY `passport` (`passport`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]],

	[[CREATE TABLE IF NOT EXISTS `triade_admin_categories` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`name` VARCHAR(64) NOT NULL,
		`created_by` INT(11) NULL DEFAULT NULL,
		`created_at` DATETIME NULL DEFAULT NULL,
		PRIMARY KEY (`id`),
		UNIQUE KEY `name` (`name`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]],

	[[CREATE TABLE IF NOT EXISTS `triade_admin_locations` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`category` VARCHAR(64) NOT NULL DEFAULT 'Geral',
		`name` VARCHAR(64) NOT NULL,
		`x` FLOAT NOT NULL DEFAULT 0,
		`y` FLOAT NOT NULL DEFAULT 0,
		`z` FLOAT NOT NULL DEFAULT 0,
		`h` FLOAT NOT NULL DEFAULT 0,
		`created_by` INT(11) NULL DEFAULT NULL,
		`created_at` DATETIME NULL DEFAULT NULL,
		PRIMARY KEY (`id`),
		KEY `category` (`category`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]],

	[[CREATE TABLE IF NOT EXISTS `triade_admin_bans` (
		`id` INT(11) NOT NULL AUTO_INCREMENT,
		`passport` INT(11) NOT NULL,
		`name` VARCHAR(100) NULL DEFAULT NULL,
		`identifier` VARCHAR(254) NULL DEFAULT NULL,
		`action` VARCHAR(16) NOT NULL DEFAULT 'ban',
		`reason` VARCHAR(255) NULL DEFAULT NULL,
		`staff_id` INT(11) NOT NULL DEFAULT 0,
		`staff_name` VARCHAR(100) NULL DEFAULT NULL,
		`created_at` DATETIME NULL DEFAULT NULL,
		PRIMARY KEY (`id`),
		KEY `passport` (`passport`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]],

	[[CREATE TABLE IF NOT EXISTS `triade_admin_catalog` (
		`spawn` VARCHAR(64) NOT NULL,
		`label` VARCHAR(64) NULL DEFAULT NULL,
		`kind` VARCHAR(16) NOT NULL DEFAULT 'addon',
		`created_at` DATETIME NULL DEFAULT NULL,
		PRIMARY KEY (`spawn`)
	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4]]
}

-----------------------------------------------------------------------------------------------------------------------------------------
-- CARREGAR PERMISSOES SALVAS
-----------------------------------------------------------------------------------------------------------------------------------------
function TA.loadPermissions()
	TA.PermissionOverrides = {}
	local rows = MySQL.query.await("SELECT perm_key, role, allowed FROM triade_admin_permissions") or {}
	for _, row in ipairs(rows) do
		TA.PermissionOverrides[row.perm_key] = TA.PermissionOverrides[row.perm_key] or {}
		TA.PermissionOverrides[row.perm_key][row.role] = (TA.int(row.allowed) == 1)
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- DETECCAO DE COLUNAS
-----------------------------------------------------------------------------------------------------------------------------------------
local function columnsOf(tableName)
	local rows = MySQL.query.await("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?", { tableName }) or {}
	local found = {}
	for _, row in ipairs(rows) do
		found[string.lower(row.COLUMN_NAME or row.column_name or "")] = true
	end
	return found
end

local function detectSchema()
	local characters = columnsOf("characters")
	TA.Schema.charactersAge = characters["age"] == true

	if characters["identifier"] then
		TA.Schema.charactersIdentifier = "identifier"
	elseif characters["steam"] then
		TA.Schema.charactersIdentifier = "steam"
	end

	local accounts = columnsOf("accounts")
	if accounts["identifier"] then
		TA.Schema.accountsIdentifier = "identifier"
	elseif accounts["steam"] then
		TA.Schema.accountsIdentifier = "steam"
	end
end

-----------------------------------------------------------------------------------------------------------------------------------------
-- INICIALIZACAO
-----------------------------------------------------------------------------------------------------------------------------------------
CreateThread(function()
	while GetResourceState("oxmysql") ~= "started" do Wait(250) end
	Wait(1500)

	for _, query in ipairs(TABLES) do
		local ok, err = pcall(function() MySQL.query.await(query) end)
		if not ok then
			print("^1[triade_admin]^7 falha ao criar tabela: " .. tostring(err))
		end
	end

	-- Migracao: instalacoes antigas do painel podem nao ter expires_ts
	local warnColumns = MySQL.query.await("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'triade_admin_warns' AND COLUMN_NAME = 'expires_ts'") or {}
	if not warnColumns[1] then
		pcall(function() MySQL.query.await("ALTER TABLE `triade_admin_warns` ADD COLUMN `expires_ts` INT(11) NOT NULL DEFAULT 0") end)
	end

	detectSchema()
	TA.loadPermissions()

	-- Categorias padrao
	local total = MySQL.scalar.await("SELECT COUNT(*) FROM triade_admin_categories") or 0
	if TA.int(total) == 0 then
		for _, name in ipairs(TriadeAdmin.DefaultCategories) do
			MySQL.insert.await("INSERT IGNORE INTO triade_admin_categories (name, created_by, created_at) VALUES (?, ?, ?)", { name, 0, TA.now() })
		end
	end

	print("^2[triade_admin]^7 banco de dados pronto. Coluna de idade em characters: " .. tostring(TA.Schema.charactersAge))
end)
