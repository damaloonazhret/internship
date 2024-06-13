import { Request } from "../../components/common/GitHub/Request";
import { useAppSelector } from "../../services/hooks/redux/redux";

const Promises = () => {
  const { userName } = useAppSelector((state) => state.promise);

  return <Request title="Promise Page Request" userName={userName} />;
};

export default Promises;
