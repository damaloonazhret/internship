import { Component } from "react";

export class Input extends Component {
  render() {
    return (
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
    );
  }
}
