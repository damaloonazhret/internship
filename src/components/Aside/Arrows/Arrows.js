import { withRouter } from "react-router-dom";
import style from './arrows.module.scss'

const Arrows = (props) => {
  const goBack = () => {
    props.history.goBack();
  };

  const goForward = () => {
    props.history.goForward();
  };

  return (
    <nav className={style.navArrows}>
      <p id="back" className={style.back} onClick={goBack}>
        {"<"}
      </p>
      <p id="forward" className={style.forward} onClick={goForward}>
        {">"}
      </p>
    </nav>
  );
};

export default withRouter(Arrows);
