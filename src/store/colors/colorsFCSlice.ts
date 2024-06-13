import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkColorData } from "../../pages/JSONPlaceholder/ColorsCC/ColorsCC";
import { fetchColorsFC } from "./colorsThunks";

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

const colorsFCSlice = createSlice({
  name: "colorsFC",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchColorsFC.fulfilled,
        (state, action: PayloadAction<LinkColorData[]>) => {
          state.isLoading = false;
          state.error = "";
          state.colors = action.payload;
        },
      )
      .addCase(fetchColorsFC.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchColorsFC.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const colorsFCSliceReducer = colorsFCSlice.reducer;
