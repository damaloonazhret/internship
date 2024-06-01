import { NavLink } from "react-router-dom";
import "./index.scss";
import { FC } from "react";

export const Nav: FC = () => {
  return (
    <nav className="nav">
      <NavLink to="/promise">Promise</NavLink>
      <NavLink to="/async">Async</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/colorsCC">Colors class</NavLink>
      <NavLink to="/colorsFC">Colors func</NavLink>
    </nav>
  );
};
