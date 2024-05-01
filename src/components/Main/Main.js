import { useEffect, useState } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import style from "./main.module.scss";
import {AsyncPg} from "./AsyncPage";
import {PromisePg} from "./PromisePage";

const Main = (props) => {
  const [async, setAsync] = useState({});
  const [promise, setPromise] = useState({});
  const [asyncInputValue, setAsyncInputValue] = useState("");
  const [promiseInputValue, setPromiseInputValue] = useState("");

  useEffect(() => {
    const pathName = props.location.pathname;
    document.title = `${pathName.charAt(1).toUpperCase()}${pathName.slice(2)} page`;
  }, [props.location.pathname]);

  const create = (title, userInfo, userRepo) => {
    if (title)
      return (
        <main className={style.mainContent}>
          <div>{title}</div>
        </main>
      );

    if (!userInfo || !userRepo) return null;

    return (
      <main
        key={userInfo ? userInfo.html_url : null}
        className={style.mainContent}
      >
        <article key={userInfo ? userInfo.html_url : null}>
          {createUserInfoHTML(userInfo)}
          {createReposHTML(userRepo)}
        </article>
      </main>
    );
  };

  const createReposHTML = (userRepo) => {
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

  const createUserInfoHTML = (userInfo) => {
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

  return (
    <Switch>
      <Route
        path="/fetch"
        render={() => (
          <AsyncPg
            create={(title, userInfo, userRepo) =>
              create(title, userInfo, userRepo)
            }
            setAsyncState={(newState) => setAsync(newState)}
            setAsyncInputValue={(newValue) => setAsyncInputValue(newValue)}
            asyncState={async}
            asyncInputValue={asyncInputValue}
            pathname={props.location.pathname}
          />
        )}
      />
      <Route exact path="/" render={() => <Redirect to="/promise" />} />
      <Route
        path="/promise"
        render={() => (
          <PromisePg
            create={(title, userInfo, userRepo) =>
              create(title, userInfo, userRepo)
            }
            setPromiseState={(newState) => setPromise(newState)}
            setPromiseInputValue={(newValue) => setPromiseInputValue(newValue)}
            promiseState={promise}
            promiseInputValue={promiseInputValue}
            pathname={props.location.pathname}
          />
        )}
      />
      <Route path="/home" component={HomePage} />
    </Switch>
  );
};

export default withRouter(Main);
