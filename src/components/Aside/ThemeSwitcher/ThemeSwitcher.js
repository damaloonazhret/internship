import { Component } from "react";
import { setProperty } from "../../../services/setProperty";

export class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: this.props.DARK,
    };
  }

  themeSwitcher = () => {
    this.setState((prevState) => ({
      theme:
        prevState.theme === this.props.WHITE
          ? this.props.DARK
          : this.props.WHITE,
    }));
  };

  globalTheme() {
    const theme = this.state.theme;

    if (theme === this.props.WHITE) {
      setProperty(this.props.BLACK_ROOT, this.props.DEFAULT_COLOR_WHITE);
      setProperty(this.props.WHITE_ROOT, this.props.DEFAULT_COLOR_BLACK);
    }

    if (theme === this.props.DARK) {
      setProperty(this.props.BLACK_ROOT, this.props.DEFAULT_COLOR_BLACK);
      setProperty(this.props.WHITE_ROOT, this.props.DEFAULT_COLOR_WHITE);
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
          className={`switcherLabel ${this.state.theme === this.props.WHITE ? "white" : ""}`}
          htmlFor="switcher-input"
          onClick={() => this.themeSwitcher()}
        >
          <span
            className={`switcherToggler ${this.state.theme === this.props.WHITE ? "white" : ""}`}
          />
        </label>
      </div>
    );
  }
}
