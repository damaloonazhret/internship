import Header from "../../Header/Header";

const AsyncPage = (props) => {
  const asyncState = props.asyncState;
  const info = asyncState.userInfoMy;
  const repo = asyncState.userRepoMy;

  const headerComponent = (
    <Header
      setIsLoading={props.setIsLoading}
      setAsyncState={props.setAsyncState}
      inputValue={props.asyncInputValue}
      setAsyncInputValue={props.setAsyncInputValue}
      pathname={props.pathname}
      name={"Async"}
    />
  );

  if (info && repo) {
    return (
      <>
        {headerComponent}
        {props.create("", info, repo)}
      </>
    );
  }

  return (
    <>
      {headerComponent}
      {props.create("Async Page Request")}
    </>
  );
};

export default AsyncPage;
