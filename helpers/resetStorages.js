import {resetCookie} from "./cookies.js";

export function resetStorages() {
    const resetStorage = document.querySelector('#resetStorage');
    resetStorage.addEventListener('click', () => {
        localStorage.clear();
        sessionStorage.clear();
        resetCookie();
        window.location.reload();
    })
}