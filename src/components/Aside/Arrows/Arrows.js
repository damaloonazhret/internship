import style from "./arrows.module.scss";
import { useHistory } from "react-router-dom";
import {memo, useCallback} from "react";

const Arrows = () => {
  const history = useHistory();

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const goForward = useCallback(() => {
    history.goForward();
  }, [history]);

  return (
    <nav className={style.navArrows}>
      <p className={style.back} onClick={goBack}>
        {"<"}
      </p>
      <p className={style.forward} onClick={goForward}>
        {">"}
      </p>
    </nav>
  );
};

export default memo(Arrows);
