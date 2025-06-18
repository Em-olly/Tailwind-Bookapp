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
import { AuthProvider } from "./Context/useAuth.tsx";
import WelcomePage from "./Pages/WelcomePage.tsx";
import UserSettings from "./Components/UserSettings.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import BookReader from "./Components/BookReader.tsx";
import NotFound from "./Pages/NotFound.tsx";
import HelpCenter from "./Pages/HelpCenter.tsx";

const App = () => {
  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/book/:bookKey" element={<BookReader />} />
          <Route path="settings" element={<UserSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
