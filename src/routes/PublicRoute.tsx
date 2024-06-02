import { Navigate } from "react-router-dom";
import { cloneElement, FC } from "react";
import { CustomRouteProps } from "./PrivateRoute";

export const PublicRoute: FC<CustomRouteProps> = ({ element: RouteComponent, isAuth }) => {
  if (isAuth) {
    return <Navigate to="/settings" />;
  }

  return cloneElement(RouteComponent);
};
