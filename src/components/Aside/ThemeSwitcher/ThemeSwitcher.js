import { useState } from "react";
import style from "./themeSwitcher.module.scss";

const ThemeSwitcher = () => {
  const DARK = "dark";
  const WHITE = "white";

  const [theme, setTheme] = useState(DARK);

  const themeSwitcher = () => {
    theme === WHITE ? setTheme(DARK) : setTheme(WHITE);
  };

  const setProperty = (root, color) => {
    document.documentElement.style.setProperty(root, color);
  };

  const globalTheme = () => {
    const BLACK_ROOT = "--black";
    const WHITE_ROOT = "--white";
    const DEFAULT_COLOR_WHITE = "#ffffff";
    const DEFAULT_COLOR_BLACK = "#1a1a1a";

    if (theme === WHITE) {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK);
    }

    if (theme === DARK) {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE);
    }
  };

  return (
    <div className={style.themeSwitcher}>
      <input
        type="checkbox"
        name="switcher"
        id="switcher-input"
        className="switcher-input"
        onChange={() => globalTheme()}
      />
      <label
        htmlFor="switcher-input"
        className={`${style.switcherLabel} ${theme === WHITE ? "white" : ""}`}
        onClick={() => themeSwitcher()}
      >
        <span
          className={`${style.switcherToggler} ${theme === WHITE ? "white" : ""}`}
        ></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
