import {convertToFullHexColor} from "./convertToFullHexColor.js";
import {rootColors} from "./rootColors.js";

export function setLocalTheme(theme) {
    const [white, black] = rootColors();
    localStorage.setItem('theme', theme);
    sessionStorage.setItem('text', convertToFullHexColor(white));
    sessionStorage.setItem('bg', convertToFullHexColor(black));
}