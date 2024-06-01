import { Request } from "../../components/common/GitHub/Request";
import { FC } from "react";
import { GithubData } from "../../components/Main/Main";

interface AsyncProps {
  setPromiseState: (newState: GithubData) => void;
  promiseState: GithubData | {};
  render: (title: string) => JSX.Element;
}

const Promises: FC<AsyncProps> = ({
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
    />
  );
};

export default Promises;
