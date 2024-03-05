import React from "react";
import {Repositories} from "../components/Repositories/Repositories";
import {isValidGitHubUsername} from "../features/isValidGitHubUsername/isValidGitHubUsername";

class AsyncPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            errorMessage: '',
            repos: [],
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.gitHubRequest = this.gitHubRequest.bind(this);
    }

    handleUsernameChange(username) {
        this.setState({username: username});
    }

    async gitHubRequest(e) {
        e.preventDefault();
        const {username} = this.state;

        if (username === '') {
            this.setState({errorMessage: 'Empty string'});
        } else if (!isValidGitHubUsername(username)) {
            this.setState({errorMessage: 'Invalid GitHub username'});
        } else {
            this.setState({errorMessage: ''});
            this.setState({isLoading: true});
            try {
                this.setState({isLoading: true});
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!response.ok) {
                    this.setState({errorMessage: 'Failed to fetch Repositories'})
                }
                const repos = await response.json();
                this.setState({repos: repos})
            } catch (error) {
                this.setState({errorMessage: error})
            } finally {
                this.setState({isLoading: false});
            }
        }
    }

    render() {
        return (
            <Repositories state={this.state}
                          onUsernameChange={this.handleUsernameChange}
                          gitHubRequest={this.gitHubRequest}
                          buttonName='AsyncSearch'/>
        )
    }
}

export default AsyncPage;