import {Request} from "components/common/GitHub/Request";
import {useAppSelector} from "services/hooks/redux/redux";
import {selectUserName} from "features/github/selectors";

const Github = () => {
  const userName = useAppSelector(selectUserName);

  return <Request title="Github Page Request" userName={userName}/>;
};

export default Github;
