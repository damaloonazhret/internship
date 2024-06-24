import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkColorData } from "pages/Colors";

interface IColors {
  colors: LinkColorData[];
  isLoading: boolean;
  error: string;
}

const initialState: IColors = {
  colors: [],
  isLoading: false,
  error: "",
};

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    colorsFetching(state) {
      state.isLoading = true;
    },
    colorsFetchingSuccess(state, action: PayloadAction<LinkColorData[]>) {
      state.isLoading = false;
      state.error = "";
      state.colors = action.payload;
    },
    colorsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  colorsFetchingError,
  colorsFetchingSuccess,
  colorsFetching,
} = colorsSlice.actions;

export const colorsReducer = colorsSlice.reducer;
