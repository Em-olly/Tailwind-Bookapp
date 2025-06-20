import React, { useState } from "react";
import { Book, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import UserProfile from "../Components/Userprofile";
import UserSettings from "../Components/UserSettings";
import BookSearch from "../Components/BookSearch";

const HomePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "profile" | "settings">("home");
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
      {/* Top Navbar  */}
      <header className="h-[70px] bg-white flex items-center sticky top-0 z-30 shadow-sm shadow-purple-600">
        <div className="w-full  flex justify-between items-center px-4">
          {/* Left-aligned items */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-purple-600 cursor-pointer p-2 rounded hover:bg-purple-50"
              aria-label="Toggle sidebar">
              <Menu className="w-8 h-8" />
            </button>
            <Book className="w-10 h-10 text-purple-600" />
            <h1 className="text-xl font-bold text-purple-800">BookHaven</h1>
          </div>

          {/* Right-aligned items*/}
          <nav className="hidden md:flex">
          
            <Link
              to="/help-center"
              className="text-purple-600 no-underline px-4 py-2 hover:text-purple-800 hover:bg-purple-50"
            >
              Help Center
            </Link>
            <Link to="/how-to-download" className="text-purple-600 no-underline px-4 py-2 hover:text-purple-800 hover:bg-purple-50" >
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
            className="fixed inset-0 bg-black/50 z-20 top-[60px] md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;