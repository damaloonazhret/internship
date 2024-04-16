let themeUser = localStorage.getItem('theme');
const BG = 'bg';
const root = document.querySelector('#root');
const DARK = 'dark';
const TEXT = 'text';
const form = document.querySelector('form');
const WHITE = 'white';
const ACTIVE = 'active';
const urlInfo = document.querySelector('#url');
const contents = document.querySelectorAll('.nav a');
const BLACK_ROOT = '--black';
const WHITE_ROOT = '--white';
const GREEN_ROOT = '--green';
const LEFT_SWITCH = '9%';
const RIGHT_SWITCH = '68%';
const switcherLabel = document.querySelector('.switcher-label');
const TRANSITION_ALL = '--transition-all';
const switcherToggler = document.querySelector('.switcher-toggler');
const DEFAULT_TRANSITION = '0.4s all ease-in';
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

handleHistoryNavigation()
initialTheme();
resetStorages();

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

            case 'Async request Page':
                const userInfo = this.userInfo;
                const userRepo = this.userRepo;
                if (userInfo && userRepo) {
                    const userInfoHTML = `
                                     <div class="user-info">
                                         <span>${userInfo.name}</span>
                                         <a href="${userInfo.html_url}" target="_blank">
                                             <img class="avatar" src="${userInfo.avatar_url}" alt="avatar">
                                         </a>
                                         <span>${userInfo.login}</span>
                                     </div>`;
                    const reposHTML = userRepo.map(el => `
                                     <div class="repos">
                                         <span>${el.full_name}</span>
                                         <span>${el.language}</span>
                                         <span>Visibility: ${el.visibility}</span>
                                         <a href="${el.html_url}" target="_blank">Link to repo</a>
                                         <span>${el.created_at}</span>
                                     </div>`).join('');
                    article.innerHTML = userInfoHTML + reposHTML;
                }
                break

            default:
                break
        }
        return article;
    }

    render() {
        return this.create()
    }
}

;(() => {
    const hash = getCookie('hash') || 'main';
    selectPage(hash);
    hash === 'settings' && customBG();
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
    disableTransition();
    setRootProperty(BLACK_ROOT, main);
    setRootProperty(WHITE_ROOT, secondary);
    switcherToggler.style.left = percent;
    setTimeout(enableTransition, 0);
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

function disableTransition() {
    setRootProperty(TRANSITION_ALL, 'none');
}

function enableTransition() {
    setRootProperty(TRANSITION_ALL, DEFAULT_TRANSITION);
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

function resetCookie() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        setCookie(name, '', 0)
    }
}

function forcedInterrogation() {
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
}

function resetStorages() {
    const resetStorage = document.querySelector('#resetStorage');
    resetStorage.addEventListener('click', () => forcedInterrogation);
}

function hiddenHead(param) {
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    console.log(header)
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
}

function drawPage(page) {
    const pageInstance = new PageCreator(page);
    const pageRender = pageInstance.render();
    root.innerText = '';
    root.append(pageRender);
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

async function asyncRequest(username, span) {
    try {
        const responseUser = await fetch(`https://api.github.com/users/${username}`);
        const responseRepos = await fetch(`https://api.github.com/users/${username}/repos`);
        const response = {};

        if (!responseRepos && !responseUser) {
            span.innerText = 'Failed to fetch repositories'
        }
        const userInfo = await responseUser.json();
        const userRepo = await responseRepos.json();

        response.userInfo = userInfo;
        response.userRepo = userRepo;

        return response;
    } catch (error) {
        span.innerHTML = `Error fetching repositories ${error}`;
        throw new Error(`Error fetching repositories ${error}`);
    }

}

function slicedData(userInfo, userRepo) {
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

async function submitChange(e) {
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
}

function popChange() {
    const hash = window.location.hash.slice(1);
    const set = document.querySelector('.settings');
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
