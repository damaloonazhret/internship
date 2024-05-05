import Header from "../../Header/Header";

const PromisePage = (props) => {
  const promiseState = props.promiseState;
  const info = promiseState.userInfoMy;
  const repo = promiseState.userRepoMy;

  return (
    <>
      {
        <Header
          setIsLoading={props.setIsLoading}
          setPromiseState={props.setPromiseState}
          inputValue={props.promiseInputValue}
          setPromiseInputValue={props.setPromiseInputValue}
          pathname={props.pathname}
          name={"Promise"}
        />
      }
      {info && repo
        ? props.create("", info, repo)
        : props.create("Promise Page Request")}
    </>
  );
};

export default PromisePage;
