import { NavLink} from "react-router-dom";

import style from "./nav.module.scss";
import {memo} from "react";

const Nav = () => {
  return (
    <nav className={style.nav}>
      <NavLink to="/promise" activeClassName={style.activeLink}>
        Promise
      </NavLink>
      <NavLink to="/fetch" activeClassName={style.activeLink}>
        Async
      </NavLink>
      <NavLink to="/settings" activeClassName={style.activeLink}>
        Settings
      </NavLink>
      <NavLink to="/heavyMath" activeClassName={style.activeLink}>
        Heavy Math
      </NavLink>
    </nav>
  );
};

export default memo(Nav);
