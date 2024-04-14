import {BLACK_ROOT, WHITE_ROOT} from "../index.js";
import {setRootProperty} from "./initialTheme.js";

export function setSessionColor(primary, secondary) {
    setRootProperty(BLACK_ROOT, primary);
    setRootProperty(WHITE_ROOT, secondary);
}