import { Header } from "../../Header/Header";
import { GitHubInfo } from "./GitHubInfo";
import { Title } from "../InfoText/Title";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { GithubData } from "../../Main/Main";
import { Preloader } from "../Loaders/Preloader";

export type SetStateRequest = (newState: GithubData) => void;
export type StateRequest = GithubData | {};
export type RenderRequest = (title: string) => JSX.Element;
export type SetIsLoadingRequest = Dispatch<SetStateAction<boolean>>;

interface RequestProps {
  setState: SetStateRequest;
  state: StateRequest;
  render: RenderRequest;
  title: string;
}

export const Request: FC<RequestProps> = ({
  state,
  setState,
  title,
  render,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      <Header setState={setState} render={render} setIsLoading={setIsLoading} />
      <main key={info ? info.html_url : null} className="mainContent">
        {isLoading ? (
          <Preloader isLoading={isLoading} />
        ) : (
          <>
            {info && repo ? (
              <GitHubInfo userInfo={info} userRepo={repo} />
            ) : (
              <Title title={title} className="main-title" type="h1" />
            )}
          </>
        )}
      </main>
    </>
  );
};
