import {NavLink} from "react-router-dom";

import style from './nav.module.scss'

const Nav = () => {
  return (
    <nav className={style.nav}>
      <NavLink className="main" to="/promise" activeClassName={style.active}>
        Promise
      </NavLink>
      <NavLink className="info" to="/fetch" activeClassName={style.active}>
        Async
      </NavLink>
      <NavLink className="settings" to="/home" activeClassName={style.active}>
        Home
      </NavLink>
    </nav>
  );
};

export default Nav;
