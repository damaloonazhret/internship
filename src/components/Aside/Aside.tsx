import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { Nav } from "./Nav/Nav";
import { Arrows } from "./Arrows/Arrows";

export const Aside = () => {
  return (
    <aside className="aside">
      <Nav />
      <Arrows />
      <ThemeSwitcher />
    </aside>
  );
};
