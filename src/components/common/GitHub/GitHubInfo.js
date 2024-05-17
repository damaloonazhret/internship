import { Cards } from "./Cards";
import { UserInfo } from "./UserInfo";

export const GitHubInfo = ({ userInfo, userRepo }) => {
  if (!userInfo || !userRepo) return null;

  return (
    <article key={userInfo.html_url}>
      <UserInfo userInfo={userInfo} />
      <Cards userRepo={userRepo} />
    </article>
  );
};
