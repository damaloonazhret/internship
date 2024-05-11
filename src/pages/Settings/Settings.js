import { Link, Switch } from "react-router-dom";
import { ComputedStyle } from "./ComputedStyle/ComputedStyle";
import { PrivateRoute } from "../../routes/PrivateRoute";

export const Settings = (props) => {
  const { url } = props.computedMatch;
  return (
    <>
      <nav className="settings-nav">
        <h2>Settings Page</h2>
        <ul className="settings-nav__list">
          <li>
            <Link to={`${url}/colors`}>Color Settings</Link>
          </li>
          <li>
            <Link to={`${url}/fonts`}>Font Settings</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <PrivateRoute
          isAuth={props.isAuth}
          path={`${url}/:settingsId`}
          component={ComputedStyle}
        />
      </Switch>
    </>
  );
};
