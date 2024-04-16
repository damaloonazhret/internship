import {BLACK_ROOT, WHITE_ROOT} from "../index.js";

export function rootColors() {
    const rootStyles = getComputedStyle(document.documentElement);
    const white = rootStyles.getPropertyValue(WHITE_ROOT);
    const black = rootStyles.getPropertyValue(BLACK_ROOT);
    return [white, black];
}