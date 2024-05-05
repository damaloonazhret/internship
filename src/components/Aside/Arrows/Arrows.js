import style from "./arrows.module.scss";
import { Component } from "react";
import {withRouter} from "react-router-dom";

class Arrows extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  goForward = () => {
    this.props.history.goForward();
  };

  render() {
    return (
      <nav className={style.navArrows}>
        <p className={style.back} onClick={this.goBack}>
          {"<"}
        </p>
        <p className={style.forward} onClick={this.goForward}>
          {">"}
        </p>
      </nav>
    );
  }
}

export default withRouter(Arrows);
