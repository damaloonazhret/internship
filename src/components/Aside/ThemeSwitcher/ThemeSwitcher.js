import { Component } from "react";
import {setProperty} from "../../../services/setProperty";

export class ThemeSwitcher extends Component {
  static DARK = "dark";
  static WHITE = "white";

  constructor(props) {
    super(props);

    this.state = {
      theme: ThemeSwitcher.DARK,
    };
  }

  themeSwitcher = () => {
    this.setState((prevState) => ({
      theme:
        prevState.theme === ThemeSwitcher.WHITE
          ? ThemeSwitcher.DARK
          : ThemeSwitcher.WHITE,
    }));
  };

  globalTheme() {
    const theme = this.state.theme;
    const BLACK_ROOT = "--black";
    const WHITE_ROOT = "--white";
    const DEFAULT_COLOR_WHITE = "#ffffff";
    const DEFAULT_COLOR_BLACK = "#1a1a1a";

    if (theme === ThemeSwitcher.WHITE) {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK);
    }

    if (theme === ThemeSwitcher.DARK) {
      setProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK);
      setProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE);
    }
  }

  render() {
    return (
      <div className="themeSwitcher">
        <input
          type="checkbox"
          name="switcher"
          id="switcher-input"
          className="switcher-input"
          onChange={() => this.globalTheme()}
        />
        <label
          className={`switcherLabel ${this.state.theme === ThemeSwitcher.WHITE ? "white" : ""}`}
          htmlFor="switcher-input"
          onClick={() => this.themeSwitcher()}
        >
          <span
            className={`switcherToggler ${this.state.theme === ThemeSwitcher.WHITE ? "white" : ""}`}
          />
        </label>
      </div>
    );
  }
}
