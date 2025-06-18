import React, { useState } from "react";
import { Book } from "lucide-react";
import { useAuth } from "../Context/useAuth";
import AuthModal from "../Components/AuthModal";
import Dashboard from "../Pages/Dashboard";

const WelcomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const { user } = useAuth();

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 font-sans overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50" >
         <source src="/videos/6334041-uhd_4096_2160_25fps.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-indigo-900/70" />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center gap-3">
            <Book className="w-10 h-10 text-purple-300" />
            <h1 className="text-2xl font-bold text-purple-100">BookHaven</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleAuthClick("login")}
              className="px-6 py-2 border border-purple-300 text-purple-100 rounded-lg bg-transparent transition-all duration-200 font-medium hover:bg-purple-700 hover:text-white"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthClick("signup")}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg border-none font-medium transition-colors duration-200 hover:bg-purple-700"
            >
              Sign Up
            </button>
          </div>
        </header>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
          <div className="max-w-2xl w-full">
            <div className="flex justify-center mb-6">
              <Book className="w-24 h-24 text-purple-300" />
            </div>
             <h2 className="text-4xl md:text-5xl font-bold text-purple-100 mb-4"> Welcome to BookHaven</h2>
             <p className="text-lg md:text-xl text-purple-200 leading-relaxed mb-8">
              Discover your next favorite book, track your reading journey, and
              connect with a community of book lovers. Start exploring thousands
              of books from around the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => handleAuthClick("signup")}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors">
                Get Started
              </button>
              <button onClick={() => handleAuthClick("login")}
                className="px-8 py-3 border-2 border-purple-300 text-purple-100 rounded-lg text-lg font-medium hover:bg-purple-700 hover:text-white transition-colors">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={() =>
            setAuthMode(authMode === "login" ? "signup" : "login")
          }
        />
      )}
    </div>
  );
};

export default WelcomePage;

