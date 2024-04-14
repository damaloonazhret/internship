export function handleHistoryNavigation() {
    const back = document.querySelector('#back');
    const forward = document.querySelector('#forward');
    back.addEventListener('click', () => {
        history.back();
    });

    forward.addEventListener('click', () => {
        history.forward();
    });
}