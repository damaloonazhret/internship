import {setRootProperty} from "./initialTheme.js";

function disableTransition() {
    setRootProperty('--transition-all', 'none');
}

function enableTransition() {
    setRootProperty('--transition-all', '0.4s all ease-in');
}

export function setThemeColorsAndPosition(percent, switcherToggler, main, secondary) {
    disableTransition();
    setRootProperty('--black', main);
    setRootProperty('--white', secondary);
    switcherToggler.style.left = percent;
    setTimeout(enableTransition, 0);
}