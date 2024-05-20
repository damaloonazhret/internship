import { BrowserRouter as Router } from "react-router-dom";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";
import "../index.scss";
import {useState} from "react";

export const App = () => {
  function initialTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) return theme;
    return "dark";
  }

  const [theme, setTheme] = useState(initialTheme);

  const [colors, setColors] = useState({
    primary: "#1a1a1a",
    secondary: "#ffffff",
  });

  return (
    <Router>
      <Aside theme={theme} setTheme={setTheme} colors={colors} setColors={setColors} />
      <Main theme={theme} setTheme={setTheme} colors={colors} setColors={setColors} />
    </Router>
  );
};
