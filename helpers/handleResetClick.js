import {BLACK_ROOT, themeUser, WHITE, WHITE_ROOT} from "../index.js";
import {setRootProperty} from "./initialTheme.js";
import {rootColors} from "./rootColors.js";
import {setColors} from "./setColors.js";

function setThemeProperty(property, value) {
    console.log(themeUser)
    if (themeUser === WHITE) {
        setRootProperty(property, value);
    } else {
        setRootProperty(property === WHITE_ROOT ? BLACK_ROOT : WHITE_ROOT, value);
    }
    const [white, black] = rootColors();
    setColors(black, white);
}

export function handleResetClick(e, property, defaultValue) {
    e.preventDefault();
    setThemeProperty(property, defaultValue);
    sessionStorage.removeItem(property === WHITE_ROOT ? 'text' : 'bg');
}