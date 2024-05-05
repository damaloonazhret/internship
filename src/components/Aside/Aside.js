import Arrows from "./Arrows/Arrows";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import Nav from "./Nav/Nav";
import style from "./aside.module.scss";
import { Component, memo } from "react";

class Aside extends Component {
  render() {
    return (
      <aside className={style.aside}>
        <Nav />
        <Arrows />
        <ThemeSwitcher
          colors={this.props.colors}
          setColors={this.props.setColors}
          theme={this.props.theme}
          setTheme={this.props.setTheme}
        />
      </aside>
    );
  }
}

export default memo(Aside);
