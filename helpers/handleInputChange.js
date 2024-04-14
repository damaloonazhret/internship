import {setRootProperty} from "./initialTheme.js";
import {BLACK_ROOT, DARK, themeUser, WHITE_ROOT} from "../index.js";
import {invertHexColor} from "./invertorHex.js";

export function handleInputChange(e, property) {
    if (property === 'text') {
        setRootProperty(WHITE_ROOT, e.target.value)
        const invertedColor = invertHexColor(e.target.value);
        setRootProperty('--green', invertedColor)
        sessionStorage.setItem(WHITE_ROOT, e.target.value);
    }
    if (property === 'bg') {
        setRootProperty(BLACK_ROOT, e.target.value)
        sessionStorage.setItem(BLACK_ROOT, e.target.value);
    }
}