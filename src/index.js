import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./components/App";
import { Suspense } from "react";
import "./index.scss";
import { Preloader } from "./components/Preloader/Preloader";

const container = document.getElementById("app");
if (!container) {
  throw new Error("app not found");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/promise",
        element: <Suspense fallback={<Preloader />}>PromisePage</Suspense>,
      },
      {
        path: "/fetch",
        element: <Suspense fallback={<Preloader />}>FetchPage</Suspense>,
      },
      {
        path: "/settings",
        element: <Suspense fallback={<Preloader />}>SettingsPage</Suspense>,
      },
    ],
  },
]);

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
