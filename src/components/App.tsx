import { BrowserRouter as Router } from "react-router-dom";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";
import "../index.scss";
import { useState } from "react";

export interface Colors {
  primary: string;
  secondary: string;
}

export type Themes = 'dark' | 'white'

export const App = () => {
  function initialTheme(): Themes {
    const theme = localStorage.getItem("theme");
    if (theme === 'dark' || theme === 'white') return theme;
    return "dark";
  }

  const [theme, setTheme] = useState<Themes>(initialTheme);

  const [colors, setColors] = useState<Colors>({
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
        setTheme={setTheme}
        colors={colors}
        setColors={setColors}
      />
    </Router>
  );
};
