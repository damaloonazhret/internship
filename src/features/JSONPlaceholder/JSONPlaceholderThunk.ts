import {AppDispatch} from "app/store";
import axios from "axios";
import {LinkColorData} from "pages/Colors";
import {
  JSONPlaceholderFetching,
  JSONPlaceholderFetchingError,
  JSONPlaceholderFetchingSuccess
} from "features/JSONPlaceholder/JSONPlaceholderSlice";

export const fetchColors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(JSONPlaceholderFetching());
    const response = await axios.get<LinkColorData[]>(
      "https://jsonplaceholder.typicode.com/photos/",
    );
    dispatch(JSONPlaceholderFetchingSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(JSONPlaceholderFetchingError(error.message));
    } else {
      dispatch(JSONPlaceholderFetchingError("Unknown error"));
    }
  }
};
