import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import React, {FC, Suspense, useEffect, useState} from "react";
import { Title } from "../common/InfoText/Title";
import { getCookie } from "../../services/cookie/getCookie";
import { MainLoader } from "../common/Loaders/MainLoader";
import {
  AsyncPage,
  ColorsCCPage,
  ColorsFCPage,
  NotFoundPage,
  PromisePage,
  SettingsPage,
  ValidatePage,
} from "../../pages";
import {ThemeColorsState, SetColorsState, ThemeState} from "../App";

export interface GithubInfo {
    name: string;
    html_url: string;
    avatar_url: string;
    login: string;
}

export interface GithubRepo {
  full_name: string;
  language: string | null;
  visibility: string;
  html_url: string;
  created_at: string;
}

export interface GithubData {
  userInfoData: GithubInfo;
  userRepoData: GithubRepo[];
}

interface MainProps {
    theme: ThemeState,
    colors: ThemeColorsState,
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
