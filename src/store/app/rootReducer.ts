import { combineReducers } from "redux";
import { asyncSliceReducer } from "../github/asyncSlice";
import { promiseSliceReducer } from "../github/promiseSlice";
import { colorsFCSliceReducer } from "../colors/colorsFCSlice";
import { colorsCCSliceReducer } from "../colors/colorsCCSlice";
import githubAPI from "../../services/api/github/githubAPI";

export const rootReducer = combineReducers({
  async: asyncSliceReducer,
  promise: promiseSliceReducer,
  colorsFC: colorsFCSliceReducer,
  colorsCC: colorsCCSliceReducer,
  [githubAPI.reducerPath]: githubAPI.reducer,
});
