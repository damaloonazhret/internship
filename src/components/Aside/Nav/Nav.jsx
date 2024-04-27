import { Link } from "react-router-dom";
import { Component, createElement } from "react";
import style from "./index.module.scss";

export class Nav extends Component {
  render() {
    return createElement(
      "nav",
      { className: style.nav },
      createElement(Link, { className: "main", to: "/promise" }, "Promise"),
      createElement(Link, { className: "info", to: "/fetch" }, "Async"),
      createElement(
        Link,
        { className: "settings", to: "/settings" },
        "settings",
      ),
    );
  }
}
