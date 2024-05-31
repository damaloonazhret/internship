import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import React, { Suspense, useEffect, useState } from "react";
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

export interface GithubRepo {
  full_name: string;
  language: string | null;
  visibility: string;
  html_url: string;
  created_at: string;
}

export interface GithubInfo {
  name: string;
  html_url: string;
  avatar_url: string;
  login: string;
}

export interface GithubData {
  userInfoData: GithubInfo;
  userRepoData: GithubRepo[];
}

export const Main = ({ ...props }) => {
  const [async, setAsync] = useState<GithubData | {}>({});
  const [promise, setPromise] = useState<GithubData | {}>({});
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getCookie("admin");
    if (auth) setIsAuth(true);
    setLoading(false);
  }, []);

  const headerInfo = (title: string) => {
    return <Title title={title} />;
  };

  const ChildComponent = () => {
    return <>Settings page</>;
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
                element={SettingsPage}
                isAuth={isAuth}
                children={ChildComponent}
                {...props}
              />
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute
                element={ValidatePage}
                isAuth={isAuth}
                setIsAuth={(auth: boolean) => setIsAuth(auth)}
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
