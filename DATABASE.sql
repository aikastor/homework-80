CREATE DATABASE  IF NOT EXISTS `new_schema` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `new_schema`;
-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: new_schema
-- ------------------------------------------------------
-- Server version	5.7.29-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item_categories`
--

DROP TABLE IF EXISTS `item_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_categories`
--

LOCK TABLES `item_categories` WRITE;
/*!40000 ALTER TABLE `item_categories` DISABLE KEYS */;
INSERT INTO `item_categories` VALUES (1,'furniture','Tables, chairs and other stuff.'),(2,'computer equipment','Computers, monitors, keyboards and related equipment.'),(3,'household appliances','Microwaves, teapots, etc.'),(4,'stationery','Office stationery.'),(5,'test title','test description');
/*!40000 ALTER TABLE `item_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_locations`
--

DROP TABLE IF EXISTS `item_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_locations`
--

LOCK TABLES `item_locations` WRITE;
/*!40000 ALTER TABLE `item_locations` DISABLE KEYS */;
INSERT INTO `item_locations` VALUES (1,'Office room 1',NULL),(2,'Office room 1',NULL),(3,'Office room 3',NULL),(4,'Office room CEO',NULL),(5,'Cafeteria',NULL),(6,'Conference hall',NULL);
/*!40000 ALTER TABLE `item_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `date_added` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_id_idx` (`category_id`),
  KEY `fk_location_id_idx` (`location_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `item_categories` (`id`),
  CONSTRAINT `fk_location_id` FOREIGN KEY (`location_id`) REFERENCES `item_locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,1,1,'Table (green)','22.05.19','some description ',NULL),(2,1,2,'Chair (blue)',NULL,NULL,NULL),(3,1,2,'Chair (blue)',NULL,NULL,NULL),(4,1,2,'Sofa',NULL,NULL,NULL),(5,1,3,'Office table',NULL,NULL,NULL),(6,1,3,'Cushion',NULL,NULL,NULL),(7,1,4,'Cushion',NULL,NULL,NULL),(8,1,4,'Bra',NULL,NULL,NULL),(9,1,5,'Dining table',NULL,NULL,NULL),(10,1,5,'Dining table',NULL,NULL,NULL),(11,1,6,'Rounded table',NULL,NULL,NULL),(12,2,6,'Monitor AOC (23\')',NULL,NULL,NULL),(13,2,3,'Monitor AOC (24\')',NULL,NULL,NULL),(14,2,6,'Laptop ACER xp-289',NULL,NULL,NULL),(15,2,1,'Laptop HP Envy (23\')',NULL,NULL,NULL),(16,2,6,'LED TV SHARP (100\')',NULL,NULL,NULL),(17,2,1,'Laser printer HP Jetstram 2000',NULL,NULL,NULL),(18,3,5,'Refrigerator LG NM-200',NULL,NULL,NULL),(19,3,5,'Microwave LG quickcook',NULL,NULL,NULL),(20,3,5,'Electric stove Gefest 2780',NULL,NULL,NULL),(21,4,1,'Folder holder',NULL,NULL,NULL),(22,4,2,'Paper schredder',NULL,NULL,NULL),(23,4,3,'Pencil sharpener',NULL,NULL,NULL),(25,5,1,'Table (green)','22.05.19','some description ',NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-21 15:56:00
