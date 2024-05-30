import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { Nav } from "./Nav/Nav";
import { Arrows } from "./Arrows/Arrows";
import {Colors, Themes} from "../App";

export interface AsideProps {
    theme: Themes,
    colors: Colors,
    setColors: (
        colors: (prevColors: Colors) => { secondary: string; primary: string },
    ) => void;
    setTheme: (theme: Themes) => void;
}

export const Aside = (props: AsideProps) => {
  return (
    <aside className="aside">
      <Nav />
      <Arrows />
      <ThemeSwitcher
        theme={props.theme}
        setTheme={props.setTheme}
        colors={props.colors}
        setColors={props.setColors}
      />
    </aside>
  );
};
