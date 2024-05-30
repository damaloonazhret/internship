export interface Validate {
  validate: boolean;
  error: string;
}

const invalidUsernameMessage =
  "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

const isValidGitHubUsername = (username: string): boolean => {
  const githubUsernameRegex =
    /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
  return githubUsernameRegex.test(username);
};

export const checkValidate = (value: string): Validate => {
  const check = { validate: false, error: "" };
  if (value === "") {
    return check;
  } else if (!isValidGitHubUsername(value)) {
    check.error = invalidUsernameMessage;
  } else {
    check.validate = true;
  }
  return check;
};
