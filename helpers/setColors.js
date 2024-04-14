import {convertToFullHexColor} from "./convertToFullHexColor.js";

export function setColors(primary = '#1a1a1a', secondary = '#ffffff') {
    const bg = document.querySelector('#BG');
    const text = document.querySelector('#text');
    bg.value = convertToFullHexColor(primary);
    text.value = convertToFullHexColor(secondary);
}