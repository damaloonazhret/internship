import { Component } from "react";
import { Input } from "../../common/Input";
import {Span} from "../../common/Span";

export class Search extends Component {
  render() {
    return (
      <>
        <Input
          id="url"
          className="url"
          placeholder="Write GitHub NickName..."
          name="url"
          type="search"
          list="names"
          value={this.props.inputValue}
          onChange={this.props.setName}
        />
        <Span className="error" text={this.props.error}/>
      </>
    );
  }
}
