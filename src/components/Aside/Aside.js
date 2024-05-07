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
        <ThemeSwitcher
          BLACK_ROOT={this.props.BLACK_ROOT}
          WHITE_ROOT={this.props.WHITE_ROOT}
          DARK={this.props.DARK}
          WHITE={this.props.WHITE}
          DEFAULT_COLOR_WHITE={this.props.DEFAULT_COLOR_WHITE}
          DEFAULT_COLOR_BLACK={this.props.DEFAULT_COLOR_BLACK}
        />
      </aside>
    );
  }
}
