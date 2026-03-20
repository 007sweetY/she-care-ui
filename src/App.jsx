import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import CreatePassword from "./pages/createPassword";
import Dashboard from "./pages/dashboard";
import Cycle from "./pages/cycle";
import Login from "./pages/login";
import ProfileSetup from "./pages/profileSetup";
import Signup from "./pages/signup";
import DietPlanPage from "./pages/dietPlan";
import SymptomsPage from "./pages/symptoms";
import VerifyOtp from "./pages/verifyOtp";

// Root app wires up the router + route mapping.
function App() {
  return (
    <div className="app-shell">
      <div className="app-frame">
        <BrowserRouter>
          <Routes>
            {/* Redirect root to signup */}
            <Route path="/" element={<Navigate to="/signup" />} />

            {/* Authentication + onboarding stack */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/createPassword" element={<CreatePassword />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />

            {/* Core app screens */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cycle" element={<Cycle />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/diet-plan" element={<DietPlanPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
