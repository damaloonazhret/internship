import { withRouter } from "react-router-dom";
import style from './arrows.module.scss'
import {useCallback} from "react";

const Arrows = (props) => {
  const goBack = useCallback (() => {
    props.history.goBack();
  }, [props.history]);

  const goForward = useCallback( () => {
    props.history.goForward();
  }, [props.history]);

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

export default withRouter(Arrows);
