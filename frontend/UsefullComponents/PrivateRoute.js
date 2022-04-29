import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../redux/authorization/authActions';

import { Route, Redirect } from 'react-router-dom';

import './Localization/i18n';

const PrivateRoute = ({
  loading,
  loaded,
  isAuth,
  authenticateUser,
  component: Component,
  ...rest
}) => {
  if (loaded === false) {
    authenticateUser();
  }

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <Route
      {...rest}
      component={props => (isAuth ? <Component {...props} /> : <Redirect exact to="/logIn" />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth,
    loading: state.auth.loading,
    loaded: state.auth.loaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticateUser: () => dispatch(authenticateUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
