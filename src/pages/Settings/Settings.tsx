import { Outlet, Route, Routes, useResolvedPath } from "react-router-dom";
import { ComputedStyle } from "./ComputedStyle/ComputedStyle";
import { SetNav } from "./SetNav";
import "./index.scss";
import { ReactNode, Suspense } from "react";
import { MainLoader } from "../../components/common/Loaders/MainLoader";
import { Colors, Themes } from "../../components/App";

interface SettingsProps {
  isAuth: boolean;
  colors: Colors;
  theme: Themes;
  setColors: (colors: (prevColors: Colors) => Colors) => void;
  setTheme: (theme: Themes) => void;
  children: ReactNode;
}

const Settings = (props: SettingsProps) => {
  const url = useResolvedPath("").pathname;
  return (
    <>
      <Suspense fallback={<MainLoader />}>
        <SetNav children={props.children} url={url} />
        <Routes>
          <Route
            path=":settingsId"
            element={
              <ComputedStyle
                colors={props.colors}
                theme={props.theme}
                setColors={props.setColors}
              />
            }
          />
        </Routes>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Settings;
