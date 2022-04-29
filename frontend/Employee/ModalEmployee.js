/** @format */

import React, { Component } from 'react';
import ReactDom from 'react-dom';

export class ModalEmployee extends Component {
  render() {
    if (this.props.isOpen === false) return null;

    return ReactDom.createPortal(
      <>{this.props.children}</>,
      document.getElementById('employee-portal'),
    );
  }
}

export default ModalEmployee;
