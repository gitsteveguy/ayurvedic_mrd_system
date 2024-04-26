import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome'
import Container from './components/Container';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Routes> 
          <Route index element={<Welcome />} />
          <Route path="/dashboard" element={<Container page_name='Dashboard' />} />
          <Route path="/login" element={<Login />} />

  </Routes>

  );
}

export default App;
