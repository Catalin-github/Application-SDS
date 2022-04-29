/** @format */

import React, { Component } from 'react';
import RowAccount from './RowAccount';
import CreateEmployee from './CreateEmployee';
import { connect } from 'react-redux';
import { getAllEmployee } from 'redux/account/AccountAction';
import { getAllRoles } from 'redux/role/RoleAction.js';
import { loginRequest } from 'redux/authorization/authActions';
import * as CONSTANTS from 'GlobalConstants.js';
import EMPLOYEE_CONSTANTS from 'constants/EmployeeConstants.js';

class TableAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curentPosts: this.props.accountData.data,
      curentPage: 1,
      postPerPage: 25,
    };
  }

  componentDidMount = () => {
    this.props.getAllRoles();
    this.props.requestAccountData();
  };
  render() {
    if (this.props.loadedData === false || this.props.loadedRole === false) {
      return <div>{CONSTANTS.LOADING}</div>;
    } else {
      return (
        <div id="centerMeasureDiv" className="centerMeasureDiv">
          <div className="wrap-table-measure wrap-table-employee-roles">
            <div className="search-container-account search-container-buttons">
              {this.props.userData.authority.includes('WRITE_EMPLOYEE') && (
                <CreateEmployee roles={this.props.dataRole} />
              )}
            </div>
            <table className="content-table-measure">
              <thead>
                <tr key={2}>
                  <th className="cellHeaderEmployee">{CONSTANTS.LAST_NAME}</th>
                  <th className="cellHeaderEmployee">{CONSTANTS.FIRST_NAME}</th>
                  <th className="cellHeaderEmployee">{CONSTANTS.EMAIL}</th>
                  <th className="cellHeaderEmployee">{CONSTANTS.ADDRESS}</th>
                  <th className="cellHeaderEmployee">{CONSTANTS.PHONE}</th>
                  <th className="cellHeaderEmployee">{CONSTANTS.ROLE}</th>
                  <th className="cellHeaderEmployee">{EMPLOYEE_CONSTANTS.AUTHORITY}</th>
                  <th
                    className="cell-header-employee-last"
                    style={{
                      display: this.props.userData.authority.includes('WRITE_EMPLOYEE')
                        ? ''
                        : 'none',
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {this.props.accountData.data.map(
                  ({ id, address, authority, email, firstName, lastName, phone, role }, index) => (
                    <RowAccount
                      key={id}
                      id={id}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      address={address}
                      authority={authority}
                      phone={phone}
                      role={role}
                      roles={this.props.dataRole}
                    />
                  ),
                )}
              </tbody>
            </table>
            <br /> <br />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    loadingData: state.account.loading,
    loadedData: state.account.loaded,
    accountData: state.account.accountData,
    dataRole: state.role.roleData,
    loadedRole: state.role.loaded,
    update: state.account.update,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestAccountData: () => dispatch(getAllEmployee()),
    getAllRoles: () => dispatch(getAllRoles()),
    loginRequest: () => dispatch(loginRequest()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableAccount);
