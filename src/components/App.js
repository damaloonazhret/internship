import { Component, createElement, Fragment } from "react";
import { Header } from "./Header/Header";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";

export class App extends Component {
  render() {
    return createElement(
      Fragment,
      null,
      createElement(Header),
      createElement(Aside),
      createElement(Main),
    );
  }
}
