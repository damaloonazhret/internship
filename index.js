function convertToFullHexColor(shortHexColor) {
    if (/^#[0-9A-F]{3}$/i.test(shortHexColor)) {
        const r = shortHexColor[1];
        const g = shortHexColor[2];
        const b = shortHexColor[3];
        return `#${r}${r}${g}${g}${b}${b}`;
    }
    return shortHexColor;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function setCookie(name, value, days) {
    console.log(name, value, days)
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function resetCookie() {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function extractHashFromLink(link) {
    return link.href.split('#')[1];
}

function handleHistoryNavigation() {
    const back = document.querySelector('#back');
    const forward = document.querySelector('#forward');
    back.addEventListener('click', () => {
        history.back();
    });

    forward.addEventListener('click', () => {
        history.forward();
    });
}

function handleInputChange(e, property) {
    if (property === TEXT) {
        setRootProperty(WHITE_ROOT, e.target.value)
        const invertedColor = invertHexColor(e.target.value);
        setRootProperty(GREEN_ROOT, invertedColor)
        sessionStorage.setItem(WHITE_ROOT, e.target.value);
    }
    if (property === BG) {
        setRootProperty(BLACK_ROOT, e.target.value)
        sessionStorage.setItem(BLACK_ROOT, e.target.value);
    }
}

function setThemeProperty(property, value) {
    setRootProperty(property, value)
    const [white, black] = rootColors();
    setColors(black, white);
}

function handleResetClick(e, property) {
    e.preventDefault();
    if (themeUser === DARK && property === TEXT) {
        setThemeProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE)
        setThemeProperty(GREEN_ROOT, DEFAULT_COLOR_GREEN)
        sessionStorage.removeItem(WHITE_ROOT);
    }
    if (themeUser === DARK && property === BG) {
        setThemeProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK)
        sessionStorage.removeItem(BLACK_ROOT);
    }
    if (themeUser === WHITE && property === TEXT) {
        setThemeProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK)
        setThemeProperty(GREEN_ROOT, DEFAULT_COLOR_GREEN)
        sessionStorage.removeItem(WHITE_ROOT);
    }
    if (themeUser === WHITE && property === BG) {
        setThemeProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE)
        sessionStorage.removeItem(BLACK_ROOT);
    }
}


function resetStorages() {
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

class PageCreator {
    constructor({title, about, input, inputTextColorInfo, inputBGColorInfo}) {
        this.title = title;
        this.about = about;
        this.input = input;
        this.inputTextColorInfo = inputTextColorInfo;
        this.inputBGColorInfo = inputBGColorInfo;
    }

    create() {
        const article = document.createElement('article');
        switch (this.input) {
            case 'color':
                article.innerHTML = `<h2>${this.title}</h2>
                                 <div class="setting">
                                     <label for="text">
                                     ${this.inputTextColorInfo}
                                     </label>
                                     <input id="text" type='color' name="text-color">
                                     <button id="resetText" type="button">Reset</button>
                                 </div>
                                 <div class="setting">
                                     <label for="BG">
                                     ${this.inputBGColorInfo}
                                     </label>
                                     <input id="BG" type='color' name="background-color">
                                     <button id="resetBG" type="button">Reset</button>
                                 </div>
                                 <p>${this.about}</p>`
                break
            default:
                article.innerHTML = `<h2>${this.title}</h2><p>${this.about}</p>`;
        }
        return article;
    }

    render() {
        return this.create()
    }
}

function invertHexColor(hex) {
    hex = hex.replace(/^#/, '');

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    r = r.toString(16).padStart(2, '0');
    g = g.toString(16).padStart(2, '0');
    b = b.toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}


function setRootProperty(color, session) {
    document.documentElement.style.setProperty(color, session)
}

function setSessionColor(primary, secondary) {
    setRootProperty(BLACK_ROOT, primary);
    setRootProperty(WHITE_ROOT, secondary);
}

function disableTransition() {
    setRootProperty(TRANSITION_ALL, 'none');
}

function enableTransition() {
    setRootProperty(TRANSITION_ALL, DEFAULT_TRANSITION);
}

function setThemeColorsAndPosition(percent, switcherToggler, main, secondary) {
    disableTransition();
    setRootProperty(BLACK_ROOT, main);
    setRootProperty(WHITE_ROOT, secondary);
    switcherToggler.style.left = percent;
    setTimeout(enableTransition, 0);
}

function setColors(primary = DEFAULT_COLOR_BLACK, secondary = DEFAULT_COLOR_WHITE) {
    const bg = document.querySelector('#BG');
    const text = document.querySelector('#text');
    bg ? bg.value = convertToFullHexColor(primary) : null;
    text ? text.value = convertToFullHexColor(secondary) : null;
}

function setLocalTheme(theme) {
    const [white, black] = rootColors();
    localStorage.setItem('theme', theme);
    sessionStorage.setItem(WHITE_ROOT, convertToFullHexColor(white));
    sessionStorage.setItem(BLACK_ROOT, convertToFullHexColor(black));
}

function rootColors() {
    const rootStyles = getComputedStyle(document.documentElement);
    const white = rootStyles.getPropertyValue(WHITE_ROOT);
    const black = rootStyles.getPropertyValue(BLACK_ROOT);
    return [white, black];
}

function initialTheme() {
    const sessionTextColor = sessionStorage.getItem(WHITE_ROOT);
    const sessionBGColor = sessionStorage.getItem(BLACK_ROOT);
    if (themeUser === WHITE) {
        switcherLabel.classList.add(WHITE);
        if (sessionBGColor) setRootProperty(WHITE_ROOT, sessionBGColor);
        if (sessionTextColor) setRootProperty(BLACK_ROOT, sessionTextColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(RIGHT_SWITCH, switcherToggler, white, black);
    } else {
        localStorage.setItem('theme', DARK)
        if (sessionTextColor) setRootProperty(WHITE_ROOT, sessionTextColor);
        if (sessionBGColor) setRootProperty(BLACK_ROOT, sessionBGColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(LEFT_SWITCH, switcherToggler, black, white);
    }
}


const contents = document.querySelectorAll('.nav a');
const root = document.querySelector('#root');
const switcherLabel = document.querySelector('.switcher-label');
const switcherToggler = document.querySelector('.switcher-toggler');
const pages = {
    main: {
        title: 'Main Page',
        about: 'Ultimately, I try to think of my application\'s main codebase as just stringing together various' +
            ' components and code from many sources. It just controls logic and flow. The real nitty-gritty is' +
            ' handled behind the scenes. This is why frameworks like Backbone are so important - they hide a lot' +
            ' of the details in the background and allow you to just focus on the flow and control of your application.'
    },
    info: {
        title: 'Info Page',
        about: 'Technically, web browsers can control what users see, and sites using Javascript can overwrite' +
            ' anything coming from the original authors. Browsers heavily utilize Javascript to create an ' +
            'interactive Internet; sites like YouTube, Facebook, and Gmail could be crippled without it.'
    },
    settings: {
        title: 'Settings Page',
        input: 'color',
        inputTextColorInfo: 'Here you can set your text content color for the page',
        inputBGColorInfo: 'And here you can choose the background color on the site',
        about: 'A language like Ruby is a toolbox with some really neat little tools that do their ' +
            'job really nicely. JavaScript is a leather sheath with a really really sharp knife inside. ' +
            'That knife can cut anything, and with it you can do anything. You can kill a bear. ' +
            'You can catch fish. You can whittle a piece of wood into a pony. It\'s even a toothpick.'
    },
    notFound: {
        title: '404 error',
        about: 'not found'
    }
}
const LEFT_SWITCH = '9%';
const RIGHT_SWITCH = '68%';
const WHITE = 'white';
const DARK = 'dark';
const BG = 'bg';
const TEXT = 'text';
const ACTIVE = 'active';
const DEFAULT_COLOR_GREEN = '#27ae60';
const DEFAULT_COLOR_WHITE = '#ffffff';
const DEFAULT_COLOR_BLACK = '#1a1a1a';
const BLACK_ROOT = '--black';
const WHITE_ROOT = '--white';
const GREEN_ROOT = '--green';
const DEFAULT_TRANSITION = '0.4s all ease-in';
const TRANSITION_ALL = '--transition-all';
let themeUser = localStorage.getItem('theme');

handleHistoryNavigation()
initialTheme();
resetStorages();

switcherLabel.addEventListener('click', themeSwitcher)

function themeSwitcher() {
    if (switcherLabel.classList.contains(WHITE)) {
        updateTheme(LEFT_SWITCH, 'remove', DARK);
        themeUser = DARK;
    } else {
        updateTheme(RIGHT_SWITCH, 'add', WHITE);
        themeUser = WHITE;
    }
}

function updateTheme(percent, param, themeColor) {
    classListSwitcher(percent);
    switcherLabel.classList[param](WHITE)
    setLocalTheme(themeColor);
}

function classListSwitcher(styleLeft) {
    const [white, black] = rootColors();
    setSessionColor(white, black)
    switcherToggler.style.left = styleLeft;
    const settingsLink = document.querySelector('.settings');
    if (settingsLink.classList.contains(ACTIVE)) setColors(white, black);
}


function selectPage(hash) {
    const paths = Object.keys(pages);
    appendChild(hash, paths);
    setActiveLink(hash, paths);
    setUrl();
    const closingHandler = closing(hash);
    window.addEventListener('unload', closingHandler);
}

const urlInfo = document.querySelector('#url');
const form = document.querySelector('form');

function setUrl() {
    const url = window.location.href;
    urlInfo.value = 'URL: ' + url;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = window.location.href;
    const numberOfEntries = history.length;
    const hash = urlInfo.value.split('#')[1];
    if (url.toLowerCase() !== urlInfo.value.substring(5).toLowerCase()) {
        window.location.href = urlInfo.value.substring(5);
    }
    if (hash && (numberOfEntries > 1)) {
        const page = pages[hash] || null;
        history.replaceState(page, hash, '#' + hash);
    }
})

function drawPage(page) {
    const pageInstance = new PageCreator(page);
    const pageRender = pageInstance.render();
    root.innerText = '';
    root.append(pageRender);
}

function appendChild(hash, paths) {
    const page = pages[hash];
    paths.includes(hash) ? drawPage(page) : drawPage(pages['notFound'])
}

function setActiveLink(hash, paths) {
    const index = paths.indexOf(hash);
    if (index !== -1) {
        contents.forEach(el => el.classList.remove(ACTIVE));
        contents[index].classList.add(ACTIVE);
    }
}

window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1);
    const set = document.querySelector('.settings');
    selectPage(hash);
    if (set.classList.contains(ACTIVE)) {
        customBG()
    }
});

function customBG() {
    const bg = document.querySelector('#BG');
    const text = document.querySelector('#text');
    const resetText = document.querySelector('#resetText');
    const resetBG = document.querySelector('#resetBG');
    const [white, black] = rootColors();

    setColors(black, white);

    resetText ? resetText.addEventListener('click', (e) => handleResetClick(e, TEXT)) : null;
    resetBG ? resetBG.addEventListener('click', (e) => handleResetClick(e, BG)) : null;
    text ? text.addEventListener('input', (e) => handleInputChange(e, TEXT)) : null;
    bg ? bg.addEventListener('input', (e) => handleInputChange(e, BG)) : null;
}

function handleNavigation(e) {
    e.preventDefault();
    if (e.target.classList.contains(ACTIVE)) {
        return;
    }
    const hash = extractHashFromLink(this);
    const capitalizeHash = hash.charAt(0).toUpperCase() + hash.slice(1);
    document.title = capitalizeHash;
    history.pushState(pages[hash], hash, '#' + hash);
    selectPage(hash);
    if (e.target.textContent === "Settings") customBG();
}

contents.forEach((content) => content.addEventListener('click', handleNavigation));

function closing(hashName) {
    console.log('asd')
    return () => setCookie('hash', hashName, 1);
}

(() => {
    const hash = getCookie('hash') || 'main';
    selectPage(hash);
    hash === 'settings' && customBG();
})()
