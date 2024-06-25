import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GithubData} from "components/Main";

interface GithubState {
  userName: string;
  githubData: GithubData;
}

const initialState: GithubState = {
  userName: "",
  githubData: {
    userInfoData: {
      name: '',
      avatar_url: '',
      login: '',
      html_url: '',
    },
    userRepoData: []
  },
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setAsyncName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    setGithubData(state, action: PayloadAction<GithubData>) {
      state.githubData = action.payload;
    },
  },
});

export const {setAsyncName, setGithubData} = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
