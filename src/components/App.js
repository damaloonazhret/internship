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

class PromisePage extends Component {
  render() {
    const props = this.props;
    const promiseInfo = this.props.state.promise;
    const info = promiseInfo.userInfoMy;
    const repo = promiseInfo.userRepoMy;
    if (info && repo) return props.create("", info, repo);
    return (
      <>
        {createElement(Header, { props: props })}
        {props.create("Promise Page Request")}
      </>
    );
  }
}

class AsyncPage extends Component {
  render() {
    const props = this.props;
    const asyncInfo = props.state.async;
    const info = asyncInfo.userInfoMy;
    const repo = asyncInfo.userRepoMy;
    if (info && repo)
      return (
        <>
          {createElement(Header, { props: props })}
          {props.create("", info, repo)}
        </>
      );
    return (
      <>
        {createElement(Header, { props: props })}
        {props.create("Async Page Request")}
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
    // try {
    const newUserData = await this.asyncRequest(username);
    const asyncState = this.extractUserData(newUserData);
    return asyncState;
    // const userData = setupUserData(activePage, userInfoMy, userRepoMy);
    // localStorage.setItem(`user:${username}`, JSON.stringify(userData));
    // drawPage(userData);
    // setErrorSpan("");
    // setOption(username);
    // } catch (error) {
    //   setErrorSpan(error);
    // }
  };

  async setRepos(e) {
    e.preventDefault();
    const hash = window.location.pathname;
    if (hash === "/fetch") {
      const asyncState = await this.getUserInfoAsync(this.state.name);
      this.props.props.setAsyncState(asyncState);
    }
    if (hash === "/promise") {
      const promiseState = await this.getUserInfo(this.state.name);
      this.props.setPromiseState(promiseState);
    }
  }

  setName = (e) => {
    const newName = e.target.value;
    const hash = window.location.pathname;
    if (hash === "/fetch") {
      this.props.props.setAsyncInputValue(newName);
    }
    if (hash === "/promise") {
      this.props.props.setPromiseInputValue(newName);
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

        createElement("p", { id: "head-info" }, "Promise Request"),
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
            value: (hash === '/fetch')
              ? this.props.props.asyncInputValue
              : this.props.props.promiseInputValue,
            onChange: this.setName,
          }),
          createElement("datalist", { id: "names" }),
          createElement("span", { className: "error" }),
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
                state: this.props.state,
                create: this.props.create,
                setAsyncInputValue: this.props.setAsyncInputValue,
                asyncInputValue: this.props.state.asyncInputValue,
              }),
          }),
          createElement(Route, {
            path: "/home",
            component: HomePage,
          }),
          createElement(Route, {
            path: "/promise",
            render: () => createElement(PromisePage, {
              state: this.props.state,
              create: this.props.create,
              setPromiseInputValue: this.props.setPromiseInputValue,
              promiseInputValue: this.props.state.promiseInputValue,
            }),
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
      <main className="mainContent">
        <article>
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
          <span>{repoData.full_name}</span>
          <span>{repoData.language}</span>
          <span>Visibility: {repoData.visibility}</span>
          <a href={repoData.html_url} target="_blank">
            Link to repo
          </a>
          <span>{repoData.created_at}</span>
        </div>
      );
    });
  }

  createUserInfoHTML(userInfo) {
    return (
      <div className="user-info">
        <a href={userInfo.html_url} target="_blank">
          <img src={userInfo.avatar_url} alt="avatar" className="avatar" />
        </a>
        <span>Name: {userInfo.name}</span>
        <span>{userInfo.login}</span>
      </div>
    );
  }

  render() {
    return createElement(
      Router,
      null,
      createElement(Aside),
      createElement(Main, {
        create: (title, userInfoMy, userRepoMy) =>
          this.create(title, userInfoMy, userRepoMy),
        state: this.state,
        setAsyncState: (newState) => this.setState({ async: newState }),
        setAsyncInputValue: (newValue) =>
          this.setState({ asyncInputValue: newValue }),
        setPromiseState: (newState) => this.setState({ promise: newState }),
        setPromiseInputValue: (newValue) =>
          this.setState({ promiseInputValue: newValue }),
      }),
    );
  }
}

export default App;
