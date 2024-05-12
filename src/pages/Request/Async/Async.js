import { Request } from "../Request";

const Async = ({ setAsyncState, create, asyncState, render }) => {
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

export default Async;
