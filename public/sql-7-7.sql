-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2024 at 09:21 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `players_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_files`
--

CREATE TABLE `academic_files` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `additional_sports`
--

CREATE TABLE `additional_sports` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `basic_info`
--

CREATE TABLE `basic_info` (
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(222) NOT NULL,
  `gender` varchar(222) NOT NULL,
  `profile_photo_src` varchar(222) NOT NULL,
  `cover_photo_src` varchar(222) NOT NULL,
  `username` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `club_athlete`
--

CREATE TABLE `club_athlete` (
  `club_username` varchar(255) NOT NULL,
  `athlete_username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coaches`
--

CREATE TABLE `coaches` (
  `id` varchar(333) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coach_athlete`
--

CREATE TABLE `coach_athlete` (
  `coach_username` varchar(222) NOT NULL,
  `athlete_username` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jwts`
--

CREATE TABLE `jwts` (
  `user_id` varchar(1000) NOT NULL,
  `jwt` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `key_stats`
--

CREATE TABLE `key_stats` (
  `username` varchar(200) NOT NULL,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `sport` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `only_club`
--

CREATE TABLE `only_club` (
  `username` varchar(255) NOT NULL,
  `info` text NOT NULL,
  `sport_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `only_coach`
--

CREATE TABLE `only_coach` (
  `username` varchar(222) NOT NULL,
  `info` text NOT NULL,
  `sport_type` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `press_or_interviews`
--

CREATE TABLE `press_or_interviews` (
  `id` varchar(222) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `email` varchar(1000) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `amount` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` varchar(333) NOT NULL,
  `user_id` varchar(222) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `id` varchar(111) NOT NULL,
  `user_id` varchar(111) NOT NULL,
  `sort_order` int(2) NOT NULL DEFAULT 1,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`info`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `active_status` int(1) NOT NULL DEFAULT 1,
  `profile_pic` varchar(222) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` varchar(222) NOT NULL,
  `thumbnail_src` varchar(1000) NOT NULL,
  `video_src` varchar(1000) NOT NULL,
  `type` varchar(222) NOT NULL,
  `is_active` int(1) NOT NULL DEFAULT 1,
  `user_id` varchar(255) NOT NULL,
  `is_pinned` int(1) NOT NULL DEFAULT 0,
  `title` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_files`
--
ALTER TABLE `academic_files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `additional_sports`
--
ALTER TABLE `additional_sports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `basic_info`
--
ALTER TABLE `basic_info`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `coaches`
--
ALTER TABLE `coaches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `key_stats`
--
ALTER TABLE `key_stats`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `press_or_interviews`
--
ALTER TABLE `press_or_interviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
