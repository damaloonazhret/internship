import { useEffect, useState } from "react";
import style from "./themeSwitcher.module.scss";
import { setProperty } from "../../../services/setProperty";

const ThemeSwitcher = () => {
  const DARK = "dark";
  const WHITE = "white";
  const BLACK_ROOT = "--black";
  const WHITE_ROOT = "--white";
  const TRANSITION_ALL = "--transition-all";
  const DEFAULT_COLOR_WHITE = "#ffffff";
  const DEFAULT_COLOR_BLACK = "#1a1a1a";
  const TRANSITION_VALUE = "0.4s all ease-in";

  const [theme, setTheme] = useState(() => {
    const themeColor = localStorage.getItem("theme");
    return themeColor || DARK;
  });

  useEffect(() => {
    setProperty(TRANSITION_ALL, TRANSITION_VALUE);
  }, []);

  const themeSwitcher = () => {
    const newTheme = theme === WHITE ? DARK : WHITE;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    globalTheme(newTheme);
  };

  const globalTheme = (currentTheme) => {
    if (currentTheme === WHITE) {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK);
    } else {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE);
    }
  };

  globalTheme(theme);

  return (
    <div className={style.themeSwitcher}>
      <input
        type="checkbox"
        name="switcher"
        id="switcher-input"
        className="switcher-input"
        checked={theme === WHITE}
        onChange={themeSwitcher}
      />
      <label
        htmlFor="switcher-input"
        className={`${style.switcherLabel}`}
      >
        <span
          className={`${style.switcherToggler} ${
            theme === WHITE ? style.switcherTogglerWhite : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
