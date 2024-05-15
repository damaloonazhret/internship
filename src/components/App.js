import { BrowserRouter as Router } from "react-router-dom";
import { Aside } from "./Aside/Aside";
import { Main } from "./Main/Main";
import "../index.scss";

export const App = () => {
  return (
    <Router>
      <Aside />
      <Main />
    </Router>
  );
};
