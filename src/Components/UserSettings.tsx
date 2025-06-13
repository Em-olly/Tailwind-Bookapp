import React, { useState, useEffect } from "react";
import { Settings, Type, Palette, Save } from "lucide-react";

type FontSize = "small" | "medium" | "large";
type Theme = "light" | "dark";

const UserSettings: React.FC = () => {
  const [fontSize, setFontSize] = useState<FontSize>("medium");
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Load settings from localStorage
    const savedFontSize = localStorage.getItem("fontSize") as FontSize;
    const savedTheme = localStorage.getItem("theme") as Theme;

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("theme", theme);

    // Apply font size to document
    const root = document.documentElement;
    switch (fontSize) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
      default:
        root.style.fontSize = "16px";
    }

    // Apply theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Use native alert instead of toast
    alert("Your preferences have been updated successfully.");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-800">Settings</h1>
        </div>

        <div className="space-y-8">
          {/* Font Size Setting */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Type className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-800">
                Font Size
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(["small", "medium", "large"] as FontSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`p-4 rounded-lg border transition-colors duration-200 ${
                    fontSize === size
                      ? "border-purple-600 bg-[#F3E8FF] text-purple-800"
                      : "border-gray-200 hover:border-purple-300 text-[#9333EA]"
                  }`}
                >
                  <div
                    className={`font-medium ${
                      size === "small"
                        ? "text-sm"
                        : size === "large"
                        ? "text-lg"
                        : "text-base"
                    }`}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </div>
                  <div
                    className={`text-[#711EA2] ${
                      size === "small"
                        ? "text-xs"
                        : size === "large"
                        ? "text-sm"
                        : "text-xs"
                    }`}
                  >
                    Sample text
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Setting */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-800">Theme</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(["light", "dark"] as Theme[]).map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`p-4 rounded-lg border transition-colors duration-200 ${
                    theme === themeOption
                      ? "border-purple-600 bg-[#F3E8FF] text-purple-800"
                      : "border-gray-200 hover:border-purple-300 text-gray-700"
                  }`}
                >
                  <div className="font-medium">
                    {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                  </div>
                  <div
                    className={`w-full h-8 mt-2 rounded ${
                      themeOption === "light"
                        ? "bg-white border border-[#9333EA]"
                        : "bg-gray-800"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={saveSettings}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              <Save className="w-5 h-5" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
