import './App.css';
import React from "react";
import AsyncPage from "./pages/AsyncPage";
import PromisePage from "./pages/PromisePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            errorMessage: '',
            repos: [],
        }
        this.gitHubRequest = this.gitHubRequest.bind(this);
        this.githubPromiseRequest = this.githubPromiseRequest.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleUsernameChange(username) {
        this.setState({username: username});
    }

    isValidGitHubUsername(username) {
        const githubUsernameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
        return githubUsernameRegex.test(username);
    }

    async gitHubRequest(e) {
        this.setState({isLoading: true});
        e.preventDefault();
        const {username} = this.state;

        if (username === '') {
            this.setState({errorMessage: 'Empty string'});
        } else if (!this.isValidGitHubUsername(username)) {
            this.setState({errorMessage: 'Invalid GitHub username'});
        } else {
            this.setState({errorMessage: ''});

            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos`);

                if (!response.ok) {
                    this.setState({errorMessage: 'Failed to fetch repositories'})
                }

                const repos = await response.json();
                this.setState({repos: repos})
            } catch (error) {
                this.setState({errorMessage: `Error fetching repositories ${error}`})
            }
        }
        this.setState({isLoading: false})
    }

    githubPromiseRequest(e) {
        this.setState({isLoading: true});
        e.preventDefault();
        const {username} = this.state;

        if (username === '') {
            this.setState({errorMessage: 'Empty string'});
        } else if (!this.isValidGitHubUsername(username)) {
            this.setState({errorMessage: 'Invalid GitHub username'});
        } else {
            this.setState({errorMessage: ''});
            fetch(`https://api.github.com/users/${username}/repos`)
                .then(response => response.json())
                .then(repos => {
                    this.setState({repos: repos})
                })
                .catch(error => {
                    this.setState({errorMessage: `Error fetching repositories ${error}`})
                });
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<AsyncPage state={this.state}
                                                              gitHubRequest={this.gitHubRequest}
                                                              onUsernameChange={this.handleUsernameChange}/>}/>
                    <Route path="/about" element={<PromisePage state={this.state}
                                                               githubPromiseRequest={this.githubPromiseRequest}
                                                               onUsernameChange={this.handleUsernameChange}/>}/>
                </Routes>
            </Router>
        )
    }
}

export default App;
