import {UserInfo, UserRepo} from "./getData";

const repos = "/repos";
const userUrl = "https://api.github.com/users/";

export const promiseRequest = (username: string, headers: { [key: string]: string }) => {
  const userInfoPromise = new Promise<string>((resolve, reject) => {
    let xhrUserInfo = new XMLHttpRequest();
    xhrUserInfo.open("GET", `${userUrl}${username}`);
    xhrUserInfo.setRequestHeader('Authorization', headers.Authorization);
    xhrUserInfo.onload = () => {
      if (!(xhrUserInfo.status >= 200 && xhrUserInfo.status <= 299)) {
        reject(new Error(`User: error ${xhrUserInfo.status}`));
      } else {
        resolve(xhrUserInfo.response);
      }
    };
    xhrUserInfo.onerror = (error) => {
      reject(error);
    };
    xhrUserInfo.send();
  });

  const userRepoPromise = new Promise<string>((resolve, reject) => {
    let xhrUserRepo = new XMLHttpRequest();
    xhrUserRepo.open("GET", `${userUrl}${username}${repos}`);
    xhrUserRepo.setRequestHeader('Authorization', headers.Authorization);
    xhrUserRepo.onload = () => {
      if (!(xhrUserRepo.status >= 200 && xhrUserRepo.status <= 299)) {
        reject(new Error(`User: error ${xhrUserRepo.status}`));
      } else {
        resolve(xhrUserRepo.response);
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

export const asyncRequest = async (username: string, headers: { [key: string]: string }) => {
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
      throw new Error(`Error fetching data for user ${username}: ${error.message}`);
    } else {
      throw new Error(`Unknown error fetching data for user ${username}`);
    }
  }
};
