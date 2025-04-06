import React, { useContext } from "react";
import DarkModeContext from "../../context/DarkModeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(DarkModeContext);

  return (
    <button
      onClick={toggleTheme}
      className="w-11 h-11 bg-gray-200 first-line:flex items-center justify-center rounded-lg transition-all duration-300 shadow-md hover:scale-105 dark:bg-neutral-700"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;
