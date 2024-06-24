import { ThemeSwitcher } from "components/Aside/ThemeSwitcher";
import { Nav } from "components/Aside/Nav";
import { Arrows } from "components/Aside/Arrows";

export const Aside = () => {
  return (
    <aside className="aside">
      <Nav />
      <Arrows />
      <ThemeSwitcher />
    </aside>
  );
};
