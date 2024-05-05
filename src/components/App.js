import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import {useState} from "react";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";

export const DARK = "dark";

function App() {
  const [colors, setColors] = useState({
    primary: "#1a1a1a",
    secondary: "#ffffff",
  });

  const [theme, setTheme] = useState(() => {
    const themeColor = localStorage.getItem("theme");
    return themeColor || DARK;
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
}

export default App;
