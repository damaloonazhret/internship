import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export class PrivateRoute extends Component {
  render() {
    const { component: Component, isAuth, ...restProps } = this.props;
    return (
      <Route
        render={() =>
          isAuth ? (
            <Component isAuth={isAuth} {...restProps} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}
