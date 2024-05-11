import { setProperty } from "../../../services/setProperty";
import { Text } from "../../common/Text";
import { useEffect, useState } from "react";
import {
  BLACK_ROOT,
  DARK,
  DEFAULT_COLOR_BLACK,
  DEFAULT_COLOR_WHITE,
  TRANSITION,
  TRANSITION_ROOT,
  WHITE,
  WHITE_ROOT,
} from "../../common/constants/constants";

export const ThemeSwitcher = (props) => {
  const [theme, setTheme] = useState(props.userTheme || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setProperty(TRANSITION_ROOT, TRANSITION);
  }, []);

  const themeSwitcher = () => {
    setTheme((prevTheme) => (prevTheme === WHITE ? DARK : WHITE));
  };

  const globalTheme = () => {
    if (theme === WHITE) {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK);
    }

    if (theme === DARK) {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE);
    }
  };
  globalTheme();

  return (
    <div className="themeSwitcher">
      <input
        type="checkbox"
        name="switcher"
        id="switcher-input"
        className="switcher-input"
        onChange={() => globalTheme()}
      />
      <label
        className={`switcherLabel ${theme === WHITE ? "white" : ""}`}
        htmlFor="switcher-input"
        onClick={() => themeSwitcher()}
      >
        <Text className={`switcherToggler ${theme === WHITE ? "white" : ""}`} />
      </label>
    </div>
  );
};
