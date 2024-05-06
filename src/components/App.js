import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import { Aside } from "./Aside/Aside";
import Main from "./Main/Main";

class App extends Component {
  render() {
    return (
      <Router>
        <Aside />
        <Main
          setIsLoading={(boolean) => this.setState({ isLoading: boolean })}
        />
      </Router>
    );
  }
}

export default App;
