import Header from "../../Header/Header";
import { Component } from "react";

class AsyncPage extends Component {
  constructor(props) {
    super(props);
    this.info = this.props.asyncState.userInfoMy;
    this.repo = this.props.asyncState.userRepoMy;
  }

  render() {
    return (
      <>
        {
          <Header
            setIsLoading={this.props.setIsLoading}
            setAsyncState={this.props.setAsyncState}
            inputValue={this.props.asyncInputValue}
            setAsyncInputValue={this.props.setAsyncInputValue}
            pathname={this.props.pathname}
            name={"Async"}
          />
        }
        {this.info && this.repo
          ? this.props.create("", this.info, this.repo)
          : this.props.create("Async Page Request")}
      </>
    );
  }
}

export default AsyncPage;
