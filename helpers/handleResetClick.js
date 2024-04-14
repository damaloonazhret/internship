import {BLACK_ROOT, DARK, themeUser, WHITE, WHITE_ROOT} from "../index.js";
import {setRootProperty} from "./initialTheme.js";
import {rootColors} from "./rootColors.js";
import {setColors} from "./setColors.js";

function setThemeProperty(property, value) {
    setRootProperty(property, value)
    const [white, black] = rootColors();
    setColors(black, white);
}

export function handleResetClick(e, property) {
    e.preventDefault();
    if (themeUser === DARK && property === 'text') {
        setThemeProperty(WHITE_ROOT, '#ffffff')
        setThemeProperty('--green', '#27ae60')
        sessionStorage.removeItem(WHITE_ROOT);
    }
    if (themeUser === DARK && property === 'bg') {
        setThemeProperty(BLACK_ROOT, '#1a1a1a')
        sessionStorage.removeItem(BLACK_ROOT);
    }
    if (themeUser === WHITE && property === 'text') {
        setThemeProperty(WHITE_ROOT, '#1a1a1a')
        setThemeProperty('--green', '#27ae60')
        sessionStorage.removeItem(WHITE_ROOT);
    }
    if (themeUser === WHITE && property === 'bg') {
        setThemeProperty(BLACK_ROOT, '#ffffff')
        sessionStorage.removeItem(BLACK_ROOT);
    }
}