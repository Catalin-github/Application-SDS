/** @format */

import React, { Component } from 'react';
import reactDom from 'react-dom';

export class MeasureAddModel extends Component {
  render() {
    if (!this.props.isOpen) return null;

    return reactDom.createPortal(
      <>{this.props.children}</>,
      document.getElementById('create-measure'),
    );
  }
}

export default MeasureAddModel;
