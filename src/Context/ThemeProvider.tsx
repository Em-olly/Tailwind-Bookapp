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
    const root = document.documentElement;

    root.classList.add('theme-transition');
    const timer = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);

    root.style.setProperty("--base-font-size", fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px");

    // Dark Blue Theming
    root.style.setProperty("--bg-color", theme === "dark" ? "#0a192f" : "#f3e8ff");
    root.style.setProperty("--text-color", theme === "dark" ? "#ccd6f6" : "#4a154b");
    root.style.setProperty("--card-bg", theme === "dark" ? "#112240" : "#ffffff");
    root.style.setProperty("--border-color", theme === "dark" ? "#233554" : "#e9d5ff");
    root.style.setProperty("--heading", theme === "dark" ? "#ffffff" : "#4a154b");
    root.style.setProperty("--secondary", theme === "dark" ? "#64ffda" : "#9333ea");

    return () => clearTimeout(timer);
  }, [theme, fontSize]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

