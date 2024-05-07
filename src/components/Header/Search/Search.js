import { Component } from "react";

export class Search extends Component {
  render() {
    return (
      <input
        id="url"
        className="url"
        placeholder="Write GitHub NickName..."
        name="url"
        type="search"
        list="names"
        value={this.props.inputValue}
        onChange={this.props.setName}
      />
    );
  }
}
