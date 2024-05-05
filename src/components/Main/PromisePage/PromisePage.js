import Header from "../../Header/Header";
import { Component } from "react";

class PromisePage extends Component {
  constructor(props) {
    super(props);
    this.info = this.props.promiseState.userInfoMy;
    this.repo = this.props.promiseState.userRepoMy;
  }

  render() {
    return (
      <>
        {
          <Header
            setIsLoading={this.props.setIsLoading}
            setPromiseState={this.props.setPromiseState}
            inputValue={this.props.promiseInputValue}
            setPromiseInputValue={this.props.setPromiseInputValue}
            pathname={this.props.pathname}
            name={"Promise"}
          />
        }
        {this.info && this.repo
          ? this.props.create("", this.info, this.repo)
          : this.props.create("Promise Page Request")}
      </>
    );
  }
}

export default PromisePage;
