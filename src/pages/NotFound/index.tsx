import { Txt } from "components/common/InfoText/Txt";

const NotFound = () => {
  return (
    <article className="article">
      <h2>404 Not Found</h2>
      <Txt text="Sorry, the page you are looking for does not exist." />
    </article>
  );
};

export default NotFound;
