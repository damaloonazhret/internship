import { Component } from "react";
import { Input } from "../../components/common/Input";
import { Span } from "../../components/common/Span";

export class ValidatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: 1234 << 5,
      userPass: "",
    };
  }

  checkPass = (e) => {
    e.preventDefault();
    if (Number(this.state.userPass) === this.state.password) {
      this.props.setAuth(true);
    }
  };

  setPass = (e) => {
    this.setState({ userPass: e.target.value });
  };

  render() {
    return (
      <form className="validate" onSubmit={this.checkPass}>
        <Span
          className="validate__info"
          text="To access the settings, enter the administrator password"
        />
        <Input
          id="pass"
          className="validate__password"
          placeholder="Type password..."
          name="password"
          type="password"
          onChange={this.setPass}
        />
      </form>
    );
  }
}
