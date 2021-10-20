-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2021 at 02:52 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `classroom`
--

CREATE TABLE `classroom` (
  `class_id` int(10) NOT NULL,
  `class_section` varchar(15) NOT NULL,
  `students_strength` int(3) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(5) NOT NULL,
  `school_id` int(10) NOT NULL,
  `role` enum('Admin','Teaching Faculty','Non-teaching Faculty','Student') NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `school_id`, `role`, `username`, `password`, `email`, `created_at`, `updated_at`, `deleted_at`) VALUES
(10001, 0, 'Admin', 'Bala', 'Balaguru', 'balaguru.m@koinnovation.com', '2021-10-19 14:26:11', '2021-10-19 08:56:11', '2021-10-19 14:26:11'),
(10002, 0, 'Student', 'test', 'test123#', 'test@gmail.com', '2021-10-19 14:26:11', '2021-10-19 08:56:11', '2021-10-19 14:26:11'),
(10004, 0, 'Admin', 'balaguru', 'test123#', 'bala@gmail.com', '2021-10-19 17:08:31', '2021-10-19 11:38:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `school_id` int(10) NOT NULL,
  `school_name` varchar(100) NOT NULL,
  `board` enum('State Board','CBSE') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `dept` enum('Teaching Faculty','''Non-teaching Faculty''') NOT NULL,
  `username` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `mobile_number` int(10) NOT NULL,
  `email` varchar(80) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff_attendance`
--

CREATE TABLE `staff_attendance` (
  `sf_atid` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `attend_date` date NOT NULL,
  `attend_status` enum('Leave','On Duty','Present','Half day') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff_salary`
--

CREATE TABLE `staff_salary` (
  `sal_id` int(10) NOT NULL,
  `staff_role` enum('Teaching Faculty','Non-teaching Faculty') NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `account_details` varchar(255) DEFAULT NULL,
  `salary` int(10) DEFAULT NULL,
  `salary_status` enum('Paid','Not paid yet') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(5) NOT NULL,
  `studying` varchar(15) NOT NULL,
  `username` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mobile_number` bigint(10) NOT NULL,
  `email` varchar(80) NOT NULL,
  `father_name` varchar(50) NOT NULL,
  `date_of_birth` date NOT NULL,
  `city` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `studying`, `username`, `name`, `mobile_number`, `email`, `father_name`, `date_of_birth`, `city`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(17, '', 'balaguru', 'Balaguru', 8124647244, 'bala@gmail.com', 'Mamundi', '1989-06-03', 'Chennai', 'TamilNadu', '2021-10-19 17:07:24', '2021-10-19 11:37:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_attendance`
--

CREATE TABLE `student_attendance` (
  `entryid` int(10) NOT NULL,
  `classroom` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `students_leave` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_fee`
--

CREATE TABLE `student_fee` (
  `payment_id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `mobile_number` bigint(10) NOT NULL,
  `academic_year` year(4) NOT NULL,
  `fee_amount` int(11) NOT NULL,
  `fee_paid_amount` int(11) NOT NULL,
  `fee_paid_on` date NOT NULL,
  `payment_mode` enum('Cash','Card','Cheque','Net Banking') NOT NULL,
  `due_status` enum('fully paid','pending','not paid') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `student studying - classroom` (`class_section`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`school_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `staff_attendance`
--
ALTER TABLE `staff_attendance`
  ADD PRIMARY KEY (`sf_atid`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `staff_salary`
--
ALTER TABLE `staff_salary`
  ADD PRIMARY KEY (`sal_id`),
  ADD KEY `staff ATTENDANCE -staff salary` (`username`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studying` (`studying`),
  ADD KEY `studying_2` (`studying`),
  ADD KEY `email` (`email`),
  ADD KEY `student-login` (`username`);

--
-- Indexes for table `student_attendance`
--
ALTER TABLE `student_attendance`
  ADD PRIMARY KEY (`entryid`),
  ADD KEY `classroom` (`classroom`);

--
-- Indexes for table `student_fee`
--
ALTER TABLE `student_fee`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `student-fee table` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classroom`
--
ALTER TABLE `classroom`
  MODIFY `class_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10005;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `school_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_attendance`
--
ALTER TABLE `staff_attendance`
  MODIFY `sf_atid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_salary`
--
ALTER TABLE `staff_salary`
  MODIFY `sal_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `student_attendance`
--
ALTER TABLE `student_attendance`
  MODIFY `entryid` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_fee`
--
ALTER TABLE `student_fee`
  MODIFY `payment_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classroom`
--
ALTER TABLE `classroom`
  ADD CONSTRAINT `student studying - classroom` FOREIGN KEY (`class_section`) REFERENCES `student` (`studying`),
  ADD CONSTRAINT `student-attendance with Classroom` FOREIGN KEY (`class_section`) REFERENCES `student_attendance` (`classroom`);

--
-- Constraints for table `school`
--
ALTER TABLE `school`
  ADD CONSTRAINT `SCHOOL - LOGIN` FOREIGN KEY (`school_id`) REFERENCES `login` (`school_id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff-login` FOREIGN KEY (`username`) REFERENCES `login` (`username`);

--
-- Constraints for table `staff_attendance`
--
ALTER TABLE `staff_attendance`
  ADD CONSTRAINT `staff atten - staff` FOREIGN KEY (`username`) REFERENCES `staff` (`username`);

--
-- Constraints for table `staff_salary`
--
ALTER TABLE `staff_salary`
  ADD CONSTRAINT `staff ATTENDANCE -staff salary` FOREIGN KEY (`username`) REFERENCES `staff_attendance` (`username`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student-login` FOREIGN KEY (`username`) REFERENCES `login` (`username`);

--
-- Constraints for table `student_fee`
--
ALTER TABLE `student_fee`
  ADD CONSTRAINT `student-fee table` FOREIGN KEY (`username`) REFERENCES `student` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
