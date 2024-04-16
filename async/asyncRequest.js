export async function asyncRequest(username, span) {
    try {
        const responseUser = await fetch(`https://api.github.com/users/${username}`);
        const responseRepos = await fetch(`https://api.github.com/users/${username}/repos`);
        const response = {};

        if (!responseRepos && !responseUser) {
            span.innerText = 'Failed to fetch repositories'
        }
        const userInfo = await responseUser.json();
        const userRepo = await responseRepos.json();

        response.userInfo = userInfo;
        response.userRepo = userRepo;

        return response;
    } catch (error) {
        span.innerHTML = `Error fetching repositories ${error}`;
        throw new Error(`Error fetching repositories ${error}`);
    }

}