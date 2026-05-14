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