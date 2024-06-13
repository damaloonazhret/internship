import githubAPI from "../api/github/githubAPI";

export const useFetchGithubData = (username: string) => {
  const { data: info, isFetching: isFetchingInfo } =
    githubAPI.useFetchUserInfoQuery(username, { skip: !username });
  const {
    data: repo,
    isFetching: isFetchingRepo,
    error,
    isError,
  } = githubAPI.useFetchUserReposQuery(username, { skip: !username });

  const isLoading = isFetchingInfo || isFetchingRepo;

  return { info, repo, isLoading, error, isError };
};
