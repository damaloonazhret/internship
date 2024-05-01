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
          <h2 className="somethingWrong">It seems something went wrong...</h2>
          <div className="somethingWrongInfo">{this.state.error && this.state.error.toString()}</div>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
