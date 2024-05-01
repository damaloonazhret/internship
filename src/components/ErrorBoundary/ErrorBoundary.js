import { Component } from "react";
import Aside from "../Aside/Aside";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error: error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Aside />
          <h3 className="somethingWrong">It seems something went wrong...</h3>
          <span className="somethingWrongInfo">{this.state.error && this.state.error.toString()}</span>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
