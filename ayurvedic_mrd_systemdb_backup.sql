-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 15, 2024 at 12:55 AM
-- Server version: 10.6.17-MariaDB-cll-lve
-- PHP Version: 8.1.27

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
  `prakriti` varchar(50) NOT NULL,
  `vikriti` varchar(50) NOT NULL,
  `reas_admsn_finds` varchar(350) NOT NULL,
  `diagnosis` varchar(350) NOT NULL,
  `investig_res` varchar(350) NOT NULL,
  `proc_per_tmts` varchar(350) NOT NULL,
  `medications_adms` varchar(1000) NOT NULL,
  `condition_discharge` varchar(350) NOT NULL,
  `advices` varchar(350) NOT NULL,
  `discharge_meds` varchar(1000) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fall_risk_assesments`
--

CREATE TABLE `fall_risk_assesments` (
  `fall_risk_assesment_id` bigint(20) NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `prev_fall_his` varchar(5) NOT NULL,
  `vuln_cat_pat` varchar(5) NOT NULL,
  `vis_imp` varchar(5) NOT NULL,
  `phy_dis` varchar(5) NOT NULL,
  `muscle_weak` varchar(5) NOT NULL,
  `gait_instable` varchar(5) NOT NULL,
  `balance_mob` varchar(5) NOT NULL,
  `low_bp` varchar(5) NOT NULL,
  `alt_ment_st_pat` varchar(5) NOT NULL,
  `pos_med_side_fx` varchar(5) NOT NULL,
  `alc_dru_wtdr_syms` varchar(5) NOT NULL,
  `procedure_type` varchar(15) NOT NULL,
  `oth_rev_pt` varchar(300) NOT NULL,
  `prvn_acts_tak` varchar(300) NOT NULL,
  `time` time NOT NULL,
  `date` date NOT NULL,
  `nurse_name` varchar(100) NOT NULL,
  `nurses_sign` varchar(300) NOT NULL,
  `nurse_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `form_id` int(11) NOT NULL,
  `php_code_file` varchar(250) NOT NULL,
  `table_name` varchar(100) NOT NULL,
  `mod_roles` varchar(500) NOT NULL,
  `submit_perm_roles` varchar(500) NOT NULL,
  `primary_key` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forms`
--

INSERT INTO `forms` (`form_id`, `php_code_file`, `table_name`, `mod_roles`, `submit_perm_roles`, `primary_key`) VALUES
(1, 'medication_orders.php', 'medication_orders', 'superadmin,Admin,Doctor', 'Doctor', 'med_ord_id'),
(3, 'treatment_procedure.php', 'treat_proc_ord', 'superadmin,Admin,Doctor', 'Doctor', 'treat_proc_id'),
(4, 'vital_chart_form.php', 'vital_chart_form', 'superadmin,Admin,Doctor', 'Doctor', 'vital_chart_id'),
(7, 'nursing_care_plan_form.php', 'nursing_care_plan', 'superadmin,Admin,Doctor', 'Doctor,Nurse', 'nurse_care_plan'),
(8, 'medication_administration_chart_form.php', 'medication_adm_chart_form', 'superadmin,Admin', 'Doctor,Nurse', 'med_adm_chart_id'),
(12, 'ip_initial_assessment.php', 'initial_assesment_form', 'superadmin,Admin', 'Doctor', 'ip_form_id'),
(15, 'discharge_form.php', 'discharge_summary', 'superadmin,Admin', 'Doctor', 'discharge_id'),
(16, 'fall_risk_assessment_form.php', 'fall_risk_assesments', 'superadmin,Admin', 'Doctor,Nurse', 'fall_risk_assesment_id'),
(18, 'createstaff.php', 'user_data', 'superadmin,Admin', '', 'user_id'),
(19, 'edit_core_visit.php', 'visits', 'superadmin,Admin', 'Receptionist', 'visit_id'),
(20, 'edit_core_visit_submission.php', 'visits', 'superadmin,Admin', 'Receptionist', 'visit_id');

-- --------------------------------------------------------

--
-- Table structure for table `initial_assesment_form`
--

CREATE TABLE `initial_assesment_form` (
  `ip_form_id` bigint(20) UNSIGNED NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `temperature` varchar(10) NOT NULL DEFAULT 'N.A',
  `pulse` varchar(10) NOT NULL DEFAULT 'N.A',
  `pulse_type` varchar(20) NOT NULL DEFAULT 'N.A',
  `blood_pressure` varchar(10) NOT NULL DEFAULT 'N.A',
  `height` varchar(10) NOT NULL DEFAULT 'N.A',
  `pain_assessment` varchar(35) NOT NULL DEFAULT 'N.A',
  `weight` varchar(10) NOT NULL DEFAULT 'N.A',
  `bmi` varchar(10) NOT NULL DEFAULT 'N.A',
  `built` varchar(20) NOT NULL DEFAULT 'N.A',
  `gastric_issues_last_six_months` varchar(5) NOT NULL DEFAULT 'N.A',
  `weight_g_l_last_six_months` varchar(10) NOT NULL DEFAULT 'N.A',
  `nutritional_status` varchar(35) NOT NULL DEFAULT 'N.A',
  `difficulty_in_phy_acts` varchar(5) NOT NULL DEFAULT 'N.A',
  `intake_of_fo_vit_sup` varchar(5) NOT NULL DEFAULT 'N.A',
  `diifinfoint` varchar(4) NOT NULL DEFAULT 'N.A',
  `pres_compl_dur` varchar(500) NOT NULL DEFAULT 'N.A',
  `his_pres_ill` varchar(500) NOT NULL DEFAULT 'N.A',
  `his_prev_ill` varchar(500) NOT NULL DEFAULT 'N.A',
  `treat_med_det` varchar(500) NOT NULL DEFAULT 'N.A',
  `bowel_hab` varchar(20) NOT NULL DEFAULT 'N.A',
  `appetite` varchar(20) NOT NULL DEFAULT 'N.A',
  `micturition` varchar(20) NOT NULL DEFAULT 'N.A',
  `sleep` varchar(20) NOT NULL DEFAULT 'N.A',
  `menstr_cycle` varchar(10) NOT NULL DEFAULT 'N.A',
  `menstr_flow` varchar(10) NOT NULL DEFAULT 'N.A',
  `menstr_assoc` varchar(20) NOT NULL DEFAULT 'N.A',
  `menstrotherdet` varchar(500) DEFAULT 'N.A',
  `unconscious` varchar(5) NOT NULL DEFAULT 'N.A',
  `disoriented` varchar(5) NOT NULL,
  `bedridden` varchar(5) NOT NULL,
  `built_type` varchar(10) NOT NULL,
  `others` varchar(200) NOT NULL,
  `cps_prevention` tinyint(1) NOT NULL DEFAULT 0,
  `cps_curative` tinyint(1) NOT NULL DEFAULT 0,
  `cps_rehabilitative` tinyint(1) NOT NULL DEFAULT 0,
  `cps_promotive` tinyint(1) NOT NULL DEFAULT 0,
  `diet_plan` varchar(20) NOT NULL DEFAULT 'N.A',
  `cp_appr_alr_med` varchar(5) NOT NULL DEFAULT 'N.A',
  `provis_diag` varchar(200) NOT NULL DEFAULT 'N.A',
  `diagnosis` varchar(200) NOT NULL DEFAULT 'N.A',
  `investigations` varchar(200) NOT NULL DEFAULT 'N.A',
  `addictions` varchar(200) NOT NULL DEFAULT 'N.A',
  `desired_outcome` varchar(200) NOT NULL DEFAULT 'N.A',
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medication_adm_chart_form`
--

CREATE TABLE `medication_adm_chart_form` (
  `med_adm_chart_id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `med_name` varchar(50) NOT NULL,
  `dose` varchar(20) NOT NULL,
  `frequency` varchar(20) NOT NULL,
  `anupanam` varchar(50) NOT NULL,
  `nurse_id` bigint(20) NOT NULL,
  `nurse_name` varchar(100) NOT NULL,
  `nurses_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `nursing_care_plan`
--

CREATE TABLE `nursing_care_plan` (
  `nurse_care_plan` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `prob_ident` varchar(100) NOT NULL,
  `suggestions` varchar(350) NOT NULL,
  `nurse_id` bigint(20) NOT NULL,
  `nurse_name` varchar(100) NOT NULL,
  `nurses_sign` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `super_constants`
--

CREATE TABLE `super_constants` (
  `const_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `value` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super_constants`
--

INSERT INTO `super_constants` (`const_id`, `name`, `value`) VALUES
(1, 'super_roles', 'superadmin,Admin');

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
  `treat_proced` varchar(100) NOT NULL,
  `medicine` varchar(100) NOT NULL,
  `site_loc` varchar(50) NOT NULL,
  `no_of_days` int(11) NOT NULL,
  `precautions` varchar(200) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
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
  `address_line_3` varchar(100) NOT NULL DEFAULT 'N.A',
  `country` varchar(100) DEFAULT NULL,
  `country_code` varchar(2) NOT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  `signature_img` varchar(200) DEFAULT NULL,
  `occupation` varchar(50) NOT NULL DEFAULT 'N.A',
  `blood_group` varchar(3) NOT NULL DEFAULT 'N.A'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`user_id`, `username`, `email`, `password`, `first_name`, `last_name`, `role`, `date_of_birth`, `phone_no`, `profile_img`, `gender`, `address_line_1`, `address_line_2`, `address_line_3`, `country`, `country_code`, `pincode`, `signature_img`, `occupation`, `blood_group`) VALUES
(1, 'superadmin', 'N.A', 'replaced by hash', 'Super', 'Admin', 'superadmin', NULL, NULL, NULL, 'N.A', 'N.A', 'N.A', 'N.A', NULL, 'IN', NULL, NULL, 'N.A', 'N.A');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `visit_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `staff_editable` varchar(4) NOT NULL DEFAULT 'Yes',
  `date_of_admission` date NOT NULL,
  `date_of_discharge` date DEFAULT NULL,
  `room_no` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `temp` varchar(10) NOT NULL,
  `pulse` varchar(10) NOT NULL,
  `bp` varchar(10) NOT NULL,
  `weight` varchar(10) NOT NULL,
  `remarks` varchar(200) NOT NULL,
  `doctor_id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctors_sign` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indexes for table `fall_risk_assesments`
--
ALTER TABLE `fall_risk_assesments`
  ADD PRIMARY KEY (`fall_risk_assesment_id`),
  ADD KEY `fr_patient_relation` (`user_id`),
  ADD KEY `fr_visit_relation` (`visit_id`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`form_id`);

--
-- Indexes for table `initial_assesment_form`
--
ALTER TABLE `initial_assesment_form`
  ADD PRIMARY KEY (`ip_form_id`),
  ADD UNIQUE KEY `visit_id` (`visit_id`),
  ADD KEY `ia_patient_relation` (`user_id`);

--
-- Indexes for table `medication_adm_chart_form`
--
ALTER TABLE `medication_adm_chart_form`
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
  ADD PRIMARY KEY (`nurse_care_plan`),
  ADD KEY `nc_patient_relation` (`user_id`),
  ADD KEY `nc_visit_relation` (`visit_id`);

--
-- Indexes for table `super_constants`
--
ALTER TABLE `super_constants`
  ADD PRIMARY KEY (`const_id`);

--
-- Indexes for table `treat_proc_ord`
--
ALTER TABLE `treat_proc_ord`
  ADD PRIMARY KEY (`treat_proc_id`),
  ADD KEY `tpo_visit_relation` (`visit_id`),
  ADD KEY `tpo_patient_relation` (`user_id`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

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
  MODIFY `discharge_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fall_risk_assesments`
--
ALTER TABLE `fall_risk_assesments`
  MODIFY `fall_risk_assesment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `form_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `initial_assesment_form`
--
ALTER TABLE `initial_assesment_form`
  MODIFY `ip_form_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medication_adm_chart_form`
--
ALTER TABLE `medication_adm_chart_form`
  MODIFY `med_adm_chart_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medication_orders`
--
ALTER TABLE `medication_orders`
  MODIFY `med_ord_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nursing_care_plan`
--
ALTER TABLE `nursing_care_plan`
  MODIFY `nurse_care_plan` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `super_constants`
--
ALTER TABLE `super_constants`
  MODIFY `const_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `treat_proc_ord`
--
ALTER TABLE `treat_proc_ord`
  MODIFY `treat_proc_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `visits`
--
ALTER TABLE `visits`
  MODIFY `visit_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vital_chart_form`
--
ALTER TABLE `vital_chart_form`
  MODIFY `vital_chart_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discharge_summary`
--
ALTER TABLE `discharge_summary`
  ADD CONSTRAINT `ds_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ds_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fall_risk_assesments`
--
ALTER TABLE `fall_risk_assesments`
  ADD CONSTRAINT `fr_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fr_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`);

--
-- Constraints for table `initial_assesment_form`
--
ALTER TABLE `initial_assesment_form`
  ADD CONSTRAINT `ia_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ia_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medication_adm_chart_form`
--
ALTER TABLE `medication_adm_chart_form`
  ADD CONSTRAINT `mac_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mac_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medication_orders`
--
ALTER TABLE `medication_orders`
  ADD CONSTRAINT `mo_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`),
  ADD CONSTRAINT `mo_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE;

--
-- Constraints for table `nursing_care_plan`
--
ALTER TABLE `nursing_care_plan`
  ADD CONSTRAINT `nc_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nc_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `treat_proc_ord`
--
ALTER TABLE `treat_proc_ord`
  ADD CONSTRAINT `tpo_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tpo_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vital_chart_form`
--
ALTER TABLE `vital_chart_form`
  ADD CONSTRAINT `vcf_patient_relation` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `vcf_visit_relation` FOREIGN KEY (`visit_id`) REFERENCES `visits` (`visit_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
