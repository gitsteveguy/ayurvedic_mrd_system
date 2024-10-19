import { Routes, Route } from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";

import Staff from "./pages/Staff";
import Patients from "./pages/Patients";
import ViewPatient from "./pages/patientPages/ViewPatient";
import ViewVisit from "./pages/patientPages/ViewVisit";
import AddVisit from "./pages/patientPages/AddVisit";
import EditVisit from "./pages/patientPages/EditVisit";
import ExportVisit from "./pages/patientPages/ExportVisit";

// Doctor Forms
import DoctorsInitialAssessmentFormPage from "./pages/patientPages/Forms/Doctors/DoctorsInitialAssessmentFormPage";
import MedicationRecordsPage from "./pages/patientPages/Forms/Doctors/MedicationRecordsPage";
import TreatmentProcedureFormPage from "./pages/patientPages/Forms/Doctors/TreatmentProcedureFormPage";
import VitalChartFormPage from "./pages/patientPages/Forms/Doctors/VitalChartFormPage";
import DischargeFormPage from "./pages/patientPages/Forms/Doctors/DischargeFormPage";

// Nurse Forms
import NursingCarePlanFormPage from "./pages/patientPages/Forms/Nurses/NursingCarePlanFormPage";
import MedicationAdministrationFormPage from "./pages/patientPages/Forms/Nurses/MedicationAdministrationFormPage";

import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Container from "./components/Container";
import Settings from "./pages/Settings";

import PatientCreationPage from "./pages/formpages/PatientCreationPage";
import PatientEditFormPage from "./pages/formpages/PatientEditFormPage";
import StaffCreationPage from "./pages/formpages/StaffCreationPage";
import StaffEditFormPage from "./pages/formpages/StaffEditFormPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/staff" element={<Staff />} />
        <Route
          path="/staff/create_staff"
          element={
            <Container
              page_name="Create Staff"
              child={<StaffCreationPage />}
              active_menu="Staff"
            />
          }
        />
        <Route
          path="/staff/edit_staff"
          element={
            <Container
              page_name="Edit Staff"
              child={<StaffEditFormPage />}
              active_menu="Staff"
            />
          }
        />
        <Route path="/patients" element={<Patients />} />
        <Route
          path="/patients/create_patient"
          element={
            <Container
              page_name="Create Patient"
              child={<PatientCreationPage />}
              active_menu="Patients"
            />
          }
        />
        <Route
          path="/patients/edit_patient"
          element={
            <Container
              page_name="Edit Patient"
              child={<PatientEditFormPage />}
              active_menu="Patients"
            />
          }
        />
        <Route path="/patients/view_patient" element={<ViewPatient />} />
        <Route path="/patients/view_patient_visit" element={<ViewVisit />} />
        <Route path="/patients/add_visit" element={<AddVisit />} />
        <Route path="/patients/edit_visit" element={<EditVisit />} />
        <Route path="/patients/export_visit" element={<ExportVisit />} />

        {/* Doctor Forms */}
        <Route
          path="/patients/view_patient_visit/initial_assessment"
          element={<DoctorsInitialAssessmentFormPage />}
        />
        <Route
          path="/patients/view_patient_visit/medication_records"
          element={<MedicationRecordsPage />}
        />
        <Route
          path="/patients/view_patient_visit/treatment_procedure_order"
          element={<TreatmentProcedureFormPage />}
        />
        <Route
          path="/patients/view_patient_visit/vital_chart"
          element={<VitalChartFormPage />}
        />
        <Route
          path="/patients/view_patient_visit/discharge_form"
          element={<DischargeFormPage />}
        />
        {/* Nurse Forms */}
        <Route
          path="/patients/view_patient_visit/nursing_care_plan"
          element={<NursingCarePlanFormPage />}
        />
        <Route
          path="/patients/view_patient_visit/medication_administration_chart"
          element={<MedicationAdministrationFormPage />}
        />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
