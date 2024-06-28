import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {GithubData} from "components/Main";
import axios from "axios";
import {UserInfo, UserRepo} from "types";

const repos = "/repos";
const userUrl = "https://api.github.com/users/";

interface GithubState {
  userName: string;
  githubData: GithubData;
  isLoading: boolean;
  error: string;
}

export const fetchUserByName = createAsyncThunk<
  GithubData,
  string,
  { rejectValue: string }
>(
  'github/fetchUserByName',
  async (name: string, {rejectWithValue}) => {
    try {
      const requestUser = await axios.get<UserInfo>(`${userUrl}${name}`);
      const requestRepos = await axios.get<UserRepo[]>(`${userUrl}${name}${repos}`);
      const userInfo = requestUser.data;
      const userRepo = requestRepos.data;
      return {
        userInfoData: {
          name: userInfo.name,
          avatar_url: userInfo.avatar_url,
          login: userInfo.login,
          html_url: userInfo.html_url,
        },
        userRepoData: userRepo.map(repo => ({
          full_name: repo.full_name,
          language: repo.language,
          visibility: repo.visibility,
          html_url: repo.html_url,
          created_at: repo.created_at,
        }))
      } as GithubData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Error loading colors");
      }
    }
  }
);

const initialState: GithubState = {
  userName: "",
  error: '',
  isLoading: false,
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserByName.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUserByName.fulfilled, (state, action) => {
      if (action.payload) {
        state.githubData = action.payload;
      }
      state.isLoading = false;
    })
    builder.addCase(fetchUserByName.rejected, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});

export const githubReducer = githubSlice.reducer;
