import { AppDispatch } from "app/store";
import axios from "axios";
import { LinkColorData } from "pages/Colors";
import {colorsFetching, colorsFetchingError, colorsFetchingSuccess} from "features/colors/colorsSlice";

export const fetchColors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(colorsFetching());
    const response = await axios.get<LinkColorData[]>(
      "https://jsonplaceholder.typicode.com/photos/",
    );
    dispatch(colorsFetchingSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(colorsFetchingError(error.message));
    } else {
      dispatch(colorsFetchingError("Unknown error"));
    }
  }
};
