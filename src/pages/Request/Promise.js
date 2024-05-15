import { Request } from "../../components/common/GitHub/Request";

export const Promises = ({ setPromiseState, promiseState, render }) => {
  return (
    <Request
      setState={setPromiseState}
      state={promiseState}
      render={render}
      title="Promise Page Request"
    >

    </Request>
  );
};
