import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./components/index.scss";
import App from "./components/App";
import { StrictMode } from "react";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app not found");
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
