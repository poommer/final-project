-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2024 at 07:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ad_ID` int(11) NOT NULL,
  `ad_username` varchar(30) NOT NULL,
  `ad_password` varchar(255) NOT NULL,
  `ad_role` varchar(20) NOT NULL,
  `ad_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ad_status` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ad_ID`, `ad_username`, `ad_password`, `ad_role`, `ad_created`, `ad_status`) VALUES
(12, 'admin001', '$2b$10$WKH0x0ZV25NFU.1q3OOg..B4R4Bbaw4CZg.MUE/qHd7skNZd8qS/G', 'admin', '2024-08-02 17:35:54', 'wait verify'),
(13, 'admin002', '$2b$10$qdgFv066t5glNVwz7O6Bv.wXMYjABObdnju9DSsceB9Mt3myp36M6', 'admin', '2024-08-02 17:58:16', 'wait verify');

-- --------------------------------------------------------

--
-- Table structure for table `partofspeech`
--

CREATE TABLE `partofspeech` (
  `pos_id` varchar(5) NOT NULL,
  `pos_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `partofspeech`
--

INSERT INTO `partofspeech` (`pos_id`, `pos_name`) VALUES
('adj.', 'Adjective'),
('adv.', 'Adverb'),
('conj.', 'Conjunction'),
('int.', 'Interjection'),
('n.', 'noun'),
('phr.', 'phrase'),
('prep.', 'Preposition'),
('pron.', 'Pronoun'),
('v.', 'Verb');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_ID` varchar(30) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_gender` varchar(10) NOT NULL,
  `user_birthday` date NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `coin_balance` int(10) NOT NULL,
  `xp` int(10) NOT NULL,
  `user_rank` varchar(30) NOT NULL,
  `user_status` varchar(20) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_ID`, `user_name`, `user_gender`, `user_birthday`, `user_email`, `coin_balance`, `xp`, `user_rank`, `user_status`, `created_date`) VALUES
('101949070835837820442', 'chak', 'male', '2006-04-06', '65209010002@thonburi.ac.th', 0, 15, '', 'verified', '2024-08-07 18:56:58'),
('103784231363139728551', 'testTT', 'male', '2024-08-08', 'siripoom982@gmail.com', 0, 10, '', 'verified', '2024-08-07 18:56:55'),
('108155840407028144469', ' poommeri', 'male', '2007-01-27', '12345siripoom6789@gmail.com', 0, 20, '', 'verified', '2024-08-07 18:56:51'),
('111520423022737516816', ' poommeri', 'male', '2024-08-13', 'poommer.web@gmail.com', 0, 0, '', 'verified', '2024-08-07 19:04:03'),
('117200149347128147853', 'testTT', 'male', '2024-08-16', '65209010011@thonburi.ac.th', 0, 50, '', 'verified', '2024-08-07 18:56:46');

-- --------------------------------------------------------

--
-- Table structure for table `vocab`
--

CREATE TABLE `vocab` (
  `vocab_ID` varchar(10) NOT NULL,
  `word_en` varchar(50) NOT NULL,
  `word_th` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pos` varchar(5) NOT NULL,
  `word_cate` varchar(5) NOT NULL,
  `word_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vocab`
--

INSERT INTO `vocab` (`vocab_ID`, `word_en`, `word_th`, `pos`, `word_cate`, `word_created`) VALUES
('wl002-0001', 'cat', 'แมว', 'n.', 'wl002', '2024-08-14 15:10:55'),
('wl002-0002', 'dog', 'หมา', 'n.', 'wl002', '2024-08-14 15:10:55'),
('wl003-0001', 'water', 'น้ำ', 'n.', 'wl003', '2024-08-14 15:10:55'),
('wl004-0001', 'Hello', 'สวัสดี', 'int.', 'wl004', '2024-08-14 18:22:39'),
('wl004-0002', 'Good Bye', 'ลาก่อน', 'int.', 'wl004', '2024-08-14 18:22:39'),
('wl004-0003', 'tank you', 'ขอบคุณ', 'phr.', 'wl004', '2024-08-14 18:22:39'),
('wl005-0001', 'I', 'ฉัน', 'pron.', 'wl005', '2024-08-14 18:22:39'),
('wl005-0002', 'You', 'คุณ', 'pron.', 'wl005', '2024-08-14 18:22:39'),
('wl005-0003', 'Boy', 'เด็กผู้ชาย', 'n.', 'wl005', '2024-08-14 18:22:39');

-- --------------------------------------------------------

--
-- Table structure for table `wordlist`
--

CREATE TABLE `wordlist` (
  `wl_id` varchar(5) NOT NULL,
  `wl_name` varchar(30) NOT NULL,
  `wl_description` varchar(100) NOT NULL,
  `wl_img` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wordlist`
--

INSERT INTO `wordlist` (`wl_id`, `wl_name`, `wl_description`, `wl_img`) VALUES
('wl001', 'other', 'none category', ''),
('wl002', 'animal', '-', ''),
('wl003', 'food & drink', '-', ''),
('wl004', 'greeting', '-', ''),
('wl005', 'people', '-', ''),
('wl006', 'fruits', '-', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ad_ID`),
  ADD UNIQUE KEY `ad_username` (`ad_username`);

--
-- Indexes for table `partofspeech`
--
ALTER TABLE `partofspeech`
  ADD PRIMARY KEY (`pos_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_ID`);

--
-- Indexes for table `vocab`
--
ALTER TABLE `vocab`
  ADD PRIMARY KEY (`vocab_ID`),
  ADD KEY `pos` (`pos`),
  ADD KEY `word_cate` (`word_cate`);

--
-- Indexes for table `wordlist`
--
ALTER TABLE `wordlist`
  ADD PRIMARY KEY (`wl_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ad_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `vocab`
--
ALTER TABLE `vocab`
  ADD CONSTRAINT `vocab_ibfk_1` FOREIGN KEY (`pos`) REFERENCES `partofspeech` (`pos_id`),
  ADD CONSTRAINT `vocab_ibfk_2` FOREIGN KEY (`word_cate`) REFERENCES `wordlist` (`wl_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
