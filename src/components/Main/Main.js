import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { Suspense, useEffect, useState } from "react";
import { Info } from "../common/Info";
import { MainLoader } from "../common/preloaders/MainLoader";
import {
  AsyncPage,
  NotFoundPage,
  PromisePage,
  SettingsPage,
  ValidatePage,
} from "../../pages";
import { createCards } from "../../services/create/createCards";
import { getCookie } from "../../services/cookie/getCookie";
import Loader from "../common/preloaders/Loader";

export const Main = ({ ...props }) => {
  const [async, setAsync] = useState({});
  const [promise, setPromise] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const auth = getCookie("admin");
    if (auth) setIsAuth(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    const pathName = location.pathname;
    document.title = `${pathName.charAt(1).toUpperCase()}${pathName.slice(2)} page`;
  }, [location.pathname]);

  if (loading) {
    return <MainLoader />;
  }

  const headerInfo = (pageName) => {
    return <Info info={`${pageName} Request`} />;
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path="/async"
            render={() => (
              <AsyncPage
                create={createCards}
                setAsyncState={(newState) => setAsync(newState)}
                asyncState={async}
                render={headerInfo}
              />
            )}
          />
          <Route exact path="/">
            <Redirect to="/promise" />
          </Route>
          <Route
            path="/promise"
            render={() => (
              <PromisePage
                create={createCards}
                setPromiseState={(newState) => setPromise(newState)}
                promiseState={promise}
                render={headerInfo}
              />
            )}
          />
          <PrivateRoute
            path="/settings"
            component={SettingsPage}
            isAuth={isAuth}
            {...props}
          />
          <PublicRoute
            path="/login"
            component={ValidatePage}
            isAuth={isAuth}
            setAuth={(auth) => setIsAuth({ auth })}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </>
  );
};
