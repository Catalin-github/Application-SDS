import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableMeasure from './TableMeasure';
import { Redirect } from 'react-router-dom';
import NavBarComponent from 'components/UsefullComponents/NavBar/NavBarComponent';
import { MEASURES } from 'components/UsefullComponents/NavBar/NavBarConstants';
import * as CONSTANTS from 'GlobalConstants.js';

class Measure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: this.props.userData.authority.includes(CONSTANTS.READ_MEASURE),
    };
  }
  componentDidMount = () => {};
  render() {
    if (!this.state.permission) return <Redirect to="/" />;

    return (
      <div id="backgroundMeasure" className="backgroundMeasure">
        <NavBarComponent pageName={MEASURES} />
        <TableMeasure />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loadingData: state.account.loading,
    userData: state.auth.userData,
    update: state.measure.update,
  };
};
export default connect(mapStateToProps)(Measure);
