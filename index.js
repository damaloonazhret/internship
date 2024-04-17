let themeUser = localStorage.getItem('theme');
let layout;
const hash = getCookie('hash');
const BG = 'bg';
const DARK = 'dark';
const TEXT = 'text';
const repos = '/repos';
const WHITE = 'white';
const ACTIVE = 'active';
const userUrl = 'https://api.github.com/users/';
const BLACK_ROOT = '--black';
const WHITE_ROOT = '--white';
const GREEN_ROOT = '--green';
const LEFT_SWITCH = '9%';
const RIGHT_SWITCH = '68%';
const DEFAULT_COLOR_GREEN = '#27ae60';
const DEFAULT_COLOR_WHITE = '#ffffff';
const DEFAULT_COLOR_BLACK = '#1a1a1a';
const invalidName = 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.';
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

class PageLayoutBuilder {
    constructor(className, infoHead) {
        this.className = className;
        this.infoHead = infoHead;
    }

    createHeader() {
        const header = document.createElement("header");
        const head = this.infoHead.charAt(0).toUpperCase() + this.infoHead.substring(1);
        header.classList.add('header');
        if (this.className) {
            header.classList.add(this.className);
        }

        const form = document.createElement('form');
        const p = document.createElement('p');
        p.id = 'head-info';
        p.textContent = `${head}`;
        form.appendChild(p);

        const div = document.createElement('div');
        div.classList.add('search');
        form.appendChild(div);

        const input = document.createElement('input');
        input.id = 'url';
        input.setAttribute('list', 'names');
        div.appendChild(input);

        const datalist = document.createElement('datalist');
        datalist.id = 'names';
        div.appendChild(datalist);

        const span = document.createElement('span');
        span.classList.add('error');
        div.appendChild(span);

        header.appendChild(form);

        return header;
    }

    createMain() {
        const main = document.createElement('main');
        main.classList.add('main-content');
        if (this.className) {
            main.classList.add(this.className);
        }
        main.id = 'main';
        return main;
    }
}

if (hash === 'settings') {
    layout = new PageLayoutBuilder('hidden', 'Settings Page');
} else {
    layout = new PageLayoutBuilder(null, hash + ' Request');
}
const body = document.querySelector("body");
body.prepend(layout.createHeader());
body.append(layout.createMain());

const main = document.querySelector('#main');
const form = document.querySelector('form');
const urlInfo = document.querySelector('#url');
const contents = document.querySelectorAll('.nav a');
const switcherLabel = document.querySelector('.switcher-label');
const switcherToggler = document.querySelector('.switcher-toggler');

handleHistoryNavigation()
initialTheme();
setupOptions();

class PageCreator {
    constructor({title, about, input, inputTextColorInfo, inputBGColorInfo, userInfo, userRepo}) {
        this.title = title;
        this.about = about;
        this.input = input;
        this.inputTextColorInfo = inputTextColorInfo;
        this.inputBGColorInfo = inputBGColorInfo;
        this.userInfo = userInfo;
        this.userRepo = userRepo;
    }

    create() {
        const article = document.createElement('article');
        switch (this.title) {
            case 'Settings Page':
                article.innerHTML = this.createColorArticle();
                break
            case 'Async request Page':
            case 'Promise request Page':
                const userInfo = this.userInfo;
                const userRepo = this.userRepo;
                if (userInfo && userRepo) {
                    const userInfoHTML = this.createUserInfoHTML(userInfo);
                    const reposHTML = this.createReposHTML(userRepo);
                    article.innerHTML = userInfoHTML + reposHTML;
                }
                break
            default:
                break
        }
        return article;
    }

    createReposHTML(userRepo) {
        return userRepo.map(el =>
            `<div class="repos">
                    <span>${el.full_name}</span>
                    <span>${el.language}</span>
                    <span>Visibility: ${el.visibility}</span>
                    <a href="${el.html_url}" target="_blank">Link to repo</a>
                    <span>${el.created_at}</span>
                </div>`)
            .join('');
    }

    createUserInfoHTML(userInfo) {
        return `<div class="user-info">
                    <span>Name:${userInfo.name}</span>
                    <a href="${userInfo.html_url}" target="_blank">
                        <img class="avatar" src="${userInfo.avatar_url}" alt="avatar">
                    </a>
                    <span>Login:${userInfo.login}</span>
                </div>`
    }

    createColorArticle() {
        return `<h2>${this.title}</h2>
                ${this.createColorSetting('text', this.inputTextColorInfo, 'text-color')}
                ${this.createColorSetting('BG', this.inputBGColorInfo, 'background-color')}
                <p>${this.about}</p>`;
    }

    createColorSetting(id, label, name) {
        return `<div class="setting">
                    <label for="${id}">${label}</label>
                    <input id="${id}" type='color' name="${name}">
                    <button id="reset-${id}" type="button">Reset</button>
                </div>`;
    }

    render() {
        return this.create()
    }
}

;(() => {
    const hash = getCookie('hash') || 'main';
    selectPage(hash);
    if (hash === 'settings') customBG();
})();

function initialTheme() {
    const sessionTextColor = sessionStorage.getItem(WHITE_ROOT);
    const sessionBGColor = sessionStorage.getItem(BLACK_ROOT);
    const sessionActiveColor = sessionStorage.getItem(GREEN_ROOT);
    if (themeUser === WHITE) {
        switcherLabel.classList.add(WHITE);
        if (sessionBGColor) setRootProperty(WHITE_ROOT, sessionBGColor);
        if (sessionTextColor) setRootProperty(BLACK_ROOT, sessionTextColor);
        if (sessionActiveColor) setRootProperty(GREEN_ROOT, sessionActiveColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(RIGHT_SWITCH, switcherToggler, white, black);
    } else {
        localStorage.setItem('theme', DARK)
        if (sessionTextColor) setRootProperty(WHITE_ROOT, sessionTextColor);
        if (sessionBGColor) setRootProperty(BLACK_ROOT, sessionBGColor);
        if (sessionActiveColor) setRootProperty(GREEN_ROOT, sessionActiveColor);
        const [white, black] = rootColors();
        setThemeColorsAndPosition(LEFT_SWITCH, switcherToggler, black, white);
    }
}

function setLocalTheme(theme) {
    const [white, black] = rootColors();
    localStorage.setItem('theme', theme);
    sessionStorage.setItem(WHITE_ROOT, convertToFullHexColor(white));
    sessionStorage.setItem(BLACK_ROOT, convertToFullHexColor(black));
}

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

function setThemeColorsAndPosition(percent, switcherToggler, main, secondary) {
    setRootProperty(BLACK_ROOT, main);
    setRootProperty(WHITE_ROOT, secondary);
    switcherToggler.style.left = percent;
}

function setThemeProperty(property, value) {
    setRootProperty(property, value)
    const [white, black] = rootColors();
    setColors(black, white);
}

function setRootProperty(color, session) {
    document.documentElement.style.setProperty(color, session)
}

function setSessionColor(primary, secondary) {
    setRootProperty(BLACK_ROOT, primary);
    setRootProperty(WHITE_ROOT, secondary);
}

function setColors(primary = DEFAULT_COLOR_BLACK, secondary = DEFAULT_COLOR_WHITE) {
    const bg = document.querySelector('#BG');
    const text = document.querySelector('#text');
    if (bg) bg.value = convertToFullHexColor(primary);
    if (text) text.value = convertToFullHexColor(secondary);
}

function rootColors() {
    const rootStyles = getComputedStyle(document.documentElement);
    const white = rootStyles.getPropertyValue(WHITE_ROOT);
    const black = rootStyles.getPropertyValue(BLACK_ROOT);
    return [white, black];
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

function convertToFullHexColor(shortHexColor) {
    if (/^#[0-9A-F]{3}$/i.test(shortHexColor)) {
        const r = shortHexColor[1];
        const g = shortHexColor[2];
        const b = shortHexColor[3];
        return `#${r}${r}${g}${g}${b}${b}`;
    }
    return shortHexColor;
}

function extractHashFromLink(link) {
    return link.href.split('#')[1];
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
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function hiddenHead(param) {
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    header.classList[param]('hidden')
    mainContent.classList[param]('hidden')
}

function handleInputChange(e, property) {
    if (property === TEXT) {
        setRootProperty(WHITE_ROOT, e.target.value)
        const invertedColor = invertHexColor(e.target.value);
        setRootProperty(GREEN_ROOT, invertedColor)
        sessionStorage.setItem(WHITE_ROOT, e.target.value);
        sessionStorage.setItem(GREEN_ROOT, invertedColor);
    }
    if (property === BG) {
        setRootProperty(BLACK_ROOT, e.target.value)
        sessionStorage.setItem(BLACK_ROOT, e.target.value);
    }
}

function handleResetClick(e, property) {
    e.preventDefault();
    if (themeUser === DARK && property === TEXT) {
        setThemeProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE)
        setThemeProperty(GREEN_ROOT, DEFAULT_COLOR_GREEN)
        sessionStorage.removeItem(WHITE_ROOT);
        sessionStorage.removeItem(GREEN_ROOT);
    }
    if (themeUser === DARK && property === BG) {
        setThemeProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK)
        sessionStorage.removeItem(BLACK_ROOT);
    }
    if (themeUser === WHITE && property === TEXT) {
        setThemeProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK)
        setThemeProperty(GREEN_ROOT, DEFAULT_COLOR_GREEN)
        sessionStorage.removeItem(WHITE_ROOT);
        sessionStorage.removeItem(GREEN_ROOT);
    }
    if (themeUser === WHITE && property === BG) {
        setThemeProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE)
        sessionStorage.removeItem(BLACK_ROOT);
    }
}

function handleHistoryNavigation() {
    const back = document.querySelector('#back');
    const forward = document.querySelector('#forward');
    back.addEventListener('click', () => history.back());
    forward.addEventListener('click', () => history.forward());
}

function handleNavigation(e) {
    e.preventDefault();
    if (e.target.classList.contains(ACTIVE)) return;
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

function customBG() {
    const bg = document.querySelector('#BG');
    const text = document.querySelector('#text');
    const resetText = document.querySelector('#reset-text');
    const resetBG = document.querySelector('#reset-BG');
    const [white, black] = rootColors();

    setColors(black, white);

    if (resetText) resetText.addEventListener('click', (e) => handleResetClick(e, TEXT));
    if (resetBG) resetBG.addEventListener('click', (e) => handleResetClick(e, BG));
    if (text) text.addEventListener('input', (e) => handleInputChange(e, TEXT));
    if (bg) bg.addEventListener('input', (e) => handleInputChange(e, BG));
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
    headInfoChange();
}

function drawPage(page) {
    const pageInstance = new PageCreator(page);
    const pageRender = pageInstance.render();
    main.innerText = '';
    main.append(pageRender);
}

function closing(hashName) {
    return () => setCookie('hash', hashName, 1);
}

function setUrl() {
    urlInfo.value = '';
}

function setActiveLink(hash, paths) {
    const index = paths.indexOf(hash);
    if (index !== -1) {
        contents.forEach(el => el.classList.remove(ACTIVE));
        contents[index].classList.add(ACTIVE);
    }
}

function appendChild(hash, paths) {
    const page = pages[hash];
    paths.includes(hash) ? drawPage(page) : drawPage(pages['notFound'])
}

function isValidGitHubUsername(username) {
    const githubUsernameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
    return githubUsernameRegex.test(username);
}

function slicedData({userInfo, userRepo}) {
    const userInfoMy = {
        name: userInfo['name'],
        html_url: userInfo['html_url'],
        avatar_url: userInfo['avatar_url'],
        login: userInfo['login'],
    }
    const userRepoMy = userRepo.map(({full_name, language, visibility, html_url, created_at}) => ({
        full_name,
        language,
        visibility,
        html_url,
        created_at,
    }));
    return {userInfoMy, userRepoMy};
}

function setOption(username) {
    const datalist = document.querySelector('#names');
    const option = document.createElement('option');
    option.value = username;
    datalist.appendChild(option);
}

function setupUserData(activePage, bio, repo) {
    const userData = {
        userInfo: bio,
        userRepo: repo,
        title: pages[activePage].title
    };
    pages[activePage] = userData;
    return userData;
}

function setErrorSpan(message) {
    const errorSpan = document.querySelector('.error');
    errorSpan.textContent = message
}

function setupOptions() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.substring(0, 4) === 'user') {
            setOption(key.substring(5))
        }
    }
}

function promiseRequest(username) {
    const userInfoPromise = new Promise((resolve, reject) => {
        let xhrUserInfo = new XMLHttpRequest();
        xhrUserInfo.open('GET', `${userUrl}${username}`);
        xhrUserInfo.onload = function () {
            if (!(xhrUserInfo.status >= 200 && xhrUserInfo.status <= 299)) {
                reject(new Error(`User: error ${xhrUserInfo.status}`));
            } else {
                resolve(xhrUserInfo.response);
            }
        };
        xhrUserInfo.onerror = function () {
            console.log(`Connection error`);
        };
        xhrUserInfo.send();
    });

    const userRepoPromise = new Promise((resolve, reject) => {
        let xhrUserRepo = new XMLHttpRequest();
        xhrUserRepo.open('GET', `${userUrl}${username}${repos}`);
        xhrUserRepo.onload = function () {
            if (!(xhrUserRepo.status >= 200 && xhrUserRepo.status <= 299)) {
                reject(new Error(`User: error ${xhrUserRepo.status}`));
            } else {
                resolve(xhrUserRepo.response);
            }
        };
        xhrUserRepo.onerror = function () {
            console.log(`Connection error`);
        };
        xhrUserRepo.send();
    })

    return Promise.all([userInfoPromise, userRepoPromise])
        .then(([userInfo, userRepo]) => {
            return {userInfo, userRepo}
        })
}

async function asyncRequest(username) {
    try {
        const requestUser = await fetch(`${userUrl}${username}`);
        const requestRepos = await fetch(`${userUrl}${username}${repos}`);

        if (!requestRepos.ok || !requestUser.ok) {
            throw new Error(`User: error ${requestUser.status}`);
        }
        const userInfo = await requestUser.json();
        const userRepo = await requestRepos.json();

        return {userInfo, userRepo};
    } catch (error) {
        throw new Error(`Error fetching data for user ${username} ${error.message}`);
    }
}

function promiseRequestUserInfo(username, activePage) {
    promiseRequest(username)
        .then(response => {
            const newUserData = JSON.parse(response['userInfo']);
            const newRepoData = JSON.parse(response['userRepo']);
            const {userInfoMy, userRepoMy} = slicedData({userInfo: newUserData, userRepo: newRepoData});
            const userData = setupUserData(activePage, userInfoMy, userRepoMy)
            localStorage.setItem(`user:${username}`, JSON.stringify(userData));
            setErrorSpan('')
            setOption(username)
            drawPage(userData)
        })
        .catch(error => {
            setErrorSpan(error)
        });
}

async function asyncRequestUserInfo(username, activePage) {
    try {
        const newUserData = await asyncRequest(username);
        const {userInfoMy, userRepoMy} = slicedData(newUserData);
        const userData = setupUserData(activePage, userInfoMy, userRepoMy)
        localStorage.setItem(`user:${username}`, JSON.stringify(userData));
        drawPage(userData);
        setErrorSpan('')
        setOption(username)
    } catch (error) {
        setErrorSpan(error)
    }
}

async function submitChange(e) {
    e.preventDefault();
    const username = urlInfo.value.trim();
    const localUsername = localStorage.getItem(`user:${username}`);
    const activePage = document.querySelector('.nav a.active').innerText.toLowerCase();

    if (username === '') {
        setErrorSpan('Empty string');
    } else if (!isValidGitHubUsername(username)) {
        setErrorSpan(invalidName);
    } else if (localUsername) {
        const {userInfo, userRepo} = JSON.parse(localUsername);
        const userData = setupUserData(activePage, userInfo, userRepo);
        setErrorSpan('');
        drawPage(userData)
    } else {
        switch (activePage) {
            case 'promise':
                promiseRequestUserInfo(username, activePage)
                break
            case 'async':
                await asyncRequestUserInfo(username, activePage)
                break
            default:
                break
        }
    }
}

function headInfoChange() {
    const headInfo = document.querySelector('#head-info');
    const activeLink = document.querySelector('.nav .active');
    headInfo.innerText = activeLink.textContent + ' Request';
}

function popChange() {
    const hash = window.location.hash.slice(1);
    const set = document.querySelector('.settings');
    headInfoChange();
    selectPage(hash);
    if (set.classList.contains(ACTIVE)) {
        hiddenHead('add')
        customBG()
    } else {
        hiddenHead('remove')
    }
}

switcherLabel.addEventListener('click', themeSwitcher)
form.addEventListener('submit', submitChange)
window.addEventListener('popstate', popChange);
contents.forEach((content) => {
    content.addEventListener('click', handleNavigation)
});
