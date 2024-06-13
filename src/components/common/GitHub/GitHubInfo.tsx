import { Cards } from "./Cards";
import { UserInfo } from "./UserInfo";
import { GithubData } from "../../Main/Main";
import { FC } from "react";

interface GitHubInfoProps {
  userInfo: GithubData["userInfoData"];
  userRepo: GithubData["userRepoData"];
}

export const GitHubInfo: FC<GitHubInfoProps> = ({ userInfo, userRepo }) => {
  if (!userInfo || !userRepo) return null;

  return (
    <article key={userInfo.html_url}>
      <UserInfo userInfo={userInfo} />
      <Cards userRepo={userRepo} />
    </article>
  );
};
