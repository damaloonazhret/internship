import { Component } from "react";

export class Text extends Component {
  render() {
    return <span className={this.props.className}>{this.props.text}</span>;
  }
}
