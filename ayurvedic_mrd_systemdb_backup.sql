-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 23, 2024 at 04:35 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ayurvedic_mrd_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `discharge_summary`
--

CREATE TABLE `discharge_summary` (
  `discharge_id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `ailments` varchar(350) NOT NULL,
  `diagnosis` varchar(350) NOT NULL,
  `discharge_condition` varchar(350) NOT NULL,
  `restricted_activities` varchar(350) NOT NULL,
  `advices` varchar(350) NOT NULL,
  `discharge_meds` varchar(1000) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `discharge_summary`
--

INSERT INTO `discharge_summary` (`discharge_id`, `user_id`, `visit_id`, `ailments`, `diagnosis`, `discharge_condition`, `restricted_activities`, `advices`, `discharge_meds`, `doctor_id`, `doctor_name`, `doctors_sign`) VALUES
(1, 3, 1, 'test ailments', 'test diagnosis', 'test discharge', 'test restricted activities', 'test advices', 'test discharge', 1, 'Super Admin', 'assets/users/patient/anotherguy/anotherguy_signature.png');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_initial_assessment_form`
--

CREATE TABLE `doctor_initial_assessment_form` (
  `record_id` bigint(20) UNSIGNED NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `temperature` varchar(10) NOT NULL DEFAULT 'N.A',
  `pulse` varchar(10) NOT NULL DEFAULT 'N.A',
  `blood_pressure` varchar(10) NOT NULL DEFAULT 'N.A',
  `height` varchar(10) NOT NULL DEFAULT 'N.A',
  `pain_assessment` varchar(35) NOT NULL DEFAULT 'N.A',
  `weight` varchar(10) NOT NULL DEFAULT 'N.A',
  `bmi` varchar(10) NOT NULL DEFAULT 'N.A',
  `present_complaints` varchar(500) NOT NULL DEFAULT 'N.A',
  `sleep_hours` varchar(20) NOT NULL DEFAULT 'N.A',
  `unconscious` varchar(5) NOT NULL DEFAULT 'N.A',
  `disoriented` varchar(5) NOT NULL,
  `bedridden` varchar(5) NOT NULL,
  `others` varchar(1000) NOT NULL,
  `addictions` varchar(500) NOT NULL DEFAULT 'N.A',
  `allergies` varchar(500) NOT NULL,
  `existing_medicines` varchar(500) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_initial_assessment_form`
--

INSERT INTO `doctor_initial_assessment_form` (`record_id`, `visit_id`, `user_id`, `temperature`, `pulse`, `blood_pressure`, `height`, `pain_assessment`, `weight`, `bmi`, `present_complaints`, `sleep_hours`, `unconscious`, `disoriented`, `bedridden`, `others`, `addictions`, `allergies`, `existing_medicines`, `doctor_id`, `doctor_name`, `doctors_sign`) VALUES
(1, 1, 3, '45', '56', '120', '172', 'Medium', '80', '27', 'Headache and fatigue', '8', 'false', 'false', 'false', 'None', 'None', 'None', 'Paracetamol as needed', 1, 'Super Admin', 'assets/users/patient/testguy3/testguy3_signature.png'),
(2, 6, 8, '54', '69', '', '169', '', '70', '24', '', '', 'false', 'false', 'false', '', '', '', '', 1, 'Super Admin', 'assets/users/patient/testguy3/testguy3_signature.png');

-- --------------------------------------------------------

--
-- Table structure for table `medication_administration_records`
--

CREATE TABLE `medication_administration_records` (
  `med_adm_chart_id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `medication_name` varchar(50) NOT NULL,
  `dose` varchar(20) NOT NULL,
  `frequency` varchar(20) NOT NULL,
  `anupanam` varchar(50) NOT NULL,
  `nurse_id` bigint(20) NOT NULL,
  `nurse_name` varchar(100) NOT NULL,
  `nurses_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medication_administration_records`
--

INSERT INTO `medication_administration_records` (`med_adm_chart_id`, `user_id`, `visit_id`, `date`, `time`, `medication_name`, `dose`, `frequency`, `anupanam`, `nurse_id`, `nurse_name`, `nurses_sign`) VALUES
(1, 3, 1, '2024-07-02', '20:30:00', 'Arishtam', 'test dose 1', 'test freq 1', 'test anupanam 1', 1, 'Super Admin', 'assets/users/superadmin/superadmin/superadmin_signature.png'),
(2, 3, 1, '2024-07-03', '21:31:00', 'Choornam', 'test dose 2', 'test freq 2', 'test anupanam 2', 1, 'Super Admin', 'assets/users/superadmin/superadmin/superadmin_signature.png'),
(3, 3, 1, '2024-07-02', '22:33:00', 'new meds', 'test dose 4', 'test freq 4', 'test anupanam 4', 1, 'Super Admin', 'assets/users/superadmin/superadmin/superadmin_signature.png');

-- --------------------------------------------------------

--
-- Table structure for table `medication_orders`
--

CREATE TABLE `medication_orders` (
  `med_ord_id` bigint(20) NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `route_site` varchar(50) NOT NULL,
  `dose` varchar(50) NOT NULL,
  `time` time NOT NULL,
  `anupana` varchar(75) NOT NULL,
  `remarks` varchar(50) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medication_orders`
--

INSERT INTO `medication_orders` (`med_ord_id`, `visit_id`, `user_id`, `date`, `medicine`, `route_site`, `dose`, `time`, `anupana`, `remarks`, `doctor_id`, `doctor_name`, `doctors_sign`) VALUES
(1, 1, 3, '2024-01-11', 'Brahmi', 'Oral', '300 mg', '02:48:00', 'Water', 'Good for memory and cognition', 1, 'Dr. Sharma', 'assets/users/doctor/actualdoctor/actualdoctor_signature.png'),
(2, 1, 3, '2024-01-12', 'Tulsi (Holy Basil)', 'Oral', '1000 mg', '03:48:00', 'Honey', 'Take in the morning for immunity', 1, 'Dr. Sharma', 'assets/users/doctor/actualdoctor/actualdoctor_signature.png'),
(3, 1, 3, '2024-01-13', 'Amla', 'Oral', '	500 mg', '17:26:00', 'Warm Water', 'Water	Boosts Vitamin C intake', 1, 'Dr. Sharma', 'assets/users/doctor/actualdoctor/actualdoctor_signature.png'),
(4, 1, 3, '2024-01-14', 'Guggulu', 'Oral', '500 mg', '20:45:00', 'Warm Water', 'For joint health, take daily', 1, 'Dr. Sharma', 'assets/users/doctor/actualdoctor/actualdoctor_signature.png'),
(5, 1, 3, '2024-01-15', 'Triphala', 'Oral', '1 tsp', '20:50:00', 'Warm Water', 'Take after dinner for digestion', 1, 'Dr. Sharma', 'assets/users/doctor/actualdoctor/actualdoctor_signature.png');

-- --------------------------------------------------------

--
-- Table structure for table `nursing_care_plan`
--

CREATE TABLE `nursing_care_plan` (
  `nurse_care_plan_id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `problem_identified` varchar(300) NOT NULL,
  `suggestions` varchar(300) NOT NULL,
  `nurse_id` bigint(20) NOT NULL,
  `nurse_name` varchar(100) NOT NULL,
  `nurses_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nursing_care_plan`
--

INSERT INTO `nursing_care_plan` (`nurse_care_plan_id`, `user_id`, `visit_id`, `date`, `time`, `problem_identified`, `suggestions`, `nurse_id`, `nurse_name`, `nurses_sign`) VALUES
(1, 3, 1, '2024-07-04', '17:38:00', 'test problem', 'test suggestion', 1, 'Super Admin', 'assets/users/superadmin/superadmin/superadmin_signature.png'),
(2, 3, 1, '2024-07-05', '18:39:00', 'test problem 2', 'test suggestion 2', 1, 'Super Admin', 'assets/users/superadmin/superadmin/superadmin_signature.png'),
(3, 3, 1, '2024-07-03', '17:43:00', 'test problem 0', 'suggestion 0', 1, 'Super Admin', 'assets/users/superadmin/superadmin/superadmin_signature.png');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(2) NOT NULL,
  `name` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`permissions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `permissions`) VALUES
(1, 'superadmin', '[\"view_patient\",\"edit_patient\",\"edit_visit\",\"edit_doctor_form\",\"edit_nurse_form\",\"view_doctor_form\",\"view_nurse_form\",\"edit_staff\",\"view_analytics\",\"superadmin\"]'),
(2, 'admin', '[\"view_patient\",\"edit_patient\",\"edit_visit\",\"edit_doctor_form\",\"edit_nurse_form\",\"view_doctor_form\",\"view_nurse_form\",\"edit_staff\",\"view_analytics\"]'),
(3, 'doctor', '[\"view_patient\",\"edit_doctor_form\",\"edit_nurse_form\",\"view_doctor_form\",\"view_nurse_form\",\"view_visit\"]'),
(4, 'nurse', '[\"view_patient\",\"edit_nurse_form\",\"view_doctor_form\",\"view_nurse_form\",\"view_visit\"]'),
(5, 'patient', '[\"view_self\"]');

-- --------------------------------------------------------

--
-- Table structure for table `treat_proc_ord`
--

CREATE TABLE `treat_proc_ord` (
  `treat_proc_id` bigint(20) NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `treatment_procedure` varchar(100) NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `site_loc` varchar(50) NOT NULL,
  `no_of_days` int(11) NOT NULL,
  `precautions` varchar(200) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `treat_proc_ord`
--

INSERT INTO `treat_proc_ord` (`treat_proc_id`, `visit_id`, `user_id`, `date`, `time`, `treatment_procedure`, `medicine`, `site_loc`, `no_of_days`, `precautions`, `doctor_id`, `doctor_name`, `doctors_sign`) VALUES
(1, 1, 3, '2024-06-04', '19:58:00', 'test pro 1', 'test med 1', 'test site 1', 5, 'test pre 1', 1, 'Super Admin', 'assets/users/patient/anotherguy/anotherguy_signature.png'),
(2, 1, 3, '2024-06-05', '20:58:00', 'test pro 1', 'test med 2', 'test site 2', 6, 'test pre 2', 1, 'Super Admin', 'assets/users/patient/anotherguy/anotherguy_signature.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL DEFAULT 'N.A',
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `profile_img` varchar(200) DEFAULT NULL,
  `gender` varchar(50) NOT NULL,
  `address_line_1` varchar(100) NOT NULL DEFAULT 'N.A',
  `address_line_2` varchar(100) NOT NULL DEFAULT 'N.A',
  `state` varchar(100) NOT NULL DEFAULT 'N.A',
  `country` varchar(100) DEFAULT NULL,
  `country_code` varchar(2) NOT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `signature_img` varchar(200) DEFAULT NULL,
  `occupation` varchar(50) NOT NULL DEFAULT 'N.A',
  `blood_group` varchar(3) NOT NULL DEFAULT 'N.A',
  `color_theme` varchar(10) NOT NULL DEFAULT 'light'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `first_name`, `last_name`, `role`, `date_of_birth`, `phone_no`, `profile_img`, `gender`, `address_line_1`, `address_line_2`, `state`, `country`, `country_code`, `pincode`, `signature_img`, `occupation`, `blood_group`, `color_theme`) VALUES
(1, 'superadmin', 'N.A', '$2b$11$GlcUkyBVGz4xpkvIIvwICe5/QhphrIERkE22xJoq0obSRAWJdOOe2', 'Super', 'Admin', 'superadmin', NULL, NULL, 'assets/users/superadmin/superadmin/superadmin_profile.png', 'N.A', 'N.A', 'N.A', 'N.A', NULL, 'IN', NULL, 'assets/users/superadmin/superadmin/superadmin_signature.png', 'N.A', 'N.A', 'light'),
(3, 'testguy', 'stevesajanjacobkallunkal04@gmail.com', '$2b$10$6uHLTE21eyOQeVyLc3/59eE1hxSJmTDoG6zs65HcE363IF3KWSkcW', 'Steve Sajan', 'Jacob', 'patient', '2004-08-23', '6238936248', 'assets/users/patient/testguy3/testguy3_profile.png', 'Male', 'address1', 'address2', 'Kerala', 'India', 'IN', '695023', 'assets/users/patient/testguy3/testguy3_signature.png', 'test occupation', 'B+', 'light'),
(4, 'jaith', 'jaithj@gmail.com', '$2b$10$Fj4.K/uENmme.XV5TB3Sj.8I3k0SRejqbNhV83GzhVswFI.mmPzJO', 'Jaith', 'J', 'patient', '2003-06-11', '9876543210', 'assets/users/patient/jaith/jaith_profile.png', 'Male', 'Address 1', 'Kazhakootam', 'Kerala', 'India', 'IN', '695581', 'assets/users/patient/jaith/jaith_signature.png', 'testocc', 'AB-', 'light'),
(8, 'aby', 'abythomas@gmail.com', '$2b$10$4IzYNygEl1gKW8GMGZuO5udlKnYOM0m6h.p0dqd5jC7VoRjhTRTAO', 'ABY', 'THOMAS', 'patient', '2024-06-28', '9090909090909', 'assets/users/patient/aby/aby_profile.jpeg', 'Male', 'kjbkd', 'ksd ', 'kerala', 'Afghanistan', 'AF', '695003', 'assets/users/patient/aby/aby_signature.png', 'unknown', 'A+', 'light'),
(10, 'doctorstrange', 'doctor@gmail.com', '$2b$10$.GxPcCbUmqmmXN3qIFsP.eKJLkM7G1dp9FjmdIi0lL3c4fWp1h4Za', 'Doctor', 'Strange', 'doctor', '1992-06-03', '9876543214', 'assets/users/doctor/doctorstrange/doctorstrange_profile.png', 'Male', 'addre1', 'addre2', 'Kerala', 'India', 'IN', '697012', 'assets/users/doctor/doctorstrange/doctorstrange_signature.png', 'Doctor', 'B+', 'light'),
(11, 'nurse', 'nurse@gmail.com', '$2b$10$HnVWuo92imbkDyWjifaG5./YpSSapY9hwPapE5aeN6soIWc6PSRg2', 'Nurse', 'Test', 'nurse', '2000-04-08', '9876543217', 'assets/users/nurse/nurse/nurse_profile.png', 'Female', 'addre1', 'addre2', 'Kerala', 'India', 'IN', '678098', 'assets/users/nurse/nurse/nurse_signature.png', 'Nurse', 'AB-', 'light'),
(12, 'actualdoctor', 'actualdoctor@gmail.com', '$2b$10$fAqRccU3f/MsDRuZoTXgmuGoVRIqTAm9RqhFJakDDjYOLs1tYkisi', 'Actual', 'Doctor', 'doctor', '1980-03-08', '98765433213', 'assets/users/doctor/actualdoctor/actualdoctor_profile.png', 'Male', 'addre1', 'addre2', 'Kerala', 'India', 'IN', '678098', 'assets/users/doctor/actualdoctor/actualdoctor_signature.png', 'Doctor', 'A-', 'light'),
(13, 'doctorwho', 'doctorwho@gmail.com', '$2b$10$zzPuq6vWqeXpfR9nTyfhQe7S7Qu/f5Ai8ikhze9T7tGt9EDMUpHYe', 'Doctor', 'Who', 'doctor', '1980-08-07', '9876543214', 'assets/users/doctor/doctorwho/doctorwho_profile.png', 'Male', 'addre1', 'addre2', 'Kerala', 'India', 'IN', '678098', 'assets/users/doctor/doctorwho/doctorwho_signature.png', 'Doctor', 'B-', 'light'),
(17, 'antobgeorge', 'antobgeorge@gmail.com', '$2b$10$Ij20PcEoipSVNPLBXf0JuO7VVYLZQO8SL2yOS3UhJjOsjx.fIryzC', 'Anto B', 'George', 'patient', '2004-02-03', '9876543210', 'assets/users/patient/antobgeorge/antobgeorge_profile.png', 'Male', 'addre1', 'addre2', 'Kerala', 'Russia', 'RU', '697654321', 'assets/users/patient/antobgeorge/antobgeorge_signature.png', 'Student', 'B+', 'light'),
(18, 'abhaysbabu', 'abhaysbabu@gmail.com', '$2b$10$Ij20PcEoipSVNPLBXf0JuO7VVYLZQO8SL2yOS3UhJjOsjx.fIryzC', 'Abhay ', 'S Babu', 'patient', '2004-02-03', '9876543210', 'assets/users/patient/abhaysbabu/abhaysbabu_profile.png', 'Male', 'addre1', 'addre2', 'Kerala', 'India', 'IN', '697654321', 'assets/users/patient/antobgeorge/antobgeorge_signature.png', 'Student', 'B+', 'light'),
(19, 'aiswaryaligin', 'aiswaryaligin@gmail.com', '$2b$10$Ij20PcEoipSVNPLBXf0JuO7VVYLZQO8SL2yOS3UhJjOsjx.fIryzC', 'Aiswarya ', 'Ligin', 'patient', '2004-02-03', '9876543210', 'assets/users/patient/aishwaryaligin/aishwaryaligin_profile.png', 'Female', 'addre1', 'addre2', 'Kerala', 'India', 'IN', '697654321', 'assets/users/patient/antobgeorge/antobgeorge_signature.png', 'Student', 'B+', 'light'),
(20, 'devikasuresh', 'devikasuresh@gmail.com', '$2b$10$Ij20PcEoipSVNPLBXf0JuO7VVYLZQO8SL2yOS3UhJjOsjx.fIryzC', 'Devika ', 'Suresh', 'patient', '2004-02-03', '9876543210', 'assets/users/patient/devikasuresh/devikasuresh_profile.png', 'Female', 'addre1', 'addre2', 'Kerala', 'India', 'IN', '697654321', 'assets/users/patient/antobgeorge/antobgeorge_signature.png', 'Student', 'B+', 'light');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `staff_editable` tinyint(1) NOT NULL DEFAULT 1,
  `date_of_admission` date NOT NULL,
  `date_of_discharge` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`visit_id`, `user_id`, `staff_editable`, `date_of_admission`, `date_of_discharge`) VALUES
(1, 3, 1, '2024-01-11', '2024-01-18'),
(2, 3, 1, '2024-02-11', '2024-07-01'),
(3, 4, 1, '2024-02-10', NULL),
(4, 4, 1, '2024-02-22', NULL),
(5, 4, 1, '2024-05-13', NULL),
(6, 8, 1, '2024-06-18', '2024-07-28'),
(9, 3, 1, '2024-07-03', NULL),
(12, 17, 1, '2024-07-02', '2024-07-24'),
(13, 18, 1, '2024-07-01', NULL),
(14, 20, 1, '2024-06-30', NULL),
(15, 19, 1, '2024-06-29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vital_chart_form`
--

CREATE TABLE `vital_chart_form` (
  `vital_chart_id` bigint(20) NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `temperature` varchar(10) NOT NULL,
  `pulse` varchar(10) NOT NULL,
  `bp` varchar(10) NOT NULL,
  `weight` varchar(10) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vital_chart_form`
--

INSERT INTO `vital_chart_form` (`vital_chart_id`, `visit_id`, `user_id`, `date`, `time`, `temperature`, `pulse`, `bp`, `weight`, `remarks`, `doctor_id`, `doctor_name`, `doctors_sign`) VALUES
(1, 1, 3, '2024-06-17', '18:29:00', '35', '80', '120', '80', 'test rem 1', 1, 'Super Admin', 'assets/users/patient/anotherguy/anotherguy_signature.png'),
(2, 1, 3, '2024-06-18', '19:30:00', '36', '60', '140', '79', 'test rem 2', 1, 'Super Admin', 'assets/users/patient/anotherguy/anotherguy_signature.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discharge_summary`
--
ALTER TABLE `discharge_summary`
  ADD PRIMARY KEY (`discharge_id`),
  ADD KEY `ds_patient_relation` (`user_id`),
  ADD KEY `ds_visit_relation` (`visit_id`);

--
-- Indexes for table `doctor_initial_assessment_form`
--
ALTER TABLE `doctor_initial_assessment_form`
  ADD PRIMARY KEY (`record_id`),
  ADD UNIQUE KEY `visit_id` (`visit_id`),
  ADD KEY `ia_patient_relation` (`user_id`);

--
-- Indexes for table `medication_administration_records`
--
ALTER TABLE `medication_administration_records`
  ADD PRIMARY KEY (`med_adm_chart_id`),
  ADD KEY `mac_patient_relation` (`user_id`),
  ADD KEY `mac_visit_relation` (`visit_id`);

--
-- Indexes for table `medication_orders`
--
ALTER TABLE `medication_orders`
  ADD PRIMARY KEY (`med_ord_id`),
  ADD KEY `mo_visit_relation` (`visit_id`),
  ADD KEY `mo_patient_relation` (`user_id`);

--
-- Indexes for table `nursing_care_plan`
--
ALTER TABLE `nursing_care_plan`
  ADD PRIMARY KEY (`nurse_care_plan_id`),
  ADD KEY `nc_patient_relation` (`user_id`),
  ADD KEY `nc_visit_relation` (`visit_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `treat_proc_ord`
--
ALTER TABLE `treat_proc_ord`
  ADD PRIMARY KEY (`treat_proc_id`),
  ADD KEY `tpo_visit_relation` (`visit_id`),
  ADD KEY `tpo_patient_relation` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `role_relation` (`role`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD PRIMARY KEY (`visit_id`),
  ADD KEY `patient_relation` (`user_id`);

--
-- Indexes for table `vital_chart_form`
--
ALTER TABLE `vital_chart_form`
  ADD PRIMARY KEY (`vital_chart_id`),
  ADD KEY `vcf_visit_relation` (`visit_id`),
  ADD KEY `vcf_patient_relation` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `discharge_summary`
--
ALTER TABLE `discharge_summary`
  MODIFY `discharge_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `doctor_initial_assessment_form`
--
ALTER TABLE `doctor_initial_assessment_form`
  MODIFY `record_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medication_administration_records`
--
ALTER TABLE `medication_administration_records`
  MODIFY `med_adm_chart_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `medication_orders`
--
ALTER TABLE `medication_orders`
  MODIFY `med_ord_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `nursing_care_plan`
--
ALTER TABLE `nursing_care_plan`
  MODIFY `nurse_care_plan_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `treat_proc_ord`
--
ALTER TABLE `treat_proc_ord`
  MODIFY `treat_proc_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `visit_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vital_chart_form`
--
ALTER TABLE `vital_chart_form`
  MODIFY `vital_chart_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discharge_summary`
--
ALTER TABLE `discharge_summary`
  ADD CONSTRAINT `ds_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ds_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctor_initial_assessment_form`
--
ALTER TABLE `doctor_initial_assessment_form`
  ADD CONSTRAINT `ia_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ia_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medication_administration_records`
--
ALTER TABLE `medication_administration_records`
  ADD CONSTRAINT `mac_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mac_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medication_orders`
--
ALTER TABLE `medication_orders`
  ADD CONSTRAINT `mo_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `mo_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE;

--
-- Constraints for table `nursing_care_plan`
--
ALTER TABLE `nursing_care_plan`
  ADD CONSTRAINT `nc_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nc_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `treat_proc_ord`
--
ALTER TABLE `treat_proc_ord`
  ADD CONSTRAINT `tpo_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tpo_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `role_relation` FOREIGN KEY (`role`) REFERENCES `roles` (`name`);

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vital_chart_form`
--
ALTER TABLE `vital_chart_form`
  ADD CONSTRAINT `vcf_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vcf_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
