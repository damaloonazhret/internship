import { BrowserRouter as Router } from "react-router-dom";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";
import "../index.scss";
import { useState } from "react";
import { DARK } from "./common/constants/constants";

export const App = () => {
  const [theme, setTheme] = useState(() => {
    const themeColor = localStorage.getItem("theme");
    return themeColor || DARK;
  });
  const [colors, setColors] = useState({
    primary: "#1a1a1a",
    secondary: "#ffffff",
  });

  return (
    <Router>
      <Aside
        colors={colors}
        setColors={setColors}
        theme={theme}
        setTheme={setTheme}
      />
      <Main
        colors={colors}
        setColors={setColors}
        theme={theme}
        setTheme={setTheme}
      />
    </Router>
  );
};
