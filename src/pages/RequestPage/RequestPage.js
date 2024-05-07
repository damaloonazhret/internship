import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { withRouter } from "react-router-dom";

class RequestPage extends Component {
  render() {
    let info = null;
    let repo = null;
    const query = this.props.location.search.slice(7);
    const name = this.props.inputValue;

    if (query === name) {
      info = this.props.state.userInfoMy;
      repo = this.props.state.userRepoMy;
    }

    return (
      <>
        <Header
          setIsLoading={this.props.setIsLoading}
          setState={this.props.setState}
          inputValue={this.props.inputValue}
          setInputValue={this.props.setInputValue}
        />
        {info && repo
          ? this.props.create("", info, repo)
          : this.props.create(this.props.title)}
      </>
    );
  }
}

export default withRouter(RequestPage);
