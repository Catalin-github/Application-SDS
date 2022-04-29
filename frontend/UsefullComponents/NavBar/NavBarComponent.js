import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { logoutRequest } from 'redux/authorization/authActions';
import { connect } from 'react-redux';

import LogoutSymbol from 'assets/logout.png';
import BackSymbol from 'assets/back.png';

import * as Menu from './NavBarConstants';

import './NavBar.css';

class NavBarComponent extends React.Component {
  render() {
    const authorityList = this.props.userData.authority;

    const canSeeMeasures =
      authorityList.includes('READ_MEASURE') || authorityList.includes('WRITE_MEASURE');
    const measureClass = canSeeMeasures ? '' : 'hide-option';

    const canSeeOffers =
      authorityList.includes('READ_OFFER') || authorityList.includes('WRITE_OFFER');
    const offersClass = canSeeOffers ? '' : 'hide-option';

    const canSeeOrders =
      authorityList.includes('READ_ORDER') || authorityList.includes('WRITE_ORDER');
    const ordersClass = canSeeOrders ? '' : 'hide-option';

    const canSeeMontages =
      authorityList.includes('READ_MONTAGE') || authorityList.includes('WRITE_MONTAGE');
    const montagesClass = canSeeMontages ? '' : 'hide-option';

    const canSeeFrames =
      authorityList.includes('READ_FRAME') || authorityList.includes('WRITE_FRAME');
    const framesClass = canSeeFrames ? '' : 'hide-option';

    const canSeeGlasses =
      authorityList.includes('READ_GLASS') || authorityList.includes('WRITE_GLASS');
    const glassesClass = canSeeGlasses ? '' : 'hide-option';

    const measuresSelected = this.props.pageName === Menu.MEASURES ? 'selected' : '';
    const offersSelected = this.props.pageName === Menu.OFFERS ? 'selected' : '';
    const ordersSelected = this.props.pageName === Menu.ORDERS ? 'selected' : '';
    const montagesSelected = this.props.pageName === Menu.MONTAGES ? 'selected' : '';
    const framesSelected = this.props.pageName === Menu.FRAMES ? 'selected' : '';
    const glassSelected = this.props.pageName === Menu.GLASS ? 'selected' : '';

    return (
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" sticky="top">
        <Nav>
          <Nav.Link href="/">
            <div className="back-text">
              <img src={BackSymbol} className="back-symbol" alt="" /> {Menu.PAGINA_PRINCIPALA}
            </div>
          </Nav.Link>
        </Nav>

        <div aria-controls="responsive-navbar-nav" className="nav-option selected selected-mobile">
          {this.props.pageName}
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="nav-option">
            <Nav>
              <Nav.Link href="/masuri" className={measureClass}>
                <span className={measuresSelected}>{Menu.MEASURES}</span>
              </Nav.Link>
              <Nav.Link href="/offer" className={offersClass}>
                <span className={offersSelected}>{Menu.OFFERS}</span>
              </Nav.Link>
              <Nav.Link href="/comenzi" className={ordersClass}>
                <span className={ordersSelected}>{Menu.ORDERS}</span>
              </Nav.Link>
              <Nav.Link href="/montaj" className={montagesClass}>
                <span className={montagesSelected}>{Menu.MONTAGES}</span>
              </Nav.Link>
              <Nav.Link href="/rame" className={framesClass}>
                <span className={framesSelected}>{Menu.FRAMES}</span>
              </Nav.Link>
              <Nav.Link href="/glass" className={glassesClass}>
                <span className={glassSelected}>{Menu.GLASS}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
