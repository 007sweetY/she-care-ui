import { useMemo, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Brush,
  CircleHelp,
  LogOut,
  Monitor,
  Moon,
  Shield,
  Smartphone,
  Sun,
  User,
  X
} from "lucide-react";
import "./ProfileSidebar.css";

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const menuItems = [
  { id: "profile", label: "Your Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Brush },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "devices", label: "Connected Devices", icon: Smartphone },
  { id: "support", label: "Support & Help", icon: CircleHelp }
];

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System default", icon: Monitor }
];

function ProfileSidebar({
  isOpen,
  onClose,
  user,
  theme,
  onThemeChange,
  isLoggedIn,
  onLogout
}) {
  const sidebarRef = useRef(null);
  const [activeItem, setActiveItem] = useState("profile");

  const initials = useMemo(() => {
    const name = user?.name?.trim();
    if (!name) return "SC";

    const parts = name.split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase()).join("");
  }, [user?.name]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return undefined;

    const focusableElements = sidebarRef.current.querySelectorAll(focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="profile-sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-hidden="true"
          />

          <motion.aside
            id="profile-sidebar"
            ref={sidebarRef}
            className="profile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="Profile settings sidebar"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="profile-sidebar__header">
              <div className="profile-sidebar__user-row">
                <div className="profile-sidebar__avatar" aria-hidden="true">
                  {initials}
                </div>
                <div>
                  <p className="profile-sidebar__name">{user?.name ?? "SheCare Member"}</p>
                  <p className="profile-sidebar__email">{user?.email ?? "member@shecare.app"}</p>
                </div>
              </div>
              <button
                type="button"
                className="profile-sidebar__close"
                onClick={onClose}
                aria-label="Close settings sidebar"
              >
                <X size={18} />
              </button>
            </header>

            <div className="profile-sidebar__content">
              <nav className="profile-sidebar__menu" aria-label="Settings sections">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`profile-sidebar__menu-item ${isActive ? "is-active" : ""}`}
                      onClick={() => setActiveItem(item.id)}
                      aria-label={item.label}
                    >
                      <span className="profile-sidebar__menu-icon" aria-hidden="true">
                        <Icon size={16} />
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <section className="profile-sidebar__appearance" aria-label="Appearance settings">
                <h3>Appearance</h3>
                <p>Choose your theme preference</p>

                <div className="profile-sidebar__theme-switch" role="radiogroup" aria-label="Theme mode">
                  {themeOptions.map((option) => {
                    const Icon = option.icon;
                    const checked = theme === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        aria-label={`Use ${option.label} theme`}
                        className={`profile-sidebar__theme-option ${checked ? "is-selected" : ""}`}
                        onClick={() => onThemeChange(option.value)}
                      >
                        <Icon size={15} aria-hidden="true" />
                        <span>{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>

            {isLoggedIn && (
              <footer className="profile-sidebar__footer">
                <button type="button" className="profile-sidebar__logout" onClick={onLogout} aria-label="Logout">
                  <LogOut size={16} aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProfileSidebar;
