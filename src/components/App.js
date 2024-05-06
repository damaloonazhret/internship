import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import { useState } from "react";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";
import Header from "./Header/Header";

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

  const [async, setAsync] = useState({});
  const [promise, setPromise] = useState({});
  const [asyncInputValue, setAsyncInputValue] = useState("");
  const [promiseInputValue, setPromiseInputValue] = useState("");

  return (
    <Router>
      <Header
        asyncInputValue={asyncInputValue}
        setAsyncInputValue={setAsyncInputValue}
        promiseInputValue={promiseInputValue}
        setPromiseInputValue={setPromiseInputValue}
        setAsync={setAsync}
        setPromise={setPromise}
      />
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
        async={async}
        promise={promise}
      />
    </Router>
  );
}

export default App;
