import { Component } from "react";
import { Text } from "./Text";

export class InputWithError extends Component {
  render() {
    return (
      <div className="input-with-error">
        <input
          id={this.props.id}
          className={this.props.className}
          placeholder={this.props.placeholder}
          name={this.props.name}
          type={this.props.type}
          list={this.props.list}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
        />
        {this.props.error && <Text className="error" text={this.props.error} />}
      </div>
    );
  }
}
