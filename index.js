console.log(`
   ╔══════════════════════╗
   ║                      ║
   ║        Senla!        ║
   ║                      ║
   ╚══════════════════════╝
`);
console.log(`
    __  __     ____         _       __           __    __
   / / / /__  / / /___     | |     / /___  _____/ /___/ /
  / /_/ / _ \\/ / / __ \\    | | /| / / __ \\/ ___/ / __  / 
 / __  /  __/ / / /_/ /    | |/ |/ / /_/ / /  / / /_/ /  
/_/ /_/\\___/_/_/\\____/     |__/|__/\\____/_/  /_/\\__,_/   
                                                         
                                                                 `)

const alertBtn = document.querySelector('#h1 button');
alertBtn.addEventListener('click', () => {
    alert('Alert!')
})


const localStorageTextarea = document.querySelector('.localStorage textarea')
const localStorageBtn = document.querySelector('.localStorage button')

const textLocal = localStorage.getItem('text');
if (textLocal) {
    localStorageTextarea.value = textLocal;
}
localStorageBtn.addEventListener('click', () => {
    const text = localStorageTextarea.value;
    localStorage.setItem('text', text)
})


const sessionStorageTextarea = document.querySelector('.sessionStorage textarea')
const sessionStorageBtn = document.querySelector('.sessionStorage button')

const textSession = sessionStorage.getItem('text');
if (textSession) {
    sessionStorageTextarea.value = textSession;
}
sessionStorageBtn.addEventListener('click', () => {
    const text = sessionStorageTextarea.value;
    sessionStorage.setItem('text', text)
})


const buttonURL = document.getElementById('buttonUrl');
const spanURL = document.getElementById('spanUrl');
buttonURL.addEventListener('click', () => {
    spanURL.innerText = `${window.location.href}`
})


const buttonForward = document.getElementById('goForward');
const errorForward = document.getElementById('errorForward');
buttonForward.addEventListener('click', () => {
    if (window.history.length === 1) {
        errorForward.innerText = 'Sorry, history length = 1'
    } else {
        window.history.forward()
    }
})


const pushToState = document.getElementById('push');
pushToState.addEventListener('click', () => {
    window.history.pushState({}, '', './heroPage.html')
    location.reload();
})


const historyLength = document.getElementById('length');
const historyLengthSpan = document.getElementById('historyLength');
historyLength.addEventListener('click', () => {
    historyLengthSpan.innerText = String(window.history.length);
})
