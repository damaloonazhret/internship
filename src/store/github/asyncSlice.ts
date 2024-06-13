import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

const asyncSlice = createSlice({
  name: "async",
  initialState,
  reducers: {
    setAsyncName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
  },
});

export const { setAsyncName } = asyncSlice.actions;
export const asyncSliceReducer = asyncSlice.reducer;
