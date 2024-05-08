import { Component } from "react";
import { checkValidate } from "../../services/validate";
import { getUserInfo, getUserInfoAsync } from "../../services/getData";
import { withRouter } from "react-router-dom";
import { InputWithError } from "../common/InputWithError";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      error: "",
      isLoading: false,
    };

    this.path = this.props.location.pathname;
    this.name = this.path.charAt(1).toUpperCase() + this.path.slice(2);
  }

  async setRepos(e) {
    e.preventDefault();

    const name = this.state.name;
    const isChecked = checkValidate(name);

    if (isChecked.check) {
      this.setState({ isLoading: true });

      try {
        let data;
        switch (this.path) {
          case "/async":
            data = await getUserInfoAsync(name);
            this.props.setState(data);
            break;
          case "/promise":
            data = await getUserInfo(name);
            this.props.setState(data);
            break;
          default:
            break;
        }
        this.setState({ error: "" });
        const params = new URLSearchParams();
        params.append("query", name);
        this.props.history.push({
          pathname: this.props.location.pathname,
          search: params.toString(),
        });
      } catch (err) {
        this.setState({ error: err.message || "An error occurred" });
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ error: isChecked.message });
    }
  }

  setName = (value) => {
    if (this.state.error) this.setState({ error: "" });
    this.setState({ name: value });
  };

  render() {
    return (
      <header className="header">
        <form onSubmit={(e) => this.setRepos(e)}>
          <p id="head-info">{`${this.name} Request`}</p>
          <div className="search">
            <datalist id="names" />
            <InputWithError
              id="url"
              className="url"
              placeholder="Write GitHub NickName..."
              name="url"
              type="search"
              list="names"
              error={this.state.error}
              value={this.state.name}
              onChange={(value) => this.setName(value)}
            />
            <div
              id="preloader"
              className={this.state.isLoading ? "loader" : null}
            />
          </div>
        </form>
      </header>
    );
  }
}

export default withRouter(Header);
