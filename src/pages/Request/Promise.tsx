import {
  RenderRequest,
  Request,
  SetStateRequest,
  StateRequest,
} from "../../components/common/GitHub/Request";
import { FC } from "react";

interface AsyncProps {
  setPromiseState: SetStateRequest;
  promiseState: StateRequest;
  render: RenderRequest;
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
