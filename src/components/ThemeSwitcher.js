// src/components/ThemeSwitcher.jsx
import React, { useState } from "react";

const themes = {
  option1: {
    "--bg-color": "#f9fafc",
    "--text-color": "#0d1b2a",
    "--primary": "#1a73e8",
    "--secondary": "#64748b",
    "--card-bg": "#ffffff",
    "--accent": "#4dabf7",
    "--gradient": "linear-gradient(135deg, #e0f2fe, #f9fafc)",
  },
  option2: {
    "--bg-color": "#fefcfb",
    "--text-color": "#1b4332",
    "--primary": "#2d6a4f",
    "--secondary": "#b08968",
    "--card-bg": "#ffffff",
    "--accent": "#74c69d",
    "--gradient": "linear-gradient(135deg, #e6f9f1, #fefcfb)",
  },
  option3: {
    "--bg-color": "#faf7ff",
    "--text-color": "#2e1065",
    "--primary": "#7c3aed",
    "--secondary": "#f97316",
    "--card-bg": "#ffffff",
    "--accent": "#9333ea",
    "--gradient": "linear-gradient(135deg, #ede9fe, #faf7ff)",
  },
};

const ThemeSwitcher = () => {
  const [selectedTheme, setSelectedTheme] = useState("option2");
  const [darkMode, setDarkMode] = useState(false);

  const applyTheme = (themeKey, dark = darkMode) => {
    const theme = themes[themeKey];
    Object.keys(theme).forEach((varName) => {
      document.documentElement.style.setProperty(varName, theme[varName]);
    });
    setSelectedTheme(themeKey);

    if (dark) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  const toggleDark = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    applyTheme(selectedTheme, newDark);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-[var(--card-bg)] shadow-lg p-3 rounded-lg flex gap-2 z-50">
      <select
        value={selectedTheme}
        onChange={(e) => applyTheme(e.target.value)}
        className="px-3 py-2 border rounded bg-[var(--bg-color)] text-[var(--text-color)]"
      >
        <option value="option1">Royal Navy</option>
        <option value="option2">Emerald Green</option>
        <option value="option3">Purple Coral</option>
      </select>
      <button
        onClick={toggleDark}
        className="px-3 py-2 rounded bg-[var(--primary)] text-white"
      >
        {darkMode ? "🌙 Dark" : "🌞 Light"}
      </button>
    </div>
  );
};

export default ThemeSwitcher;