// Sidebar.tsx
import React from "react";
import "../Styles/Sidebar.css";
import { useAuth } from "../Context/useAuth";
import { Home, User, Settings, LogOut, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: "home" | "profile" | "settings";
  onViewChange: (view: "home" | "profile" | "settings") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentView,
  onViewChange,
}) => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar">
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <h2 className="sidebar-title">Menu</h2>
            <button
              onClick={onClose}
              className="sidebar-close-btn"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* User Info Section */}
          <div className="sidebar-user-info">
            <div className="sidebar-user-content">
              <div className="sidebar-user-avatar">
                <span className="text-white font-medium">
                  {user?.email?.charAt(0).toUpperCase() || ""}
                </span>
              </div>
              <div>
                <p className="sidebar-user-name">
                  {user?.email?.split("@")[0] || "Guest"}
                </p>
                <p className="sidebar-user-email">
                  {user?.email || "No email available"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`sidebar-nav-item ${
                      currentView === item.id ? "active" : ""
                    }`}
                    onClick={() => {
                      onViewChange(item.id as "home" | "profile" | "settings");
                      if (window.innerWidth < 768) onClose();
                    }}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="sidebar-logout">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
