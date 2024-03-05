export function isValidGitHubUsername(username) {
    const githubUsernameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
    return githubUsernameRegex.test(username);
}