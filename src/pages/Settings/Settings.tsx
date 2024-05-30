import {RouteComponentProps, Switch} from "react-router-dom";
import { ComputedStyle } from "./ComputedStyle/ComputedStyle";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { SetNav } from "./SetNav";
import "./index.scss";
import {ReactNode, Suspense} from "react";
import { MainLoader } from "../../components/common/Loaders/MainLoader";
import {ComputedMatch} from "../Validate/Validate";
import {Colors, Themes} from "../../components/App";

interface SettingsProps extends RouteComponentProps {
  isAuth: boolean;
  colors: Colors;
  theme: Themes
  setColors: (colors: Colors) => void;
  setTheme: (theme: Themes) => void;
  children: ReactNode;
  computedMatch: ComputedMatch;
}

const Settings = (props: SettingsProps) => {
  const { url } = props.computedMatch;
  return (
    <>
      <Suspense fallback={<MainLoader />}>
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
      </Suspense>
    </>
  );
};

export default Settings;
