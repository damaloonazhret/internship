import {Text} from '../InfoText/Text'

export const UserInfo = ({ userInfo }) => {
  return (
    <div key={userInfo.html_url} className="user-info">
      <a
        key={userInfo.html_url}
        href={userInfo.html_url}
        rel="noreferrer"
        target="_blank"
      >
        <img
          key={userInfo.avatar_url}
          src={userInfo.avatar_url}
          alt="avatar"
          className="avatar"
        />
      </a>
      <Text key={userInfo.name} text={`Name: ${userInfo.name}`}/>
      <Text key={userInfo.login} text={userInfo.login}/>
    </div>
  );
};
