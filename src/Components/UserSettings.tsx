import React, { useState } from "react";
import { Settings, Type, Palette, Save } from "lucide-react";
import { useTheme } from "../Context/ThemeProvider";
import { Theme, FontSize } from "../Context/ThemeProvider";

const UserSettings: React.FC = () => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  const [showFeedback, setShowFeedback] = useState(false);
  
  const saveSettings = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-card-bg rounded-xl shadow p-6 border-border-color border">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="text-secondary" />
          <h1 className="text-xl font-bold text-heading">Settings</h1>
        </div>

        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Type className="text-secondary" />
              <h3 className="font-semibold text-heading">Font Size</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["small", "medium", "large"] as FontSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`p-3 rounded border ${
                    fontSize === size
                      ? "border-secondary bg-purple-50"
                      : "border-border-color"
                  }`}
                >
                  <div className={`${size === "small" ? "text-sm" : size === "large" ? "text-lg" : ""} text-secondary`}>
                    {size}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Palette className="text-secondary" />
              <h3 className="font-semibold text-heading">Theme</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(["light", "dark"] as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`p-3 rounded border ${
                    theme === t
                      ? "border-secondary bg-purple-50"
                      : "border-border-color"
                  }`}
                >
                  <div className="capitalize text-secondary">{t}</div>
                  <div className={`w-full h-6 mt-1 rounded ${
                    t === "light" ? "bg-gray-100" : "bg-gray-800"
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={saveSettings}
            className="w-full flex justify-center items-center gap-2 py-2 bg-secondary text-white rounded-lg hover:bg-purple-700"
          >
            <Save size={16} />
            Save Settings
          </button>
          
          {showFeedback && (
            <div className="text-center text-green-600 animate-fadeIn">
              Settings saved!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;