-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 24, 2021 at 02:57 PM
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
(41, 134, '', 'NLRqEhq1V1BgkBSmXEHV2md1CTa9yKvRQZ85U_izIMG6JI8Gwg');

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
  `school_name` varchar(255) NOT NULL,
  `board` enum('State Board','CBSE') NOT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `school_login` varchar(255) NOT NULL,
  `school_secrete` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_add_school`
--

INSERT INTO `school_add_school` (`id`, `school_name`, `board`, `email`, `city`, `school_login`, `school_secrete`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(8, 'ABC School', 'CBSE', '', '', 'abcschool', 'chennai123', 'Active', '2021-10-23 12:07:38', '2021-10-23 06:37:38', '2021-10-23 12:07:38'),
(32, 'Prem School', 'State Board', 'prem@gmail.com', 'Chennai', 'Premchool', 'premschool', 'Inactive', '2021-11-01 11:21:52', '2021-11-01 05:51:52', '2021-11-01 11:21:52'),
(33, 'Prem School', 'State Board', 'prem2@gmail.com', 'Chennai', 'Premschool', 'Premschool', 'Inactive', '2021-11-01 11:22:09', '2021-11-01 05:52:09', '2021-11-01 11:22:09'),
(35, 'Sanmuga School', 'State Board', 'snmuga@g.com', 'Chennai', 'sanmuga', 'sanmuga123@', 'Inactive', '2021-11-01 11:36:55', '2021-11-01 06:06:55', '0000-00-00 00:00:00'),
(36, 'XYZ School', 'State Board', 'xyz@g.com', 'Goa', 'xyzsch', 'cdaesdwqww', 'Inactive', '2021-11-01 11:38:51', '2021-11-01 06:08:51', '0000-00-00 00:00:00'),
(37, 'asz school', 'State Board', 'asz@gmail.com', 'Chennai', 'aszschool', 'aszscghool', 'Inactive', '2021-11-01 11:40:08', '2021-11-01 06:10:08', '0000-00-00 00:00:00'),
(38, 'test school2', 'State Board', 'test2@g.com', 'chennai', 'Test1232', 'Test1232Test1232', 'Inactive', '2021-11-01 11:49:10', '2021-11-03 10:26:09', '2021-11-03 15:56:09'),
(39, 'Amazon School', '', 'amazon@gmail.com', 'Chennai', 'amazon', 'amazon123', 'Inactive', '2021-11-01 11:50:53', '2021-11-01 06:20:53', '0000-00-00 00:00:00'),
(41, 'Your school2', 'CBSE', 'your2@gm.com', 'Chennai', 'urschool2', 'school123', 'Inactive', '2021-11-01 12:04:22', '2021-11-01 06:34:22', '0000-00-00 00:00:00'),
(42, 'Chellamal School', 'State Board', 'Chellamal@gm.com', 'Chennai', 'Chellamal', 'Chellamal#123', 'Inactive', '2021-11-01 12:41:21', '2021-11-08 12:08:15', '2021-11-08 17:38:15'),
(43, 'POP School', 'State Board', 'pop@gma.com', 'CHennai', 'pop123', 'pop1233', 'Inactive', '2021-11-01 12:43:19', '2021-11-01 07:13:19', '0000-00-00 00:00:00'),
(44, 'JJ School', 'CBSE', 'jj@g.com', 'Chennai', 'jjjj', 'yerat', 'Inactive', '2021-11-01 13:06:49', '2021-11-01 07:36:49', '0000-00-00 00:00:00'),
(45, 'll', '', 'll@g.com', 'Chennai', 'llrer', 'lletrrt', 'Inactive', '2021-11-01 13:09:18', '2021-11-01 07:39:18', '0000-00-00 00:00:00'),
(46, 'pp', '', 'pp@gm.com', 'c', 'pperta', 'ppertsaa', 'Inactive', '2021-11-01 13:10:05', '2021-11-01 07:40:05', '0000-00-00 00:00:00'),
(47, 'Test School55', 'State Board', 'testsch@g.com', 'Trichy', 'test55', 'Test13455R', 'Inactive', '2021-11-02 12:41:21', '2021-11-02 07:11:21', '0000-00-00 00:00:00'),
(48, 'test56 School', 'State Board', 'test556@g.com', 'Trichy', 'test55423', 'test42335qR', 'Inactive', '2021-11-02 12:43:08', '2021-11-02 07:13:08', '0000-00-00 00:00:00'),
(49, 'Yamaha School', 'CBSE', 'Yamaha@gmail.com', 'Salem', 'Yamaha', 'Yamaha 1233#', 'Inactive', '2021-11-02 12:45:32', '2021-11-02 07:15:32', '0000-00-00 00:00:00'),
(50, 'Amsa School', 'CBSE', 'amsa@g.com', 'Salem', 'amsa123', 'amsa123#123', 'Inactive', '2021-11-02 12:47:25', '2021-11-02 07:17:25', '0000-00-00 00:00:00'),
(51, 'Salem School', 'CBSE', 'salem@g.com', 'Salem', 'salem1223', 'salem12333#', 'Inactive', '2021-11-02 12:49:11', '2021-11-02 07:19:11', '0000-00-00 00:00:00'),
(53, 'Y', 'State Board', 'y@x.com', 'Goa', 'y&123$', 'Yiourschoool', 'Inactive', '2021-11-02 12:51:54', '2021-11-02 07:21:54', '0000-00-00 00:00:00'),
(54, 'Chennai School', 'CBSE', 'chennai@gmo.com', 'Chennai', 'chennaischool#12', 'chennai13qerR', 'Inactive', '2021-11-02 12:54:18', '2021-11-02 07:24:18', '0000-00-00 00:00:00'),
(55, 'Golden Globe School', 'State Board', 'GGS@gmail.com', 'Chennai', 'globalschool', 'global123#', 'Inactive', '2021-11-02 12:56:22', '2021-11-02 07:26:22', '0000-00-00 00:00:00'),
(56, 'Yamin School', 'CBSE', 'yam@gm.com', 'Chennai', 'yamin@123#', 'yamin123#', 'Inactive', '2021-11-02 12:58:03', '2021-11-02 07:28:03', '0000-00-00 00:00:00'),
(57, 'Tamil School', 'State Board', 'tamilnadu@g.com', 'Chennai', 'tamilnadu', 'tn123#13333', 'Inactive', '2021-11-02 13:01:25', '2021-11-02 07:31:25', '0000-00-00 00:00:00'),
(58, 'Ooty School', 'CBSE', 'ootyconvent@g.com', 'Ooty', 'ootyconv', 'ooty123#', 'Inactive', '2021-11-02 13:05:05', '2021-11-02 07:35:05', '0000-00-00 00:00:00'),
(59, 'Success School', 'State Board', 'succs@g.com', 'Chennai', 'success', 'success123#', 'Inactive', '2021-11-02 13:09:19', '2021-11-02 07:39:19', '0000-00-00 00:00:00'),
(60, 'Hero School', 'State Board', 'hero@g.com', 'Chennai', 'hero', 'hero123', 'Inactive', '2021-11-02 13:11:22', '2021-11-02 07:41:22', '0000-00-00 00:00:00'),
(61, 'Ayya School of IAS', 'State Board', 'ayya@gm.com', 'Chennai', 'ayya123', 'ayya123#1323', 'Inactive', '2021-11-02 13:13:28', '2021-11-02 07:43:28', '0000-00-00 00:00:00'),
(62, 'Final Try School', 'State Board', 'final@g.com', 'chennai', 'finaltry', 'final123#', 'Inactive', '2021-11-02 13:15:10', '2021-11-02 07:45:10', '0000-00-00 00:00:00'),
(63, 'Final 2', 'State Board', 'fina2@g.com', 'Chennai', 'fina2', 'fina2', 'Inactive', '2021-11-02 13:16:22', '2021-11-02 07:46:22', '0000-00-00 00:00:00'),
(64, 'Online School', 'State Board', 'online@g.com', 'Chennai', 'Online', 'online123#', 'Inactive', '2021-11-02 13:22:55', '2021-11-02 07:52:55', '0000-00-00 00:00:00'),
(65, 'SS ARJUNA APARTMENTS', '', 'muraliguru99@gmail.com', '', '', '', 'Inactive', '2021-11-02 13:23:55', '2021-11-02 07:53:55', '0000-00-00 00:00:00'),
(66, 'Check School', 'State Board', 'check@f.com', 'Chennai', 'checl', 'check123#', 'Inactive', '2021-11-02 13:40:56', '2021-11-02 08:10:56', '0000-00-00 00:00:00'),
(67, 'Testtttttttt', '', 'Test', '', 'u', 'u', 'Inactive', '2021-11-02 17:52:03', '2021-11-02 12:22:03', '0000-00-00 00:00:00'),
(68, 'y', '', 'y', 'y', 'y', 'y', 'Inactive', '2021-11-02 17:52:48', '2021-11-02 12:22:48', '0000-00-00 00:00:00'),
(69, 'u', '', 'u', 'u', 'u', 'u', 'Inactive', '2021-11-02 17:54:01', '2021-11-02 12:24:01', '0000-00-00 00:00:00'),
(70, 'Test School', 'State Board', 'testschol@gmail.com', 'Chennai', 'testschool1323', 'Testschool1323#', 'Inactive', '2021-11-10 11:27:08', '2021-11-10 05:57:08', '0000-00-00 00:00:00'),
(71, 'Nithilan School', 'CBSE', 'nithilan@gmail.com', 'Pallikaranai', 'nithilan', 'Nithi#123#', 'Active', '2021-11-10 11:29:34', '2021-11-11 10:59:27', '2021-11-11 16:29:27'),
(72, 'Abisheik School', 'CBSE', 'abi@test.com', 'Chennai', 'Abisheik#123', '$2b$10$iTLFbweMujKyBp2HLlKpjeMGr6cxudOoD1xy1Baj7VRBdeQkwsDMe', 'Inactive', '2021-11-12 14:00:08', '2021-11-12 08:30:08', NULL),
(73, 'Activation Check', 'State Board', 'activate@g.com', 'Chennai', 'Activate#123', '$2b$10$Pq7RAJz3PFNsaCUqOx/IuukgnAf32xS4dxouMJMJEHZfKA.mETQFa', 'Inactive', '2021-11-12 16:10:15', '2021-11-12 10:40:15', NULL),
(74, 'Activation Check2', 'State Board', 'activate2@g.com', 'Chennai', 'Activate#1232', '$2b$10$YZjN2ifiIcxZY6war8Hg/uCjqUllDaL5k7b7MqLekpvR3Cf5aUcKS', 'Inactive', '2021-11-12 16:11:35', '2021-11-12 10:41:35', NULL),
(75, 'SchoolName2021', 'State Board', 'school123@gmail.com', 'Chennai', 'School2021#123', '$2b$10$C0M2MwR5xnpNnc7VE1.CG.lurhemNjdH3W7lktcmGqb4Yp2k8.vBm', 'Inactive', '2021-11-12 16:15:29', '2021-11-12 10:45:29', NULL),
(76, 'Test2021 School', 'State Board', 'school20@g.com', 'Chennai', 'School21#123', '$2b$10$jzFP5mlUjNBaDeUfxVKm1.nej4JSsdstAQ6tKgVib6NwLRo1z5mse', 'Inactive', '2021-11-12 16:17:44', '2021-11-12 10:47:44', NULL),
(77, 'Test2021 School2', 'State Board', 'school220@g.com', 'Chennai', 'School21#1232', '$2b$10$S7/eq3Viw3EzASBQDp3PcOy7Ey7vyxel40DF52vd17YpFtxwXv1DG', 'Inactive', '2021-11-12 16:18:59', '2021-11-12 10:48:59', NULL),
(78, 'Govt School 23', 'State Board', 'state23@gmail.com', 'Chennai', 'GovtSchool#23', '$2b$10$KEMqPchrsSCTsEW.o8B9Kupx/6lC790.4z7qqA9rRls6euD93nWXC', 'Inactive', '2021-11-12 16:25:17', '2021-11-12 10:55:17', NULL),
(79, 'Govt School 24', 'State Board', 'state24@gmail.com', 'Chennai', 'GovtSchool#24', '$2b$10$yRkEMhuuO/qbmGeuD3BkTe8waSLcOPJX4TokNRXdVpRpw/vTfoPUy', 'Active', '2021-11-12 16:26:37', '2021-11-12 13:16:00', '2021-11-12 18:46:00'),
(80, 'Govt School 25', 'State Board', 'state25@gmail.com', 'Chennai', 'GovtSchool#25', '$2b$10$vjppTrdib8rDj5muEeJX..sdl9mN.26INbZgKzf9f0hLpu7T1VbQK', 'Inactive', '2021-11-12 16:28:31', '2021-11-12 10:58:31', NULL),
(81, 'Govt School 26', 'State Board', 'state26@gmail.com', 'Chennai', 'GovtSchool#26', '$2b$10$4VyJ9hkPY9YcNYEc5hyByOK70/77OBr6bjgMHmIdcTAQlHmhW8qZC', 'Inactive', '2021-11-12 16:37:28', '2021-11-12 11:07:28', NULL),
(82, 'Govt School 27', 'State Board', 'state27@gmail.com', 'Chennai', 'GovtSchool#27', '$2b$10$ukPD76y7eoOyf83xNZtvLOTJo4kND1i9HMEE7ZTcyNMBWH5eK759m', 'Inactive', '2021-11-12 16:42:08', '2021-11-12 11:12:08', NULL),
(83, 'Govt School 28', 'State Board', 'state28@g.com', 'Chennai', 'GovtSchool#28', '$2b$10$paVSgT2DXYhhH7Dw/gu.UuMh8zlUsHXPfeqNyz6ybw.PO9ieHQkQi', 'Inactive', '2021-11-12 16:48:50', '2021-11-12 11:18:50', NULL),
(84, 'Govt School 29', 'State Board', 'state29@g.c', 'Chennai', 'GovtSchool#29', '$2b$10$xFiHwB1l.mtOL6x5olCEEeAhCurG41LMzx4eheMUHoXDtXR9GKv4y', 'Inactive', '2021-11-12 16:50:35', '2021-11-12 11:20:35', NULL),
(85, 'Govt School 30', 'State Board', 'state30@g.c', 'Chennai', 'GovtSchool#30', '$2b$10$U4PUub8k9LyT.oDxW83pSuOWtzqhpcVC5dOIaIHjoOWfLw2W3lUIW', 'Inactive', '2021-11-12 16:52:25', '2021-11-12 11:22:25', NULL),
(86, 'Govt School 31', 'State Board', 'state31@g.c', 'Chennai', 'GovtSchool#31', '$2b$10$mSY/Zp3.SrtBN07RWWqw/eLYnM.bdcmjSs7uJGIHkb7nZ8Y76dXxa', 'Inactive', '2021-11-12 16:56:38', '2021-11-12 11:26:38', NULL),
(87, 'Govt School 32', 'State Board', 'state32@g.c', 'Chennai', 'GovtSchool#32', '$2b$10$52go2YKhImzgQhGVnXnkHuue2u6idx7q6G2y/8iXK054M2ytYhQaa', 'Inactive', '2021-11-12 17:00:33', '2021-11-12 11:30:33', NULL),
(88, 'Govt School 33', 'State Board', 'state33@g.c', 'Chennai', 'GovtSchool#33', '$2b$10$a2/oHMcLOuYh.rvIGRh1iONMSln.W803cHYdVBEZPZQ5XzskibrjS', 'Inactive', '2021-11-12 17:24:56', '2021-11-12 11:54:56', NULL),
(89, 'Govt School 34', 'State Board', 'state34@g.c', 'Chennai', 'GovtSchool#34', '$2b$10$39yhPl2uNVyyO81rG81lk.MBTxeS5EgBRsn1aqH/qYhPR8WHfaAqS', 'Inactive', '2021-11-12 17:31:25', '2021-11-12 12:01:25', NULL),
(90, 'Govt School 35', 'State Board', 'state35@g.c', 'Chennai', 'GovtSchool#35', '$2b$10$B7bL4s3Xuscd2vDLc8iVu.N9f7YR2.IUqxCdXifoOTk8LprHheHsO', 'Inactive', '2021-11-12 17:32:54', '2021-11-12 12:02:54', NULL),
(91, 'Govt School 36', 'State Board', 'state36@g.c', 'Chennai', 'GovtSchool#36', '$2b$10$Kwj0DDhLX4KzwpGLo8/md.fobZi4umLr7dN7OjBoXO/bPXFd0dgz6', 'Inactive', '2021-11-12 17:33:53', '2021-11-12 12:03:53', NULL),
(92, 'Govt School 37', 'State Board', 'state37@g.c', 'Chennai', 'GovtSchool#37', '$2b$10$j3yGoXkPS.BP3b/b1YmMFuoJhAkV1zFQOmlIMDMdfrxKcliod.5xm', 'Active', '2021-11-12 17:35:30', '2021-11-12 13:47:05', '2021-11-12 19:17:05'),
(93, 'Govt School 38', 'State Board', 'state38@g.c', 'Chennai', 'GovtSchool#38', '$2b$10$PQ4EoevQ5Bflnyp7Z0HTSeaZqmGMWjzlSwS.M1e5rrPCGy7nRGXB2', 'Active', '2021-11-12 17:37:27', '2021-11-12 13:41:18', '2021-11-12 19:11:18'),
(94, 'Govt School 40', 'State Board', 'state40@g.c', 'Chennai', 'GovtSchool#40', '$2b$10$wbL4iJE4Sn.ymN3w2oSi8eO9BlyHniL7nwnCYcjGkMmlW3xxERddC', 'Active', '2021-11-12 17:41:16', '2021-11-12 13:43:34', '2021-11-12 19:13:34'),
(95, 'Govt School 41', 'State Board', 'state41@g.c', 'Chennai', 'GovtSchool#41', '$2b$10$FAEl09DR7VgpUFQ6pQi9IuBGwiFSjP6pncNlgl2b4US/bolenP3l2', 'Active', '2021-11-12 17:43:29', '2021-11-12 13:34:11', '2021-11-12 19:04:11'),
(96, 'Govt School 42', 'State Board', 'state42@g.c', 'Chennai', 'GovtSchool#42', '$2b$10$yU0BBZx8llkcBRj8SiNe9unZ1ocQc10qoatUla.ThPumCeljyWkQe', 'Active', '2021-11-12 17:44:11', '2021-11-12 13:33:17', '2021-11-12 19:03:17'),
(97, 'Govt School 44', 'State Board', 'state44@g.c', 'Chennai', 'GovtSchool#44', '$2b$10$vimdrkamgmWjD/UQN0PxduEtBW2UfdhdNtJ1p5pwOsDZutzKkCeAy', 'Active', '2021-11-12 17:47:40', '2021-11-18 07:24:13', '2021-11-18 12:54:13'),
(98, 'Govt School 45', 'State Board', 'state45@g.c', 'Chennai', 'GovtSchool#45', '$2b$10$Nzfy1rIX5tOBc58eJqHNxO6UC8NdIvyoAWRyRI5PV9a0e2iqXpzz.', 'Inactive', '2021-11-12 17:49:26', '2021-11-12 12:19:26', NULL),
(99, 'Govt School 50', 'State Board', 'state50@g.c', 'Chennai', 'GovtSchool#50', '$2b$10$ogrdZ62VOTuyEac7ERufy.xC4QwLd0I0ZcT1N55N.7uBYBjDqw4nS', 'Active', '2021-11-16 13:12:16', '2021-12-15 00:54:51', '2021-12-15 06:24:51'),
(100, 'Govt School 51', 'State Board', 'state51@g.c', 'Chennai', 'GovtSchool#51', '$2b$10$S3SfRntRCtPfcgHNWrGR3.i8AuZGR4qx4PmChVigsAvvmOD1pjVhW', 'Inactive', '2021-11-16 13:17:00', '2021-11-16 07:47:00', NULL),
(101, 'Govt School 55', 'State Board', 'state55@g.c', 'che', 'GovtSchool#55', '$2b$10$r7GnDJUGSYjRWwMMNozTSeCp.I0cfnZCfP3AGyVscog/EKI1R8KY.', 'Active', '2021-11-16 16:34:13', '2021-11-16 11:07:28', '2021-11-16 16:37:28'),
(102, 'Govt School 52', 'State Board', 'state52@g.c', 'Chennai', 'GovtSchool#52', '$2b$10$4mHU5OWbC6kSDRBjxdlJNOtHrPn3.TL3cmbTwW8gkWThmnxtW3JJO', 'Inactive', '2021-11-17 08:34:40', '2021-11-17 03:04:40', NULL),
(103, 'Govt School 53', 'State Board', 'state53@g.c', 'Chennai', 'GovtSchool#53', '$2b$10$2.XvZ2SS.JFOSZFVKe8t6O5dedNaj3WZUc3B/sUB.9nv9D.iZ7iUW', 'Inactive', '2021-11-17 08:38:59', '2021-11-17 03:08:59', NULL),
(104, 'Govt School 56', 'State Board', 'state56@g.c', 'Chennai', 'GovtSchool#56', '$2b$10$qXtXSDh1JYWR3VYvRaljXe4/sdeVrOdMz0372m43HmA174uAccqvW', 'Inactive', '2021-11-17 11:41:44', '2021-11-17 06:11:44', NULL),
(105, 'Govt School 57', 'State Board', 'state57@g.c', 'Chennai', 'GovtSchool#57', '$2b$10$C4VwbADnSpGGw1Pee6tBWO/2h7gVG3BKceHXsFInORqmSZoSLnbbO', 'Inactive', '2021-11-17 11:56:07', '2021-11-17 06:26:07', NULL),
(106, 'Govt School 58', 'State Board', 'state58@g.c', 'Chennai', 'GovtSchool#58', '$2b$10$529ftsLDguIobpxa4hcLTeDwOzc8Qd/A7yNVk2qZsTUq7m8RTleQy', 'Inactive', '2021-11-17 11:59:37', '2021-11-17 06:29:37', NULL),
(107, 'Govt School 59', 'State Board', 'state59@g.c', 'Chwennai', 'GovtSchool#59', '$2b$10$c6tHiwmNMrIsMxaXw7nKXeZDiHRYxSB3bGUrBoGGBt.9dxDjq8YAW', 'Inactive', '2021-11-17 12:28:03', '2021-11-17 06:58:03', NULL),
(108, 'Govt School 60', 'State Board', 'state60@g.c', 'Chwennai', 'GovtSchool#60', '$2b$10$k7PvLVHSqd3giOPJbut1M.j/JE6DtpZqVddrH1qbPDBurY38IYedS', 'Inactive', '2021-11-17 12:32:45', '2021-11-17 07:02:45', NULL),
(109, 'Govt School 61', 'State Board', 'state61@g.c', 'Chennai', 'GovtSchool#61', '$2b$10$Wa6AYb8FaGmPemn7hcHZJusYOtsSCsfKQjO4ZH4PnAKdfw7qlaLJi', 'Inactive', '2021-11-17 12:45:41', '2021-11-17 07:15:41', NULL),
(110, 'Govt School 62', 'State Board', 'state62@g.c', 'Chennai', 'GovtSchool#62', '$2b$10$5V4Ay6mvgGaOKnrt6g/5FuEI9RVYIq4bu7.5oe.mU75N8jBFehNA.', 'Inactive', '2021-11-17 12:48:23', '2021-11-17 07:18:23', NULL),
(111, 'Govt School 63', 'State Board', 'state63@g.c', 'Chennai', 'GovtSchool#63', '$2b$10$0KqajGnU1n3EBiEUYgYGCOo2CR.9usnv0OpFJSUaIZqXHYOlO0ihO', 'Inactive', '2021-11-17 12:55:32', '2021-11-17 07:25:32', NULL),
(112, 'Govt School 64', 'State Board', 'state64@g.c', 'Chennai', 'GovtSchool#64', '$2b$10$6xGxqXLQgVBECbVVuID3Ku.39Ivsc.5kuFLbQN.chfx7hs3FSk7xy', 'Inactive', '2021-11-17 12:58:03', '2021-11-17 07:28:03', NULL),
(113, 'Govt School 65', 'State Board', 'state65@gc', 'Chennai', 'GovtSchool#65', '$2b$10$JzZatOAYLE8L2xq9SAm0N.KgK7YSQhl/FdmYcPtTSze/qyUPy7K9q', 'Inactive', '2021-11-17 12:59:07', '2021-11-17 07:29:07', NULL),
(114, 'Govt School 66', 'State Board', 'state66@gc', 'Chennai', 'GovtSchool#66', '$2b$10$oj0fHRY.pPBYvUXL4j8JruDqSObPlcEIMOhULxeSZQY5dsYTHWL4K', 'Inactive', '2021-11-17 13:00:17', '2021-11-17 07:30:17', NULL),
(116, 'Govt School 67', 'State Board', 'state67@g.c', 'Chennai', 'GovtSchool#67', '$2b$10$ysa7XoFxXPd0i72Tcs90P.cxdUOelSWGDoidpMqUGXAEGFMdLsjne', 'Inactive', '2021-11-17 13:27:30', '2021-11-17 07:57:30', NULL),
(117, 'Govt School 68', 'State Board', 'state68@g.c', 'Chennai', 'GovtSchool#68', '$2b$10$kbVcaEe4j7h7MJ4VtFk7mOuGyTitoC1KJAoMpI//jTw/Aa1ODoZhW', 'Inactive', '2021-11-17 13:29:17', '2021-11-17 07:59:17', NULL),
(118, 'Govt School 70', 'State Board', 'state70@g.c', 'Chennai', 'GovtSchool#70', '$2b$10$EHdfse9yrWWGLNlh05VcwumuZdOcm2HLcu2R7Lb7mGoxfT.2NoHZG', 'Active', '2021-11-17 14:04:54', '2021-11-21 13:12:19', '2021-11-21 18:42:19'),
(132, 'Test School 34', 'State Board', 'balaguru.m@koinnovation.com', 'Chennai', 'TestSchool@34', '$2b$10$rDXJEP.mvI/fEHaLQW3CyubRSFMrMNOI3.ZexbMddIWLdF2UGLpOa', 'Inactive', '2021-12-16 16:51:15', '2021-12-16 11:21:15', NULL),
(133, 'Mohan School 01', 'State Board', 'mohannraj.s@koinnovation.com', 'Coimbatore', 'MohanSchool@01', '$2b$10$p5A7ogqceYTEI8N.eamZK.U0Dbv5Vm2.ywkhCX6/6MpTZs2prXLJC', 'Inactive', '2021-12-17 16:46:05', '2021-12-17 11:16:05', NULL),
(134, 'Mohan School 02', 'CBSE', 'mohanofficials18@gmail.com', 'Chennai', 'MohanSchool@02', '$2b$10$JM7cHOL6.faqbaZXsEwOBezUA8Z/DoM1VegUpNzaTxIAqRfEEiYBC', 'Inactive', '2021-12-17 16:48:15', '2021-12-17 11:18:15', NULL);

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
  `deleted_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_classroom`
--

INSERT INTO `school_classroom` (`id`, `school_id`, `class_id`, `class_section`, `students_strength`, `students_filled`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 96, 30, 'A', 121, 2, '2021-11-27 18:42:34', '2021-12-15 11:35:37', '2021-12-15 17:05:37'),
(27, 96, 19, 'A', 150, 1, '2021-11-29 18:59:55', '2021-12-20 11:34:45', '2021-12-20 17:04:45'),
(28, 96, 37, 'A', 30, 0, '2021-11-29 19:01:32', '2021-12-02 02:45:28', '2021-12-02 08:15:28'),
(29, 96, 19, 'B', 100, 1, '2021-11-29 19:16:59', '2021-12-13 05:55:24', '2021-12-13 11:25:24'),
(30, 96, 19, 'C', 90, 3, '2021-11-30 12:07:30', '2021-12-20 11:36:17', '2021-12-20 17:06:17'),
(31, 96, 34, 'C', 95, 26, '2021-11-30 12:20:33', '2021-12-15 11:02:35', '2021-12-15 16:32:35'),
(32, 96, 34, 'E', 100, 0, '2021-11-30 12:20:41', '2021-11-30 06:56:32', '2021-11-30 12:26:32'),
(34, 96, 30, 'B', 80, 0, '2021-11-30 12:27:56', '2021-12-01 11:18:12', '2021-12-01 16:48:12'),
(35, 96, 37, 'E', 100, 0, '2021-11-30 14:25:07', '2021-11-30 08:55:07', NULL),
(36, 96, 25, 'E', 20, 4, '2021-12-01 09:12:06', '2021-12-14 10:56:31', '2021-12-14 16:26:31'),
(37, 97, 41, 'A', 50, 0, '2021-12-01 17:14:24', '2021-12-01 11:44:24', NULL),
(38, 97, 41, 'B', 60, 0, '2021-12-01 17:14:29', '2021-12-01 11:44:29', NULL),
(39, 99, 44, 'A', 50, 0, '2021-12-06 15:47:00', '2021-12-06 10:17:00', NULL),
(41, 96, 19, 'D', 0, 0, '2021-12-07 12:26:54', '2021-12-07 06:56:54', NULL),
(42, 96, 37, 'B', 55, 0, '2021-12-14 11:35:15', '2021-12-14 06:05:15', NULL),
(43, 96, 29, 'A', 120, 1, '2021-12-21 19:36:07', '2021-12-22 02:36:36', '2021-12-22 08:06:36');

-- --------------------------------------------------------

--
-- Table structure for table `school_class_subjects`
--

CREATE TABLE `school_class_subjects` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `classroom_id` int(10) NOT NULL,
  `staff_id_assigned` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_class_subjects`
--

INSERT INTO `school_class_subjects` (`id`, `school_id`, `subject_id`, `classroom_id`, `staff_id_assigned`) VALUES
(11, 96, 1, 30, 10024),
(10, 96, 3, 30, 10024),
(28, 96, 3, 43, 10027),
(24, 96, 4, 30, 10024),
(13, 96, 5, 30, 10024),
(25, 96, 6, 30, 10024),
(14, 96, 7, 36, 10024),
(26, 96, 8, 30, 10024),
(27, 96, 19, 27, 10024),
(15, 97, 9, 37, 10028),
(17, 99, 11, 39, 10034);

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
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_feestructure`
--

INSERT INTO `school_feestructure` (`id`, `school_id`, `class_std`, `medium`, `actual_fee`, `created_at`, `updated_at`, `deleted_at`) VALUES
(19, 96, '1', 'English', 100, '2021-12-23 17:28:04', '2021-12-23 11:58:04', NULL),
(21, 96, '7', 'Hindi', 10000, '2021-12-23 12:54:02', '2021-12-23 07:24:02', NULL),
(25, 96, '10', 'English', 1000, '2021-11-27 13:10:35', '2021-11-27 07:40:35', NULL),
(29, 96, '7', 'English', 2000, '2021-11-27 13:36:40', '2021-11-27 08:06:40', NULL),
(30, 96, '12', 'Tamil', 25000, '2021-11-27 13:44:34', '2021-11-27 08:14:34', NULL),
(31, 96, '12', 'English', 25000, '2021-11-27 13:45:22', '2021-11-27 08:15:22', NULL),
(32, 96, '12', 'Hindi', 25000, '2021-11-27 13:45:31', '2021-11-27 08:15:31', NULL),
(33, 96, '11', 'Tamil', 22000, '2021-12-23 18:18:14', '2021-12-23 12:48:14', '2021-12-23 18:18:14'),
(34, 96, '11', 'English', 22000, '2021-11-27 13:46:06', '2021-11-27 08:16:06', NULL),
(35, 96, '11', 'Hindi', 22000, '2021-12-23 18:00:22', '2021-12-23 12:30:22', '2021-12-23 18:00:22'),
(37, 96, '6', 'Tamil', 10555, '2021-11-29 18:07:15', '2021-11-29 12:37:15', NULL),
(39, 96, '3', 'Tamil', 15000, '2021-11-29 19:16:10', '2021-11-29 13:46:10', NULL),
(41, 97, '9', 'Hindi', 99000, '2021-12-01 17:14:00', '2021-12-01 11:44:00', NULL),
(42, 99, '1', 'Tamil', 2000, '2021-12-06 15:46:17', '2021-12-06 10:16:17', NULL),
(43, 99, '1', 'Hindi', 5000, '2021-12-06 15:46:27', '2021-12-06 10:16:27', NULL),
(44, 99, '1', 'English', 3000, '2021-12-06 15:46:33', '2021-12-06 10:16:33', NULL),
(45, 96, '3', 'English', 500, '2021-12-23 17:58:11', '2021-12-23 12:28:11', '2021-12-23 17:58:11'),
(50, 96, '3', 'Hindi', 2500, '2021-12-21 12:32:34', '2021-12-21 07:02:34', NULL);

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
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
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
(10022, 96, 9, 'Admin#42', '$2b$10$8T3BJP9DQ6vdy2xGRxwE9uyaX2z7/I7S1TNKHY5L4wP96LTTcmOFO', 'admin42@g.c', 'Active', '2021-11-22 17:03:24', '2021-12-24 00:53:01', NULL),
(10023, 96, 4, 'Headmaster#42', '$2b$10$ik9wEfPee5sS.W2W16t3c.gM73n7PcP2iN0dGpxNws/9cgfHIOXIu', 'hm42@g.c', 'Active', '2021-11-22 17:03:38', '2021-12-24 00:53:39', NULL),
(10024, 96, 8, 'Teacher#42', '$2b$10$6WoaS4bN2BE3x4aGnw5j.umldLhDR.hnyAPxBSHy98EJBW15si9Lm', 'teacher42@g.c', 'Active', '2021-11-22 17:03:50', '2021-12-15 01:10:28', NULL),
(10025, 96, 2, 'Employee#42', '$2b$10$swFuYvSdN7tivyOrLr3GquyftLUaIJopVrwsyTJDm.ciC/5kuc4IC', 'emp42@g.c', 'Active', '2021-11-22 17:04:04', '2021-12-20 08:00:05', NULL),
(10026, 96, 8, 'Teacher#42-2', '$2b$10$tWJUFqE9EfqL6ZFdeqaeUON5xaNteeSj2wfw8VKWTqa2mTKQXuPBi', 'teacher42-2@gmail.com', 'Inactive', '2021-11-27 17:08:53', '2021-12-10 13:18:32', NULL),
(10027, 96, 8, 'Amudhan#123', '$2b$10$SzimjjD6xPA72CVgJ6lbauHPr503mJwfutoruWj2CY9f8NghlELFy', 'amudhan@gmail.com', 'Active', '2021-12-01 09:06:34', '2021-12-22 02:38:14', NULL),
(10028, 97, 8, 'Rohit Sharma', '$2b$10$Mfh7HDhrWwg9IQRA1hg9D.9PYsRt3WRBQD/Jlg.lTXAq9cB/DCsyy', 'rohit@gmail.com', 'Active', '2021-12-01 17:16:01', '2021-12-01 11:46:14', NULL),
(10029, 96, 1, 'Student_1_42', '$2b$10$QtDFKaUFLnYjq6TYRBUpq.LB/LrOfRcqOv2ul8L4cHafiyHw9dHG2', 'student142@g.c', 'Active', '2021-12-02 15:06:38', '2021-12-10 08:30:21', NULL),
(10030, 96, 1, 'Rakesh', '$2b$10$Chxg7.lkiz9FwD5aZhReL.sMkeRP/QNDw9T.Ef5UcUGQLIGCZwqje', 'rakesh@123.com', 'Active', '2021-12-02 16:18:06', '2021-12-13 06:45:19', NULL),
(10031, 96, 1, 'Amala', '$2b$10$8T3BJP9DQ6vdy2xGRxwE9uyaX2z7/I7S1TNKHY5L4wP96LTTcmOFO', 'amala@gmail.com', 'Active', '2021-12-02 16:37:56', '2021-12-13 12:25:54', NULL),
(10032, 96, 1, 'Vijay', '$2b$10$nVKpCQGwZVPtlihEY44fmOpelIsFCm0nhnTvZW3VkOSSiw52Sf.0W', 'vijay@facebook.com', 'Active', '2021-12-02 18:23:57', '2021-12-10 11:20:30', NULL),
(10034, 99, 8, 'Prem', '$2b$10$Ssc9cLv1b4EUNBTdkrIupeYx8VIMQdEX4fm2/LYmaS/NNGJbSQsIi', 'prem@g.c', 'Active', '2021-12-06 15:48:13', '2021-12-06 10:18:52', NULL),
(10035, 96, 1, 'Udhay', '$2b$10$q6if10sgdQpO15qbuJ2uKe9CuwAlVcYxNl597irrLU4VxUgxbP9mi', 'udhay@g.c', 'Active', '2021-12-06 15:50:28', '2021-12-22 02:26:40', NULL),
(10037, 96, 1, 'Mohan', '$2b$10$LKc8zu8gKHtwud.9OviRzO9T5qJPdIAPZKKM71w.3FFcojrsQlEF6', 'mohan@gmail.com', 'Active', '2021-12-07 12:21:08', '2021-12-13 06:08:28', NULL),
(10038, 96, 1, 'Rajesh', '$2b$10$Ulmz0j8ZthGtw/.ugt/pX.MoL1k8FjNEhy2p2F9Bihoo9ToNA8Vqm', 'rajesh@gma.c', 'Active', '2021-12-14 16:23:48', '2021-12-14 10:53:48', NULL),
(10040, 96, 5, 'RaviKumar', '$2b$10$3DI./lqPoby6bOeq4kX1uuO3bd3RboiDl8F.9sv5mgwn9qKXgc4WW', 'balaguru.m@koinnovation.com', 'Active', '2021-12-18 13:54:04', '2021-12-18 08:24:04', NULL),
(10042, 96, 8, 'Ramaraj', '$2b$10$366nhK1TY/21u4Jv5rR8GexiPL/o6qJil5dUSUJ5i6flnOWj6LrSS', 'ramraj@gmail.com', 'Inactive', '2021-12-23 06:27:12', '2021-12-23 00:57:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_messages`
--

CREATE TABLE `school_messages` (
  `id` int(10) NOT NULL,
  `school_id` int(10) NOT NULL,
  `msg_title` varchar(255) NOT NULL,
  `msg_body` varchar(255) NOT NULL,
  `msg_to` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`msg_to`)),
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
  `ml_student_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_parent_student_map`
--

INSERT INTO `school_parent_student_map` (`id`, `stu_school_id`, `parent_id`, `ml_student_id`) VALUES
(4, 96, 10040, 10032),
(5, 96, 10040, 10035);

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
  `school_timing_from` time NOT NULL,
  `school_timing_to` time NOT NULL,
  `period_time` int(10) NOT NULL,
  `lunch_time` int(10) NOT NULL,
  `no_of_intervals` int(10) NOT NULL,
  `interval_time` int(10) NOT NULL,
  `no_of_periods` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_schedule_template`
--

INSERT INTO `school_schedule_template` (`id`, `school_id`, `schedule_name`, `school_timing_from`, `school_timing_to`, `period_time`, `lunch_time`, `no_of_intervals`, `interval_time`, `no_of_periods`) VALUES
(2, 96, 'Try 1', '09:00:00', '17:00:00', 45, 60, 2, 10, 8),
(5, 96, 'Try 5', '09:00:00', '17:00:00', 60, 60, 2, 10, 7),
(6, 92, 'Check', '09:00:00', '17:00:00', 50, 60, 2, 10, 8);

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
  `date_of_birth` date NOT NULL,
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
(21, 10023, 4, 96, 'Sankar', '1989-02-12', 9966558844, 'hm42@g.c', 'PHD', 'Chennai', 'TN', '2021-12-22 16:13:24', '2021-12-22 10:43:24', '0000-00-00 00:00:00');

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
(41, 96, 10032, 'Vijay Kumar', 9988556677, 'vijay@facebook.com', 'R a v i Kumar', 'balaguru.m@koinnovation.com', 9988558877, '2006-05-21', 'Chennai', 'TN', '2021-12-22 16:21:29', '2021-12-22 10:51:29', NULL);

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
  `academic_year` year(4) NOT NULL,
  `class_medium` int(10) NOT NULL,
  `class_section` int(10) NOT NULL,
  `actual_fee` int(10) NOT NULL,
  `paying_amount` int(10) NOT NULL,
  `payment_mode` enum('Cash','Credit / Debit Card','Cheque','Netbanking') NOT NULL,
  `payment_status` enum('No Due','Due','Not Paid') NOT NULL,
  `entry_by` int(10) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `deleted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_student_admission`
--

INSERT INTO `school_student_admission` (`id`, `school_id`, `student_id`, `mobile_number`, `email`, `academic_year`, `class_medium`, `class_section`, `actual_fee`, `paying_amount`, `payment_mode`, `payment_status`, `entry_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(39, 96, 10031, 9988779988, 'amala@gmail.com', 2021, 34, 31, 22000, 2000, 'Cash', 'No Due', 96, 0, 0, '0000-00-00 00:00:00'),
(41, 96, 10030, 9988776655, 'rakesh@123.com', 2021, 30, 1, 25000, 25000, 'Cash', 'No Due', 96, 0, 0, '0000-00-00 00:00:00'),
(43, 96, 10038, 9988776655, 'rajesh@gma.c', 2021, 19, 30, 100, 100, 'Cash', 'No Due', 96, 0, 0, '0000-00-00 00:00:00'),
(44, 96, 10035, 8855221144, 'udhay@g.c', 2021, 29, 43, 2000, 2000, 'Cash', 'No Due', 96, 0, 0, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `school_student_attendance`
--

CREATE TABLE `school_student_attendance` (
  `id` int(10) NOT NULL,
  `date` date NOT NULL,
  `student_id` int(10) NOT NULL,
  `leave_status` enum('Present','Absent','Half day','On duty') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(51, 96, 10031, 39, 22000, 1000, 'Cash', 'Due', '2021-12-17 18:40:32', '2021-12-17 13:10:32', NULL),
(52, 96, 10031, 39, 22000, 3000, 'Cash', 'Due', '2021-12-17 18:42:29', '2021-12-17 13:12:29', NULL),
(53, 96, 10031, 39, 22000, 3000, 'Cash', 'Due', '2021-12-17 18:46:58', '2021-12-17 13:16:58', NULL),
(54, 96, 10031, 39, 22000, 5000, '', 'Due', '2021-12-17 18:49:55', '2021-12-17 13:19:55', NULL),
(55, 96, 10031, 39, 22000, 12000, 'Cash', 'No Due', '2021-12-17 18:51:15', '2021-12-17 13:21:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `school_subjects`
--

CREATE TABLE `school_subjects` (
  `id` int(10) NOT NULL,
  `subject_name` varchar(30) NOT NULL,
  `school_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `school_subjects`
--

INSERT INTO `school_subjects` (`id`, `subject_name`, `school_id`) VALUES
(1, 'Tamil', 96),
(3, 'Maths', 96),
(4, 'Science', 96),
(5, 'Social', 96),
(6, 'Geography', 96),
(7, 'English', 96),
(8, 'Programming', 96),
(9, 'Hindi Language', 97),
(10, 'French Language', 97),
(11, 'English', 99),
(12, 'maths', 99),
(19, 'C++', 96),
(21, 'Hindi', 96);

-- --------------------------------------------------------

--
-- Table structure for table `school_week_schedule`
--

CREATE TABLE `school_week_schedule` (
  `id` int(10) NOT NULL,
  `day` enum('Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday') NOT NULL,
  `school_id` int(10) NOT NULL,
  `class_sec_id` int(10) NOT NULL,
  `schedule_id` int(10) NOT NULL,
  `p1_subject` varchar(255) DEFAULT NULL,
  `p1_staff` varchar(255) DEFAULT NULL,
  `p2_subject` varchar(255) DEFAULT NULL,
  `p2_staff` varchar(255) DEFAULT NULL,
  `p3_subject` varchar(255) DEFAULT NULL,
  `p3_staff` varchar(255) DEFAULT NULL,
  `p4_subject` varchar(255) DEFAULT NULL,
  `p4_staff` varchar(255) DEFAULT NULL,
  `p5_subject` varchar(255) DEFAULT NULL,
  `p5_staff` varchar(255) DEFAULT NULL,
  `p6_subject` varchar(255) DEFAULT NULL,
  `p6_staff` varchar(255) DEFAULT NULL,
  `p7_subject` varchar(255) DEFAULT NULL,
  `p7_staff` varchar(255) DEFAULT NULL,
  `p8_subject` varchar(255) DEFAULT NULL,
  `p8_staff` varchar(255) DEFAULT NULL,
  `p9_subject` varchar(255) DEFAULT NULL,
  `p9_staff` varchar(255) DEFAULT NULL,
  `p10_subject` varchar(255) DEFAULT NULL,
  `p10_staff` varchar(255) DEFAULT NULL,
  `day_leave_status` enum('full_day','half_day','leave') NOT NULL,
  `created_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `school_feestructure`
--
ALTER TABLE `school_feestructure`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_id` (`school_id`,`class_std`,`medium`);

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
  ADD KEY `school_id` (`school_id`),
  ADD KEY `class_medium` (`class_medium`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `entry_by` (`entry_by`),
  ADD KEY `class_section` (`class_section`);

--
-- Indexes for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student attendance - student` (`student_id`);

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
  ADD KEY `schedule_id linking` (`schedule_id`),
  ADD KEY `class_sec_id linking` (`class_sec_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `school_activate`
--
ALTER TABLE `school_activate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `school_activate_payment`
--
ALTER TABLE `school_activate_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `school_add_school`
--
ALTER TABLE `school_add_school`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `school_classroom`
--
ALTER TABLE `school_classroom`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `school_class_subjects`
--
ALTER TABLE `school_class_subjects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `school_feestructure`
--
ALTER TABLE `school_feestructure`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `school_main_login`
--
ALTER TABLE `school_main_login`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10043;

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `school_role`
--
ALTER TABLE `school_role`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `school_schedule_template`
--
ALTER TABLE `school_schedule_template`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `school_staff`
--
ALTER TABLE `school_staff`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `school_student_admission`
--
ALTER TABLE `school_student_admission`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school_student_feedue`
--
ALTER TABLE `school_student_feedue`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `school_subjects`
--
ALTER TABLE `school_subjects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `school_week_schedule`
--
ALTER TABLE `school_week_schedule`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `school_activate`
--
ALTER TABLE `school_activate`
  ADD CONSTRAINT `links with add school` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);

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
-- Constraints for table `school_feestructure`
--
ALTER TABLE `school_feestructure`
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
  ADD CONSTRAINT `class-section link` FOREIGN KEY (`class_section`) REFERENCES `school_classroom` (`id`),
  ADD CONSTRAINT `class_medium link` FOREIGN KEY (`class_medium`) REFERENCES `school_feestructure` (`id`),
  ADD CONSTRAINT `link School_id` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`),
  ADD CONSTRAINT `link Student_id` FOREIGN KEY (`student_id`) REFERENCES `school_main_login` (`id`);

--
-- Constraints for table `school_student_attendance`
--
ALTER TABLE `school_student_attendance`
  ADD CONSTRAINT `student attendance - student` FOREIGN KEY (`student_id`) REFERENCES `school_student` (`id`);

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
  ADD CONSTRAINT `schedule_id linking` FOREIGN KEY (`schedule_id`) REFERENCES `school_schedule_template` (`id`),
  ADD CONSTRAINT `school_id linking` FOREIGN KEY (`school_id`) REFERENCES `school_add_school` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
