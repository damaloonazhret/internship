import style from "../Header/header.module.scss";

const Preloader = (props) => {
  return (
    <div
      className={`${style.preloader} ${props.isLoading ? style.preloaderActive : ""}`}
    ></div>
  );
};

export default Preloader;
