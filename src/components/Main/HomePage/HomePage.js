import React, { Component } from "react";
import { memo } from "react";
import { DARK } from "../../App";
import './index.css'

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.primaryColorRef = React.createRef();
    this.secondaryColorRef = React.createRef();

    this.DEFAULT_COLOR_WHITE = "#ffffff";
    this.DEFAULT_COLOR_BLACK = "#1a1a1a";

    this.state = {
      count: {
        fontSize: 16,
      },
    };
  }

  resetPrimaryColor = () => {
    this.props.setColors({
      ...this.props.colors,
      primary: this.DEFAULT_COLOR_BLACK,
    });
  };

  resetSecondaryColor = () => {
    this.props.setColors({
      ...this.props.colors,
      secondary: this.DEFAULT_COLOR_WHITE,
    });
  };

  changePrimaryColor = () => {
    const newPrimaryColor = this.primaryColorRef.current.value;
    this.props.setColors({
      ...this.props.colors,
      primary: newPrimaryColor,
    });
  };

  changeSecondaryColor = () => {
    const newSecondaryColor = this.secondaryColorRef.current.value;
    this.props.setColors({
      ...this.props.colors,
      secondary: newSecondaryColor,
    });
  };

  increment = () => {
    const { count } = this.state;
    this.setState({
      count: { ...count, fontSize: count.fontSize + 0.5 },
    });
  };

  decrement = () => {
    const { count } = this.state;
    this.setState({
      count: { ...count, fontSize: count.fontSize - 0.5 },
    });
  };

  reset = () => {
    this.setState({
      count: { fontSize: 16 },
    });
  };

  render() {
    const { colors, theme } = this.props;
    const { count } = this.state;
    return (
      <article className="settings">
        <h2 className="settings__title">Settings Page</h2>
        <div className="settings__bg">
          <label htmlFor="text">
            And here you can choose the background color on the site
          </label>
          <input
            id="text"
            value={theme === DARK ? colors.primary : colors.secondary}
            placeholder=""
            name="color"
            type="color"
            ref={theme === DARK ? this.primaryColorRef : this.secondaryColorRef}
            onChange={
              theme === DARK ? this.changePrimaryColor : this.changeSecondaryColor
            }
          />
          <button
            className="btn"
            type="button"
            onClick={
              theme === DARK
                ? this.resetPrimaryColor
                : this.resetSecondaryColor
            }
          >
            Reset
          </button>
        </div>
        <div className="settings__txt">
          <label htmlFor="text">
            Here you can set your text content color for the page
          </label>
          <input
            id="text"
            value={theme === DARK ? colors.secondary : colors.primary}
            placeholder=""
            name="color"
            type="color"
            ref={theme === DARK ? this.secondaryColorRef : this.primaryColorRef}
            onChange={
              theme === DARK ? this.changeSecondaryColor : this.changePrimaryColor
            }
          />
          <button
            className="btn"
            type="button"
            onClick={
              theme === DARK
                ? this.resetSecondaryColor
                : this.resetPrimaryColor
            }
          >
            Reset
          </button>
        </div>
        <div className="settings__font">
          <p>Value: {count.fontSize}px </p>
          <p>Here you can set a custom font size for the entire page</p>
          <button className="btn" onClick={this.decrement}>
            decrease
          </button>
          <button className="btn" onClick={this.reset}>
            reset
          </button>
          <button className="btn" onClick={this.increment}>
            increase
          </button>
        </div>
      </article>
    );
  }
}

export default memo(HomePage);
