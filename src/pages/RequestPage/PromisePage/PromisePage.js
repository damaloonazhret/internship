import { Component } from "react";
import RequestPage from "../RequestPage";

export class PromisePage extends Component {
  render() {
    return (
      <RequestPage
        setIsLoading={this.props.setIsLoading}
        setState={this.props.setPromiseState}
        create={this.props.create}
        state={this.props.promiseState}
        title="Promise Page Request"
      />
    );
  }
}
