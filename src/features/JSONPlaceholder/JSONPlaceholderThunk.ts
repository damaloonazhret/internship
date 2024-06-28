import {AppDispatch} from "app/store";
import axios from "axios";
import {LinkColorData} from "pages/Colors";
import {
  setIsLoading,
  setIsError,
  setIsSuccess
} from "features/JSONPlaceholder/JSONPlaceholderSlice";

export const fetchColors = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoading());
    const response = await axios.get<LinkColorData[]>(
      "https://jsonplaceholder.typicode.com/photos/",
    );
    dispatch(setIsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setIsError(error.message));
    } else {
      dispatch(setIsError("Unknown error"));
    }
  }
};
