import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
};

export const promiseSlice = createSlice({
  name: "promise",
  initialState,
  reducers: {
    setPromiseName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
  },
});

export const { setPromiseName } = promiseSlice.actions;
export const promiseSliceReducer = promiseSlice.reducer;
