import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import CreatePassword from "./pages/createPassword";
import Dashboard from "./pages/dashboard";
import YogaPage from "./pages/yoga";
import Cycle from "./pages/cycle";
import Login from "./pages/login";
import ProfileSetup from "./pages/profileSetup";
import Signup from "./pages/signup";
import DietPlanPage from "./pages/dietPlan";
import SymptomsPage from "./pages/symptoms";
import VerifyOtp from "./pages/verifyOtp";

const THEME_STORAGE_KEY = "shecare-theme";

// Root app wires up the router + route mapping.
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_STORAGE_KEY) ?? "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const isDarkMode = theme === "dark";

  return (
    <div className="app-shell">
      <div className="app-frame">
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          aria-pressed={isDarkMode}
          aria-label={`Turn ${isDarkMode ? "off" : "on"} dark mode`}
          title={`Turn ${isDarkMode ? "off" : "on"} dark mode`}
        >
          <span className="theme-toggle__icon" aria-hidden="true">
            {isDarkMode ? "🌙" : "☀"}
          </span>
          <span className="theme-toggle__track">
            <span className="theme-toggle__thumb" />
          </span>
          <span className="theme-toggle__label">
            {isDarkMode ? "Dark" : "Light"}
          </span>
        </button>
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
            <Route path="/yoga" element={<YogaPage />} />
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
