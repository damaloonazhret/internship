import { Component } from "react";
import Header from "../../components/Header/Header";

export class AsyncPage extends Component {
  render() {
    const headerProps = {
      setIsLoading: this.props.setIsLoading,
      setAsyncState: this.props.setAsyncState,
      inputValue: this.props.asyncInputValue,
      setAsyncInputValue: this.props.setAsyncInputValue,
    };

    const info = this.props.asyncState.userInfoMy;
    const repo = this.props.asyncState.userRepoMy;

    return (
      <>
        <Header {...headerProps} />
        {info && repo
          ? this.props.create("", info, repo)
          : this.props.create("Async Page Request")}
      </>
    );
  }
}
