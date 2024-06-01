import { DARK } from "../../../../components/constants/constants";
import { Button } from "../../../../components/common/Button";
import { ThemeState } from "../../../../components/App";
import { Purpose } from "./ColorSetting";
import { FC } from "react";

interface ResetButtonProps {
  theme: ThemeState;
  purpose: Purpose;
  resetPrimaryColor: () => void;
  resetSecondaryColor: () => void;
}

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
