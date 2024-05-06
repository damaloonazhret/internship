import style from "./main.module.scss";
import { memo, Suspense, useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Loader from "../Preloaders/Loader";
import { AsyncPage } from "./AsyncPage";
import { SettingsPage } from "./SettingsPage/";
import { PromisePage } from "./PromisePage";
import { HeavyCalcPage } from "./HeavyCalculation";

const Main = (props) => {
  const [big] = useState(7000000);

  const location = useLocation();
  useEffect(() => {
    const pathName = location.pathname;
    document.title = `${pathName.charAt(1).toUpperCase()}${pathName.slice(2)} page`;
  }, [location.pathname]);

  const create = useCallback((title, userInfo, userRepo) => {
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
          {createUserInfoHTML(userInfo)}
          {createReposHTML(userRepo)}
        </article>
      </main>
    );
  }, []);

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
      <Suspense fallback={<Loader />}>
        <Route
          path="/fetch"
          render={() => (
            <AsyncPage
              create={(title, userInfo, userRepo) =>
                create(title, userInfo, userRepo)
              }
              asyncState={props.async}
            />
          )}
        />
        <Route exact path="/" render={() => <Redirect to="/promise" />} />
        <Route
          path="/promise"
          render={() => (
            <PromisePage
              create={(title, userInfo, userRepo) =>
                create(title, userInfo, userRepo)
              }
              promiseState={props.promise}
            />
          )}
        />
        <Route
          path="/settings"
          render={() => (
            <SettingsPage
              colors={props.colors}
              setColors={props.setColors}
              theme={props.theme}
              setTheme={props.setTheme}
            />
          )}
        />
        <Route path="/heavyMath" render={() => <HeavyCalcPage big={big} />} />
      </Suspense>
    </Switch>
  );
};

export default memo(Main);
