export const createCards = (userInfo, userRepo) => {
  if (!userInfo || !userRepo) return null;

  return (
    <main key={userInfo ? userInfo.html_url : null} className="mainContent">
      <article key={userInfo ? userInfo.html_url : null}>
        {createUserInfoHTML(userInfo)}
        {createReposHTML(userRepo)}
      </article>
    </main>
  );
};

const createReposHTML = (userRepo) => {
  return userRepo.map((repoData, index) => (
    <div key={index} className="repos">
      <span key={repoData.full_name}>{repoData.full_name}</span>
      <span key={repoData.language}>{repoData.language}</span>
      <span key={repoData.visibility}>Visibility: {repoData.visibility}</span>
      <a
        key={repoData.html_url}
        rel="noreferrer"
        href={repoData.html_url}
        target="_blank"
      >
        Link to repo
      </a>
      <span key={repoData.created_at}>{repoData.created_at}</span>
    </div>
  ));
};

const createUserInfoHTML = (userInfo) => {
  return (
    <div key={userInfo ? userInfo.html_url : null} className="user-info">
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
