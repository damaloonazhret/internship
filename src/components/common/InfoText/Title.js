import { Info } from "./Info";

export const Title = ({ title }) => {
  return (
    <main className="mainContent">
      <Info title={title} type="h1" />
    </main>
  );
};
