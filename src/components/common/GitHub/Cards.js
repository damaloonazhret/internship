export const Cards = ({ userRepo }) => {
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
