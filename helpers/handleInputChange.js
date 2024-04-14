export function handleInputChange(e, property) {
    document.documentElement.style.setProperty(property, e.target.value);
    sessionStorage.setItem(property === '--white' ? 'text' : 'bg', e.target.value);
}