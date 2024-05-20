import { ColorSetting } from "./ColorSetting";

export const Colors = ({ ...props }) => {
  return (
    <>
      <ColorSetting purpose="background" {...props} />
      <ColorSetting purpose="text" {...props} />
    </>
  );
};
