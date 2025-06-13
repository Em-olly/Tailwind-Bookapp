// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./hooks/useAuth.tsx";
// import WelcomePage from "./Pages/welcomePage.tsx";
// import NotFound from "./Pages/NotFound.tsx";
// import Dashboard from "./Components/Dashboard.tsx";

// const App = () => (
//   <AuthProvider>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<WelcomePage />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/dashboard/*" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   </AuthProvider>
// );

// export default App;
// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.tsx";
import WelcomePage from "./Pages/welcomePage.tsx";
import UserSettings from "./Components/UserSettings.tsx";
import NotFound from "./Pages/NotFound.tsx";
import Dashboard from "./Components/Dashboard.tsx";

const App = () => {
  useEffect(() => {
    const fontSize = localStorage.getItem("fontSize");
    const theme = localStorage.getItem("theme");

    // Apply font size
    if (fontSize) {
      switch (fontSize) {
        case "small":
          document.documentElement.style.fontSize = "14px";
          break;
        case "large":
          document.documentElement.style.fontSize = "18px";
          break;
        default:
          document.documentElement.style.fontSize = "16px";
      }
    }

    // Apply theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="settings" element={<UserSettings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
