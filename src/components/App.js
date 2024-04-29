import { Component, createElement } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./index.scss";

const DARK = "dark";
const WHITE = "white";
const repos = "/repos";
const userUrl = "https://api.github.com/users/";
const invalidUsernameMessage =
  "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

class PromisePage extends Component {
  render() {
    const promiseState = this.props.promiseState;
    const info = promiseState.userInfoMy;
    const repo = promiseState.userRepoMy;
    if (info && repo)
      return (
        <>
          {createElement(Header, {
            setIsLoading: this.props.setIsLoading,
            setPromiseState: this.props.setPromiseState,
            promiseInputValue: this.props.promiseInputValue,
            setPromiseInputValue: this.props.setPromiseInputValue,
            name: 'Promise'
          })}
          {this.props.create("", info, repo)}
        </>
      );
    return (
      <>
        {createElement(Header, {
          setIsLoading: this.props.setIsLoading,
          setPromiseState: this.props.setPromiseState,
          promiseInputValue: this.props.promiseInputValue,
          setPromiseInputValue: this.props.setPromiseInputValue,
          name: 'Promise'
        })}
        {this.props.create("Promise Page Request")}
      </>
    );
  }
}

class AsyncPage extends Component {
  render() {
    const asyncState = this.props.asyncState;
    const info = asyncState.userInfoMy;
    const repo = asyncState.userRepoMy;
    if (info && repo)
      return (
        <>
          {createElement(Header, {
            setIsLoading: this.props.setIsLoading,
            setAsyncState: this.props.setAsyncState,
            asyncInputValue: this.props.asyncInputValue,
            setAsyncInputValue: this.props.setAsyncInputValue,
            name: 'Async'
          })}
          {this.props.create("", info, repo)}
        </>
      );
    return (
      <>
        {createElement(Header, {
          setIsLoading: this.props.setIsLoading,
          setAsyncState: this.props.setAsyncState,
          asyncInputValue: this.props.asyncInputValue,
          setAsyncInputValue: this.props.setAsyncInputValue,
          name: 'Async'
        })}
        {this.props.create("Async Page Request")}
      </>
    );
  }
}

class HomePage extends Component {
  render() {
    return <h2>Home Page</h2>;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: "",
    };
  }

  promiseRequest = (username) => {
    const userInfoPromise = new Promise((resolve, reject) => {
      let xhrUserInfo = new XMLHttpRequest();
      xhrUserInfo.open("GET", `${userUrl}${username}`);
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
      xhrUserRepo.open("GET", `${userUrl}${username}${repos}`);
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
    });

    return Promise.all([userInfoPromise, userRepoPromise]).then(
      ([userInfo, userRepo]) => {
        return { userInfo, userRepo };
      },
    );
  };

  getUserInfo = (username) => {
    return this.promiseRequest(username).then((response) => {
      const newUserData = JSON.parse(response["userInfo"]);
      const newRepoData = JSON.parse(response["userRepo"]);
      return this.extractUserData({
        userInfo: newUserData,
        userRepo: newRepoData,
      });
    });
  };

  asyncRequest = async (username) => {
    const options = {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };
    try {
      const requestUser = await fetch(`${userUrl}${username}`, options);
      const requestRepos = await fetch(
        `${userUrl}${username}${repos}`,
        options,
      );

      if (!requestRepos.ok || !requestUser.ok) {
        throw new Error(`User: error ${requestUser.status}`);
      }
      const userInfo = await requestUser.json();
      const userRepo = await requestRepos.json();

      return { userInfo, userRepo };
    } catch (error) {
      throw new Error(
        `Error fetching data for user ${username} ${error.message}`,
      );
    }
  };

  extractUserData = ({ userInfo, userRepo }) => {
    const userInfoMy = {
      name: userInfo["name"],
      html_url: userInfo["html_url"],
      avatar_url: userInfo["avatar_url"],
      login: userInfo["login"],
    };
    const userRepoMy = userRepo.map(
      ({ full_name, language, visibility, html_url, created_at }) => ({
        full_name,
        language,
        visibility,
        html_url,
        created_at,
      }),
    );
    return { userInfoMy, userRepoMy };
  };

  getUserInfoAsync = async (username) => {
    const newUserData = await this.asyncRequest(username);
    return this.extractUserData(newUserData);
  };

  isValidGitHubUsername = (username) => {
    const githubUsernameRegex =
      /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
    return githubUsernameRegex.test(username);
  };

  checkValidate = (value) => {
    if (value === "") {
      this.setState({ error: "Empty string" });
      return false;
    } else if (!this.isValidGitHubUsername(value)) {
      this.setState({ error: invalidUsernameMessage });
      return false;
    } else {
      return true
    }
  };

  async setRepos(e) {
    e.preventDefault();
    const hash = window.location.pathname;

    if (hash === "/fetch") {
      const value = this.props.props.asyncInputValue;
      if (this.checkValidate(value)) {
        this.props.setIsLoading(true)
        const asyncState = await this.getUserInfoAsync(value);
        this.props.setAsyncState(asyncState);
        this.props.setIsLoading(false)
      }

    }
    if (hash === "/promise") {
      const value = this.props.props.promiseInputValue;
      if (this.checkValidate(value)) {
        this.props.setIsLoading(true)
        const promiseState = await this.getUserInfo(value);
        this.props.setPromiseState(promiseState);
        this.props.setIsLoading(false)
      }
    }
  }

  setName = (e) => {
    const newName = e.target.value;
    const hash = window.location.pathname;
    if (hash === "/fetch") {
      this.props.setAsyncInputValue(newName);
    }
    if (hash === "/promise") {
      this.props.setPromiseInputValue(newName);
    }
    this.setState({ name: newName });
  };

  render() {
    const hash = window.location.pathname;
    return createElement(
      "header",
      { className: "header" },
      createElement(
        "form",
        { onSubmit: (e) => this.setRepos(e) },

        createElement("p", { id: "head-info" }, `${this.props.name} Request`),
        createElement(
          "div",
          { className: "search" },
          createElement("input", {
            id: "url",
            className: "url",
            placeholder: "Write GitHub NickName...",
            name: "url",
            type: "search",
            list: "names",
            value:
              hash === "/fetch"
                ? this.props.asyncInputValue
                : this.props.promiseInputValue,
            onChange: this.setName,
          }),
          createElement("datalist", { id: "names" }),
          createElement("span", { className: "error" }, this.state.error),
        ),
      ),
    );
  }
}

class Aside extends Component {
  render() {
    return createElement(
      "aside",
      { className: "aside" },
      createElement(Nav, null),
      createElement(withRouter(Arrows), null),
      createElement(ThemeSwitcher, null),
    );
  }
}

class Nav extends Component {
  render() {
    return createElement(
      "nav",
      { className: "nav" },
      createElement(NavLink, { className: "main", to: "/promise" }, "Promise"),
      createElement(NavLink, { className: "info", to: "/fetch" }, "Async"),
      createElement(NavLink, { className: "settings", to: "/home" }, "Home"),
    );
  }
}

class Arrows extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  goForward = () => {
    this.props.history.goForward();
  };

  render() {
    return createElement(
      "nav",
      { className: "navArrows" },
      createElement(
        "p",
        { id: "back", className: "back", onClick: this.goBack },
        "<",
      ),
      createElement(
        "p",
        { id: "forward", className: "forward", onClick: this.goForward },
        ">",
      ),
    );
  }
}

class ThemeSwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: DARK,
    };
  }

  themeSwitcher = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === WHITE ? DARK : WHITE,
    }));
  };

  globalTheme() {
    const body = document.querySelector(".body");
    if (this.state.theme === WHITE) {
      body.classList.add(WHITE);
    }
    if (this.state.theme === DARK) {
      body.classList.remove(WHITE);
    }
  }

  render() {
    return createElement(
      "div",
      { className: "themeSwitcher" },
      createElement("input", {
        type: "checkbox",
        name: "switcher",
        id: "switcher-input",
        className: "switcher-input",
        onChange: () => this.globalTheme(),
      }),
      createElement(
        "label",
        {
          className: `switcherLabel ${this.state.theme === WHITE ? "white" : ""}`,
          htmlFor: "switcher-input",
          onClick: () => this.themeSwitcher(),
        },
        createElement("span", {
          className: `switcherToggler ${this.state.theme === WHITE ? "white" : ""}`,
        }),
      ),
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      async: {},
      asyncInputValue: "",
      promise: {},
      promiseInputValue: "",
    };
  }

  create(title, userInfoMy, userRepoMy) {
    if (title)
      return createElement(
        "main",
        { className: "mainContent" },
        createElement("div", {}, title),
      );

    if (!userInfoMy || !userRepoMy) return null;

    return (
      <main key={userInfoMy ? userInfoMy.html_url : null} className="mainContent">
        <article key={userInfoMy ? userInfoMy.html_url : null}>
          {this.createUserInfoHTML(userInfoMy)}
          {this.createReposHTML(userRepoMy)}
        </article>
      </main>
    );
  }

  createReposHTML(userRepo) {
    return userRepo.map((repoData) => {
      return (
        <div key={repoData.id} className="repos">
          <span key={repoData.full_name}>{repoData.full_name}</span>
          <span key={repoData.language}>{repoData.language}</span>
          <span key={repoData.visibility}>Visibility: {repoData.visibility}</span>
          <a key={repoData.html_url} rel="noreferrer" href={repoData.html_url} target="_blank">
            Link to repo
          </a>
          <span key={repoData.created_at}>{repoData.created_at}</span>
        </div>
      );
    });
  }

  createUserInfoHTML(userInfo) {
    return (
      <div key={userInfo ? userInfo.html_url : null} className="user-info">
        <a key={userInfo.html_url} href={userInfo.html_url} rel="noreferrer" target="_blank">
          <img key={userInfo.avatar_url} src={userInfo.avatar_url} alt="avatar" className="avatar" />
        </a>
        <span key={userInfo.name}>Name: {userInfo.name}</span>
        <span key={userInfo.login}>{userInfo.login}</span>
      </div>
    );
  }

  render() {
    return (
      <>
        {createElement(
          Switch,
          null,
          createElement(Route, {
            path: "/fetch",
            render: () =>
              createElement(AsyncPage, {
                create: (title, userInfoMy, userRepoMy) =>
                  this.create(title, userInfoMy, userRepoMy),
                setAsyncInputValue: (newValue) =>
                  this.setState({ asyncInputValue: newValue }),
                setAsyncState: (newState) => this.setState({ async: newState }),
                asyncState: this.state.async,
                setIsLoading: this.props.setIsLoading,
                asyncInputValue: this.state.asyncInputValue,
              }),
          }),
          createElement(Route, {
            path: "/promise",
            render: () =>
              createElement(PromisePage, {
                create: (title, userInfoMy, userRepoMy) =>
                  this.create(title, userInfoMy, userRepoMy),
                setPromiseInputValue: (newValue) =>
                  this.setState({ promiseInputValue: newValue }),
                setPromiseState: (newState) => this.setState({ promise: newState }),
                promiseState: this.state.promise,
                setIsLoading: this.props.setIsLoading,
                promiseInputValue: this.state.promiseInputValue,
              }),
          }),
          createElement(Route, {
            path: "/home",
            component: HomePage,
          }),
        )}
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  render() {
    return createElement(
      Router,
      null,
      createElement('div', {
        id: 'preloader',
        className: this.state.isLoading
          ? 'loader'
          : null
      }),
      createElement(Aside),
      createElement(Main, {
        setIsLoading: (boolean) => this.setState({isLoading: boolean}),
      }),
    );
  }
}

export default App;
