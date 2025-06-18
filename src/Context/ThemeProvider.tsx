// ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = "light" | "dark";
export type FontSize = "small" | "medium" | "large";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");
    return (savedTheme === "light" || savedTheme === "dark") ? savedTheme : "light";
  });
  
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const savedFontSize = localStorage.getItem("fontSize");
    return (savedFontSize === "small" || savedFontSize === "medium" || savedFontSize === "large") 
      ? savedFontSize 
      : "medium";
  });

  useEffect(() => {
    // Apply theme class to document
    if (theme === "dark") {
      document.documentElement.classList.add("dark-theme");
      document.documentElement.classList.remove("light-theme");
    } else {
      document.documentElement.classList.add("light-theme");
      document.documentElement.classList.remove("dark-theme");
    }
    
    // Apply font size
    const root = document.documentElement;
    root.style.setProperty(
      "--base-font-size",
      fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px"
    );
    
    // Update CSS variables
    root.style.setProperty("--bg-color", theme === "dark" ? "#1a1a2e" : "#f3e8ff");
    root.style.setProperty("--text-color", theme === "dark" ? "#ffffff" : "#4a154b");
    root.style.setProperty("--card-bg", theme === "dark" ? "#16213e" : "#ffffff");
    root.style.setProperty("--border-color", theme === "dark" ? "#0f3460" : "#e9d5ff");
    root.style.setProperty("--heading", theme === "dark" ? "#ffffff" : "#4a154b");
    root.style.setProperty("--secondary", theme === "dark" ? "#c4b5fd" : "#9333ea");
    
  }, [theme, fontSize]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};