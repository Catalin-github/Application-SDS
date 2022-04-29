/** @format */

import React, { Component } from 'react';
import MeasureAddModel from './MeasureAddModel';
import { connect } from 'react-redux';
import { addMeasureTable } from 'redux/measure/MeasureAction';
import { getAllClients } from 'redux/clients/clientsActions';
import Select from 'components/UsefullComponents/Select.js';
import { getAllTypesOfProject } from 'utils/OffersUtils.js';
import { checkPhoneValueForInputs } from 'utils/GlobalUtils.js';
import * as CONSTANTS from 'GlobalConstants.js';
import { CONSTANTS as MEASURE_CONSTANTS } from 'constants/MeasureConstants.js';
import './Measure.css';
import 'index.css';

class CreateMeasure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      reference: '',
      data: '',
      productType: MEASURE_CONSTANTS.TAMPLARIE_PVC,
      status: MEASURE_CONSTANTS.TO_DO,
      findClient: [],
      searchClient: '',
      isOpen: false,

      maxLengthFirstName: false,
      maxLengthLastName: false,
      maxLengthPhone: false,
      maxLengthAddress: false,
      maxLengthReference: false,

      errors: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        reference: '',
      },
    };
  }
  componentDidMount = () => {
    this.setState({ findClient: [] });
    for (let i = 0; i < this.props.clients.length; i++) {
      this.state.findClient.push(this.props.clients[i].phone);
    }
  };

  handleBlurInputs = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.setState({ maxLengthFirstName: false });
    this.setState({ maxLengthLastName: false });
    this.setState({ maxLengthPhone: false });
    this.setState({
      maxLengthAddress: false,
    });
    this.setState({ maxLengthReference: false });

    const { name, value } = e.target;
    let errors = this.state.errors;
    this.setState({ errors, [name]: value });
    switch (name) {
      case CONSTANTS.FIRST_NAME_EN: {
        errors.firstName = value.length < 2 ? CONSTANTS.REQUIRED_FIELD : '';
        break;
      }
      case CONSTANTS.LAST_NAME_EN: {
        errors.lastName = value.length < 2 ? CONSTANTS.REQUIRED_FIELD : '';
        break;
      }
      case CONSTANTS.PHONE_EN: {
        errors.phone = checkPhoneValueForInputs(value) ? '' : CONSTANTS.INVALID_PHONE_MESSAGE;
        break;
      }
      case CONSTANTS.ADDRESS_EN: {
        errors.address = value.length < 1 ? CONSTANTS.REQUIRED_FIELD : '';
        break;
      }
      default:
        break;
    }
  };

  handleClientList = e => {
    let errors = this.state.errors;
    errors.firstName = '';
    errors.lastName = '';
    errors.phone = '';
    errors.address = '';
    this.setState({
      [e.target.name]: e.target.value,
    });
    var index = this.state.findClient.findIndex(x => e.target.value === x);
    if (index !== -1) {
      this.setState({
        firstName: this.props.clientsData[index].firstName,
        lastName: this.props.clientsData[index].lastName,
        address: this.props.clientsData[index].address,
        phone: this.props.clientsData[index].phone,
        reference: this.props.clientsData[index].reference,
        productType: this.props.clientsData[index].productType,
      });
    }
    this.setState({ findClient: [] });
  };
  getClients = () => {
    for (let i = 0; i < this.props.clientsData.length; i++) {
      this.state.findClient.push(this.props.clientsData[i].phone);
    }
  };
  createChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createChangePhoneField = e => {
    this.setState({ maxLengthPhone: false });
    const phoneFormat = /^\+?\d+$/;
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
      this.setState({
        [e.target.name]: inputValue,
      });
    } else {
      this.setState({
        maxLengthAddress: true,
      });
    }
  };

  createChangeFields = e => {
    this.setState({ maxLengthFirstName: false });
    this.setState({ maxLengthLastName: false });
    this.setState({ maxLengthReference: false });
    const name = e.target.name;
    const inputValue = e.target.value;
    if (inputValue.length < 21) {
      this.setState({
        [e.target.name]: inputValue,
      });
    } else {
      if (name === CONSTANTS.FIRST_NAME_EN) {
        this.setState({ maxLengthFirstName: true });
      } else if (name === CONSTANTS.LAST_NAME_EN) {
        this.setState({ maxLengthLastName: true });
      } else if (name === CONSTANTS.REFERENCE_EN) {
        this.setState({ maxLengthReference: true });
      }
    }
  };

  createClose = () => {
    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      phone: '',
      status: MEASURE_CONSTANTS.TO_DO,
      reference: '',
      productType: MEASURE_CONSTANTS.TAMPLARIE_PVC,
      isOpen: false,
    });
  };

  createSubmit = e => {
    e.preventDefault();
    this.props.addMeasureTable({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      reference: this.state.reference,
      data: this.state.data,
      address: this.state.address,
      phone: this.state.phone !== '' ? this.state.phone : null,
      productType: this.state.productType,
      status: this.state.status,
      employee: this.props.userData.firstName + ' ' + this.props.userData.lastName,
    });

    this.createClose();
  };
  handleCloseModal = e => {
    if (!document.getElementById('container-measure').contains(e.target)) {
      this.createClose();
    }
  };

  openModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.getAllClients();
  };

  render() {
    const { errors } = this.state;
    var disabled;
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (this.state.isOpen === true) {
          this.createClose();
        }
      }
    });

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
        className={this.props.userData.authority.includes(CONSTANTS.WRITE_MEASURE) ? '' : 'hidden'}
      >
        <button
          className="button-sds create masuri create-measure"
          onClick={this.openModal}
          rel="nofollow noopener noreferrer"
          draggable="false"
        >
          {MEASURE_CONSTANTS.CREATE_MEASURE}
        </button>
        <MeasureAddModel isOpen={this.state.isOpen}>
          <div className="modal-bg" onMouseDown={this.handleCloseModal}>
            <div id="container-measure" className="container-measure">
              <div className="upperPartOfDiv">
                <div className="title">{MEASURE_CONSTANTS.ADD_MEASURE}</div>
                <p className="necessaryFieldsMessage">{CONSTANTS.REQUIRED_MESSAGE_FIELDS}</p>
                <label className="labelExistingClient" htmlFor="clientListPhone">
                  {MEASURE_CONSTANTS.PHONE_SEARCH_MESSAGE}
                </label>
                <input
                  list="clientList"
                  name="searchClient"
                  id="clientListPhone"
                  className="existingClient"
                  onChange={this.handleClientList}
                  onFocus={this.getClients()}
                  tabIndex="-1"
                />
                <datalist id="clientList">
                  {this.props.clientsData.map(item => (
                    <option key={item.clientId} value={item.phone} />
                  ))}
                </datalist>
              </div>
              <div className="contentMeasure">
                <form onSubmit={this.createSubmit} autoComplete="off">
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
                      <label htmlFor="phone">{CONSTANTS.PHONE}</label>
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
                      {this.state.maxLengthAddress === true ? (
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
                      <label htmlFor="reference">{CONSTANTS.REFERENCE}</label>
                      <input
                        name="reference"
                        value={this.state.reference}
                        onChange={this.createChangeFields}
                        onBlur={this.handleBlurInputs}
                      />
                      {this.state.maxLengthReference === true ? (
                        <span className="validationErrors">
                          {CONSTANTS.TWENTY_CHARACTHERS_MAXIMUM}
                        </span>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="input-box-measure">
                      <label htmlFor="productType">{MEASURE_CONSTANTS.PRODUCT_TYPE}</label>
                      <Select
                        id={5}
                        name="productType"
                        array={getAllTypesOfProject()}
                        onChange={this.createChange}
                        defaultValue={MEASURE_CONSTANTS.TAMPLARIE_PVC}
                      />
                    </div>
                  </div>
                  <div>
                    <button onClick={this.createClose} className="button-sds cancel masuri">
                      {CONSTANTS.CANCEL_EN}
                    </button>
                    {
                      (disabled =
                        this.state.errors.firstName !== '' || this.state.firstName === ''
                          ? true
                          : this.state.errors.lastName !== '' || this.state.lastName === ''
                          ? true
                          : this.state.errors.phone !== ''
                          ? true
                          : this.state.errors.address !== '' || this.state.address === ''
                          ? true
                          : false)
                    }
                    {disabled === true ? (
                      <button className="button-sds submit inactiv" disabled={true}>
                        {CONSTANTS.SUBMIT_TEXT}
                      </button>
                    ) : (
                      <button
                        id="enter"
                        type="submit"
                        className="button-sds submit masuri"
                        onClick={this.createSubmit}
                      >
                        {CONSTANTS.SUBMIT_TEXT}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </MeasureAddModel>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loadingMeasure: state.measure.loading,
    userData: state.auth.userData,
    measureData: state.measure.measureData,
    update: state.measure.update,
    clientsData: state.clients.clientsData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMeasureTable: data => dispatch(addMeasureTable(data)),
    getAllClients: () => dispatch(getAllClients()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateMeasure);
