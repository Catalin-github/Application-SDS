import React from 'react';
import { connect } from 'react-redux';

import { loginFailure, loginRequest } from '../../redux/authorization/authActions.js';

import { useTranslation } from 'react-i18next';
import './Localization/i18n.js';

function LogoutButton(props) {
  const { t } = useTranslation();

  const log_out = () => {
    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/logOut`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        if (res.success === true) {
          props.loginFailure();
        } else {
          alert(
            'Something is wrong.' + 'Please try again and after that contact us about this issue',
          );
        }
      })
      .catch(err => {
        props.loginRequest();
      });
  };

  return (
    <div>
      <button onClick={log_out} className="backButton">
        {t('logoutButtonText')}
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginFailure: () => dispatch(loginFailure()),
    loginRequest: () => dispatch(loginRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
