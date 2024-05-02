import { Component, createElement } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "./index.scss";
import { getUserInfo, getUserInfoAsync } from "../services/getData";
import { checkValidate } from "../services/validate";

class PromisePage extends Component {
  render() {
    const headerProps = {
      setIsLoading: this.props.setIsLoading,
      setPromiseState: this.props.setPromiseState,
      inputValue: this.props.promiseInputValue,
      setPromiseInputValue: this.props.setPromiseInputValue,
      pathname: this.props.pathname,
      name: "Promise",
    };

    const promiseState = this.props.promiseState;
    const info = promiseState.userInfoMy;
    const repo = promiseState.userRepoMy;

    return (
      <>
        {createElement(Header, headerProps)}
        {info && repo
          ? this.props.create("", info, repo)
          : this.props.create("Promise Page Request")}
      </>
    );
  }
}

class AsyncPage extends Component {
  render() {
    const headerProps = {
      setIsLoading: this.props.setIsLoading,
      setAsyncState: this.props.setAsyncState,
      inputValue: this.props.asyncInputValue,
      setAsyncInputValue: this.props.setAsyncInputValue,
      pathname: this.props.pathname,
      name: "Async",
    };

    const asyncState = this.props.asyncState;
    const info = asyncState.userInfoMy;
    const repo = asyncState.userRepoMy;

    return (
      <>
        {createElement(Header, headerProps)}
        {info && repo
          ? this.props.create("", info, repo)
          : this.props.create("Async Page Request")}
      </>
    );
  }
}

class HomePage extends Component {
  render() {
    return <h2 className="HomePage">Home Page</h2>;
  }
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      error: "",
      isLoading: false,
    };
  }

  async setRepos(e) {
    e.preventDefault();

    const path = this.props.pathname;
    const value = this.props.inputValue;
    const isChecked = checkValidate(value);

    if (isChecked.check) {
      this.setState({ isLoading: true });

      try {
        let data;
        switch (path) {
          case "/fetch":
            data = await getUserInfoAsync(value);
            this.props.setAsyncState(data);
            break;

          case "/promise":
            data = await getUserInfo(value);
            this.props.setPromiseState(data);
            break;

          default:
            break;
        }
      } catch (err) {
        this.setState({ error: err.message });
      } finally {
        this.setState({ isLoading: false, error: "" });
      }
    } else {
      this.setState({ error: isChecked.message });
    }
  }

  setName = (e) => {
    const newName = e.target.value;
    const path = this.props.pathname;
    if (path === "/fetch") {
      this.props.setAsyncInputValue(newName);
    }
    if (path === "/promise") {
      this.props.setPromiseInputValue(newName);
    }
    this.setState({ name: this.props.inputValue });
  };

  render() {
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
            value: this.props.inputValue,
            onChange: this.setName,
          }),
          createElement("datalist", { id: "names" }),
          createElement("span", { className: "error" }, this.state.error),
          createElement("div", {
            id: "preloader",
            className: this.state.isLoading ? "loader" : null,
          }),
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
      createElement(NavLink, { to: "/promise" }, "Promise"),
      createElement(NavLink, { to: "/fetch" }, "Async"),
      createElement(NavLink, { to: "/home" }, "Home"),
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
  static DARK = "dark";
  static WHITE = "white";

  constructor(props) {
    super(props);

    this.state = {
      theme: ThemeSwitcher.DARK,
    };
  }

  themeSwitcher = () => {
    this.setState((prevState) => ({
      theme:
        prevState.theme === ThemeSwitcher.WHITE
          ? ThemeSwitcher.DARK
          : ThemeSwitcher.WHITE,
    }));
  };

  setProperty(root, color) {
    document.documentElement.style.setProperty(root, color);
  }

  globalTheme() {
    const theme = this.state.theme;
    const BLACK_ROOT = "--black";
    const WHITE_ROOT = "--white";
    const DEFAULT_COLOR_WHITE = "#ffffff";
    const DEFAULT_COLOR_BLACK = "#1a1a1a";

    if (theme === ThemeSwitcher.WHITE) {
      this.setProperty(BLACK_ROOT, DEFAULT_COLOR_WHITE);
      this.setProperty(WHITE_ROOT, DEFAULT_COLOR_BLACK);
    }

    if (theme === ThemeSwitcher.DARK) {
      this.setProperty(BLACK_ROOT, DEFAULT_COLOR_BLACK);
      this.setProperty(WHITE_ROOT, DEFAULT_COLOR_WHITE);
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
          className: `switcherLabel ${this.state.theme === ThemeSwitcher.WHITE ? "white" : ""}`,
          htmlFor: "switcher-input",
          onClick: () => this.themeSwitcher(),
        },
        createElement("span", {
          className: `switcherToggler ${this.state.theme === ThemeSwitcher.WHITE ? "white" : ""}`,
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

  create(title, userInfo, userRepo) {
    if (title)
      return createElement(
        "main",
        { className: "mainContent" },
        createElement("h2", {}, title),
      );

    if (!userInfo || !userRepo) return null;

    return createElement(
      "main",
      { key: userInfo ? userInfo.html_url : null, className: "mainContent" },
      createElement(
        "article",
        { key: userInfo ? userInfo.html_url : null },
        this.createUserInfoHTML(userInfo),
        this.createReposHTML(userRepo),
      ),
    );
  }

  createReposHTML(userRepo) {
    return userRepo.map((repoData, index) =>
      createElement(
        "div",
        { key: index, className: "repos" },
        createElement("span", { key: repoData.full_name }, repoData.full_name),
        createElement("span", { key: repoData.language }, repoData.language),
        createElement(
          "span",
          { key: repoData.visibility },
          `Visibility: ${repoData.visibility}`,
        ),
        createElement(
          "a",
          {
            key: repoData.html_url,
            rel: "noreferrer",
            href: repoData.html_url,
            target: "_blank",
          },
          "Link to repo",
        ),
        createElement(
          "span",
          { key: repoData.created_at },
          repoData.created_at,
        ),
      ),
    );
  }

  createUserInfoHTML(userInfo) {
    return createElement(
      "div",
      { key: userInfo ? userInfo.html_url : null, className: "user-info" },
      createElement(
        "a",
        {
          key: userInfo.html_url,
          href: userInfo.html_url,
          rel: "noreferrer",
          target: "_blank",
        },
        createElement("img", {
          key: userInfo.avatar_url,
          src: userInfo.avatar_url,
          alt: "avatar",
          className: "avatar",
        }),
      ),
      createElement("span", { key: userInfo.name }, `Name: ${userInfo.name}`),
      createElement("span", { key: userInfo.login }, userInfo.login),
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
                create: (title, userInfo, userRepo) =>
                  this.create(title, userInfo, userRepo),
                setAsyncState: (newState) => this.setState({ async: newState }),
                setAsyncInputValue: (newValue) =>
                  this.setState({ asyncInputValue: newValue }),
                asyncState: this.state.async,
                asyncInputValue: this.state.asyncInputValue,
                pathname: this.props.location.pathname,
              }),
          }),
          createElement(Route, {
            exact: true,
            path: "/",
            render: () => <Redirect to="/promise" />,
          }),
          createElement(Route, {
            path: "/promise",
            render: () =>
              createElement(PromisePage, {
                create: (title, userInfo, userRepo) =>
                  this.create(title, userInfo, userRepo),
                setPromiseState: (newState) =>
                  this.setState({ promise: newState }),
                setPromiseInputValue: (newValue) =>
                  this.setState({ promiseInputValue: newValue }),
                promiseState: this.state.promise,
                promiseInputValue: this.state.promiseInputValue,
                pathname: this.props.location.pathname,
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
  render() {
    return createElement(
      Router,
      null,
      createElement(Aside),
      createElement(withRouter(Main), {
        setIsLoading: (boolean) => this.setState({ isLoading: boolean }),
      }),
    );
  }
}

export default App;
