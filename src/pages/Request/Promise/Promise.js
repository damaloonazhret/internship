import { Request } from "../Request";

const Promises = ({ setPromiseState, create, promiseState, render }) => {
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

export default Promises;
