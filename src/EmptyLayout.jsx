import React, { Component } from 'react';

class EmptyLayout extends Component {
  render() {
    return (
      <div className="login-container">
        {this.props.children}
      </div>
    );
  }
}
export default EmptyLayout;
