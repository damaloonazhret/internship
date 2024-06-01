import { Navigate } from "react-router-dom";
import { cloneElement, FC, ReactElement } from "react";

export interface Props {
  element: ReactElement;
  isAuth: boolean;
}

export const PrivateRoute: FC<Props> = ({
  element: RouteComponent,
  isAuth,
}) => {
  if (isAuth) {
    return cloneElement(RouteComponent);
  }

  return <Navigate to="/login" />;
};
