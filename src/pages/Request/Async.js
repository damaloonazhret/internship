import { Request } from "./Request";

export const Async = ({ setAsyncState, create, asyncState, render }) => {
  return (
    <Request
      setState={setAsyncState}
      create={create}
      state={asyncState}
      render={render}
      title="Async Page Request"
    />
  );
};
