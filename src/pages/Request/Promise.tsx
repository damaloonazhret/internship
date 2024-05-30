import { Request } from "../../components/common/GitHub/Request";
import { FunctionComponent } from "react";
import { GithubData } from "../../components/Main/Main";

interface AsyncProps {
  setPromiseState: (newState: GithubData) => void;
  promiseState: GithubData | {};
  render: (title: string) => JSX.Element;
}

const Promises: FunctionComponent<AsyncProps> = ({
  setPromiseState,
  promiseState,
  render,
}) => {
  return (
    <Request
      setState={setPromiseState}
      state={promiseState}
      render={render}
      title="Promise Page Request"
    ></Request>
  );
};

export default Promises;
