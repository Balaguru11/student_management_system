-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2021 at 10:47 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

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
-- Table structure for table `school_add_school`
--

CREATE TABLE `school_add_school` (
  `id` int(10) NOT NULL,
  `school_name` varchar(100) NOT NULL,
  `board` enum('State Board','CBSE') NOT NULL,
  `school_login` varchar(80) NOT NULL,
  `school_secrete` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_classroom`
--

CREATE TABLE `school_classroom` (
  `id` int(10) NOT NULL,
  `class_section` varchar(15) NOT NULL,
  `medium` enum('Tamil','English','Hindi') NOT NULL,
  `students_strength` int(3) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_class_subjects`
--

CREATE TABLE `school_class_subjects` (
  `id` int(10) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `classroom_id` int(10) NOT NULL,
  `staff_id_assigned` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_main_login`
--

CREATE TABLE `school_main_login` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `role_id_fk` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_role`
--

CREATE TABLE `school_role` (
  `id` int(1) NOT NULL,
  `role_name` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_staff`
--

CREATE TABLE `school_staff` (
  `id` int(10) NOT NULL,
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
-- Table structure for table `school_staff_attendance`
--

CREATE TABLE `school_staff_attendance` (
  `id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `attend_date` date NOT NULL,
  `attend_status` enum('Leave','On Duty','Present','Half day') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_staff_salary`
--

CREATE TABLE `school_staff_salary` (
  `id` int(10) NOT NULL,
  `staff_role` int(1) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `account_details` varchar(255) DEFAULT NULL,
  `salary` int(10) DEFAULT NULL,
  `salary_status` enum('Paid','Not paid yet') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_student`
--

CREATE TABLE `school_student` (
  `id` int(10) NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `school_student_attendance`
--

CREATE TABLE `school_student_attendance` (
  `id` int(10) NOT NULL,
  `classroom` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `students_leave` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_student_fee`
--

CREATE TABLE `school_student_fee` (
  `id` int(10) NOT NULL,
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

-- --------------------------------------------------------

--
-- Table structure for table `school_subjects`
--

CREATE TABLE `school_subjects` (
  `id` int(10) NOT NULL,
  `subject_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `school_add_school`
--
ALTER TABLE `school_add_school`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_classroom`
--
ALTER TABLE `school_classroom`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_class_subjects`
--
ALTER TABLE `school_class_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_id_assigned` (`staff_id_assigned`);

--
-- Indexes for table `school_main_login`
--
ALTER TABLE `school_main_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login links with school_role` (`role_id_fk`);

--
-- Indexes for table `school_role`
--
ALTER TABLE `school_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_staff`
--
ALTER TABLE `school_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_staff_attendance`
--
ALTER TABLE `school_staff_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_staff_salary`
--
ALTER TABLE `school_staff_salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff ATTENDANCE -staff salary` (`username`),
  ADD KEY `staff role links role table` (`staff_role`);

--
-- Indexes for table `school_student`
--
ALTER TABLE `school_student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_student_fee`
--
ALTER TABLE `school_student_fee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_subjects`
--
ALTER TABLE `school_subjects`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `school_add_school`
--
ALTER TABLE `school_add_school`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_classroom`
--
ALTER TABLE `school_classroom`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_class_subjects`
--
ALTER TABLE `school_class_subjects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_main_login`
--
ALTER TABLE `school_main_login`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10005;

--
-- AUTO_INCREMENT for table `school_role`
--
ALTER TABLE `school_role`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `school_staff`
--
ALTER TABLE `school_staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_staff_attendance`
--
ALTER TABLE `school_staff_attendance`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_staff_salary`
--
ALTER TABLE `school_staff_salary`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_student`
--
ALTER TABLE `school_student`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_student_fee`
--
ALTER TABLE `school_student_fee`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_subjects`
--
ALTER TABLE `school_subjects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `school_add_school`
--
ALTER TABLE `school_add_school`
  ADD CONSTRAINT `SCHOOL - LOGIN` FOREIGN KEY (`id`) REFERENCES `school_main_login` (`id`);

--
-- Constraints for table `school_classroom`
--
ALTER TABLE `school_classroom`
  ADD CONSTRAINT `classroom links with class-subjects` FOREIGN KEY (`id`) REFERENCES `school_class_subjects` (`id`),
  ADD CONSTRAINT `classroom links with student` FOREIGN KEY (`id`) REFERENCES `school_student` (`id`);

--
-- Constraints for table `school_class_subjects`
--
ALTER TABLE `school_class_subjects`
  ADD CONSTRAINT `classroom id links with classroom` FOREIGN KEY (`classroom_id`) REFERENCES `school_classroom` (`id`),
  ADD CONSTRAINT `staff_id links with class_subjecrt` FOREIGN KEY (`staff_id_assigned`) REFERENCES `school_staff` (`id`),
  ADD CONSTRAINT `subject links with class_subject` FOREIGN KEY (`subject_id`) REFERENCES `school_subjects` (`id`);

--
-- Constraints for table `school_main_login`
--
ALTER TABLE `school_main_login`
  ADD CONSTRAINT `login links with school_role` FOREIGN KEY (`role_id_fk`) REFERENCES `school_role` (`id`);

--
-- Constraints for table `school_staff`
--
ALTER TABLE `school_staff`
  ADD CONSTRAINT `staff link with role` FOREIGN KEY (`id`) REFERENCES `school_role` (`id`),
  ADD CONSTRAINT `staff link with staff attendance` FOREIGN KEY (`id`) REFERENCES `school_staff_attendance` (`id`);

--
-- Constraints for table `school_staff_attendance`
--
ALTER TABLE `school_staff_attendance`
  ADD CONSTRAINT `staff atten - staff` FOREIGN KEY (`id`) REFERENCES `school_staff` (`id`),
  ADD CONSTRAINT `staff attendance with salary` FOREIGN KEY (`id`) REFERENCES `school_staff_salary` (`id`);

--
-- Constraints for table `school_staff_salary`
--
ALTER TABLE `school_staff_salary`
  ADD CONSTRAINT `staff ATTENDANCE -staff salary` FOREIGN KEY (`id`) REFERENCES `school_staff_attendance` (`id`),
  ADD CONSTRAINT `staff role links role table` FOREIGN KEY (`staff_role`) REFERENCES `school_role` (`id`);

--
-- Constraints for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  ADD CONSTRAINT `student link with attendance` FOREIGN KEY (`id`) REFERENCES `school_student` (`id`);

--
-- Constraints for table `school_student_fee`
--
ALTER TABLE `school_student_fee`
  ADD CONSTRAINT `student-fee table` FOREIGN KEY (`username`) REFERENCES `school_student` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
