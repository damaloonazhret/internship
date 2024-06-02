import { BrowserRouter as Router } from "react-router-dom";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";
import { useState } from "react";
import "../index.scss";

export interface ThemeColorsState {
  primary: string;
  secondary: string;
}

export type SetColorsState = (
    colors: (prevColors: ThemeColorsState) => { secondary: string; primary: string },
) => void;

export type ThemeState = 'dark' | 'white'

export type SetThemeState = (theme: ThemeState) => void;

export const App = () => {
  function initialTheme(): ThemeState {
    const theme = localStorage.getItem("theme");
    if (theme === 'dark' || theme === 'white') return theme;
    return "dark";
  }

  const [theme, setTheme] = useState<ThemeState>(initialTheme);

  const [colors, setColors] = useState<ThemeColorsState>({
    primary: "#1a1a1a",
    secondary: "#ffffff",
  });

  return (
    <Router>
      <Aside
        theme={theme}
        setTheme={setTheme}
        colors={colors}
        setColors={setColors}
      />
      <Main
        theme={theme}
        colors={colors}
        setColors={setColors}
      />
    </Router>
  );
};
