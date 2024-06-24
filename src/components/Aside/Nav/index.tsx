import { NavLink } from "react-router-dom";
import "./index.scss";

export const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/github">Github</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/colors">Colors</NavLink>
    </nav>
  );
};
