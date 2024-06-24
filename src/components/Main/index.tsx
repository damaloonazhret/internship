import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "routes/PublicRoute";
import { PrivateRoute } from "routes/PrivateRoute";
import { lazy, Suspense, useEffect, useState } from "react";
import { getCookie } from "services/cookie/getCookie";
import { MainLoader } from "../common/Loaders/MainLoader";

export const GithubPage = lazy(() => import("pages/Github"));
export const ColorsPage = lazy(
  () => import("pages/Colors"),
);
export const NotFoundPage = lazy(() => import("pages/NotFound"));
export const SettingsPage = lazy(() => import("pages/Settings"));
export const ValidatePage = lazy(() => import("pages/Validate"));

export interface UserInfo {
  name: string;
  html_url: string;
  avatar_url: string;
  login: string;
  id: number;
  node_id: string;
  url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: string | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

export interface UserRepo {
  full_name: string;
  language: string | null;
  visibility: string;
  html_url: string;
  created_at: string;
  name: string;
  id: number;
  node_id: string;
  private: boolean;
  description: string | null;
  fork: boolean;
  url: string;
  updated_at: string;
  pushed_at: string;
}

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
