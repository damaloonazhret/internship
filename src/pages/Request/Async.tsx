import {
  RenderRequest,
  Request,
  SetStateRequest,
  StateRequest,
} from "../../components/common/GitHub/Request";
import { FC } from "react";

interface AsyncProps {
  setAsyncState: SetStateRequest;
  asyncState: StateRequest;
  render: RenderRequest;
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
