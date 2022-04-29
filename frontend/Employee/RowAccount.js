/** @format */

import React, { Component } from 'react';
import ModalEmployee from './ModalEmployee';
import Modal from 'react-modal';
import { updateEmployee, deleteEmployee, accountRefresh } from 'redux/account/AccountAction';
import { connect } from 'react-redux';
import * as CONSTANTS from 'GlobalConstants.js';
import EMPLOYEE_CONSTANTS from 'constants/EmployeeConstants.js';
import './Employee.css';

class RowAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remove: false,
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      oldEmail: this.props.email,
      address: this.props.address,
      phone: this.props.phone,
      role: this.props.role,
      authority: this.props.authority,
      isOpen: false,
      dialogModal: false,
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

  componentDidMount = () => {
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (this.state.isOpen === true) {
          this.handleClose();
        }
      }
    });
    if (!this.props.userData.authority.includes('WRITE_EMPLOYEE')) {
      if (document.getElementById(`editTableEmployeeButton-${this.props.id}`) != null) {
        document.getElementById(`editTableEmployeeButton-${this.props.id}`).remove();
      }
    }

    this.props.accountRefresh();
  };

  handleBlurInputs = e => {
    this.setState({ [e.target.name]: e.target.value });

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

  handleClose = () => {
    CONSTANTS.Authorities.forEach(auth => {
      if (document.getElementById(auth).checked === true) {
        document.getElementById(auth).click();
      }
    });

    this.props.roles.data.forEach(({ role, authority }) => {
      if (this.props.role === role) {
        authority.forEach(auth => {
          document.getElementById(auth).checked = true;
          this.state.authority.push(auth);
        });
        return;
      }
    });

    this.setState({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      oldEmail: this.props.email,
      address: this.props.address,
      phone: this.props.phone,
      role: this.props.role,
      authority: this.state.authority,
      isOpen: false,
      dialogModal: false,
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        role: '',
      },
    });
    this.props.accountRefresh();
  };

  handleSubmit = e => {
    e.preventDefault();
    document.getElementById(`firstName-${this.props.id}`).textContent = this.state.firstName;
    document.getElementById(`lastName-${this.props.id}`).textContent = this.state.lastName;
    document.getElementById(`email-${this.props.id}`).textContent = this.state.email;
    document.getElementById(`address-${this.props.id}`).textContent = this.state.address;
    document.getElementById(`phone-${this.props.id}`).textContent = this.state.phone;
    document.getElementById(`role-${this.props.id}`).textContent = this.state.role;

    this.setState({ isOpen: false });
    this.props.updateEmployee({
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      oldEmail: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      role: this.state.role,
      authority: this.state.authority,
    });
  };

  deleteEmployee = () => {
    this.props.deleteEmployee({ email: this.state.email });
    this.setState({ remove: true });
  };

  handleChangePhoneField = e => {
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

  handleChangeAddressField = e => {
    this.setState({
      maxLengthAddress: false,
    });
    const inputValue = e.target.value;
    if (inputValue.length < 171) {
      this.setState({
        [e.target.name]: inputValue,
      });
    } else {
      this.setState({
        maxLengthAddress: true,
      });
    }
  };

  handleChangeEmailField = e => {
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

  handleChangeFields = e => {
    this.setState({ maxLengthFirstName: false });
    this.setState({ maxLengthLastName: false });

    const name = e.target.name;
    const inputValue = e.target.value;
    if (inputValue.length < 21) {
      this.setState({ [e.target.name]: inputValue });
    } else {
      if (name === 'firstName') {
        this.setState({ maxLengthFirstName: true });
      } else if (name === 'lastName') {
        this.setState({ maxLengthLastName: true });
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
    if (!document.getElementById('container-employee').contains(e.target)) {
      this.handleClose();
    }
  };

  handleCheck = e => {
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

  openModalAccount = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { errors } = this.state;
    var disabled;
    if (this.state.remove === true) {
      return null;
    } else {
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
        <>
          <tr className="active-row" key={this.props.key}>
            <td id={`firstName-${this.props.id}`} className="tableRowCellEmployee">
              {this.props.firstName}
            </td>
            <td id={`lastName-${this.props.id}`} className="tableRowCellEmployee">
              {this.props.lastName}
            </td>
            <td id={`email-${this.props.id}`} className="tableRowCellEmployee">
              {this.props.email}
            </td>
            <td id={`address-${this.props.id}`} className="tableRowCellEmployee">
              {this.props.address}
            </td>
            <td id={`phone-${this.props.id}`} className="tableRowCellEmployee">
              <a className="callablePhoneAnchors" href={`tel:${this.props.phone}`}>
                {this.props.phone}
              </a>
            </td>
            <td id={`role-${this.props.id}`} className="tableRowCellEmployee">
              {this.props.role}
            </td>
            <td id={`authorities-${this.props.id}`} className="td-roles tableRowCellEmployee">
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {this.state.authority !== undefined &&
                  this.state.authority.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        width: '50%',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        border: '1px solid white',
                      }}
                    >
                      {item + ' '}
                    </div>
                  ))}
              </div>
            </td>
            <td
              id={`editTableEmployeeButton-${this.props.id}`}
              className="table-row-button-measure"
            >
              <button className="penButtonEditTable" onClick={() => this.openModalAccount()}>
                <i className="fas fa-pencil-alt"></i>
              </button>
            </td>
          </tr>
          <Modal
            isOpen={this.state.dialogModal}
            onRequestClose={() => this.setState({ dialogModal: false })}
            ariaHideApp={false}
          >
            <div className="modal-bg-confirm">
              <div id="container-employee" className="container-role">
                <div className="title">
                  {EMPLOYEE_CONSTANTS.ERASE_EMPLOYEE_QUESTION}{' '}
                  {' ' + this.props.firstName + ' ' + this.props.lastName} ?
                </div>
                <br />
                <div>
                  <button
                    className="button-sds cancel roluri"
                    onClick={() => this.setState({ dialogModal: false })}
                  >
                    {EMPLOYEE_CONSTANTS.ERASE_EMPLOYEE_AFTERTHOUGHT}
                  </button>
                </div>
                <div>
                  <button className="button-sds submit delete" onClick={this.deleteEmployee}>
                    {EMPLOYEE_CONSTANTS.ERASE_EMPLOYEE_CONFIRMATION}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <ModalEmployee isOpen={this.state.isOpen} ariaHideApp={false}>
            <div className="modal-bg" onMouseDown={this.handleCloseModal}>
              <div id="container-employee" className="container-role">
                <div className="title">
                  {CONSTANTS.EDIT}
                  <button
                    className="button-sds submit delete"
                    onClick={() => this.setState({ dialogModal: true })}
                  >
                    {CONSTANTS.DELETE}
                  </button>
                </div>

                <div className="contentMeasure">
                  <p>{CONSTANTS.REQUIRED_MESSAGE_FIELDS}</p>
                  <br />
                  <form onSubmit={e => this.handleSubmit(e)} autoComplete="off">
                    <div className="user-details-measure">
                      <div className="input-box-measure">
                        <label htmlFor="firstName">{CONSTANTS.FIRST_NAME_AST}</label>
                        <input
                          id="firstName"
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChangeFields}
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
                          onChange={this.handleChangeFields}
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
                        <label htmlFor="email">{CONSTANTS.EMAIL_AST}</label>
                        <input
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChangeEmailField}
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
                          onChange={this.handleChangePhoneField}
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
                          onChange={this.handleChangeAddressField}
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
                      <ul className="ks-cboxtags" key={1}>
                        <li key={1.1}>
                          <input
                            name="READ_EMPLOYEE"
                            type="checkbox"
                            id={`READ_EMPLOYEE`}
                            value={`READ_EMPLOYEE`}
                            defaultChecked={
                              this.state.authority !== undefined &&
                              this.state.authority.includes('READ_EMPLOYEE')
                            }
                            onChange={this.handleCheck}
                          />
                          <label htmlFor={`READ_EMPLOYEE`}>{CONSTANTS.READ_EMPLOYEE}</label>
                        </li>
                        <li key={1.2}>
                          <input
                            name="WRITE_EMPLOYEE"
                            type="checkbox"
                            id="WRITE_EMPLOYEE"
                            value={`WRITE_EMPLOYEE`}
                            defaultChecked={this.state.authority.includes('WRITE_EMPLOYEE')}
                            onChange={this.handleCheck}
                          />
                          <label htmlFor={`WRITE_EMPLOYEE`}>{CONSTANTS.WRITE_EMPLOYEE}</label>
                        </li>
                        <li key={1.3}>
                          <input
                            name="READ_MEASURE"
                            type="checkbox"
                            id={`READ_MEASURE`}
                            value={`READ_MEASURE`}
                            defaultChecked={this.state.authority.includes('READ_MEASURE')}
                            onChange={this.handleCheck}
                          />
                          <label htmlFor={`READ_MEASURE`}>{CONSTANTS.READ_MEASURE}</label>
                        </li>
                        <li key={1.4}>
                          <input
                            onChange={this.handleCheck}
                            name="WRITE_MEASURE"
                            type="checkbox"
                            id="WRITE_MEASURE"
                            value={`WRITE_MEASURE`}
                            defaultChecked={this.state.authority.includes('WRITE_MEASURE')}
                          />
                          <label htmlFor={`WRITE_MEASURE`}>{CONSTANTS.WRITE_MEASURE}</label>
                        </li>
                        <li key={1.5}>
                          <input
                            onChange={this.handleCheck}
                            name="READ_ORDER"
                            type="checkbox"
                            id="READ_ORDER"
                            value={`READ_ORDER`}
                            defaultChecked={this.state.authority.includes('READ_ORDER')}
                          />
                          <label htmlFor={`READ_ORDER`}>{CONSTANTS.READ_ORDER}</label>
                        </li>
                        <li key={1.6}>
                          <input
                            onChange={this.handleCheck}
                            name="WRITE_ORDER"
                            type="checkbox"
                            id="WRITE_ORDER"
                            value={`WRITE_ORDER`}
                            defaultChecked={this.state.authority.includes('WRITE_ORDER')}
                          />
                          <label htmlFor={`WRITE_ORDER`}>{CONSTANTS.WRITE_ORDER}:</label>
                        </li>
                        <li key={1.7}>
                          <input
                            onChange={this.handleCheck}
                            name="READ_OFFER"
                            type="checkbox"
                            id="READ_OFFER"
                            value={`READ_OFFER`}
                            defaultChecked={this.state.authority.includes('READ_OFFER')}
                          />
                          <label htmlFor={`READ_OFFER`}> {CONSTANTS.READ_OFFER}</label>
                        </li>
                        <li key={1.8}>
                          <input
                            onChange={this.handleCheck}
                            name="WRITE_OFFER"
                            type="checkbox"
                            id="WRITE_OFFER"
                            value={`WRITE_OFFER`}
                            defaultChecked={this.state.authority.includes('WRITE_OFFER')}
                          />
                          <label htmlFor={`WRITE_OFFER`}> {CONSTANTS.WRITE_OFFER}</label>
                        </li>
                        <li key={1.9}>
                          <input
                            onChange={this.handleCheck}
                            name="READ_MONTAGE"
                            type="checkbox"
                            id="READ_MONTAGE"
                            value={`READ_MONTAGE`}
                            defaultChecked={this.state.authority.includes('READ_MONTAGE')}
                          />
                          <label htmlFor={`READ_MONTAGE`}>{CONSTANTS.READ_MONTAGE}</label>
                        </li>
                        <li key={1.11}>
                          <input
                            onChange={this.handleCheck}
                            name="WRITE_MONTAGE"
                            type="checkbox"
                            id="WRITE_MONTAGE"
                            value={`WRITE_MONTAGE`}
                            defaultChecked={this.state.authority.includes('WRITE_MONTAGE')}
                          />
                          <label htmlFor={`WRITE_MONTAGE`}>{CONSTANTS.WRITE_MONTAGE}</label>
                        </li>
                        <li key={1.12}>
                          <input
                            onChange={this.handleCheck}
                            name="READ_ROLE"
                            type="checkbox"
                            id="READ_ROLE"
                            value={`READ_ROLE`}
                            defaultChecked={this.state.authority.includes('READ_ROLE')}
                          />
                          <label htmlFor={`READ_ROLE`}> {CONSTANTS.READ_ROLE}</label>
                        </li>
                        <li key={1.13}>
                          <input
                            onChange={this.handleCheck}
                            name="WRITE_ROLE"
                            type="checkbox"
                            id="WRITE_ROLE"
                            value={`WRITE_ROLE`}
                            defaultChecked={this.state.authority.includes('WRITE_ROLE')}
                          />
                          <label htmlFor={`WRITE_ROLE`}>{CONSTANTS.WRITE_ROLE}</label>
                        </li>
                        <li key={1.14}>
                          <input
                            onChange={this.handleCheck}
                            name="READ_GLASS"
                            type="checkbox"
                            id="READ_GLASS"
                            value={`READ_GLASS`}
                            defaultChecked={this.state.authority.includes('READ_GLASS')}
                          />
                          <label htmlFor={`READ_GLASS`}>{CONSTANTS.READ_GLASS}</label>
                        </li>
                        <li key={1.15}>
                          <input
                            onChange={this.handleCheck}
                            name="WRITE_GLASS"
                            type="checkbox"
                            id="WRITE_GLASS"
                            value={`WRITE_GLASS`}
                            defaultChecked={this.state.authority.includes('WRITE_GLASS')}
                          />
                          <label htmlFor={`WRITE_GLASS`}>{CONSTANTS.WRITE_GLASS}</label>
                        </li>
                        <li key={1.16}>
                          <input
                            onChange={this.handleCheck}
                            name="READ_FRAME"
                            type="checkbox"
                            id="READ_FRAME"
                            value={`READ_FRAME`}
                            defaultChecked={this.state.authority.includes('READ_FRAME')}
                          />
                          <label htmlFor={`READ_FRAME`}>{CONSTANTS.READ_FRAME}</label>
                        </li>
                        <li key={1.17}>
                          <input
                            onChange={this.handleCheck}
                            name="WRITE_FRAME"
                            type="checkbox"
                            id="WRITE_FRAME"
                            value={`WRITE_FRAME`}
                            defaultChecked={this.state.authority.includes('WRITE_FRAME')}
                          />
                          <label htmlFor={`WRITE_FRAME`}>{CONSTANTS.WRITE_FRAME}</label>
                        </li>
                        <li key={1.18}>
                          <input
                            name="READ_CLIENT"
                            type="checkbox"
                            id="READ_CLIENT"
                            value={`READ_CLIENT`}
                            defaultChecked={this.state.authority.includes('READ_CLIENT')}
                            onChange={this.handleCheck}
                          />
                          <label htmlFor={`READ_CLIENT`}> {CONSTANTS.READ_CLIENT}</label>
                        </li>
                        <li key={1.19}>
                          <input
                            name="WRITE_CLIENT"
                            type="checkbox"
                            id="WRITE_CLIENT"
                            value={`WRITE_CLIENT`}
                            defaultChecked={this.state.authority.includes('WRITE_CLIENT')}
                            onChange={this.handleCheck}
                          />
                          <label htmlFor={`WRITE_CLIENT`}>{CONSTANTS.WRITE_CLIENT}</label>
                        </li>
                        <li key={1.21}>
                          <input
                            name={CONSTANTS.READ_REPORT}
                            type="checkbox"
                            id={CONSTANTS.READ_REPORT}
                            value={CONSTANTS.READ_REPORT}
                            defaultChecked={this.state.authority.includes(CONSTANTS.READ_REPORT)}
                            onChange={this.handleCheck}
                          />
                          <label htmlFor={CONSTANTS.READ_REPORT}>{CONSTANTS.READ_REPORT}:</label>
                        </li>
                      </ul>
                    </div>
                    <div className="divButtonsEmployee">
                      <button
                        className="button-sds cancel roluri"
                        onClick={this.handleClose}
                        type="button"
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
          </ModalEmployee>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    update: state.account.update,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteEmployee: data => dispatch(deleteEmployee(data)),
    updateEmployee: data => dispatch(updateEmployee(data)),
    accountRefresh: () => dispatch(accountRefresh()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RowAccount);
