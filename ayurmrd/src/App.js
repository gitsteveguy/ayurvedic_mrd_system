import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TestPage from './pages/TestPage';
import Container from './components/Container';
import './App.css';

function App() {
  return (
    <Routes> 
          <Route index element={<Welcome />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/test" element={<Container page_name='Page Title' child={<TestPage/>}/>} />

  </Routes>

  );
}

export default App;
