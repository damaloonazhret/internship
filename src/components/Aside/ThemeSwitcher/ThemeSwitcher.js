import {memo, useEffect, useLayoutEffect} from "react";
import style from "./themeSwitcher.module.scss";
import { setProperty } from "../../../services/setProperty";
import { DARK } from "../../App";
import {setFontSize} from "../../../services/setFontSize";
import {setGlobalTheme} from "../../../services/setGlobalTheme";
export const WHITE = "white";

const ThemeSwitcher = (props) => {
  const TRANSITION_ALL = "--transition-all";
  const TRANSITION_VALUE = "0.4s all ease-in";
  const colorS = localStorage.getItem("secondary");
  const colorP = localStorage.getItem("primary");
  const { colors, setColors } = props;

  setGlobalTheme(props.theme, props.colors);
  setFontSize();

  useEffect(() => {
    setTimeout(() => {
      setProperty(TRANSITION_ALL, TRANSITION_VALUE);
    }, 0);
  }, []);

  useLayoutEffect(() => {
    const newColors = { ...colors };

    if (colorP && colors.primary !== colorP) newColors.primary = colorP;
    if (colorS && colors.secondary !== colorS) newColors.secondary = colorS;

    if (
      newColors.primary !== colors.primary ||
      newColors.secondary !== colors.secondary
    ) {
      setColors((prevColors) => ({
        ...prevColors,
        ...newColors,
      }));
    }
  }, [colorP, colorS, colors, setColors]);

  const themeSwitcher = () => {
    const newTheme = props.theme === WHITE ? DARK : WHITE;
    props.setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setGlobalTheme(newTheme, props.colors);
  };

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

export default memo(ThemeSwitcher);
