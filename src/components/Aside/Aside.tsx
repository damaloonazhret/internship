import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { Nav } from "./Nav/Nav";
import { Arrows } from "./Arrows/Arrows";
import { ThemeColorsState, SetColorsState, SetThemeState, ThemeState } from "../App";
import { FC } from "react";

export interface AsideProps {
  theme: ThemeState;
  colors: ThemeColorsState;
  setColors: SetColorsState;
  setTheme: SetThemeState;
}

export const Aside: FC<AsideProps> = ({
  theme,
  setTheme,
  colors,
  setColors,
}) => {
  return (
    <aside className="aside">
      <Nav />
      <Arrows />
      <ThemeSwitcher
        theme={theme}
        setTheme={setTheme}
        colors={colors}
        setColors={setColors}
      />
    </aside>
  );
};
