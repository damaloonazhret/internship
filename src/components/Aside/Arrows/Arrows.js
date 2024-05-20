import { Arrow } from "./Arrow/Arrow";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {memo, useCallback} from "react";

export const Arrows = memo(function Arrows() {
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
