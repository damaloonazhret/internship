import { ColorSetting } from "./ColorSetting";
import {FunctionComponent, RefObject} from "react";
import {Themes} from "../../../../components/App";
import {RefObjectWithValue} from "../../../../components/common/Input/Input";

export interface ColorsProps {
    primaryColorRef: RefObject<RefObjectWithValue>;
    secondaryColorRef: RefObject<RefObjectWithValue>;
    changePrimaryColor: () => void;
    changeSecondaryColor: () => void;
    resetPrimaryColor: () => void;
    resetSecondaryColor: () => void;
    theme: Themes;
    colors: {
        primary: string;
        secondary: string;
    };
}

const Colors: FunctionComponent<ColorsProps> = ({ ...props }) => {
  return (
    <>
      <ColorSetting purpose="background" {...props} />
      <ColorSetting purpose="text" {...props} />
    </>
  );
};

export default Colors;
