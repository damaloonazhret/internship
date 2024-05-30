import "./index.scss";

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader = ({ isLoading }: PreloaderProps) => {
  return <div id="preloader" className={isLoading ? "loader" : ""} />;
};
