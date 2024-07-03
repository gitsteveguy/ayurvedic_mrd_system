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

import DoctorsInitialAssessmentFormPage from "./pages/patientPages/Forms/Doctors/DoctorsInitialAssessmentFormPage";
import MedicationRecordsPage from "./pages/patientPages/Forms/Doctors/MedicationRecordsPage";
import TreatmentProcedureFormPage from "./pages/patientPages/Forms/Doctors/TreatmentProcedureFormPage";
import VitalChartFormPage from "./pages/patientPages/Forms/Doctors/VitalChartFormPage";
import DischargeFormPage from "./pages/patientPages/Forms/Doctors/DischargeFormPage";

import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import RepeatingFormPage from "./pages/demo/RepeatingFormPage";
import Container from "./components/Container";
import FetchFormPage from "./pages/demo/FetchFormPage";
import RepeatingComponent from "./components/forms/essentials/form-components/RepeatingComponent";
import DoctorsObsChartPage from "./pages/formpages/DoctorsObsChartPage";


import PatientCreationPage from "./pages/formpages/PatientCreationPage";
import StaffCreationPage from "./pages/formpages/StaffCreationPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/create_staff" element={<Container page_name="Create Staff" child={<StaffCreationPage />} active_menu="Staff"/>} />

        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/create_patient" element={<Container page_name="Create Patient" child={<PatientCreationPage />} active_menu="Patients"/>} />
        <Route path="/patients/view_patient" element={<ViewPatient/>}/>
        <Route path="/patients/view_patient_visit" element={<ViewVisit/>}/>
        <Route path="/patients/add_visit" element={<AddVisit/>}/>
        <Route path="/patients/edit_visit" element={<EditVisit/>}/>


        <Route path="/patients/view_patient_visit/initial_assessment" element={<DoctorsInitialAssessmentFormPage/>}/>
        <Route path="/patients/view_patient_visit/medication_records" element={<MedicationRecordsPage/>}/>  
        <Route path="/patients/view_patient_visit/treatment_procedure_order" element={<TreatmentProcedureFormPage/>}/> 
        <Route path="/patients/view_patient_visit/vital_chart" element={<VitalChartFormPage/>}/> 
        <Route path="/patients/view_patient_visit/discharge_form" element={<DischargeFormPage/>}/>        


        <Route path="/analytics" element={<Analytics />} />
        <Route
          path="/dashboard/demo/repeatingform"
          element={
            <Container
              page_name="Page Title"
              child={<RepeatingFormPage />}
              active_menu="Repeating Form"
            />
          }
        />
        <Route
          path="/dashboard/demo/fetchform"
          element={
            <Container
              page_name="FetchForm"
              child={<FetchFormPage />}
              active_menu="Fetch Form"
            />
          }
        />
        <Route path="/test/repeat" element={<RepeatingComponent />} />
        <Route
          path="/dashboard/patientforms/doctorobschartform"
          element={
            <Container
              page_name="Doctor's Observation Chart"
              child={<DoctorsObsChartPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
