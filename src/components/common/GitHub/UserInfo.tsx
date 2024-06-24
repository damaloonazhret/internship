import { Txt } from "components/common/InfoText/Txt";
import { CustomLink } from "../CustomLink";
import { GithubInfo } from "components/Main";

interface UserProps {
  userInfo: Readonly<GithubInfo>;
}

export const UserInfo = ({ userInfo }: UserProps) => {
  return (
    <div key={userInfo.html_url} className="user-info">
      <CustomLink key={userInfo.html_url} href={userInfo.html_url}>
        <img
          key={userInfo.avatar_url}
          src={userInfo.avatar_url}
          alt="avatar"
          className="avatar"
        />
      </CustomLink>
      <Txt key={userInfo.name} text={`Name: ${userInfo.name}`} />
      <Txt key={userInfo.login} text={userInfo.login} />
    </div>
  );
};
