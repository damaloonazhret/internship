import {
  asyncRequest,
  promiseRequest,
  UserData,
  UserInfo,
  UserRepo,
} from "./api";

const token = process.env.REACT_APP_TOKEN;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export interface ExtractUserData {
  userInfo: UserInfo;
  userRepo: UserRepo[];
}

const extractUserData = ({ userInfo, userRepo }: ExtractUserData) => {
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
  return promiseRequest(username, headers).then((value: UserData) => {
    const newUserData = value.userInfo;
    const newRepoData = value.userRepo;
    return extractUserData({
      userInfo: newUserData,
      userRepo: newRepoData,
    } as ExtractUserData);
  });
};

export const getUserInfoAsync = async (username: string) => {
  const newUserData = await asyncRequest(username, headers);
  return extractUserData(newUserData);
};
