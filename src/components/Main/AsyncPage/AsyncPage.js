import {memo} from "react";

const AsyncPage = (props) => {
  const asyncState = props.asyncState;
  const info = asyncState.userInfoMy;
  const repo = asyncState.userRepoMy;

  return (
    <>
      {info && repo
        ? props.create("", info, repo)
        : props.create("Async Page Request")}
    </>
  );
};

export default memo(AsyncPage);
