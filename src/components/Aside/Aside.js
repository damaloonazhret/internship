import { Component } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";
import { Nav } from "./Nav/Nav";
import Arrows from "./Arrows/Arrows";

export class Aside extends Component {
  render() {
    return (
      <aside className="aside">
        <Nav />
        <Arrows />
        <ThemeSwitcher />
      </aside>
    );
  }
}
