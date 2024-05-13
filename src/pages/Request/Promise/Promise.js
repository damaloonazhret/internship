import { Request } from "../Request";

const Promises = ({ setPromiseState, promiseState, render }) => {
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
