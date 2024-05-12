import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import { App } from "./components/App";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary";
import { StrictMode } from "react";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app not found");
}

const root = createRoot(container);

const AppWithBoundary = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </BrowserRouter>
);

root.render(
  <StrictMode>
    <AppWithBoundary />
  </StrictMode>,
);
