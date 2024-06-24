import {UserInfo, UserRepo} from "components/Main";

const token = process.env.REACT_APP_TOKEN;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export interface ExtractUserData {
  userInfo: Readonly<UserInfo>;
  userRepo: Readonly<UserRepo>[];
}

const repos = "/repos";
const userUrl = "https://api.github.com/users/";

export const asyncRequest = async (
  username: string,
  headers: { [key: string]: string },
) => {
  const options: RequestInit = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  try {
    const requestUser = await fetch(`${userUrl}${username}`, options);
    const requestRepos = await fetch(`${userUrl}${username}${repos}`, options);

    if (!requestRepos.ok || !requestUser.ok) {
      await Promise.reject(`User: error ${requestUser.status}`);
    }
    const userInfo: UserInfo = await requestUser.json();
    const userRepo: UserRepo[] = await requestRepos.json();

    return { userInfo, userRepo };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error fetching data for user ${username}: ${error.message}`,
      );
    } else {
      throw new Error(`Unknown error fetching data for user ${username}`);
    }
  }
};

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

export const getUserInfoAsync = async (username: string) => {
  const newUserData = await asyncRequest(username, headers);
  return extractUserData(newUserData);
};
