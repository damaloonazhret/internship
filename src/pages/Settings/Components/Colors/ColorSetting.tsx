import { Txt } from "components/common/InfoText/Txt";
import { BG_INFO, TXT_INFO } from "components/constants";
import { ColorPicker } from "pages/Settings/Components/Colors/ColorPicker";
import { ResetButton } from "pages/Settings/Components/Colors/ResetButton";
import { FC } from "react";
import { ColorsProps } from "pages/Settings/Components/Colors/Colors";

export type Purpose = "text" | "background";

export interface ColorSettingProps extends ColorsProps {
  purpose: Purpose;
}

export const ColorSetting: FC<ColorSettingProps> = ({ purpose, ...props }) => {
  return (
    <div className={`settings__${purpose === "text" ? "txt" : "bg"}`}>
      <label>
        <Txt text={purpose === "text" ? TXT_INFO : BG_INFO} />
      </label>
      <ColorPicker purpose={purpose} {...props} />
      <ResetButton purpose={purpose} {...props} />
    </div>
  );
};
