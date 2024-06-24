import {combineReducers} from "redux";
import {githubReducer} from "features/github/githubSlice";
import {colorsReducer} from "features/colors/colorsSlice";

export const rootReducer = combineReducers({
  github: githubReducer,
  colors: colorsReducer,
});
