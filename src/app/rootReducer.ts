import {combineReducers} from "redux";
import {githubReducer} from "features/github/githubSlice";
import {JSONPlaceholderReducer} from "features/JSONPlaceholder/JSONPlaceholderSlice";

export const rootReducer = combineReducers({
  github: githubReducer,
  JSONPlaceholder: JSONPlaceholderReducer,
});
