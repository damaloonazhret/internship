import { Link } from "react-router-dom";
import { FC } from "react";

interface SetNavProps {
  url: string;
}

export const SetNav: FC<SetNavProps> = ({ url }) => {
  return (
    <nav className="settings-nav">
      <h2>Settings page</h2>
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
