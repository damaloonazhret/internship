import {setOption} from "./setOption.js";

export function setupOptions() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.substring(0, 4) === 'user') {
            setOption(key.substring(5))
        }
    }
}