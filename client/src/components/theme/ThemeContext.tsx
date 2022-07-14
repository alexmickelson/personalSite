import React, { FC, ReactNode } from "react";

export enum Theme {
  light = "light",
  dark = "dark",
}
const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (typeof storedPrefs === "string") {
      return storedPrefs === "light" ? Theme.light : Theme.dark;
    }

    const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
    if (userMedia.matches) {
      return Theme.dark;
    }
  }

  return Theme.dark; // light theme as the default;
};

const initialValues = {
  theme: Theme.dark,
  setTheme: (t: Theme) => {},
};
export const ThemeContext = React.createContext(initialValues);

export const ThemeProvider: FC<{
  initialTheme: Theme;
  children: ReactNode;
}> = ({ initialTheme, children }) => {
  const [theme, setTheme] = React.useState(getInitialTheme());

  const rawSetTheme = (theme: Theme) => {
    const root = window.document.documentElement;
    const isDark = theme === Theme.dark;

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
