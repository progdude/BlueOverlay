import React, { Component, PropTypes } from 'react';
import Accumulator from '../Accumulator';
import * as styles from './accumulatorsList.scss';

class AccumulatorsList extends Component {
  static propTypes = {
    type: PropTypes.string,
    memberId: PropTypes.string,
    vendor: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    startAmount: PropTypes.number,
    endAmount: PropTypes.number,
    accumulators: PropTypes.array,
  };

  render() {
    return (
      <div className={styles.accumulatorsList}>
        {this.props.accumulators
          .filter(accumulator => {
            if (this.props.type && this.props.type !== accumulator.claimType) {
              return false;
            }
            if (this.props.vendor && this.props.vendor !== accumulator.vendor) {
              return false;
            }
            if (this.props.startDate && this.props.startDate.getTime() > accumulator.dateOfService) {
              return false;
            }
            if (this.props.endDate && this.props.endDate.getTime() < accumulator.dateOfService) {
              return false;
            }
            if (this.props.startAmount && this.props.startAmount > parseFloat(accumulator.totalChargedAmount)) {
              return false;
            }
            if (this.props.endAmount && this.props.endAmount < parseFloat(accumulator.totalChargedAmount)) {
              return false;
            }
            return true;
          })
          .map((accumulator, i) =>
            <Accumulator key={`accumulator_${i}`} {...accumulator} memberId={this.props.memberId} />
          )}
        <div className="clearfix"></div>
      </div>
    );
  }
}

export default AccumulatorsList;
