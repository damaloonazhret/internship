import { Link } from "react-router-dom";
import {ReactNode} from "react";

interface SetNavProps {
    children: ReactNode,
    url: string,
}

export const SetNav = ({ url, children }: SetNavProps) => {
  return (
    <nav className="settings-nav">
      <h2>{children}</h2>
      <ul className="settings-nav__list">
        <li>
          <Link to={`${url}/colors`}>Color Settings</Link>
        </li>
        <li>
          <Link to={`${url}/fonts`}>Font Settings</Link>
        </li>
      </ul>
    </nav>
  );
};
