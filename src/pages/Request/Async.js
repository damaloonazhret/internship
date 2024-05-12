import { Request } from "./Request";

export const Async = ({ setAsyncState, asyncState, render }) => {
  return (
    <Request
      setState={setAsyncState}
      state={asyncState}
      render={render}
      title="Async Page Request"
    />
  );
};
