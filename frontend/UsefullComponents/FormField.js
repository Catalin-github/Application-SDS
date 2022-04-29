import React from 'react';
import '../../index.css';

function FormField({ name, label, ...rest }) {
  return (
    <div className="login_registerForm">
      <input
        className="inputField"
        label={name}
        id={name}
        name={name}
        placeholder={name}
        {...rest}
      />
    </div>
  );
}

export default FormField;
