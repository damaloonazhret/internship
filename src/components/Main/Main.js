import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AsyncPage } from "../../pages/RequestPage/AsyncPage/AsyncPage";
import { PromisePage } from "../../pages/RequestPage/PromisePage/PromisePage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import { createCards } from "../../services/createCards";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { ValidatePage } from "../../pages/ValidatePage/ValidatePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      async: {},
      asyncInputValue: "",
      promise: {},
      promiseInputValue: "",
      isAuth: false,
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
                setAsyncInputValue={(newValue) =>
                  this.setState({ asyncInputValue: newValue })
                }
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
                setPromiseState={(newState) =>
                  this.setState({ promise: newState })
                }
                setPromiseInputValue={(newValue) =>
                  this.setState({ promiseInputValue: newValue })
                }
                promiseState={this.state.promise}
                promiseInputValue={this.state.promiseInputValue}
              />
            )}
          />
          <PrivateRoute
            path="/settings"
            component={SettingsPage}
            isAuth={this.state.isAuth}
          />
          <PublicRoute
            path="/login"
            component={ValidatePage}
            isAuth={this.state.isAuth}
            setAuth={(auth) => this.setState({ isAuth: auth })}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    );
  }
}

export default Main;
