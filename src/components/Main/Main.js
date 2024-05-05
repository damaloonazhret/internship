import React, {Component, Suspense} from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import style from "./main.module.scss";
import { HomePg } from "./HomePage";
import { AsyncPg } from "./AsyncPage";
import { PromisePg } from "./PromisePage";
import Loader from "../Preloaders/Loader";

class Main extends Component {
  state = {
    async: {},
    promise: {},
    asyncInputValue: "",
    promiseInputValue: "",
  };

  componentDidMount() {
    const pathName = this.props.location.pathname;
    document.title = `${pathName.charAt(1).toUpperCase()}${pathName.slice(2)} page`;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const pathName = this.props.location.pathname;
      document.title = `${pathName.charAt(1).toUpperCase()}${pathName.slice(2)} page`;
    }
  }

  create = (title, userInfo, userRepo) => {
    if (title)
      return (
        <main className={style.mainContent}>
          <h2>{title}</h2>
        </main>
      );

    if (!userInfo || !userRepo) return null;

    return (
      <main
        key={userInfo ? userInfo.html_url : null}
        className={style.mainContent}
      >
        <article key={userInfo ? userInfo.html_url : null}>
          {this.createUserInfoHTML(userInfo)}
          {this.createReposHTML(userRepo)}
        </article>
      </main>
    );
  };

  createReposHTML = (userRepo) => {
    return userRepo.map((repoData, index) => (
      <div key={index} className={style.repos}>
        <span key={repoData.full_name}>{repoData.full_name}</span>
        <span key={repoData.language}>{repoData.language}</span>
        <span key={repoData.visibility}>Visibility: {repoData.visibility}</span>
        <a
          key={repoData.html_url}
          rel="noreferrer"
          href={repoData.html_url}
          target="_blank"
        >
          Link to repo
        </a>
        <span key={repoData.created_at}>{repoData.created_at}</span>
      </div>
    ));
  };

  createUserInfoHTML = (userInfo) => {
    return (
      <div key={userInfo ? userInfo.html_url : null} className={style.userInfo}>
        <a
          key={userInfo.html_url}
          href={userInfo.html_url}
          rel="noreferrer"
          target="_blank"
        >
          <img
            key={userInfo.avatar_url}
            src={userInfo.avatar_url}
            alt="avatar"
            className={style.avatar}
          />
        </a>
        <span key={userInfo.name}>Name: {userInfo.name}</span>
        <span key={userInfo.login}>{userInfo.login}</span>
      </div>
    );
  };

  render() {
    return (
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route
            path="/fetch"
            render={() => (
              <AsyncPg
                create={(title, userInfo, userRepo) =>
                  this.create(title, userInfo, userRepo)
                }
                setAsyncState={(newState) => this.setState({ async: newState })}
                setAsyncInputValue={(newValue) =>
                  this.setState({ asyncInputValue: newValue })
                }
                asyncState={this.state.async}
                asyncInputValue={this.state.asyncInputValue}
                pathname={this.props.location.pathname}
              />
            )}
          />
          <Route exact path="/" render={() => <Redirect to="/promise" />} />
          <Route
            path="/promise"
            render={() => (
              <PromisePg
                create={(title, userInfo, userRepo) =>
                  this.create(title, userInfo, userRepo)
                }
                setPromiseState={(newState) =>
                  this.setState({ promise: newState })
                }
                setPromiseInputValue={(newValue) =>
                  this.setState({ promiseInputValue: newValue })
                }
                promiseState={this.state.promise}
                promiseInputValue={this.state.promiseInputValue}
                pathname={this.props.location.pathname}
              />
            )}
          />
          <Route
            path="/home"
            render={() => (
              <HomePg
                colors={this.props.colors}
                setColors={this.props.setColors}
                theme={this.props.theme}
                setTheme={this.props.setTheme}
              />
            )}
          />
        </Suspense>
      </Switch>
    );
  }
}

export default withRouter(Main);
