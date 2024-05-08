import { Component } from "react";
import { Text } from "./Text";

export class InputWithError extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    return (
      <>
        <input
          id={this.props.id}
          className={this.props.className}
          placeholder={this.props.placeholder}
          name={this.props.name}
          type={this.props.type}
          list={this.props.list}
          value={this.props.value}
          onChange={this.handleChange}
        />
        <Text className="error" text={this.props.error} />
      </>
    );
  }
}
