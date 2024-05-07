import { Component } from "react";
import { Input } from "../../components/common/Input";
import { Span } from "../../components/common/Span";

export class ValidatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: 1234 << 5,
      userPass: "",
      error: "",
    };
  }

  checkPass = (e) => {
    e.preventDefault();
    const passCheck = Number(this.state.userPass) === this.state.password;
    passCheck
      ? this.props.setAuth(true)
      : this.setState({ error: "invalid password" });
  };

  setPass = (e) => {
    this.setState({ userPass: e.target.value });
    if (this.state.error) this.setState({ error: "" });
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
        <Span className="error" text={this.state.error} />
      </form>
    );
  }
}
