import {rootColors} from "./helpers/rootColors.js";
import {setLocalTheme} from "./helpers/setLocalTheme.js";
import {PageCreator} from "./helpers/PageCreator.js";
import {extractHashFromLink} from "./helpers/extractHashFromLink.js";
import {getCookie, setCookie} from "./helpers/cookies.js";
import {handleResetClick} from "./helpers/handleResetClick.js";
import {handleInputChange} from "./helpers/handleInputChange.js";
import {handleHistoryNavigation} from "./helpers/handleHistoryNavigation.js";
import {setColors} from "./helpers/setColors.js";
import {setSessionColor} from "./helpers/setSessionColor.js";
import {initialTheme} from "./helpers/initialTheme.js";
import {resetStorages} from "./helpers/resetStorages.js";
import {asyncRequest} from "./async/asyncRequest.js";
import {isValidGitHubUsername} from "./helpers/isValidGitHubUsername.js";
import {setOption} from "./helpers/setOption.js";
import {setupOptions} from "./helpers/setupOptions.js";
import {slicedData} from "./helpers/slicedData.js";

const contents = document.querySelectorAll('.nav a');
const root = document.querySelector('#root');
export const switcherLabel = document.querySelector('.switcher-label');
export const switcherToggler = document.querySelector('.switcher-toggler');
const pages = {
    promise: {
        title: 'Promise request Page',
    },
    async: {
        title: 'Async request Page',
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
export const LEFT_SWITCH = '9%';
export const RIGHT_SWITCH = '68%';
export const WHITE = 'white';
export const DARK = 'dark';
export const BG = 'bg';
export const TEXT = 'text';
export const ACTIVE = 'active';
export const DEFAULT_COLOR_GREEN = '#27ae60';
export const DEFAULT_COLOR_WHITE = '#ffffff';
export const DEFAULT_COLOR_BLACK = '#1a1a1a';
export const BLACK_ROOT = '--black';
export const WHITE_ROOT = '--white';
export const GREEN_ROOT = '--green';
export const DEFAULT_TRANSITION = '0.4s all ease-in';
export const TRANSITION_ALL = '--transition-all';
export let themeUser = localStorage.getItem('theme');
const invalidName = 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.';

handleHistoryNavigation()
initialTheme();
resetStorages();
setupOptions();

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

function hiddenHead(param) {
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    console.log(header)
    header.classList[param]('hidden')
    mainContent.classList[param]('hidden')
}

function classListSwitcher(styleLeft) {
    const [white, black] = rootColors();
    setSessionColor(white, black)
    switcherToggler.style.left = styleLeft;
    const settingsLink = document.querySelector('.settings');
    if (settingsLink.classList.contains(ACTIVE)) {
        setColors(white, black)
        hiddenHead('add');
    }
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
    urlInfo.value = '';
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = {};
    const username = urlInfo.value.trim();
    const errorSpan = document.querySelector('.error');
    const localUsername = localStorage.getItem(`user:${username}`);
    console.log(username)
    if (username === '') {
        errorSpan.innerHTML = 'Empty string';
    } else if (!isValidGitHubUsername(username)) {
        errorSpan.innerText = invalidName;
    } else if (localUsername) {
        const data = JSON.parse(localUsername);
        userData.userRepo = data['userRepo']
        userData.userInfo = data['userInfo']
        errorSpan.innerText = '';
    } else {
        const {userInfo, userRepo} = await asyncRequest(username, errorSpan);
        const {userInfoMy, userRepoMy} = slicedData(userInfo, userRepo);
        userData.userInfo = userInfoMy;
        userData.userRepo = userRepoMy;
        localStorage.setItem(`user:${username}`, JSON.stringify(userData))
        setOption(username)
        errorSpan.innerText = '';
    }
    const activePage = document.querySelector('.nav a.active').innerText.toLowerCase();
    userData.title = pages[activePage].title;
    drawPage(userData)
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
        hiddenHead('add')
        customBG()
    } else {
        hiddenHead('remove')
    }
});

export function customBG() {
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
    if (e.target.textContent === "Settings") {
        hiddenHead('add')
        customBG()
    } else {
        hiddenHead('remove')
    }
}

contents.forEach((content) => content.addEventListener('click', handleNavigation));

function closing(hashName) {
    return () => setCookie('hash', hashName, 1);
}

(() => {
    const hash = getCookie('hash') || 'main';
    selectPage(hash);
    hash === 'settings' && customBG();
})()
