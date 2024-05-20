import { Component } from "react";
import { Title } from "../../components/common/InfoText/Title";
import { Text } from "../../components/common/InfoText/Text";
import "./index.scss";
import {Button} from "../../components/common/Button";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error: error, info: info, errorTime: new Date() });
  }

  resetCookies (name, value) {
    const expires = new Date();
    expires.setTime(expires.getTime());
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  fixApp = (e) => {
    e.preventDefault();
    localStorage.clear()
    sessionStorage.clear()
    function getAllCookieNames() {
      const cookies = document.cookie;
      const cookieArray = cookies.split(';');
      const cookieNames = cookieArray.map(cookie => cookie.split('=')[0].trim());
      return cookieNames;
    }
    const cookieNames = getAllCookieNames();
    cookieNames.forEach(cookieName => {
      this.resetCookies(cookieName, '');
    });
    window.location.href = '/';
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Title
            className="somethingWrong"
            title="It seems something went wrong..."
          />
          <div className="somethingWrongInfo">
            <Text
              className="somethingWrongInfo__info"
              text={
                this.state.error
                  ? this.state.error.toString()
                  : "Error is unknown"
              }
            />
            <Text
              className="somethingWrongInfo__info"
              text={
                this.state.info
                  ? this.state.info.componentStack
                  : "Error information is unknown"
              }
            />
            <Text
              className="somethingWrongInfo__info"
              text={
                this.state.errorTime
                  ? this.state.errorTime.toString()
                  : "The time of the error is unknown"
              }
            />
            <Button onClick={this.fixApp} className='somethingWrongInfo__btn'>
              try to fix the app
            </Button>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}
