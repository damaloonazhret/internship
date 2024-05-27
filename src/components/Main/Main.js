import { Redirect, Route, Switch } from "react-router-dom";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { Suspense, useEffect, useState } from "react";
import { Title } from "../common/InfoText/Title";
import { getCookie } from "../../services/cookie/getCookie";
import { MainLoader } from "../common/Loaders/MainLoader";
import {
  AsyncPage,
  ColorsCCPage,
  ColorsFCPage,
  NotFoundPage,
  PromisePage,
  SettingsPage,
  ValidatePage,
} from "../../pages";

export const Main = ({ ...props }) => {
  const [async, setAsync] = useState({});
  const [promise, setPromise] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getCookie("admin");
    if (auth) setIsAuth(true);
    setLoading(false);
  }, []);

  const headerInfo = (title) => {
    return <Title title={title} />;
  };

  const ChildComponent = () => {
    return <>Settings page</>;
  };

  if (loading) {
    return <MainLoader />;
  }

  return (
    <>
      <Suspense fallback={<MainLoader/>}>
        <Switch>
          <Route
            path="/async"
            render={() => (
              <AsyncPage
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
          >
            <ChildComponent />
          </PrivateRoute>
          <PublicRoute
            path="/login"
            component={ValidatePage}
            isAuth={isAuth}
            setAuth={(auth) => setIsAuth(auth)}
          />
          <Route path="/colorsCC" component={ColorsCCPage} />
          <Route path="/colorsFC" component={ColorsFCPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </>
  );
};
