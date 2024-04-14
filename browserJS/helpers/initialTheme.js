import {rootColors} from "./rootColors.js";
import {setThemeColorsAndPosition} from "./setThemeColors.js";
import {
    BLACK_ROOT, DARK,
    LEFT_SWITCH,
    RIGHT_SWITCH,
    switcherLabel,
    switcherToggler,
    themeUser,
    WHITE,
    WHITE_ROOT
} from "../index.js";

export function setRootProperty(color, session) {
    document.documentElement.style.setProperty(color, session)
}

export function initialTheme() {
    const sessionTextColor = sessionStorage.getItem(WHITE_ROOT);
    const sessionBGColor = sessionStorage.getItem(BLACK_ROOT);
    if (themeUser === WHITE) {
        switcherLabel.classList.add(WHITE);
        if (sessionBGColor) setRootProperty(WHITE_ROOT, sessionBGColor);
        if (sessionTextColor) setRootProperty(BLACK_ROOT, sessionTextColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(RIGHT_SWITCH, switcherToggler, white, black);
    } else {
        localStorage.setItem('theme', DARK)
        if (sessionTextColor) setRootProperty(WHITE_ROOT, sessionTextColor);
        if (sessionBGColor) setRootProperty(BLACK_ROOT, sessionBGColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(LEFT_SWITCH, switcherToggler, black, white);
    }
}