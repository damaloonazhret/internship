import { Link } from "react-router-dom";

export const SetNav = ({ children, url }) => {
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
