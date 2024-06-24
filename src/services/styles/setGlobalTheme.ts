import { setProperty } from "./setProperty";
import {
  BLACK_ROOT,
  WHITE,
  WHITE_ROOT,
} from "components/constants";
import { ThemeColors } from "components/App";

export function setGlobalTheme(currentTheme: string, colors: ThemeColors) {
  if (currentTheme === WHITE) {
    setProperty(BLACK_ROOT, colors.secondary);
    setProperty(WHITE_ROOT, colors.primary);
  } else {
    setProperty(BLACK_ROOT, colors.primary);
    setProperty(WHITE_ROOT, colors.secondary);
  }
}
