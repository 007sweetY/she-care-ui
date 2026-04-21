import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../components/ProfileIcon";
import ProfileSidebar from "../components/ProfileSidebar";

function HomePage({ theme = "system", onThemeChange = () => {} }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSidebarOpen(false);
    navigate("/login");
  };

  return (
    <>
      <header>
        <div>
          <ProfileIcon isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen((prev) => !prev)} />
        </div>
      </header>

      <ProfileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={{ name: "SheCare Member", email: "member@shecare.app" }}
        theme={theme}
        onThemeChange={onThemeChange}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
    </>
  );
}

export default HomePage;
