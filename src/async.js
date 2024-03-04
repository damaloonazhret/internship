document.addEventListener('DOMContentLoaded', async () => {
    const btn = document.querySelector('#asyncBtn');
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
            span.innerHTML = 'Invalid GitHub username';
        } else {
            span.innerHTML = '';

            btn.setAttribute('disabled', 'true');

            try {
                const response = await fetch(`https://api.github.com/users/${searchValue}/repos`);

                if (!response.ok) {
                    span.innerHTML = 'Failed to fetch repositories'
                }

                const repos = await response.json();
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
            } catch (error) {
                span.innerHTML = `Error fetching repositories ${error}`;
            }
            btn.removeAttribute('disabled')
        }
    })
});