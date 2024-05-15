import { Redirect, Route, Switch } from "react-router-dom";
import { Async } from "../../pages/Request/Async";
import { Promises } from "../../pages/Request/Promise";
import { Settings } from "../../pages/Settings/Settings";
import { PublicRoute } from "../../routes/PublicRoute";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { Validate } from "../../pages/Validate/Validate";
import { NotFound } from "../../pages/NotFound/NotFound";
import { useEffect, useState } from "react";
import { HeaderInfo } from "../common/InfoText/HeaderInfo";
import { getCookie } from "../../services/cookie/getCookie";
import { MainLoader } from "../common/Loaders/MainLoader";

export const Main = () => {
  const [async, setAsync] = useState({});
  const [promise, setPromise] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getCookie("admin");
    if (auth) setIsAuth(true);
    setLoading(false);
  }, []);

  const headerInfo = (pageName) => {
    return <HeaderInfo pageName={pageName} />;
  };

  const ChildComponent = () => {
    return <>Settings page</>;
  };

  if (loading) {
    return <MainLoader />;
  }

  return (
    <>
      <Switch>
        <Route
          path="/async"
          render={() => (
            <Async
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
            <Promises
              setPromiseState={(newState) => setPromise(newState)}
              promiseState={promise}
              render={headerInfo}
            />
          )}
        />
        <PrivateRoute path="/settings" component={Settings} isAuth={isAuth}>
          <ChildComponent />
        </PrivateRoute>
        <PublicRoute
          path="/login"
          component={Validate}
          isAuth={isAuth}
          setAuth={(auth) => setIsAuth(auth)}
        />
        <Route>{NotFound}</Route>
      </Switch>
    </>
  );
};
