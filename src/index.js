import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./components/App";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app not found");
}

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
