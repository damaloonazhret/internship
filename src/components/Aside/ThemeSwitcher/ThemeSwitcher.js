import { useEffect } from "react";
import style from "./themeSwitcher.module.scss";
import { setProperty } from "../../../services/setProperty";
import {DARK} from "../../App";

const ThemeSwitcher = (props) => {
  const WHITE = "white";
  const BLACK_ROOT = "--black";
  const WHITE_ROOT = "--white";
  const TRANSITION_ALL = "--transition-all";
  const TRANSITION_VALUE = "0.4s all ease-in";

  useEffect(() => {
    setProperty(TRANSITION_ALL, TRANSITION_VALUE);
  }, []);

  const themeSwitcher = () => {
    const newTheme = props.theme === WHITE ? DARK : WHITE;
    props.setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    globalTheme(newTheme);
  };

  const globalTheme = (currentTheme) => {
    if (currentTheme === WHITE) {
      setProperty(BLACK_ROOT, props.colors.secondary);
      setProperty(WHITE_ROOT, props.colors.primary);
    } else {
      setProperty(BLACK_ROOT, props.colors.primary);
      setProperty(WHITE_ROOT, props.colors.secondary);
    }
  };

  globalTheme(props.theme);

  return (
    <div className={style.themeSwitcher}>
      <input
        type="checkbox"
        name="switcher"
        id="switcher-input"
        className="switcher-input"
        checked={props.theme === WHITE}
        onChange={themeSwitcher}
      />
      <label htmlFor="switcher-input" className={`${style.switcherLabel}`}>
        <span
          className={`${style.switcherToggler} ${
            props.theme === WHITE ? style.switcherTogglerWhite : ""
          }`}
        ></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
