import { Arrow } from "components/Aside/Arrows/Arrow";
import { FC, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export const Arrows: FC = memo(function Arrows() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goForward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  return (
    <nav className="navArrows">
      <Arrow className="back" handleClick={goBack} content={"<"} />
      <Arrow className="forward" handleClick={goForward} content={">"} />
    </nav>
  );
});
