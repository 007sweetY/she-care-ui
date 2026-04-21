import { UserCircle2 } from "lucide-react";

function ProfileIcon({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className="profile-icon-btn"
      onClick={onClick}
      aria-label={isOpen ? "Close profile settings" : "Open profile settings"}
      aria-expanded={isOpen}
      aria-controls="profile-sidebar"
    >
      <UserCircle2 size={26} aria-hidden="true" />
    </button>
  );
}

export default ProfileIcon;
