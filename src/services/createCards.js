import { createElement } from "react";

export const createCards = (title, userInfo, userRepo) => {
  if (title)
    return createElement(
      "main",
      { className: "mainContent" },
      createElement("h2", {}, title),
    );

  if (!userInfo || !userRepo) return null;

  return createElement(
    "main",
    { key: userInfo ? userInfo.html_url : null, className: "mainContent" },
    createElement(
      "article",
      { key: userInfo ? userInfo.html_url : null },
      createUserInfoHTML(userInfo),
      createReposHTML(userRepo),
    ),
  );
};

const createReposHTML = (userRepo) => {
  return userRepo.map((repoData, index) =>
    createElement(
      "div",
      { key: index, className: "repos" },
      createElement("span", { key: repoData.full_name }, repoData.full_name),
      createElement("span", { key: repoData.language }, repoData.language),
      createElement(
        "span",
        { key: repoData.visibility },
        `Visibility: ${repoData.visibility}`,
      ),
      createElement(
        "a",
        {
          key: repoData.html_url,
          rel: "noreferrer",
          href: repoData.html_url,
          target: "_blank",
        },
        "Link to repo",
      ),
      createElement("span", { key: repoData.created_at }, repoData.created_at),
    ),
  );
};

const createUserInfoHTML = (userInfo) => {
  return createElement(
    "div",
    { key: userInfo ? userInfo.html_url : null, className: "user-info" },
    createElement(
      "a",
      {
        key: userInfo.html_url,
        href: userInfo.html_url,
        rel: "noreferrer",
        target: "_blank",
      },
      createElement("img", {
        key: userInfo.avatar_url,
        src: userInfo.avatar_url,
        alt: "avatar",
        className: "avatar",
      }),
    ),
    createElement("span", { key: userInfo.name }, `Name: ${userInfo.name}`),
    createElement("span", { key: userInfo.login }, userInfo.login),
  );
};
