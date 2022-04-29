/** @format */

import React, { Component } from 'react';

import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import { storage } from 'firebase-config';
import { connect } from 'react-redux';
import { addDiagramsForMeasureId, measureDelete } from 'redux/measure/MeasureAction';

import MeasureModalImage from './MeasureModalImage';
import UploadImage from './UploadImage.png';
import DefaultImage from './DefaultImage.jpg';

import { changeDateFormatToHForm } from 'utils/DateHandling.js';
import { deleteClient } from 'utils/GlobalUtils.js';
import * as CONSTANTS from 'GlobalConstants.js';
import { CONSTANTS as MEASURE_CONSTANTS } from 'constants/MeasureConstants.js';
import CLIENT_CONSTANTS from 'constants/ClientsConstants';
import ModalConfirmRemoveClient from 'components/Clients/ModalConfirmRemoveClient';

import './Measure.css';
import 'index.css';

export class RowMeasure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.measureId,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      address: this.props.address,
      phone: this.props.phone,
      status: this.props.status,
      diagrams: this.props.diagrams === undefined ? [] : this.props.diagrams,
      date: this.props.date,
      profile: this.props.profile,
      isOpen: false,
      remove: false,
      filesList: [],
      storageList: [],
      isOpenModalRemoveClient: false,
    };
    this.setupBeforeUnloadListener = this.setupBeforeUnloadListener.bind(this);
  }
  setupBeforeUnloadListener(e) {
    this.handleClose();
    e.preventDefault();
    e.returnValue = '';
  }

  componentDidMount = () => {
    if (!this.props.userData.authority.includes(CONSTANTS.WRITE_MEASURE)) {
      if (document.getElementById(`editTableMeasureButton-${this.props.measureId}`) != null)
        document.getElementById(`editTableMeasureButton-${this.props.measureId}`).remove();
    }
    window.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        if (this.state.isOpen === true) {
          this.handleClose();
        }
      }
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      diagrams: this.props.diagrams,
      filesList: [],
      isOpen: false,
    });
    window.removeEventListener('beforeunload', this.setupBeforeUnloadListener);
  };

  handleRemoveFiles = e => {
    for (let i = this.state.filesList.length - 1; i >= 0; i--) {
      if (e.target.id === this.state.filesList[i].id) {
        document.getElementById(e.target.id).remove();
        this.state.filesList.splice(i, 1);
      }
    }
  };

  deleteThisClient = async () => {
    const client = {
      clientId: this.props.clientId,
      projectId: this.props.projectId,
    };

    const response = await deleteClient(client);
    if (response.success === true) {
      this.props.measureDelete(this.props.projectId);
      window.removeEventListener('beforeunload', this.setupBeforeUnloadListener);
    } else {
      this.setState({ isOpenModalRemoveClient: false });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();

    for (var i = this.state.diagrams.length - 1; i >= 0; i--) {
      if (document.getElementById(this.state.diagrams[i].id) == null) {
        const refStorage = ref(storage, this.state.diagrams[i].location);
        deleteObject(refStorage);
        this.state.diagrams.splice(i, 1);
      }
    }
    var dateTime = changeDateFormatToHForm(new Date());
    this.setState({
      date: dateTime,
      isOpen: false,
    });
    for (let i = this.state.filesList.length - 1; i >= 0; i--) {
      document.getElementById(this.state.filesList[i].id).remove();
    }
    for (let i = this.state.filesList.length - 1; i >= 0; i--) {
      const uid = this.uniqueFormatId();
      var firebaseFileName = `${uid}-${this.state.filesList[i].name}`;
      const storageRef = ref(
        storage,
        `salamander/${this.props.firstName}_${this.props.lastName}_${this.props.phone}/${this.props.projectTitle}/masuri/${firebaseFileName}`,
      );

      await uploadBytes(storageRef, this.state.filesList[i].location);

      this.state.diagrams.push({
        id: this.state.filesList[i].id,
        name: this.state.filesList[i].name,
        location: `salamander/${this.props.firstName}_${this.props.lastName}_${this.props.phone}/${this.props.projectTitle}/masuri/${firebaseFileName}`,
        measureId: this.state.filesList[i].measureId,
      });
    }

    this.props.addDiagramsForMeasureId(
      this.state.diagrams,
      this.props.measureId,
      this.props.userData.firstName + ' ' + this.props.userData.lastName,
    );

    this.setState({
      filesList: [],
      diagrams: this.props.diagrams,
      isOpen: false,
    });
    window.removeEventListener('beforeunload', this.setupBeforeUnloadListener);
  };

  uniqueId = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  uniqueFormatId = () => {
    return `${this.uniqueId() + this.uniqueId()}`;
  };

  imageHandler = async e => {
    if (e.target.files.length === 0) {
      return;
    }
    document.getElementById('submitMeasureModal').setAttribute('disabled', 'disabled');
    document.getElementById('file').setAttribute('disabled', 'disabled');
    document.getElementById('imageUpload').style.opacity = '0.5';
    document.getElementById('submitMeasureModal').style.opacity = '0.5';

    var images = [];
    var reader = [];
    for (let i = 0; i < e.target.files.length; i++) {
      reader.push(new FileReader());
      images.push(e.target.files[i]);
    }
    for (let j = 0; j < e.target.files.length; j++) {
      reader[j].readAsDataURL(e.target.files[j]);
    }
    reader.forEach(item => {
      item.onload = () => {
        if (item.readyState === 2) {
          document.getElementById('submitMeasureModal').setAttribute('disabled', 'disabled');
          document.getElementById('file').setAttribute('disabled', 'disabled');
          document.getElementById('imageUpload').style.opacity = '0.5';
          document.getElementById('submitMeasureModal').style.opacity = '0.5';
          var fileNameList = document.getElementById('fileNameList');

          var date = new Date();
          var time = date.getTime() + this.uniqueFormatId() + this.uniqueFormatId();

          if (document.getElementById('fileNameList') != null) {
            this.state.filesList.push({
              id: time.toString(),
              name: images[0].name,
              location: images[0],
              measureId: this.props.measureId,
            });

            var divId = document.createElement('div');
            divId.id = time.toString();
            divId.style.paddingBottom = '20px';
            var divStyle = document.createElement('div');
            divStyle.className = 'imageMeasureUpload';
            var link = document.createElement('a');
            link.id = time.toString();
            link.href = item.result;
            link.target = '_blank';

            var image = document.createElement('img');
            image.src = item.result;
            image.width = 146;
            image.height = 136;
            image.style.padding = '5px';
            link.appendChild(image);
            var divOuter = document.createElement('div');
            divOuter.className = 'outerRemoveMeasure';
            var divInner = document.createElement('div');
            divInner.className = 'innerRemoveMeasure';
            var label = document.createElement('label');
            label.className = 'labelRemoveMeasure';
            label.id = time;
            label.textContent = MEASURE_CONSTANTS.ERASE_IMAGE;
            label.addEventListener('click', async e => {
              for (let i = this.state.filesList.length - 1; i >= 0; i--) {
                if (e.target.id === this.state.filesList[i].id) {
                  document.getElementById(e.target.id).remove();
                  this.state.filesList.splice(i, 1);
                }
              }
            });
            divInner.appendChild(label);
            divOuter.appendChild(divInner);
            divStyle.appendChild(link);
            divStyle.appendChild(divOuter);
            divId.appendChild(divStyle);
            fileNameList.appendChild(divId);

            images.shift();

            document.getElementById('submitMeasureModal').removeAttribute('disabled');
            document.getElementById('file').removeAttribute('disabled');
            document.getElementById('submitMeasureModal').style.opacity = '1';
            document.getElementById('imageUpload').style.opacity = '1';
          }
        }
      };
    });
  };

  handleRemove = e => {
    e.preventDefault();
    if (document.getElementById(e.target.id) != null) {
      document.getElementById(e.target.id).remove();
    }
  };
  handleCloseModal = e => {
    if (
      !document.getElementById('container-measure').contains(e.target) &&
      e.target.className !== 'labelRemoveMeasure'
    ) {
      this.handleClose();
    }
  };
  getLocation = storageLocation => {
    const refStorage = ref(storage, `${storageLocation}`);
    getDownloadURL(refStorage).then(url => {
      window.open(url, '_blank');
    });
  };

  getLocationBlob = async (storageLocation, id) => {
    const refStorage = ref(storage, `${storageLocation}`);
    return await getDownloadURL(refStorage).then(url => {
      if (document.getElementById(id) != null) {
        document.getElementById(id).src = url;
      }
      return url;
    });
  };
  getDefault() {
    return DefaultImage;
  }

  render() {
    if (this.state.remove === true) {
      return null;
    } else {
      return (
        <>
          <tr className="active-row" key={this.props.key}>
            <td
              className="link-client tableRowCellMeasure"
              id={`firstName-${this.props.measureId}`}
            >
              {' '}
              {this.props.userData.authority.includes(CONSTANTS.READ_CLIENT) ? (
                <a href={`/profile?UID=${this.props.clientId}`} className="link-client">
                  {this.props.firstName} {this.props.lastName}
                </a>
              ) : (
                <>
                  {this.props.firstName} {this.props.lastName}
                </>
              )}
            </td>
            <td className="tableRowCellMeasure" id={`phone-${this.props.measureId}`}>
              {' '}
              <a className="callablePhoneAnchors" href={`tel:${this.props.phone}`}>
                {this.props.phone}
              </a>
            </td>
            <td className="tableRowCellMeasure" id={`address-${this.props.measureId}`}>
              {' '}
              {this.props.address}
            </td>
            <td className="tableRowCellMeasure" id={`date-${this.props.measureId}`}>
              {' '}
              {this.props.date}
            </td>
            <td className="tableRowCellMeasure" id={`profile-${this.props.measureId}`}>
              {' '}
              {this.props.profile}
            </td>
            <td
              className="tableRowCellMeasure"
              style={{
                color: this.props.status === MEASURE_CONSTANTS.CANCELED && '#ffff',

                backgroundColor:
                  this.props.diagrams == null
                    ? '#e0df77'
                    : this.props.diagrams.length === 0
                    ? '#e0df77'
                    : this.props.status === MEASURE_CONSTANTS.CANCELED
                    ? '#545454'
                    : '',
              }}
              id={`status-${this.props.measureId}`}
            >
              <div className="wrapListMeasureFileCellTable">
                {this.props.diagrams != null
                  ? this.props.diagrams.length > 0
                    ? this.props.diagrams.map(({ name, location }, index) => (
                        <ul key={index} className="listMeasureFileCellTable">
                          <button className="imageLink" onClick={() => this.getLocation(location)}>
                            {name}
                          </button>
                        </ul>
                      ))
                    : 'To do'
                  : 'To do'}
              </div>
            </td>
            <td
              className="table-row-button-measure"
              style={{
                display: this.props.userData.authority.includes(CONSTANTS.WRITE_MEASURE)
                  ? ''
                  : 'none',
              }}
            >
              <button
                id={`editTableMeasureButton-${this.props.measureId}`}
                className="plusButtonMeasureTable"
                onClick={() => {
                  this.setState({
                    isOpen: true,
                    diagrams: this.props.diagrams,
                    filesList: [],
                  });
                  window.addEventListener('beforeunload', this.setupBeforeUnloadListener);
                }}
              ></button>
            </td>
          </tr>
          <MeasureModalImage isOpen={this.state.isOpen}>
            <div className="modal-bg" onMouseDown={this.handleCloseModal}>
              <div id="container-measure" className="container-measure">
                {this.props.userData.authority.includes(CONSTANTS.WRITE_CLIENT) && (
                  <button
                    className="button-sds submit delete delete-client"
                    onClick={() => this.setState({ isOpenModalRemoveClient: true })}
                  >
                    {CONSTANTS.DELETE_CLIENT}
                  </button>
                )}
                <h3 className="title">{MEASURE_CONSTANTS.ADD_IMAGE_MODAL_TITLE}</h3>
                <p className="">({this.props.firstName + ' ' + this.props.lastName})</p>
                <div className="contentMeasure">
                  <form onSubmit={this.handleSubmit} autoComplete="off">
                    <br />
                    <div className="user-details-measure">
                      <div className="input-box-measure">
                        <label
                          style={{
                            display: 'inline-grid',
                            marginBottom: '.5rem',
                            justifyContent: 'start',
                            alignContent: 'stretch',
                            justifyItems: 'center',
                          }}
                          className="detailsMeasure"
                          htmlFor="file"
                        >
                          {MEASURE_CONSTANTS.ADD_IMAGES_TEXT}
                          <img src={UploadImage} id="imageUpload" alt="imagineMăsuri" />
                        </label>
                        <input
                          style={{ float: 'left', display: 'contents' }}
                          type="file"
                          id="file"
                          multiple
                          onChange={this.imageHandler}
                        />
                      </div>
                      <div className="input-box-measure">
                        <div style={{ height: '250px', overflowY: 'auto' }}>
                          <div id="fileNameList">
                            {this.props.diagrams != null
                              ? this.props.diagrams.length > 0
                                ? this.props.diagrams.map(({ name, location, id }, index) => (
                                    <div key={index} id={id} style={{ paddingBottom: '20px' }}>
                                      <div className="imageMeasureUpload">
                                        <button
                                          onClick={() => this.getLocation(location)}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <img
                                            src={
                                              this.state.isOpen === true
                                                ? this.getLocationBlob(location, location)
                                                : DefaultImage
                                            }
                                            id={location}
                                            onClick={() => this.getLocation(location)}
                                            width="139px"
                                            height="140px"
                                            style={{
                                              padding: '5px',
                                              cursor: 'pointer',
                                            }}
                                            alt="Fisierul se incarca!"
                                          />
                                        </button>
                                        <div id="outerRemoveMeasure" className="outerRemoveMeasure">
                                          <div className="innerRemoveMeasure">
                                            <label
                                              className="labelRemoveMeasure"
                                              id={id}
                                              onClick={id => this.handleRemove(id)}
                                            >
                                              {MEASURE_CONSTANTS.ERASE_IMAGE}
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : null
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        className="button-sds cancel masuri"
                        onClick={this.handleClose}
                        type="button"
                      >
                        {CONSTANTS.CANCEL_EN}
                      </button>
                      <button
                        className="button-sds submit masuri"
                        id="submitMeasureModal"
                        type="submit"
                      >
                        {CONSTANTS.SUBMIT_TEXT}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </MeasureModalImage>

          <ModalConfirmRemoveClient
            isOpen={this.state.isOpenModalRemoveClient}
            onRequestClose={() => this.setState({ isOpenModalRemoveClient: false })}
          >
            <div id="container-order" className="modal-bg-confirm">
              <div id="container-order" className="container-orders">
                <div className="title">
                  {CLIENT_CONSTANTS.REMOVE_CLIENT}{' '}
                  {this.props.firstName + ' ' + this.props.lastName}?
                  <div className="info-text">{CLIENT_CONSTANTS.INFO_REMOVE_CLIENT}</div>
                </div>
                <div className="overlay-buttons-div-cancel-ord">
                  <div>
                    <button
                      className="button-sds cancel comenzi"
                      onClick={() => this.setState({ isOpenModalRemoveClient: false })}
                    >
                      {CLIENT_CONSTANTS.DO_NOT_REMOVE_AFTERTHOUGHT_USER}
                    </button>
                  </div>
                  <div>
                    <button className="button-sds submit delete" onClick={this.deleteThisClient}>
                      {CLIENT_CONSTANTS.REMOVE_CLIENT_CONFIRM_ACTION_USER}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </ModalConfirmRemoveClient>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loadingData: state.account.loading,
    update: state.measure.update,
    userData: state.auth.userData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDiagramsForMeasureId: (files, measureId, employee) =>
      dispatch(addDiagramsForMeasureId(files, measureId, employee)),
    measureDelete: clientId => dispatch(measureDelete(clientId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RowMeasure);
