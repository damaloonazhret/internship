import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { component: Component, isAuth, ...restProps } = props;
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
