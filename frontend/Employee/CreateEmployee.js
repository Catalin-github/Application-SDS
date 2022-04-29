/** @format */

import React, { Component } from 'react';
import ModalCreateEmployee from './ModalCreateEmployee';
import { connect } from 'react-redux';
import { addEmployee } from 'redux/account/AccountAction';
import * as CONSTANTS from 'GlobalConstants';
import EMPLOYEE_CONSTANTS from 'constants/EmployeeConstants.js';
import 'index.css';

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      role: '',
      authority: [],
      isOpen: false,
      maxLengthFirstName: false,
      maxLengthLastName: false,
      maxLengthEmail: false,
      maxLengthPassword: false,
      maxLengthPhone: false,
      maxLengthAddress: false,
      maxLengthRole: false,
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        role: '',
      },
    };
  }

  handleBlurInputs = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.setState({ maxLengthFirstName: false });
    this.setState({ maxLengthLastName: false });
    this.setState({ maxLengthEmail: false });
    this.setState({ maxLengthPassword: false });
    this.setState({ maxLengthPhone: false });
    this.setState({ maxLengthAddress: false });
    this.setState({ maxLengthRole: false });

    const { name, value } = e.target;
    let errors = this.state.errors;
    this.setState({ errors, [name]: value });
    const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^\+?\d+$/;

    switch (name) {
      case CONSTANTS.FIRST_NAME_EN: {
        errors.firstName = value.length < 2 ? CONSTANTS.REQUIRED_FIELD : '';
        break;
      }
      case CONSTANTS.LAST_NAME_EN: {
        errors.lastName = value.length < 2 ? CONSTANTS.REQUIRED_FIELD : '';
        break;
      }
      case CONSTANTS.EMAIL_NO_CAPS: {
        errors.email = value.length < 1 ? CONSTANTS.REQUIRED_FIELD : '';
        errors.email = mailFormat.test(value) ? '' : CONSTANTS.INVALID_EMAIL_MESSAGE;
        break;
      }
      case CONSTANTS.PHONE_EN: {
        errors.phone = value.length < 1 ? CONSTANTS.REQUIRED_FIELD : '';
        errors.phone = value.match(phoneFormat) ? '' : CONSTANTS.INVALID_PHONE_MESSAGE;
        this.setState({ maxLengthPhone: false });
        break;
      }
      case CONSTANTS.ADDRESS_EN: {
        errors.address = value.length < 1 ? CONSTANTS.REQUIRED_FIELD : '';
        break;
      }
      case CONSTANTS.ROLE_EN: {
        errors.role = value.length < 1 ? CONSTANTS.REQUIRED_FIELD : '';
        break;
      }
      default:
        break;
    }
  };

  createClose = () => {
    this.setState({
      isOpen: false,
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      role: '',
      authority: [],
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        role: '',
      },
    });
  };

  createSubmit = e => {
    e.preventDefault();
    this.props.addEmployee({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      role: this.state.role,
      authority: this.state.authority,
    });

    this.createClose();
  };
  createChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  createChangePhoneField = e => {
    const phoneFormat = /^[+]?\d+$/;
    this.setState({ maxLengthPhone: false });
    if (e.target.value.match(phoneFormat) || e.target.value === '' || e.target.value === '+') {
      if (e.target.value.length < 16) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      } else {
        this.setState({ maxLengthPhone: true });
      }
    }
  };
  createChangeAddressField = e => {
    this.setState({
      maxLengthAddress: false,
    });
    const inputValue = e.target.value;
    if (inputValue.length < 171) {
      this.setState({ [e.target.name]: inputValue });
    } else {
      this.setState({
        maxLengthAddress: true,
      });
    }
  };

  createChangeEmailField = e => {
    this.setState({
      maxLengthEmail: false,
    });
    const inputValue = e.target.value;
    if (inputValue.length < 60) {
      this.setState({
        [e.target.name]: inputValue,
      });
    } else {
      this.setState({
        maxLengthEmail: true,
      });
    }
  };

  createChangePasswordField = e => {
    this.setState({
      maxLengthPassword: false,
    });
    const inputValue = e.target.value;
    if (inputValue.length < 100) {
      this.setState({
        [e.target.name]: inputValue,
      });
    } else {
      this.setState({
        maxLengthPassword: true,
      });
    }
  };
  createChangeFields = e => {
    this.setState({ maxLengthFirstName: false });
    this.setState({ maxLengthLastName: false });

    const name = e.target.name;
    const inputValue = e.target.value;
    if (inputValue.length < 21) {
      this.setState({
        [e.target.name]: inputValue,
      });
    } else {
      if (name === 'firstName') {
        this.setState({ maxLengthFirstName: true });
      } else if (name === 'lastName') {
        this.setState({ maxLengthLastName: true });
      }
    }
  };
  createCheck = e => {
    if (e.target.checked === true && !this.state.authority.includes(e.target.value)) {
      this.state.authority.push(e.target.value);
    } else if (e.target.checked === false) {
      for (var i = this.state.authority.length; i >= 0; i--) {
        if (this.state.authority[i] === e.target.value) {
          this.state.authority.splice(i, 1);
        }
      }
    }
  };
  handleRoles = e => {
    this.setState({ maxLengthRole: false });
    if (e.target.value.length < 21) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else {
      this.setState({ maxLengthRole: true });
    }

    CONSTANTS.Authorities.forEach(auth => {
      if (document.getElementById(auth).checked === true) {
        document.getElementById(auth).click();
      }
    });

    this.props.roles.data.forEach(({ role, authority }) => {
      if (e.target.value === role) {
        authority.forEach(auth => {
          document.getElementById(auth).checked = true;
          this.state.authority.push(auth);
        });
        return;
      }
    });
  };
  handleCloseModal = e => {
    if (!document.getElementById('container-measure').contains(e.target)) {
      this.createClose();
    }
  };
  render() {
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (this.state.isOpen === true) {
          this.createClose();
        }
      }
    });
    const { errors } = this.state;
    var disabled;

    window.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        let enterButton = document.getElementById('enter');
        if (enterButton) {
          enterButton.click();
        }
        event.preventDefault();
        return false;
      }
    });

    return (
      <div
        style={{
          display: this.props.userData.authority.includes(CONSTANTS.WRITE_EMPLOYEE) ? '' : 'none',
          position: 'inherit',
          left: '100em',
        }}
      >
        <button
          className="button-sds create roluri create-employee"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          rel="nofollow noopener noreferrer"
          draggable="false"
        >
          {EMPLOYEE_CONSTANTS.CREATE_EMPLOYEE}
        </button>

        <ModalCreateEmployee isOpen={this.state.isOpen}>
          <div className="modal-bg" onMouseDown={this.handleCloseModal}>
            <div id="container-measure" className="container-role">
              <div className="title">{EMPLOYEE_CONSTANTS.REGISTER}</div>
              <p>{CONSTANTS.REQUIRED_MESSAGE_FIELDS}</p>
              <br />
              <div className="contentMeasure">
                <form onSubmit={e => this.createSubmit(e)} autoComplete="off">
                  <div className="user-details-measure">
                    <div className="input-box-measure">
                      <label htmlFor="firstName">{CONSTANTS.FIRST_NAME_AST}</label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.createChangeFields}
                        onBlur={this.handleBlurInputs}
                        autoFocus
                      />
                      {this.state.maxLengthFirstName === true ? (
                        <span className="validationErrors">
                          {CONSTANTS.TWENTY_CHARACTHERS_MAXIMUM}
                        </span>
                      ) : (
                        ''
                      )}
                      {errors.firstName.length > 0 && (
                        <span className="validationErrors">{errors.firstName}</span>
                      )}
                    </div>
                    <div className="input-box-measure">
                      <label htmlFor="lastName">{CONSTANTS.LAST_NAME_AST}</label>
                      <input
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.createChangeFields}
                        onBlur={this.handleBlurInputs}
                      />
                      {this.state.maxLengthLastName === true ? (
                        <span className="validationErrors">
                          {CONSTANTS.TWENTY_CHARACTHERS_MAXIMUM}
                        </span>
                      ) : (
                        ''
                      )}
                      {errors.lastName.length > 0 && (
                        <span className="validationErrors">{errors.lastName}</span>
                      )}
                    </div>
                    <div className="input-box-measure">
                      <label htmlFor="email"> {CONSTANTS.EMAIL_AST} </label>
                      <input
                        name="email"
                        value={this.state.email}
                        onChange={this.createChangeEmailField}
                        onBlur={this.handleBlurInputs}
                      />
                      {this.state.maxLengthEmail === true ? (
                        <span className="validationErrors">
                          {CONSTANTS.SIXTY_CHARACTHERS_MAXIMUM}
                        </span>
                      ) : (
                        ''
                      )}
                      {errors.email.length > 0 && (
                        <span className="validationErrors">{errors.email}</span>
                      )}
                    </div>
                    <div className="input-box-measure">
                      <label htmlFor="phone">{CONSTANTS.PHONE_AST}</label>
                      <input
                        name="phone"
                        value={this.state.phone}
                        onChange={this.createChangePhoneField}
                        onBlur={this.handleBlurInputs}
                      />
                      {this.state.maxLengthPhone === true ? (
                        <span className="validationErrors">
                          {CONSTANTS.FIFTEEN_CHARACTHERS_MAXIMUM}
                        </span>
                      ) : (
                        ''
                      )}
                      {errors.phone.length > 0 && (
                        <span className="validationErrors">{errors.phone}</span>
                      )}
                    </div>
                    <div className="input-box-measure">
                      <label htmlFor="address">{CONSTANTS.ADDRESS_AST}</label>
                      <input
                        name="address"
                        value={this.state.address}
                        onChange={this.createChangeAddressField}
                        onBlur={this.handleBlurInputs}
                      />
                      {this.state.maxLengthAdress === true ? (
                        <span className="validationErrors">
                          {CONSTANTS.ONE_HUNDRED_SEVENTY_CHARACTHERS_MAXIMUM}
                        </span>
                      ) : (
                        ''
                      )}
                      {errors.address.length > 0 && (
                        <span className="validationErrors">{errors.address}</span>
                      )}
                    </div>

                    <div className="input-box-measure">
                      <label htmlFor="role">{CONSTANTS.ROLE_AST}</label>
                      <input
                        name="role"
                        list="rolesList"
                        value={this.state.role}
                        id="roleList"
                        onChange={this.handleRoles}
                        onBlur={this.handleBlurInputs}
                      />
                      {this.state.maxLengthRole === true ? (
                        <span className="validationErrors">
                          {CONSTANTS.TWENTY_CHARACTHERS_MAXIMUM}
                        </span>
                      ) : (
                        ''
                      )}
                      {errors.role.length > 0 && (
                        <span className="validationErrors">{errors.role}</span>
                      )}
                      <datalist id="rolesList">
                        {this.props.roles.data.map((item, index) => (
                          <option value={item.role} key={index} />
                        ))}
                      </datalist>
                    </div>
                  </div>
                  <div>
                    <span>{EMPLOYEE_CONSTANTS.AUTHORITY}</span>
                    <ul className="ks-cboxtags" key={0}>
                      <li key={0.1}>
                        <input
                          name="READ_EMPLOYEE"
                          type="checkbox"
                          id={`READ_EMPLOYEE`}
                          value={`READ_EMPLOYEE`}
                          defaultChecked={this.state.authority.includes('READ_EMPLOYEE')}
                          onChange={this.createCheck}
                        />
                        <label htmlFor={`READ_EMPLOYEE`}>{CONSTANTS.READ_EMPLOYEE}</label>
                      </li>
                      <li key={0.2}>
                        <input
                          name="WRITE_EMPLOYEE"
                          type="checkbox"
                          id="WRITE_EMPLOYEE"
                          value={`WRITE_EMPLOYEE`}
                          defaultChecked={this.state.authority.includes('WRITE_EMPLOYEE')}
                          onChange={this.createCheck}
                        />
                        <label htmlFor={`WRITE_EMPLOYEE`}>{CONSTANTS.WRITE_EMPLOYEE}</label>
                      </li>
                      <li key={0.3}>
                        <input
                          name="READ_MEASURE"
                          type="checkbox"
                          id={`READ_MEASURE`}
                          value={`READ_MEASURE`}
                          defaultChecked={this.state.authority.includes('READ_MEASURE')}
                          onChange={this.createCheck}
                        />
                        <label htmlFor={`READ_MEASURE`}>{CONSTANTS.READ_MEASURE}</label>
                      </li>
                      <li key={0.4}>
                        <input
                          onChange={this.createCheck}
                          name="WRITE_MEASURE"
                          type="checkbox"
                          id="WRITE_MEASURE"
                          value={`WRITE_MEASURE`}
                          defaultChecked={this.state.authority.includes('WRITE_MEASURE')}
                        />
                        <label htmlFor={`WRITE_MEASURE`}>{CONSTANTS.WRITE_MEASURE}</label>
                      </li>
                      <li key={0.5}>
                        <input
                          onChange={this.createCheck}
                          name="READ_ORDER"
                          type="checkbox"
                          id="READ_ORDER"
                          value={`READ_ORDER`}
                          defaultChecked={this.state.authority.includes('READ_ORDER')}
                        />
                        <label htmlFor={`READ_ORDER`}>{CONSTANTS.READ_ORDER}</label>
                      </li>
                      <li key={0.6}>
                        <input
                          onChange={this.createCheck}
                          name="WRITE_ORDER"
                          type="checkbox"
                          id="WRITE_ORDER"
                          value={`WRITE_ORDER`}
                          defaultChecked={this.state.authority.includes('WRITE_ORDER')}
                        />
                        <label htmlFor={`WRITE_ORDER`}>{CONSTANTS.WRITE_ORDER}</label>
                      </li>
                      <li key={0.7}>
                        <input
                          onChange={this.createCheck}
                          name="READ_OFFER"
                          type="checkbox"
                          id="READ_OFFER"
                          value={`READ_OFFER`}
                          defaultChecked={this.state.authority.includes('READ_OFFER')}
                        />
                        <label htmlFor={`READ_OFFER`}>{CONSTANTS.READ_OFFER}</label>
                      </li>
                      <li key={0.8}>
                        <input
                          onChange={this.createCheck}
                          name="WRITE_OFFER"
                          type="checkbox"
                          id="WRITE_OFFER"
                          value={`WRITE_OFFER`}
                          defaultChecked={this.state.authority.includes('WRITE_OFFER')}
                        />
                        <label htmlFor={`WRITE_OFFER`}>{CONSTANTS.WRITE_OFFER}</label>
                      </li>
                      <li key={0.9}>
                        <input
                          onChange={this.createCheck}
                          name="READ_MONTAGE"
                          type="checkbox"
                          id="READ_MONTAGE"
                          value={`READ_MONTAGE`}
                          defaultChecked={this.state.authority.includes('READ_MONTAGE')}
                        />
                        <label htmlFor={`READ_MONTAGE`}>{CONSTANTS.READ_MONTAGE}</label>
                      </li>
                      <li key={0.11}>
                        <input
                          onChange={this.createCheck}
                          name="WRITE_MONTAGE"
                          type="checkbox"
                          id="WRITE_MONTAGE"
                          value={`WRITE_MONTAGE`}
                          defaultChecked={this.state.authority.includes('WRITE_MONTAGE')}
                        />
                        <label htmlFor={`WRITE_MONTAGE`}>{CONSTANTS.WRITE_MONTAGE}</label>
                      </li>
                      <li key={0.12}>
                        <input
                          onChange={this.createCheck}
                          name="READ_ROLE"
                          type="checkbox"
                          id="READ_ROLE"
                          value={`READ_ROLE`}
                          defaultChecked={this.state.authority.includes('READ_ROLE')}
                        />
                        <label htmlFor={`READ_ROLE`}>{CONSTANTS.READ_ROLE}</label>
                      </li>
                      <li key={0.13}>
                        <input
                          onChange={this.createCheck}
                          name="WRITE_ROLE"
                          type="checkbox"
                          id="WRITE_ROLE"
                          value={`WRITE_ROLE`}
                          defaultChecked={this.state.authority.includes('WRITE_ROLE')}
                        />
                        <label htmlFor={`WRITE_ROLE`}>{CONSTANTS.WRITE_ROLE}</label>
                      </li>
                      <li key={0.14}>
                        <input
                          onChange={this.createCheck}
                          name="READ_GLASS"
                          type="checkbox"
                          id="READ_GLASS"
                          value={`READ_GLASS`}
                          defaultChecked={this.state.authority.includes('READ_GLASS')}
                        />
                        <label htmlFor={`READ_GLASS`}>{CONSTANTS.READ_GLASS}</label>
                      </li>
                      <li key={0.15}>
                        <input
                          onChange={this.createCheck}
                          name="WRITE_GLASS"
                          type="checkbox"
                          id="WRITE_GLASS"
                          value={`WRITE_GLASS`}
                          defaultChecked={this.state.authority.includes('WRITE_GLASS')}
                        />
                        <label htmlFor={`WRITE_GLASS`}>{CONSTANTS.WRITE_GLASS}</label>
                      </li>
                      <li key={0.16}>
                        <input
                          onChange={this.createCheck}
                          name="READ_FRAME"
                          type="checkbox"
                          id="READ_FRAME"
                          value={`READ_FRAME`}
                          defaultChecked={this.state.authority.includes('READ_FRAME')}
                        />
                        <label htmlFor={`READ_FRAME`}>{CONSTANTS.READ_FRAME}</label>
                      </li>
                      <li key={0.17}>
                        <input
                          onChange={this.createCheck}
                          name="WRITE_FRAME"
                          type="checkbox"
                          id="WRITE_FRAME"
                          value={`WRITE_FRAME`}
                          defaultChecked={this.state.authority.includes('WRITE_FRAME')}
                        />
                        <label htmlFor={`WRITE_FRAME`}> {CONSTANTS.WRITE_FRAME}</label>
                      </li>
                      <li key={0.18}>
                        <input
                          name="READ_CLIENT"
                          type="checkbox"
                          id="READ_CLIENT"
                          value={`READ_CLIENT`}
                          defaultChecked={this.state.authority.includes('READ_CLIENT')}
                          onChange={this.createCheck}
                        />
                        <label htmlFor={`READ_CLIENT`}>{CONSTANTS.READ_CLIENT}</label>
                      </li>
                      <li key={0.19}>
                        <input
                          name="WRITE_CLIENT"
                          type="checkbox"
                          id="WRITE_CLIENT"
                          value={`WRITE_CLIENT`}
                          defaultChecked={this.state.authority.includes('WRITE_CLIENT')}
                          onChange={this.createCheck}
                        />
                        <label htmlFor={`WRITE_CLIENT`}>{CONSTANTS.WRITE_CLIENT}</label>
                      </li>
                      <li key={0.21}>
                        <input
                          name={CONSTANTS.READ_REPORT}
                          type="checkbox"
                          id={CONSTANTS.READ_REPORT}
                          value={CONSTANTS.READ_REPORT}
                          defaultChecked={this.state.authority.includes(CONSTANTS.READ_REPORT)}
                          onChange={this.createCheck}
                        />
                        <label htmlFor={CONSTANTS.READ_REPORT}>{CONSTANTS.READ_REPORT}</label>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <button
                      className="button-sds cancel roluri"
                      type="button"
                      onClick={this.createClose}
                    >
                      {CONSTANTS.CANCEL_EN}
                    </button>
                    {
                      (disabled =
                        this.state.errors.firstName !== '' || this.state.firstName === ''
                          ? true
                          : this.state.errors.lastName !== '' || this.state.lastName === ''
                          ? true
                          : this.state.errors.email !== '' || this.state.email === ''
                          ? true
                          : this.state.errors.phone !== '' || this.state.phone === ''
                          ? true
                          : this.state.errors.address !== '' || this.state.address === ''
                          ? true
                          : this.state.errors.role !== '' || this.state.role === ''
                          ? true
                          : false)
                    }
                    {disabled === true ? (
                      <button className="button-sds submit inactiv" disabled={true}>
                        {CONSTANTS.SUBMIT_TEXT}
                      </button>
                    ) : (
                      <button id="enter" className="button-sds submit roluri" type="submit">
                        {CONSTANTS.SUBMIT_TEXT}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalCreateEmployee>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loadingData: state.account.loading,
    loadedData: state.account.loaded,
    userData: state.auth.userData,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addEmployee: data => dispatch(addEmployee(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee);
