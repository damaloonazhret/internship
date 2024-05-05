import { NavLink } from "react-router-dom";
import style from "./nav.module.scss";
import { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <nav className={style.nav}>
        <NavLink to="/promise" activeClassName={style.activeLink}>
          Promise
        </NavLink>
        <NavLink to="/fetch" activeClassName={style.activeLink}>
          Async
        </NavLink>
        <NavLink to="/home" activeClassName={style.activeLink}>
          Home
        </NavLink>
      </nav>
    );
  }
}

export default Nav;
