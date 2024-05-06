import { Component, createElement } from "react";

export class HomePage extends Component {
  render() {
    return createElement("h2", { className: "HomePage" }, "Home Page");
  }
}
