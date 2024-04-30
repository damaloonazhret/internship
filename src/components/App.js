import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import Main from "./Main/Main";
import Aside from "./Aside/Aside";

function App() {
  return (
    <Router>
      <Aside />
      <Main />
    </Router>
  );
}

export default App;
