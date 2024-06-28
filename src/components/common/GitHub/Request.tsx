import {Header} from "components/Header";
import {GitHubInfo} from "./GitHubInfo";
import {Title} from "../InfoText/Title";
import {FC} from "react";
import {Preloader} from "../Loaders/Preloader";
import {useAppSelector} from "services/hooks/redux/redux";
import {selectError, selectIsLoading, selectUserData} from "features/github/selectors";

interface RequestProps {
  title: string;
}

export const Request: FC<RequestProps> = ({title}) => {
  const githubData = useAppSelector(selectUserData);
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <>
      <Header isError={!!error} msg={error}/>
      <main className="mainContent">
        {isLoading ? (
          <Preloader isLoading={isLoading}/>
        ) : (
          <>
            {githubData.userRepoData.length > 0 && githubData.userInfoData.name ? (
              <GitHubInfo userInfo={githubData.userInfoData} userRepo={githubData.userRepoData}/>
            ) : (
              <Title title={title} className="main-title" type="h1"/>
            )}
          </>
        )}
      </main>
    </>
  );
};
