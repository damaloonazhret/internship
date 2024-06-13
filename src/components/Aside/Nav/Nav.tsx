import { NavLink } from "react-router-dom";
import "./index.scss";

export const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/promise">Github</NavLink>
      <NavLink to="/async">Github</NavLink>
      <NavLink to="/settings">Settings</NavLink>
      <NavLink to="/colorsCC">Colors class</NavLink>
      <NavLink to="/colorsFC">Colors func</NavLink>
    </nav>
  );
};
