import { Outlet, Route, Routes, useResolvedPath } from "react-router-dom";
import { ComputedStyle } from "./ComputedStyle/ComputedStyle";
import { SetNav } from "./SetNav";
import { FC, Suspense } from "react";
import { MainLoader } from "../../components/common/Loaders/MainLoader";
import {ThemeColors, SetColorsState, ThemeState} from "../../components/App";
import "./index.scss";

export interface SettingsProps {
  colors: ThemeColors;
  theme: ThemeState;
  setColors: SetColorsState;
}

const Settings: FC<SettingsProps> = ({ colors, theme, setColors }) => {
  const url = useResolvedPath("").pathname;
  return (
    <>
      <Suspense fallback={<MainLoader />}>
        <SetNav url={url} />
        <Routes>
          <Route
            path=":settingsId"
            element={
              <ComputedStyle
                colors={colors}
                theme={theme}
                setColors={setColors}
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
