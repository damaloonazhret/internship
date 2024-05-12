import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/promise">Promise</NavLink>
      <NavLink to="/async">Async</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </nav>
  );
};
