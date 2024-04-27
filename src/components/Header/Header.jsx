import { Component, createElement } from "react";
import style from "./index.module.scss";

export class Header extends Component {
  render() {
    return createElement(
      "header",
      { className: style.header },
      createElement(
        "form",
        {},
        createElement("p", { id: "head-info" }, "Promise Request"),
        createElement(
          "div",
          { className: style.search },
          createElement("input", {
            id: "url",
            className: style.url,
            placeholder: "Write GitHub NickName...",
            name: "url",
            type: "search",
            list: "names",
          }),
          createElement("datalist", { id: "names" }),
          createElement("span", { className: style.error }),
        ),
      ),
    );
  }
}
