DROP TABLE IF EXISTS `sv_banking_data`;
CREATE TABLE IF NOT EXISTS `sv_banking_data` (
    `uuid` VARCHAR(255) NOT NULL,
    `credit_score` INT(11) DEFAULT 0,
    `savings_balance` INT(100) DEFAULT 0,
    `transactions` JSON NOT NULL DEFAULT '[]',
    PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;