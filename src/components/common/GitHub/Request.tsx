import { Header } from "../../Header/Header";
import { GitHubInfo } from "./GitHubInfo";
import { Title } from "../InfoText/Title";
import { FC } from "react";
import { Preloader } from "../Loaders/Preloader";
import { isErrorMsg } from "../TypeGuards/isError";
import { useFetchGithubData } from "../../../services/hooks/useFetchGithubData";

interface RequestProps {
  title: string;
  userName: string;
}

export const Request: FC<RequestProps> = ({ title, userName }) => {
  const { isError, error, repo, isLoading, info } =
    useFetchGithubData(userName);
  const msg = isErrorMsg(error);

  return (
    <>
      <Header isError={isError} msg={msg} />
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
