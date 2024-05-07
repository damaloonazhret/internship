import { Component } from "react";
import { withRouter } from "react-router-dom";
import {Arrow} from "./Arrow/Arrow";

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
        <Arrow className='back' handleClick={this.goBack} content={"<"}/>
        <Arrow className='forward' handleClick={this.goForward} content={">"}/>
      </nav>
    );
  }
}

export default withRouter(Arrows);
