import { DARK } from "components/constants";
import { Input } from "components/common/Input/Input";
import { FC } from "react";
import { ColorSettingProps } from "pages/Settings/Components/Colors/ColorSetting";

export const ColorPicker: FC<ColorSettingProps> = ({
  theme,
  purpose,
  colors,
  primaryColorRef,
  secondaryColorRef,
  changePrimaryColor,
  changeSecondaryColor,
}) => {
  const isPrimary =
    (theme === DARK && purpose === "background") ||
    (theme !== DARK && purpose === "text");
  return (
    <Input
      id="text"
      placeholder=""
      name="color"
      type="color"
      ref={isPrimary ? primaryColorRef : secondaryColorRef}
      value={isPrimary ? colors.primary : colors.secondary}
      onChange={isPrimary ? changePrimaryColor : changeSecondaryColor}
    />
  );
};
