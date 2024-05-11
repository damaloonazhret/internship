import { BrowserRouter as Router } from "react-router-dom";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";
import "../index.scss";
import { useEffect, useState } from "react";
import { MainLoader } from "./common/MainLoader";
import { DARK, WHITE } from "./common/constants/constants";

export const App = () => {
  const [userTheme, setUserTheme] = useState(DARK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === WHITE) {
      setUserTheme(theme);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <MainLoader />;
  }

  return (
    <Router>
      <Aside userTheme={userTheme} />
      <Main />
    </Router>
  );
};
