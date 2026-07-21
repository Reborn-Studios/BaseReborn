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
  `permiss` text NOT NULL,
  `hierarchy` INT(11) NULL DEFAULT NULL
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

CREATE TABLE IF NOT EXISTS `charskins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `skin` text NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `active` (`active`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE IF NOT EXISTS `barbershops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'Barbearia',
  `coords` text NOT NULL,
  `blip` text NOT NULL DEFAULT 'false',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `barbershops` (`id`, `name`, `coords`, `blip`) VALUES
	(1, 'Barbearia 1', '{"x":-814.4227294921875,"y":-184.01123046875,"z":37.56891632080078}', '1'),
	(2, 'Barbearia 2', '{"x":137.20240783691407,"y":-1707.35986328125,"z":29.29161071777343}', '1'),
	(3, 'Barbearia 3', '{"x":-1282.607177734375,"y":-1116.9423828125,"z":6.49011516571044}', '1'),
	(4, 'Barbearia 4', '{"x":1931.1112060546876,"y":3730.650146484375,"z":32.34444236755371}', '1'),
	(5, 'Barbearia 5', '{"x":1212.8834228515626,"y":-472.9643249511719,"z":65.70804595947266}', '1'),
	(6, 'Barbearia 6', '{"x":-32.95664596557617,"y":-152.7146453857422,"z":56.57651901245117}', '1'),
	(7, 'Barbearia 7', '{"x":-277.6341552734375,"y":6227.82177734375,"z":31.19552421569824}', '1'),
  (8, 'Pier', '{"x":-1705.4554443359376,"z":13.51045608520507,"y":-1120.9957275390626}', '0');

CREATE TABLE IF NOT EXISTS `bank_transactions` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `Passport` int(10) NOT NULL DEFAULT 0,
  `Type` varchar(50) NOT NULL,
  `Price` int(20) NOT NULL,
  `Timestamp` int(20) NOT NULL DEFAULT 0,
  `Reference` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `Passport` (`Passport`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `Passport` int(10) NOT NULL DEFAULT 0,
  `Received` int(10) NOT NULL DEFAULT 0,
  `Type` varchar(50) NOT NULL,
  `Reason` longtext NOT NULL,
  `Timestamp` varchar(50) NOT NULL,
  `Price` int(20) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `Passport` (`Passport`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `taxes` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `Passport` int(10) NOT NULL DEFAULT 0,
  `Name` varchar(50) NOT NULL,
  `Timestamp` varchar(50) NOT NULL,
  `Price` int(20) NOT NULL,
  `Description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Passport` (`Passport`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `avatars` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Image` text DEFAULT NULL,
  `Permission` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `painel_transactions`;
CREATE TABLE IF NOT EXISTS `painel_transactions` (
  `Id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Type` varchar(50) NOT NULL DEFAULT 'Deposit',
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Value` bigint(19) NOT NULL DEFAULT 0,
  `Date` bigint(19) NOT NULL DEFAULT 0,
  `Transfer` bigint(19) DEFAULT 0,
  `Permission` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`Id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_arrest`;
CREATE TABLE IF NOT EXISTS `mdt_arrest` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Officer` bigint(19) NOT NULL DEFAULT 0,
  `Officers` longtext DEFAULT NULL,
  `Timestamp` bigint(19) NOT NULL DEFAULT 0,
  `Infractions` longtext DEFAULT NULL,
  `Arrest` bigint(19) NOT NULL DEFAULT 0,
  `Fine` bigint(19) NOT NULL DEFAULT 0,
  `Description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_board`;
CREATE TABLE IF NOT EXISTS `mdt_board` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Title` varchar(100) NOT NULL,
  `Description` longtext DEFAULT NULL,
  `Permission` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_fines`;
CREATE TABLE IF NOT EXISTS `mdt_fines` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Officer` bigint(19) NOT NULL DEFAULT 0,
  `Timestamp` bigint(19) NOT NULL DEFAULT 0,
  `Infractions` longtext DEFAULT NULL,
  `Fine` bigint(19) NOT NULL DEFAULT 0,
  `Description` longtext DEFAULT NULL,
  `Paid` tinyint(1) NOT NULL DEFAULT 0,
  `Arrest` bigint(19) DEFAULT NULL,
  `Date` varchar(10) NOT NULL DEFAULT '',
  `Hour` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `MDT_Arrest` (`Arrest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_medals`;
CREATE TABLE IF NOT EXISTS `mdt_medals` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Image` text NOT NULL DEFAULT '',
  `Name` varchar(150) NOT NULL DEFAULT 'Honra ao MÃ©rito',
  `Officers` longtext NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_penalcode_articles`;
CREATE TABLE IF NOT EXISTS `mdt_penalcode_articles` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Section` bigint(19) NOT NULL DEFAULT 0,
  `Article` varchar(250) NOT NULL,
  `Contravention` varchar(250) NOT NULL,
  `Fine` bigint(19) NOT NULL DEFAULT 0,
  `Arrest` bigint(19) NOT NULL DEFAULT 0,
  `Bail` bigint(19) NOT NULL DEFAULT 0,
  `Order` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `MDT_Section` (`Section`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_penalcode_sections`;
CREATE TABLE IF NOT EXISTS `mdt_penalcode_sections` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Type` varchar(10) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Description` longtext DEFAULT NULL,
  `Order` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_reports`;
CREATE TABLE IF NOT EXISTS `mdt_reports` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Title` text DEFAULT NULL,
  `Suspects` longtext NOT NULL DEFAULT '[]',
  `Officer` bigint(19) NOT NULL DEFAULT 0,
  `Timestamp` bigint(19) NOT NULL DEFAULT 0,
  `Description` longtext DEFAULT NULL,
  `Archive` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_internalaffairs`;
CREATE TABLE IF NOT EXISTS `mdt_internalaffairs` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Title` text DEFAULT NULL,
  `Suspect` bigint(19) NOT NULL DEFAULT 0,
  `Officer` bigint(19) NOT NULL DEFAULT 0,
  `Timestamp` bigint(19) NOT NULL DEFAULT 0,
  `Description` longtext DEFAULT NULL,
  `Archive` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_units`;
CREATE TABLE IF NOT EXISTS `mdt_units` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Image` text NOT NULL DEFAULT '',
  `Name` varchar(150) NOT NULL DEFAULT 'BCSO',
  `Permission` varchar(100) NOT NULL DEFAULT '',
  `Officers` longtext NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_vehicles`;
CREATE TABLE IF NOT EXISTS `mdt_vehicles` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Officer` bigint(19) NOT NULL DEFAULT 0,
  `Image` text NOT NULL DEFAULT '',
  `Vehicle` varchar(100) DEFAULT NULL,
  `Plate` varchar(10) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Timestamp` bigint(19) NOT NULL DEFAULT 0,
  `Description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_wanted`;
CREATE TABLE IF NOT EXISTS `mdt_wanted` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Image` text DEFAULT NULL,
  `Accusations` longtext DEFAULT NULL,
  `Officer` bigint(19) NOT NULL DEFAULT 0,
  `Timestamp` bigint(19) NOT NULL DEFAULT 0,
  `HowLong` int(5) NOT NULL DEFAULT 0,
  `Description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `mdt_warning`;
CREATE TABLE IF NOT EXISTS `mdt_warning` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Passport` bigint(19) NOT NULL DEFAULT 0,
  `Officer` bigint(19) NOT NULL DEFAULT 0,
  `Timestamp` bigint(19) NOT NULL DEFAULT 0,
  `Description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `mdt_fines`
  ADD CONSTRAINT `MDT_Arrest` FOREIGN KEY (`Arrest`) REFERENCES `mdt_arrest` (`id`) ON DELETE CASCADE;

ALTER TABLE `mdt_penalcode_articles`
  ADD CONSTRAINT `MDT_Section` FOREIGN KEY (`Section`) REFERENCES `mdt_penalcode_sections` (`id`) ON DELETE CASCADE;

INSERT INTO `mdt_penalcode_sections` (`id`, `Type`, `Title`, `Description`, `Order`) VALUES
	(1, 'Articles', 'Homicídios', '<p>Crimes relacionados a homicídios e tentativas.</p>', 1),
	(2, 'Articles', 'Roubos', '<p>Crimes relacionados a roubos pela cidade.</p>', 2),
	(3, 'Articles', 'Tráfico', '<p>Crimes relacionados ao tráfico e comércio ilegal.</p>', 3),
	(4, 'Articles', 'Obstrução e Desobediência', '<p>Crimes relacionados à desobediência e obstrução policial.</p>', 4),
	(5, 'Articles', 'Posse de Itens Ilegais', '<p>Posse de equipamentos utilizados em atividades criminosas.</p>', 5),
	(6, 'Articles', 'Infrações Diversas', '<p>Infrações gerais e administrativas.</p>', 6);

INSERT INTO `mdt_penalcode_articles` (`id`, `Section`, `Article`, `Contravention`, `Fine`, `Arrest`, `Bail`, `Order`) VALUES
	(1, 1, 'Homicídio', 'Assassinato ou execução de outro cidadão.', 1000, 10, 0, 1),
	(2, 2, 'Roubo ao Banco Central', 'Assalto ou invasão ao Banco Central da cidade.', 30000, 100, 0, 1),
	(3, 2, 'Roubo a Lojinha', 'Assalto a estabelecimento comercial de pequeno porte.', 5000, 20, 0, 2),
	(4, 1, 'Tentativa de Homicídio', 'Tentativa de assassinato sem consumação do ato.', 10000, 50, 0, 2),
	(5, 3, 'Tráfico de Armas', 'Comércio, distribuição ou transporte ilegal de armamentos.', 50000, 55, 0, 1),
	(6, 4, 'Desobediência', 'Descumprimento de ordens diretas de autoridades.', 5000, 10, 0, 1),
	(7, 5, 'Posse de Algema, Capuz, C4 ou Lockpick', 'Posse de itens utilizados em ações criminosas.', 20000, 35, 0, 1),
	(8, 6, 'Ocultação Facial', 'Uso de máscara ou acessório para ocultar identidade.', 7500, 0, 0, 1),
	(9, 2, 'Roubo a ATM', 'Violação, explosão ou furto em caixas eletrônicos.', 15000, 45, 0, 3),
	(10, 2, 'Roubo à Joalheria', 'Assalto a joalherias utilizando ameaça ou armamento.', 25000, 70, 0, 4),
	(11, 2, 'Roubo a Trem', 'Intercepção e roubo de carga ferroviária.', 40000, 90, 0, 5),
	(12, 2, 'Roubo a Yacht', 'Assalto ou invasão de embarcação de luxo.', 35000, 85, 0, 6),
	(13, 2, 'Roubo a Pessoas', 'Roubo de pertences pessoais mediante ameaça.', 3000, 15, 0, 7),
	(14, 2, 'Roubo de Veículo', 'Furto ou roubo de veículo automotor.', 8000, 25, 0, 8),
	(15, 2, 'Roubo de Carga', 'Subtração ilegal de carga comercial.', 18000, 50, 0, 9),
	(16, 2, 'Roubo ao Ammu-Nation', 'Assalto a loja de armamentos.', 30000, 80, 0, 10),
	(17, 2, 'Roubo a Residência', 'Invasão e furto em propriedade privada.', 12000, 35, 0, 11),
	(18, 2, 'Roubo ao Fleeca Bank', 'Assalto a agência bancária Fleeca.', 20000, 60, 0, 12),
	(19, 1, 'Sequestro', 'Privação da liberdade de outro cidadão mediante ameaça.', 25000, 75, 0, 3),
	(20, 1, 'Cárcere Privado', 'Manter cidadão preso contra sua vontade.', 18000, 55, 0, 4),
	(21, 1, 'Agressão Corporal', 'Ato de violência física contra outro indivíduo.', 4000, 15, 0, 5),
	(22, 1, 'Tentativa de Feminicídio', 'Tentativa de homicídio motivada por gênero.', 15000, 60, 0, 6),
	(23, 1, 'Tentativa de Latrocínio', 'Tentativa de roubo seguida de morte.', 20000, 65, 0, 7),
	(24, 5, 'Posse de Itens Ilegais', 'Posse de equipamentos ou materiais proibidos.', 10000, 25, 0, 2),
	(25, 5, 'Posse de Arma Ilegal', 'Porte de armamento sem autorização.', 12000, 30, 0, 3),
	(26, 5, 'Posse de Munição Ilegal', 'Porte de munições não registradas.', 7000, 20, 0, 4),
	(27, 5, 'Posse de Explosivos', 'Porte de C4 ou materiais explosivos.', 25000, 55, 0, 5),
	(28, 5, 'Porte de Lockpick', 'Posse de equipamento para arrombamento.', 5000, 15, 0, 6),
	(29, 5, 'Lavagem de Dinheiro', 'Ocultação ou movimentação ilegal de dinheiro.', 40000, 70, 0, 7),
	(30, 3, 'Tráfico de Drogas', 'Venda, transporte ou distribuição de drogas.', 20000, 45, 0, 2),
	(31, 3, 'Produção de Drogas', 'Fabricação ilegal de entorpecentes.', 25000, 60, 0, 3),
	(32, 3, 'Associação Criminosa', 'Participação em organização criminosa.', 30000, 70, 0, 4),
	(33, 4, 'Fuga Policial', 'Tentativa de evasão durante abordagem policial.', 8000, 20, 0, 2),
	(34, 4, 'Resistência à Prisão', 'Resistência física ou armada à prisão.', 10000, 25, 0, 3),
	(35, 4, 'Corrupção Policial', 'Tentativa de suborno a autoridade.', 15000, 40, 0, 4),
	(36, 4, 'Uso Indevido de Frequência', 'Uso ilegal de rádio policial ou frequência restrita.', 12000, 25, 0, 5),
	(37, 4, 'Falsa Identidade', 'Utilização de identidade falsa ou adulterada.', 9000, 20, 0, 6),
	(38, 6, 'Direção Perigosa', 'Condução perigosa colocando terceiros em risco.', 5000, 10, 0, 2),
	(39, 6, 'Racha Ilegal', 'Participação em corridas ilegais.', 7000, 15, 0, 3),
	(40, 6, 'Perturbação da Ordem', 'Ações que causem tumulto público.', 3000, 5, 0, 4),
	(41, 6, 'Invasão de Área Restrita', 'Entrada não autorizada em área restrita.', 6000, 15, 0, 5),
	(42, 6, 'Desmanche Ilegal', 'Operação de desmontagem clandestina de veículos.', 15000, 35, 0, 6),
	(43, 6, 'Uso de Colete Balístico', 'Uso de equipamento balístico em atividade suspeita.', 4000, 5, 0, 7);


INSERT INTO `mdt_board` (`id`, `Title`, `Description`, `Permission`) VALUES
(1, 'Titulo do aviso', 'Descrição do aviso.', 'LSPD'),
(2, 'Titulo do aviso', 'Descrição do aviso.', 'BCSO');

INSERT INTO `mdt_medals` (`id`, `Image`, `Name`, `Officers`) VALUES (1, 'nui://mdt/web-side/images/Units.png', 'Honra ao Mérito', '[]');

INSERT INTO `mdt_units` (`id`, `Image`, `Name`, `Permission`, `Officers`) VALUES
(1, 'nui://mdt/web-side/images/Units.png', 'RPS', 'LSPD', '[]'),
(2, 'nui://mdt/web-side/images/Units.png', 'GRAER', 'LSPD', '[]'),
(3, 'nui://mdt/web-side/images/Units.png', 'CMD', 'LSPD', '[1]'),
(4, 'nui://mdt/web-side/images/Units.png', 'GAR', 'LSPD', '[]'),
(5, 'nui://mdt/web-side/images/Units.png', 'GTM', 'LSPD', '[]'),
(6, 'nui://mdt/web-side/images/Units.png', 'GRI', 'LSPD', '[]'),
(7, 'nui://mdt/web-side/images/Units.png', 'RPS', 'BCSO', '[]'),
(8, 'nui://mdt/web-side/images/Units.png', 'GRAER', 'BCSO', '[]'),
(9, 'nui://mdt/web-side/images/Units.png', 'CMD', 'BCSO', '[]'),
(10, 'nui://mdt/web-side/images/Units.png', 'GAR', 'BCSO', '[]'),
(11, 'nui://mdt/web-side/images/Units.png', 'GTM', 'BCSO', '[]'),
(12, 'nui://mdt/web-side/images/Units.png', 'GRI', 'BCSO', '[]');

DROP TABLE IF EXISTS `mdt_permissions`;
CREATE TABLE IF NOT EXISTS `mdt_permissions` (
  `id` bigint(19) NOT NULL AUTO_INCREMENT,
  `Permission` varchar(100) NOT NULL DEFAULT '',
  `Members` int(10) NOT NULL DEFAULT 3,
  `Experience` bigint(19) NOT NULL DEFAULT 0,
  `Points` bigint(19) NOT NULL DEFAULT 0,
  `Bank` bigint(19) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `mdt_permissions` ADD `Premium` BIGINT(19) NOT NULL DEFAULT '0' AFTER `Bank`;
ALTER TABLE `mdt_permissions` ADD `Tags` INT(10) NOT NULL DEFAULT '3' AFTER `Members`;
ALTER TABLE `mdt_permissions` ADD `Announces` INT(10) NOT NULL DEFAULT '3' AFTER `Members`;

CREATE TABLE IF NOT EXISTS `will_crafting` (
  `craft_id` int(11) NOT NULL AUTO_INCREMENT,
  `craft_name` varchar(50) DEFAULT NULL,
  `crafting` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`crafting`)),
  `blipdata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`blipdata`)),
  `jobs` longtext DEFAULT NULL,
  PRIMARY KEY (`craft_id`)
) ENGINE=InnoDB AUTO_INCREMENT=899841 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `will_crafting` (`craft_id`, `craft_name`, `crafting`, `blipdata`, `jobs`) VALUES
	(143506, 'Mecânica', '{"heading":90.0,"model":"gr_prop_gr_bench_02a","jobenable":true,"propcoords":{"x":831.577880859375,"y":-933.1690673828125,"z":19.29009437561035},"blipenable":false}', 'null', '["Mecanico","MecanicoLider","mechanic","MecanicoGerente"]'),
	(147368, 'Bahamas', '{"heading":-192.0,"model":"gr_prop_gr_bench_02a","jobenable":true,"propcoords":{"x":2788.161376953125,"y":1952.59228515625,"z":98.58918762207031},"blipenable":false}', 'null', '["BahamasLider","Bahamas"]'),
	(575393, 'Mafia', '{"heading":-45.0,"model":"gr_prop_gr_bench_02a","jobenable":true,"propcoords":{"x":1599.2816162109376,"y":-1332.9921875,"z":90.55703735351563},"blipenable":false}', 'null', '["Mafia","MafiaLider"]'),
	(899840, 'Milicia', '{"heading":186.0,"offset":1,"blipenable":false,"jobenable":true,"propcoords":{"x":361.1529235839844,"y":1066.5849609375,"z":237.3751220703125},"model":"gr_prop_gr_bench_02a"}', 'null', '["Milicia","MiliciaLider"]');

CREATE TABLE IF NOT EXISTS `will_crafting-items` (
  `craft_id` int(11) DEFAULT NULL,
  `item` varchar(50) DEFAULT NULL,
  `item_label` varchar(50) DEFAULT NULL,
  `recipe` longtext DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `model` longtext DEFAULT NULL,
  `anim` longtext DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'Geral'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `will_crafting-items` (`craft_id`, `item`, `item_label`, `recipe`, `time`, `amount`, `model`, `anim`, `level`, `category`) VALUES
	(899840, 'ammo-9', 'Munição 9mm', '[{"item":"capsule","label":"Capsula","amount":3},{"item":"gunpowder","label":"Polvora","amount":3}]', 15, 1, 'prop_ld_ammo_pack_01', NULL, NULL, 'Pistola'),
	(899840, 'ammo-45', 'Munição .45 ACP', '[{"item":"capsule","label":"Capsula","amount":5},{"item":"gunpowder","label":"Polvora","amount":5}]', 15, 1, 'prop_box_ammo01a', NULL, NULL, 'Sub'),
	(899840, 'ammo-rifle2', 'Munição 7.62x39', '[{"item":"capsule","label":"Capsula","amount":7},{"item":"gunpowder","label":"Polvora","amount":7}]', 20, 1, 'prop_box_ammo07b', NULL, NULL, 'Rifle'),
	(899840, 'ammo-rifle', 'Munição 5.56x45', '[{"item":"capsule","label":"Capsula","amount":7},{"item":"gunpowder","label":"Polvora","amount":7}]', 20, 1, 'prop_ld_ammo_pack_03', NULL, NULL, 'Rifle'),
	(899840, 'ammo-shotgun', 'Munição 12', '[{"item":"capsule","label":"Capsula","amount":5},{"item":"gunpowder","label":"Polvora","amount":5}]', 20, 1, 'prop_ld_ammo_pack_02', NULL, NULL, 'Shotgun'),
	(575393, 'WEAPON_PISTOL_MK2', 'Five Seven', '[{"item":"pecadearma","label":"Peça de arma","amount":15},{"item":"armacaodearma","label":"Armação de arma","amount":15}]', 10, 1, 'w_pi_pistol', NULL, NULL, 'Pistolas'),
	(575393, 'WEAPON_PISTOL50', 'Desert Eagle', '[{"item":"pecadearma","label":"Peça de arma","amount":15},{"item":"armacaodearma","label":"Armação de arma","amount":15}]', 20, 1, 'w_pi_pistol50', NULL, NULL, 'Pistolas'),
	(575393, 'WEAPON_SMG_MK2', 'MP5', '[{"item":"pecadearma","label":"Peça de arma","amount":20},{"item":"armacaodearma","label":"Armação de arma","amount":20}]', 20, 1, 'w_sb_smg', NULL, NULL, 'Subs'),
	(575393, 'WEAPON_MICROSMG', 'Micro SMG', '[{"item":"pecadearma","label":"Peça de arma","amount":20},{"item":"armacaodearma","label":"Armação de arma","amount":20}]', 20, 1, 'w_sb_microsmg', NULL, NULL, 'Subs'),
	(575393, 'WEAPON_ASSAULTRIFLE', 'Rifle de Assalto', '[{"item":"pecadearma","label":"Peça de arma","amount":25},{"item":"armacaodearma","label":"Armação de arma","amount":25}]', 25, 1, 'w_ar_assaultrifle', NULL, NULL, 'Rifles'),
	(575393, 'WEAPON_CARBINERIFLE_MK2', 'M4A1', '[{"item":"pecadearma","label":"Peça de arma","amount":25},{"item":"armacaodearma","label":"Armação de arma","amount":25}]', 25, 1, 'w_ar_carbinerifle', NULL, NULL, 'Rifles'),
	(575393, 'WEAPON_BULLPUPRIFLE_MK2', 'Rifle Bullpup', '[{"item":"pecadearma","label":"Peça de arma","amount":25},{"item":"armacaodearma","label":"Armação de arma","amount":25}]', 25, 1, 'w_ar_bullpuprifle', NULL, NULL, 'Rifles'),
	(147368, 'lockpick', 'Lockpick', '[{"item":"aluminum","label":"Aluminio","amount":8},{"item":"copper","label":"Cobre","amount":6}]', 7, 1, 'm25_1_prop_m51_lockpick_01a', NULL, NULL, 'Roubos'),
	(147368, 'blackcard', 'Cartão preto', '[{"item":"plastic","label":"Plastico","amount":5},{"item":"eletronics","label":"Eletronicos","amount":5}]', 9, 1, 'prop_cs_r_business_card', NULL, NULL, 'Roubos'),
	(147368, 'bluecard', 'Cartão Azul', '[{"item":"plastic","label":"Plastico","amount":4},{"item":"eletronics","label":"Eletronicos","amount":4}]', 8, 1, 'hei_prop_heist_card_hack_02', NULL, NULL, 'Roubos'),
	(147368, 'c4', 'C4', '[{"item":"aluminum","label":"Aluminio","amount":8},{"item":"copper","label":"Cobre","amount":6},{"item":"gunpowder","label":"Polvora","amount":7},{"item":"eletronics","label":"Eletronicos","amount":2},{"item":"glass","label":"Vidro","amount":2}]', 12, 1, 'prop_c4_final', NULL, NULL, 'Roubos'),
	(147368, 'vest', 'Colete balistico', '[{"item":"aluminum","label":"Aluminio","amount":5},{"item":"copper","label":"Cobre","amount":5},{"item":"tecido","label":"Tecido","amount":20}]', 8, 1, NULL, NULL, NULL, 'Utensilio'),
	(147368, 'handcuff', 'Algemas', '[{"item":"aluminum","label":"Aluminio","amount":12}]', 5, 1, 'prop_cs_cuffs_01', NULL, NULL, 'Utensilio'),
	(147368, 'rope', 'Cordas', '[{"item":"tecido","label":"Tecido","amount":20}]', 6, 1, 'p_trev_rope_01_s', NULL, NULL, 'Utensilio'),
	(147368, 'hood', 'Capuz', '[{"item":"tecido","label":"Tecido","amount":15}]', 7, 1, 'p_steve_scuba_hood_s', NULL, NULL, 'Utensilio'),
	(147368, 'bag', 'Mochila de roubo', '[{"item":"tecido","label":"Tecido","amount":25}]', 8, 1, 'p_ld_heist_bag_s', NULL, NULL, 'Utensilio'),
	(147368, 'drill', 'Furadeira', '[{"item":"aluminum","label":"Aluminio","amount":25},{"item":"copper","label":"Cobre","amount":10},{"item":"eletronics","label":"Eletronicos","amount":5}]', 12, 1, 'prop_tool_drill', NULL, NULL, 'Utensilio'),
	(147368, 'thermite_h', 'Termita', '[{"item":"aluminum","label":"Aluminio","amount":20},{"item":"gunpowder","label":"Polvora","amount":20},{"item":"eletronics","label":"Eletronicos","amount":3}]', 10, 1, 'hei_prop_heist_thermite_flash', NULL, NULL, 'Roubos'),
	(147368, 'yacht_drill', 'Furadeira para yacht', '[{"item":"aluminum","label":"Aluminio","amount":25},{"item":"copper","label":"Cobre","amount":10},{"item":"eletronics","label":"Eletronicos","amount":5}]', 12, 1, 'hei_prop_heist_drill', NULL, NULL, 'Utensilio'),
	(147368, 'hack_usb', 'USB Hack', '[{"item":"aluminum","label":"Aluminio","amount":8},{"item":"copper","label":"Cobre","amount":3},{"item":"eletronics","label":"Eletronicos","amount":10}]', 8, 1, 'hei_prop_hst_usb_drive', NULL, NULL, 'Roubos'),
	(147368, 'cutter', 'Alicate', '[{"item":"aluminum","label":"Aluminio","amount":10},{"item":"plastic","label":"Plastico","amount":5}]', 8, 1, 'prop_tool_pliers', NULL, NULL, 'Utensilio'),
	(143506, 'toolbox', 'Caixa de Ferramentas', '[{"item":"aluminum","label":"Aluminio","amount":10},{"item":"copper","label":"Cobre","amount":10}]', 10, 1, 'prop_tool_box_04', NULL, NULL, 'Geral'),
	(575393, 'WEAPON_BULLPUPRIFLE_MK2', 'Bullpup Rifle', '[{"label":"Armação","item":"armacaodearma","amount":20},{"label":"Peça de arma","item":"pecadearma","amount":10},{"label":"Aluminio","item":"aluminum","amount":25}]', 15, 1, NULL, NULL, NULL, 'Rifles');
