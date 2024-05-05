import Header from "../../Header/Header";
import {memo} from "react";

const AsyncPage = (props) => {
  const asyncState = props.asyncState;
  const info = asyncState.userInfoMy;
  const repo = asyncState.userRepoMy;

  return (
    <>
      {
        <Header
          setIsLoading={props.setIsLoading}
          setAsyncState={props.setAsyncState}
          inputValue={props.asyncInputValue}
          setAsyncInputValue={props.setAsyncInputValue}
          pathname={props.pathname}
          name={"Async"}
        />
      }
      {info && repo
        ? props.create("", info, repo)
        : props.create("Async Page Request")}
    </>
  );
};

export default memo(AsyncPage);
