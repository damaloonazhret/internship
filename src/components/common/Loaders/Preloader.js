import './index.scss';

export const Preloader = ({ isLoading }) => {
  return <div id="preloader" className={isLoading ? "loader" : null} />;
};
