import {setRootProperty} from "./initialTheme.js";
import {BLACK_ROOT, DEFAULT_TRANSITION, TRANSITION_ALL, WHITE_ROOT} from "../index.js";

function disableTransition() {
    setRootProperty(TRANSITION_ALL, 'none');
}

function enableTransition() {
    setRootProperty(TRANSITION_ALL, DEFAULT_TRANSITION);
}

export function setThemeColorsAndPosition(percent, switcherToggler, main, secondary) {
    disableTransition();
    setRootProperty(BLACK_ROOT, main);
    setRootProperty(WHITE_ROOT, secondary);
    switcherToggler.style.left = percent;
    setTimeout(enableTransition, 0);
}