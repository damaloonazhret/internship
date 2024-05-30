import { Arrow } from "./Arrow/Arrow";
import { useHistory } from "react-router-dom";
import {FunctionComponent, memo, useCallback} from "react";
import './index.scss';

export const Arrows: FunctionComponent = memo(function Arrows() {
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const goForward = useCallback(() => {
    history.goForward();
  }, [history]);

  return (
    <nav className="navArrows">
      <Arrow className="back" handleClick={goBack} content={"<"} />
      <Arrow className="forward" handleClick={goForward} content={">"} />
    </nav>
  );
});
