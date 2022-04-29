/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllMeasureTable } from 'redux/measure/MeasureAction';
import { loginRequest } from 'redux/authorization/authActions';
import RowMeasure from './RowMeasure';
import CreateMeasure from './CreateMeasure';
import { returnSearchedRows } from 'utils/SearchProcess.js';
import * as CONSTANTS from 'GlobalConstants.js';
import { CONSTANTS as MEASURE_CONSTANTS } from 'constants/MeasureConstants.js';
import 'components/UsefullComponents/Css/ButtonCreateLoad.css';

class TableMeasure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measureData: this.props.measureData,
      count: 15,
      searchTerm: '',
      sort: true,
      typingTimer: 0,
      doneTypingInterval: 1000,
    };
  }

  componentDidMount = () => {
    this.props.getAllMeasureTable();
  };

  handleKeyUp = e => {
    if (e.key !== 'Enter') {
      clearTimeout(this.state.typingTimer);
      this.setState({
        typingTimer: setTimeout(this.doneTyiping, this.state.doneTypingInterval),
      });
    }
  };

  doneTyiping = () => {
    if (document.getElementById('searchTerm') != null) {
      this.setState({
        searchTerm: document.getElementById('searchTerm').value,
      });
    }
  };

  doneTyipingEnter = e => {
    if (e.key === 'Enter') {
      if (document.getElementById('searchTerm') != null) {
        this.setState({
          searchTerm: document.getElementById('searchTerm').value,
        });
      }
    }
  };

  loadMore = () => {
    this.setState({ count: this.state.count + 20 });
  };

  render() {
    if (this.props.loadedMeasure === false) {
      return <div>{CONSTANTS.LOADING}</div>;
    } else {
      return (
        <div id="centerMeasureDiv" className="centerMeasureDiv ">
          <div className="wrap-table-measure">
            <div className="search-container-buttons">
              <input
                id="searchTerm"
                className="form-control mr-sm-2"
                onKeyUp={e => this.handleKeyUp(e)}
                onKeyDown={e => (e.key !== 'Enter' ? clearTimeout(this.state.typingTimer) : '')}
                type="search"
                placeholder={CONSTANTS.SEARCH_CLIENT_PLACEHOLDER}
                name="searchTerm"
                onKeyPress={e => this.doneTyipingEnter(e)}
              />
              {this.props.userData.authority.includes(CONSTANTS.WRITE_MEASURE) ? (
                <CreateMeasure clients={this.props.measureData} />
              ) : null}
            </div>
            <table className="content-table-measure">
              <thead>
                <tr>
                  <th className="cell-header-measure cell-name">{CONSTANTS.LAST_NAME}</th>
                  <th className="cell-header-measure">{CONSTANTS.PHONE}</th>
                  <th className="cell-header-measure cell-address">{CONSTANTS.ADDRESS}</th>
                  <th className="cell-header-measure cell-date">{CONSTANTS.DATE}</th>
                  <th className="cell-header-measure cell-product">
                    {MEASURE_CONSTANTS.PRODUCT_TYPE}
                  </th>
                  <th className="cell-header-measure cell-status">{CONSTANTS.STATUS}</th>
                  <th
                    className="cell-header-measure-last"
                    style={{
                      display: this.props.userData.authority.includes(CONSTANTS.WRITE_MEASURE)
                        ? ''
                        : 'none',
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                <>
                  {returnSearchedRows(
                    this.state.searchTerm,
                    this.state.count,
                    this.props.measureData,
                  ).map(
                    (
                      {
                        clientId,
                        firstName,
                        lastName,
                        phone,
                        address,
                        projectId,
                        measureId,
                        description,
                        status,
                        date,
                        diagrams,
                        productType,
                        projectTitle,
                      },
                      index,
                    ) => (
                      <RowMeasure
                        clientId={clientId}
                        firstName={firstName}
                        lastName={lastName}
                        phone={phone}
                        address={address}
                        projectId={projectId}
                        measureId={measureId}
                        description={description}
                        profile={productType}
                        status={status}
                        date={date}
                        diagrams={diagrams}
                        projectTitle={projectTitle}
                        key={measureId}
                      />
                    ),
                  )}
                </>
              </tbody>
            </table>
            <button className="button-sds load masuri" onClick={() => this.loadMore()}>
              {CONSTANTS.LOAD_MORE}
            </button>
            <div className="centru"></div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    userData: state.auth.userData,
    loadedMeasure: state.measure.loaded,
    measureData: state.measure.measureData,
    loadingData: state.account.loading,
    loadedData: state.account.loaded,
    update: state.measure.update,
    accountData: state.account.accountData,
    dataRole: state.role.roleData,
    loadedRole: state.role.loaded,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllMeasureTable: () => dispatch(getAllMeasureTable()),
    loginRequest: () => dispatch(loginRequest()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableMeasure);
