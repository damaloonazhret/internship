import { Component } from "react";
import { Link, Switch } from "react-router-dom";
import { SettingPage } from "./SettingPage/SettingPage";
import { PrivateRoute } from "../../routes/PrivateRoute";

class SettingsPage extends Component {
  render() {
    const { url } = this.props.computedMatch;
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
            isAuth={this.props.isAuth}
            path={`${url}/:settingsId`}
            component={SettingPage}
          />
        </Switch>
      </>
    );
  }
}

export default SettingsPage;
