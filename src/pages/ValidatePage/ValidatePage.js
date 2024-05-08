import { Component } from "react";
import { Text } from "../../components/common/Text";
import { InputWithError } from "../../components/common/InputWithError";

export class ValidatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: 1234,
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

  setPass = (value) => {
    this.setState({ userPass: value });
    if (this.state.error) this.setState({ error: "" });
  };

  render() {
    return (
      <form className="validate" onSubmit={this.checkPass}>
        <Text
          className="validate__info"
          text="To access the settings, enter the administrator password"
        />
        <InputWithError
          id="pass"
          className="validate__password"
          placeholder="Type password..."
          name="password"
          type="password"
          onChange={(value) => this.setPass(value)}
          error={this.state.error}
        />
      </form>
    );
  }
}
