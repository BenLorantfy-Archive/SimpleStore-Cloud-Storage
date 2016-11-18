# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.42)
# Database: simplestore
# Generation Time: 2016-11-18 00:56:40 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table File
# ------------------------------------------------------------

DROP TABLE IF EXISTS `File`;

CREATE TABLE `File` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `path` varchar(500) NOT NULL DEFAULT '',
  `owner` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner` (`owner`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table Token
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Token`;

CREATE TABLE `Token` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL DEFAULT '',
  `dateIssued` varchar(50) NOT NULL DEFAULT '',
  `userId` int(11) unsigned NOT NULL,
  `revoked` int(11) NOT NULL DEFAULT '0',
  `dateRevoked` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `token_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL DEFAULT '',
  `hash` varchar(255) NOT NULL DEFAULT '',
  `dateCreated` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`id`, `username`, `hash`, `dateCreated`)
VALUES
	(1,'ben','$2a$06$qFvr6Rs.8JuyFpwjWlTsEejjoPky9ynSWI8qglcN2mzXUfVHusaKG','2016-11-18T00:47:09.396Z'),
	(2,'greg','$2a$06$kcWMfQz/Nyx2NBg79JWc6emmjsLSRsJI3lLcfiJIOupZcyjUkGXsy','2016-11-18T00:47:09.396Z'),
	(3,'kyle','$2a$06$d9S9U3Drlvpomtu7CQNmbeMZG9P.WHyBp9auzh9AmBsXDgsSzFfXy','2016-11-18T00:47:09.396Z'),
	(4,'amshar','$2a$06$SMeP8tYBFb7bfJ08La8p9us07Fuiu8cY8qYCboKZl0dLJ01rPhiWa','2016-11-18T00:47:09.396Z'),
	(5,'ed','$2a$06$jFWO6vKJzEewlvOJUG9ZFeyDYeQaaQDCVK2Nofb.AmyxZT0MEHCx2','2016-11-18T00:47:09.396Z');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
