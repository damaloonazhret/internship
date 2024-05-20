import { NavLink } from "react-router-dom";

export const Nav = () => {
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
