import { DARK } from "../../../components/constants/constants";
import { Button } from "../../../components/common/Button";

export const ResetButton = ({
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
