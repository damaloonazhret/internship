import React, {useState} from "react";
import {Repositories} from "../components/Repositories/Repositories";
import {fetchRepositories} from "../features/fetchRepositories/fetchRepositories";
import {isValidGitHubUsername} from "../features/isValidGitHubUsername/isValidGitHubUsername";

export const PromisePage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [repos, setRepos] = useState([]);

    const handleUsernameChange = (username) => {
        setUsername(username);
    }

    const githubPromiseRequest = (e) => {
        e.preventDefault();

        if (username === '') {
            setErrorMessage('Empty string')
        } else if (!isValidGitHubUsername(username)) {
            setErrorMessage('Invalid GitHub username')
        } else {
            setErrorMessage('')
            setIsLoading(true)
            fetchRepositories(username)
                .then(repos => {
                    if (Array.isArray(repos)) {
                        setRepos(repos)
                        setErrorMessage('')
                    } else {
                        setErrorMessage(repos.message)
                    }
                })
                .catch(error => {
                    setErrorMessage(error)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    const state = {
        isLoading: isLoading,
        username: username,
        errorMessage: errorMessage,
        repos: repos
    };

    return (
        <Repositories state={state}
                      gitHubRequest={githubPromiseRequest}
                      onUsernameChange={handleUsernameChange}
                      buttonName='PromiseSearch'/>
    )
}