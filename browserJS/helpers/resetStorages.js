import {resetCookie} from "./cookies.js";

export function resetStorages() {
    const resetStorage = document.querySelector('#resetStorage');
    resetStorage.addEventListener('click', () => {
        const answer = prompt('Are you sure? A positive answer will reset all local values', 'Yes!');
        alert(`You answered ${answer}`)
        const exactAnswer = confirm('You definitely want to reset all values to defaults?');
        if (exactAnswer) {
            localStorage.clear();
            sessionStorage.clear();
            resetCookie();
            window.location.reload();
            alert('All local values were reset');
        } else {
            alert('Reset values canceled');
        }
    })
}