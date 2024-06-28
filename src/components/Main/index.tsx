import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "routes/PublicRoute";
import { PrivateRoute } from "routes/PrivateRoute";
import { lazy, Suspense, useEffect, useState } from "react";
import { getCookie } from "services/cookie/getCookie";
import { MainLoader } from "../common/Loaders/MainLoader";
import {UserInfo, UserRepo} from "types";
export const GithubPage = lazy(() => import("pages/Github"));
export const ColorsPage = lazy(
  () => import("pages/Colors"),
);
export const NotFoundPage = lazy(() => import("pages/NotFound"));
export const SettingsPage = lazy(() => import("pages/Settings"));
export const ValidatePage = lazy(() => import("pages/Validate"));

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

export const Main = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getCookie("admin");
    if (auth) setIsAuth(true);
    setLoading(false);
  }, []);

  if (loading) {
    return <MainLoader />;
  }

  return (
    <>
      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/github" />} />
          <Route path="/github" element={<GithubPage />} />
          <Route
            path="settings/*"
            element={
              <PrivateRoute element={<SettingsPage />} isAuth={isAuth} />
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
          <Route path="/colors" element={<ColorsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
