import { Component } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import { AsyncPage } from "../../pages/AsyncPage/AsyncPage";
import { PromisePage } from "../../pages/PromisePage/PromisePage";
import { HomePage } from "../../pages/HomePage/HomePage";
import { createCards } from "../../services/createCards";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      async: {},
      asyncInputValue: "",
      promise: {},
      promiseInputValue: "",
    };
  }

  render() {
    return (
      <>
        <Switch>
          <Route
            path="/async"
            render={() => (
              <AsyncPage
                create={createCards}
                setAsyncState={(newState) => this.setState({ async: newState })}
                setAsyncInputValue={(newValue) => this.setState({ asyncInputValue: newValue })}
                asyncState={this.state.async}
                asyncInputValue={this.state.asyncInputValue}
              />
            )}
          />
          <Route exact path="/">
            <Redirect to="/promise" />
          </Route>
          <Route
            path="/promise"
            render={() => (
              <PromisePage
                create={createCards}
                setPromiseState={(newState) => this.setState({ promise: newState })}
                setPromiseInputValue={(newValue) => this.setState({ promiseInputValue: newValue })}
                promiseState={this.state.promise}
                promiseInputValue={this.state.promiseInputValue}
              />
            )}
          />
          <Route path="/home" component={HomePage} />
        </Switch>
      </>
    );
  }
}

export default Main;
