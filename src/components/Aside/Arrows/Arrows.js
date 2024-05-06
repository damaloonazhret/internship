import { Component } from "react";
import { withRouter } from "react-router-dom";

class Arrows extends Component {
  goBack = () => {
    this.props.history.goBack();
  };

  goForward = () => {
    this.props.history.goForward();
  };

  render() {
    return (
      <nav className="navArrows">
        <p id="back" className="back" onClick={this.goBack}>
          {"<"}
        </p>
        <p id="forward" className="forward" onClick={this.goForward}>
          {">"}
        </p>
      </nav>
    );
  }
}

export default withRouter(Arrows);
