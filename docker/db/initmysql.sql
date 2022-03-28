-- Adminer 4.8.1 MySQL 5.5.5-10.6.5-MariaDB-1:10.6.5+maria~focal dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `adjustments`;
CREATE TABLE `adjustments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `stockID` int(10) unsigned NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `adjust` mediumint(9) NOT NULL,
  `quantity` mediumint(9) unsigned NOT NULL DEFAULT 0,
  `agentID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `adjustments_test` (`stockID`,`date_time`,`quantity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `adjustments` (`id`, `stockID`, `date_time`, `adjust`, `quantity`, `agentID`) VALUES
(3,	2,	'2022-03-25 23:59:18',	10,	0,	2),
(34,	1,	'2022-03-26 23:20:17',	8,	8,	1),
(35,	1,	'2022-03-26 23:22:21',	-4,	4,	1),
(36,	2,	'2022-03-26 23:22:39',	2,	12,	1),
(37,	5,	'2022-03-26 23:22:50',	1,	1,	1),
(38,	8,	'2022-03-26 23:40:40',	2,	2,	1),
(39,	8,	'2022-03-26 23:44:17',	-1,	1,	1),
(40,	1,	'2022-03-27 00:04:37',	3,	7,	1),
(41,	1,	'2022-03-27 00:04:54',	2,	9,	1),
(42,	1,	'2022-03-27 00:05:08',	3,	12,	1),
(43,	1,	'2022-03-27 00:05:18',	-2,	10,	1),
(44,	1,	'2022-03-27 00:06:39',	-3,	7,	1),
(45,	1,	'2022-03-27 00:11:09',	1,	8,	1),
(46,	1,	'2022-03-27 00:16:57',	-3,	5,	1),
(47,	2,	'2022-03-27 00:18:37',	9,	21,	1),
(48,	2,	'2022-03-27 00:18:54',	-3,	18,	1),
(49,	1,	'2022-03-27 00:20:58',	-1,	4,	1),
(50,	1,	'2022-03-27 00:42:22',	1,	5,	1),
(51,	1,	'2022-03-27 00:58:50',	4,	9,	1),
(58,	1,	'2022-03-27 09:53:08',	-2,	7,	1),
(59,	3,	'2022-03-27 09:53:45',	2,	2,	1),
(60,	6,	'2022-03-27 09:53:57',	3,	3,	1),
(61,	2,	'2022-03-27 15:05:11',	2,	20,	1),
(62,	2,	'2022-03-27 15:05:25',	1,	21,	1),
(63,	6,	'2022-03-27 18:29:30',	1,	4,	1),
(64,	6,	'2022-03-27 19:11:23',	1,	5,	1),
(65,	6,	'2022-03-27 19:11:29',	-2,	3,	1),
(66,	6,	'2022-03-27 20:30:28',	1,	4,	1),
(67,	2,	'2022-03-27 21:55:40',	-10,	11,	1),
(68,	1,	'2022-03-27 23:13:09',	1,	8,	1),
(69,	2,	'2022-03-27 23:13:38',	11,	22,	1),
(70,	2,	'2022-03-27 23:44:00',	2,	24,	1),
(71,	2,	'2022-03-27 23:44:24',	1,	25,	1),
(72,	2,	'2022-03-27 23:48:17',	-2,	23,	1),
(73,	2,	'2022-03-28 10:32:09',	1,	24,	1),
(74,	3,	'2022-03-28 10:56:28',	-1,	1,	1),
(75,	3,	'2022-03-28 11:00:12',	3,	4,	1),
(76,	3,	'2022-03-28 11:13:53',	1,	5,	1),
(77,	8,	'2022-03-28 16:54:24',	2,	3,	1),
(78,	1,	'2022-03-28 22:35:01',	2,	10,	1),
(79,	1,	'2022-03-28 22:39:36',	-2,	8,	1),
(80,	1,	'2022-03-28 22:39:48',	3,	11,	1);

DROP TABLE IF EXISTS `agents`;
CREATE TABLE `agents` (
  `agentID` int(10) unsigned NOT NULL,
  `email` varchar(40) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  PRIMARY KEY (`agentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `agents` (`agentID`, `email`, `first_name`, `last_name`) VALUES
(1,	'neil@britishclinicalservices.com',	'Neil',	'Anderson'),
(2,	'charley@computerwizards.uk',	'Charley',	'Reeson');

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `agents_perms`;
CREATE TABLE `agents_perms` (
  `agentID` int(10) unsigned NOT NULL,
  `canAddAdjustments` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `canAddNewStocks` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `canRemoveStocks` tinyint(1) unsigned NOT NULL DEFAULT 0,
  `canModifyStocks` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`agentID`),
  CONSTRAINT `agents_perms_ibfk_1` FOREIGN KEY (`agentID`) REFERENCES `agents` (`agentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `agents_perms` (`agentID`, `canAddAdjustments`, `canAddNewStocks`, `canRemoveStocks`, `canModifyStocks`) VALUES
(1,	1,	1,	1,	1);

DROP TABLE IF EXISTS `agents_settings`;
CREATE TABLE `agents_settings` (
  `agentID` int(10) unsigned NOT NULL,
  `timezone` varchar(40) NOT NULL DEFAULT 'Europe/London',
  PRIMARY KEY (`agentID`),
  CONSTRAINT `agents_settings_ibfk_1` FOREIGN KEY (`agentID`) REFERENCES `agents` (`agentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `agents_settings` (`agentID`, `timezone`) VALUES
(1,	'Europe/London'),
(2,	'Europe/London');

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `categories` (`id`, `label`) VALUES
(1,	'Parts'),
(2,	'HEPA Filters'),
(3,	'Equipment & Misc');

DROP TABLE IF EXISTS `stocks`;
CREATE TABLE `stocks` (
  `stockID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `quantity` mediumint(9) NOT NULL DEFAULT 0,
  `category` mediumint(8) unsigned NOT NULL,
  `minimum` smallint(5) unsigned NOT NULL DEFAULT 0,
  `threshold` smallint(5) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`stockID`),
  KEY `quantity` (`quantity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `stocks` (`stockID`, `name`, `quantity`, `category`, `minimum`, `threshold`) VALUES
(1,	'Scanlaf Gas Strut Housing/Fittings',	11,	1,	1,	0),
(2,	'Holten Door Latch Rod',	24,	1,	20,	5),
(3,	'Metal Clamp & Split Pin - unknown',	5,	1,	1,	0),
(4,	'Scanlaf Mars 1.2m Main-1220 x 457 x 110',	0,	2,	1,	0),
(5,	'Scanlaf Mars 1.2m primary Exhaust-610 x 457 x 66',	1,	2,	1,	0),
(6,	'Charcoal Sacks 25Kg',	4,	3,	0,	0),
(7,	'Matress Bags 10pk',	0,	3,	0,	0),
(8,	'APC Ergo Touch Pro2',	3,	3,	0,	2),
(9,	'Concept VI Count 1300',	0,	3,	1,	0),
(10,	'MSC Advantage 1.2m Main-1220 x 457 x 90',	0,	2,	1,	0);

DROP TABLE IF EXISTS `stocks_metadata`;
CREATE TABLE `stocks_metadata` (
  `tagID` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `stockID` int(10) unsigned NOT NULL,
  `tag` varchar(20) NOT NULL,
  PRIMARY KEY (`tagID`),
  KEY `stockID` (`stockID`),
  CONSTRAINT `stocks_metadata_ibfk_1` FOREIGN KEY (`stockID`) REFERENCES `stocks` (`stockID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `stocks_metadata` (`tagID`, `stockID`, `tag`) VALUES
(1,	4,	'size');

DROP TABLE IF EXISTS `stocks_notes`;
CREATE TABLE `stocks_notes` (
  `stockID` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `description` tinytext NOT NULL,
  KEY `stockID` (`stockID`),
  CONSTRAINT `stocks_notes_ibfk_1` FOREIGN KEY (`stockID`) REFERENCES `stocks` (`stockID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `stocks_notes` (`stockID`, `date`, `description`) VALUES
(1,	'2022-03-28 15:41:41',	'Not in good condition, needs renewing.');

-- 2022-03-28 23:38:33