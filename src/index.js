import { createRoot } from "react-dom/client";
import "./components/index.scss";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { StrictMode } from "react";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app not found");
}
const root = createRoot(container);
root.render(
  <StrictMode>
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
  </StrictMode>,
);
