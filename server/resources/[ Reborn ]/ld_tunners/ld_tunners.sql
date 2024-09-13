CREATE TABLE IF NOT EXISTS `ld_tunners` (
  `car` text DEFAULT NULL,
  `plate` text DEFAULT NULL,
  `data` longtext DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
