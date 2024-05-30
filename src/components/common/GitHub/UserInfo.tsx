import { Text } from "../InfoText/Text";
import { CustomLink } from "../CustomLink";
import { GithubInfo } from "../../Main/Main";

interface UserProps {
  userInfo: GithubInfo;
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
      <Text key={userInfo.name} text={`Name: ${userInfo.name}`} />
      <Text key={userInfo.login} text={userInfo.login} />
    </div>
  );
};
