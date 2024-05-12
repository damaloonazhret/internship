const invalidUsernameMessage =
  "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.";

const isValidGitHubUsername = (username) => {
  const githubUsernameRegex =
    /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
  return githubUsernameRegex.test(username);
};

export const checkValidate = (value) => {
  if (value === "") {
    return { check: false, message: "Empty string" };
  } else if (!isValidGitHubUsername(value)) {
    return { check: false, message: invalidUsernameMessage };
  } else {
    return { check: true };
  }
};
