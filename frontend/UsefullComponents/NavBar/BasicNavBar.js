import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { logoutRequest } from 'redux/authorization/authActions';
import { connect } from 'react-redux';

import LogoutSymbol from 'assets/logout.png';
import BackSymbol from 'assets/back.png';

import * as Menu from './NavBarConstants';

import './NavBar.css';

class BasicNavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" sticky="top" collapseOnSelect expand="lg">
        <Nav>
          <Nav.Link href="/">
            <div className="back-text">
              <img src={BackSymbol} className="back-symbol" alt="" /> {Menu.PAGINA_PRINCIPALA}
            </div>
          </Nav.Link>
        </Nav>

        <div
          aria-controls="responsive-navbar-nav"
          className="nav-option selected selected-page-name"
        >
          {this.props.pageName}
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logoutRequest: () => dispatch(logoutRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BasicNavBar);
