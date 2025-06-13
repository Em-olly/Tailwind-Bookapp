// import React, { useState } from "react";
// import { Book } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";
// import AuthModal from "../Components/AuthModal";
// import Dashboard from "../Components/Dashboard";
// import "./WelcomePage.css"; // Import the external CSS

// const WelcomePage = () => {
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const [authMode, setAuthMode] = useState<"login" | "signup">("login");
//   const { user } = useAuth();

//   const handleAuthClick = (mode: "login" | "signup") => {
//     setAuthMode(mode);
//     setShowAuthModal(true);
//   };

//   if (user) {
//     return <Dashboard />;
//   }

//   return (
//     <div className="Welcome-container">
//       {/* Header */}
//       <header className="header">
//         <div className="logo-section">
//           <Book className="logo-icon" />
//           <h1 className="logo-text">BookHaven</h1>
//         </div>
//         <div className="auth-buttons">
//           <button
//             onClick={() => handleAuthClick("login")}
//             className="btn-outline"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => handleAuthClick("signup")}
//             className="btn-filled"
//           >
//             Sign Up
//           </button>
//         </div>
//       </header>

//       {/* Welcome Content */}
//       <div className="welcome-content">
//         <div className="welcome-box">
//           <Book className="welcome-icon" />
//           <h2 className="welcome-title">Welcome to BookHaven</h2>
//           <p className="welcome-description">
//             Discover your next favorite book, track your reading journey, and
//             connect with a community of book lovers. Start exploring thousands
//             of books from around the world.
//           </p>
//           <div className="welcome-buttons">
//             <button
//               onClick={() => handleAuthClick("signup")}
//               className="btn-filled large"
//             >
//               Get Started
//             </button>
//             <button
//               onClick={() => handleAuthClick("login")}
//               className="btn-outline large"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Auth Modal */}
//       {showAuthModal && (
//         <AuthModal
//           mode={authMode}
//           onClose={() => setShowAuthModal(false)}
//           onSwitchMode={() =>
//             setAuthMode(authMode === "login" ? "signup" : "login")
//           }
//         />
//       )}
//     </div>
//   );
// };

// export default WelcomePage;
import React, { useState } from "react";
import { Book } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import AuthModal from "../Components/AuthModal";
import Dashboard from "../Components/Dashboard";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <Book className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-800">BookHaven</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleAuthClick("login")}
            className="px-6 py-2 border border-purple-600 text-purple-600 rounded-lg bg-transparent transition-all duration-200 font-medium hover:bg-purple-600 hover:text-white"
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

      {/* Welcome Content - Now with perfectly centered icon */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8 text-center">
        <div className="max-w-2xl w-full">
          <div className="flex justify-center mb-6">
            <Book className="w-24 h-24 text-purple-600" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Welcome to BookHaven
          </h2>

          <p className="text-lg md:text-xl text-purple-600 leading-relaxed mb-8">
            Discover your next favorite book, track your reading journey, and
            connect with a community of book lovers. Start exploring thousands
            of books from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleAuthClick("signup")}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg text-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => handleAuthClick("login")}
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg text-lg font-medium hover:bg-purple-600 hover:text-white transition-colors"
            >
              Login
            </button>
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
