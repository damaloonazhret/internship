import {NavLink} from "react-router-dom";

import style from './nav.module.scss'

const Nav = () => {
  return (
    <nav className={style.nav}>
      <NavLink to="/promise" activeClassName={style.active}>
        Promise
      </NavLink>
      <NavLink to="/fetch" activeClassName={style.active}>
        Async
      </NavLink>
      <NavLink to="/home" activeClassName={style.active}>
        Home
      </NavLink>
    </nav>
  );
};

export default Nav;
