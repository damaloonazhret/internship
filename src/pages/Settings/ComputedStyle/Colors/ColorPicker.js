import { DARK } from "../../../../components/constants/constants";
import { Input } from "../../../../components/common/Input/Input";

export const ColorPicker = ({
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
      value={isPrimary ? colors.primary : colors.secondary}
      ref={isPrimary ? primaryColorRef : secondaryColorRef}
      onChange={isPrimary ? changePrimaryColor : changeSecondaryColor}
    />
  );
};
