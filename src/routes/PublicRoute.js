import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export class PublicRoute extends Component {
  render() {
    const { component: Component, isAuth, ...restProps } = this.props;
    return (
      <Route
        render={() =>
          isAuth ? <Redirect to="/settings" /> : <Component {...restProps} />
        }
      />
    );
  }
}
