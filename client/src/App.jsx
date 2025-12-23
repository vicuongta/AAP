import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ResetPassword from './ResetPassword';
import HomePage from './HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/dashboard" element={<Landing />} />
    </Routes>
  );
}

export default App;
