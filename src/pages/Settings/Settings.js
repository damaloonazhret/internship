import { Switch } from "react-router-dom";
import { ComputedStyle } from "./ComputedStyle/ComputedStyle";
import { PrivateRoute } from "../../routes/PrivateRoute";
import {SetNav} from "./SetNav";
import "./index.scss";

const Settings = (props) => {
  const { url } = props.computedMatch;
  return (
    <>
      <SetNav children={props.children} url={url} />
      <Switch>
        <PrivateRoute
          isAuth={props.isAuth}
          path={`${url}/:settingsId`}
          component={ComputedStyle}
          colors={props.colors}
          theme={props.theme}
          setColors={props.setColors}
          setTheme={props.setTheme}
        />
      </Switch>
    </>
  );
};

export default Settings;
