import { setProperty } from "../../../services/styles/setProperty";
import { Text } from "../../common/InfoText/Text";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {
  DARK,
  TRANSITION, TRANSITION_NONE,
  TRANSITION_ROOT,
  WHITE,
} from "../../common/constants/constants";
import { setGlobalTheme } from "../../../services/styles/setGlobalTheme";

export const ThemeSwitcher = () => {
  function initialTheme () {
    const theme = localStorage.getItem("theme");
    if (theme) return theme;
    return "dark";
  }
  const [theme, setTheme] = useState(initialTheme);
  setGlobalTheme(theme);

  useLayoutEffect(() => {
    setProperty(TRANSITION_ROOT, TRANSITION_NONE)
  }, []);

  useEffect(() => {
    setProperty(TRANSITION_ROOT, TRANSITION);
  }, []);

  const themeSwitcher = () => {
    const newTheme = theme === WHITE ? DARK : WHITE;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
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
        onChange={() => setGlobalTheme(theme)}
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
