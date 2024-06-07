import { DARK } from "../../../../components/constants/constants";
import { Button } from "../../../../components/common/Button";
import { ColorSettingProps } from "./ColorSetting";
import { FC } from "react";

type ResetButtonProps = Pick<
  ColorSettingProps,
  "theme" | "purpose" | "resetPrimaryColor" | "resetSecondaryColor"
>;

export const ResetButton: FC<ResetButtonProps> = ({
  theme,
  purpose,
  resetPrimaryColor,
  resetSecondaryColor,
}) => {
  const isPrimary =
    (theme === DARK && purpose === "background") ||
    (theme !== DARK && purpose === "text");
  return (
    <Button
      onClick={isPrimary ? resetPrimaryColor : resetSecondaryColor}
      children="Reset"
    />
  );
};
