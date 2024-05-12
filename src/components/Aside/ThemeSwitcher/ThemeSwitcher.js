import { setProperty } from "../../../services/styles/setProperty";
import { Text } from "../../common/Text";
import { useEffect, useState } from "react";
import {
  DARK,
  TRANSITION,
  TRANSITION_ROOT,
  WHITE,
} from "../../common/constants/constants";
import { setGlobalTheme } from "../../../services/styles/setGlobalTheme";

export const ThemeSwitcher = (props) => {
  const [theme, setTheme] = useState(props.userTheme || "dark");
  setGlobalTheme(theme);

  useEffect(() => {
    setProperty(TRANSITION_ROOT, TRANSITION);
  }, []);

  const themeSwitcher = () => {
    const newTheme = theme === WHITE ? DARK : WHITE;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

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
        className={`switcherLabel ${theme === WHITE ? "white" : ""}`}
        htmlFor="switcher-input"
        onClick={() => themeSwitcher()}
      >
        <Text className={`switcherToggler ${theme === WHITE ? "white" : ""}`} />
      </label>
    </div>
  );
};
