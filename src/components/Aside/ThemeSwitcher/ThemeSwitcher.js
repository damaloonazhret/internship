import { setProperty } from "../../../services/styles/setProperty";
import { Text } from "../../common/InfoText/Text";
import { useEffect, useLayoutEffect, useMemo } from "react";
import {
  DARK,
  TRANSITION,
  TRANSITION_ROOT,
  WHITE,
} from "../../constants/constants";
import { setGlobalTheme } from "../../../services/styles/setGlobalTheme";
import { setFontSize } from "../../../services/styles/setFontSize";
import './index.scss';

export const ThemeSwitcher = ({ colors, setColors, theme, setTheme }) => {
  const colorS = localStorage.getItem("secondary");
  const colorP = localStorage.getItem("primary");

  setGlobalTheme(theme, colors);
  setFontSize();

  useEffect(() => {
    setProperty(TRANSITION_ROOT, TRANSITION);
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
    const newTheme = theme === WHITE ? DARK : WHITE;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setGlobalTheme(newTheme, colors);
  };

  const switcherLabelClass = useMemo(() => {
    return `switcherLabel ${theme === WHITE ? "white" : ""}`;
  }, [theme]);

  const switcherTogglerClass = useMemo(() => {
    return `switcherToggler ${theme === WHITE ? "white" : ""}`;
  }, [theme]);

  return (
    <div className="themeSwitcher">
      <input
        type="checkbox"
        name="switcher"
        id="switcher-input"
        className="switcher-input"
        onChange={() => setGlobalTheme(theme, colors)}
      />
      <label
        className={switcherLabelClass}
        htmlFor="switcher-input"
        onClick={() => themeSwitcher()}
      >
        <Text className={switcherTogglerClass} />
      </label>
    </div>
  );
};
