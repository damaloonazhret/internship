import { FunctionComponent } from "react";

interface ArrowProps {
  className: string;
  handleClick: () => void;
  content: string;
}

export const Arrow: FunctionComponent<ArrowProps> = ({
  className,
  handleClick,
  content,
}) => {
  return (
    <p className={className} onClick={handleClick}>
      {content}
    </p>
  );
};
