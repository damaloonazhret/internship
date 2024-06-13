import { Request } from "../../components/common/GitHub/Request";
import { useAppSelector } from "../../services/hooks/redux/redux";

const Async = () => {
  const { userName } = useAppSelector((state) => state.async);

  return <Request title="Async Page Request" userName={userName} />;
};

export default Async;
