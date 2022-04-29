import React from 'react';
import FormField from 'components/UsefullComponents/FormField';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import 'components/UsefullComponents/Localization/i18n.js';
import 'index.css';

function SetNewPasswordPage(props) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(<p className="validationError">{t('passwordMissing')}</p>),
    confirmPassword: Yup.string()
      .when('password', {
        is: password => (password && password.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password'), null],
          <div>
            <p className="validationError">{t('confirmPassordNotMatching')}</p>
          </div>,
        ),
      })
      .required(<p className="validationError">{t('confirmPassowrdMissingReset')}</p>),
  });

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const formik = useFormik({
    validationSchema,
    initialValues,
  });

  const submit = e => {
    e.preventDefault();
    const data = {
      password: passwordProps.value,
      rePassword: confirmPasswordProps.value,
    };

    fetch(
      `${process.env.REACT_APP_API_KEY}/api/sds/user/resetPassword?token=${props.match.params.token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      },
    )
      .then(res => {
        if (res.status === 200) {
          props.history.push('/login');
        } else {
          alert(t('errorSettingNewPassword'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  var passwordProps = formik.getFieldProps('password');
  var confirmPasswordProps = formik.getFieldProps('confirmPassword');

  return (
    <div className="background-dashboard">
      <h2>{t('pageTitleSetNewPasswordPage')}</h2>
      <br />
      <h4>{t('pageInstructionsSetNewPasswordPage')}</h4>
      <div className="login-register-form">
        <form>
          <FormField type="password" {...passwordProps} />
          {formik.touched.password && formik.errors.password ? (
            <div className="fieldValidationErrorDiv">{formik.errors.password}</div>
          ) : null}
          <FormField type="password" {...confirmPasswordProps} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="fieldValidationErrorDiv">{formik.errors.confirmPassword}</div>
          ) : null}
          {formik.isValid && formik.dirty ? (
            <button onClick={submit} className=" btn-green formButtons">
              {t('changePasswordButton')}
            </button>
          ) : (
            <button className="formButtonsDisabled btn-green">{t('changePasswordButton')}</button>
          )}
        </form>
      </div>
    </div>
  );
}

export default SetNewPasswordPage;
