import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import FarmProfile from './pages/FarmProfile';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/onboarding" element={<Navigate to="/onboarding/1" replace />} />
          <Route path="/onboarding/:step" element={<Onboarding />} />
          <Route path="/farm/:id" element={<FarmProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}