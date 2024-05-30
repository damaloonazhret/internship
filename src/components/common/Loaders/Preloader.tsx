import "./index.scss";

interface Preloader {
  isLoading: boolean;
}

export const Preloader = ({ isLoading }: Preloader) => {
  return <div id="preloader" className={isLoading ? "loader" : ""} />;
};
