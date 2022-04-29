import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import 'components/UsefullComponents/Localization/i18n.js';
import FormField from 'components/UsefullComponents/FormField';
import 'index.css';

function ResetPasswordPage(props) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(<p className="validationError">{t('emailInvalid')}</p>)
      .max(200, <p className="validationError">{t('emailToLong')}</p>)
      .required(<p className="validationError">{t('emailMissing')}</p>),
  });

  const initialValues = {
    userEmail: '',
  };

  const formik = useFormik({ initialValues, validationSchema });

  const handleSubmit = e => {
    e.preventDefault();

    const data = { email: emailProps.value };

    fetch(`${process.env.REACT_APP_API_KEY}/api/sds/user/changePassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 200) {
          alert(t('resetPasswordEmailSentAlert'));
        } else {
          alert(t('resetPasswordEmailNotSentAlert'));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const emailProps = formik.getFieldProps('email');

  return (
    <div>
      <h2>{t('pageTitleResetPasswordPage')}</h2>
      <br />
      <h4>{t('pageInstructionsResetPasswordPage')}</h4>
      <div className="login-register-form">
        <form>
          <FormField type="email" {...emailProps} />
          {formik.errors.email && formik.touched.email ? (
            <div className="fieldValidationErrorDiv">{formik.errors.email}</div>
          ) : null}
          <button
            onClick={handleSubmit}
            className="formButtons"
            disabled={!(formik.isValid && formik.dirty)}
          >
            {t('sendLinkButtonResetPasswordPage')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
