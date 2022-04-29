import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { logoutRequest } from 'redux/authorization/authActions';
import { connect } from 'react-redux';

import LogoutSymbol from 'assets/logout.png';
import BackSymbol from 'assets/back.png';

import * as CONSTANTS from 'GlobalConstants.js';

import './NavBar.css';

import * as Menu from './NavBarConstants';

class DashboardNavBar extends React.Component {
  render() {
    const authorityList = this.props.userData.authority;

    const canReadReport = authorityList.includes(CONSTANTS.READ_REPORT);
    const hideReport = canReadReport ? '' : 'hide-option';

    const canManageEmployees =
      authorityList.includes('WRITE_EMPLOYEE') || authorityList.includes('READ_EMPLOYEE');
    const hideEmployees = canManageEmployees ? '' : 'hide-option';

    const canManageRoles =
      authorityList.includes('WRITE_ROLE') || authorityList.includes('READ_ROLE');
    const hideRoles = canManageRoles ? '' : 'hide-option';

    const reportSelected = this.props.pageName === Menu.REPORT ? 'selected' : '';
    const employeesSelected = this.props.pageName === Menu.EMPLOYEES ? 'selected' : '';
    const rolesSelected = this.props.pageName === Menu.ROLES ? 'selected' : '';

    const isOnDashboard = this.props.pageName == null;

    return (
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" sticky="top">
        {isOnDashboard ? (
          <Navbar.Brand>
            <div className="brand">{CONSTANTS.SALAMANDER_SISTEM}</div>
          </Navbar.Brand>
        ) : (
          <Nav>
            <Nav.Link href="/">
              <div className="back-text">
                <img src={BackSymbol} className="back-symbol" alt="" /> {Menu.PAGINA_PRINCIPALA}
              </div>
            </Nav.Link>
          </Nav>
        )}

        <div aria-controls="responsive-navbar-nav" className="nav-option selected selected-mobile">
          {this.props.pageName}
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="nav-option">
            <Nav>
              <Nav.Link href="/rapoarte" className={hideReport}>
                <span className={reportSelected}>{Menu.REPORT}</span>
              </Nav.Link>
              <Nav.Link href="/employee" className={hideEmployees}>
                <span className={employeesSelected}>{Menu.EMPLOYEES}</span>
              </Nav.Link>
              <Nav.Link href="/roles" className={hideRoles}>
                <span className={rolesSelected}>{Menu.ROLES}</span>
              </Nav.Link>
            </Nav>
          </div>

          <div className="logout">
            <Nav>
              <Nav.Link href="#">
                <button onClick={this.props.logoutRequest}>
                  Logout <img src={LogoutSymbol} alt="Logout" />
                </button>
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutRequest: () => dispatch(logoutRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNavBar);
