import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard';
import Staff from './pages/Staff';
import Patients from './pages/Patients';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import RepeatingFormPage from './pages/demo/RepeatingFormPage';
import Container from './components/Container';
import FetchFormPage from './pages/demo/FetchFormPage';
import RepeatingComponent from './components/forms/essentials/form-components/RepeatingComponent';
import DoctorsObsChartPage from './pages/formpages/DoctorsObsChartPage';
import './App.css';

function App() {
  return (
    <Routes> 
          <Route index element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/staff" element={<Staff />}/>
          <Route path="/patients" element={<Patients />}/>
          <Route path="/analytics" element={<Analytics />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/demo/repeatingform" element={<Container page_name='Page Title' child={<RepeatingFormPage/>} active_menu='Repeating Form'/>} />
          <Route path="/dashboard/demo/fetchform" element={<Container page_name='FetchForm' child={<FetchFormPage/>} active_menu='Fetch Form'/>} />
          <Route path="/test/repeat" element={<RepeatingComponent />} />
          <Route path="/dashboard/patientforms/doctorobschartform" element={<Container page_name="Doctor's Observation Chart" child={<DoctorsObsChartPage/>} /> } />

  </Routes>

  );
}

export default App;
