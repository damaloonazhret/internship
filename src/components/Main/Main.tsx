import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import React, { FC, lazy, Suspense, useEffect, useState } from "react";
import { Title } from "../common/InfoText/Title";
import { getCookie } from "../../services/cookie/getCookie";
import { MainLoader } from "../common/Loaders/MainLoader";

import { ThemeColors, SetColorsState, ThemeState } from "../App";
import { UserInfo, UserRepo } from "../../services/api/github/api";
export const AsyncPage = lazy(() => import("../../pages/Request/Async"));
export const PromisePage = lazy(() => import("../../pages/Request/Promise"));
export const ColorsCCPage = lazy(
  () => import("../../pages/JSONPlaceholder/ColorsCC/ColorsCC"),
);
export const ColorsFCPage = lazy(
  () => import("../../pages/JSONPlaceholder/ColorsFC/ColorsFC"),
);
export const NotFoundPage = lazy(() => import("../../pages/NotFound/NotFound"));
export const SettingsPage = lazy(() => import("../../pages/Settings/Settings"));
export const ValidatePage = lazy(() => import("../../pages/Validate/Validate"));

export type GithubInfo = Pick<
  UserInfo,
  "name" | "html_url" | "avatar_url" | "login"
>;

export type GithubRepo = Pick<
  UserRepo,
  "full_name" | "language" | "visibility" | "html_url" | "created_at"
>;

export interface GithubData {
  userInfoData: Readonly<GithubInfo>;
  userRepoData: Readonly<GithubRepo>[];
}

interface MainProps {
  theme: ThemeState;
  colors: ThemeColors;
  setColors: SetColorsState;
}

export const Main: FC<MainProps> = ({ colors, theme, setColors }) => {
  const [async, setAsync] = useState<GithubData | {}>({});
  const [promise, setPromise] = useState<GithubData | {}>({});
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getCookie("admin");
    if (auth) setIsAuth(true);
    setLoading(false);
  }, []);

  const headerInfo = (title: string) => {
    return <Title title={title} />;
  };

  if (loading) {
    return <MainLoader />;
  }

  return (
    <>
      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route
            path="/async"
            element={
              <AsyncPage
                setAsyncState={(newState: GithubData) => setAsync(newState)}
                asyncState={async}
                render={headerInfo}
              />
            }
          />
          <Route path="/" element={<Navigate to="/promise" />} />
          <Route
            path="/promise"
            element={
              <PromisePage
                setPromiseState={(newState: GithubData) => setPromise(newState)}
                promiseState={promise}
                render={headerInfo}
              />
            }
          />
          <Route
            path="settings/*"
            element={
              <PrivateRoute
                element={
                  <SettingsPage
                    colors={colors}
                    theme={theme}
                    setColors={setColors}
                  />
                }
                isAuth={isAuth}
              />
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute
                element={
                  <ValidatePage
                    setIsAuth={(auth: boolean) => setIsAuth(auth)}
                  />
                }
                isAuth={isAuth}
              />
            }
          />
          <Route path="/colorsCC" element={<ColorsCCPage />} />
          <Route path="/colorsFC" element={<ColorsFCPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
