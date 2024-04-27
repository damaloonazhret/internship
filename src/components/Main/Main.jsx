import { Component, createElement } from "react";
import { Outlet } from "react-router-dom";
import style from "./index.module.scss";

export class Main extends Component {
  render() {
    return createElement(
      "main",
      { className: style.mainContent, id: "main" },
      createElement("article", null, createElement(Outlet)),
    );
  }
}
