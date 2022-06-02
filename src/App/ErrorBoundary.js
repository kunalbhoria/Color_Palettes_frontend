import React, { Component } from "react";
import ErrorPage from "./ErrorPage";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, heading: "Something Went Wrong" };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log('erererrrrrrr', error.message)
    return { hasError: true, heading: error.message };
  }


  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   // console.log('error found',error,errorInfo);
  //   //   logErrorToMyService(error, errorInfo);
  // }

  render() {

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage heading={this.state.heading} errorCode={402} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;