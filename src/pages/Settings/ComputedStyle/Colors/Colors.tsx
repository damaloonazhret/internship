import { ColorSetting } from "./ColorSetting";
import {FC, RefObject} from "react";
import {ThemeColorsState, ThemeState} from "../../../../components/App";
import {RefObjectWithValue} from "../../../../components/common/Input/Input";

export interface ColorsProps {
    primaryColorRef: RefObject<RefObjectWithValue>;
    secondaryColorRef: RefObject<RefObjectWithValue>;
    changePrimaryColor: () => void;
    changeSecondaryColor: () => void;
    resetPrimaryColor: () => void;
    resetSecondaryColor: () => void;
    theme: ThemeState;
    colors: ThemeColorsState;
}

const Colors: FC<ColorsProps> = ({ ...props }) => {
  return (
    <>
      <ColorSetting purpose="background" {...props} />
      <ColorSetting purpose="text" {...props} />
    </>
  );
};

export default Colors;
