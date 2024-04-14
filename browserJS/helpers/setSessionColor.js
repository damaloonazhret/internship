import {BLACK_ROOT, WHITE_ROOT} from "../index.js";

export function setSessionColor(primary, secondary) {
    document.documentElement.style.setProperty(BLACK_ROOT, primary);
    document.documentElement.style.setProperty(WHITE_ROOT, secondary);
}