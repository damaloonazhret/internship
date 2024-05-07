import { Component } from "react";
import RequestPage from "../RequestPage";

export class AsyncPage extends Component {
  render() {
    return (
      <RequestPage
        setIsLoading={this.props.setIsLoading}
        setState={this.props.setAsyncState}
        inputValue={this.props.asyncInputValue}
        setInputValue={this.props.setAsyncInputValue}
        create={this.props.create}
        state={this.props.asyncState}
        title="Async Page Request"
      />
    );
  }
}
