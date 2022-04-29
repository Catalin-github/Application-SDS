/** @format */

import React, { Component } from 'react';
import TableAccount from './TableAccount';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DashboardNavBar from 'components/UsefullComponents/NavBar/DashboardNavBar';
import { EMPLOYEES } from 'components/UsefullComponents/NavBar/NavBarConstants';
import * as CONSTANTS from 'GlobalConstants.js';
import 'components/Employee/Employee.css';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: this.props.userData.authority.includes(CONSTANTS.READ_EMPLOYEE),
    };
  }
  render() {
    if (!this.state.permission) return <Redirect to="/" />;

    return (
      <div id="backgroundMeasure" className="backgroundEmployee">
        <DashboardNavBar pageName={EMPLOYEES} />
        <TableAccount />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    update: state.account.update,
  };
};
export default connect(mapStateToProps)(Employee);
