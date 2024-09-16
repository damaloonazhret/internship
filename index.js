console.log(`
      _                  ____            _       _   
     | | __ ___   ____ _/ ___|  ___ _ __(_)_ __ | |_ 
  _  | |/ _\` \\ \\ / / _\` \\___ \\ / __| '__| | '_ \\| __|
 | |_| | (_| |\\ V / (_| |___) | (__| |  | | |_) | |_ 
  \\___/ \\__,_| \\_/ \\__,_|____/ \\___|_|  |_| .__/ \\__|
                                          |_|                   
                                                                 `)
const tHead = document.getElementById('thead');
tHead.innerText = 'Changed via script in file index.html!';
tHead.classList.add('animation');

const tFoot = document.getElementById('tfoot');
tFoot.innerText = 'Please hover over me!';

let throttleTimer;
const throttleDelay = 25;

tFoot.addEventListener('mousemove', function (event) {
    if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
            throttleTimer = null;
            const x = event.clientX;
            const y = event.clientY;
            const tfoot = document.querySelector('#tfoot');
            tfoot.innerText = `Mouse coordinates: x = ${x}, y = ${y}`
        }, throttleDelay);
    }
});

const firstRow = document.querySelectorAll('#firstRow div');
const secondRow = document.querySelectorAll('#secondRow div');
// const allRow = Array.from(firstRow).concat(Array.from(secondRow));
const allRow = [...firstRow, ...secondRow];

allRow.forEach(function (el) {
    el.innerText = `Click me ${el.innerText}`

    el.addEventListener('click', function () {
        alert(el.innerText)
    })
})

const fieldset = document.querySelector('fieldset');
const heading = document.createElement('h1');
let count = 0;

fieldset.innerText = `Mouse leave me please!!`;
heading.innerText = 'YoYoYo, mouse leave me please'
fieldset.append(heading);
fieldset.addEventListener('mouseleave', function () {
    count++
    heading.innerText = `The mouse leave ${count} times`
})

const inputElements = document.querySelectorAll('.data__form-table-cell input');

function focusHandler(e) {
    const h2 = document.querySelector('.data__form-table-cell h2');
    h2.innerText = `Input ${e.target.name || e.target.id} is focused!`;
}

inputElements.forEach(function (el) {
    el.addEventListener('focus', focusHandler);
});

const lastInput = inputElements[inputElements.length - 1];
lastInput.removeEventListener('focus', focusHandler);


const items = document.querySelector('.items');
items.innerHTML = 'Click me to change something :)'

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function changeColors() {
    items.style.backgroundColor = getRandomColor();
    const colorText = getRandomColor();
    const borderColor = getRandomColor();
    items.style.color = colorText;
    items.innerHTML = colorText;
    items.style.borderColor = borderColor;
}

items.addEventListener('click', function () {
    changeColors()
})

const time = document.getElementById('time');
time.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
})
