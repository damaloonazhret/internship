import { Navigate } from "react-router-dom";
import { ComponentType, FC } from "react";

interface Props {
  element: ComponentType<any>;
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
}

export const PublicRoute: FC<Props> = ({
  element: RouteComponent,
  isAuth,
  ...restProps
}) => {
  if (isAuth) {
    return <Navigate to="/settings" />;
  }

  return <RouteComponent {...restProps} />;
};
