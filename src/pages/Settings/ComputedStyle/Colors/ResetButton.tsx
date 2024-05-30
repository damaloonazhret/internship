import { DARK } from "../../../../components/constants/constants";
import { Button } from "../../../../components/common/Button";
import {Themes} from "../../../../components/App";
import {Purpose} from "./ColorSetting";

interface ResetButtonProps {
  theme: Themes,
  purpose: Purpose,
  resetPrimaryColor: () => void;
  resetSecondaryColor: () => void;
}

export const ResetButton = ({
  theme,
  purpose,
  resetPrimaryColor,
  resetSecondaryColor,
}: ResetButtonProps) => {
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
