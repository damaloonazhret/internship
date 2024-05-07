import React, { Component } from "react";
import Header from "../../components/Header/Header";

export class RequestPage extends Component {
  constructor(props) {
    super(props);

    this.info = this.props.state.userInfoMy;
    this.repo = this.props.state.userRepoMy;
  }

  render() {
    return (
      <>
        <Header
          setIsLoading={this.props.setIsLoading}
          setState={this.props.setState}
          inputValue={this.props.inputValue}
          setInputValue={this.props.setInputValue}
        />
        {this.info && this.repo
          ? this.props.create("", this.info, this.repo)
          : this.props.create(this.props.title)}
      </>
    );
  }
}
