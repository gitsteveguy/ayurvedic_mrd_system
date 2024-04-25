import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome'
import Container from './components/Container';
import './App.css';

function App() {
  return (
    <Routes> 
          <Route index element={<Welcome />} />
          <Route path="/dashboard" element={<Container page_name='Dashboard' />} />

  </Routes>

  );
}

export default App;
