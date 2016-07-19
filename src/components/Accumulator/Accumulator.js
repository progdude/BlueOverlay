import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as styles from './Accumulator.scss';

const typeMap = {
  Professional: 'Pro',
  Prescription: 'Rx',
  Insta: 'Insta',
};

class Accumulator extends Component {
  static propTypes = {
    memberId: PropTypes.string,
    pushState: PropTypes.func,
    location: PropTypes.string,
    vendor: PropTypes.string,
    _id: PropTypes.string,
    AccumulatorNumber: PropTypes.string,
    ITSserialNUmber: PropTypes.string,
    totalChargedAmount: PropTypes.any,
    AccumulatorType: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.clickHandler = ::this.clickHandler;
  }

  clickHandler() {
    this.props.pushState(`/member/${this.props.memberId}/accumulators/accumulators-listing/${this.props._id}`);
  }

  render() {
    return (
      <div className={styles.Accumulator} onClick={this.clickHandler}>
        <p><strong>{this.props.vendor}</strong></p>
        <p>Accumulator #{this.props.AccumulatorNumber}</p>
        <p>ITS #{this.props.ITSserialNUmber}</p>
        <p className="lead">${this.props.totalChargedAmount}</p>
        <div className={`${styles.badges} row`}>
          <div className="col-xs-6"><div className={styles.dot}></div></div>
          <div className="col-xs-6">
            <div className={`${styles.AccumulatorType} text-right`}>{typeMap[this.props.AccumulatorType]}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pushState: push,
  }, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Accumulator);
