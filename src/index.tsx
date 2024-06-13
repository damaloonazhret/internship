import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { ErrorBoundary } from "./pages/ErrorBoundary/ErrorBoundary";
import "./index.scss";
import { Provider } from "react-redux";
import { setupStore } from "./store/app/store";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app not found");
}

const store = setupStore();

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
);
