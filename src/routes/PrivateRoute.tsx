import { Navigate } from "react-router-dom";
import { ComponentType, FC } from "react";

interface Props {
  element: ComponentType<any>;
  isAuth: boolean;
  children: () => JSX.Element;
}

export const PrivateRoute: FC<Props> = ({
  element: RouteComponent,
  isAuth,
  ...restProps
}) => {
  if (isAuth) {
    return <RouteComponent {...restProps} />;
  }

  return <Navigate to="/login" />;
};
