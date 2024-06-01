const repos = "/repos";
const userUrl = "https://api.github.com/users/";

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

export interface UserData {
  userInfo: UserInfo;
  userRepo: UserRepo[];
}

export const promiseRequest = (
  username: string,
  headers: { [key: string]: string },
): Promise<UserData> => {
  const userInfoPromise = new Promise<UserInfo>((resolve, reject) => {
    let xhrUserInfo = new XMLHttpRequest();
    xhrUserInfo.open("GET", `${userUrl}${username}`);
    xhrUserInfo.setRequestHeader("Authorization", headers.Authorization);
    xhrUserInfo.onload = () => {
      if (!(xhrUserInfo.status >= 200 && xhrUserInfo.status <= 299)) {
        reject(new Error(`User: error ${xhrUserInfo.status}`));
      } else {
        resolve(JSON.parse(xhrUserInfo.responseText));
      }
    };
    xhrUserInfo.onerror = (error) => {
      reject(error);
    };
    xhrUserInfo.send();
  });

  const userRepoPromise = new Promise<UserRepo[]>((resolve, reject) => {
    let xhrUserRepo = new XMLHttpRequest();
    xhrUserRepo.open("GET", `${userUrl}${username}${repos}`);
    xhrUserRepo.setRequestHeader("Authorization", headers.Authorization);
    xhrUserRepo.onload = () => {
      if (!(xhrUserRepo.status >= 200 && xhrUserRepo.status <= 299)) {
        reject(new Error(`User: error ${xhrUserRepo.status}`));
      } else {
        resolve(JSON.parse(xhrUserRepo.responseText));
      }
    };
    xhrUserRepo.onerror = (error) => {
      reject(error);
    };
    xhrUserRepo.send();
  });

  return Promise.all([userInfoPromise, userRepoPromise]).then(
    ([userInfo, userRepo]) => {
      return { userInfo, userRepo };
    },
  );
};

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
