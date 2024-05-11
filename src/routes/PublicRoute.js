import { Route, Redirect } from "react-router-dom";

export const PublicRoute = (props) => {
  const { component: Component, isAuth, ...restProps } = props;
  return (
    <Route
      render={() =>
        isAuth ? <Redirect to="/settings" /> : <Component {...restProps} />
      }
    />
  );
};
