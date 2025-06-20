
// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/useAuth.tsx";
import WelcomePage from "./Pages/WelcomePage.tsx";
import UserSettings from "./Components/UserSettings.tsx";
import HomePage from "./Pages/Homepage.tsx";
import BookReader from "./Components/BookReader.tsx";
import NotFound from "./Pages/NotFound.tsx";
import HelpCenter from "./Pages/HelpCenter.tsx";
import BookSearch  from "./Components/BookSearch.tsx";
import { ThemeProvider } from "./Context/ThemeProvider.tsx";
import "./index.css"

const App = () => {


  return (

    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/dashboard/*" element={<HomePage/>} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/search" element={<BookSearch />} />
            <Route path="/book/:bookKey" element={<BookReader />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
