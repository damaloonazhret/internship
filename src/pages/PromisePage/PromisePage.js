import { Component } from "react";
import Header from "../../components/Header/Header";

export class PromisePage extends Component {
  render() {
    const headerProps = {
      setIsLoading: this.props.setIsLoading,
      setPromiseState: this.props.setPromiseState,
      inputValue: this.props.promiseInputValue,
      setPromiseInputValue: this.props.setPromiseInputValue,
    };

    const info = this.props.promiseState.userInfoMy;
    const repo = this.props.promiseState.userRepoMy;

    return (
      <>
        <Header {...headerProps} />
        {info && repo
          ? this.props.create("", info, repo)
          : this.props.create("Promise Page Request")}
      </>
    );
  }
}
