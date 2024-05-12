import { WHITE } from "../../components/common/constants/constants";
import { setProperty } from "./setProperty";

export function setGlobalTheme(currentTheme, colors) {
  const BLACK_ROOT = "--black";
  const WHITE_ROOT = "--white";

  if (currentTheme === WHITE) {
    setProperty(BLACK_ROOT, colors.secondary);
    setProperty(WHITE_ROOT, colors.primary);
  } else {
    setProperty(BLACK_ROOT, colors.primary);
    setProperty(WHITE_ROOT, colors.secondary);
  }
}
