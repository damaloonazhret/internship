import {memo} from "react";

const PromisePage = (props) => {
  const promiseState = props.promiseState;
  const info = promiseState.userInfoMy;
  const repo = promiseState.userRepoMy;

  return (
    <>
      {info && repo
        ? props.create("", info, repo)
        : props.create("Promise Page Request")}
    </>
  );
};

export default memo(PromisePage);
