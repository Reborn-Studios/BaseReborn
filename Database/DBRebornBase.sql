-- Copiando estrutura do banco de dados para rbn_base
CREATE DATABASE IF NOT EXISTS `rbn_base` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `rbn_base`;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
	`id` INT(12) NOT NULL AUTO_INCREMENT,
	`steam` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
  `identifier` VARCHAR(254) NULL DEFAULT '' COLLATE 'latin1_swedish_ci',
	`whitelist` TINYINT(1) NULL DEFAULT '0',
	`banned` TINYINT(1) NULL DEFAULT '0',
	`gems` INT(11) NOT NULL DEFAULT '0',
	`premium` INT(12) NOT NULL DEFAULT '0',
	`predays` INT(2) NOT NULL DEFAULT '0',
	`priority` INT(3) NOT NULL DEFAULT '0',
	`chars` INT(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `steam` (`steam`) USING BTREE
)COLLATE='latin1_swedish_ci' ENGINE=InnoDB;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` INT(11) UNSIGNED NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL DEFAULT 0,
  `permiss` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.vrp_srv_data
CREATE TABLE IF NOT EXISTS `vrp_srv_data` (
  `dkey` varchar(100) NOT NULL,
  `dvalue` text DEFAULT NULL,
  PRIMARY KEY (`dkey`),
  KEY `dkey` (`dkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.characters
CREATE TABLE IF NOT EXISTS `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `steam` varchar(100) DEFAULT NULL,
  `registration` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `name` varchar(50) DEFAULT 'Individuo',
  `name2` varchar(50) DEFAULT 'Indigente',
  `bank` int(12) NOT NULL DEFAULT 20000,
  `chavePix` varchar(255) DEFAULT NULL,
  `garage` int(3) NOT NULL DEFAULT 2,
  `prison` int(6) NOT NULL DEFAULT 0,
  `locate` int(1) NOT NULL DEFAULT 1,
  `deleted` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.vrp_user_data
CREATE TABLE IF NOT EXISTS `vrp_user_data` (
  `user_id` int(11) NOT NULL,
  `dkey` varchar(100) NOT NULL,
  `dvalue` text DEFAULT NULL,
  PRIMARY KEY (`user_id`,`dkey`),
  KEY `user_id` (`user_id`),
  KEY `dkey` (`dkey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.accounts_ids
CREATE TABLE IF NOT EXISTS `accounts_ids` (
  `identifier` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`identifier`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.vehicles
CREATE TABLE IF NOT EXISTS `vehicles` (
  `user_id` int(11) NOT NULL,
  `vehicle` varchar(100) NOT NULL,
  `plate` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `arrest` int(1) NOT NULL DEFAULT 0,
  `time` int(11) NOT NULL DEFAULT 0,
  `premiumtime` int(11) NOT NULL DEFAULT 0,
  `rentaltime` int(11) NOT NULL DEFAULT 0,
  `engine` int(4) NOT NULL DEFAULT 1000,
  `body` int(4) NOT NULL DEFAULT 1000,
  `fuel` int(3) NOT NULL DEFAULT 100,
  `work` varchar(10) NOT NULL DEFAULT 'false',
  `doors` varchar(254) NOT NULL,
  `windows` varchar(254) NOT NULL,
  `tyres` varchar(254) NOT NULL,
  `alugado` tinyint(4) NOT NULL DEFAULT 0,
  `data_alugado` text DEFAULT NULL,
  `stoled_by` text DEFAULT NULL,
  `stoled_at` text DEFAULT NULL,
  `garage` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`vehicle`),
  KEY `user_id` (`user_id`),
  KEY `vehicle` (`vehicle`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela rbn_base.will_sprays
CREATE TABLE IF NOT EXISTS `will_sprays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `x` float(8,4) NOT NULL,
  `y` float(8,4) NOT NULL,
  `z` float(8,4) NOT NULL,
  `rx` float(8,4) NOT NULL,
  `ry` float(8,4) NOT NULL,
  `rz` float(8,4) NOT NULL,
  `scale` float(8,4) NOT NULL,
  `text` varchar(32) NOT NULL,
  `font` varchar(32) NOT NULL,
  `color` varchar(50) NOT NULL DEFAULT '',
  `interior` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `will_ficha` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` INT(50) NULL DEFAULT NULL,
	`status` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`image` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`data` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`infos` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `user_bans` (
	`name` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`license` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`discord` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`ip` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`reason` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`expire` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`bannedby` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci'
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `will_battlepass` (
  `user_id` varchar(255) NULL DEFAULT '',
  `level` int(3) NOT NULL DEFAULT '0',
  `xp` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `ld_orgs` (
  `org` text NOT NULL DEFAULT '0',
  `bank` int(11) DEFAULT 0,
  `description` text DEFAULT NULL,
  `historico` text DEFAULT '{}',
  `permissions` longtext DEFAULT '{}',
  PRIMARY KEY (`org`(100))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `ld_orgs_daily` (
  `user_id` int(11) NOT NULL DEFAULT 0,
  `org` varchar(50) DEFAULT '0',
  `itens` longtext DEFAULT NULL,
  `dia` int(11) DEFAULT NULL,
  `reward` text DEFAULT '{}',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `ld_orgs_monthly` (
  `user_id` int(11) NOT NULL DEFAULT 0,
  `org` text DEFAULT NULL,
  `itens` text DEFAULT NULL,
  `mes` int(11) DEFAULT NULL,
  `payment` text DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `ld_orgs_farm` (
  `org` varchar(50) NOT NULL DEFAULT '',
  `type` text DEFAULT NULL,
  `daily` int(11) DEFAULT NULL,
  `monthly` int(11) DEFAULT NULL,
  `payment` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `will_homes` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`house_id` INT(11) NOT NULL DEFAULT '0',
	`owner` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`name` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`friends` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`theme` TEXT NOT NULL DEFAULT 'modern' COLLATE 'utf8mb4_general_ci',
	`vault` INT(11) NOT NULL DEFAULT '100',
	`extends` TEXT NOT NULL DEFAULT '[]' COLLATE 'utf8mb4_general_ci',
	`tax` INT(11) NOT NULL DEFAULT '1572029150',
	PRIMARY KEY (`id`) USING BTREE
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE IF NOT EXISTS `will_skinshops` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `coords` LONGTEXT NOT NULL COLLATE 'utf8mb3_general_ci',
  `permission` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb3_general_ci',
  `blockedCategories` LONGTEXT NOT NULL COLLATE 'utf8mb3_general_ci',
  INDEX `id` (`id`) USING BTREE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `will_clothes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
  `model` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
  `texture` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
  `price` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
  `isVip` CHAR(50) NULL DEFAULT 'false' COLLATE 'utf8mb3_general_ci',
  INDEX `id` (`id`) USING BTREE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `pause_marketplace_itens` (
	`id` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Name` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`Key` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Price` INT(11) NOT NULL,
	`Amount` INT(11) NOT NULL,
	`owner_id` VARCHAR(50) NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `pause_shopping` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`passport` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`item_name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`amount` INT(11) NOT NULL,
	`price` DECIMAL(10,2) NOT NULL,
	`discount` DECIMAL(10,2) NOT NULL,
	`image` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB MAX_ROWS=10;

CREATE TABLE IF NOT EXISTS `ox_doorlock` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `data` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `ox_doorlock` (`id`, `name`, `data`) VALUES
	(1, 'FarmMaconha', '{"model":-147325430,"state":0,"heading":116,"doors":false,"groups":{"VermelhosLider":0,"Vermelhos":0},"coords":{"x":98.08999633789063,"y":6327.26025390625,"z":31.52678871154785},"maxDistance":2}'),
	(2, 'FarmMeta', '{"groups":{"VerdesLider":0,"Verdes":0},"state":1,"maxDistance":2,"coords":{"x":1483.988037109375,"y":6391.357421875,"z":23.61026763916015},"model":-147325430,"heading":77,"doors":false}'),
	(3, 'FarmCoke', '{"groups":{"AzuisLider":0,"Azuis":0},"state":1,"maxDistance":2,"coords":{"x":-1096.8291015625,"y":4950.23486328125,"z":218.7862548828125},"model":-147325430,"heading":250,"doors":false}'),
	(4, 'Departamento Policial', '{"groups":{"Police":0},"state":1,"maxDistance":2,"coords":{"x":91.35662841796875,"y":-390.28375244140627,"z":42.50693130493164},"doors":[{"model":821473823,"coords":{"x":92.5790786743164,"y":-390.72711181640627,"z":42.50693130493164},"heading":160},{"model":821473823,"coords":{"x":90.13418579101563,"y":-389.84039306640627,"z":42.50693130493164},"heading":340}]}'),
	(5, 'Mecanica', '{"groups":{"mechanic":0},"state":1,"auto":true,"maxDistance":8,"coords":{"x":823.698974609375,"y":-992.8875122070313,"z":28.06938171386718},"model":-1858735571,"heading":1,"doors":false}'),
	(6, 'Joalheria', '{"hideUi":true,"coords":{"x":-631.19091796875,"y":-237.38540649414063,"z":38.2065315246582},"maxDistance":2,"state":1,"doors":[{"heading":306,"coords":{"x":-631.9553833007813,"y":-236.33326721191407,"z":38.2065315246582},"model":1425919976},{"heading":306,"coords":{"x":-630.426513671875,"y":-238.4375457763672,"z":38.2065315246582},"model":9467943}]}');
