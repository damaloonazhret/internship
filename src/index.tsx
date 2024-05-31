import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { ErrorBoundary } from "./pages/ErrorBoundary/ErrorBoundary";
import "./index.scss";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app not found");
}

const root = createRoot(container);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
