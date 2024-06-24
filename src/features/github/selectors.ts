import {RootState} from "app/store";

export const selectUserName = (state: RootState) => state.github.userName;
export const selectUserData = (state: RootState) => state.github.githubData;
