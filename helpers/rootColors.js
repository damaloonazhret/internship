export function rootColors() {
    const rootStyles = getComputedStyle(document.documentElement);
    const white = rootStyles.getPropertyValue('--white');
    const black = rootStyles.getPropertyValue('--black');
    return [white, black];
}