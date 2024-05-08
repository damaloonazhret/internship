import { Component } from "react";
import { Text } from "./Text";
import { Input } from "./Input";

export class InputWithError extends Component {
  render() {
    return (
      <>
        <Input {...this.props} />
        {this.props.error && <Text className="error" text={this.props.error} />}
      </>
    );
  }
}
