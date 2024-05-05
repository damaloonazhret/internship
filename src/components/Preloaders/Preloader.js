import style from "../Header/header.module.scss";
import { Component } from "react";

class Preloader extends Component {
  render() {
    return (
      <div
        className={`${style.preloader} ${this.props.isLoading ? style.preloaderActive : ""}`}
      ></div>
    );
  }
}

export default Preloader;
