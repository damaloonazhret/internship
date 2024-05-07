import { Component } from "react";

export class Span extends Component {
  render() {
    return <span className={this.props.className}>{this.props.text}</span>;
  }
}
