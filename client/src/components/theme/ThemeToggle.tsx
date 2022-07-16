import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Theme, ThemeContext } from "./ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <div className="absolute right-0 top-0 mr-4 mt-4 md:mr-6 md:mt-6 z-50">
      <div className="transition duration-500 ease-in-out rounded-full p-2">
        {theme === "dark" ? (
          <FaSun
            onClick={() => setTheme(Theme.light)}
            className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
          />
        ) : (
          <FaMoon
            onClick={() => setTheme(Theme.dark)}
            className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
