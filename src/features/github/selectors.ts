import {RootState} from "app/store";

export const selectUserData = (state: RootState) => state.github.githubData;
export const selectIsLoading = (state: RootState) => state.github.isLoading;
export const selectError = (state: RootState) => state.github.error;
