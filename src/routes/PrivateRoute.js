import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, isAuth,  ...restProps }) => {
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
};
