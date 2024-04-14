import {themeUser} from "../index.js";

function setThemeProperty(property, value) {
    if (themeUser === 'white') {
        document.documentElement.style.setProperty(property, value);
    } else {
        document.documentElement.style.setProperty(property === '--white' ? '--black' : '--white', value);
    }
}

export function handleResetClick(e, property, defaultValue) {
    e.preventDefault();
    setThemeProperty(property, defaultValue);
    sessionStorage.removeItem(property === '--white' ? 'text' : 'bg');
}