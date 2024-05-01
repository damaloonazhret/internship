import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import Main from "./Main/Main";
import Aside from "./Aside/Aside";
import { Suspense } from "react";
import Loader from "./Preloaders/Loader";

function App() {
  throw new Error("Testing ErrorBoundary");
  return (
    <Suspense fallback={<Loader/>}>
      <Router>
        <Aside />
        <Main />
      </Router>
    </Suspense>
  );
}

export default App;
