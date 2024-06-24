import { Txt } from "components/common/InfoText/Txt";
import { GithubRepo } from "components/Main";

interface CardsProps {
  userRepo: Readonly<GithubRepo>[];
}

export const Cards = ({ userRepo }: CardsProps) => {
  return userRepo.map((repoData, index) => (
    <div key={index} className="repos">
      <Txt key={repoData.full_name} text={repoData.full_name} />
      <Txt key={repoData.language} text={repoData.language} />
      <Txt
        key={repoData.visibility}
        text={`Visibility ${repoData.language}`}
      />
      <a
        key={repoData.html_url}
        rel="noreferrer"
        href={repoData.html_url}
        target="_blank"
      >
        Link to repo
      </a>
      <Txt key={repoData.created_at} text={repoData.created_at} />
    </div>
  ));
};
