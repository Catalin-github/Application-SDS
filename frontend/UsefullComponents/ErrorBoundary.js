import React, { Component } from 'react';
import BackButton from './BackButton';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(Error) {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <br />
          <br />
          <br />
          <br />
          <div id="notfound">
            <h1 className="notfound-404">Something went wrong...</h1>
          </div>
          <BackButton />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
