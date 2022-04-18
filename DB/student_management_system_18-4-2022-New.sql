-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2022 at 10:11 AM
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
-- Table structure for table `school_activate`
--

CREATE TABLE `school_activate` (
  `id` int(11) NOT NULL,
  `school_id` int(10) NOT NULL,
  `activate_code` varchar(255) NOT NULL,
  `activate_match_g` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_activate`
--

INSERT INTO `school_activate` (`id`, `school_id`, `activate_code`, `activate_match_g`) VALUES
(1, 92, '', 'YAPGQ3KfvRK_8GusXdO1m8AJmFrVuZfYGfBiPpTLdt1cUaRBE5'),
(2, 93, '', 'XROjJr1TUKRzH3tU-EQgEA7pd0c2fKBun8mJ7RDKtub2W3s5n8'),
(3, 94, '', 'diBT4cpLieBK9Ke_llJ1DB2KgZTZjVoVXXR_WxQLBKjWHzwXE9'),
(4, 95, '', 'gNxUUCEHKXaJYttfZIGn7uw2h1Ondp7-23yBioSTcI7hjAGrIx'),
(5, 96, '', '4yXDhe1elVCKe0Q-chAdrEqPfTe0jvAnreqM65itlUK1TxCxBh'),
(6, 97, '', 'iopJIZHGWfYSNpH4VxFHxvr9g2tZHizQI01NnFOicQhdrNB-wS'),
(7, 98, '', 'fetiTNuRq0rPCswjgiRQAfjCCNaP5T6jZ3QJpu8V8wv0Piao_y'),
(8, 99, '', 'e7U6Vd6475ZkGjjKjv-hvV4V2X8O8IBoJjYLaJctsO8sL65K7k'),
(9, 100, '', 'yE7MnpqObA4HcY3pMrSMGODFu9t_YT8DQo50f8BHH91GVOezaO'),
(10, 101, '', 'psP5qROJz529IytSOF74dqpe8UfPlSdVAgm3LOpGFXqOI3BfiB'),
(11, 102, '', 's8K1Sa19SkI7iX3Yp8WGk4RHWN4bzNH-wNc2sVtEi0-D4RFJDN'),
(12, 103, '', '-PiEH4V5w4A9-Pp3f6xEG9yMn8j0xHOz4fvBOO6KEPTiR9aGpX'),
(13, 104, '', 'futoZkodzl_Hk5oPHiEWzEMkQ5dXBuKdohZUBXnOC3-k46BOkl'),
(14, 105, '', '_5JEd8Jzgff87Qe4aptQjNiDmIFYXZU_7QQ34VMboN9j71oOLf'),
(15, 106, '', 'gHtpJPCVbZZtKTDvVQZCSW15A3_a8vV56OZiBQK-jQL0usrtnr'),
(16, 107, '', 'HTsmMQiBlajd7BMIDQrEkI4g5NljoHWa191Axvd5hKJNqUi6pQ'),
(17, 108, '', 'UuDOIkZWYPfQPJgqiAo5S4cTwLV75apDaN7r5w3XxKyIdoKOUL'),
(18, 109, '', 'c2vE2606GyWHEWB5gq7Reynj-uqXJ_uGNw516BqBqOz0ADXvDQ'),
(19, 110, '', 'GSJs0Qh0zdmb5gc2Fg33LGbF7PGJUxHDy22HbovX5wdt4peSrP'),
(20, 111, '', 'ADoYHOmAYGPOGLbKclKrFAHdRcyg0HHpmqlNqJvtvEl4MTuv_s'),
(21, 112, '', 'aTmYFCA6w92HVsnv1i0OARFcMEwr15XmJjuE4aXShGRLBKrUcF'),
(22, 113, '', 'CY1rglBYEpMkOlO5Jmt2TjoMlt2vBDZhqQRcBtN3v8s60IZp3Z'),
(23, 114, '', 'zGg8oFhGL7Pf_W2Sf1h8FIB9W_hDkCBQiE6wsJtoCxmYabVrw-'),
(24, 116, '', '67dncrHMUzxi30vW6u7cifilVsIhTmgbSGgTX4d4_tbp0sNzvP'),
(25, 117, '', '3DzuYJ9fJcviJfT7GsciJ3l8wJK39zcChJyfyjH9zJvnD4BQRH'),
(26, 118, '', 'DGIiQnGsjz7-mA93xic1DE_tlZVGvXRitnudLE1-3AzAXPV-WV'),
(39, 132, '', 'vl9kqwbday15TbQsShrKRSJotsNhplMiD4VdvjnghO4Cg2e0YL'),
(40, 133, '', 'QkKroAPaYWKtVofrvDb76f42FD2FF3KJ9YgmGtYwwX0M3faVCb'),
(41, 134, '', 'NLRqEhq1V1BgkBSmXEHV2md1CTa9yKvRQZ85U_izIMG6JI8Gwg'),
(42, 135, '', 'ZlfxYSSVlhUTIvxxJhe71XH6hvcPnwO8f_piosWFUL3XjuunL2');

-- --------------------------------------------------------

--
-- Table structure for table `school_activate_payment`
--

CREATE TABLE `school_activate_payment` (
  `id` int(11) NOT NULL,
  `school_email` varchar(255) NOT NULL,
  `plan` enum('1 Year','2 Years','5 Years','10 Years') NOT NULL,
  `pay_status` enum('Paid','Declined') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_activate_payment`
--

INSERT INTO `school_activate_payment` (`id`, `school_email`, `plan`, `pay_status`) VALUES
(10, 'state60@g.c', '2 Years', 'Declined'),
(11, 'state60@g.c', '2 Years', 'Declined'),
(12, 'state60@g.c', '2 Years', 'Declined'),
(13, 'state60@g.c', '2 Years', 'Declined'),
(14, 'state60@g.c', '2 Years', 'Declined'),
(15, 'state60@g.c', '1 Year', 'Declined'),
(16, 'state60@g.c', '1 Year', 'Declined'),
(17, 'state60@g.c', '5 Years', 'Declined'),
(18, 'state60@g.c', '2 Years', 'Declined'),
(19, 'state60@g.c', '5 Years', 'Declined');

-- --------------------------------------------------------

--
-- Table structure for table `school_add_school`
--

CREATE TABLE `school_add_school` (
  `id` int(10) NOT NULL,
  `school_logo` varchar(255) NOT NULL,
  `school_name` varchar(255) NOT NULL,
  `board` enum('State Board','CBSE') NOT NULL,
  `school_established_in` year(4) NOT NULL,
  `email` varchar(255) NOT NULL,
  `school_enquiry` bigint(10) NOT NULL,
  `map_location_url` varchar(255) NOT NULL,
  `city_state` varchar(255) NOT NULL,
  `school_login` varchar(255) NOT NULL,
  `school_secrete` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_add_school`
--

INSERT INTO `school_add_school` (`id`, `school_logo`, `school_name`, `board`, `school_established_in`, `email`, `school_enquiry`, `map_location_url`, `city_state`, `school_login`, `school_secrete`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(71, '', 'Nithilan School', 'CBSE', 0000, 'nithilan@gmail.com', 0, '', 'Pallikaranai', 'nithilan', 'Nithi#123#', 'Active', '2021-11-10 11:29:34', '2021-11-11 10:59:27', '2021-11-11 16:29:27'),
(72, '', 'Abisheik School', 'CBSE', 0000, 'abi@test.com', 0, '', 'Chennai', 'Abisheik#123', '$2b$10$iTLFbweMujKyBp2HLlKpjeMGr6cxudOoD1xy1Baj7VRBdeQkwsDMe', 'Inactive', '2021-11-12 14:00:08', '2021-11-12 08:30:08', NULL),
(73, '', 'Activation Check', 'State Board', 0000, 'activate@g.com', 0, '', 'Chennai', 'Activate#123', '$2b$10$Pq7RAJz3PFNsaCUqOx/IuukgnAf32xS4dxouMJMJEHZfKA.mETQFa', 'Inactive', '2021-11-12 16:10:15', '2021-11-12 10:40:15', NULL),
(74, '', 'Activation Check2', 'State Board', 0000, 'activate2@g.com', 0, '', 'Chennai', 'Activate#1232', '$2b$10$YZjN2ifiIcxZY6war8Hg/uCjqUllDaL5k7b7MqLekpvR3Cf5aUcKS', 'Inactive', '2021-11-12 16:11:35', '2021-11-12 10:41:35', NULL),
(75, '', 'SchoolName2021', 'State Board', 0000, 'school123@gmail.com', 0, '', 'Chennai', 'School2021#123', '$2b$10$C0M2MwR5xnpNnc7VE1.CG.lurhemNjdH3W7lktcmGqb4Yp2k8.vBm', 'Inactive', '2021-11-12 16:15:29', '2021-11-12 10:45:29', NULL),
(76, '', 'Test2021 School', 'State Board', 0000, 'school20@g.com', 0, '', 'Chennai', 'School21#123', '$2b$10$jzFP5mlUjNBaDeUfxVKm1.nej4JSsdstAQ6tKgVib6NwLRo1z5mse', 'Inactive', '2021-11-12 16:17:44', '2021-11-12 10:47:44', NULL),
(77, '', 'Test2021 School2', 'State Board', 0000, 'school220@g.com', 0, '', 'Chennai', 'School21#1232', '$2b$10$S7/eq3Viw3EzASBQDp3PcOy7Ey7vyxel40DF52vd17YpFtxwXv1DG', 'Inactive', '2021-11-12 16:18:59', '2021-11-12 10:48:59', NULL),
(78, '', 'Govt School 23', 'State Board', 0000, 'state23@gmail.com', 0, '', 'Chennai', 'GovtSchool#23', '$2b$10$KEMqPchrsSCTsEW.o8B9Kupx/6lC790.4z7qqA9rRls6euD93nWXC', 'Inactive', '2021-11-12 16:25:17', '2021-11-12 10:55:17', NULL),
(79, '', 'Govt School 24', 'State Board', 0000, 'state24@gmail.com', 0, '', 'Chennai', 'GovtSchool#24', '$2b$10$yRkEMhuuO/qbmGeuD3BkTe8waSLcOPJX4TokNRXdVpRpw/vTfoPUy', 'Active', '2021-11-12 16:26:37', '2021-11-12 13:16:00', '2021-11-12 18:46:00'),
(80, '', 'Govt School 25', 'State Board', 0000, 'state25@gmail.com', 0, '', 'Chennai', 'GovtSchool#25', '$2b$10$vjppTrdib8rDj5muEeJX..sdl9mN.26INbZgKzf9f0hLpu7T1VbQK', 'Inactive', '2021-11-12 16:28:31', '2021-11-12 10:58:31', NULL),
(81, '', 'Govt School 26', 'State Board', 0000, 'state26@gmail.com', 0, '', 'Chennai', 'GovtSchool#26', '$2b$10$4VyJ9hkPY9YcNYEc5hyByOK70/77OBr6bjgMHmIdcTAQlHmhW8qZC', 'Inactive', '2021-11-12 16:37:28', '2021-11-12 11:07:28', NULL),
(82, '', 'Govt School 27', 'State Board', 0000, 'state27@gmail.com', 0, '', 'Chennai', 'GovtSchool#27', '$2b$10$ukPD76y7eoOyf83xNZtvLOTJo4kND1i9HMEE7ZTcyNMBWH5eK759m', 'Inactive', '2021-11-12 16:42:08', '2021-11-12 11:12:08', NULL),
(83, '', 'Govt School 28', 'State Board', 0000, 'state28@g.com', 0, '', 'Chennai', 'GovtSchool#28', '$2b$10$paVSgT2DXYhhH7Dw/gu.UuMh8zlUsHXPfeqNyz6ybw.PO9ieHQkQi', 'Inactive', '2021-11-12 16:48:50', '2021-11-12 11:18:50', NULL),
(84, '', 'Govt School 29', 'State Board', 0000, 'state29@g.c', 0, '', 'Chennai', 'GovtSchool#29', '$2b$10$xFiHwB1l.mtOL6x5olCEEeAhCurG41LMzx4eheMUHoXDtXR9GKv4y', 'Inactive', '2021-11-12 16:50:35', '2021-11-12 11:20:35', NULL),
(85, '', 'Govt School 30', 'State Board', 0000, 'state30@g.c', 0, '', 'Chennai', 'GovtSchool#30', '$2b$10$U4PUub8k9LyT.oDxW83pSuOWtzqhpcVC5dOIaIHjoOWfLw2W3lUIW', 'Inactive', '2021-11-12 16:52:25', '2021-11-12 11:22:25', NULL),
(86, '', 'Govt School 31', 'State Board', 0000, 'state31@g.c', 0, '', 'Chennai', 'GovtSchool#31', '$2b$10$mSY/Zp3.SrtBN07RWWqw/eLYnM.bdcmjSs7uJGIHkb7nZ8Y76dXxa', 'Inactive', '2021-11-12 16:56:38', '2021-11-12 11:26:38', NULL),
(87, '', 'Govt School 32', 'State Board', 0000, 'state32@g.c', 0, '', 'Chennai', 'GovtSchool#32', '$2b$10$52go2YKhImzgQhGVnXnkHuue2u6idx7q6G2y/8iXK054M2ytYhQaa', 'Inactive', '2021-11-12 17:00:33', '2021-11-12 11:30:33', NULL),
(88, '', 'Govt School 33', 'State Board', 0000, 'state33@g.c', 0, '', 'Chennai', 'GovtSchool#33', '$2b$10$a2/oHMcLOuYh.rvIGRh1iONMSln.W803cHYdVBEZPZQ5XzskibrjS', 'Inactive', '2021-11-12 17:24:56', '2021-11-12 11:54:56', NULL),
(89, '', 'Govt School 34', 'State Board', 0000, 'state34@g.c', 0, '', 'Chennai', 'GovtSchool#34', '$2b$10$39yhPl2uNVyyO81rG81lk.MBTxeS5EgBRsn1aqH/qYhPR8WHfaAqS', 'Inactive', '2021-11-12 17:31:25', '2021-11-12 12:01:25', NULL),
(90, '', 'Govt School 35', 'State Board', 0000, 'state35@g.c', 0, '', 'Chennai', 'GovtSchool#35', '$2b$10$B7bL4s3Xuscd2vDLc8iVu.N9f7YR2.IUqxCdXifoOTk8LprHheHsO', 'Inactive', '2021-11-12 17:32:54', '2021-11-12 12:02:54', NULL),
(91, '', 'Govt School 36', 'State Board', 0000, 'state36@g.c', 0, '', 'Chennai', 'GovtSchool#36', '$2b$10$Kwj0DDhLX4KzwpGLo8/md.fobZi4umLr7dN7OjBoXO/bPXFd0dgz6', 'Inactive', '2021-11-12 17:33:53', '2021-11-12 12:03:53', NULL),
(92, '', 'Govt School 37', 'State Board', 0000, 'state37@g.c', 0, '', 'Chennai', 'GovtSchool#37', '$2b$10$j3yGoXkPS.BP3b/b1YmMFuoJhAkV1zFQOmlIMDMdfrxKcliod.5xm', 'Active', '2021-11-12 17:35:30', '2021-11-12 13:47:05', '2021-11-12 19:17:05'),
(93, '', 'Govt School 38', 'State Board', 0000, 'state38@g.c', 0, '', 'Chennai', 'GovtSchool#38', '$2b$10$PQ4EoevQ5Bflnyp7Z0HTSeaZqmGMWjzlSwS.M1e5rrPCGy7nRGXB2', 'Active', '2021-11-12 17:37:27', '2021-11-12 13:41:18', '2021-11-12 19:11:18'),
(94, '', 'Govt School 40', 'State Board', 0000, 'state40@g.c', 0, '', 'Chennai', 'GovtSchool#40', '$2b$10$wbL4iJE4Sn.ymN3w2oSi8eO9BlyHniL7nwnCYcjGkMmlW3xxERddC', 'Active', '2021-11-12 17:41:16', '2021-11-12 13:43:34', '2021-11-12 19:13:34'),
(95, '', 'Govt School 41', 'State Board', 0000, 'state41@g.c', 0, '', 'Chennai', 'GovtSchool#41', '$2b$10$FAEl09DR7VgpUFQ6pQi9IuBGwiFSjP6pncNlgl2b4US/bolenP3l2', 'Active', '2021-11-12 17:43:29', '2021-11-12 13:34:11', '2021-11-12 19:04:11'),
(96, '', 'Govt School 42', 'State Board', 0000, 'state42@g.c', 0, '', 'Chennai', 'GovtSchool#42', '$2b$10$yU0BBZx8llkcBRj8SiNe9unZ1ocQc10qoatUla.ThPumCeljyWkQe', 'Active', '2022-01-05 07:11:34', '2022-01-05 01:41:34', NULL),
(97, '', 'Govt School 44', 'State Board', 0000, 'state44@g.c', 0, '', 'Chennai', 'GovtSchool#44', '$2b$10$vimdrkamgmWjD/UQN0PxduEtBW2UfdhdNtJ1p5pwOsDZutzKkCeAy', 'Active', '2021-11-12 17:47:40', '2021-11-18 07:24:13', '2021-11-18 12:54:13'),
(98, '', 'Govt School 45', 'State Board', 0000, 'state45@g.c', 0, '', 'Chennai', 'GovtSchool#45', '$2b$10$Nzfy1rIX5tOBc58eJqHNxO6UC8NdIvyoAWRyRI5PV9a0e2iqXpzz.', 'Inactive', '2021-11-12 17:49:26', '2021-11-12 12:19:26', NULL),
(99, '', 'Govt School 50', 'State Board', 0000, 'state50@g.c', 0, '', 'Chennai', 'GovtSchool#50', '$2b$10$ogrdZ62VOTuyEac7ERufy.xC4QwLd0I0ZcT1N55N.7uBYBjDqw4nS', 'Active', '2021-11-16 13:12:16', '2021-12-15 00:54:51', '2021-12-15 06:24:51'),
(100, '', 'Govt School 51', 'State Board', 0000, 'state51@g.c', 0, '', 'Chennai', 'GovtSchool#51', '$2b$10$S3SfRntRCtPfcgHNWrGR3.i8AuZGR4qx4PmChVigsAvvmOD1pjVhW', 'Inactive', '2021-11-16 13:17:00', '2021-11-16 07:47:00', NULL),
(101, '', 'Govt School 55', 'State Board', 0000, 'state55@g.c', 0, '', 'che', 'GovtSchool#55', '$2b$10$r7GnDJUGSYjRWwMMNozTSeCp.I0cfnZCfP3AGyVscog/EKI1R8KY.', 'Active', '2021-11-16 16:34:13', '2021-11-16 11:07:28', '2021-11-16 16:37:28'),
(102, '', 'Govt School 52', 'State Board', 0000, 'state52@g.c', 0, '', 'Chennai', 'GovtSchool#52', '$2b$10$4mHU5OWbC6kSDRBjxdlJNOtHrPn3.TL3cmbTwW8gkWThmnxtW3JJO', 'Inactive', '2021-11-17 08:34:40', '2021-11-17 03:04:40', NULL),
(103, '', 'Govt School 53', 'State Board', 0000, 'state53@g.c', 0, '', 'Chennai', 'GovtSchool#53', '$2b$10$2.XvZ2SS.JFOSZFVKe8t6O5dedNaj3WZUc3B/sUB.9nv9D.iZ7iUW', 'Inactive', '2021-11-17 08:38:59', '2021-11-17 03:08:59', NULL),
(104, '', 'Govt School 56', 'State Board', 0000, 'state56@g.c', 0, '', 'Chennai', 'GovtSchool#56', '$2b$10$qXtXSDh1JYWR3VYvRaljXe4/sdeVrOdMz0372m43HmA174uAccqvW', 'Inactive', '2021-11-17 11:41:44', '2021-11-17 06:11:44', NULL),
(105, '', 'Govt School 57', 'State Board', 0000, 'state57@g.c', 0, '', 'Chennai', 'GovtSchool#57', '$2b$10$C4VwbADnSpGGw1Pee6tBWO/2h7gVG3BKceHXsFInORqmSZoSLnbbO', 'Inactive', '2021-11-17 11:56:07', '2021-11-17 06:26:07', NULL),
(106, '', 'Govt School 58', 'State Board', 0000, 'state58@g.c', 0, '', 'Chennai', 'GovtSchool#58', '$2b$10$529ftsLDguIobpxa4hcLTeDwOzc8Qd/A7yNVk2qZsTUq7m8RTleQy', 'Inactive', '2021-11-17 11:59:37', '2021-11-17 06:29:37', NULL),
(107, '', 'Govt School 59', 'State Board', 0000, 'state59@g.c', 0, '', 'Chwennai', 'GovtSchool#59', '$2b$10$c6tHiwmNMrIsMxaXw7nKXeZDiHRYxSB3bGUrBoGGBt.9dxDjq8YAW', 'Inactive', '2021-11-17 12:28:03', '2021-11-17 06:58:03', NULL),
(108, '', 'Govt School 60', 'State Board', 0000, 'state60@g.c', 0, '', 'Chwennai', 'GovtSchool#60', '$2b$10$k7PvLVHSqd3giOPJbut1M.j/JE6DtpZqVddrH1qbPDBurY38IYedS', 'Inactive', '2021-11-17 12:32:45', '2021-11-17 07:02:45', NULL),
(109, '', 'Govt School 61', 'State Board', 0000, 'state61@g.c', 0, '', 'Chennai', 'GovtSchool#61', '$2b$10$Wa6AYb8FaGmPemn7hcHZJusYOtsSCsfKQjO4ZH4PnAKdfw7qlaLJi', 'Inactive', '2021-11-17 12:45:41', '2021-11-17 07:15:41', NULL),
(110, '', 'Govt School 62', 'State Board', 0000, 'state62@g.c', 0, '', 'Chennai', 'GovtSchool#62', '$2b$10$5V4Ay6mvgGaOKnrt6g/5FuEI9RVYIq4bu7.5oe.mU75N8jBFehNA.', 'Inactive', '2021-11-17 12:48:23', '2021-11-17 07:18:23', NULL),
(111, '', 'Govt School 63', 'State Board', 0000, 'state63@g.c', 0, '', 'Chennai', 'GovtSchool#63', '$2b$10$0KqajGnU1n3EBiEUYgYGCOo2CR.9usnv0OpFJSUaIZqXHYOlO0ihO', 'Inactive', '2021-11-17 12:55:32', '2021-11-17 07:25:32', NULL),
(112, '', 'Govt School 64', 'State Board', 0000, 'state64@g.c', 0, '', 'Chennai', 'GovtSchool#64', '$2b$10$6xGxqXLQgVBECbVVuID3Ku.39Ivsc.5kuFLbQN.chfx7hs3FSk7xy', 'Inactive', '2021-11-17 12:58:03', '2021-11-17 07:28:03', NULL),
(113, '', 'Govt School 65', 'State Board', 0000, 'state65@gc', 0, '', 'Chennai', 'GovtSchool#65', '$2b$10$JzZatOAYLE8L2xq9SAm0N.KgK7YSQhl/FdmYcPtTSze/qyUPy7K9q', 'Inactive', '2021-11-17 12:59:07', '2021-11-17 07:29:07', NULL),
(114, '', 'Govt School 66', 'State Board', 0000, 'state66@gc', 0, '', 'Chennai', 'GovtSchool#66', '$2b$10$oj0fHRY.pPBYvUXL4j8JruDqSObPlcEIMOhULxeSZQY5dsYTHWL4K', 'Inactive', '2021-11-17 13:00:17', '2021-11-17 07:30:17', NULL),
(116, '', 'Govt School 67', 'State Board', 0000, 'state67@g.c', 0, '', 'Chennai', 'GovtSchool#67', '$2b$10$ysa7XoFxXPd0i72Tcs90P.cxdUOelSWGDoidpMqUGXAEGFMdLsjne', 'Inactive', '2021-11-17 13:27:30', '2021-11-17 07:57:30', NULL),
(117, '', 'Govt School 68', 'State Board', 0000, 'state68@g.c', 0, '', 'Chennai', 'GovtSchool#68', '$2b$10$kbVcaEe4j7h7MJ4VtFk7mOuGyTitoC1KJAoMpI//jTw/Aa1ODoZhW', 'Inactive', '2021-11-17 13:29:17', '2021-11-17 07:59:17', NULL),
(118, '', 'Govt School 70', 'State Board', 0000, 'state70@g.c', 0, '', 'Chennai', 'GovtSchool#70', '$2b$10$EHdfse9yrWWGLNlh05VcwumuZdOcm2HLcu2R7Lb7mGoxfT.2NoHZG', 'Active', '2021-11-17 14:04:54', '2021-11-21 13:12:19', '2021-11-21 18:42:19'),
(132, '', 'Test School 34', 'State Board', 0000, 'balaguru.m@koinnovation.com', 0, '', 'Chennai', 'TestSchool@34', '$2b$10$rDXJEP.mvI/fEHaLQW3CyubRSFMrMNOI3.ZexbMddIWLdF2UGLpOa', 'Inactive', '2021-12-16 16:51:15', '2021-12-16 11:21:15', NULL),
(133, '', 'Mohan School 01', 'State Board', 0000, 'mohannraj.s@koinnovation.com', 0, '', 'Coimbatore', 'MohanSchool@01', '$2b$10$p5A7ogqceYTEI8N.eamZK.U0Dbv5Vm2.ywkhCX6/6MpTZs2prXLJC', 'Inactive', '2021-12-17 16:46:05', '2021-12-17 11:16:05', NULL),
(134, '', 'Mohan School 02', 'CBSE', 0000, 'mohanofficials18@gmail.com', 0, '', 'Chennai', 'MohanSchool@02', '$2b$10$JM7cHOL6.faqbaZXsEwOBezUA8Z/DoM1VegUpNzaTxIAqRfEEiYBC', 'Inactive', '2021-12-17 16:48:15', '2021-12-17 11:18:15', NULL),
(135, 'product-500x500.jpeg', 'Govt School 101', 'State Board', 2000, 'govt101@gmail.com', 9966552233, 'http://www.test.google.com/url', 'Manali, Chennai', 'GovtSchool#101', '$2b$10$98CyrIWTmjDCvoRHzvyaEu/.dd/mgz05UKFE1fgCAXJ.YX0ZLOs3m', 'Inactive', '2022-02-11 17:27:16', '2022-02-11 11:57:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_batch_mgmt`
--

CREATE TABLE `school_batch_mgmt` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `batch_name` varchar(255) NOT NULL,
  `year_from` year(4) NOT NULL,
  `year_to` year(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_batch_mgmt`
--

INSERT INTO `school_batch_mgmt` (`id`, `school_id`, `batch_name`, `year_from`, `year_to`, `created_at`, `updated_at`, `deleted_at`) VALUES
(15, 96, 'First Batch', 2022, 2027, '2022-02-15 18:06:56', '2022-02-15 12:36:56', NULL),
(16, 96, 'Second Batch', 2023, 2028, '2022-02-15 18:07:05', '2022-02-15 12:37:05', NULL),
(17, 96, 'Third Batch', 2024, 2029, '2022-02-15 18:07:17', '2022-02-15 12:37:17', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_classroom`
--

CREATE TABLE `school_classroom` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `class_id` int(10) NOT NULL,
  `class_section` varchar(15) NOT NULL,
  `students_strength` int(10) NOT NULL,
  `students_filled` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_classroom`
--

INSERT INTO `school_classroom` (`id`, `school_id`, `class_id`, `class_section`, `students_strength`, `students_filled`, `created_at`, `updated_at`, `deleted_at`) VALUES
(62, 96, 93, 'A', 55, 10, '2022-02-15 18:40:28', '2022-02-21 12:56:10', NULL),
(63, 96, 94, 'A', 99, 0, '2022-02-16 16:38:55', '2022-02-16 11:08:55', NULL),
(64, 96, 98, 'A', 54, 5, '2022-02-17 17:43:44', '2022-02-28 02:21:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_class_subjects`
--

CREATE TABLE `school_class_subjects` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `classroom_id` int(10) NOT NULL,
  `staff_id_assigned` int(10) NOT NULL,
  `secondary_staff_assigned` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_class_subjects`
--

INSERT INTO `school_class_subjects` (`id`, `school_id`, `subject_id`, `classroom_id`, `staff_id_assigned`, `secondary_staff_assigned`, `created_at`, `updated_at`, `deleted_at`) VALUES
(67, 96, 26, 62, 10024, 10026, '2022-02-17 12:41:51', '2022-02-17 08:08:22', NULL),
(68, 96, 27, 62, 10026, 10027, '2022-02-17 12:42:00', '2022-02-17 08:07:34', NULL),
(69, 96, 28, 62, 10027, 10026, '2022-02-17 12:42:23', '2022-02-17 07:12:23', NULL),
(70, 96, 29, 62, 10026, 10024, '2022-02-17 12:42:38', '2022-02-17 07:12:38', NULL),
(71, 96, 30, 62, 10042, 10027, '2022-02-17 12:43:14', '2022-02-17 08:07:40', NULL),
(72, 96, 26, 63, 10026, 10024, '2022-02-17 12:43:31', '2022-02-17 08:08:44', NULL),
(73, 96, 27, 63, 10026, 10027, '2022-02-17 12:43:52', '2022-02-17 08:07:48', NULL),
(74, 96, 28, 63, 10027, 10024, '2022-02-17 12:44:01', '2022-02-17 07:14:01', NULL),
(75, 96, 29, 63, 10024, 10026, '2022-02-17 12:44:11', '2022-02-17 08:08:09', NULL),
(76, 96, 30, 63, 10027, 10026, '2022-02-17 12:44:24', '2022-02-17 08:08:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_doubt_thread`
--

CREATE TABLE `school_doubt_thread` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `doubt_ref_id` int(10) NOT NULL,
  `message` varchar(255) NOT NULL,
  `message_by` int(10) NOT NULL,
  `view_status` enum('unread','read') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_doubt_thread`
--

INSERT INTO `school_doubt_thread` (`id`, `school_id`, `doubt_ref_id`, `message`, `message_by`, `view_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 96, 4, 'And also explain me why?', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(2, 96, 4, 'And also explain me why?', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(3, 96, 4, 'And also why?', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(4, 96, 4, 'test', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(5, 96, 4, 'Testing this post', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(6, 96, 4, 'Testing student route', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(7, 96, 2, 'Testing staff Route', 10027, 'read', '2022-01-19 19:13:24', '2022-01-19 13:43:24', NULL),
(8, 96, 2, 'Testing staff side reply', 10027, 'read', '2022-01-20 13:57:57', '2022-01-20 08:27:57', NULL),
(9, 96, 4, 'testing student side reply', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(10, 96, 2, 'test', 10027, 'read', '2022-01-20 13:57:57', '2022-01-20 08:27:57', NULL),
(11, 96, 2, 'Testing staff side reply', 10027, 'read', '2022-01-20 13:57:57', '2022-01-20 08:27:57', NULL),
(12, 96, 4, 'test', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(13, 96, 4, 'Staff Reply 1', 10024, 'read', '2022-01-20 13:35:58', '2022-01-20 08:05:58', NULL),
(14, 96, 4, 'Ok sir', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(15, 96, 4, 'did you understand this?', 10024, 'read', '2022-01-20 13:35:58', '2022-01-20 08:05:58', NULL),
(16, 96, 4, 'Yes sir Got it', 10032, 'read', '2022-01-20 13:32:13', '2022-01-20 08:02:13', NULL),
(17, 96, 4, 'HI', 10024, 'read', '2022-01-20 13:57:50', '2022-01-20 08:27:50', NULL),
(18, 96, 4, 'Checking new message', 10024, 'read', '2022-01-20 14:10:21', '2022-01-20 08:40:21', NULL),
(19, 96, 4, 'Hello again', 10024, 'read', '2022-01-20 16:02:08', '2022-01-20 10:32:08', NULL),
(20, 96, 1, 'Hi Vijay', 10024, 'read', '2022-01-20 14:35:41', '2022-01-20 09:05:41', NULL),
(21, 96, 5, 'Hi Vijay 3', 10024, 'read', '2022-01-20 16:02:05', '2022-01-20 10:32:05', NULL),
(22, 96, 6, 'Also explain this', 10032, 'read', '2022-01-21 11:10:20', '2022-01-21 05:40:20', NULL),
(23, 96, 6, 'Explaining ...', 10024, 'read', '2022-01-21 11:11:04', '2022-01-21 05:41:04', NULL),
(24, 96, 6, 'Not true?', 10032, 'read', '2022-01-21 11:11:46', '2022-01-21 05:41:46', NULL),
(25, 96, 4, 'hi from bala', 10024, 'read', '2022-01-21 16:20:09', '2022-01-21 10:50:09', NULL),
(26, 96, 4, 'Staff replying', 10024, 'unread', '2022-01-25 15:50:01', '2022-01-25 10:20:01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_exams`
--

CREATE TABLE `school_exams` (
  `id` int(10) NOT NULL,
  `ex_master_id` int(10) NOT NULL,
  `exam_conducted_class_sec` int(10) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `exam_date` datetime NOT NULL,
  `exam_duration` int(10) NOT NULL,
  `sub_outoff_marks` int(10) NOT NULL,
  `cutoff_mark` int(10) NOT NULL,
  `exam_status` enum('scheduled','postponed','completed','cancelled','onhold') NOT NULL,
  `created_by` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_exams`
--

INSERT INTO `school_exams` (`id`, `ex_master_id`, `exam_conducted_class_sec`, `subject_id`, `exam_date`, `exam_duration`, `sub_outoff_marks`, `cutoff_mark`, `exam_status`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(82, 6, 62, 26, '2022-02-18 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:09:46', '2022-02-17 07:55:27', NULL),
(83, 6, 62, 27, '2022-02-19 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:09:46', '2022-02-17 07:55:39', NULL),
(84, 6, 62, 28, '2022-02-21 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:09:46', '2022-02-17 07:55:36', NULL),
(85, 6, 62, 29, '2022-02-23 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:09:46', '2022-02-17 07:55:33', NULL),
(86, 6, 62, 30, '2022-02-24 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:09:46', '2022-02-17 07:55:30', NULL),
(87, 5, 62, 26, '2022-02-21 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:42:12', '2022-02-17 08:34:36', NULL),
(88, 5, 62, 27, '2022-02-22 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:42:12', '2022-02-17 08:19:30', NULL),
(89, 5, 62, 28, '2022-02-23 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:42:12', '2022-02-17 08:19:32', NULL),
(90, 5, 62, 29, '2022-02-24 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:42:12', '2022-02-17 08:19:35', NULL),
(91, 5, 62, 30, '2022-02-25 05:00:00', 60, 100, 35, 'completed', 10023, '2022-02-17 13:42:12', '2022-02-17 08:19:37', NULL),
(92, 8, 62, 26, '2022-02-25 05:00:00', 60, 100, 35, 'scheduled', 10023, '2022-02-19 12:14:48', '2022-02-19 06:44:48', NULL),
(93, 8, 62, 27, '2022-02-21 05:00:00', 60, 100, 35, 'scheduled', 10023, '2022-02-19 12:14:48', '2022-02-19 06:44:48', NULL),
(94, 8, 62, 28, '2022-02-22 05:00:00', 60, 100, 35, 'scheduled', 10023, '2022-02-19 12:14:48', '2022-02-19 06:44:48', NULL),
(95, 8, 62, 29, '2022-02-25 05:00:00', 60, 100, 35, 'scheduled', 10023, '2022-02-19 12:14:48', '2022-02-19 06:44:48', NULL),
(96, 8, 62, 30, '2022-02-24 05:00:00', 60, 100, 35, 'scheduled', 10023, '2022-02-19 12:14:48', '2022-02-19 06:44:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_exams_marks`
--

CREATE TABLE `school_exams_marks` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `exam_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `received_mark` int(10) NOT NULL,
  `subject_result` enum('Pass','Fail') NOT NULL,
  `entered_by` int(10) NOT NULL,
  `is_released` enum('yes','no') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_exams_marks`
--

INSERT INTO `school_exams_marks` (`id`, `school_id`, `exam_id`, `student_id`, `received_mark`, `subject_result`, `entered_by`, `is_released`, `created_at`, `updated_at`, `deleted_at`) VALUES
(39, 96, 84, 10045, 65, 'Pass', 10027, 'yes', '2022-02-17 13:26:13', '2022-02-21 06:16:26', NULL),
(40, 96, 84, 10031, 84, 'Pass', 10027, 'yes', '2022-02-17 13:26:13', '2022-02-18 11:01:29', NULL),
(43, 96, 85, 10045, 64, 'Pass', 10026, 'yes', '2022-02-17 13:27:21', '2022-02-18 11:01:06', NULL),
(44, 96, 85, 10031, 87, 'Pass', 10026, 'yes', '2022-02-17 13:27:21', '2022-02-18 11:01:20', NULL),
(45, 96, 83, 10045, 98, 'Pass', 10026, 'yes', '2022-02-17 13:39:53', '2022-02-17 08:09:53', NULL),
(46, 96, 83, 10031, 84, 'Pass', 10026, 'yes', '2022-02-17 13:39:53', '2022-02-17 08:09:53', NULL),
(47, 96, 86, 10045, 56, 'Pass', 10042, 'yes', '2022-02-17 13:40:23', '2022-02-17 08:10:23', NULL),
(48, 96, 86, 10031, 97, 'Pass', 10042, 'yes', '2022-02-17 13:40:23', '2022-02-17 08:10:23', NULL),
(49, 96, 91, 10045, 50, 'Pass', 10042, 'yes', '2022-02-17 13:50:11', '2022-02-18 11:01:01', NULL),
(50, 96, 91, 10031, 45, 'Pass', 10042, 'yes', '2022-02-17 13:50:11', '2022-02-18 11:01:25', NULL),
(51, 96, 89, 10045, 53, 'Pass', 10027, 'yes', '2022-02-17 13:50:27', '2022-02-18 07:23:33', NULL),
(52, 96, 89, 10031, 84, 'Pass', 10027, 'yes', '2022-02-17 13:50:27', '2022-02-18 07:23:33', NULL),
(55, 96, 88, 10045, 63, 'Pass', 10026, 'yes', '2022-02-17 13:51:03', '2022-02-18 07:06:34', NULL),
(56, 96, 88, 10031, 89, 'Pass', 10026, 'yes', '2022-02-17 13:51:03', '2022-02-18 07:06:34', NULL),
(57, 96, 90, 10045, 65, 'Pass', 10026, 'yes', '2022-02-17 13:51:12', '2022-02-18 07:25:00', NULL),
(58, 96, 90, 10031, 75, 'Pass', 10026, 'yes', '2022-02-17 13:51:12', '2022-02-18 07:25:00', NULL),
(59, 96, 82, 10045, 32, 'Fail', 10024, 'yes', '2022-02-17 14:07:11', '2022-02-17 08:37:11', NULL),
(60, 96, 82, 10031, 65, 'Pass', 10024, 'yes', '2022-02-17 14:07:11', '2022-02-17 08:37:24', NULL),
(61, 96, 87, 10045, 65, 'Pass', 10024, 'yes', '2022-02-17 14:07:57', '2022-02-18 07:04:56', NULL),
(62, 96, 87, 10031, 32, 'Fail', 10024, 'yes', '2022-02-17 14:07:57', '2022-02-18 07:04:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_exams_master`
--

CREATE TABLE `school_exams_master` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `exam_name` varchar(255) NOT NULL,
  `exam_type` enum('term_exam','quarterly_exam','half_yearly_exam','model_exam','annual_exam') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_exams_master`
--

INSERT INTO `school_exams_master` (`id`, `school_id`, `exam_name`, `exam_type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(5, 96, '2022 Annual Exam', 'annual_exam', '2022-02-22 17:49:06', '2022-02-22 12:19:06', NULL),
(6, 96, 'Mid Term 1', 'term_exam', '2022-02-09 19:38:41', '2022-02-09 14:08:41', NULL),
(7, 96, 'Mid Term 2', 'term_exam', '2022-02-09 19:38:46', '2022-02-09 14:08:46', NULL),
(8, 96, 'Annual Exam 2022', 'annual_exam', '2022-02-19 12:12:45', '2022-02-19 06:42:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_feestructure`
--

CREATE TABLE `school_feestructure` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `class_std` varchar(15) NOT NULL,
  `medium` enum('Tamil','English','Hindi') NOT NULL,
  `actual_fee` int(10) NOT NULL,
  `batch_id` int(10) NOT NULL,
  `std_year` year(4) NOT NULL,
  `academic_from` varchar(255) NOT NULL,
  `academic_to` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_feestructure`
--

INSERT INTO `school_feestructure` (`id`, `school_id`, `class_std`, `medium`, `actual_fee`, `batch_id`, `std_year`, `academic_from`, `academic_to`, `created_at`, `updated_at`, `deleted_at`) VALUES
(93, 96, '1', 'Tamil', 1000, 15, 2022, '4-2022', '3-2023', '2022-02-15 18:08:56', '2022-02-15 12:38:56', NULL),
(94, 96, '2', 'Tamil', 2000, 15, 2023, '4-2023', '3-2024', '2022-02-15 18:08:56', '2022-02-15 12:38:56', NULL),
(95, 96, '3', 'Tamil', 3000, 15, 2024, '4-2024', '3-2025', '2022-02-15 18:08:56', '2022-02-15 12:38:56', NULL),
(96, 96, '4', 'Tamil', 4000, 15, 2025, '4-2025', '3-2026', '2022-02-15 18:08:56', '2022-02-15 12:38:56', NULL),
(97, 96, '5', 'Tamil', 5000, 15, 2026, '4-2026', '3-2027', '2022-02-15 18:08:56', '2022-02-15 12:38:56', NULL),
(98, 96, '1', 'Tamil', 2000, 16, 2023, '6-2023', '5-2024', '2022-02-15 18:09:29', '2022-02-15 12:39:29', NULL),
(99, 96, '2', 'Tamil', 3000, 16, 2024, '6-2024', '5-2025', '2022-02-15 18:09:29', '2022-02-15 12:39:29', NULL),
(100, 96, '3', 'Tamil', 4000, 16, 2025, '6-2025', '5-2026', '2022-02-15 18:09:29', '2022-02-15 12:39:29', NULL),
(101, 96, '4', 'Tamil', 5000, 16, 2026, '6-2026', '5-2027', '2022-02-15 18:09:29', '2022-02-15 12:39:29', NULL),
(102, 96, '5', 'Tamil', 6000, 16, 2027, '6-2027', '5-2028', '2022-02-15 18:09:29', '2022-02-15 12:39:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_main_login`
--

CREATE TABLE `school_main_login` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `role_id_fk` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_main_login`
--

INSERT INTO `school_main_login` (`id`, `school_id`, `role_id_fk`, `username`, `password`, `email`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(10007, 71, 8, 'Teacher1', 'Teacher#123', 'teacher@g.com', 'Active', '2021-11-11 16:39:15', '2021-11-21 11:40:21', NULL),
(10008, 71, 4, 'Balaguru', 'Balaguru#123', 'balahead@test.com', 'Active', '2021-11-11 19:52:42', '2021-11-11 14:23:03', NULL),
(10009, 94, 8, 'Teacher#001', 'Teacher#001', 'teach1@g.c', 'Active', '2021-11-13 19:11:23', '2021-11-16 08:13:33', NULL),
(10022, 96, 9, 'Admin#42', '$2b$10$8T3BJP9DQ6vdy2xGRxwE9uyaX2z7/I7S1TNKHY5L4wP96LTTcmOFO', 'admin42@g.c', 'Active', '2022-02-21 11:56:03', '2022-02-21 06:26:03', NULL),
(10023, 96, 4, 'Headmaster#42', '$2b$10$ik9wEfPee5sS.W2W16t3c.gM73n7PcP2iN0dGpxNws/9cgfHIOXIu', 'hm42@g.c', 'Active', '2022-01-12 18:12:35', '2022-01-12 12:42:35', NULL),
(10024, 96, 8, 'Teacher#42', '$2b$10$6WoaS4bN2BE3x4aGnw5j.umldLhDR.hnyAPxBSHy98EJBW15si9Lm', 'teacher42@g.c', 'Active', '2022-02-21 11:56:12', '2022-02-21 06:26:12', NULL),
(10025, 96, 2, 'Employee#42', '$2b$10$swFuYvSdN7tivyOrLr3GquyftLUaIJopVrwsyTJDm.ciC/5kuc4IC', 'emp42@g.c', 'Active', '2021-11-22 17:04:04', '2021-12-20 08:00:05', NULL),
(10026, 96, 8, 'Teacher#42-2', '$2b$10$tWJUFqE9EfqL6ZFdeqaeUON5xaNteeSj2wfw8VKWTqa2mTKQXuPBi', 'teacher42-2@gmail.com', 'Active', '2022-01-10 12:13:55', '2022-01-10 06:43:55', NULL),
(10027, 96, 8, 'Amudhan#123', '$2b$10$SzimjjD6xPA72CVgJ6lbauHPr503mJwfutoruWj2CY9f8NghlELFy', 'amudhan@gmail.com', 'Active', '2022-01-10 17:05:32', '2022-01-10 11:35:32', NULL),
(10028, 97, 8, 'Rohit Sharma', '$2b$10$Mfh7HDhrWwg9IQRA1hg9D.9PYsRt3WRBQD/Jlg.lTXAq9cB/DCsyy', 'rohit@gmail.com', 'Active', '2021-12-01 17:16:01', '2021-12-01 11:46:14', NULL),
(10029, 96, 1, 'Student_1_42', '$2b$10$m5Ran7AK1./wXRjs.q3Uk.BqnmwHx6V9nKfSg3R8wHn/r8r20IR4u', 'student142@g.c', 'Inactive', '2022-01-05 09:27:28', '2022-01-05 03:57:28', '2022-01-05 09:27:28'),
(10030, 96, 1, 'Rakesh', '$2b$10$Chxg7.lkiz9FwD5aZhReL.sMkeRP/QNDw9T.Ef5UcUGQLIGCZwqje', 'rakesh@123.com', 'Active', '2022-01-17 17:00:11', '2022-01-17 11:30:11', '2022-01-05 08:59:24'),
(10031, 96, 1, 'Amala', '$2b$10$8T3BJP9DQ6vdy2xGRxwE9uyaX2z7/I7S1TNKHY5L4wP96LTTcmOFO', 'amala@gmail.com', 'Active', '2021-12-02 16:37:56', '2021-12-13 12:25:54', NULL),
(10032, 96, 1, 'Vijay', '$2b$10$nVKpCQGwZVPtlihEY44fmOpelIsFCm0nhnTvZW3VkOSSiw52Sf.0W', 'vijay@facebook.com', 'Active', '2021-12-02 18:23:57', '2021-12-10 11:20:30', NULL),
(10034, 99, 8, 'Prem', '$2b$10$Ssc9cLv1b4EUNBTdkrIupeYx8VIMQdEX4fm2/LYmaS/NNGJbSQsIi', 'prem@g.c', 'Active', '2021-12-06 15:48:13', '2021-12-06 10:18:52', NULL),
(10035, 96, 1, 'Udhay', '$2b$10$q6if10sgdQpO15qbuJ2uKe9CuwAlVcYxNl597irrLU4VxUgxbP9mi', 'udhay@g.c', 'Active', '2021-12-06 15:50:28', '2021-12-22 02:26:40', NULL),
(10037, 96, 1, 'Mohan', '$2b$10$LKc8zu8gKHtwud.9OviRzO9T5qJPdIAPZKKM71w.3FFcojrsQlEF6', 'mohan@gmail.com', 'Active', '2021-12-07 12:21:08', '2021-12-13 06:08:28', NULL),
(10038, 96, 1, 'Rajesh', '$2b$10$Ulmz0j8ZthGtw/.ugt/pX.MoL1k8FjNEhy2p2F9Bihoo9ToNA8Vqm', 'rajesh@gma.c', 'Active', '2021-12-14 16:23:48', '2021-12-14 10:53:48', NULL),
(10040, 96, 5, 'RaviKumar', '$2b$10$3DI./lqPoby6bOeq4kX1uuO3bd3RboiDl8F.9sv5mgwn9qKXgc4WW', 'balaguru.m@koinnovation.com', 'Active', '2022-01-12 18:12:38', '2022-01-12 12:42:38', NULL),
(10042, 96, 8, 'Ramaraj', '$2b$10$tWJUFqE9EfqL6ZFdeqaeUON5xaNteeSj2wfw8VKWTqa2mTKQXuPBi', 'ramraj@gmail.com', 'Active', '2022-02-17 13:29:33', '2022-02-17 07:59:33', NULL),
(10043, 96, 8, 'DummyTeacher#42', '$2b$10$b9LfSEXx7Uxx0/HtbCIz..UuE4kJrQBOqf6iqVkZ4rrRkICLpSyQa', 'dummy@g.c', 'Inactive', '2021-12-30 18:29:47', '2021-12-30 13:00:04', '2021-12-30 18:30:04'),
(10045, 96, 1, 'NewStudent#2021', '$2b$10$IMNWBHQOLi0GbFzyCd5CBu5TQw46eAYSPpIcfrJfcFwmzdDcHUZ7a', 'newstudent@gmail.com', 'Active', '2022-01-07 10:35:04', '2022-01-07 05:05:04', NULL),
(10046, 96, 5, 'MohanRaj', '$2b$10$qhGdBFVMhWh5UhDPiDsdeOr4WRvgAjP71QB4ac3Muu8ccCsPZlKOW', 'mohannraj.s@koinnovation.com', 'Active', '2022-01-12 18:12:42', '2022-01-12 12:42:42', NULL),
(10047, 96, 8, 'Teacher123', '$2b$10$tWJUFqE9EfqL6ZFdeqaeUON5xaNteeSj2wfw8VKWTqa2mTKQXuPBi', 'teacher123@gmail.com', 'Active', '2022-02-17 13:33:43', '2022-02-17 08:03:43', NULL),
(10048, 96, 5, 'Salman Khan', '$2b$10$NSpZGLy8WGynqd5WiDhTXe6rywpQEQfaozzknWQgya23RqZ.sy/Ki', 'salman@gmail.com', 'Active', '2022-01-12 18:05:49', '2022-01-12 12:35:49', NULL),
(10049, 96, 5, 'Rajeswari', '$2b$10$4ZHETzR9/JuC3if35XBSken2V3AkQzLa1OODyazhzpi6mt0C7ap.6', 'rajee.mistral@gmail.com', 'Active', '2022-01-12 18:10:05', '2022-01-12 12:40:05', NULL),
(10050, 96, 5, 'Shivin', '$2b$10$55jpRgx8d.ZaZHPnkSpOoegnhIOCmVGjN9pojMwZ7T29pOxWFh/rq', 'shivin@gmail.com', 'Active', '2022-01-21 16:01:05', '2022-01-21 10:31:05', NULL),
(10053, 96, 5, 'Father', '$2b$10$v3SWHkspDJJBxwySzC5VE.aP/FyjUu9aTNlru7Jbe.PDDNx89yXUm', 'father@gmail.com', 'Active', '2022-02-02 13:02:05', '2022-02-02 07:32:05', NULL),
(10054, 96, 1, 'Adhavan', '$2b$10$ZB5aaobZLj105Xgx3S6BoO8d37Fxe7ulkGAF1HIuebeEPv3VSWB8C', 'adhavan@gmail.com', 'Active', '2022-02-03 16:58:41', '2022-02-03 11:28:41', NULL),
(10055, 96, 1, 'Vibin', '$2b$10$uaPASZQEbgZLdwBbm.VtV.Auj1I0CDm0paiT21oqxoqSkmz9o18PS', 'vibin@gmail.com', 'Active', '2022-02-03 16:58:58', '2022-02-03 11:28:58', NULL),
(10056, 96, 1, 'Amul Doss', '$2b$10$Z5ozALpZ1PJmkiHZ.XtDR.RYhrJYE3Lmuvw7E7OYeqQdIeuHJc5Nq', 'amul@gmail.com', 'Active', '2022-02-03 16:59:36', '2022-02-03 11:29:36', NULL),
(10057, 96, 5, 'Ayyappan', '$2b$10$n3tJ7qhjiBe/a99RTF3/O.WwDzVYPtfpaoGSsmU/O6vk5LkjWK/dq', 'ayyappan@gmail.com', 'Active', '2022-02-03 17:01:51', '2022-02-03 11:31:51', NULL),
(10058, 96, 5, 'Manickam', '$2b$10$FzKdDqs6q.a8PbJDbX22yuwgAsAQFuAdbOPuXHTrU1EhY7zhN4jKe', 'manickam@gmail.com', 'Active', '2022-02-03 17:02:55', '2022-02-03 11:32:55', NULL),
(10059, 96, 5, 'Nagaraj', '$2b$10$/ipowzEZxECKVHx4s45KM.55r.IotzKUM9Po.0MTjLdb.VIUh.3XG', 'nagaraj@gmail.com', 'Active', '2022-02-03 17:04:00', '2022-02-03 11:34:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_messages`
--

CREATE TABLE `school_messages` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `msg_title` text NOT NULL,
  `msg_body` text NOT NULL,
  `msg_to_cat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `msg_to_specific` text DEFAULT NULL,
  `msg_expiry` datetime NOT NULL,
  `msg_by` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_parent`
--

CREATE TABLE `school_parent` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `parent_id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `residential_address` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `alternate_mobile` bigint(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_parent_student_map`
--

CREATE TABLE `school_parent_student_map` (
  `id` int(10) NOT NULL,
  `stu_school_id` int(10) NOT NULL,
  `parent_id` int(10) NOT NULL,
  `ml_student_id` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_parent_student_map`
--

INSERT INTO `school_parent_student_map` (`id`, `stu_school_id`, `parent_id`, `ml_student_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(4, 96, 10040, 10032, '2022-01-21 18:25:56', '2022-01-21 12:55:56', '2022-01-21 18:25:56'),
(5, 96, 10040, 10035, '2022-01-25 15:48:25', '2022-01-25 10:18:25', '2022-01-25 15:48:25'),
(13, 96, 10049, 10031, '2022-01-21 18:20:57', '2022-01-21 12:50:57', NULL),
(14, 96, 10048, 10038, '2022-01-22 09:04:39', '2022-01-22 03:34:39', '2022-01-22 09:04:39'),
(15, 96, 10046, 10031, '2022-01-22 09:02:30', '2022-01-22 03:32:30', '2022-01-22 09:02:30'),
(16, 96, 10050, 10038, '2022-01-21 18:20:57', '2022-01-21 12:50:57', NULL),
(17, 96, 10040, 10038, '2022-01-25 15:48:35', '2022-01-25 10:18:35', '2022-01-25 15:48:35'),
(21, 96, 10046, 10038, '2022-01-22 09:02:30', '2022-01-22 03:32:30', '2022-01-22 09:02:30'),
(22, 96, 10046, 10035, '2022-01-21 21:06:48', '2022-01-21 15:36:48', '2022-01-21 21:06:48'),
(34, 96, 10048, 10031, '2022-01-22 09:04:39', '2022-01-22 03:34:39', NULL),
(35, 96, 10048, 10035, '2022-01-22 09:04:39', '2022-01-22 03:34:39', NULL),
(36, 96, 10040, 10031, '2022-01-25 15:47:39', '2022-01-25 10:17:39', '2022-01-25 15:47:39'),
(39, 96, 10051, 10045, '2022-02-02 12:08:50', '2022-02-02 06:38:50', NULL),
(40, 96, 10053, 10045, '2022-02-02 13:02:05', '2022-02-02 07:32:05', NULL),
(41, 96, 10057, 10054, '2022-02-03 17:01:51', '2022-02-03 11:31:51', NULL),
(42, 96, 10058, 10055, '2022-02-03 17:02:55', '2022-02-03 11:32:55', NULL),
(43, 96, 10059, 10056, '2022-02-03 17:04:00', '2022-02-03 11:34:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_role`
--

CREATE TABLE `school_role` (
  `id` int(10) NOT NULL,
  `role_name` enum('Admin','Head Master','Teaching Faculty','Non-teaching Faculty','Student','Parent') NOT NULL DEFAULT 'Student',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_role`
--

INSERT INTO `school_role` (`id`, `role_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Student', '2021-11-11 14:04:31', '2021-11-11 08:34:31', '2021-11-11 14:04:31'),
(2, 'Non-teaching Faculty', '2021-11-11 14:04:39', '2021-11-11 08:34:39', '2021-11-11 14:04:39'),
(4, 'Head Master', '2021-11-11 14:05:17', '2021-11-11 08:35:17', '2021-11-11 14:05:17'),
(5, 'Parent', '2021-12-17 18:55:11', '2021-12-17 13:25:11', '2021-12-17 14:25:03'),
(8, 'Teaching Faculty', '2021-10-23 12:08:51', '2021-10-23 06:38:51', NULL),
(9, 'Admin', '2021-11-11 14:05:23', '2021-11-11 08:35:23', '2021-11-11 14:05:23');

-- --------------------------------------------------------

--
-- Table structure for table `school_schedule_template`
--

CREATE TABLE `school_schedule_template` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `schedule_name` varchar(255) NOT NULL,
  `no_of_periods` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_schedule_template`
--

INSERT INTO `school_schedule_template` (`id`, `school_id`, `schedule_name`, `no_of_periods`, `created_at`, `updated_at`, `deleted_at`) VALUES
(11, 96, '8 Period Working days', 8, '2022-01-05 13:17:41', '2022-01-05 07:47:41', NULL),
(13, 96, 'Half day', 4, '2022-01-05 12:17:02', '2022-01-05 06:47:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_staff`
--

CREATE TABLE `school_staff` (
  `id` int(10) NOT NULL,
  `staff_id` int(10) NOT NULL,
  `role_id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` varchar(255) NOT NULL,
  `mobile_number` bigint(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `qualification` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_staff`
--

INSERT INTO `school_staff` (`id`, `staff_id`, `role_id`, `school_id`, `name`, `date_of_birth`, `mobile_number`, `email`, `qualification`, `city`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(12, 10009, 8, 94, 'Balaguru Mamundi', '1989-06-03', 8124647244, 'teach1@g.c', 'BE-EEE', 'Chennai', 'Tamil Nadu', '2021-11-21 17:29:26', '2021-11-21 11:59:26', '0000-00-00 00:00:00'),
(14, 10007, 8, 71, 'Teacher 1', '1989-06-03', 9988775566, 'teacher@g.com', 'MBBS', 'Calicut', 'Kerala', '2021-11-21 18:23:24', '2021-11-21 12:53:24', '0000-00-00 00:00:00'),
(19, 10024, 8, 96, 'Nithilan B', '2019-10-09', 8124647244, 'teacher42@g.c', 'BE EEE', 'Coimbatore', 'Tamilnadu', '2021-12-21 13:50:14', '2021-12-21 08:20:14', '0000-00-00 00:00:00'),
(21, 10023, 4, 96, 'Sankar', '04-12-2020', 9966558844, 'hm42@g.c', 'PHD', 'Salem', 'TN', '2022-02-19 16:16:31', '2022-02-19 10:46:31', '0000-00-00 00:00:00'),
(22, 10027, 8, 96, 'Amudhan', '1989-08-10', 7358392914, 'amudhan@gmail.com', 'PHD', 'Namakkal', 'TN', '2021-12-30 19:09:54', '2021-12-30 13:39:54', '0000-00-00 00:00:00'),
(23, 10026, 8, 96, 'Rajee', '1990-07-17', 6699887744, 'teacher42-2@gmail.com', 'BE', 'Chennai', 'TN', '2022-01-21 12:19:27', '2022-01-21 06:49:27', '0000-00-00 00:00:00'),
(24, 10042, 8, 96, 'Ramaraj', '1989-11-05', 9988774566, 'ramraj@gmail.com', 'ME', 'Salem', 'Tamilnadu', '2022-02-17 13:32:38', '2022-02-17 08:02:38', '0000-00-00 00:00:00'),
(27, 10025, 2, 96, 'Cashier', '05-12-2018', 9966558877, 'emp42@g.c', 'BE EEE', 'Chennai', 'TN', '2022-02-21 11:42:43', '2022-02-21 06:12:43', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `school_staff_attendance`
--

CREATE TABLE `school_staff_attendance` (
  `id` int(10) NOT NULL,
  `staff_id` int(10) NOT NULL,
  `attend_date` date NOT NULL,
  `attend_status` enum('Leave','On Duty','Present','Half day') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_staff_availability`
--

CREATE TABLE `school_staff_availability` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `staff_id` int(10) NOT NULL,
  `day` enum('Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Odd_Saturdays','Odd_Sundays','Even_Saturdays','Even_Sundays') NOT NULL,
  `p1` int(11) DEFAULT NULL,
  `p2` int(11) DEFAULT NULL,
  `p3` int(11) DEFAULT NULL,
  `p4` int(11) DEFAULT NULL,
  `p5` int(11) DEFAULT NULL,
  `p6` int(11) DEFAULT NULL,
  `p7` int(11) DEFAULT NULL,
  `p8` int(11) DEFAULT NULL,
  `p9` int(11) DEFAULT NULL,
  `p10` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `school_staff_salary`
--

CREATE TABLE `school_staff_salary` (
  `id` int(10) NOT NULL,
  `staff_id` int(10) NOT NULL,
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
  `school_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile_number` bigint(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `parent_email` varchar(255) NOT NULL,
  `parent_mobile` bigint(10) NOT NULL,
  `date_of_birth` date NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_student`
--

INSERT INTO `school_student` (`id`, `school_id`, `student_id`, `name`, `mobile_number`, `email`, `father_name`, `parent_email`, `parent_mobile`, `date_of_birth`, `city`, `state`, `created_at`, `updated_at`, `deleted_at`) VALUES
(27, 96, 10038, 'Rajesh', 9988776655, 'rajesh@gma.c', 'Mohan', 'balaguru.m@koinnovation.com', 8124647244, '2006-10-10', 'Chennai', 'TN', '2021-12-14 16:25:01', '2021-12-17 13:40:40', NULL),
(28, 96, 10031, 'Amala', 9988774455, 'amala@gmail.com', 'Kamal', 'balaguru.m@koinnovation.com', 8124647244, '2010-12-17', 'Chennai', 'TN', '2021-12-14 16:45:32', '2021-12-17 13:40:42', NULL),
(29, 96, 10030, 'Rakesh', 9988776655, 'rakesh@123.com', 'Rajesh', 'balaguru.m@koinnovation.com', 8124647244, '2005-10-10', 'Chennai', 'TN', '2021-12-15 14:41:58', '2021-12-17 13:40:56', NULL),
(40, 96, 10035, 'Udhay Kumar', 8855221144, 'udhay@g.c', 'M.Ramalingam', 'balaguru.m@koinnovation.com', 9988744566, '2005-03-24', 'Namakkal', 'TN', '2021-12-22 08:04:09', '2021-12-22 02:34:09', NULL),
(41, 96, 10032, 'Vijay Kumar', 9988556677, 'vijay@facebook.com', 'R a v i Kumar', 'balaguru.m@koinnovation.com', 9988558877, '2006-05-21', 'Chennai', 'TN', '2021-12-22 16:21:29', '2021-12-22 10:51:29', NULL),
(45, 96, 10045, 'New Student', 9988774455, 'newstudent@gmail.com', 'Father', 'father@gmail.com', 9988556644, '2000-10-10', 'Chennai', 'TN', '2022-02-02 13:02:05', '2022-02-02 07:32:05', NULL),
(46, 96, 10054, 'Adhavan', 9988554477, 'adhavan@gmail.com', 'Ayyappan', 'ayyappan@gmail.com', 9988775544, '2000-05-20', 'Chennai', 'TN', '2022-02-03 17:01:50', '2022-02-03 11:31:50', NULL),
(47, 96, 10055, 'Vibin', 9966332255, 'vibin@gmail.com', 'Manickam', 'manickam@gmail.com', 9988445566, '2000-08-20', 'Chennai', 'TN', '2022-02-03 17:02:55', '2022-02-03 11:32:55', NULL),
(48, 96, 10056, 'Amul Doss', 9966225588, 'amul@gmail.com', 'Nagaraj', 'nagaraj@gmail.com', 9988774411, '2000-07-24', 'Chennai', 'TN', '2022-02-03 17:04:00', '2022-02-03 11:34:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_student_admission`
--

CREATE TABLE `school_student_admission` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `mobile_number` bigint(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `batch_id` int(10) NOT NULL,
  `class_medium` int(10) NOT NULL,
  `class_section` int(10) NOT NULL,
  `actual_fee` int(10) NOT NULL,
  `paying_amount` int(10) NOT NULL,
  `payment_mode` enum('Cash','Credit / Debit Card','Cheque','Netbanking','Promote','Demote') NOT NULL,
  `payment_status` enum('No Due','Due','Not Paid') NOT NULL,
  `entry_by` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_student_admission`
--

INSERT INTO `school_student_admission` (`id`, `school_id`, `student_id`, `mobile_number`, `email`, `batch_id`, `class_medium`, `class_section`, `actual_fee`, `paying_amount`, `payment_mode`, `payment_status`, `entry_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(62, 96, 10045, 9988774455, 'newstudent@gmail.com', 15, 93, 62, 1000, 1000, 'Cash', 'No Due', 96, '2022-02-28 07:43:55', '2022-02-28 02:13:55', '2022-02-28 07:43:55'),
(63, 96, 10031, 9988774455, 'amala@gmail.com', 15, 93, 62, 1000, 1000, 'Cash', 'No Due', 96, '2022-02-28 07:51:30', '2022-02-28 02:21:30', '2022-02-28 07:51:30'),
(65, 96, 10032, 9988556677, 'vijay@facebook.com', 15, 93, 62, 1000, 100, 'Cash', 'Due', 96, '2022-02-28 07:26:00', '2022-02-28 01:56:00', NULL),
(71, 96, 10031, 9988774455, 'amala@gmail.com', 16, 98, 64, 2000, 2000, 'Cash', 'No Due', 10025, '2022-02-28 08:39:29', '2022-02-28 03:09:29', NULL),
(73, 96, 10056, 9966225588, 'amul@gmail.com', 15, 93, 62, 1000, 1000, 'Cash', 'No Due', 10025, '2022-02-28 07:25:55', '2022-02-28 01:55:55', NULL),
(96, 96, 10045, 9988774455, 'newstudent@gmail.com', 15, 94, 63, 2000, 0, 'Promote', 'Due', 96, '2022-02-28 07:43:55', '2022-02-28 02:13:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_student_attendance`
--

CREATE TABLE `school_student_attendance` (
  `id` int(10) NOT NULL,
  `date` date NOT NULL,
  `school_id` int(10) NOT NULL,
  `class_sec` int(10) NOT NULL,
  `period_no` int(10) NOT NULL,
  `attend_status` enum('Absent','On_Duty','Leave_Intimated','Present') NOT NULL,
  `student_affected` int(10) DEFAULT NULL,
  `entered_by` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_student_attendance`
--

INSERT INTO `school_student_attendance` (`id`, `date`, `school_id`, `class_sec`, `period_no`, `attend_status`, `student_affected`, `entered_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(96, '2022-02-18', 96, 62, 3, 'Absent', 10045, 10024, '2022-02-18 16:50:09', '2022-02-18 11:20:09', NULL),
(97, '2022-02-18', 96, 62, 3, 'Present', 10032, 10024, '2022-02-18 16:50:09', '2022-02-18 11:20:09', NULL),
(98, '2022-02-18', 96, 62, 3, 'Leave_Intimated', 10031, 10024, '2022-02-18 16:50:09', '2022-02-18 11:20:09', NULL),
(99, '2022-02-23', 96, 62, 2, 'Absent', 10045, 10027, '2022-02-23 14:25:56', '2022-02-23 08:55:56', NULL),
(100, '2022-02-23', 96, 62, 2, 'Present', 10031, 10027, '2022-02-23 14:25:56', '2022-02-23 08:55:56', NULL),
(101, '2022-02-23', 96, 62, 2, 'Present', 10032, 10027, '2022-02-23 14:25:56', '2022-02-23 08:55:56', NULL),
(102, '2022-02-23', 96, 62, 2, 'Present', 10056, 10027, '2022-02-23 14:25:56', '2022-02-23 08:55:56', NULL),
(103, '2022-02-23', 96, 62, 1, 'Absent', 10031, 10024, '2022-02-23 14:26:19', '2022-02-23 08:56:19', NULL),
(104, '2022-02-23', 96, 62, 1, 'Present', 10032, 10024, '2022-02-23 14:26:19', '2022-02-23 08:56:19', NULL),
(105, '2022-02-23', 96, 62, 1, 'Present', 10045, 10024, '2022-02-23 14:26:19', '2022-02-23 08:56:19', NULL),
(106, '2022-02-23', 96, 62, 1, 'Present', 10056, 10024, '2022-02-23 14:26:19', '2022-02-23 08:56:19', NULL),
(107, '2022-02-23', 96, 62, 3, 'On_Duty', 10045, 10026, '2022-02-23 14:26:46', '2022-02-23 08:56:46', NULL),
(108, '2022-02-23', 96, 62, 3, 'Present', 10031, 10026, '2022-02-23 14:26:46', '2022-02-23 08:56:46', NULL),
(109, '2022-02-23', 96, 62, 3, 'Present', 10032, 10026, '2022-02-23 14:26:46', '2022-02-23 08:56:46', NULL),
(110, '2022-02-23', 96, 62, 3, 'Leave_Intimated', 10056, 10026, '2022-02-23 14:26:46', '2022-02-23 08:56:46', NULL),
(111, '2022-02-23', 96, 62, 4, 'Present', 10031, 10026, '2022-02-23 14:26:54', '2022-02-23 08:56:54', NULL),
(112, '2022-02-23', 96, 62, 4, 'Present', 10032, 10026, '2022-02-23 14:26:54', '2022-02-23 08:56:54', NULL),
(113, '2022-02-23', 96, 62, 4, 'Present', 10056, 10026, '2022-02-23 14:26:54', '2022-02-23 08:56:54', NULL),
(114, '2022-02-23', 96, 62, 4, 'Leave_Intimated', 10045, 10026, '2022-02-23 14:26:54', '2022-02-23 08:56:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_student_doubts`
--

CREATE TABLE `school_student_doubts` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `asked_by` int(10) NOT NULL,
  `asked_to` int(10) NOT NULL,
  `doubt_title` varchar(255) NOT NULL,
  `doubt_desc` varchar(255) NOT NULL,
  `status` enum('open','closed') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_student_doubts`
--

INSERT INTO `school_student_doubts` (`id`, `school_id`, `asked_by`, `asked_to`, `doubt_title`, `doubt_desc`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 96, 10032, 10024, 'Test', 'test 123 How?', 'open', '2022-01-17 20:18:14', '2022-01-17 14:48:14', NULL),
(2, 96, 10032, 10027, 'Testing 2', 'How this works?', 'open', '2022-01-17 20:21:19', '2022-01-17 14:51:19', NULL),
(3, 96, 10032, 10027, 'Testing 2', 'How this works??', 'open', '2022-01-17 20:22:02', '2022-01-17 14:52:02', NULL),
(4, 96, 10032, 10024, 'How Aeroplane works?', 'I have seen an airplane taking off from the ground. In a fraction of second, it touched the sky. What makes it to fly at that speed and explain me in detail sir.\r\n\r\nThanks.', 'open', '2022-01-20 13:43:02', '2022-01-20 08:13:02', NULL),
(5, 96, 10032, 10024, 'how', 'yyy', 'open', '2022-01-19 12:47:44', '2022-01-19 07:17:44', NULL),
(6, 96, 10032, 10024, 'What is this?', 'This is what?', 'open', '2022-01-21 11:11:38', '2022-01-21 05:41:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_student_feedue`
--

CREATE TABLE `school_student_feedue` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `student_id` int(10) NOT NULL,
  `admission_id` int(10) NOT NULL,
  `actual_fee` int(10) NOT NULL,
  `currently_paying` int(11) NOT NULL,
  `payment_mode` enum('Cash','Card','Cheque','Net Banking') NOT NULL,
  `due_status` enum('No Due','Due') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_student_feedue`
--

INSERT INTO `school_student_feedue` (`id`, `school_id`, `student_id`, `admission_id`, `actual_fee`, `currently_paying`, `payment_mode`, `due_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(65, 96, 10045, 62, 1000, 100, 'Cash', 'Due', '2022-02-16 20:34:42', '2022-02-16 15:04:42', NULL),
(66, 96, 10031, 63, 1000, 900, 'Cash', 'No Due', '2022-02-17 11:46:12', '2022-02-17 06:16:12', NULL),
(67, 96, 10031, 71, 2000, 1000, 'Cash', 'No Due', '2022-02-17 18:54:26', '2022-02-17 13:24:26', NULL),
(68, 96, 10045, 62, 1000, 800, 'Cash', 'No Due', '2022-02-18 16:30:14', '2022-02-18 11:00:14', NULL),
(69, 96, 10056, 73, 1000, 800, 'Cash', 'No Due', '2022-02-21 18:26:31', '2022-02-21 12:56:31', NULL),
(70, 96, 10031, 71, 2000, 1000, 'Cash', 'No Due', '2022-02-28 08:39:29', '2022-02-28 03:09:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_subjects`
--

CREATE TABLE `school_subjects` (
  `id` int(10) NOT NULL,
  `subject_name` varchar(30) NOT NULL,
  `school_id` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_subjects`
--

INSERT INTO `school_subjects` (`id`, `subject_name`, `school_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(26, 'Tamil', 96, '2022-02-17 12:41:04', '2022-02-17 07:11:04', NULL),
(27, 'English', 96, '2022-02-17 12:41:08', '2022-02-17 07:11:08', NULL),
(28, 'Maths', 96, '2022-02-17 12:41:12', '2022-02-17 07:11:12', NULL),
(29, 'Science', 96, '2022-02-17 12:41:17', '2022-02-17 07:11:17', NULL),
(30, 'Social Science', 96, '2022-02-17 12:41:23', '2022-02-17 07:11:23', NULL),
(31, 'C++', 96, '2022-02-19 12:05:04', '2022-02-19 06:35:04', NULL),
(32, 'Test', 96, '2022-02-19 16:20:16', '2022-02-19 10:50:18', '2022-02-19 16:20:18');

-- --------------------------------------------------------

--
-- Table structure for table `school_week_schedule`
--

CREATE TABLE `school_week_schedule` (
  `id` int(10) NOT NULL,
  `day` enum('Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Odd_Saturdays','Odd_Sundays','Even_Saturdays','Even_Sundays') NOT NULL,
  `school_id` int(10) NOT NULL,
  `class_sec_id` int(10) NOT NULL,
  `schedule_tempid` int(10) NOT NULL,
  `period_no` int(10) DEFAULT NULL,
  `period_subject_id` int(10) DEFAULT NULL,
  `period_staff_id` int(10) DEFAULT NULL,
  `created_by` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_week_schedule`
--

INSERT INTO `school_week_schedule` (`id`, `day`, `school_id`, `class_sec_id`, `schedule_tempid`, `period_no`, `period_subject_id`, `period_staff_id`, `created_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(143, 'Mondays', 96, 62, 13, 1, 27, 10026, 96, '2022-02-18 16:46:23', '2022-02-18 11:16:23', NULL),
(144, 'Mondays', 96, 62, 13, 2, 26, 10024, 96, '2022-02-18 16:46:23', '2022-02-18 11:16:23', NULL),
(145, 'Mondays', 96, 62, 13, 3, 28, 10027, 96, '2022-02-18 16:46:23', '2022-02-18 11:16:23', NULL),
(146, 'Mondays', 96, 62, 13, 4, 29, 10026, 96, '2022-02-18 16:46:23', '2022-02-18 11:16:23', NULL),
(153, 'Fridays', 96, 62, 13, 1, 30, 10042, 96, '2022-02-18 16:46:42', '2022-02-18 11:16:42', NULL),
(154, 'Fridays', 96, 62, 13, 2, 27, 10026, 96, '2022-02-18 16:46:42', '2022-02-18 11:16:42', NULL),
(155, 'Fridays', 96, 62, 13, 3, 26, 10024, 96, '2022-02-18 16:46:42', '2022-02-18 11:16:42', NULL),
(156, 'Fridays', 96, 62, 13, 4, 28, 10027, 96, '2022-02-18 16:46:42', '2022-02-18 11:16:42', NULL),
(173, 'Wednesdays', 96, 62, 13, 1, 26, 10024, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', NULL),
(174, 'Wednesdays', 96, 62, 13, 2, 28, 10027, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', NULL),
(175, 'Wednesdays', 96, 62, 13, 3, 27, 10026, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', NULL),
(176, 'Wednesdays', 96, 62, 13, 4, 29, 10026, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', NULL),
(177, 'Wednesdays', 96, 62, 13, 0, 0, 0, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', '2022-02-23 14:25:18'),
(178, 'Wednesdays', 96, 62, 13, 0, 0, 0, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', '2022-02-23 14:25:18'),
(179, 'Wednesdays', 96, 62, 13, 0, 0, 0, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', '2022-02-23 14:25:18'),
(180, 'Wednesdays', 96, 62, 13, 0, 0, 0, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', '2022-02-23 14:25:18'),
(181, 'Wednesdays', 96, 62, 13, 0, 0, 0, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', '2022-02-23 14:25:18'),
(182, 'Wednesdays', 96, 62, 13, 0, 0, 0, 96, '2022-02-23 14:25:18', '2022-02-23 08:55:18', '2022-02-23 14:25:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `school_activate`
--
ALTER TABLE `school_activate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_activate_payment`
--
ALTER TABLE `school_activate_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_add_school`
--
ALTER TABLE `school_add_school`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_name` (`school_name`,`school_login`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `school_batch_mgmt`
--
ALTER TABLE `school_batch_mgmt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id linking batch` (`school_id`);

--
-- Indexes for table `school_classroom`
--
ALTER TABLE `school_classroom`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `school_class_subjects`
--
ALTER TABLE `school_class_subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_id_2` (`school_id`,`subject_id`,`classroom_id`,`staff_id_assigned`),
  ADD KEY `staff_id_assigned` (`staff_id_assigned`),
  ADD KEY `classroom_id` (`classroom_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_doubt_thread`
--
ALTER TABLE `school_doubt_thread`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id doubt thread` (`school_id`),
  ADD KEY `dobt ref id linking student doubts` (`doubt_ref_id`),
  ADD KEY `message_by linking main_login` (`message_by`);

--
-- Indexes for table `school_exams`
--
ALTER TABLE `school_exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_id link with subjects` (`subject_id`),
  ADD KEY `class sec links with exams` (`exam_conducted_class_sec`),
  ADD KEY `ex_master_id links with exam master` (`ex_master_id`);

--
-- Indexes for table `school_exams_marks`
--
ALTER TABLE `school_exams_marks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id links with marks` (`school_id`),
  ADD KEY `exam_id links with marks` (`exam_id`),
  ADD KEY `student_id links with mark` (`student_id`),
  ADD KEY `entered_by links staffid` (`entered_by`);

--
-- Indexes for table `school_exams_master`
--
ALTER TABLE `school_exams_master`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id links exam master` (`school_id`);

--
-- Indexes for table `school_feestructure`
--
ALTER TABLE `school_feestructure`
  ADD PRIMARY KEY (`id`),
  ADD KEY `batch_id links with batch_mgmt` (`batch_id`);

--
-- Indexes for table `school_main_login`
--
ALTER TABLE `school_main_login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `login links with school_role` (`role_id_fk`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_messages`
--
ALTER TABLE `school_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_parent`
--
ALTER TABLE `school_parent`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_parent_student_map`
--
ALTER TABLE `school_parent_student_map`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `parent_id` (`parent_id`,`ml_student_id`);

--
-- Indexes for table `school_role`
--
ALTER TABLE `school_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `school_schedule_template`
--
ALTER TABLE `school_schedule_template`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_staff`
--
ALTER TABLE `school_staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `staff link with role` (`role_id`),
  ADD KEY `staff_id_2` (`school_id`,`email`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `school_staff_attendance`
--
ALTER TABLE `school_staff_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff atten - staff` (`staff_id`);

--
-- Indexes for table `school_staff_availability`
--
ALTER TABLE `school_staff_availability`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `school_staff_salary`
--
ALTER TABLE `school_staff_salary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff ATTENDANCE -staff salary` (`username`),
  ADD KEY `staff id - salary` (`staff_id`);

--
-- Indexes for table `school_student`
--
ALTER TABLE `school_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_student_admission`
--
ALTER TABLE `school_student_admission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id_2` (`student_id`,`batch_id`,`class_medium`,`class_section`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `class_medium` (`class_medium`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `entry_by` (`entry_by`),
  ADD KEY `class_section` (`class_section`),
  ADD KEY `batch_id linking with admission` (`batch_id`);

--
-- Indexes for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_sec to classroom` (`class_sec`),
  ADD KEY `entered_by staff` (`entered_by`),
  ADD KEY `school_id school` (`school_id`),
  ADD KEY `studenty_id linking to attend` (`student_affected`);

--
-- Indexes for table `school_student_doubts`
--
ALTER TABLE `school_student_doubts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id linking doubts` (`school_id`),
  ADD KEY `asked_by linking doubts students` (`asked_by`),
  ADD KEY `asked_to linking doubts Staff` (`asked_to`);

--
-- Indexes for table `school_student_feedue`
--
ALTER TABLE `school_student_feedue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student paid fee` (`student_id`),
  ADD KEY `admission_id` (`admission_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_subjects`
--
ALTER TABLE `school_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `school_week_schedule`
--
ALTER TABLE `school_week_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `school_id linking` (`school_id`),
  ADD KEY `class_sec_id linking` (`class_sec_id`),
  ADD KEY `schedule Temp id` (`schedule_tempid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `school_activate`
--
ALTER TABLE `school_activate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `school_activate_payment`
--
ALTER TABLE `school_activate_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `school_add_school`
--
ALTER TABLE `school_add_school`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `school_batch_mgmt`
--
ALTER TABLE `school_batch_mgmt`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `school_classroom`
--
ALTER TABLE `school_classroom`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `school_class_subjects`
--
ALTER TABLE `school_class_subjects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `school_doubt_thread`
--
ALTER TABLE `school_doubt_thread`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `school_exams`
--
ALTER TABLE `school_exams`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `school_exams_marks`
--
ALTER TABLE `school_exams_marks`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `school_exams_master`
--
ALTER TABLE `school_exams_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `school_feestructure`
--
ALTER TABLE `school_feestructure`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `school_main_login`
--
ALTER TABLE `school_main_login`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10060;

--
-- AUTO_INCREMENT for table `school_messages`
--
ALTER TABLE `school_messages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_parent`
--
ALTER TABLE `school_parent`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_parent_student_map`
--
ALTER TABLE `school_parent_student_map`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `school_role`
--
ALTER TABLE `school_role`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `school_schedule_template`
--
ALTER TABLE `school_schedule_template`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `school_staff`
--
ALTER TABLE `school_staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `school_staff_attendance`
--
ALTER TABLE `school_staff_attendance`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_staff_availability`
--
ALTER TABLE `school_staff_availability`
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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `school_student_admission`
--
ALTER TABLE `school_student_admission`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `school_student_doubts`
--
ALTER TABLE `school_student_doubts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `school_student_feedue`
--
ALTER TABLE `school_student_feedue`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `school_subjects`
--
ALTER TABLE `school_subjects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `school_week_schedule`
--
ALTER TABLE `school_week_schedule`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `school_activate`
--
ALTER TABLE `school_activate`
  ADD CONSTRAINT `links with add school` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_batch_mgmt`
--
ALTER TABLE `school_batch_mgmt`
  ADD CONSTRAINT `school_id linking batch` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_classroom`
--
ALTER TABLE `school_classroom`
  ADD CONSTRAINT `class_id with feestucture` FOREIGN KEY (`class_id`) REFERENCES `school_feestructure` (`id`),
  ADD CONSTRAINT `school_id` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_class_subjects`
--
ALTER TABLE `school_class_subjects`
  ADD CONSTRAINT `classroom id links with classroom` FOREIGN KEY (`classroom_id`) REFERENCES `school_classroom` (`id`),
  ADD CONSTRAINT `staff_id links with class_subjecrt` FOREIGN KEY (`staff_id_assigned`) REFERENCES `school_main_login` (`id`),
  ADD CONSTRAINT `subject links with class_subject` FOREIGN KEY (`subject_id`) REFERENCES `school_subjects` (`id`),
  ADD CONSTRAINT `subject links with school_id` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_doubt_thread`
--
ALTER TABLE `school_doubt_thread`
  ADD CONSTRAINT `dobt ref id linking student doubts` FOREIGN KEY (`doubt_ref_id`) REFERENCES `school_student_doubts` (`id`),
  ADD CONSTRAINT `message_by linking main_login` FOREIGN KEY (`message_by`) REFERENCES `school_main_login` (`id`),
  ADD CONSTRAINT `school_id doubt thread` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_exams`
--
ALTER TABLE `school_exams`
  ADD CONSTRAINT `class sec links with exams` FOREIGN KEY (`exam_conducted_class_sec`) REFERENCES `school_classroom` (`id`),
  ADD CONSTRAINT `ex_master_id links with exam master` FOREIGN KEY (`ex_master_id`) REFERENCES `school_exams_master` (`id`),
  ADD CONSTRAINT `subject_id link with subjects` FOREIGN KEY (`subject_id`) REFERENCES `school_subjects` (`id`);

--
-- Constraints for table `school_exams_marks`
--
ALTER TABLE `school_exams_marks`
  ADD CONSTRAINT `entered_by links staffid` FOREIGN KEY (`entered_by`) REFERENCES `school_staff` (`staff_id`),
  ADD CONSTRAINT `exam_id links with marks` FOREIGN KEY (`exam_id`) REFERENCES `school_exams` (`id`),
  ADD CONSTRAINT `school_id links with marks` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`),
  ADD CONSTRAINT `student_id links with mark` FOREIGN KEY (`student_id`) REFERENCES `school_student` (`student_id`);

--
-- Constraints for table `school_exams_master`
--
ALTER TABLE `school_exams_master`
  ADD CONSTRAINT `school_id links exam master` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_feestructure`
--
ALTER TABLE `school_feestructure`
  ADD CONSTRAINT `batch_id links with batch_mgmt` FOREIGN KEY (`batch_id`) REFERENCES `school_batch_mgmt` (`id`),
  ADD CONSTRAINT `school_id links with school` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_main_login`
--
ALTER TABLE `school_main_login`
  ADD CONSTRAINT `login links with school_role` FOREIGN KEY (`role_id_fk`) REFERENCES `school_role` (`id`),
  ADD CONSTRAINT `main login link with school_id` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_schedule_template`
--
ALTER TABLE `school_schedule_template`
  ADD CONSTRAINT `school id` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_staff`
--
ALTER TABLE `school_staff`
  ADD CONSTRAINT `staff link with role` FOREIGN KEY (`role_id`) REFERENCES `school_role` (`id`),
  ADD CONSTRAINT `staff links with schoolid` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`),
  ADD CONSTRAINT `staffid links with staff` FOREIGN KEY (`staff_id`) REFERENCES `school_main_login` (`id`);

--
-- Constraints for table `school_staff_attendance`
--
ALTER TABLE `school_staff_attendance`
  ADD CONSTRAINT `staff atten - staff` FOREIGN KEY (`staff_id`) REFERENCES `school_staff` (`id`),
  ADD CONSTRAINT `staff attendance with salary` FOREIGN KEY (`id`) REFERENCES `school_staff_salary` (`id`);

--
-- Constraints for table `school_staff_salary`
--
ALTER TABLE `school_staff_salary`
  ADD CONSTRAINT `staff ATTENDANCE -staff salary` FOREIGN KEY (`id`) REFERENCES `school_staff_attendance` (`id`),
  ADD CONSTRAINT `staff id - salary` FOREIGN KEY (`staff_id`) REFERENCES `school_staff` (`id`);

--
-- Constraints for table `school_student`
--
ALTER TABLE `school_student`
  ADD CONSTRAINT `school_id FK` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`),
  ADD CONSTRAINT `student_id links with main-login` FOREIGN KEY (`student_id`) REFERENCES `school_main_login` (`id`);

--
-- Constraints for table `school_student_admission`
--
ALTER TABLE `school_student_admission`
  ADD CONSTRAINT `batch_id linking with admission` FOREIGN KEY (`batch_id`) REFERENCES `school_batch_mgmt` (`id`),
  ADD CONSTRAINT `class-section link` FOREIGN KEY (`class_section`) REFERENCES `school_classroom` (`id`),
  ADD CONSTRAINT `class_medium link` FOREIGN KEY (`class_medium`) REFERENCES `school_feestructure` (`id`),
  ADD CONSTRAINT `link School_id` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`),
  ADD CONSTRAINT `link Student_id` FOREIGN KEY (`student_id`) REFERENCES `school_main_login` (`id`);

--
-- Constraints for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  ADD CONSTRAINT `class_sec to classroom` FOREIGN KEY (`class_sec`) REFERENCES `school_classroom` (`id`),
  ADD CONSTRAINT `entered_by staff` FOREIGN KEY (`entered_by`) REFERENCES `school_staff` (`staff_id`),
  ADD CONSTRAINT `school_id school` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_student_doubts`
--
ALTER TABLE `school_student_doubts`
  ADD CONSTRAINT `asked_by linking doubts students` FOREIGN KEY (`asked_by`) REFERENCES `school_student` (`student_id`),
  ADD CONSTRAINT `asked_to linking doubts Staff` FOREIGN KEY (`asked_to`) REFERENCES `school_staff` (`staff_id`),
  ADD CONSTRAINT `school_id linking doubts` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_student_feedue`
--
ALTER TABLE `school_student_feedue`
  ADD CONSTRAINT `admission_id` FOREIGN KEY (`admission_id`) REFERENCES `school_student_admission` (`id`),
  ADD CONSTRAINT `school_student_feedue_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`),
  ADD CONSTRAINT `student paid fee` FOREIGN KEY (`student_id`) REFERENCES `school_main_login` (`id`);

--
-- Constraints for table `school_subjects`
--
ALTER TABLE `school_subjects`
  ADD CONSTRAINT `subject links school` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

--
-- Constraints for table `school_week_schedule`
--
ALTER TABLE `school_week_schedule`
  ADD CONSTRAINT `class_sec_id linking` FOREIGN KEY (`class_sec_id`) REFERENCES `school_classroom` (`id`),
  ADD CONSTRAINT `schedule Temp id` FOREIGN KEY (`schedule_tempid`) REFERENCES `school_schedule_template` (`id`),
  ADD CONSTRAINT `school_id linking` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
