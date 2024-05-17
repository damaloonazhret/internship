import { setProperty } from "./setProperty";
import {
  BLACK_ROOT,
  DARK,
  DEFAULT_COLOR_BLACK,
  DEFAULT_COLOR_WHITE,
  WHITE,
  WHITE_ROOT,
} from "../../components/constants/constants";

export function setGlobalTheme(theme) {
  if (theme === WHITE) {
    setProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE);
    setProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK);
  }

  if (theme === DARK) {
    setProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK);
    setProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE);
  }
}
