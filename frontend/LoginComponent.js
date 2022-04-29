/** @format */

import React from 'react';
import FormField from './UsefullComponents/FormField';
import * as Yup from 'yup';
import { loginSuccess } from 'redux/authorization/authActions';
import { connect } from 'react-redux';
import { loginUser } from 'redux/authorization/authActions';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Constants from 'GlobalConstants.js';
import * as LOGIN_CONSTANTS from 'constants/LoginConstants';
import './UsefullComponents/Localization/i18n.js';
import 'index.css';

function LoginComponent(props) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(<p className="validationError">{t('emailInvalid')}</p>)
      .max(200, <p className="validationError">{t('emailToLong')}</p>)
      .required(<p className="validationError">{t('emailMissing')}</p>),
    password: Yup.string().required(<p className="validationError">{t('passwordMissing')}</p>),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const emailProps = formik.getFieldProps('email');
  const passwordProps = formik.getFieldProps('password');

  const handleSubmit = e => {
    e.preventDefault();

    const data = { email: emailProps.value, password: passwordProps.value };
    props.loginUser(data);

    props.history.push('/');
  };
  return (
    <div className="background-dashboard">
      <div className="login-div">
        <h1 className="logo-text page-title">{Constants.SALAMANDER_SISTEM}</h1>
        <br /> <br />
        <div className="login-register-form">
          <form>
            <FormField type="email" {...emailProps} />
            {formik.errors.email && formik.touched.email ? (
              <div className="fieldValidationErrorDiv">{formik.errors.email}</div>
            ) : null}
            <FormField className="inputField" type="password" {...passwordProps} />
            {formik.touched.password && formik.errors.password ? (
              <div className="fieldValidationErrorDiv">{formik.errors.password}</div>
            ) : null}
            <br />
            <button
              className="button-sds start"
              disabled={!(formik.isValid && formik.dirty)}
              onClick={handleSubmit}
            >
              {LOGIN_CONSTANTS.LOG_IN}
            </button>
            <br />
            <br />
            <a className="reset-password-text" href="/resetPassword">
              {LOGIN_CONSTANTS.RESET_PASSWORD}
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: data => dispatch(loginSuccess(data)),
    loginUser: data => dispatch(loginUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
