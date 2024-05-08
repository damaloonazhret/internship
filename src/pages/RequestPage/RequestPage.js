import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { withRouter } from "react-router-dom";

class RequestPage extends Component {
  render() {
    let info = this.props.state.userInfoMy;
    let repo = this.props.state.userRepoMy;

    return (
      <>
        <Header
          setIsLoading={this.props.setIsLoading}
          setState={this.props.setState}
        />
        {info && repo
          ? this.props.create("", info, repo)
          : this.props.create(this.props.title)}
      </>
    );
  }
}

export default withRouter(RequestPage);
