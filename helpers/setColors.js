import {convertToFullHexColor} from "./convertToFullHexColor.js";
import {DEFAULT_COLOR_BLACK, DEFAULT_COLOR_WHITE} from "../index.js";

export function setColors(primary = DEFAULT_COLOR_BLACK, secondary = DEFAULT_COLOR_WHITE) {
    const bg = document.querySelector('#BG');
    const text = document.querySelector('#text');
    bg ? bg.value = convertToFullHexColor(primary) : null;
    text ? text.value = convertToFullHexColor(secondary) : null;
}