import { Component, createElement } from "react";
import style from "./index.module.scss";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { Nav } from "./Nav/Nav";
import { Arrows } from "./Arrows/Arrows";

export class Aside extends Component {
  render() {
    return createElement(
      "aside",
      { className: style.aside },
      createElement(Nav, null),
      createElement(Arrows, null),
      createElement(ThemeSwitcher, null),
    );
  }
}
