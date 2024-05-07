import {Component} from "react";

export class Arrow extends Component {
  render() {
    return (
      <p className={this.props.className} onClick={this.props.handleClick}>
        {this.props.content}
      </p>
    )
  }
}
