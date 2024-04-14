import {rootColors} from "./rootColors.js";
import {setThemeColorsAndPosition} from "./helper.js";
import {
    BLACK_ROOT,
    LEFT_SWITCH,
    RIGHT_SWITCH,
    switcherLabel,
    switcherToggler,
    themeUser,
    WHITE,
    WHITE_ROOT
} from "../index.js";

const sessionTextColor = sessionStorage.getItem('text');
const sessionBGColor = sessionStorage.getItem('bg');

export function setRootProperty(color, session) {
    document.documentElement.style.setProperty(color, session)
}

export function initialTheme() {
    if (themeUser === WHITE) {
        switcherLabel.classList.add(WHITE);
        if (sessionBGColor) setRootProperty(WHITE_ROOT, sessionBGColor);
        if (sessionTextColor) setRootProperty(BLACK_ROOT, sessionTextColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(RIGHT_SWITCH, switcherToggler, white, black);
    } else {
        if (sessionTextColor) setRootProperty(WHITE_ROOT, sessionTextColor);
        if (sessionBGColor) setRootProperty(BLACK_ROOT, sessionBGColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(LEFT_SWITCH, switcherToggler, black, white);
    }
}