import { Component } from "react";
import {Aside} from "../../components/Aside/Aside";
import {Text} from "../../components/common/Text";
import {Info} from "../../components/common/Info";

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
          <Info className="somethingWrong" info='It seems something went wrong...'/>
          <Text className="somethingWrongInfo" text={this.state.error && this.state.error.toString()}/>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
