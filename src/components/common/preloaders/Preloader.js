import style from './index.css'

const Preloader = (props) => {
  return (
    <div
      className={`${style.preloader} ${props.isLoading ? style.preloaderActive : ""}`}
    ></div>
  );
};

export default Preloader;
