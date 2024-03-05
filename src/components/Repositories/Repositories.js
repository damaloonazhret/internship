import React from "react";

export function Repositories(props) {
    const {state, buttonName, onUsernameChange, gitHubRequest} = props;
    const {username, errorMessage, repos, isLoading} = state;
    return React.createElement('main', {key: 'main'}, [
        React.createElement('header', {className: 'header', key: 'header'}, [
            React.createElement('h1', {key: 'h1'}, 'GitHub Repositories'),
            React.createElement('form', {key: 'form', onSubmit: (e) => gitHubRequest(e)}, [
                React.createElement('label', {htmlFor: 'search', key: 'label'}, 'Type GitHub username'),
                React.createElement('input', {
                    id: 'search',
                    key: 'input',
                    type: 'text',
                    value: username,
                    onChange: (e) => onUsernameChange(e.target.value)
                }),
                React.createElement('div', {className: 'buttons', key: 'div',}, [
                    React.createElement('button', {
                        id: 'asyncBtn',
                        type: 'submit',
                        key: 'button',
                        disabled: !!isLoading
                    }, buttonName),
                ]),
                React.createElement('span', {id: 'span', key: 'span'}, errorMessage)
            ])
        ]),
        React.createElement('div', {id: 'Repositories', key: 'Repositories',},
            repos.length > 0 ? repos.map(repo =>
                React.createElement('div', {key: repo.id}, [
                    React.createElement('h3', {}, repo.name),
                    React.createElement('p', {}, repo.description || 'No description'),
                    React.createElement('p', {}, `Language: ${repo.language || 'Unknown'}`),
                    React.createElement('p', {}, `Stars: ${repo.stargazers_count}`),
                    React.createElement('p', {}, `Forks: ${repo.forks_count}`),
                    React.createElement('hr')
                ])
            ) : null
        )
    ]);
}