import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.tsx";
import {ThemeProvider} from "./Context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
  </React.StrictMode>
);
