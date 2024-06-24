import {Header} from "components/Header";
import {GitHubInfo} from "./GitHubInfo";
import {Title} from "../InfoText/Title";
import {FC, useEffect} from "react";
import {Preloader} from "../Loaders/Preloader";
import {isErrorMsg} from "services/TypeGuards/isError";
import {useAsyncRequest} from "services/hooks/useAsyncRequest";
import {GithubData} from "components/Main";
import {setGithubData} from "features/github/githubSlice";
import {useAppDispatch, useAppSelector} from "services/hooks/redux/redux";
import {selectUserData} from "features/github/selectors";

interface RequestProps {
  title: string;
  userName: string;
}

export const Request: FC<RequestProps> = ({title}) => {
  const {isLoading, error, data, fetchData} =
    useAsyncRequest<GithubData>();
  const msg = isErrorMsg(error);

  const dispatch = useAppDispatch();
  const githubData = useAppSelector(selectUserData);

  useEffect(() => {
    if (data)
      dispatch(setGithubData(data))
  }, [data, dispatch]);

  return (
    <>
      <Header isError={!!error} msg={msg} fetchData={fetchData}/>
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
