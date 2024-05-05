import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import Main from "./Main/Main";
import Aside from "./Aside/Aside";
import {Component} from "react";

export const DARK = "dark";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: {
        primary: "#1a1a1a",
        secondary: "#ffffff",
      },
      theme: localStorage.getItem("theme") || DARK,
    };
  }

  setColors = (newColors) => {
    this.setState({ colors: newColors });
  };

  setTheme = (newTheme) => {
    this.setState({ theme: newTheme });
  };

  render() {
    const { colors, theme } = this.state;
    return (
      <Router>
        <Aside
          colors={colors}
          setColors={this.setColors}
          theme={theme}
          setTheme={this.setTheme}
        />
        <Main
          colors={colors}
          setColors={this.setColors}
          theme={theme}
          setTheme={this.setTheme}
        />
      </Router>
    );
  }
}
export default App;
