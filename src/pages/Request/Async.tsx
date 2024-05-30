import { Request } from "../../components/common/GitHub/Request";
import { FunctionComponent } from "react";
import { GithubData } from "../../components/Main/Main";

interface AsyncProps {
  setAsyncState: (newState: GithubData) => void;
  asyncState: GithubData | {};
  render: (title: string) => JSX.Element;
}

const Async: FunctionComponent<AsyncProps> = ({
  setAsyncState,
  asyncState,
  render,
}) => {
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
