import { configureStore } from "@reduxjs/toolkit";
import githubAPI from "../../services/api/github/githubAPI";
import { rootReducer } from "./rootReducer";

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(githubAPI.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
