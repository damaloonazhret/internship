import React from "react";
import {Repositories} from "../components/Repositories/Repositories";
import {fetchRepositories} from "../features/fetchRepositories/fetchRepositories";
import {isValidGitHubUsername} from "../features/isValidGitHubUsername/isValidGitHubUsername";

class PromisePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            errorMessage: '',
            repos: [],
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.githubPromiseRequest = this.githubPromiseRequest.bind(this);
    }

    handleUsernameChange(username) {
        this.setState({username: username});
    }

    githubPromiseRequest(e) {
        e.preventDefault();
        const {username} = this.state;

        if (username === '') {
            this.setState({errorMessage: 'Empty string'});
        } else if (!isValidGitHubUsername(username)) {
            this.setState({errorMessage: 'Invalid GitHub username'});
        } else {
            this.setState({errorMessage: ''});
            this.setState({isLoading: true});
            fetchRepositories(username)
                .then(repos => {
                    if (Array.isArray(repos)) {
                        this.setState({ repos: repos, errorMessage: '' });
                    } else {
                        this.setState({ errorMessage: repos.message });
                    }
                })
                .catch(error => {
                    this.setState({errorMessage: error.message})
                })
                .finally(() => {
                    this.setState({isLoading: false});
                })
        }
    }

    render() {
        return (
            <Repositories state={this.state}
                          gitHubRequest={this.githubPromiseRequest}
                          onUsernameChange={this.handleUsernameChange}
                          buttonName='PromiseSearch'/>
        )
    }
}

export default PromisePage;