import {
    BG,
    BLACK_ROOT,
    DARK, DEFAULT_COLOR_BLACK,
    DEFAULT_COLOR_GREEN,
    DEFAULT_COLOR_WHITE,
    GREEN_ROOT,
    TEXT,
    themeUser,
    WHITE,
    WHITE_ROOT
} from "../index.js";
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
    if (themeUser === DARK && property === TEXT) {
        setThemeProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE)
        setThemeProperty(GREEN_ROOT, DEFAULT_COLOR_GREEN)
        sessionStorage.removeItem(WHITE_ROOT);
    }
    if (themeUser === DARK && property === BG) {
        setThemeProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK)
        sessionStorage.removeItem(BLACK_ROOT);
    }
    if (themeUser === WHITE && property === TEXT) {
        setThemeProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK)
        setThemeProperty(GREEN_ROOT, DEFAULT_COLOR_GREEN)
        sessionStorage.removeItem(WHITE_ROOT);
    }
    if (themeUser === WHITE && property === BG) {
        setThemeProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE)
        sessionStorage.removeItem(BLACK_ROOT);
    }
}