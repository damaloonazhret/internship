import { Outlet, Route, Routes, useResolvedPath } from "react-router-dom";
import { ComputedStyle } from "./ComputedStyle/ComputedStyle";
import { SetNav } from "./SetNav";
import { Suspense } from "react";
import { MainLoader } from "../../components/common/Loaders/MainLoader";
import "./index.scss";

const Settings = () => {
  const url = useResolvedPath("").pathname;
  return (
    <>
      <Suspense fallback={<MainLoader />}>
        <SetNav url={url} />
        <Routes>
          <Route path=":settingsId" element={<ComputedStyle />} />
        </Routes>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Settings;
