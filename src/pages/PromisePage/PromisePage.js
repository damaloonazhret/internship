import { Component } from "react";
import { RequestPage } from "../RequestPage/RequestPage";

export class PromisePage extends Component {
  render() {
    return (
      <RequestPage
        setIsLoading={this.props.setIsLoading}
        setState={this.props.setPromiseState}
        inputValue={this.props.promiseInputValue}
        setInputValue={this.props.setPromiseInputValue}
        create={this.props.create}
        state={this.props.promiseState}
        title="Promise Page Request"
      />
    );
  }
}
