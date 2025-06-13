// import React, { useState } from "react";
// import { Book } from "lucide-react";
// import { Menu } from "lucide-react";
// import { Link } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import UserProfile from "./Userprofile";
// import UserSettings from "./UserSettings";
// import BookSearch from "./BookSearch";
// import "./Dashboard.css";

// const Dashboard: React.FC = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentView, setCurrentView] = useState<
//     "home" | "profile" | "settings"
//   >("home");

//   const renderContent = () => {
//     switch (currentView) {
//       case "profile":
//         return <UserProfile />;
//       case "settings":
//         return <UserSettings />;
//       default:
//         return <BookSearch />;
//     }
//   };

//   return (
//     <div
//       className={`dashboard-wrapper ${
//         sidebarOpen ? "sidebar-open" : "sidebar-closed"
//       }`}
//     >
//       {/* Top Navbar */}
//       <header className="dashboard-header">
//         <div className="dashboard-header-content">
//           <div className="dashboard-header-left">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="dashboard-menu-btn sidebar-toggle"
//               aria-label="Toggle sidebar"
//             >
//               <Menu className="menu-icon" />
//             </button>
//             <Book className="logo-icon" />
//             <h1 className="dashboard-title">BookHaven</h1>
//           </div>

//           <nav className="dashboard-nav">
//             <Link to="/" className="dashboard-nav-link">
//               Dashboard
//             </Link>
//             <Link to="/help center" className="dashboard-nav-link">
//               Help Center
//             </Link>
//             <Link to="/how to Download" className="dashboard-nav-link">
//               How to Download
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* Main layout: Sidebar + Content */}
//       <div className="dashboard-layout">
//         <Sidebar
//           isOpen={sidebarOpen}
//           onClose={() => setSidebarOpen(false)}
//           currentView={currentView}
//           onViewChange={setCurrentView}
//         />

//         <main className="dashboard-content">{renderContent()}</main>

//         {/* Overlay for mobile */}
//         {sidebarOpen && (
//           <div
//             className="sidebar-overlay"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import { Book, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import UserProfile from "./Userprofile";
import UserSettings from "./UserSettings";
import BookSearch from "./BookSearch";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<
    "home" | "profile" | "settings"
  >("home");

  const renderContent = () => {
    switch (currentView) {
      case "profile":
        return <UserProfile />;
      case "settings":
        return <UserSettings />;
      default:
        return <BookSearch />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full relative">
      {/* Top Navbar */}
      <header className="h-15 bg-white text-white flex items-center px-4 justify-around sticky top-0 z-30 shadow-sm shadow-purple-600">
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-purple-600 cursor-pointer p-2 rounded hover:bg-purple-50"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Book className="w-8 h-8 text-purple-600" />
            <h1 className="text-xl font-bold text-purple-800">BookHaven</h1>
          </div>

          <nav className="hidden md:flex">
            <Link
              to="/"
              className="text-purple-600 no-underline ml-4 p-2 hover:text-purple-800 hover:bg-purple-50"
            >
              Dashboard
            </Link>
            <Link
              to="/help center"
              className="text-purple-600 no-underline ml-4 p-2 hover:text-purple-800 hover:bg-purple-50"
            >
              Help Center
            </Link>
            <Link
              to="/how to Download"
              className="text-purple-600 no-underline ml-4 p-2 hover:text-purple-800 hover:bg-purple-50"
            >
              How to Download
            </Link>
          </nav>
        </div>
      </header>

      {/* Main layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        <main className="flex-1 bg-purple-50 p-4 overflow-y-auto transition-all duration-300">
          {renderContent()}
        </main>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 top-15 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
