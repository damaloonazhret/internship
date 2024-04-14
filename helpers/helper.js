function disableTransition() {
    document.documentElement.style.setProperty('--transition-all', 'none');
}

function enableTransition() {
    document.documentElement.style.setProperty('--transition-all', '0.4s all ease-in');
}

export function setThemeColorsAndPosition(percent, switcherToggler, main, secondary) {
    disableTransition();
    document.documentElement.style.setProperty('--black', main);
    document.documentElement.style.setProperty('--white', secondary);
    switcherToggler.style.left = percent;
    setTimeout(enableTransition, 0);
}