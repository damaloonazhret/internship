import { Component } from "react";
import { checkValidate } from "../../services/validate";
import { getUserInfo, getUserInfoAsync } from "../../services/getData";
import { withRouter } from "react-router-dom";
import { Search } from "./Search/Search";

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

    const value = this.props.inputValue;
    const isChecked = checkValidate(value);

    if (isChecked.check) {
      this.setState({ isLoading: true });

      try {
        let data;
        switch (this.path) {
          case "/async":
            data = await getUserInfoAsync(value);
            this.props.setState(data);
            break;
          case "/promise":
            data = await getUserInfo(value);
            this.props.setState(data);
            break;
          default:
            break;
        }
        this.setState({ error: "" });
        const params = new URLSearchParams();
        params.append("query", value);
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

  setName = (e) => {
    const newName = e.target.value;

    if (this.state.error) this.setState({ error: "" });

    this.props.setInputValue(newName);

    this.setState({ name: this.props.inputValue });
  };

  render() {
    return (
      <header className="header">
        <form onSubmit={(e) => this.setRepos(e)}>
          <p id="head-info">{`${this.name} Request`}</p>
          <div className="search">
            <datalist id="names" />
            <Search
              inputValue={this.props.inputValue}
              setName={this.setName}
              error={this.state.error}
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
