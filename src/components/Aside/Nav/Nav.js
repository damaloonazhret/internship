import { Component } from "react";
import {NavLink} from "react-router-dom";

export class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <NavLink to="/promise">Promise</NavLink>
        <NavLink to="/async">Async</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    );
  }
}
