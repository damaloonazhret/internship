import React from "react";

class AsyncPage extends React.Component {
    render() {
        const { username, errorMessage, repos, isLoading } = this.props.state;

        return React.createElement('main', {key: 'main'}, [
            React.createElement('header', {className: 'header', key: 'header'}, [
                React.createElement('h1', {key: 'h1'}, 'GitHub Repositories'),
                React.createElement('form', {key: 'form', onSubmit: (e) => this.props.gitHubRequest(e)}, [
                    React.createElement('label', {htmlFor: 'search', key: 'label'}, 'Type GitHub username'),
                    React.createElement('input', {
                        id: 'search',
                        key: 'input',
                        type: 'text',
                        value: username,
                        onChange: (e) => this.props.onUsernameChange(e.target.value)
                    }),
                    React.createElement('div', {className: 'buttons', key: 'div',}, [
                        React.createElement('button', {
                            id: 'asyncBtn',
                            type: 'submit',
                            key: 'button',
                            disabled: !!isLoading
                        }, 'AsyncSearch'),
                    ]),
                    React.createElement('span', {id: 'span', key: 'span'}, errorMessage)
                ])
            ]),
            React.createElement('div', {id: 'repositories', key: 'repositories',}, repos.map(repo =>
                React.createElement('div', {key: repo.id}, [
                    React.createElement('h3', {}, repo.name),
                    React.createElement('p', {}, repo.description || 'No description'),
                    React.createElement('p', {}, `Language: ${repo.language || 'Unknown'}`),
                    React.createElement('p', {}, `Stars: ${repo.stargazers_count}`),
                    React.createElement('p', {}, `Forks: ${repo.forks_count}`),
                    React.createElement('hr')
                ])
            ))
        ]);
    }
}

export default AsyncPage;