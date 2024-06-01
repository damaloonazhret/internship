import { Navigate } from "react-router-dom";
import { cloneElement, FC } from "react";
import { Props } from "./PrivateRoute";

export const PublicRoute: FC<Props> = ({ element: RouteComponent, isAuth }) => {
  if (isAuth) {
    return <Navigate to="/settings" />;
  }

  return cloneElement(RouteComponent);
};
