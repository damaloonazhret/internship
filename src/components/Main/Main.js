import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Async } from "../../pages/Request/Async";
import { Promise } from "../../pages/Request/Promise";
import Settings from "../../pages/Settings/Settings";
import { createCards } from "../../services/createCards";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { Validate } from "../../pages/Validate/Validate";
import NotFound from "../../pages/NotFound/NotFound";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      async: {},
      promise: {},
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
              <Async
                create={createCards}
                setAsyncState={(newState) => this.setState({ async: newState })}
                asyncState={this.state.async}
              />
            )}
          />
          <Route exact path="/">
            <Redirect to="/promise" />
          </Route>
          <Route
            path="/promise"
            render={() => (
              <Promise
                create={createCards}
                setPromiseState={(newState) =>
                  this.setState({ promise: newState })
                }
                promiseState={this.state.promise}
              />
            )}
          />
          <PrivateRoute
            path="/settings"
            component={Settings}
            isAuth={this.state.isAuth}
          />
          <PublicRoute
            path="/login"
            component={Validate}
            isAuth={this.state.isAuth}
            setAuth={(auth) => this.setState({ isAuth: auth })}
          />
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }
}

export default Main;
