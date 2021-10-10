CREATE DATABASE  IF NOT EXISTS `disney_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `disney_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: disney_db
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `charactermovie`
--

DROP TABLE IF EXISTS `charactermovie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charactermovie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `characterId` int NOT NULL,
  `movieId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `character_movie_idx` (`characterId`),
  KEY `movie_character_idx` (`movieId`),
  CONSTRAINT `character_movie_characterId` FOREIGN KEY (`characterId`) REFERENCES `characters` (`id`),
  CONSTRAINT `movie_character_movieId` FOREIGN KEY (`movieId`) REFERENCES `movies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charactermovie`
--

LOCK TABLES `charactermovie` WRITE;
/*!40000 ALTER TABLE `charactermovie` DISABLE KEYS */;
INSERT INTO `charactermovie` VALUES (1,1,1),(2,2,2),(3,5,3),(4,6,5);
/*!40000 ALTER TABLE `charactermovie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `history` varchar(765) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'Jacob-Tremblay.jpg','Jacob Tremblay',14,NULL,'Jacob Tremblay es un actor y actor de voz canadiense. Es conocido por sus papeles de Jack Newsome en Room, August \"Augie\" Pullman en Wonder y Max Newman en Good Boys. También interpretó a Blue Winslow en las películas live-action de Los Pitufos y puso voz a Damian Wayne/Robin en Harley Quinn.'),(2,'Edward-Asner.jpg','Edward Asner',92,75.00,'Edward Asner, ​ conocido como Ed Asner, fue un actor estadounidense, ganador de cinco Globos de Oro y siete Premios Emmy'),(5,'Willem-Dafoe.jpg','Willem Dafoe',66,70.00,'William James \"Willem\" Dafoe es un actor estadounidense de cine y teatro, coproductor y miembro fundador de la compañía teatral The Wooster Group.'),(6,'Jennifer-Tilly.jpg','Jennifer Tilly',63,69.00,'Jennifer Ellen Chan, conocida artísticamente como Jennifer Tilly, es una actriz estadounidense, nominada al Óscar.');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Animación',NULL),(2,'Drama',NULL);
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(100) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `releaseDate` date NOT NULL,
  `rating` tinyint NOT NULL,
  `genreId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_genre_idx` (`genreId`),
  CONSTRAINT `movie_genre` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Luca-img.jpg','Luca','2021-06-18',5,1),(2,'Up-img.jpg','Up','2009-06-11',4,1),(3,'Togo-img.jpg','Togo','2019-12-20',3,2),(5,'Monsters_Inc-img.png','Monsters, Inc','2001-12-06',5,1);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-09 23:34:57
