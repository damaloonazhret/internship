export function fetchRepositories(username) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }
                return response.json();
            })
            .then(repos => {
                resolve(repos);
            })
            .catch(error => {
                reject(error);
            });
    });
}