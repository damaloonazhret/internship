import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkColorData } from "../../pages/JSONPlaceholder/ColorsCC/ColorsCC";

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

const colorsCCSlice = createSlice({
  name: "colorsCC",
  initialState,
  reducers: {
    colorsCCFetching(state) {
      state.isLoading = true;
    },
    colorsCCFetchingSuccess(state, action: PayloadAction<LinkColorData[]>) {
      state.isLoading = false;
      state.error = "";
      state.colors = action.payload;
    },
    colorsCCFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  colorsCCFetchingError,
  colorsCCFetchingSuccess,
  colorsCCFetching,
} = colorsCCSlice.actions;

export const colorsCCSliceReducer = colorsCCSlice.reducer;
