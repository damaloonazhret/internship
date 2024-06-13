import { AppDispatch } from "../app/store";
import {
  colorsCCFetching,
  colorsCCFetchingError,
  colorsCCFetchingSuccess,
} from "./colorsCCSlice";
import axios from "axios";
import { LinkColorData } from "../../pages/JSONPlaceholder/ColorsCC/ColorsCC";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchColorsCC = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(colorsCCFetching());
    const response = await axios.get<LinkColorData[]>(
      "https://jsonplaceholder.typicode.com/photos/",
    );
    dispatch(colorsCCFetchingSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(colorsCCFetchingError(error.message));
    } else {
      dispatch(colorsCCFetchingError("Unknown error"));
    }
  }
};

export const fetchColorsFC = createAsyncThunk<
  LinkColorData[],
  void,
  { rejectValue: string }
>("colorsFC/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get<LinkColorData[]>(
      "https://jsonplaceholder.typicode.com/photos/",
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue("Error loading colors");
    }
  }
});
