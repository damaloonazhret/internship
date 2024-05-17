import { asyncRequest, promiseRequest } from "./api";
const token = process.env.REACT_APP_TOKEN;

const headers = {
  "Content-Type": "application/json",
  'Authorization': `Bearer ${token}`,
}

const extractUserData = ({ userInfo, userRepo }) => {
  const userInfoMy = {
    name: userInfo["name"],
    html_url: userInfo["html_url"],
    avatar_url: userInfo["avatar_url"],
    login: userInfo["login"],
  };
  const userRepoMy = userRepo.map(
    ({ full_name, language, visibility, html_url, created_at }) => ({
      full_name,
      language,
      visibility,
      html_url,
      created_at,
    }),
  );
  return { userInfoMy, userRepoMy };
};

export const getUserInfo = (username) => {
  return promiseRequest(username, headers).then((response) => {
    const newUserData = JSON.parse(response["userInfo"]);
    const newRepoData = JSON.parse(response["userRepo"]);
    return extractUserData({
      userInfo: newUserData,
      userRepo: newRepoData,
    });
  });
};

export const getUserInfoAsync = async (username) => {
  const newUserData = await asyncRequest(username, headers);
  return extractUserData(newUserData);
};
