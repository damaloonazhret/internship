import { ColorSetting } from "./ColorSetting";

const Colors = ({ ...props }) => {
  return (
    <>
      <ColorSetting purpose="background" {...props} />
      <ColorSetting purpose="text" {...props} />
    </>
  );
};

export default Colors;
