import { asyncRequest, promiseRequest } from "./api";
const token = process.env.REACT_APP_TOKEN;

const headers = {
  "Content-Type": "application/json",
  'Authorization': `Bearer ${token}`,
}

export interface UserInfo {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  url: string;
  html_url: string;
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
  name: string;
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
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  language: string | null;
  visibility: string;
}

interface ExtractUserDataArgs {
  userInfo: UserInfo;
  userRepo: UserRepo[];
}

const extractUserData = ({ userInfo, userRepo }: ExtractUserDataArgs) => {
  const userInfoData = {
    name: userInfo["name"],
    html_url: userInfo["html_url"],
    avatar_url: userInfo["avatar_url"],
    login: userInfo["login"],
  };
  const userRepoData = userRepo.map(
    ({ full_name, language, visibility, html_url, created_at }) => ({
      full_name,
      language,
      visibility,
      html_url,
      created_at,
    }),
  );
  return { userInfoData, userRepoData };
};

export const getUserInfo = (username: string) => {
  return promiseRequest(username, headers).then((response: { userInfo: string; userRepo: string }) => {
    const newUserData = JSON.parse(response.userInfo) as UserInfo;
    const newRepoData = JSON.parse(response.userRepo) as UserRepo[];
    return extractUserData({
      userInfo: newUserData,
      userRepo: newRepoData,
    });
  });
};

export const getUserInfoAsync = async (username: string) => {
  const newUserData = await asyncRequest(username, headers);
  return extractUserData(newUserData);
};
