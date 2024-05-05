import Arrows from "./Arrows/Arrows";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import Nav from "./Nav/Nav";
import style from "./aside.module.scss";

const Aside = (props) => {
  return (
    <aside className={style.aside}>
      <Nav />
      <Arrows />
      <ThemeSwitcher
        colors={props.colors}
        setColors={props.setColors}
        theme={props.theme}
        setTheme={props.setTheme}
      />
    </aside>
  );
};

export default Aside;
