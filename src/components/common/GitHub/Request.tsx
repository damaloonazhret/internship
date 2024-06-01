import { Header } from "../../Header/Header";
import { GitHubInfo } from "./GitHubInfo";
import { Title } from "../InfoText/Title";
import { FC } from "react";
import { GithubData } from "../../Main/Main";

interface RequestProps {
  setState: (newState: GithubData) => void;
  state: GithubData | {};
  render: (title: string) => JSX.Element;
  title: string;
}

export const Request: FC<RequestProps> = ({
  state,
  setState,
  title,
  render,
}) => {
  const isGithubData = (state: GithubData | {}): state is GithubData => {
    return (
      (state as GithubData).userInfoData !== undefined &&
      (state as GithubData).userRepoData !== undefined
    );
  };

  let info = isGithubData(state) ? state.userInfoData : null;
  let repo = isGithubData(state) ? state.userRepoData : null;

  return (
    <>
      <Header setState={setState} render={render} />
      <main key={info ? info.html_url : null} className="mainContent">
        {info && repo ? (
          <GitHubInfo userInfo={info} userRepo={repo} />
        ) : (
          <Title title={title} className="main-title" type="h1" />
        )}
      </main>
    </>
  );
};
