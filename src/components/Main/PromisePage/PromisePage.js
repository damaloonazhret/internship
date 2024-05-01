import Header from "../../Header/Header";

const PromisePage = (props) => {
  const promiseState = props.promiseState;
  const info = promiseState.userInfoMy;
  const repo = promiseState.userRepoMy;

  const headerComponent = (
    <Header
      setIsLoading={props.setIsLoading}
      setPromiseState={props.setPromiseState}
      inputValue={props.promiseInputValue}
      setPromiseInputValue={props.setPromiseInputValue}
      pathname={props.pathname}
      name={"Promise"}
    />
  );

  if (info && repo) {
    return (
      <>
        {headerComponent}
        {props.create("", info, repo)}
      </>
    )
  }

  return (
    <>
      {headerComponent}
      {props.create("Promise Page Request")}
    </>
  );
};

export default PromisePage;
