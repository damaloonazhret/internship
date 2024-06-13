import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { lazy, Suspense, useEffect, useState } from "react";
import { getCookie } from "../../services/cookie/getCookie";
import { MainLoader } from "../common/Loaders/MainLoader";
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
          <Route path="/async" element={<AsyncPage />} />
          <Route path="/" element={<Navigate to="/promise" />} />
          <Route path="/promise" element={<PromisePage />} />
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
          <Route path="/colorsCC" element={<ColorsCCPage />} />
          <Route path="/colorsFC" element={<ColorsFCPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
