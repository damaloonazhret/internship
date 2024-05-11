const repos = "/repos";
const userUrl = "https://api.github.com/users/";

export const promiseRequest = (username) => {
  const userInfoPromise = new Promise((resolve, reject) => {
    let xhrUserInfo = new XMLHttpRequest();
    xhrUserInfo.open("GET", `${userUrl}${username}`);
    xhrUserInfo.onload = () => {
      if (!(xhrUserInfo.status >= 200 && xhrUserInfo.status <= 299)) {
        reject(new Error(`User: error ${xhrUserInfo.status}`));
      } else {
        resolve(xhrUserInfo.response);
      }
    };
    xhrUserInfo.onerror = (error) => {
      resolve(error);
    };
    xhrUserInfo.send();
  });

  const userRepoPromise = new Promise((resolve, reject) => {
    let xhrUserRepo = new XMLHttpRequest();
    xhrUserRepo.open("GET", `${userUrl}${username}${repos}`);
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

export const asyncRequest = async (username) => {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };
  try {
    const requestUser = await fetch(`${userUrl}${username}`, options);
    const requestRepos = await fetch(`${userUrl}${username}${repos}`, options);

    if (!requestRepos.ok || !requestUser.ok) {
      await Promise.reject(`User: error ${requestUser.status}`);
    }
    const userInfo = await requestUser.json();
    const userRepo = await requestRepos.json();

    return { userInfo, userRepo };
  } catch (error) {
    throw new Error(
      `Error fetching data for user ${username} ${error.message}`,
    );
  }
};
