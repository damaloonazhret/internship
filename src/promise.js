// document.addEventListener('DOMContentLoaded', () => {
//     const btn = document.querySelector('#promiseBtn');
//     const search = document.querySelector('#search');
//     const span = document.querySelector('#span');
//
//     btn.addEventListener('click', async (e) => {
//         e.preventDefault();
//
//         const searchValue = search.value.trim();
//
//         if (searchValue === '') {
//             span.innerHTML = 'Empty string';
//         } else if (!isValidGitHubUsername(searchValue)) {
//             span.innerHTML = 'Invalid GitHub username';
//         } else {
//             span.innerHTML = '';
//
//             fetch(`https://api.github.com/users/${searchValue}/repos`)
//                 .then(response => response.json())
//                 .then(repos => {
//                     const repositoriesElement = document.getElementById('repositories');
//                     repositoriesElement.innerHTML = '';
//
//                     repos.forEach(repo => {
//                         const repoElement = document.createElement('div');
//                         repoElement.innerHTML = `
//                     <h3>${repo.name}</h3>
//                     <p>${repo.description || 'No description'}</p>
//                     <p>Language: ${repo.language || 'Unknown'}</p>
//                     <p>Stars: ${repo.stargazers_count}</p>
//                     <p>Forks: ${repo.forks_count}</p>
//                     <hr>
//                 `;
//                         repositoriesElement.appendChild(repoElement);
//                     });
//                 })
//                 .catch(error => {
//                     console.error('Error fetching repositories:', error);
//                 });
//             btn.removeAttribute('disabled');
//         }
//     })
// });