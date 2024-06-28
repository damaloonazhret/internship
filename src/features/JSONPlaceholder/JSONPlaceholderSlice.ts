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
    setIsLoading(state) {
      state.isLoading = true;
    },
    setIsSuccess(state, action: PayloadAction<LinkColorData[]>) {
      state.isLoading = false;
      state.error = "";
      state.colors = action.payload;
    },
    setIsError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setIsError,
  setIsSuccess,
  setIsLoading,
} = JSONPlaceholderSlice.actions;

export const JSONPlaceholderReducer = JSONPlaceholderSlice.reducer;
