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