import { Component, createElement } from "react";
import style from "./index.module.scss";

export class ThemeSwitcher extends Component {
  render() {
    return createElement(
      "div",
      { className: style.themeSwitcher },
      createElement("input", {
        type: "checkbox",
        name: "switcher",
        id: "switcher-input",
        className: "switcher-input",
      }),
      createElement(
        "label",
        { className: style.switcherLabel, htmlFor: "switcher-input" },
        createElement("span", { className: style.switcherToggler }),
      ),
    );
  }
}
