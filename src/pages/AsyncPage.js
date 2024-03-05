import {Repositories} from "../components/Repositories/Repositories";
import React, {useState} from "react";
import {isValidGitHubUsername} from "../features/isValidGitHubUsername/isValidGitHubUsername";

export const AsyncPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [repos, setRepos] = useState([]);

    const handleUsernameChange = (username) => {
        setUsername(username);
    }

    const gitHubRequest = async (e) => {
        e.preventDefault();

        if (username === '') {
            setErrorMessage('Empty string')
        } else if (!isValidGitHubUsername(username)) {
            setErrorMessage('Invalid GitHub username')
        } else {
            setErrorMessage('')
            setIsLoading(true)
            try {
                setIsLoading(false)
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!response.ok) {
                    setErrorMessage('Failed to fetch Repositories')
                }
                const repos = await response.json();
                setRepos(repos)
            } catch (error) {
                setErrorMessage(error)
            } finally {
                setIsLoading(false)
            }
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
                      onUsernameChange={handleUsernameChange}
                      gitHubRequest={gitHubRequest}
                      buttonName='AsyncSearch'/>
    )
}