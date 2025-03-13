CREATE TABLE IF NOT EXISTS `gfx_racing` (
	`identifier` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`routes` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`racehistory` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`win` INT(11) NULL DEFAULT NULL,
	`lose` INT(11) NULL DEFAULT NULL,
	`favouritecar` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`distance` BIGINT(20) NULL DEFAULT NULL,
	`charname` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`incomingrace` INT(11) NULL DEFAULT NULL,
	`lastrace` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`playerphoto` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci'
) COLLATE='utf8mb3_general_ci' ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `races` (
	`owner` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`reward` INT(11) NULL DEFAULT NULL,
	`date` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`maxplayers` INT(11) NULL DEFAULT NULL,
	`route` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`id` BIGINT(20) NULL DEFAULT NULL,
	`players` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`luadate` LONGTEXT NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci'
) COLLATE='utf8mb3_general_ci' ENGINE=InnoDB;
