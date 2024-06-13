import { isFetchBaseQueryError } from "./isFetchBaseQueryError";
import { isErrorWithMessage } from "./isErrorWithMessage";

export function isErrorMsg(error: any) {
  let msg = "";
  if (isFetchBaseQueryError(error)) {
    if (
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data
    ) {
      const data = error.data as { message: string };
      msg = `${data.message} ${error.status}`;
    } else {
      msg = `Error with status ${error.status}`;
    }
  } else if (isErrorWithMessage(error)) {
    msg = error.message;
  } else {
    msg = "unknown error";
  }
  return msg;
}
