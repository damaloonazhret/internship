import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkColorData } from "pages/Colors";

interface ColorsState {
  colors: LinkColorData[];
  isLoading: boolean;
  error: string;
}

const initialState: ColorsState = {
  colors: [],
  isLoading: false,
  error: "",
};

const JSONPlaceholderSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    JSONPlaceholderFetching(state) {
      state.isLoading = true;
    },
    JSONPlaceholderFetchingSuccess(state, action: PayloadAction<LinkColorData[]>) {
      state.isLoading = false;
      state.error = "";
      state.colors = action.payload;
    },
    JSONPlaceholderFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  JSONPlaceholderFetchingError,
  JSONPlaceholderFetchingSuccess,
  JSONPlaceholderFetching,
} = JSONPlaceholderSlice.actions;

export const JSONPlaceholderReducer = JSONPlaceholderSlice.reducer;
