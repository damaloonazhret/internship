import Arrows from "./Arrows/Arrows";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import Nav from "./Nav/Nav";
import style from './aside.module.scss'

const Aside = () => {
  return (
    <aside className={style.aside}>
      <Nav />
      <Arrows />
      <ThemeSwitcher />
    </aside>
  );
};

export default Aside;
