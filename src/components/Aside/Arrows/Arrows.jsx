import { Component, createElement } from "react";
import style from "./index.module.scss";

export class Arrows extends Component {
  render() {
    return createElement(
      "nav",
      { className: style.navArrows },
      createElement("p", { id: "back", className: style.back }, "<"),
      createElement("p", { id: "forward", className: style.forward }, ">"),
    );
  }
}
