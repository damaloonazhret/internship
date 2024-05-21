import { Request } from "../../components/common/GitHub/Request";

const Promises = ({ setPromiseState, promiseState, render }) => {
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

export default Promises;
