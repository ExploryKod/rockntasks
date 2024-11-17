-- Adminer 4.8.1 MySQL 8.0.37-0ubuntu0.22.04.3 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `food_categories`;
CREATE TABLE `food_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_description` text,
  `category_image` blob,
  `category_image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `food_categories` (`id`, `category_name`, `category_description`, `category_image`, `category_image_path`) VALUES
(1,	'proteines',	NULL,	NULL,	NULL),
(2,	'legumes',	NULL,	NULL,	NULL),
(3,	'fruits',	NULL,	NULL,	NULL),
(4,	'epices',	NULL,	NULL,	NULL),
(5,	'boissons',	NULL,	NULL,	NULL);

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `category` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image_url` varchar(255) DEFAULT NULL,
  `product_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `food_categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `products` (`id`, `category_id`, `category`, `product_name`, `product_image_url`, `product_price`) VALUES
(1,	1,	'proteines',	'Poulet Bio',	'proteines_poulet_bio',	25.00),
(2,	1,	'proteines',	'Tofu',	'proteines_tofu',	18.00),
(3,	1,	'proteines',	'Poisson',	'proteines_poisson',	35.00),
(4,	1,	'proteines',	'Edamam',	'proteines_edamam',	25.00),
(5,	1,	'proteines',	'Lentilles',	'proteines_lentilles',	18.00),
(6,	1,	'proteines',	'Pois Chiches',	'proteines_pois_chiches',	14.00),
(7,	1,	'proteines',	'Viande rouge',	'proteines_viande_rouge',	18.00),
(8,	1,	'proteines',	'Sardine',	'proteines_sardine',	14.00),
(9,	1,	'proteines',	'Green Beans',	'proteines_green_beans',	16.00),
(10,	2,	'legumes',	'chou fleur',	'legumes_chou_fleur',	8.00),
(11,	2,	'legumes',	'Poivron',	'legumes_poivron',	3.00),
(12,	2,	'legumes',	'Tomate',	'legumes_tomate',	4.00),
(13,	2,	'legumes',	'Brocoli',	'legumes_brocoli',	5.00),
(14,	2,	'legumes',	'Carotte',	'legumes_carotte',	2.00),
(15,	3,	'fruits',	'Banane',	'fruits_banane',	1.00),
(16,	3,	'fruits',	'Pomme',	'fruits_pomme',	2.00),
(17,	3,	'fruits',	'Orange',	'fruits_orange',	1.00),
(18,	3,	'fruits',	'Fraise',	'fruits_fraise',	3.00),
(19,	3,	'fruits',	'Mangue',	'fruits_mangue',	5.00),
(20,	3,	'fruits',	'Apple',	'proteines_apple',	8.00),
(21,	3,	'fruits',	'groseilles',	'fruits_groseilles.jpeg',	6.00);

DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_description` text,
  `category_image` blob,
  `category_image_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `activities` (`id`, `activity_name`, `activity_description`, `activity_image`, `activity_image_path`) VALUES
(1,	'Travail',	'Tasks related to work or professional activities',	NULL,	NULL),
(2,	'Sport',	'Tasks related to personal life or hobbies',	NULL,	NULL),
(3,	'Detente',	'Tasks related to health and fitness',	NULL,	NULL),
(4,	'Education',	'Tasks related to studies or learning new skills',	NULL,	NULL),
(5,	'Famille',	'Tasks that are not classified under any category',	NULL,	NULL);

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_activity_id` int DEFAULT '1',
  `task_activity` varchar(255) NOT NULL DEFAULT 'Travail',
  `task_name` varchar(255) NOT NULL,
  `task_image_url` varchar(255) DEFAULT NULL,
  `task_deadline` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `task_status` enum('Pending','In Progress','Completed') NOT NULL DEFAULT 'Pending',
  PRIMARY KEY (`id`),
  KEY `task_category_id` (`task_category_id`),
  CONSTRAINT `fk_task_activity` FOREIGN KEY (`task_activity_id`) REFERENCES `activities` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `tasks` (`id`, `task_activity_id`, `task_activity`, `task_name`, `task_image_url`, `task_deadline`, `task_status`) VALUES
(1,	1,	'Travail',	'Complete project report',	NULL,	'2024-11-20 15:00:00',	'Pending'),
(2,	2,	'Travail',	'Buy groceries',	NULL,	'2024-11-16 10:30:00',	'In Progress'),
(3,	3,	'Famille',	'Morning yoga session',	NULL,	'2024-11-17 07:00:00',	'Completed'),
(4,	4,	'Travail',	'Prepare for online course',	NULL,	'2024-11-18 20:00:00',	'Pending'),
(5,	5,	'',	'Organize photo gallery',	NULL,	'2024-11-19 12:00:00',	'Pending'),
(6,	1,	'Travail',	'Team meeting preparation',	NULL,	'2024-11-21 09:00:00',	'In Progress'),
(7,	3,	'Travail',	'Health check-up',	NULL,	'2024-11-22 14:00:00',	'Pending'),
(8,	2,	'Travail',	'Call the plumber',	NULL,	'2024-11-20 11:00:00',	'Pending'),
(9,	4,	'Travail',	'Finish reading book',	NULL,	'2024-11-23 18:00:00',	'Completed'),
(10,	5,	'Travail',	'Clean up email inbox',	NULL,	'2024-11-24 16:00:00',	'Pending');
W
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `birth_date` varchar(50) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  `creation_date` date DEFAULT (curdate()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `username`, `first_name`, `last_name`, `email`, `birth_date`, `password`, `status`, `creation_date`) VALUES
(6,	'amaury',	NULL,	NULL,	'amaury@mail.com',	NULL,	'Sky@900',	'',	'2024-11-15');

-- 2024-11-16 09:17:36