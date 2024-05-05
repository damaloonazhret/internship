import { Component } from "react";
import style from "./themeSwitcher.module.scss";
import { DARK } from "../../App";

class ThemeSwitcher extends Component {
  WHITE = "white";
  BLACK_ROOT = "--black";
  WHITE_ROOT = "--white";
  TRANSITION_ALL = "--transition-all";
  TRANSITION_VALUE = "0.4s all ease-in";

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      this.setProperty(this.TRANSITION_ALL, this.TRANSITION_VALUE);
    }
    if(prevProps.colors !== this.props.colors) {
      this.setProperty(this.BLACK_ROOT, this.props.colors.secondary)
      this.setProperty(this.WHITE_ROOT, this.props.colors.primary)
    }
  }

  componentDidMount() {
    this.globalTheme(this.props.theme);
  }

  themeSwitcher = () => {
    const newTheme = this.props.theme === this.WHITE ? DARK : this.WHITE;
    this.props.setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    this.globalTheme(newTheme);
  };

  globalTheme = (currentTheme) => {
    if (currentTheme === this.WHITE) {
      this.setProperty(this.BLACK_ROOT, this.props.colors.secondary);
      this.setProperty(this.WHITE_ROOT, this.props.colors.primary);
    } else {
      this.setProperty(this.BLACK_ROOT, this.props.colors.primary);
      this.setProperty(this.WHITE_ROOT, this.props.colors.secondary);
    }
  };

  setProperty = (property, value) => {
    document.documentElement.style.setProperty(property, value);
  };

  render() {
    return (
      <div className={style.themeSwitcher}>
        <input
          type="checkbox"
          name="switcher"
          id="switcher-input"
          className="switcher-input"
          checked={this.props.theme === this.WHITE}
          onChange={this.themeSwitcher}
        />
        <label htmlFor="switcher-input" className={`${style.switcherLabel}`}>
          <span
            className={`${style.switcherToggler} ${
              this.props.theme === this.WHITE ? style.switcherTogglerWhite : ""
            }`}
          ></span>
        </label>
      </div>
    );
  }
}

export default ThemeSwitcher;
