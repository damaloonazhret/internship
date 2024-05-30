import { Validate } from "./checkUserName";

export const checkUserPass = (currPass: string): Validate => {
  const check = { validate: false, error: "" };
  const password = 1234;

  if (currPass.trim() === "") {
    check.error = "Empty string";
  } else if (!Number(currPass)) {
    check.error = "Password must contain only numbers";
  } else if (Number(currPass) !== password) {
    check.error = "Wrong password";
  } else {
    check.validate = true;
  }

  return check;
};
