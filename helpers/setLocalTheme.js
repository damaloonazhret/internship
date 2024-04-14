import {convertToFullHexColor} from "./convertToFullHexColor.js";
import {rootColors} from "./rootColors.js";
import {BLACK_ROOT, WHITE_ROOT} from "../index.js";

export function setLocalTheme(theme) {
    const [white, black] = rootColors();
    localStorage.setItem('theme', theme);
    sessionStorage.setItem(WHITE_ROOT, convertToFullHexColor(white));
    sessionStorage.setItem(BLACK_ROOT, convertToFullHexColor(black));
}