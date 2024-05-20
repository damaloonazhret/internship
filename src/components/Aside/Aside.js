import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { Nav } from "./Nav/Nav";
import { Arrows } from "./Arrows/Arrows";

export const Aside = (props) => {
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
