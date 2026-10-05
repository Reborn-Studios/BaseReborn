-- ---------------------------------------------------------------------------------------------
-- TRIADE ADMIN - TABELAS
-- O recurso cria estas tabelas automaticamente no arranque (server/sv_db.lua).
-- Este ficheiro existe apenas para quem prefere importar a mao.
-- ---------------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `triade_admin_logs` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`staff_id` INT(11) NOT NULL DEFAULT 0,
	`staff_name` VARCHAR(100) NULL DEFAULT NULL,
	`action` VARCHAR(64) NOT NULL,
	`details` TEXT NULL DEFAULT NULL,
	`created_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `staff_id` (`staff_id`),
	KEY `action` (`action`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `triade_admin_permissions` (
	`perm_key` VARCHAR(64) NOT NULL,
	`role` VARCHAR(32) NOT NULL,
	`allowed` TINYINT(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (`perm_key`, `role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `triade_admin_warns` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `triade_admin_tickets` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `triade_admin_categories` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(64) NOT NULL,
	`created_by` INT(11) NULL DEFAULT NULL,
	`created_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `triade_admin_locations` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `triade_admin_bans` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Chat interno da staff (aba Registos). Criada por server/sv_tools.lua no arranque.
CREATE TABLE IF NOT EXISTS `triade_admin_chat` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`staff_id` INT(11) NOT NULL DEFAULT 0,
	`staff_name` VARCHAR(100) NULL DEFAULT NULL,
	`staff_role` VARCHAR(32) NULL DEFAULT NULL,
	`message` VARCHAR(400) NOT NULL,
	`created_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Registo do que a captura de imagens ja fotografou. Criada por server/sv_capture.lua.
-- Existe porque na VPS o io.open do FXServer nao alcanca a pasta do XAMPP: sem esta tabela nao
-- havia como saber o que ja tem imagem.
CREATE TABLE IF NOT EXISTS `triade_admin_vehicle_shots` (
	`spawn` VARCHAR(64) NOT NULL,
	`captured_at` DATETIME NULL DEFAULT NULL,
	`staff_id` INT(11) NOT NULL DEFAULT 0,
	PRIMARY KEY (`spawn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `triade_admin_catalog` (
	`spawn` VARCHAR(64) NOT NULL,
	`label` VARCHAR(64) NULL DEFAULT NULL,
	`kind` VARCHAR(16) NOT NULL DEFAULT 'addon',
	`created_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`spawn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- OPCIONAL: guardar a idade diretamente em characters (senao fica em vrp_user_data).
-- ALTER TABLE `characters` ADD COLUMN `age` INT(3) NOT NULL DEFAULT 21;
