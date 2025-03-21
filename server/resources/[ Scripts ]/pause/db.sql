CREATE TABLE `pause_marketplace_itens` (
	`id` VARCHAR(20) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Name` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`Key` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Price` INT(11) NOT NULL,
	`Amount` INT(11) NOT NULL,
	`owner_id` VARCHAR(50) NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

CREATE TABLE `pause_shopping` (
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