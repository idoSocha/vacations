CREATE DATABASE  IF NOT EXISTS `project03` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project03`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: project03
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_code` int NOT NULL,
  `vacation_code` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_code` (`user_code`),
  KEY `vacation_code` (`vacation_code`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_code`) REFERENCES `users` (`user_code`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_code`) REFERENCES `vacations` (`vacation_code`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_code` int NOT NULL AUTO_INCREMENT,
  `private_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `likedVacations` json DEFAULT (json_array()),
  PRIMARY KEY (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ido','socha','ido@ido','1234',1,'[]'),(2,'noam','reiss','noam@noam','1234',0,'[]'),(4,'beny','yeled','beny@yeled','6789',0,'[]'),(6,'inbal','ron','inbal@inbal','6789',0,'[]'),(10,'lizi','tizi','lizi@lizi','1234',0,'[]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_code` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `file_img_name` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT '0',
  PRIMARY KEY (`vacation_code`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (94,'Thailand','welcome to Thailand','2023-06-26','2023-06-28',100,'thailand.jpg',0),(95,'Spain','welcome to beautiful Spain','2023-06-29','2023-06-30',200,'spain.jpg',0),(96,'Japan','Welcome to beautiful Japan','2023-07-20','2023-07-28',800,'japan.jpg',0),(97,'Greece','Welcome to beautiful Greece','2023-08-24','2023-08-31',180,'greece.jpg',0),(98,'Turkey','welcome to beautiful Turkey','2023-09-01','2023-09-02',280,'turkey.jpg',0),(99,'Argentina','welcome to beautiful Argentina','2023-09-28','2023-09-30',1500,'argentina.jpg',0),(100,'USA','welcome to USA','2023-10-04','2023-10-18',2000,'new-york.jpg',0),(101,'France','welcome to France','2023-07-06','2023-07-08',350,'france.jpg',0),(102,'Russia','welcome to beautiful Russia','2023-10-11','2023-11-02',1800,'Russia.jpg',0),(106,'Australia','welcome to beautiful Australia','2023-07-04','2023-07-07',2550,'australia.jpg',0),(108,'Italy','Welcome to Beautiful Italy','2023-07-01','2023-07-04',350,'italy.jpg',0);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-27 16:23:58
