function fetchRepositories(searchValue) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/users/${searchValue}/repos`)
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

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('#promiseBtn');
    const search = document.querySelector('#search');
    const span = document.querySelector('#span');

    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        function isValidGitHubUsername(username) {
            const githubUsernameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
            return githubUsernameRegex.test(username);
        }

        const searchValue = search.value.trim();

        if (searchValue === '') {
            span.innerHTML = 'Empty string';
        } else if (!isValidGitHubUsername(searchValue)) {
        } else {
            span.innerHTML = 'Invalid GitHub username';
            span.innerHTML = '';

            btn.setAttribute('disabled', 'true');

            fetchRepositories(searchValue)
                .then(repos => {
                    const repositoriesElement = document.getElementById('repositories');
                    repositoriesElement.innerHTML = '';

                    repos.forEach(repo => {
                        const repoElement = document.createElement('div');
                        repoElement.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <p>Language: ${repo.language || 'Unknown'}</p>
                    <p>Stars: ${repo.stargazers_count}</p>
                    <p>Forks: ${repo.forks_count}</p>
                    <hr>
                `;
                        repositoriesElement.appendChild(repoElement);
                    });
                })
                .catch(error => {
                    console.error('Error fetching repositories:', error);
                })
                .finally(() => {
                    btn.removeAttribute('disabled');
                })
        }
    })
});
