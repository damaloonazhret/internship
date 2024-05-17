import { Info } from "./Info";

export const Title = ({ title, className, type }) => {
  return (
    <main className="mainContent">
      <Info title={title} className={className} type={type} />
    </main>
  );
};
