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
      <span key={userInfo.name}>Name: {userInfo.name}</span>
      <span key={userInfo.login}>{userInfo.login}</span>
    </div>
  );
};
