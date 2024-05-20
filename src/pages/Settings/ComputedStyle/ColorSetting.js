import { Text } from "../../../components/common/InfoText/Text";
import { BG_INFO, TXT_INFO } from "../../../components/constants/constants";
import { ColorPicker } from "./ColorPicker";
import { ResetButton } from "./ResetButton";

export const ColorSetting = ({ purpose, ...props }) => {
  return (
    <div className={`settings__${purpose === "text" ? "txt" : "bg"}`}>
      <label>
        <Text text={purpose === "text" ? TXT_INFO : BG_INFO} />
      </label>
      <ColorPicker purpose={purpose} {...props} />
      <ResetButton purpose={purpose} {...props} />
    </div>
  );
};
