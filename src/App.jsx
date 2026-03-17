import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import CreatePassword from "./pages/createPassword";
import Dashboard from "./pages/dashboard";
import Cycle from "./pages/cycle";
import Login from "./pages/login";
import ProfileSetup from "./pages/profileSetup";
import Signup from "./pages/signup";
import VerifyOtp from "./pages/verifyOtp";

function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          {/* Redirect root to signup */}
          <Route path="/" element={<Navigate to="/signup" />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/createPassword" element={<CreatePassword/>} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cycle" element={<Cycle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
