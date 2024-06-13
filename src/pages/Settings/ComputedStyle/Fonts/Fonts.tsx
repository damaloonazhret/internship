import { FC } from "react";
import { Button } from "../../../../components/common/Button";

interface FontsProps {
  count: {
    fontSize: number;
  };
  FS: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const Fonts: FC<FontsProps> = (props) => {
  return (
    <div className="settings__font">
      <p>Value: {props.count.fontSize ? props.count.fontSize : props.FS}px </p>
      <p>Here you can set a custom font size for the entire page</p>
      <Button className="btn big" onClick={props.decrement}>
        Decrease
      </Button>
      <Button className="btn" onClick={props.reset}>
        Reset
      </Button>
      <Button className="btn big" onClick={props.increment}>
        Increase
      </Button>
    </div>
  );
};

export default Fonts;
