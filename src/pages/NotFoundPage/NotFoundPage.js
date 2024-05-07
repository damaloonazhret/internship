import { Span } from "../../components/common/Span";

const NotFoundPage = () => {
  return (
    <article className="article">
      <h2>404 Not Found</h2>
      <Span text="Sorry, the page you are looking for does not exist." />
    </article>
  );
};

export default NotFoundPage;
