import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../index.scss";
import { Aside } from "./Aside/Aside";
import Main from "./Main/Main";

class App extends Component {
  constructor(props) {
    super(props);

    this.BLACK_ROOT = "--black";
    this.WHITE_ROOT = "--white";
    this.DARK = "dark";
    this.WHITE = "white";
    this.DEFAULT_COLOR_WHITE = "#ffffff";
    this.DEFAULT_COLOR_BLACK = "#1a1a1a";
  }

  render() {
    return (
      <Router>
        <Aside
          BLACK_ROOT={this.BLACK_ROOT}
          WHITE_ROOT={this.WHITE_ROOT}
          DARK={this.DARK}
          WHITE={this.WHITE}
          DEFAULT_COLOR_WHITE={this.DEFAULT_COLOR_WHITE}
          DEFAULT_COLOR_BLACK={this.DEFAULT_COLOR_BLACK}
        />
        <Main
          setIsLoading={(boolean) => this.setState({ isLoading: boolean })}
        />
      </Router>
    );
  }
}

export default App;
