import { Request } from "./Request";

export const Promises = ({ setPromiseState, create, promiseState, render }) => {
  return (
    <Request
      setState={setPromiseState}
      create={create}
      state={promiseState}
      render={render}
      title="Promise Page Request"
    />
  );
};
