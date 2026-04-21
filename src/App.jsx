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
import AddDailyEntryPage from "./pages/addDailyEntry";

const THEME_STORAGE_KEY = "shecare-theme";
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_STORAGE_KEY) ?? "system");

  useEffect(() => {
    const applyTheme = () => {
      const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
      document.documentElement.setAttribute("data-theme", resolvedTheme);
    };

    applyTheme();
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (theme !== "system") {
      return undefined;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <div className="app-shell">
      <div className="app-frame">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signup" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/createPassword" element={<CreatePassword />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />

            <Route path="/dashboard" element={<Dashboard theme={theme} onThemeChange={setTheme} />} />
            <Route path="/yoga" element={<YogaPage />} />
            <Route path="/cycle" element={<Cycle />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/diet-plan" element={<DietPlanPage />} />
            <Route path="/add-entry" element={<AddDailyEntryPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
