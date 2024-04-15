import {setRootProperty} from "./initialTheme.js";
import {BG, BLACK_ROOT, DARK, GREEN_ROOT, TEXT, themeUser, WHITE_ROOT} from "../index.js";
import {invertHexColor} from "./invertorHex.js";

export function handleInputChange(e, property) {
    if (property === TEXT) {
        setRootProperty(WHITE_ROOT, e.target.value)
        const invertedColor = invertHexColor(e.target.value);
        setRootProperty(GREEN_ROOT, invertedColor)
        sessionStorage.setItem(WHITE_ROOT, e.target.value);
    }
    if (property === BG) {
        setRootProperty(BLACK_ROOT, e.target.value)
        sessionStorage.setItem(BLACK_ROOT, e.target.value);
    }
}