import { Request } from "../../components/common/GitHub/Request";
import { FC } from "react";
import { GithubData } from "../../components/Main/Main";

interface AsyncProps {
  setAsyncState: (newState: GithubData) => void;
  asyncState: GithubData | {};
  render: (title: string) => JSX.Element;
}

const Async: FC<AsyncProps> = ({ setAsyncState, asyncState, render }) => {
  return (
    <Request
      setState={setAsyncState}
      state={asyncState}
      render={render}
      title="Async Page Request"
    />
  );
};

export default Async;
