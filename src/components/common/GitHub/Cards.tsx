import { Text } from "../InfoText/Text";
import { GithubRepo } from "../../Main/Main";

interface CardsProps {
  userRepo: GithubRepo[];
}

export const Cards = ({ userRepo }: CardsProps) => {
  return userRepo.map((repoData, index) => (
    <div key={index} className="repos">
      <Text key={repoData.full_name} text={repoData.full_name} />
      <Text key={repoData.language} text={repoData.language} />
      <Text
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
      <Text key={repoData.created_at} text={repoData.created_at} />
    </div>
  ));
};
