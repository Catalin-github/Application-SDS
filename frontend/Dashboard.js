/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UsefullComponents/Localization/i18n.js';

import './Dashboard.css';
import { authenticateUser, logoutRequest, loginUser } from 'redux/authorization/authActions';
import Clienti from 'components/UsefullComponents/img/Clienti.png';
import Comenzi from 'components/UsefullComponents/img/Comenzi.png';
import Masuri from 'components/UsefullComponents/img/Masuri.png';
import Montaj from 'components/UsefullComponents/img/Montaj.png';
import Ofertare from 'components/UsefullComponents/img/Ofertare.png';
import Rame from 'components/UsefullComponents/img/Rame.png';
import Sticla from 'components/UsefullComponents/img/Sticla.png';
import DashboardNavBar from 'components/UsefullComponents/NavBar/DashboardNavBar.js';

import * as CONSTANTS from 'GlobalConstants.js';

class Dashboard extends Component {
  render() {
    if (!this.props.isAuth) {
      this.props.authenticateUser();
    }

    return (
      <div className="background-dashboard">
        <DashboardNavBar />

        <div className="center-dashboard">
          <div>
            {' '}
            <a href="/masuri">
              <div
                className="content-table-dashboard"
                style={{
                  display:
                    this.props.userData.authority.includes(CONSTANTS.READ_MEASURE) ||
                    this.props.userData.authority.includes(CONSTANTS.WRITE_MEASURE)
                      ? ''
                      : 'none',
                }}
              >
                <img src={Masuri} alt="masuri" className="component-logo" />
                <h1 className="logo-text">{CONSTANTS.MEASURES}</h1>
              </div>
            </a>
            <a href="/offer">
              <div
                className="content-table-dashboard"
                style={{
                  display:
                    this.props.userData.authority.includes(CONSTANTS.READ_OFFER) ||
                    this.props.userData.authority.includes(CONSTANTS.WRITE_OFFER)
                      ? ''
                      : 'none',
                }}
              >
                <img src={Ofertare} alt="ofertare" className="component-logo" />
                <h1 className="logo-text">{CONSTANTS.OFFERS}</h1>
              </div>
            </a>
            <a href="/comenzi">
              <div
                className="content-table-dashboard"
                style={{
                  display:
                    this.props.userData.authority.includes(CONSTANTS.READ_ORDER) ||
                    this.props.userData.authority.includes(CONSTANTS.WRITE_ORDER)
                      ? ''
                      : 'none',
                }}
              >
                <img src={Comenzi} alt="comenzi" className="component-logo" />
                <h1 className="logo-text">{CONSTANTS.ORDERS}</h1>
              </div>
            </a>
            <a href="/montaj">
              <div
                className="content-table-dashboard"
                style={{
                  display:
                    this.props.userData.authority.includes(CONSTANTS.READ_MONTAGE) ||
                    this.props.userData.authority.includes(CONSTANTS.WRITE_MONTAGE)
                      ? ''
                      : 'none',
                }}
                colSpan="10"
              >
                <img src={Montaj} alt="montaj" className="component-logo" />
                <h1 className="logo-text">{CONSTANTS.MONTAGES}</h1>
              </div>
            </a>
            <a href="/rame">
              <div
                className="content-table-dashboard"
                style={{
                  display:
                    this.props.userData.authority.includes(CONSTANTS.READ_FRAME) ||
                    this.props.userData.authority.includes(CONSTANTS.WRITE_FRAME)
                      ? ''
                      : 'none',
                }}
              >
                <img src={Rame} alt="rame" className="component-logo" />
                <h1 className="logo-text">{CONSTANTS.FRAMES}</h1>
              </div>
            </a>{' '}
            <a href="/glass">
              <div
                className="content-table-dashboard"
                style={{
                  display:
                    this.props.userData.authority.includes(CONSTANTS.READ_GLASS) ||
                    this.props.userData.authority.includes(CONSTANTS.WRITE_GLASS)
                      ? ''
                      : 'none',
                }}
              >
                <img src={Sticla} alt="sticla" className="component-logo" />
                <h1 className="logo-text">{CONSTANTS.GLASS}</h1>
              </div>
            </a>
            <a href="/clienti">
              <div
                className="content-table-dashboard"
                style={{
                  display:
                    this.props.userData.authority.includes(CONSTANTS.READ_CLIENT) ||
                    this.props.userData.authority.includes(CONSTANTS.WRITE_CLIENT)
                      ? ''
                      : 'none',
                }}
              >
                <img src={Clienti} alt="clienti" className="component-logo" />
                <h1 className="logo-text">{CONSTANTS.CLIENTS}</h1>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    isAuth: state.auth.isAuth,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authRequest: () => dispatch(authenticateUser()),
    loginRequest: () => dispatch(loginUser()),
    logoutRequest: () => dispatch(logoutRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
