import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Landing";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ResetPassword from "./ResetPassword";
import HomePage from "./HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/dashboard" element={<Landing />} />

      <Route path="/" element={<Navigate to="/landing" replace />} />
      {/* optional: catch-all */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}
