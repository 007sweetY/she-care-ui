import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import CreatePassword from "./pages/createPassword";
import VerifyOtp from "./pages/verifyOtp";
import ProfileSetup from "./pages/profileSetup";
import "./index.css";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
